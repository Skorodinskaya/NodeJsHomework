// const mysql2 = require('mysql2');
//
// const connection = mysql2.createConnection({
//     user: 'root',
//     password: 'root',
//     database: 'apr-2021',
//     host: 'localhost',
// });
//
// module.exports = connection.promise();

const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');

const { DB_USER, DB_PASSWORD } = require('../../configs/config');

module.exports = (() => {
    let instance;

    const initConnection = () => {
        const client = new Sequelize('apr-2021', DB_USER, DB_PASSWORD, {dialect: 'mysql'});

        const models = {};
        const modelsPath = path.join(process.cwd(), 'dataBase', 'MySQL', 'models');

        const getModels = () => {
            fs.readdir(modelsPath, (err, files) => {
                files.forEach((file) => {
                    const [model] = file.split('.');
                    const modelFile = require(path.join(modelsPath, model));

                    // eslint-disable-next-line
                    // import/no-dynamic-require
                    models[model] = modelFile(client);
                });
            });
        };

        return {
            setModels: () => getModels(),
            getModel: (moduleName) => models[moduleName],
        };
    };

    return {
        getInstance: () => {
            if (!instance) {
                instance = initConnection();
            }
            return instance;
        }
    };

})();
