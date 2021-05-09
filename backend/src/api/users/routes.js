const express = require('express');
const User = require('./controller');

module.exports = function (router) {
    const userRouter = express.Router();
    router.use('/users', userRouter);

    userRouter.get('/get-self', User.getSelf);
    userRouter.get('/:id', User.getUser);
    // userRouter.get('/', User.getUsers);
    userRouter.put('/', User.updateSelf);
};
