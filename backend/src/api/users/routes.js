const express = require('express');
const User = require('./controller');

module.exports = function (router) {
    const userRouter = express.Router();
    router.use('/users', userRouter);

    userRouter.get('/', User.getUsers);
    userRouter.get('/:id', User.getUser);
    // userRouter.put('/:id', User.updateUser);
};
