const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { PORT = 3000 } = process.env;
const { userRouter } = require('./routes/users');
const { cardRouter } = require('./routes/cards');
const { login, createUser } = require('./controllers/auth');
const { auth } = require('./middlewares/auth');
const { errors } = require('celebrate');
const celebrates = require('./middlewares/celebrates');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());

app.post('/signin', celebrates.login, login);
app.post('/signup', celebrates.login, createUser);

app.use(auth);

app.use(userRouter);
app.use(cardRouter);

app.use('*', (req, res) => {
  res.status(404).send({ message: "Данные не найдены!" });
});

app.use('*', (req, res) => {
  res.status(400).send({ message: "Неккоректные данные!" });
});

app.use('*', (req, res) => {
  res.status(500).send({ message: "Данные не найдены!" });
});

app.use(errors());

// app.use((err, req, res, next) => {
//   res.send({ message: err.message });
// });

app.listen(PORT, () => {
  console.log(`Application listening on ${PORT}!`);
});

