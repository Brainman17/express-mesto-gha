const express = require('express');
const userRouter = express.Router();
const { getUsers, getUser, getMe, updateUser, updateAvatar } = require('../controllers/users');
const celebrates = require('../middlewares/celebrates');

userRouter.get(getUsers);

userRouter.get('/me', getMe)

userRouter.get('/:userId', celebrates.getUser,  getUser);

userRouter.patch('/me', celebrates.updateUser, updateUser);

userRouter.patch('/me/avatar', celebrates.updateAvatar, updateAvatar);

module.exports = { userRouter };