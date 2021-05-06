const Joi = require("@hapi/joi");

exports.makeRandomString = (length) => {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
   }
   return result.join('');
}

exports.validateUser = async(user) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(8).max(255).required(),
    });

    return await schema.validateAsync(user);
}