const socketIO = require('socket.io');
const tokenAuthSocket = require('../middlewares/token.auth.socket');
const SocketConnection = require('./SocketConnection');

const onPushMessage = require('./on.push.message');
const onDisconnect = require('./on.disconnect');
const { info, warning } = require('../services/colored.logger');

module.exports = function (server, path, cb) {
    const io = socketIO(server, {
        path,
    });
    io.use(tokenAuthSocket);
    io.on('connection', async (socket) => {
        if (socket.user) await acceptAuthorizedSocket(socket);
        else await rejectUnauthorizedSocket(socket);
    });
    if (cb) cb();
};

async function acceptAuthorizedSocket(socket) {
    info(`user connected: ${socket.user._id}`);
    const sc = new SocketConnection(socket);
    await sc.getActiveRoom(
        socket.user.openChatroom && socket.user.openChatroom._id,
    );
    await sc.joinAllRoom();
    socket.on('pushMessage', onPushMessage(sc));
    socket.on('disconnect', onDisconnect(sc));
}

async function rejectUnauthorizedSocket(socket) {
    warning(`unauthorized websocket connection`);
    socket.emit('unauthorized');
    socket.disconnect();
}
