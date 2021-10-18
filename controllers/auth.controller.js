const {O_Auth} = require('../dataBase');
const {userNormalizator} = require('../util/user.util');
const {jwtService} = require('../service');
const {AUTHORIZATION} = require('../configs');
const {ErrorHandler, INVALID_TOKEN} = require('../errors');


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
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(INVALID_TOKEN.message, INVALID_TOKEN.status);
            }

            await jwtService.verifyToken(token);

            await O_Auth.deleteOne({access_token: token});

            next();
        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
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
};
