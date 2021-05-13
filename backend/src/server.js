require('dotenv').config();
if(!process.env.GOOGLE_CLIENT_ID)
    throw Error('Google OAuth 2.0 GOOGLE_CLIENT_ID not found')

const config = require('config');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const listEndpoints = require('express-list-endpoints');

if (!config.has('authentication.privatekey')) {
    console.error('FATAL ERROR: privatekey is not defined.');
    process.exit(1);
}

const databaseSetup = require('./shared/database');
const middlewares = require('./middlewares');
const setApiRoutes = require('./api/routes');
const setAuthRoutes = require('./auth/routes');
const setSocket = require('./socket');

databaseSetup();
middlewares(app);

app.get('/api/', function (req, res, next) {
    res.status(200).json(listEndpoints(app));
});

const apiRouter = setApiRoutes();
const authRouter = setAuthRoutes();
app.use('/api/', apiRouter);
app.use('/auth/', authRouter);
setSocket(server, "/comm/socket");

server.listen(config.get('server.port'), config.get('server.host'), () => {
    console.log(`Server is running on ${config.get('server.host')}:${config.get('server.port')}`);
});

module.exports = app;
