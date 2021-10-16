const {MONGO_CONNECT_URL, PORT}= require('./config');
const {DEFAULT_STATUS_ERR, PASSWORD_REGEXP, EMAIL_REGEXP} = require('./constants');
const userRoles = require ('./user-roles.enum');

module.exports = {
    MONGO_CONNECT_URL,
    PORT,

    DEFAULT_STATUS_ERR,
    PASSWORD_REGEXP,
    EMAIL_REGEXP,

    userRoles
};


