const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const UserSchema = require('./schema');
const generateColors = require('../../shared/random.color');

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
    get: async function (query) {
        return await this.findOne(query).wOPass();
    },
    getByName: async function (username) {
        return await this.findOne({ username: username }).wOPass();
    },
    getById: async function (id) {
        return await this.findOne({ _id: id }).wOPass();
    },
    update: async function (query, updateData) {
        return await this.findOneAndUpdate(
            query,
            { $set: updateData },
            { new: true },
        ).wOPass();
    },
    delete: async function (query) {
        return await this.findOneAndDelete(query).wOPass();
    }
};

UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id },
        config.get('authentication.privatekey'),
    );
    return token;
};

UserSchema.query.wOPass = function(){
    return this.select("-password");
}

const UsersModel = mongoose.model('Users', UserSchema);
module.exports = UsersModel;
