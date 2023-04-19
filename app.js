const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { PORT = 3005 } = process.env;
const { userRouter } = require('./routes/users');
const { cardRouter } = require('./routes/cards');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.use(userRouter);
app.use(cardRouter);

app.listen(PORT, () => {
  console.log(`Application listening on ${PORT}!`);
});