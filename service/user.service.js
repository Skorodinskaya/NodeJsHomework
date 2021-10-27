const {User} = require('../dataBase');

module.exports = {
    getAllUsers: (query={}) => {
        console.log(query);
        return User.find();
    }
};
