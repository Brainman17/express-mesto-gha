const user = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => user.create({ name, about, avatar, email, password: hash }))
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

module.exports = {
  login,
  createUser
};
