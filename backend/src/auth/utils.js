const Joi = require('@hapi/joi');
const axios = require('axios');
const User = require('../api/users/model');
const config = require('config');
const { OAuth2Client } = require('google-auth-library');

const makeRandomString = (length) => {
    var result = [];
    var characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(
            characters.charAt(Math.floor(Math.random() * charactersLength)),
        );
    }
    return result.join('');
};

exports.makeRandomString = makeRandomString;

exports.validateUser = async (user) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(8).max(255).required(),
    });

    return await schema.validateAsync(user);
};

exports.findOrCreateOAuthUser = async (
    firstName,
    lastName,
    email,
    imageUrl,
) => {
    let user = await User.findOne({ email: email });

    if (user) {
        if (imageUrl) {
            user.imageUrl = imageUrl;
            user.save();
        }
        return user;
    }

    const username = await User.createValidUsername(firstName, lastName);
    user = await User.create({
        username: username,
        password: makeRandomString(32),
        email: email,
        imageUrl: imageUrl,
    });
    return user;
};

exports.fetchGoogleCredentials = async (token) => {
    const googleClientId = config.get('authentication.googleClientId');
    const client = new OAuth2Client(googleClientId);
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: googleClientId,
    });
    return ticket.getPayload();
};

exports.fetchFacebookCredentials = async (token) => {
    const { data } = await axios({
        url: 'https://graph.facebook.com/me',
        method: 'get',
        params: {
            fields: [
                'id',
                'first_name',
                'last_name',
                'picture{url}',
                'email',
            ].join(','),
            access_token: token,
        },
    });
    return data;
};
