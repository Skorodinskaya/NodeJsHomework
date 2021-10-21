const jwt = require('jsonwebtoken');
const {ErrorHandler, INVALID_TOKEN} = require('../errors');
const {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, ACCESS, SECRET_WORD} = require('../configs');
const FORGOT_PASSWORD = require('../configs/email-actions.enum');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, JWT_ACCESS_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType = ACCESS) => {
        try {
            const secret = tokenType === ACCESS ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET;
            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(INVALID_TOKEN.message, INVALID_TOKEN.status);
        }
    },

    generateActionToken: (actionTokenType) => {
        let secretWord;

        switch (actionTokenType) {
            case FORGOT_PASSWORD:
                secretWord = SECRET_WORD;
                break;
            default:
                throw new ErrorHandler(INVALID_TOKEN);
        }

        return jwt.sign({}, secretWord, {expiresIn: '24h'});
    }
};


