// const {read} = require('../helper/user_helper');

module.exports = {
    getUsers: (req, res) => {
        // read().then(users => {
        //     res.json(users)
        // })
    },
    //
    // getUserById: (req, res) => {
    //     const {user_id} = req.params;
    //
    //     read().then(users => {
    //         res.json(users[user_id - 1])
    //     })
    // },
    //
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
    //         // delete(user_id);
    //     })
    // }
}