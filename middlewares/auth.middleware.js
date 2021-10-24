const {User, O_Auth, Action} = require('../dataBase');
const {authValidator} = require('../validators');
const {jwtService} = require('../service');
const {ErrorHandler, errorMessages} = require('../errors');
const {constants, action_token_type_enum, token_type_enum} = require('../configs');

module.exports = {
    isAuthValid: (req, res, next) => {
        try {
            const {error, value} = authValidator.authValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errorMessages.WRONG_EMAIL_OR_PASSWORD.message,
                    errorMessages.WRONG_EMAIL_OR_PASSWORD.status);
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
                throw new ErrorHandler(errorMessages.WRONG_EMAIL_OR_PASSWORD.message,
                    errorMessages.WRONG_EMAIL_OR_PASSWORD.status);
            }

            req.user = auth;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(errorMessages.INVALID_TOKEN.message, errorMessages.INVALID_TOKEN.status);
            }

            await jwtService.verifyToken(token, token_type_enum.ACCESS);

            const tokenResponse = await O_Auth.findOne({access_token: token});

            if (!tokenResponse) {
                throw new ErrorHandler(errorMessages.INVALID_TOKEN.message, errorMessages.INVALID_TOKEN.status);
            }

            req.user = tokenResponse.user_id;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(errorMessages.INVALID_TOKEN.message, errorMessages.INVALID_TOKEN.status);
            }

            await jwtService.verifyToken(token, token_type_enum.REFRESH);

            const tokenResponse = await O_Auth.findOne({refresh_token: token});

            if (!tokenResponse) {
                throw new ErrorHandler(errorMessages.INVALID_TOKEN.message, errorMessages.INVALID_TOKEN.status);
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
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(errorMessages.INVALID_TOKEN.message, errorMessages.INVALID_TOKEN.status);
            }

            await jwtService.verifyToken(token, action_token_type_enum.FORGOT_PASSWORD);

            const tokenResponse = await Action.findOne({action_token: token});

            if (!tokenResponse) {
                throw new ErrorHandler(errorMessages.INVALID_TOKEN.message, errorMessages.INVALID_TOKEN.status);
            }

            await Action.deleteOne({action_token: token});

            req.user = tokenResponse.user_id;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkActivateToken: async (req, res, next) => {
        try {
            const {token} = req.params;
            await jwtService.verifyToken(token, token_type_enum.ACTION);
            const {user_id: user, _id} = await Action.findOne({token, type: token_type_enum.ACTION});
            if (!user) {
                throw new ErrorHandler(errorMessages.INVALID_TOKEN);
            }

            await Action.deleteOne({_id});
            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    }
};
