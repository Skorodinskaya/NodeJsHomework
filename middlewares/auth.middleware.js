const { FORGOT_PASSWORD } = require('../configs/action_token_type.enum');
const {User, O_Auth, ActionToken} = require('../dataBase');
const {authValidator} = require('../validators');
const {jwtService} = require('../service');
const {ErrorHandler, WRONG_EMAIL_OR_PASSWORD, INVALID_TOKEN} = require('../errors');
const {AUTHORIZATION, REFRESH, ACCESS} = require('../configs');

module.exports = {
    isAuthValid: (req, res, next) => {
        try {
            const {error, value} = authValidator.authValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(WRONG_EMAIL_OR_PASSWORD.message, WRONG_EMAIL_OR_PASSWORD.status);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    authLoginMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;

            const auth = await User.findOne({email});

            if (!auth) {
                throw new ErrorHandler(WRONG_EMAIL_OR_PASSWORD.message, WRONG_EMAIL_OR_PASSWORD.status);
            }

            req.user = auth;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(INVALID_TOKEN.message, INVALID_TOKEN.status);
            }

            await jwtService.verifyToken(token, ACCESS);

            const tokenResponse = await O_Auth.findOne({access_token: token});

            if (!tokenResponse) {
                throw new ErrorHandler(INVALID_TOKEN.message, INVALID_TOKEN.status);
            }

            req.user = tokenResponse.user_id;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(INVALID_TOKEN.message, INVALID_TOKEN.status);
            }

            await jwtService.verifyToken(token, REFRESH);

            const tokenResponse = await O_Auth.findOne({refresh_token: token});

            if (!tokenResponse) {
                throw new ErrorHandler(INVALID_TOKEN.message, INVALID_TOKEN.status);
            }

            req.user = tokenResponse.user_id;
            req.refresh_token = tokenResponse.refresh_token;

            next();
        } catch (e) {
            next(e);
        }
    },
    checkActionToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(INVALID_TOKEN.message, INVALID_TOKEN.status);
            }

            await jwtService.verifyToken(token, FORGOT_PASSWORD);

            const tokenResponse = await ActionToken.findOne({action_token: token});

            if (!tokenResponse) {
                throw new ErrorHandler(INVALID_TOKEN.message, INVALID_TOKEN.status);
            }

            await ActionToken.deleteOne({action_token: token});

            req.user = tokenResponse.user_id;
            next();
        } catch (e) {
            next(e);
        }
    },
};
