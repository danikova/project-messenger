const Users = require('./model');

exports.getUsers = async (req, res) => {
    try {
        const users = await Users.get({});
        return res.json(users || []).status(200);
    } catch (err) {
        return res.json({ error: err }).status(400);
    }
};

exports.updateSelf = async (req, res) => {
    const userData = {
        openChatRoom: req.body.openChatRoom,
    };
    try {
        const user = await Users.update({ _id: req.user._id }, userData);
        return res.json(user || {}).status(200);
    } catch (err) {
        return res.json({ error: err }).status(400);
    }
};
