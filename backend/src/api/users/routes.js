const express = require('express');
var User = require('./controller');

module.exports = function (router) {
    const userRouter = express.Router();
    router.use('/users', userRouter);

    userRouter.get('/', User.getUsers);
    userRouter.post('/', User.createUser);
    userRouter.get('/:id', User.getUser);
    userRouter.put('/:id', User.updateUser);
    userRouter.delete('/:id', User.removeUser);
};
