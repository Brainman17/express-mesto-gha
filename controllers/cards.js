const cardSchema = require("../models/cards");

const getCards = (req, res) => {
  cardSchema
    .find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  cardSchema
    .create({ name, link, owner })
    .then((card) => {
      res.status(201).send({ data: card });
    })
    .catch((e) => {
      if (e.name === "ValidationError") {
        const message = Object.values(e.errors)
          .map((error) => error.message)
          .join("; ");
        res.status(400).send({ message });
      } else {
        res.status(500).send({ message: "Smth went wrong!" });
      }
    });
};

const deleteCard = (req, res) => {
  cardSchema
    .findByIdAndRemove(req.params.id)
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send(err.message));
};

const likeCard = (req, res) => {
  cardSchema
    .findByIdAndUpdate(
      req.params.cardId,
      {
        $addToSet: { likes: req.user._id },
      },
      { new: true, runValidators: true, upsert: true }
    )
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send(err.message));
};

const dislikeCard = (req, res) => {
  cardSchema
    .findByIdAndUpdate(
      req.params.cardId,
      {
        $pull: { likes: req.user._id },
      },
      { new: true, runValidators: true, upsert: true }
    )
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send(err.message));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
