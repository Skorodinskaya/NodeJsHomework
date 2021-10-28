const Joi = require('joi');

const {EMAIL_REGEXP, PASSWORD_REGEXP} = require('../configs/constants');
const userRoles = require('../configs/user_roles_enum');
const CV = require('./common.validators');

const userLanguageValidator = {
    en: Joi.string(),
    fr: Joi.string(),
    sp: Joi.string()
};
const createUserValidator = Joi.object({
    name: CV.nameValidator.required(),
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
    language: CV.languageValidator,
    ...userLanguageValidator
});

const updateUserValidator = Joi.object({
    name: CV.nameValidator.required(),
});

module.exports = {
    createUserValidator,
    updateUserValidator
};
