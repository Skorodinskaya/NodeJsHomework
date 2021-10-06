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

    // createUser: (req, res) => {
    //     read().then(users => {
    //          users.push({...req.body, id: users.length + 1});
    //              res.json(users);
    //     })
    // },
    //
    // deleteUserById: (req, res) => {
    // const {user_id} = req.params;
    //     read().then(users => {
    //         res.json(users);
    //         delete(user_id);
    //     })
    // }
}
