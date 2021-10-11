const Joi = require('joi');

const {EMAIL_REGEXP} = require('../configs/constants');

const authValidator = Joi.object({
    email: Joi
        .string()
        .required()
        .trim()
        .regex(EMAIL_REGEXP),

    password: Joi
        .string()
        .required()
        .trim()
});

module.exports = {
    authValidator
};
