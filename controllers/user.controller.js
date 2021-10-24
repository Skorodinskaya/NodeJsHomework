const {email_actions_enum, status_codes} = require('../configs');
const {User} = require('../dataBase');
const {emailService} = require('../service');
const {userNormalizator} = require('../util/user.util');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find({});

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

            await emailService.sendMail(req.body.email, email_actions_enum.CREATED, {userName});

            const newUser = await User.createUserWithHashPassword(req.body);

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
