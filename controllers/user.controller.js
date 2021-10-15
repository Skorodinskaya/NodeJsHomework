const User = require('../dataBase/User');
const passwordService = require('../service/password.service');
const {userNormalizator} = require('../util/user.util');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find({});

            const user = users.map(value => userNormalizator(value));

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    getUsersById: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const user = await User.findById(user_id);

            const normalizeUser = userNormalizator(user);

            res.json(normalizeUser);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const hashedPassword = await passwordService.hash(req.body.password);

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

            await User.findByIdAndDelete({_id: user_id});

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }
};
