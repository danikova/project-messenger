const config = require('config');
const Rooms = require('./model');
const mongoose = require('mongoose');
const User = require('../users/model');
const wrap = require('../../services/async.view.wrapper');
const SocketGlobals = require('../../socket/SocketGlobals');

const roomMessageCount = config.get('api.room.messageCount') || 50;

exports.createRoom = wrap(async (req, res) => {
    try {
        const room = await Rooms.create({ name: req.body.name });
        await room.addUser(req.user);
        room.save();
        return res.status(201).json((room && room.toJSON()) || {});
    } catch (err) {
        return res.status(400).json({
            error: {
                templateName: 'api.error.rooms.createRoom',
                consoleLog: err.toString(),
            },
        });
    }
});

exports.getRooms = wrap(async (req, res) => {
    try {
        const rooms = await Rooms.find({})
            .where('activeUsers')
            .in(req.user)
            .select('-activeUsers')
            .slice('messages', -1)
            .sort('-updatedAt')
            .exec();
        return res.status(200).json(rooms || []);
    } catch (err) {
        return res.status(400).json({
            error: {
                templateName: 'api.error.rooms.getRooms',
                consoleLog: err.toString(),
            },
        });
    }
});

exports.getRoom = wrap(async (req, res) => {
    try {
        const room = await Rooms.findOne({ _id: req.params.id })
            .where('activeUsers')
            .in(req.user)
            .select('-activeUsers')
            .slice('messages', -roomMessageCount);
        return res.status(200).json((room && room.toJSON()) || {});
    } catch (err) {
        return res.status(400).json({
            error: {
                templateName: 'api.error.rooms.getRoom',
                consoleLog: err.toString(),
            },
        });
    }
});

exports.messagesFrom = wrap(async (req, res) => {
    try {
        const rooms = await Rooms.aggregate([
            { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
            { $unwind: '$messages' },
            {
                $match: {
                    'messages.number': {
                        $lt: req.body.number,
                        $gte: Math.max(0, req.body.number - roomMessageCount),
                    },
                },
            },
            {
                $group: {
                    _id: '$_id',
                    messages: { $push: '$messages' },
                },
            },
        ]);
        const room = rooms[0] || null;
        return res.status(200).json(room || {});
    } catch (err) {
        return res.status(400).json({
            error: {
                templateName: 'api.error.rooms.messageFrom',
                consoleLog: err.toString(),
            },
        });
    }
});

exports.addUserToRoom = wrap(async (req, res) => {
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
        return res.status(400).json({
            error: {
                templateName: 'api.error.rooms.addUserToRoom',
                consoleLog: err.toString(),
            },
        });
    }
    return res.status(400).json({
        error: {
            templateName: 'api.error.rooms.addUserToRoom.noUserFound',
        },
    });
});

const removeUserFromRoom = wrap(async (req, res) => {
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
        return res.status(400).json({
            error: {
                templateName: 'api.error.rooms.removeUserFromRoom',
                consoleLog: err.toString(),
            },
        });
    }
    return res.status(400).json({
        error: {
            templateName: 'api.error.rooms.removeUserFromRoom.noUserFound',
        },
    });
});

exports.removeUserFromRoom = removeUserFromRoom;
exports.removeSelfFromRoom = wrap(async (req, res) => {
    req.body.userId = req.user.id;
    return await removeUserFromRoom(req, res);
});
