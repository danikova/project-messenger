const express = require('express');
const User = require('./controller');

module.exports = function (router) {
    const userRouter = express.Router();
    router.use('/users', userRouter);

    userRouter.get('/self', User.getSelf);
    userRouter.put('/self', User.updateSelf);
    userRouter.get('/:id', User.getUser);
};
