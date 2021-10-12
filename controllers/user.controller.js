const User = require('../dataBase/User');
const passwordService = require('../service/password.service');
const {userNormalizator} = require("../util/user.util");

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find({});

            const user = users.map(value => userNormalizator(value));

            res.json(user);
        } catch (e) {
            res.json(e.message);
        }
    },

    getUsersById: async (req, res) => {
        try {
            const {user_id} = req.params;

            const user = await User.findById(user_id);

            const normalizeUser = userNormalizator(user);

            res.json(normalizeUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const hashedPassword = await passwordService.hash(req.body.password);

            const newUser = await User.create({...req.body, password: hashedPassword});

            const normalizeNewUser = userNormalizator(newUser);

            res.json(normalizeNewUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    updateUser: async (req, res) => {
        try {
            const {user_id} = req.params;

            const user = await User.findOneAndUpdate({_id: user_id}, {$set: {...req.body}});

            res.json(user);
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {user_id} = req.params;

            await User.findByIdAndDelete({_id: user_id});

            res.sendStatus(204);
        } catch (e) {
            res.json(e.message);
        }
    }
};
