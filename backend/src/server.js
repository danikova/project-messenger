require('dotenv').config();

const express = require('express');
const http = require('http');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');

const databaseSetup = require('./services/database.setup');
const startSocketIO = require('./socket');
const { info, error, fatal } = require('./services/colored.logger');

const setApiRoutes = require('./api/routes');
const setAuthRoutes = require('./api/auth/routes');

// -----------------------------------------
//
//    Initial setup
//
// -----------------------------------------

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 8000;
const app = express();
const server = http.createServer(app);

// -----------------------------------------
//
//    Middlewares
//
// -----------------------------------------
if (NODE_ENV === 'development') {
    app.use(morgan('dev'));
    app.use(express.static(__dirname));
} else {
    app.use(
        morgan(
            '[:date[clf]] :status :method :url :res[content-length] - :response-time ms',
        ),
    );
}
app.use(
    fileUpload({
        createParentPath: true,
        limits: { fileSize: 50 * 1024 * 1024 },
        uploadTimeout: 0,
        useTempFiles: true,
        tempFileDir: '/tmp/',
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -----------------------------------------
//
//    Views
//
// -----------------------------------------
app.use('/api/', setApiRoutes());
app.use('/auth/', setAuthRoutes());

// -----------------------------------------
//
//    Error handling view
//
// -----------------------------------------

if (NODE_ENV !== 'production')
    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(__dirname, '../frontend/build', 'index.html'),
        );
    });

// app.use(function (req, res, next) {
//     res.status(404).send({
//         error: {
//             templateName: 'api.error.404',
//             status: 404,
//         },
//     });
// });

app.use(function (err, req, res, next) {
    error(
        `// -----------------------------------------
        //
        //    Server error
        //
        // -----------------------------------------
        `,
        err.stack,
        '// -----------------------------------------',
    );
    res.status(500).send({
        error: {
            templateName: 'api.error.500',
            consoleLog: err.toString(),
            status: 500,
        },
    });
});

// -----------------------------------------
//
//    Start server
//
// -----------------------------------------
server.listen(PORT, () => {
    info(`Server is running on ${PORT}`);
    startSocketIO(server, '/comm/socket', () => {
        info(`SocketIO is listening on ${PORT}/comm/socket`);
    });
    databaseSetup();
});

module.exports = app;
