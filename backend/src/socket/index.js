const tokenAuth = require('../middlewares/token.auth');

module.exports = function(server){
    const io = require('socket.io')(server);
    io.use(tokenAuth);
    io.on('connection', () => {
        /* … */
    });
    console.log(`SocketIo ready for connection`);
}
