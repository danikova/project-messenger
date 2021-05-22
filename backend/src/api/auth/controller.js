const bcrypt = require('bcryptjs');
const User = require('../users/model');
const wrap = require('../../services/async.view.wrapper');
const {
    validateUser,
    findOrCreateOAuthUser,
    fetchFacebookCredentials,
    fetchGoogleCredentials,
} = require('./utils');

exports.register = wrap(async (req, res) => {
    try {
        await validateUser(req.body);
    } catch (err) {
        return res.status(400).json({
            error: {
                templateName: 'api.error.auth.register.userDataInvalid',
                consoleLog: err.toString(),
                status: 400,
            },
        });
    }
    let user = await User.findOne({ username: req.body.username });
    if (user)
        return res.status(400).json({
            error: {
                templateName: 'api.error.auth.register.userAlreadyRegistered',
                status: 400,
            },
        });

    try {
        user = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
    } catch (err) {
        return res.status(400).json({
            error: {
                templateName: 'api.error.auth.register',
                consoleLog: err.toString(),
                status: 400,
            },
        });
    }

    res.status(201).json(user.selfJson());
});

exports.login = wrap(async (req, res) => {
    try {
        let user = await User.findOne({ username: req.body.username }).select(
            '+password',
        );
        const passwordMatch = bcrypt.compareSync(
            req.body.password,
            (user && user.password) || '',
        );
        if (!passwordMatch)
            return res.status(401).json({
                error: {
                    templateName: 'api.error.auth.login.invalidCredentials',
                    status: 401,
                },
            });

        res.status(200).json(user.selfJson());
    } catch (err) {
        res.status(401).json({
            error: {
                templateName: 'api.error.auth.login',
                consoleLog: err.toString(),
                status: 401,
            },
        });
    }
});

exports.googleLogin = wrap(async (req, res) => {
    try {
        const payload = await fetchGoogleCredentials(req.body.idToken);
        const user = await findOrCreateOAuthUser(
            payload.given_name,
            payload.family_name,
            payload.email,
            payload.picture,
        );
        res.status(200).json(user.selfJson());
    } catch (err) {
        return res.status(401).json({
            error: {
                templateName: 'api.error.auth.googleLogin',
                consoleLog: err.toString(),
                status: 401,
            },
        });
    }
});

exports.facebookLogin = wrap(async (req, res) => {
    try {
        const payload = await fetchFacebookCredentials(req.body.accessToken);
        const user = await findOrCreateOAuthUser(
            payload.first_name,
            payload.last_name,
            payload.email,
            payload.picture && payload.picture.data && payload.picture.data.url,
        );

        res.status(200).json(user.selfJson());
    } catch (err) {
        return res.status(401).json({
            error: {
                templateName: 'api.error.auth.facebookLogin',
                consoleLog: err.toString(),
                status: 401,
            },
        });
    }
});
