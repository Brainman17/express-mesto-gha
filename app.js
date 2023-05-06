const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { PORT = 3000 } = process.env;
const { userRouter } = require("./routes/users");
const { cardRouter } = require("./routes/cards");
const { login, createUser } = require("./controllers/auth");
const { auth } = require("./middlewares/auth");
const { errors } = require("celebrate");
const celebrates = require("./middlewares/celebrates");
const centralErrorHandler = require("./middlewares/centralErrorHandler");
const { NotFoundError } = require("./errors/customErrors");

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.use(express.json());

app.post("/signin", celebrates.signIn, login);
app.post("/signup", celebrates.signUp, createUser);

app.use(auth);

app.use(userRouter);
app.use(cardRouter);

app.use("*", (res, req, next) => {
  const err = new NotFoundError("Данные не найдены!");
  next(err);
});


app.use(errors());
app.use(centralErrorHandler)

app.listen(PORT, () => {
  console.log(`Application listening on ${PORT}!`);
});

// Сейчас пользователь может удалить чужую карточку.
// Обратите внимание на метод БД, которые вы используете для поиска — чаще всего проблема в нем.
// ------
// По поводу этой ошибки Лиза говорила, что ок.
