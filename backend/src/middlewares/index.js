const log = require('morgan')('dev');
const bodyParser = require('body-parser');
const winston = require('winston')
const expressWinston = require('express-winston');

const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

module.exports = function (app) {
    app.use(log);
    app.use(
        expressWinston.logger({
            transports: [new winston.transports.Console()],
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.json(),
            ),
            meta: true,
            msg: 'HTTP {{req.method}} {{req.url}}',
            expressFormat: true,
            colorize: false,
            ignoreRoute: function (req, res) {
                return false;
            },
        }),
    );
    app.use(bodyParserJSON);
    app.use(bodyParserURLEncoded);
};
