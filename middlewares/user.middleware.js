const User = require('../dataBase/User');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const userByEmail = await User.findOne({email: req.body.email});

            if (userByEmail) {
                throw new Error('Email already exists');
            }

            if (!req.body.name || !req.body.email || !req.body.password) {
                throw new Error('Please fill required information');
            }
            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
