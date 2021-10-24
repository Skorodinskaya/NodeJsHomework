const jwt = require('jsonwebtoken');
const {ErrorHandler, errorMessages} = require('../errors');
const {action_token_type_enum, config, token_type_enum} = require('../configs');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, config.JWT_ACCESS_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign({}, config.JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType) => {
        try {
            let secretWord = '';

            switch (tokenType) {
                case token_type_enum.ACCESS:
                    secretWord = config.JWT_ACCESS_SECRET;
                    break;

                case token_type_enum.REFRESH:
                    secretWord = config.JWT_REFRESH_SECRET;
                    break;

                case token_type_enum.ACTION:
                    secretWord = config.JWT_ACTION_SECRET;
                    break;

                case action_token_type_enum.FORGOT_PASSWORD:
                    secretWord = config.JWT_PASSWORD_FORGOT_SECRET;
                    break;
            }
            await jwt.verify(token, secretWord);
        } catch (e) {
            throw new ErrorHandler(errorMessages.INVALID_TOKEN.message, errorMessages.INVALID_TOKEN.status);
        }
    },

    generateActionToken: (actionTokenType) => {
        let secretWord;

        switch (actionTokenType) {
            case action_token_type_enum.FORGOT_PASSWORD:
                secretWord = config.JWT_PASSWORD_FORGOT_SECRET;
                break;
            default:
                throw new ErrorHandler(errorMessages.INVALID_TOKEN.message, errorMessages.INVALID_TOKEN.status);
        }

        return jwt.sign({}, secretWord, {expiresIn: '24h'});
    },

    createActionToken: () => jwt.sign({}, config.JWT_ACTION_SECRET, {expiresIn: '1d'})
};


