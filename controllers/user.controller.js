const {CREATED, UPDATED, DELETED} = require('../configs');
const {User} = require('../dataBase');
const {passwordService, emailService} = require('../service');
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
            const hashedPassword = await passwordService.hash(req.body.password);

            const {name: userName} = req.body;

            await emailService.sendMail(req.body.email, CREATED, {userName});

            const newUser = await User.create({...req.body, password: hashedPassword});

            const normalizeNewUser = userNormalizator(newUser);

            res.json(normalizeNewUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const {name: userName} = req.body;

            await emailService.sendMail(req.body.email, UPDATED, {userName});

            const user = await User.findByIdAndUpdate(user_id, {$set: {...req.body}}, {new: true});


            const normalizeNewUser = userNormalizator(user);

            res.json(normalizeNewUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const {name: userName} = req.body;

            await emailService.sendMail(req.body.email, DELETED, {userName});

            const deletedUser = await User.findByIdAndDelete(user_id);

            res.json(deletedUser);
        } catch (e) {
            next(e);
        }
    },
};
