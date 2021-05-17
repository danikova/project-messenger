const config = require('config');
const bcrypt = require('bcryptjs');
const User = require('../api/users/model');
const { OAuth2Client } = require('google-auth-library');
const { validateUser, makeRandomString } = require('./utils');


const googleClientId = config.get('authentication.googleClientId');

exports.register = async (req, res) => {
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

    const token = user.generateAuthToken();
    const userJson = user.toJSON();
    userJson.token = token;
    delete userJson.password;
    res.status(201).json(userJson);
};

exports.login = async (req, res) => {
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

    const token = user.generateAuthToken();
    const userJson = user.toJSON();
    userJson.token = token;
    delete userJson.password;
    res.status(200).json(userJson);
};

exports.googleLogin = async (req, res) => {
    let payload = {};
    try {
        const client = new OAuth2Client(googleClientId);
        const ticket = await client.verifyIdToken({
            idToken: req.body.idToken,
            audience: googleClientId,
        });
        payload = ticket.getPayload();
        asd = 1;
    } catch (e) {
        return res.status(401).json({
            error: 'User not exists with these provided credentials.',
        });
    }

    let user = await User.findOne({ email: payload.email });

    if (user) {
        user.imageUrl = payload.picture;
        user.save(); 
    }

    if (!user)
        try {
            const username = await User.createValidUsername(
                payload.given_name,
                payload.family_name,
            );
            user = await User.create({
                username: username,
                password: makeRandomString(32),
                email: payload.email,
                imageUrl: payload.picture,
            });
        } catch (e) {
            return res.status(400).json({
                error: String(e),
            });
        }

    const token = user.generateAuthToken();
    const userJson = user.toJSON();
    userJson.token = token;
    delete userJson.password;
    res.status(200).json(userJson);
};
