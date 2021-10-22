const Joi = require('joi');

const {EMAIL_REGEXP, PASSWORD_REGEXP} = require('../configs');

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
        .regex(PASSWORD_REGEXP),
});

const emailValidator = Joi.object({
    email: Joi
        .string()
        .required()
        .trim()
        .regex(EMAIL_REGEXP),
});
const passwordValidator = Joi.object({
    email: Joi
        .string()
        .required()
        .trim()
        .regex(PASSWORD_REGEXP),
});


module.exports = {
    authValidator,
    emailValidator,
    passwordValidator
};
