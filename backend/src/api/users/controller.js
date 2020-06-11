const Users = require('./model');

exports.createUser = async (req, res) => {
    var userData = {
        username: req.body.username,
        password: req.body.password
    };
    try {
        const user = await Users.create(userData);
        return res.json(user).status(200);
    } catch (err) {
        return res.json({ error: err }).status(400);
    }
};

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

exports.removeUser = async (req, res) => {
    try {
        await Users.delete({ _id: req.params.id });
        return res.json({}).status(200);
    } catch (err) {
        return res.json({ error: err }).status(400);
    }
};
