const express = require('express');
const roomRoutes = require('./rooms/routes');
const userRoutes = require('./users/routes');
const tokenAuth = require('../middlewares/token.auth');
const listEndpoints = require('express-list-endpoints');

module.exports = function () {
    const apiRouter = express.Router();
    apiRouter.use(tokenAuth);
    apiRouter.get('/', (req, res) => res.status(200).json(listEndpoints(app)));
    roomRoutes(apiRouter);
    userRoutes(apiRouter);
    return apiRouter;
};
