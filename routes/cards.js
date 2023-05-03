const express = require("express");
const cardRouter = express.Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");
const celebrates = require('../middlewares/celebrates');

cardRouter.get(getCards);

cardRouter.post(celebrates.createCard, createCard);

cardRouter.delete("/:cardId", celebrates.checkIdCard, deleteCard);

cardRouter.put("/:cardId/likes", celebrates.checkIdCard, likeCard);

cardRouter.delete("/:cardId/likes", celebrates.checkIdCard, dislikeCard);

module.exports = { cardRouter };
