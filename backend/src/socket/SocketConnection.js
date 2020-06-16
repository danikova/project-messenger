const Rooms = require('../api/rooms/model');

class SocketConnection {
    constructor(socket) {
        this.socket = socket;
        this.user = this.socket.user;
        this.activeRoom = null;
    }

    async getActiveRoom(id) {
        if ((this.activeRoom && this.activeRoom.id) !== id)
            this.activeRoom = await Rooms.findOne({ _id: id });
        return this.activeRoom;
    }

    forEachRoomSockets(room, fn) {
        if (room.id in SocketConnection.activeRooms)
            SocketConnection.activeRooms[room.id].forEach(fn);
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
        return await Rooms.find({}).where('activeUsers').in(this.user).select('_id');
    }

    joinRoom(room) {
        if (!(room.id in SocketConnection.activeRooms))
            SocketConnection.activeRooms[room.id] = new Set();
        SocketConnection.activeRooms[room.id].add(this.socket);
    }

    leaveRoom(room) {
        if (room.id in SocketConnection.activeRooms) {
            SocketConnection.activeRooms[room.id].delete(this.socket);
            if (SocketConnection.activeRooms[room.id].size == 0)
                delete SocketConnection.activeRooms[room.id];
        }
    }
}

SocketConnection.activeRooms = {};

module.exports = SocketConnection;
