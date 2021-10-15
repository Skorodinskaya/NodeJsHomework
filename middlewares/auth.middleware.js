const User = require('../dataBase/User');
const {authValidator} = require('../validators');
const {compare} = require('../service/password.service');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    isAuthValid: (req, res, next) => {
        try {
            const {error, value} = authValidator.authValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, 404);
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
                throw new ErrorHandler('Wrong email or password', 404);
            }

            await compare(password, auth.password);

            req.user = auth;
            next();
        } catch (e) {
            next(e);
        }
    }
};
