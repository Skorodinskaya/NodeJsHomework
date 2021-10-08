const User = require('../dataBase/User');

module.exports = {
    loginUser: async (req, res) => {
        try {
            const authEmail = await User.find({email: req.body.email, password: req.body.password});

            if (!authEmail) {
                throw new Error('Wrong email or password');
            }

            res.json('Welcome');
        } catch (e) {
            res.json(e.message);
        }
    }
};
