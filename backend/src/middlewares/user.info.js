const {
    uniqueNamesGenerator,
    adjectives,
    names,
} = require('unique-names-generator');
const { uuid } = require('uuidv4');


function UserInfoMiddleware(req, res, next) {
    if (!req.session.id) {
        const customConfig = {
            dictionaries: [adjectives, names],
            separator: '-',
            length: 2,
        };
        req.session.username = uniqueNamesGenerator(customConfig);
        req.session.id = uuid();
    }
    next();
}

module.exports = UserInfoMiddleware;



// const UserInfoMiddleware = require('./user.info');
// const CookieSession = require('cookie-session');
// app.use(
//     CookieSession({
//         name: 'session',
//         keys: ['secret_key_1', 'secret_key_2'],
//         maxAge: 30 * 24 * 60 * 60 * 1000,
//     }),
// );
// app.use(UserInfoMiddleware);