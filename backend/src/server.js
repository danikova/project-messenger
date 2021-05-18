const config = require('config');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const listEndpoints = require('express-list-endpoints');

for (const key of ['privatekey', 'googleClientId']) {
    if (!config.has(`authentication.${key}`)) {
        console.error(`FATAL ERROR: ${key} is not defined.`);
        process.exit(1);
    }
}

const databaseSetup = require('./services/database.setup');
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
setSocket(server, '/comm/socket');

server.listen(config.get('server.port'), config.get('server.host'), () => {
    console.log(
        `Server is running on ${config.get('server.host')}:${config.get(
            'server.port',
        )}`,
    );
});

module.exports = app;
