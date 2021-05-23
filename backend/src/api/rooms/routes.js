const express = require('express');
const Room = require('./controller');

module.exports = function (router) {
    const roomRouter = express.Router();
    router.use('/rooms', roomRouter);

    roomRouter.get('/', Room.getRooms);
    roomRouter.post('/', Room.createRoom);
    roomRouter.get('/:id', Room.getRoom);
    roomRouter.post('/:id/push-message', Room.pushMessage);
    roomRouter.post('/:id/messages-from', Room.messagesFrom);
    roomRouter.post('/:id/add-user', Room.addUser);
    // roomRouter.post('/:id/remove-user', Room.removeUserFromRoom);
    roomRouter.post('/:id/remove-self', Room.removeSelfFromRoom);
};
