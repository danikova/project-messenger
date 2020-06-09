const roomRoutes = require('./rooms/routes');
const userRoutes = require('./users/routes');

module.exports = function (router) {
    roomRoutes(router);
    userRoutes(router);
};
