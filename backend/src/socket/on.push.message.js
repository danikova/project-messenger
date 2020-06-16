module.exports = function (sc) {
    return async (data) => {
        const user = sc.socket.user;
        const room = await sc.getActiveRoom(data.roomId);
        const newMessage = await room.pushMessage({
            user,
            message: data.message,
        });
        sc.forEachRoomSockets(room, (socket) => {
            if (socket !== sc.socket)
                socket.emit('newMessage', newMessage.toJSON());
        });
        room.save();
        sc.emit('pushMessageSuccess');
    };
};
