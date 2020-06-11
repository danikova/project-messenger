const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const User = require('../api/users/model');

async function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(8).max(255).required(),
    });

    return await schema.validateAsync(user);
}

exports.signUp = async (req, res) => {
    const { error } = await validateUser(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    let user = await User.getByName(req.body.username);
    if (user)
        return res.status(400).send({
            error: 'User already registered.',
        });

    try {
        user = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
    } catch (e) {
        return res.status(400).send({
            error: String(e),
        });
    }

    const token = user.generateAuthToken();
    res.header('x-access-token', token).send({
        _id: user._id,
        username: user.username,
        token: token
    });
};

exports.signIn = async (req, res) => {
    let user = await User.getByName(req.body.username);
    const passwordMatch = bcrypt.compareSync(
        req.body.password,
        (user && user.password) || '',
    );
    if (!passwordMatch)
        return res.status(400).send({
            error: 'User not exists with these provided credentials.',
        });

    const token = user.generateAuthToken();
    res.header('x-access-token', token).send({
        _id: user._id,
        username: user.username,
        token: token
    });
};
