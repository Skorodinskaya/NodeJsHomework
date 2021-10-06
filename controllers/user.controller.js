const {read} = require('../helper/user_helper');

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
        const {user_id} = req.params;
        const users = await read();

        read().then(users => {
             users.push({...req.body, id: users.length + 1});
                 res.json(users);
        })
    },

    deleteUserById: (req, res) => {
    const {user_id} = req.params;
    const users = await read();
    const value = [...data];

    value.slice(read, JSON.stringify(value));
    res.json(value);
    }
}
