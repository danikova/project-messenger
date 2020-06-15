const socketIO = require('socket.io');
const Room = require('../api/rooms/model');
const tokenAuthSocket = require('../middlewares/token.auth.socket');

const pushMessage = require('./push.message');

class SocketConnection {
    constructor(socket) {
        this.socket = socket;
        this.activeRoom = null;
    }

    async getActiveRoom(id) {
        if ((this.activeRoom && this.activeRoom.id) !== id)
            this.activeRoom = await Room.findOne({ _id: id });
        return this.activeRoom;
    }

    emit(){
        this.socket.emit(...arguments);
    }
}

module.exports = function (server) {
    const io = socketIO(server);
    io.use(tokenAuthSocket);
    io.on('connection', async (socket) => {
        const sc = new SocketConnection(socket);
        await sc.getActiveRoom(socket.user.openChatRoom._id);
        socket.on('pushMessage', pushMessage(sc));
    });
    console.log(`SocketIo ready for connection`);
};
