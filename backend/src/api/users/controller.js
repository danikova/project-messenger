const Users = require('./model');
const wrap = require('../../services/async.view.wrapper');

exports.getSelf = wrap(async (req, res) => {
    try {
        const user = req.user;
        return res.status(200).json(user.toJSON());
    } catch (err) {
        return res.status(400).json({
            error: {
                templateName: 'api.error.users.getSelf',
                consoleLog: err.toString(),
            },
        });
    }
});

exports.getUser = wrap(async (req, res) => {
    try {
        const user = await Users.findOne({ _id: req.params.id }).select(
            'username email color imageUrl',
        );
        const userJson = (user && user.toJSON()) || {};
        return res.status(200).json(userJson);
    } catch (err) {
        return res.status(400).json({
            error: {
                templateName: 'api.error.users.getUser',
                consoleLog: err.toString(),
            },
        });
    }
});

exports.updateSelf = wrap(async (req, res) => {
    try {
        const updatedKeys = Object.keys(req.body);
        const projection = updatedKeys.reduce(
            (obj, x) => {
                obj[x] = 1;
                return obj;
            },
            { _id: 0 },
        );
        const user = await Users.findOneAndUpdate(
            { _id: req.user._id },
            req.body,
            { returnNewDocument: true, projection },
        );
        return res.status(200).json(user || {});
    } catch (err) {
        return res.status(400).json({
            error: {
                templateName: 'api.error.users.updateSelf',
                consoleLog: err.toString(),
            },
        });
    }
});
