const User = require('../dataBase/User');
const {user_roles_enum, config} = require('../configs');

module.exports = async () => {
    const user = await User.findOne({role: user_roles_enum.ADMIN});

    if (!user) {
        await User.createUserWithHashPassword({
            name: 'Alina',
            email: 'alina.admin@gmnail.com',
            password: config.DEFAULT_PASSWORD_ADMIN,
            role: user_roles_enum.ADMIN
        });
    }
};

