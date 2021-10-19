const {MONGO_CONNECT_URL, PORT, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET}= require('./config');
const {DEFAULT_STATUS_ERR, PASSWORD_REGEXP, EMAIL_REGEXP, AUTHORIZATION} = require('./constants');
const userRoles = require ('./user-roles.enum');
const {ACCESS, REFRESH} = require('./token-type.enum');

module.exports = {
    MONGO_CONNECT_URL,
    PORT,
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,

    DEFAULT_STATUS_ERR,
    PASSWORD_REGEXP,
    EMAIL_REGEXP,
    AUTHORIZATION,

    userRoles,

    ACCESS,
    REFRESH
};


