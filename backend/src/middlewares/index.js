
const log = require('morgan')('dev');
const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({extended:true});

module.exports = function (app) {
    app.use(log);
    app.use(bodyParserJSON);
    app.use(bodyParserURLEncoded);
};
