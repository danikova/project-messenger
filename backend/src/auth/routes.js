const express = require('express');
var Auth = require('./controller');

module.exports = function () {
    const authRouter = express.Router();
    authRouter.post('/sign-up', Auth.signUp);
    authRouter.post('/sign-in', Auth.signIn);
    return authRouter;
};
