const user = require("../models/users");
const mongoose = require('mongoose');
const { CastError } = mongoose.Error;
const { handleErrors } = require("../errors/errors");

const getUsers = (req, res) => {
  user
    .find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;

  user
    .findById(userId)
    .orFail((err) => {
      throw handleErrors(err, res);
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => handleErrors(err, res));
};

const getMe = (req, res) => {
  const { userId } = req.params;

  user
    .findById(userId)
    .orFail((err) => {
      throw handleErrors(err, res);
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => handleErrors(err, res));
};

const updateUser = (req, res) => {
  const userId = req.user._id;

  user
    .findByIdAndUpdate(
      userId,
      { name: req.body.name, about: req.body.about },
      { new: true, runValidators: true }
    )
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => handleErrors(err, res));
};

const updateAvatar = (req, res) => {
  const userId = req.user._id;

  user
    .findByIdAndUpdate(
      userId,
      { avatar: req.body.avatar },
      { new: true, runValidators: true }
    )
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => handleErrors(err, res));
};

module.exports = {
  getUsers,
  getUser,
  getMe,
  updateUser,
  updateAvatar,
};
