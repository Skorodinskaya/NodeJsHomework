const jwt = require('jsonwebtoken');
const {ErrorHandler, INVALID_TOKEN} = require('../errors');
const {JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    ACCESS,
    JWT_PASSWORD_FORGOT_SECRET,
    REFRESH} = require('../configs');
const {FORGOT_PASSWORD} = require('../configs/action_token_type.enum');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, JWT_ACCESS_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType) => {
        try {
            let secretWord;

            switch (tokenType) {
                case ACCESS:
                    secretWord = JWT_ACCESS_SECRET;
                    break;

                case REFRESH:
                    secretWord = JWT_REFRESH_SECRET;
                    break;

                case FORGOT_PASSWORD:
                    secretWord = JWT_PASSWORD_FORGOT_SECRET;
                    break;
            }
            await jwt.verify(token, secretWord);
        } catch (e) {
            throw new ErrorHandler(INVALID_TOKEN);
        }
    },

    generateActionToken: (actionTokenType) => {
        let secretWord;

        switch (actionTokenType) {
            case FORGOT_PASSWORD:
                secretWord = JWT_PASSWORD_FORGOT_SECRET;
                break;
            default:
                throw new ErrorHandler(INVALID_TOKEN);
        }

        return jwt.sign({}, secretWord, {expiresIn: '24h'});
    }
};


