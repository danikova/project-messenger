const Rooms = require('../api/rooms/model');
const SocketGlobals = require('./SocketGlobals');

class SocketConnection {
    constructor(socket) {
        this.socket = socket;
        this.user = this.socket.user;
        this.activeRoom = null;
        SocketGlobals.activeUsers[this.user.id] = this;
    }

    inActivateUser() {
        delete SocketGlobals.activeUsers[this.user.id];
    }

    async getActiveRoom(id) {
        if ((this.activeRoom && this.activeRoom.id) !== id)
            this.activeRoom = await Rooms.findOne({ _id: id });
        return this.activeRoom;
    }

    forEachRoomSockets(room, fn) {
        if (room.id in SocketGlobals.activeRooms)
            SocketGlobals.activeRooms[room.id].forEach(fn);
    }

    emit() {
        this.socket.emit(...arguments);
    }

    async joinAllRoom() {
        const rooms = await this.getUserRelatedRooms();
        for (const room of rooms) this.joinRoom(room);
    }

    async leaveAllRoom() {
        const rooms = await this.getUserRelatedRooms();
        for (const room of rooms) this.leaveRoom(room);
    }

    async getUserRelatedRooms() {
        return await Rooms.find({})
            .where('activeUsers')
            .in(this.user)
            .select('_id');
    }

    joinRoom(room) {
        if (!(room.id in SocketGlobals.activeRooms))
            SocketGlobals.activeRooms[room.id] = new Set();
        SocketGlobals.activeRooms[room.id].add(this.socket);
    }

    leaveRoom(room) {
        if (room.id in SocketGlobals.activeRooms) {
            SocketGlobals.activeRooms[room.id].delete(this.socket);
            if (SocketGlobals.activeRooms[room.id].size == 0)
                delete SocketGlobals.activeRooms[room.id];
        }
    }
}

module.exports = SocketConnection;
