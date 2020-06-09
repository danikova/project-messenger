const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const setup = require('./config/setup');
const databaseSetup = require('./config/database');
const middlewares = require('./middlewares');
const apiRoutes = require('./api/routes');

const router = express.Router();

databaseSetup();
middlewares(app);

app.use('/api',router);

apiRoutes(router);

server.listen(setup.PORT, () => {
    console.log(`Server is running on ${setup.PORT} port.`);
});

io.on('connection', () => {
    /* … */
});
