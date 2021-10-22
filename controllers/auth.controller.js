const {O_Auth, ActionToken, User} = require('../dataBase');
const {userNormalizator} = require('../util/user.util');
const {jwtService, emailService, passwordService} = require('../service');
const {USER_IS_NOT_FOUND, ErrorHandler, PASSWORD_CHANGED} = require('../errors');
const {LINK_TO_WEBSITE, STATUS_204, NEW_PASSWORD} = require('../configs');
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

    sendMailForgotPassword: async (req, res, next) => {
        try {

            const user = req.user;

            const {email} = user;

            const actionToken = jwtService.generateActionToken(ActionTokenTypeEnum.FORGOT_PASSWORD);

            await ActionToken.create({
                token: actionToken,
                token_type: ActionTokenTypeEnum.FORGOT_PASSWORD,
                user_id: user._id
            });

            await emailService.sendMail(
                email,
                EmailActionEnum.FORGOT_PASSWORD,
                {forgotPasswordUrl: LINK_TO_WEBSITE + `/passwordForgot?token=${actionToken}`});

            res.sendStatus(STATUS_204);
        } catch (e) {
            next(e);
        }
    },

    setNewPasswordAfterForgot: async (req, res, next) => {
        try {
            const {_id, email, name} = req.user;
            const {password} = req.body;

            const hashedPassword = await passwordService.hash(password);

            const updatePassword = await User.findByIdAndUpdate(_id, {$set: {password: hashedPassword}});

            if(!updatePassword) {
                throw new ErrorHandler(USER_IS_NOT_FOUND.message, USER_IS_NOT_FOUND.status);
            }
            await emailService.sendMail(email, NEW_PASSWORD, {userName: name, password});

            await O_Auth.deleteMany({user_id: _id});

            res.json(PASSWORD_CHANGED);
        } catch (e) {
            next(e);
        }
    },

};
