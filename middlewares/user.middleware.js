const {User} = require('../dataBase');
const {ErrorHandler, EMAIL_ALREADY_EXISTS, USER_IS_NOT_FOUND, ACCESS_DENIED} = require('../errors');

module.exports = {
    checkEmail: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userEmail = await User.findOne({email});

            if (userEmail) {
                throw new ErrorHandler(EMAIL_ALREADY_EXISTS.message, EMAIL_ALREADY_EXISTS.status);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserBodyValid: (validator) => async (req, res, next) => {
        try {
            const {error, value} = await validator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message,400);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkById: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const user = await User.findById(user_id);

            if (!user) {
                throw new ErrorHandler(USER_IS_NOT_FOUND.message, USER_IS_NOT_FOUND.status);
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkRole: (roleArr = []) => (req, res, next) => {
        try {
            const {role} = req.user;
            if (!roleArr.includes(role)) {
                throw new ErrorHandler (ACCESS_DENIED.message, ACCESS_DENIED.status);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};


