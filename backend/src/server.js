require('dotenv').config();

const express = require('express');
const path = require('path');
const http = require('http');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');

const databaseSetup = require('./services/database.setup');
const startSocketIO = require('./socket');
const { info } = require('./services/colored.logger');

const setApiRoutes = require('./api/routes');
const setAuthRoutes = require('./api/auth/routes');
const { MEDIA_PATH, FRONTEND_PATH } = require('./services/variables');

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
    app.use('/media/', express.static(MEDIA_PATH));
    app.use(morgan('dev'));
} else {
    app.use(express.static(FRONTEND_PATH));
    app.use(
        morgan(
            '[:date[clf]] :status :method :url :res[content-length] - :response-time ms',
        ),
    );
}
app.use(
    fileUpload({
        limits: { fileSize: 5 * 1024 * 1024 },
        uploadTimeout: 0,
        createParentPath: true,
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

app.get('*', (req, res) => {
    res.sendFile(path.join(FRONTEND_PATH, 'index.html'));
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
