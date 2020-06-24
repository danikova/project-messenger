const Rooms = require('./model');
const User = require('../users/model');
const SocketGlobals = require('../../socket/SocketGlobals');

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
            .where('activeUsers')
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
            .where('activeUsers')
            .in(req.user)
            .slice('messages', -50)
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
            .where('activeUsers')
            .in(req.user);
        if (room) {
            const user = await User.getByName(req.body.username);
            if (user) {
                await room.addUser(user);
                room.save();
                if (room.id in SocketGlobals.activeRooms)
                    SocketGlobals.activeRooms[room.id].forEach((s) => {
                        s.emit('refreshRoom', { roomId: room.id });
                    });
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

const removeUserFromRoom = async (req, res) => {
    try {
        const room = await Rooms.findOne({ _id: req.params.id })
            .where('activeUsers')
            .in(req.user);
        if (room) {
            const user = await User.getById(req.body.userId);
            if (user) {
                if (await room.removeUser(user)) room.save();
                if (user.id in SocketGlobals.activeUsers)
                    SocketGlobals.activeUsers[user.id].leaveRoom(this);
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

exports.removeUserFromRoom = removeUserFromRoom;
exports.removeSelfFromRoom = async (req, res) => {
    req.body.userId = req.user.id;
    return await removeUserFromRoom(req, res);
};
