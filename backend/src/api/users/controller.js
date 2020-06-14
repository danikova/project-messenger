const Users = require('./model');

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
        openChatRoom: req.body.openChatRoom,
    };
    try {
        const user = await Users.update({ _id: req.user._id }, userData);
        return res.status(200).json(user || {});
    } catch (err) {
        return res.status(400).json({ error: err });
    }
};
