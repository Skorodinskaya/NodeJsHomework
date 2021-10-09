const bcrypt = require('bcrypt');

module.exports = {
    hash: (password) => {
        bcrypt.hash(password, 10);
    },
    compare: async (password, hashPasssword) => {
        const isPasswordMatched = await bcrypt.compare(password, hashPasssword);

        if (!isPasswordMatched) {
            throw new Error('Wrong email or password');
        }
    }
};
