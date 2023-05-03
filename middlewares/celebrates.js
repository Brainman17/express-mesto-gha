const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi)
const { REGEX_AVATAR_LINK, REGEX_LINK } = require('../utils/regex');

const login = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(REGEX_AVATAR_LINK),
  }),
});

const getUser = celebrate({
  params: Joi.object().keys({
    userId: Joi.objectId().required()
  }),
});

const updateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30)
  }),
});

const updateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(REGEX_AVATAR_LINK)
  }),
});

const createCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(REGEX_LINK),
  }),
});

const checkIdCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.objectId().required()
  }),
});

module.exports = {
  login, getUser, updateUser, updateAvatar, createCard, checkIdCard,
};