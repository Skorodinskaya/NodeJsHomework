const {
    ACCESS_DENIED,
    EMAIL_ALREADY_EXISTS,
    USER_IS_NOT_FOUND,
    WRONG_EMAIL_OR_PASSWORD,
    INVALID_TOKEN,
    WRONG_TEMPLATE,
} = require('./error.messages');

const {
    PASSWORD_CHANGED,
} = require('./messages_enum');

module.exports = {
    ErrorHandler: require('./ErrorHandler'),
    WRONG_EMAIL_OR_PASSWORD,
    USER_IS_NOT_FOUND,
    EMAIL_ALREADY_EXISTS,
    ACCESS_DENIED,
    INVALID_TOKEN,
    WRONG_TEMPLATE,

    PASSWORD_CHANGED,
};
