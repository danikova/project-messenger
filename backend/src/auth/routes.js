const express = require('express');
const Auth = require('./controller');

module.exports = function () {
    const authRouter = express.Router();
    authRouter.post('/register', Auth.register);
    authRouter.post('/login', Auth.login);
    authRouter.post('/google-login', Auth.googleLogin);
    authRouter.post('/facebook-login', Auth.facebookLogin);
    return authRouter;
};
