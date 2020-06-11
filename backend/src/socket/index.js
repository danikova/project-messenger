
module.exports = function(server){
    const io = require('socket.io')(server);
    io.on('connection', () => {
        /* … */
    });
    console.log(`SocketIo ready for connection`);
}
