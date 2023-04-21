const mongoose = require('mongoose');
const { CastError, ValidationError } = mongoose.Error;
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.name = 'NotFoundError';
  }
}

 const ERROR_NOT_FOUND = 404;
 const ERROR_BAD_REQUEST = 400;
 const ERROR_SERVER = 500;

 module.exports.handleErrors = (err, res) => {
  if(err instanceof NotFoundError) {
    return res.status(ERROR_NOT_FOUND).send({ message: "Данные не найдены!" })
  }
  if(err instanceof CastError || err instanceof ValidationError) {
    return res.status(ERROR_BAD_REQUEST).send({ message: "Неккоректные данные!" })
  }
  return res.status(ERROR_SERVER).send({ message: "Ошибка сервера!" })
 }