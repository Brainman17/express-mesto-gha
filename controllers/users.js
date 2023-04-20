const userSchema = require("../models/users");

const getUsers = (req, res) => {
  userSchema
    .find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getUser = (req, res) => {
  const { id } = req.params;

  userSchema
    .findById(id)
    .orFail(() => {
      throw new Error("Not Found");
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((e) => {
      if (e.message === "Not Found") {
        res.status(404).send({ message: "User not Found!" });
      } else {
        res.status(500).send({ message: "Smth went wrong!" });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  userSchema
    .create({ name, about, avatar })
    .then((user) => {
      res.status(201).send({ data: user });
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

const updateUser = (req, res) => {
  const userId = req.user._id;

  userSchema
    .findByIdAndUpdate(
      userId,
      { name: req.body.name, about: req.body.about },
      { new: true, runValidators: true, upsert: true }
    )
    .then((user) => {
      res.send({ data: user })
    })
    .catch((err) => res.status(500).send(err.message));
};

const updateAvatar = (req, res) => {
  const userId = req.user._id;

  userSchema
    .findByIdAndUpdate(
      userId,
      { avatar: req.body.avatar },
      { new: true, runValidators: true, upsert: true }
    )
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send(err.message));
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
