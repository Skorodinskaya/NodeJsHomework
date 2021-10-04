const fs = require('fs');
const path = require ('path');

const mkdirBoys = path.join(__dirname, 'users', 'boys');
const mkdirGirls = path.join(__dirname, 'users', 'girls');

fs.mkdir(mkdirBoys, {recursive: true}, (e) => {
    console.log(e);
});

fs.mkdir(mkdirGirls, {recursive: true}, (e) => {
    console.log(e);
});

const sorter = (current, gender, future) => {
    fs.readdir(current, (err, data) => {
        if(err){
            console.log(err);
            return;
        }

        data.forEach(value => {
            fs.readFile(path.join(current, value), (err, data) => {
                if(err) {
                    console.log(err);
                    return;
                }
                const item = JSON.parse(data);
                if(item.gender === gender){
                    fs.rename(path.join(current, value), path.join(future, value), (err) => {
                        if(err){
                            console.log(err);
                        }
                    })
                }
            })
        })
    })
}

sorter(mkdirBoys, 'female', mkdirGirls);
sorter(mkdirGirls, 'male', mkdirBoys);