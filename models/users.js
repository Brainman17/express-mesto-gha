const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { //имя пользователя
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30']
  },
  about: { //информация о пользователе
    type: String,
    required: [true, 'Поле "about" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "about" - 2'],
    maxlength: [30, 'Минимальная длина поля "about" - 30']
  },
  avatar: { //ссылка на аватарку
    type: String,
    required: [true, 'Поле "avatar" должно быть заполнено']
  }
});

module.exports = mongoose.model('user', userSchema);