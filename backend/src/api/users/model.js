const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var UserSchema = require('./schema');

UserSchema.statics = {
    create: async function (data) {
        const user = new this(data);
        user.password = await bcrypt.hashSync(user.password, 10);
        await user.save();
        return user;
    },
    get: async function (query) {
        return await this.findOne(query);
    },
    getByName: async function (username) {
        return await this.findOne({ username: username });
    },
    getById: async function (id) {
        return await this.findOne({ _id: id });
    },
    update: async function (query, updateData) {
        return await this.findOneAndUpdate(
            query,
            { $set: updateData },
            { new: true },
        );
    },
    delete: async function (query) {
        return await this.findOneAndDelete(query);
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

var UsersModel = mongoose.model('Users', UserSchema);
module.exports = UsersModel;
