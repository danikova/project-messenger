const bcrypt = require('bcryptjs');
const User = require('../api/users/model');
const wrap = require('../services/async.view.wrapper');
const {
    validateUser,
    findOrCreateOAuthUser,
    fetchFacebookCredentials,
    fetchGoogleCredentials,
} = require('./utils');

exports.register = wrap(async (req, res) => {
    try {
        await validateUser(req.body);
    } catch (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    let user = await User.findOne({ username: req.body.username });
    if (user)
        return res.status(400).json({
            error: 'User already registered.',
        });

    try {
        user = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
    } catch (e) {
        return res.status(400).json({
            error: String(e),
        });
    }

    res.status(201).json(user.selfJson());
});

exports.login = wrap(async (req, res) => {
    let user = await User.findOne({ username: req.body.username }).select(
        '+password',
    );
    const passwordMatch = bcrypt.compareSync(
        req.body.password,
        (user && user.password) || '',
    );
    if (!passwordMatch)
        return res.status(401).json({
            error: 'User not exists with these provided credentials.',
        });

    res.status(200).json(user.selfJson());
});

exports.googleLogin = wrap(async (req, res) => {
    next(new Error(`Something went wrong!`));
    try {
        const payload = await fetchGoogleCredentials(req.body.idToken);
        const user = await findOrCreateOAuthUser(
            payload.given_name,
            payload.family_name,
            payload.email,
            payload.picture,
        );
        res.status(200).json(user.selfJson());
    } catch (e) {
        return res.status(401).json({
            error: 'User not exists with these provided credentials.',
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
    } catch (e) {
        return res.status(401).json({
            error: 'User not exists with these provided credentials.',
        });
    }
});
