const {userNormalizator} = require('../util/user.util');

module.exports = {
    loginController: (req, res, next) => {
        try {
            const user = req.user;

            const normalizeUser = userNormalizator(user);

            res.json(normalizeUser);
        } catch (e) {
            next(e);
        }
    }
};
