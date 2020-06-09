const Rooms = require('./model');

exports.createRoom = function (req, res, next) {
    var room = {
        name: req.body.name,
        description: req.body.description,
    };

    Rooms.create(room, function (err, room) {
        if (err) res.json({ error: err }).status(406);
        res.json(room).status(201);
    });
};

exports.getRooms = function (req, res, next) {
    Rooms.get({}, function (err, rooms) {
        if (err) res.json({ error: err }).status(406);
        res.json(rooms).status(200);
    });
};

exports.getRoom = function (req, res, next) {
    Rooms.get({ _id: req.params.id }, function (err, room) {
        if (err) res.json({ error: err }).status(406);
        res.json(room).status(200);
    });
};

exports.updateRoom = function (req, res, next) {
    var room = {
        name: req.body.name,
        description: req.body.description,
    };
    Rooms.update({ _id: req.params.id }, room, function (err, room) {
        if (err) res.json({ error: err }).status(406);
        res.json(room).status(200);
    });
};

exports.removeRoom = function (req, res, next) {
    Rooms.delete({ _id: req.params.id }, function (err, room) {
        if (err) res.json({ error: err }).status(406);
        res.json({}).status(200);
    });
};
