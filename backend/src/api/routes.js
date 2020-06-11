const express = require('express');
const roomRoutes = require('./rooms/routes');
const userRoutes = require('./users/routes');
const tokenAuth = require('../middlewares/token.auth');

module.exports = function () {
    const apiRouter = express.Router();
    apiRouter.use(tokenAuth);
    roomRoutes(apiRouter);
    userRoutes(apiRouter);
    return apiRouter;
};
