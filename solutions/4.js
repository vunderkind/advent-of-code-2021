const { readFile } = require('fs');

readFile('../files/december-4-1.txt', 'utf-8', (err, looper) => {
    err ? console.log(err) : null;

    readFile('../files/december-4-2.txt', 'utf-8', (err, data) => {
        err ? console.log(err) : null;
        
        looper = looper.split(' ');
        data = data.split('\n').join();
        data = data.split(',');
        let newArray = [];

        for (let i = 0; i < data.length; i += 6) {
            let temp = []
            for (let j = 0; j < 5; j++) {
                temp.push(data[i + j]);
            }
            newArray.push(temp);
        }


        console.log(looper, newArray);
    })
})