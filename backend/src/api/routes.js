const express = require('express');
const roomRoutes = require('./rooms/routes');
const userRoutes = require('./users/routes');
const tokenAuth = require('../middlewares/token.auth');
const config = require('config');

module.exports = function () {
    const apiRouter = express.Router();
    if (config.get('authentication.enabled')) apiRouter.use(tokenAuth);
    roomRoutes(apiRouter);
    userRoutes(apiRouter);
    return apiRouter;
};
