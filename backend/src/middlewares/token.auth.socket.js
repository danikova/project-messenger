const jwt = require('jsonwebtoken');
const User = require('../api/users/model');

const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = async (socket, next) => {
    let user = null;
    try {
        const token = socket.handshake.query.token;
        const decoded = jwt.verify(
            token,
            PRIVATE_KEY,
        );
        const { _id } = decoded;
        user = await User.findOne({ _id });
    } catch (e) {}
    socket.user = user;
    next();
};
