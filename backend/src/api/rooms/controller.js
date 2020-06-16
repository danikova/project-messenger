const Rooms = require('./model');
const User = require('../users/model');

exports.createRoom = async (req, res) => {
    try {
        const room = await Rooms.create({ name: req.body.name });
        await room.addUser(req.user);
        room.save();
        return res.status(201).json((room && room.toJSON()) || {});
    } catch (err) {
        return res.status(400).json({ error: err });
    }
};

exports.getRooms = async (req, res) => {
    try {
        const rooms = await Rooms.find({})
            .where('users')
            .in(req.user)
            .select('-users -activeUsers')
            .slice('messages', -1)
            .populate({
                path: 'messages',
                populate: { path: 'user', select: 'username' },
            })
            .sort('-updatedAt')
            .exec();
        return res.status(200).json(rooms || []);
    } catch (err) {
        return res.status(400).json({ error: err });
    }
};

exports.getRoom = async (req, res) => {
    try {
        const room = await Rooms.findOne({ _id: req.params.id })
            .where('users')
            .in(req.user)
            .populate('messages users')
            .exec();
        return res.status(200).json((room && room.toJSON()) || {});
    } catch (err) {
        return res.status(400).json({ error: err });
    }
};

exports.addUserToRoom = async (req, res) => {
    try {
        const room = await Rooms.findOne({ _id: req.params.id })
            .where('users')
            .in(req.user);
        if (room) {
            const user = await User.getById(req.body.userId);
            if (user) {
                await room.addUser(user);
                room.save();
                return res.status(200).json({});
            }
        }
    } catch (err) {
        return res.status(400).json({ error: err });
    }
    return res.status(400).json({
        error: `add user(${req.body.userId}) to room(${req.params.id}) was not success`,
    });
};

exports.removeUserFromRoom = async (req, res) => {
    try {
        const room = await Rooms.findOne({ _id: req.params.id })
            .where('users')
            .in(req.user);
        if (room) {
            const user = await User.getById(req.body.userId);
            if (user) {
                await room.removeUser(user);
                room.save();
                return res.status(200).json({});
            }
        }
    } catch (err) {
        return res.status(400).json({ error: err });
    }
    return res.status(400).json({
        error: `remove user(${req.body.userId}) from room(${req.params.id}) was not success`,
    });
};
