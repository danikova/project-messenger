const socketIO = require('socket.io');
const tokenAuthSocket = require('../middlewares/token.auth.socket');
const SocketConnection = require('./SocketConnection');

const onPushMessage = require('./on.push.message');
const onDisconnect = require('./on.disconnect');
const onJoinRoom = require('./on.join.room');
const onLeaveRoom = require('./on.leave.room');

module.exports = function (server) {
    const io = socketIO(server);
    io.use(tokenAuthSocket);
    io.on('connection', async (socket) => {
        const sc = new SocketConnection(socket);
        await sc.getActiveRoom(
            socket.user.openChatRoom && socket.user.openChatRoom._id,
        );
        await sc.joinAllRoom();
        socket.on('connect', () => {
            console.log('connect');
        });
        socket.on('joinRoom', onJoinRoom(sc));
        socket.on('leaveRoom', onLeaveRoom(sc));
        socket.on('pushMessage', onPushMessage(sc));
        socket.on('disconnect', onDisconnect(sc));
    });
    console.log(`SocketIo ready for connection`);
};
