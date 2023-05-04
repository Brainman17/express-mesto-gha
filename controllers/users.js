const user = require("../models/users");
const { handleErrors } = require("../errors/handleErrors");
const { NotFoundError } = require("../errors/customErrors")

const getUsers = (req, res, next) => {
  user
    .find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch((err) => handleErrors(err, res));
};

const getUser = (req, res) => {
  const { userId } = req.params;

  user
    .findById(userId)
    .orFail(() => {
      throw new NotFoundError('Такого пользователя не существует');
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
    .orFail(() => {
      throw new NotFoundError('Такого пользователя не существует');
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
