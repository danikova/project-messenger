const bcrypt = require('bcryptjs');
const User = require('../api/users/model');
const { OAuth2Client } = require('google-auth-library');
const { validateUser, makeRandomString } = require('./utils');

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
        const client = new OAuth2Client(process.env.CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken: req.body.idToken,
            audience: process.env.CLIENT_ID,
        });
        payload = ticket.getPayload();
        asd = 1;
    } catch (e) {
        return res.status(401).json({
            error: 'User not exists with these provided credentials.',
        });
    }

    let user = await User.findOne({ email: payload.email });
    let created = false;
    if (!user)
        try {
            user = await User.create({
                username: payload.email,
                password: makeRandomString,
                email: payload.email,
                imageUrl: payload.picture
            });
            created = true;
        } catch (e) {
            return res.status(400).json({
                error: String(e),
            });
        }

    const token = user.generateAuthToken();
    const userJson = user.toJSON();
    userJson.token = token;
    userJson.created = created;
    delete userJson.password;
    res.status(200).json(userJson);
};
