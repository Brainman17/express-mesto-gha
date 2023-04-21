const card = require("../models/cards");
const { handleErrors, NotFoundError } = require("../errors/errors")

const getCards = (req, res) => {
  card
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

  card
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
  card
    .findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send(err.message));
};

const likeCard = (req, res) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      {
        $addToSet: { likes: req.user._id },
      },
      { new: true, runValidators: true, upsert: true }
    )
    .then((card) =>  {
      if(!card) {
        throw new NotFoundError();
      } else {
        return res.send({ data: card })
      }
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
      { new: true, runValidators: true, upsert: true }
    )
    .then((card) =>  {
      if(!card) {
        throw new NotFoundError();
      } else {
        return res.send({ data: card })
      }
    })
    .catch((err) => handleErrors(err, res));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
