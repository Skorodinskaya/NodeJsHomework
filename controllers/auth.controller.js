const {O_Auth, ActionToken, User} = require('../dataBase');
const {userNormalizator} = require('../util/user.util');
const {jwtService, emailService, passwordService} = require('../service');
const {ErrorHandler, message_enum, errorMessages} = require('../errors');
const {status_codes, config, email_actions_enum, action_token_type_enum} = require('../configs');

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
            const {email} = req.body;

            const actionToken = jwtService.generateActionToken(action_token_type_enum.FORGOT_PASSWORD);

            await ActionToken.create({
                token: actionToken,
                token_type: action_token_type_enum.FORGOT_PASSWORD,
                user_id: user._id
            });

            await emailService.sendMail(
                email,
                email_actions_enum.FORGOT_PASSWORD,
                {forgotPasswordUrl: config.LINK_TO_WEBSITE + `/passwordForgot?token=${actionToken}`});

            res.sendStatus(status_codes.STATUS_204);
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
                throw new ErrorHandler(errorMessages.USER_IS_NOT_FOUND.message, errorMessages.USER_IS_NOT_FOUND.status);
            }
            await emailService.sendMail(email, email_actions_enum.NEW_PASSWORD, {userName: name, password});

            await O_Auth.deleteMany({user_id: _id});

            res.json(message_enum.PASSWORD_CHANGED);
        } catch (e) {
            next(e);
        }
    },

};
