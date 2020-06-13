const express = require('express');
const Auth = require('./controller');

module.exports = function () {
    const authRouter = express.Router();
    authRouter.post('/sign-up', Auth.signUp);
    authRouter.post('/sign-in', Auth.signIn);
    return authRouter;
};
