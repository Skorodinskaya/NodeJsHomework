const User = require('../dataBase/User');
const {authValidator} = require('../validators');
const {compare, jwtService} = require('../service');
const {ErrorHandler, WRONG_EMAIL_OR_PASSWORD, INVALID_TOKEN} = require('../errors');
const {AUTHORIZATION} = require('../configs');
const O_Auth = require('../dataBase/O_Auth');
const {REFRESH} = require('../configs');

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
            const {email, password} = req.body;

            const auth = await User.findOne({email});

            if (!auth) {
                throw new ErrorHandler(WRONG_EMAIL_OR_PASSWORD.message, WRONG_EMAIL_OR_PASSWORD.status);
            }

            await compare(password, auth.password);

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
                throw new ErrorHandler(INVALID_TOKEN);
            }

            await jwtService.verifyToken(token);

            const tokenResponse = await O_Auth
                .findOne({access_token: token})
                .populate('user_id');

            if (!tokenResponse) {
                throw new ErrorHandler(INVALID_TOKEN);
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
                throw new ErrorHandler(INVALID_TOKEN);
            }

            await jwtService.verifyToken(token, REFRESH);

            const tokenResponse = await O_Auth
                .findOne({refresh_token: token})
                .populate('user_id');

            if (!tokenResponse) {
                throw new ErrorHandler(INVALID_TOKEN);
            }

            await O_Auth.remove({refresh_token: token});

            req.user = tokenResponse.user_id;

            next();
        } catch (e) {
            next(e);
        }
    }
};
