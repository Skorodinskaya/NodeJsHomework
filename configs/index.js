const {MONGO_CONNECT_URL, PORT,
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    NO_REPLY_EMAIL,
    NO_REPLY_EMAIL_PASSWORD,
    SECRET_WORD,
    LINK_TO_WEBSITE,
}= require('./config');
const {DEFAULT_STATUS_ERR, PASSWORD_REGEXP, EMAIL_REGEXP, AUTHORIZATION} = require('./constants');
const {ADMIN, USER, MANAGER} = require ('./user-roles.enum');
const {ACCESS, REFRESH, ACTION} = require('./token-type.enum');
const {CREATED, UPDATED, DELETED} = require('./email-actions.enum');
const {STATUS_201, STATUS_204, STATUS_400} = require('./status.codes');

module.exports = {
    MONGO_CONNECT_URL,
    PORT,
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    NO_REPLY_EMAIL_PASSWORD,
    NO_REPLY_EMAIL,
    SECRET_WORD,
    LINK_TO_WEBSITE,

    DEFAULT_STATUS_ERR,
    PASSWORD_REGEXP,
    EMAIL_REGEXP,
    AUTHORIZATION,

    USER,
    MANAGER,
    ADMIN,

    ACCESS,
    REFRESH,
    ACTION,

    CREATED,
    UPDATED,
    DELETED,

    STATUS_201,
    STATUS_204,
    STATUS_400
};


