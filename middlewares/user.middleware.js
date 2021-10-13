const User = require('../dataBase/User');
const {Types} = require("mongoose");
const {userValidator} = require('../validators');
const ErrorHandler = require("../errors/ErrorHandler");

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body.email;

            const userEmail = await User.findOne({email});

            if (userEmail) {
                return next({
                    message: 'Email already exists',
                    status: 404
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserBodyValid: (req, res, next) => {
        try {
            const {error, value} = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler('Wrong email or password', 404);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    updateUserMiddleware: (req, res, next) => {
        try {
            const {error, value} = userValidator.updateUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, 404);
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

            const user = await User.exists({_id: Types.ObjectId(user_id)});

            if (!user) {
                throw new ErrorHandler('There is no user with this id', 404);
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    }
};


