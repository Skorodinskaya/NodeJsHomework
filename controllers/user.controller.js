const ObjectId = require('mongoose').Types.ObjectId;
const {FORGOT_PASSWORD} = require('../configs/action_token_type_enum');
const {email_actions_enum, status_codes} = require('../configs');
const {User, Action} = require('../dataBase');
const {emailService, jwtService, userService, s3Service} = require('../service');
const {userNormalizator} = require('../util/user.util');
const ErrorHandler = require('../errors/ErrorHandler');
const {message_enum, errorMessages} = require('../errors');


module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await userService.getAllUsers(req.query);

            const normalizedUsers = users.map(value => userNormalizator(value));

            res.json(normalizedUsers);
        } catch (e) {
            next(e);
        }
    },

    getUsersById: (req, res) => {
        if(!ObjectId.isValid(req.params.user_id)) {
            throw new ErrorHandler(message_enum.NOT_VALID_ID);
        }

        const user = req.user;
        if(!user) {
            throw new ErrorHandler(errorMessages.USER_IS_NOT_FOUND.message, errorMessages.USER_IS_NOT_FOUND.status);
        }
        const normalizedUser = userNormalizator(user);

        res.json(normalizedUser);
    },

    createUser: async (req, res, next) => {
        try {
            const {name: userName} = req.body;

            let newUser = await User.createUserWithHashPassword(req.body);

            if (req.files && req.files.avatar) {
                const uploadInfo = await s3Service.uploadImage(req.files.avatar, 'users', newUser._id.toString());

                newUser = await User.findByIdAndUpdate(newUser._id, {avatar: uploadInfo.Location}, {new: true});
            }

            const token = jwtService.createActionToken();

            await Action.create({token, type: FORGOT_PASSWORD, user_id: newUser._id});
            await emailService.sendMail(req.body.email, email_actions_enum.CREATED, {userName, token});

            const normalizeNewUser = userNormalizator(newUser);

            res.status(status_codes.STATUS_201)
                .json(normalizeNewUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const {name: userName} = req.body;

            await emailService.sendMail(req.user.email, email_actions_enum.UPDATED, {userName});

            const user = await User.findByIdAndUpdate(user_id, {$set: {...req.body}}, {new: true});
            const normalizeNewUser = userNormalizator(user);

            res.status(status_codes.STATUS_201)
                .json(normalizeNewUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const {name: userName} = req.body;

            await emailService.sendMail(req.body.email, email_actions_enum.DELETED, {userName});

            await User.findByIdAndDelete(user_id);

            res.sendStatus(status_codes.STATUS_204);
        } catch (e) {
            next(e);
        }
    },
};
