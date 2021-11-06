const usersMySQLService = require('../service/MySQL/user.service');

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const users = await usersMySQLService.findAll();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const user = await usersMySQLService.createUser(req.body);

            res.json(user);
        } catch (e) {
            next(e);
        }
    }
};

