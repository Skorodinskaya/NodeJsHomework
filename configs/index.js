const {MONGO_CONNECT_URL, PORT,
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    NO_REPLY_EMAIL,
    NO_REPLY_EMAIL_PASSWORD}= require('./config');
const {DEFAULT_STATUS_ERR, PASSWORD_REGEXP, EMAIL_REGEXP, AUTHORIZATION} = require('./constants');
const userRoles = require ('./user-roles.enum');
const {ACCESS, REFRESH} = require('./token-type.enum');

module.exports = {
    MONGO_CONNECT_URL,
    PORT,
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    NO_REPLY_EMAIL_PASSWORD,
    NO_REPLY_EMAIL,

    DEFAULT_STATUS_ERR,
    PASSWORD_REGEXP,
    EMAIL_REGEXP,
    AUTHORIZATION,

    userRoles,

    ACCESS,
    REFRESH
};


