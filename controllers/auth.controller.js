const User = require('../dataBase/User');
const O_Auth = require('../dataBase/O_Auth');
const {userNormalizator} = require('../util/user.util');
const {jwtService} = require('../service');


module.exports = {
    loginController: async (req, res, next) => {
        try {
            const user = req.user;

            const tokenPair = jwtService.generateTokenPair();

            const normalizedUser = userNormalizator(user);

            await O_Auth.create({
                ...tokenPair,
                user_id: normalizedUser._id
            });

            res.json({
                user: normalizedUser,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const users = await User.find();

            res.json(users);

        } catch (e) {
            next(e);
        }
    }
};
