const card = require("../models/cards");
const { handleErrors } = require("../errors/handleErrors");
const { NotFoundError } = require("../errors/customErrors");
const { STATUS_CREATED } = require("../utils/constants");

const getCards = (req, res) => {
  card
    .find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((err) => {
      handleErrors(err, res)
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  card
    .create({ name, link, owner })
    .then((card) => {
      res.status(STATUS_CREATED).send({ data: card });
    })
    .catch((err) => {
      handleErrors(err, res)
    });
};

const deleteCard = (req, res) => {
  card
    .findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError("Карточка с таким id не существует!")
    })
    .then((card) => {
      res.send({ data: card })
    })
    .catch((err) => {
      handleErrors(err, res)
    });
};

const likeCard = (req, res) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      {
        $addToSet: { likes: req.user._id },
      },
      { new: true, runValidators: true }
    )
    .orFail(() => {
      throw new NotFoundError("Карточка с таким id не существует!")
    })
    .then((card) =>  {
      res.send({ data: card })
    })
    .catch((err) => handleErrors(err, res));
};

const dislikeCard = (req, res) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      {
        $pull: { likes: req.user._id },
      },
      { new: true, runValidators: true }
    )
    .orFail(() => {
      throw new NotFoundError("Карточка с таким id не существует!")
    })
    .then((card) =>  {
      res.send({ data: card })
    })
    .catch((err) => {
      handleErrors(err, res);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
