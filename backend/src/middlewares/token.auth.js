const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../api/users/model');

module.exports = async (req, res, next) => {
    const token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token)
        return res.status(401).json({
            error: {
                templateName: 'api.error.auth.tokenNotProvided',
                status: 401,
            },
        });

    try {
        const decoded = jwt.verify(
            token,
            config.get('authentication.privatekey'),
        );
        const { _id } = decoded;
        const user = await User.findOne({ _id: _id });
        if (!user) throw Error();
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({
            error: {
                templateName: 'api.error.auth.invalidToken',
                consoleLog: err.toString(),
                status: 401,
            },
        });
    }
};
