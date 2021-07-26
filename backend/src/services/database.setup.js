const mongoose = require('mongoose');
const { info, warning, error, fatal } = require('./colored.logger');

const MONGODB_URL = process.env.MONGODB_URL;
const MONGODB_NAME = process.env.MONGODB_NAME;
const MONGODB_URI =
    process.env.MONGODB_URI || `mongodb://${MONGODB_URL}/${MONGODB_NAME}`;

module.exports = function () {
    mongoose.connect(MONGODB_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });

    mongoose.connection.on('connected', function () {
        info(`Mongoose is connected on ${MONGODB_URI}`);
    });

    mongoose.connection.on('error', function (err) {
        warning('Mongoose default connection has occured', err, 'error');
    });

    mongoose.connection.on('disconnected', function () {
        error('Mongoose default connection is disconnected');
    });

    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            fatal(
                'Mongoose default connection is disconnected due to application termination',
            );
            process.exit(0);
        });
    });
};
