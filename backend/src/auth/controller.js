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
    try {
        await validateUser(req.body);
    } catch (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    let user = await User.getByName(req.body.username);
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

exports.signIn = async (req, res) => {
    let user = await User.findOne({ username: req.body.username }).select('+password');
    const passwordMatch = bcrypt.compareSync(
        req.body.password,
        (user && user.password) || '',
    );
    if (!passwordMatch)
        return res.status(400).json({
            error: 'User not exists with these provided credentials.',
        });

    const token = user.generateAuthToken();
    const userJson = user.toJSON();
    userJson.token = token;
    delete userJson.password;
    res.status(200).json(userJson);
};
