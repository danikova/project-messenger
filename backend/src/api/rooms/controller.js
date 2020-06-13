const Rooms = require('./model');

exports.createRoom = async (req, res) => {
    try {
        const room = await Rooms.create({ _id: req.params.id }, req.body);
        return res.json(room || {}).status(200);
    } catch (err) {
        return res.json({ error: err }).status(400);
    }
};

exports.getRooms = async (req, res) => {
    try {
        const rooms = await Rooms.get({});
        return res.json(rooms || []).status(200);
    } catch (err) {
        return res.json({ error: err }).status(400);
    }
};

exports.getRoom = async (req, res) => {
    try {
        const room = await Rooms.get({ _id: req.params.id });
        return res.json(room || {}).status(200);
    } catch (err) {
        return res.json({ error: err }).status(400);
    }
};

exports.updateRoom = async (req, res) => {
    try {
        const room = await Rooms.update({ _id: req.params.id }, req.body);
        return res.json(room || {}).status(200);
    } catch (err) {
        return res.json({ error: err }).status(400);
    }
};

exports.removeRoom = async (req, res) => {
    try {
        await Rooms.delete({ _id: req.params.id }, req.body);
        return res.json({}).status(200);
    } catch (err) {
        return res.json({ error: err }).status(400);
    }
};
