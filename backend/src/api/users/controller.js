const Users = require('./model');

exports.getUsers = async (req, res) => {
    try {
        const users = await Users.get({});
        return res.json(users).status(200);
    } catch (err) {
        return res.json({ error: err }).status(400);
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await Users.get({ _id: req.params.id });
        return res.json(user).status(200);
    } catch (err) {
        return res.json({ error: err }).status(400);
    }
};

exports.updateUser = async (req, res) => {
    const userData = {
        username: req.body.username,
        description: req.body.description,
    };
    try {
        const user = await Users.update({ _id: req.params.id }, userData);
        return res.json(user).status(200);
    } catch (err) {
        return res.json({ error: err }).status(400);
    }
};
