const User = require('../dataBase/User');
const {Types} = require("mongoose");
const {createUserValidator, updateUserValidator} = require('../validators/user.validator');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body.email;

            const userEmail = await User.findOne({email});

            if (userEmail) {
                throw new Error('Email already exists');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    isUserBodyValid: (req, res, next) => {
        try {
            const {error, value} = createUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    updateUserMiddleware: (req, res, next) => {
        try {
            const {error, value} = updateUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;
            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    checkById: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const user = await User.exists({_id: Types.ObjectId(user_id)});

            if (!user) {
                throw new Error('There is no user with this id');
            }

            req.body = user;
            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};


