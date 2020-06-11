const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../api/users/model');

module.exports = async (req, res, next) => {
    const token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token)
        return res.status(401).json({
            error: 'Access denied. No token provided.',
        });

    try {
        const decoded = jwt.verify(
            token,
            config.get('authentication.privatekey'),
        );
        const { _id } = decoded;
        req.user = await User.getById(_id);
        next();
    } catch (ex) {
        res.status(400).send({
            error: 'Invalid token.',
        });
    }
};