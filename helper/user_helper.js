const util = require('util');
const fs = require('fs');
const path = require("path");

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

const mkdirUsers = path.join(process.cwd(), 'dataBase', 'users.json');

async function read() {
    const buffer = await readFilePromise(mkdirUsers);

    return JSON.parse(buffer.toString());
}

async function write(value) {
    await writeFilePromise(mkdirUsers, JSON.stringify(value));
}

module.exports = {read, write};


