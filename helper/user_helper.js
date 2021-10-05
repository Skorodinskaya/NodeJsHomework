const util = require('util');
const fs = require('fs');
const path = require("path");

const readFilePromise = util.promisify(fs.readFile);
const mkdirUsers = path.join(__dirname, 'dataBase', 'users.json');

async function read() {
    let buffer = await readFilePromise(mkdirUsers);

    console.log(buffer.toString());
}

async function write(value, data) {
    await fs.writeFile(value, `${data}`, (err => {
        if(err) throw err;
    }))
}

module.exports = {read, write};


