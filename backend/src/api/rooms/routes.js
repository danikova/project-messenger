const express = require('express');
const Room = require('./controller');

module.exports = function (router) {
    const roomRouter = express.Router();
    router.use('/rooms', roomRouter);

    roomRouter.get('/', Room.getRooms);
    roomRouter.post('/', Room.createRoom);
    roomRouter.get('/:id', Room.getRoom);
    roomRouter.post('/:id/add-user', Room.addUserToRoom);
    // roomRouter.post('/:id/remove-user', Room.removeUserFromRoom);
    roomRouter.post('/:id/remove-self', Room.removeSelfFromRoom);
};
