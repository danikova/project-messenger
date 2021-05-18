const config = require('config');
const express = require('express');
const http = require('http');
const listEndpoints = require('express-list-endpoints');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

const databaseSetup = require('./services/database.setup');
const startSocketIO = require('./socket');
const { info, error, fatal } = require('./services/colored.logger');

const setApiRoutes = require('./api/routes');
const setAuthRoutes = require('./auth/routes');

// -----------------------------------------
//
//    Checking config file
//
// -----------------------------------------
for (const key of ['privatekey', 'googleClientId']) {
    if (!config.has(`authentication.${key}`)) {
        fatal(`FATAL ERROR: ${key} is not defined.`);
        process.exit(1);
    }
}

// -----------------------------------------
//
//    Initial setup
//
// -----------------------------------------
const app = express();
const server = http.createServer(app);

// -----------------------------------------
//
//    Middlewares
//
// -----------------------------------------
app.use(morgan('dev'));
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

// -----------------------------------------
//
//    Views
//
// -----------------------------------------
app.get('/api/', (req, res) => res.status(200).json(listEndpoints(app)));
app.use('/api/', setApiRoutes());
app.use('/auth/', setAuthRoutes());

// -----------------------------------------
//
//    Error handling view
//
// -----------------------------------------
app.use(function (req, res, next) {
    res.status(404).send({
        error: {
            templateName: 'api.404',
        },
    });
});
app.use(function (err, req, res, next) {
    error('---------------- Server error:\n', err.stack, '----------------');
    res.status(500).send({
        error: {
            templateName: 'api.500',
            consoleLog: err.toString(),
        },
    });
});

// -----------------------------------------
//
//    Start server
//
// -----------------------------------------
server.listen(config.get('server.port'), config.get('server.host'), () => {
    info(
        `Server is running on ${config.get('server.host')}:${config.get(
            'server.port',
        )}`,
    );
    startSocketIO(server, '/comm/socket', () => {
        info(
            `SocketIO is listening on ${config.get('server.host')}:${config.get(
                'server.port',
            )}/comm/socket`,
        );
    });
    databaseSetup();
});

module.exports = app;
