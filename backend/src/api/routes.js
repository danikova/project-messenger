const express = require('express');
const roomRoutes = require('./rooms/routes');
const userRoutes = require('./users/routes');

module.exports = function () {
    const apiRouter = express.Router();
    roomRoutes(apiRouter);
    userRoutes(apiRouter);
    return apiRouter;
};
