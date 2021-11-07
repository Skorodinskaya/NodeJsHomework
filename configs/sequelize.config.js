const { DB_USER, DB_PASSWORD } = require('../configs/config');

module.exports = {
    development: {
        username: DB_USER,
        password: DB_PASSWORD,
        database: 'apr-2021',
        host: '127.0.0.1',
        dialect: 'mysql'
    }
};
