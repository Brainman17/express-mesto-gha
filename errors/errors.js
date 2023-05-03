const mongoose = require('mongoose');
const { CastError, ValidationError } = mongoose.Error;
const { ERROR_NOT_FOUND, ERROR_BAD_REQUEST, ERROR_SERVER } = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.name = 'NotFoundError';
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

 const handleErrors = (err, res) => {
  if(err instanceof NotFoundError) {
    return res.status(ERROR_NOT_FOUND).send({ message: "Данные не найдены!" })
  }
  if(err instanceof CastError || err instanceof ValidationError) {
    return res.status(ERROR_BAD_REQUEST).send({ message: "Неккоректные данные!" })
  }
  return res.status(ERROR_SERVER).send({ message: "Ошибка сервера!" })
 }

 module.exports = { handleErrors, NotFoundError, UnauthorizedError, ForbiddenError }