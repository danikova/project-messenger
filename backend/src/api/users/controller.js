const Users = require('./model');

exports.getSelf = async (req, res) => {
    try {
        const user = req.user;
        return res.status(200).json(user.toJSON());
    } catch (err) {
        return res.status(400).json({ error: err });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await Users.findOne({ _id: req.params.id });
        return res.status(200).json((user && user.toJSON()) || {});
    } catch (err) {
        return res.status(400).json({ error: err });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await Users.get({});
        return res.status(200).json(users || []);
    } catch (err) {
        return res.status(400).json({ error: err });
    }
};

exports.updateSelf = async (req, res) => {
    const userData = {
        openChatroom: req.body.openChatroom,
    };
    try {
        const user = await Users.update({ _id: req.user._id }, userData);
        return res.status(200).json(user || {});
    } catch (err) {
        return res.status(400).json({ error: err });
    }
};
