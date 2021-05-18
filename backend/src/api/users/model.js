const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const UserSchema = require('./schema');
const { generateColors } = require('../utils');
const { removeAccents, createNamingSuggestions } = require('./utils');

const usernameMaxLength = 8;

UserSchema.statics = {
    create: async function (data) {
        const randomColor = generateColors();
        data.color = {
            primary: randomColor.primary,
            secondary: randomColor.secondary,
        };
        const user = new this(data);
        user.password = await bcrypt.hashSync(user.password, 10);
        await user.save();
        return user;
    },
    createValidUsername: async function (firstName, lastName) {
        firstName = removeAccents(firstName).toLowerCase();
        lastName = removeAccents(lastName).toLowerCase();

        const suggestions = createNamingSuggestions(
            firstName,
            lastName,
            usernameMaxLength,
        );
        const lastSuggestion = suggestions[suggestions.length - 1];

        let number = 0;
        let user = null;
        let username = '';
        do {
            if (suggestions.length !== 0) username = suggestions.shift();
            else {
                number += 1;
                const numberStr = number.toString();
                username = `${lastSuggestion.slice(
                    0,
                    usernameMaxLength - numberStr.length,
                )}${numberStr}`;
            }
            user = this.getByName(username);
        } while (user === null);
        return username;
    },
    get: async function (query) {
        return await this.find(query).publicData();
    },
    getByName: async function (username) {
        return await this.findOne({ username: username }).publicData();
    },
    getById: async function (id) {
        return await this.findOne({ _id: id }).publicData();
    },
    update: async function (query, updateData) {
        return await this.findOneAndUpdate(
            query,
            { $set: updateData },
            { new: true },
        ).publicData();
    },
    delete: async function (query) {
        return await this.findOneAndDelete(query);
    },
};

UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id },
        config.get('authentication.privatekey'),
    );
    return token;
};

UserSchema.methods.selfJson = function () {
    const userJson = this.toJSON();
    userJson.token = this.generateAuthToken();
    delete userJson.password;
    return userJson;
};

UserSchema.query.publicData = function () {
    return this.select('username color');
};

const UsersModel = mongoose.model('Users', UserSchema);
module.exports = UsersModel;
