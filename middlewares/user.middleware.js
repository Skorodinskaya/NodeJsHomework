const User = require('../dataBase/User');

module.exports = {
    emailMiddleware: async (req, res, next) => {
        try {
            const userEmail = await User.findOne({email: req.body.email});

            if (userEmail) {
                throw new Error('Email already exists');
            }
            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    requiredDataMiddleware: async (res, req, next) => {
        try {
            const {password, email} = req.body;

            const userPassword = await User.find({password, email});

            if (!userPassword) {
                throw new Error('Please fill out all required fields');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};


