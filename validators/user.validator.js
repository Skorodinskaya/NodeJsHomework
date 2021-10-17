const Joi = require('joi');

const {EMAIL_REGEXP, PASSWORD_REGEXP, userRoles} = require('../configs');

const createUserValidator = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .required(),

    email: Joi
        .string()
        .regex(EMAIL_REGEXP)
        .required()
        .trim(),

    role: Joi
        .string()
        .allow(...Object.values(userRoles)),

    password: Joi
        .string()
        .regex(PASSWORD_REGEXP)
        .required(),
});

const updateUserValidator = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .required(),
});

module.exports = {
    createUserValidator,
    updateUserValidator
};
