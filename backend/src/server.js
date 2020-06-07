const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', () => {
    /* … */
});

server.listen(8000, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});

app.get('/', function (req, res) {
    res.json({}).status(200);
});
