const Joi = require('joi');
const userSchema = Joi.object({
    email: Joi.string().min(3).required()
});

module.exports = userSchema;