const Rooms = require('./model');
const mongoose = require('mongoose');
const User = require('../users/model');
const wrap = require('../../services/async.view.wrapper');
const SocketGlobals = require('../../socket/SocketGlobals');
const { saveFilesToRoom } = require('./utils');

const roomMessageCount = 50;

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
                status: 400,
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
                status: 400,
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
                status: 400,
            },
        });
    }
});

exports.pushMessage = wrap(async (req, res) => {
    try {
        const room = await Rooms.findOne({ _id: req.params.id })
            .where('activeUsers')
            .in(req.user);
        if (!room)
            return res.status(400).json({
                error: {
                    templateName: 'api.error.rooms.pushMessage.noRoomFound',
                    status: 400,
                },
            });
        const messageObj = {
            userId: req.user._id,
            message: req.body.message,
        };

        if (req.files && Object.keys(req.files).length !== 0)
            messageObj.files = saveFilesToRoom(room._id, req.files);

        if (messageObj.message || messageObj.files.length !== 0) {
            const sc = SocketGlobals.activeUsers[req.user._id] || null;
            const message = await room.pushMessage(messageObj, sc.socket);
            room.save();
            return res.status(200).json((message && message.toJSON()) || {});
        }
    } catch (err) {
        return res.status(400).json({
            error: {
                templateName: 'api.error.rooms.pushMessage',
                consoleLog: err.toString(),
                status: 400,
            },
        });
    }
    return res.status(400).json({
        error: {
            templateName: 'api.error.rooms.pushMessage',
            status: 400,
        },
    });
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
                status: 400,
            },
        });
    }
});

exports.addUser = wrap(async (req, res) => {
    const username = (req.body && req.body.username) || '';
    try {
        const room = await Rooms.findOne({ _id: req.params.id })
            .where('activeUsers')
            .in(req.user);
        if (room) {
            const user = await User.getByName(username);
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
                templateVariables: { username },
                consoleLog: err.toString(),
                status: 400,
            },
        });
    }
    return res.status(400).json({
        error: {
            templateName: 'api.error.rooms.addUserToRoom.noUserFound',
            templateVariables: { username },
            status: 400,
        },
    });
});

const removeUserFromRoom = wrap(async (req, res) => {
    const username = (req.body && req.body.username) || '';
    try {
        const room = await Rooms.findOne({ _id: req.params.id })
            .where('activeUsers')
            .in(req.user);
        if (room) {
            const user = await User.getByName(username);
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
                templateVariables: { username },
                consoleLog: err.toString(),
                status: 400,
            },
        });
    }
    return res.status(400).json({
        error: {
            templateName: 'api.error.rooms.removeUserFromRoom.noUserFound',
            templateVariables: { username },
            status: 400,
        },
    });
});

exports.removeUserFromRoom = removeUserFromRoom;
exports.removeSelfFromRoom = wrap(async (req, res) => {
    req.body.username = req.user.username;
    return await removeUserFromRoom(req, res);
});
