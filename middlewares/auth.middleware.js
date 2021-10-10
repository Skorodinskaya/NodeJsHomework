const User = require('../dataBase/User');
const {authValidator} = require('../validators/auth.validator');
const {compare} = require("../service/password.service");

module.exports = {
    isAuthValid: (req, res, next) => {
        try {
            const {error, value} = authValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    authLoginMiddleware: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const auth = await User.findOne({email});

            if (!auth) {
                throw new Error('Wrong email or password');
            }

            await compare(password, auth.password);

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
