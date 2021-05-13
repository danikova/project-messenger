const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../api/users/model');

module.exports = async (socket, next) => {
    let user = null;
    try {
        const token = socket.handshake.query.token;
        const decoded = jwt.verify(
            token,
            config.get('authentication.privatekey'),
        );
        const { _id } = decoded;
        user = await User.findOne({ _id });
    } catch (e) {}
    socket.user = user;
    next();
};
