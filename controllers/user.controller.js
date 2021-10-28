const {FORGOT_PASSWORD} = require('../configs/action_token_type_enum');
const {email_actions_enum, status_codes} = require('../configs');
const {User, Action} = require('../dataBase');
const {emailService, jwtService, userService} = require('../service');
const {userNormalizator} = require('../util/user.util');


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
        const user = req.user;

        const normalizedUser = userNormalizator(user);

        res.json(normalizedUser);
    },

    createUser: async (req, res, next) => {
        try {
            const {name: userName} = req.body;

            const newUser = await User.createUserWithHashPassword(req.body);

            const token = jwtService.createActionToken();

            await Action.create({token, type: FORGOT_PASSWORD, user_id: newUser._id});
            await emailService.sendMail(req.body.email, email_actions_enum.CREATED, {userName, token});

            const normalizeNewUser = userNormalizator(newUser);

            res.status(status_codes.STATUS_201).json(normalizeNewUser);
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

            res.status(status_codes.STATUS_201).json(normalizeNewUser);
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
