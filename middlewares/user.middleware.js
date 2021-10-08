const User = require('../dataBase/User');

module.exports = {
    emailMiddleware: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userEmail = await User.findOne({ email });

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
    }
};


