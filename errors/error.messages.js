module.exports = {
    EMAIL_ALREADY_EXISTS: {
        message: 'Email already exists',
        status: 400
    },

    WRONG_EMAIL_OR_PASSWORD: {
        message: 'Wrong email or password',
        status: 404
    },

    USER_IS_NOT_FOUND: {
        message: 'User is not found',
        status: 404
    },

    ACCESS_DENIED: {
        message: 'Access denied',
        status: 403
    },

    INVALID_TOKEN: {
        message: 'Invalid token',
        status: 401
    }
};
