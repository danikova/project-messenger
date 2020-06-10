const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const listEndpoints = require('express-list-endpoints');

const setup = require('./config/setup');
const databaseSetup = require('./config/database');
const middlewares = require('./middlewares');
const setApiRoutes = require('./api/routes');

databaseSetup();
middlewares(app);

const apiRouter = setApiRoutes();
app.use('/api', apiRouter);

server.listen(setup.PORT, () => {
    console.log(`Server is running on ${setup.PORT} port.`);
});

io.on('connection', () => {
    /* … */
});

app.get('/', function (req, res, next) {
    res.json(listEndpoints(app)).status(200);
});
