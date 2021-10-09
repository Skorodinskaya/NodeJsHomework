const User = require('../dataBase/User');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            res.json(e.message);
        }
    },

    getUsersById: async (req, res) => {
        try {
            const {user_id} = req.params;

            const user = await User.findById(user_id);

            res.json({user});
        } catch (e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const newUser = await User.create(req.body);

            res.json(newUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    updateUser: async (req, res) => {
        try {
            const {user_id} = req.params;

            const user = await User.findByIdAndUpdate(user_id, req.body, {new: true});

            res.json(user);
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {user_id} = req.params;

            await User.findByIdAndDelete({ _id: user_id });

            res.sendStatus(204);
        } catch (e) {
            res.json(e.message);
        }
    }
};
