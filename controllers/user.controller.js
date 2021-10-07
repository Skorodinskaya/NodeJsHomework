const {read, write} = require('../helper/user_helper');

module.exports = {
    getUsers: async (req, res) => {
        const users = await read();
        res.json(users);
    },

    getUserById: async (req, res) => {
        const {user_id} = req.params;
        const users = await read();
        res.json(users[user_id - 1]);

    },

    createUser: async (req, res) => {
        const users = await read();
        users.push({...req.body, id: users.length + 1});
        await write(users);
        res.json(users);


    },

    deleteUserById: async (req, res) => {
        const {user_id} = req.params;
        const users = await read();
        const value = [...users];
        value.slice(user_id - 1, 1);
        await write(value);
        res.json(value);
    }
}
