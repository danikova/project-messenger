const Users = require('./model');

exports.createUser = function (req, res, next) {
    var user = {
        username: req.body.username
    };

    Users.create(user, function (err, user) {
        if (err) res.json({ error: err }).status(406);
        res.json(user).status(201);
    });
};

exports.getUsers = function (req, res, next) {
    Users.get({}, function (err, users) {
        if (err) res.json({ error: err }).status(406);
        res.json(users).status(200);
    });
};

exports.getUser = function (req, res, next) {
    Users.get({ _id: req.params.id }, function (err, user) {
        if (err) res.json({ error: err }).status(406);
        res.json(user).status(200);
    });
};

exports.updateUser = function (req, res, next) {
    var user = {
        name: req.body.name,
        description: req.body.description,
    };
    Users.update({ _id: req.params.id }, user, function (err, user) {
        if (err) res.json({ error: err }).status(406);
        res.json(user).status(200);
    });
};

exports.removeUser = function (req, res, next) {
    Users.delete({ _id: req.params.id }, function (err, user) {
        if (err) res.json({ error: err }).status(406);
        res.json({}).status(200);
    });
};
