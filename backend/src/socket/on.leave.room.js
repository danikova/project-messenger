const Rooms = require('../api/rooms/model');

module.exports = function (sc) {
    return async (data) => {
        const { roomId } = data;
        try {
            const room = await Rooms.findOne({ _id: roomId });
            sc.leaveRoom(room);
        } catch {}
    };
};
