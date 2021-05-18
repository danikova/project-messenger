const mongoose = require('mongoose');
const config = require('config');
const { info, warning, error, fatal } = require('./colored.logger');

module.exports = function () {
    mongoose.connect(
        `mongodb://${config.get('db.url')}/${config.get('db.name')}`,
        {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        },
    );

    mongoose.connection.on('connected', function () {
        info(`Mongoose is connected on ${config.get('db.url')}`);
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
