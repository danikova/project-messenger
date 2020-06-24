const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../api/users/model');

module.exports = async (socket, next) => {
    try {
        const token = socket.handshake.query.token;
        const decoded = jwt.verify(
            token,
            config.get('authentication.privatekey'),
        );
        const { _id } = decoded;
        const user = await User.findOne({ _id });
        if (!user) new Error('Authentication error');
        socket.user = user;
        next();
    } catch(e){
        socket.disconnect(true);
    }
};
