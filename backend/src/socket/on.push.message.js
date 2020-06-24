module.exports = function (sc) {
    return async (data) => {
        const user = sc.socket.user;
        const room = await sc.getActiveRoom(data.roomId);
        await room.pushMessage({
            user,
            message: data.message,
        }, sc.socket);
        room.save();
        sc.emit('pushMessageSuccess');
    };
};
