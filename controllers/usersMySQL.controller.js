const usersMySQLService = require('../service/MySQL/user.service');
const { transactionInstance } = require('../dataBase/MySQL').getInstance();

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
        const transaction = await transactionInstance();

        try {
            const user = await usersMySQLService.createUser(req.body, transaction);

            // throw new Error('xxx');

            await usersMySQLService.updateStudent(15, {name: 'Ira'}, transaction);

            await transaction.commit();
            res.json(user);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    }
};

