const user = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../errors/customErrors");

const login = (req, res) => {
  const { email, password } = req.body;

  return user
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, "some-secret-key", {
        expiresIn: "7d",
      });

      res.send({ token });
    })
    .catch((err) => next(new UnauthorizedError(err.message)));
};

const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => user.create({ name, about, avatar, email, password: hash }))
    .then((user) => res.status(201).send(user))
    .catch((err) => handleErrors(err, res));
};

module.exports = {
  login,
  createUser
};
