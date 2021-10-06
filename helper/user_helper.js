const util = require('util');
const fs = require('fs');
const path = require("path");

const readFilePromise = util.promisify(fs.readFile);
const mkdirUsers = path.join(process.cwd(), 'dataBase', 'users.json');

async function read() {
    const buffer = await readFilePromise(mkdirUsers);

    return JSON.parse(buffer.toString());
}

async function write(value, data) {
    await fs.writeFile(value, `${data}`, (err => {
        if(err) throw err;
    }))
}

module.exports = {read};


