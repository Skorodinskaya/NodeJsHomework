const {User} = require('../dataBase');
const {ErrorHandler, errorMessages} = require('../errors');
const {STATUS_400} = require('../configs/status_codes');

module.exports = {
    checkEmail: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userEmail = await User.findOne({email});

            if (userEmail) {
                throw new ErrorHandler(errorMessages.EMAIL_ALREADY_EXISTS.message, errorMessages.EMAIL_ALREADY_EXISTS.status);
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
                throw new ErrorHandler(error.details[0].message, STATUS_400);
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
                throw new ErrorHandler(errorMessages.USER_IS_NOT_FOUND.message, errorMessages.USER_IS_NOT_FOUND.status);
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
                throw new ErrorHandler(errorMessages.ACCESS_DENIED.message, errorMessages.ACCESS_DENIED.status);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserActive: (req, res, next) => {
        try {
            const {user} = req;
            if (!user.is_active) {
                throw new ErrorHandler(errorMessages.USER_IS_NOT_ACTIVE.message,
                    errorMessages.USER_IS_NOT_ACTIVE.status);
            }
            next();
        }catch (e) {
            next(e);
        }
    }
};


