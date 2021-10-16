const User = require('../dataBase/User');
const {authValidator} = require('../validators');
const {compare} = require('../service/password.service');
const {ErrorHandler, WRONG_EMAIL_OR_PASSWORD} = require('../errors');

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
    }
};
