const express = require('express');
var Room = require('./controller');

module.exports = function (router) {
    const roomRouter = express.Router();
    router.use('/rooms', roomRouter);

    roomRouter.get('/', Room.getRooms);
    roomRouter.post('/', Room.createRoom);
    roomRouter.get('/:id', Room.getRoom);
    roomRouter.put('/:id', Room.updateRoom);
    roomRouter.delete('/:id', Room.removeRoom);
};
