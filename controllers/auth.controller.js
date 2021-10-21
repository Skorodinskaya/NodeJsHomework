const {O_Auth, User, ActionToken} = require('../dataBase');
const {userNormalizator} = require('../util/user.util');
const {jwtService, emailService} = require('../service');
const {USER_IS_NOT_FOUND, ErrorHandler} = require('../errors');
const {LINK_TO_WEBSITE, AUTHORIZATION} = require('../configs');
const ActionTokenTypeEnum = require('../configs/action_token_type.enum');
const EmailActionEnum = require('../configs/email-actions.enum');

module.exports = {
    loginController: async (req, res, next) => {
        try {
            const user = req.user;

            await user.comparePassword(req.body.password);

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
            const {user} = req;

            await O_Auth.deleteOne({user_id: user._id});

            res.json('The logout has been done.');
        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const {user, refresh_token} = req;

            const tokenPair = jwtService.generateTokenPair();

            const normalizedUser = userNormalizator(user);

            await O_Auth.findOneAndUpdate({refresh_token}, tokenPair);

            res.json({
                user: normalizedUser,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },

    sendMailForgotPassword: async (res, req, next) => {
        try {
            const {email} = req.body;

            const user = await User.findOne({email});

            if(!user) {
                throw new ErrorHandler(USER_IS_NOT_FOUND);
            }

            const actionToken = jwtService.generateActionToken(ActionTokenTypeEnum.FORGOT_PASSWORD);

            await ActionToken.create({
                token: actionToken,
                token_type: ActionTokenTypeEnum.FORGOT_PASSWORD,
                user_id: user._id
            });

            await emailService.sendMail(
                email,
                EmailActionEnum.FORGOT_PASSWORD,
                {forgotPasswordUrl: LINK_TO_WEBSITE`/passwordForgot?token=${actionToken}`});

            res.json('successful forgetting');
        } catch (e) {
            next(e);
        }
    },

    setNewPasswordAfterForgot: (req, res, next) => {
        try {
            const actionToken = req.get(AUTHORIZATION);

            console.log(actionToken);

            res.json('successful setting');
        } catch (e) {
            next(e);
        }
    },

};
