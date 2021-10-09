const User = require('../dataBase/User');
const {Types} = require("mongoose");

module.exports = {
    emailMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userEmail = await User.findOne({email});

            if (userEmail) {
                throw new Error('Email already exists');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    requiredDataMiddleware: async (req, res, next) => {
        try {
            const {password, email} = req.body;

            const userPassword = await User.findOne({password, email});

            if (!userPassword) {
                throw new Error('Please fill out all required fields');
            }

            req.user = userPassword;
            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    checkById: async (req, res, next) => {
        try {
            const {id} = req.params;
            const user = await User.exists({_id: Types.ObjectId(id)});

            if (!user) {
                throw new Error('There is no user with this id');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};


