const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

module.exports = function (app) {
    app.use(require('morgan')('dev'));
    app.use(bodyParserJSON);
    app.use(bodyParserURLEncoded);
};
