const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../api/users/model');

module.exports = async (socket, next) => {
    if (socket.handshake.query && socket.handshake.query.token) {
        const token = socket.handshake.query.token;
        const decoded = jwt.verify(
            token,
            config.get('authentication.privatekey'),
        );
        const { _id } = decoded;
        const user = await User.findOne({ _id });
        if (!user) next(new Error('Authentication error'));
        socket.user = user;
        next();
    } else {
        next(new Error('Authentication error'));
    }
};
