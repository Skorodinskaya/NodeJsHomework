const {MONGO_CONNECT_URL, PORT,
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    NO_REPLY_EMAIL,
    NO_REPLY_EMAIL_PASSWORD,
    SECRET_WORD
}= require('./config');
const {DEFAULT_STATUS_ERR, PASSWORD_REGEXP, EMAIL_REGEXP, AUTHORIZATION} = require('./constants');
const {ADMIN, USER, MANAGER} = require ('./user-roles.enum');
const {ACCESS, REFRESH} = require('./token-type.enum');
const {CREATED, UPDATED, DELETED} = require('./email-actions.enum');
const {STATUS_201, STATUS_204} = require('./status.codes');
const {FORGOT_PASSWORD} = require('./action_token_type.enum');

module.exports = {
    MONGO_CONNECT_URL,
    PORT,
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    NO_REPLY_EMAIL_PASSWORD,
    NO_REPLY_EMAIL,
    SECRET_WORD,

    DEFAULT_STATUS_ERR,
    PASSWORD_REGEXP,
    EMAIL_REGEXP,
    AUTHORIZATION,

    USER,
    MANAGER,
    ADMIN,

    ACCESS,
    REFRESH,

    CREATED,
    UPDATED,
    DELETED,

    STATUS_201,
    STATUS_204,

    FORGOT_PASSWORD,
};


