const socketIO = require('socket.io');
const tokenAuthSocket = require('../middlewares/token.auth.socket');
const SocketConnection = require('./SocketConnection');

const onPushMessage = require('./on.push.message');
const onDisconnect = require('./on.disconnect');

module.exports = function (server, path) {
    const io = socketIO(server, {
        path,
    });
    io.use(tokenAuthSocket);
    io.on('connection', async (socket) => {
        const sc = new SocketConnection(socket);
        await sc.getActiveRoom(
            socket.user.openChatroom && socket.user.openChatroom._id,
        );
        await sc.joinAllRoom();
        socket.on('connect', () => {
            console.log('connect');
        });
        socket.on('pushMessage', onPushMessage(sc));
        socket.on('disconnect', onDisconnect(sc));
    });
    console.log(`SocketIo ready for connection`);
};
