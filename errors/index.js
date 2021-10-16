const {
    ACCESS_DENIED,
    EMAIL_ALREADY_EXISTS,
    UPDATE_ONLY_NAME,
    USER_IS_NOT_FOUND,
    WRONG_EMAIL_OR_PASSWORD
} = require('./error.messages');

module.exports = {
    ErrorHandler: require('./ErrorHandler'),
    WRONG_EMAIL_OR_PASSWORD,
    USER_IS_NOT_FOUND,
    UPDATE_ONLY_NAME,
    EMAIL_ALREADY_EXISTS,
    ACCESS_DENIED
};
