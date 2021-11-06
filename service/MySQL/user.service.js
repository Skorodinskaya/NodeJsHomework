// const db = require('../../dataBase/MySQL');
//
// module.exports = {
//     findAll: async () => {
//         const [dbResponse] = await db.query('SELECT * FROM students') || [];
//
//         return dbResponse;
//     },
//
//     createUser: (userObject) => {
//         const {age, gender, name} = userObject;
//
//         return exports.query(`INSERT INTO students (age, gender, name) VALUES ('${age}', '${gender}', '${name}')`);
//     }
// };

const db = require('../../dataBase/MySQL')
    .getInstance();

module.exports = {
    findAll: () => {
        const Student = db.getModel('Student');

        return Student.findAll();
    },

    createUser: (userObject) => {
        const Student = db.getModel('Student');

        return Student.create(userObject);

    }
};
