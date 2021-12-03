const { readFile} = require('fs');

readFile('../files/december-1.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
    }
    calculateDepth(data);
});

function calculateDepth(data) {
    const dataplaceholder = data.split('\n');
    const dataArray = dataplaceholder.map(item => parseInt(item))
    console.log('Total number of measurements is', dataArray.length)
    let increaseCounter = 0;
    const window = [];
    for (let i = 0; i <= dataArray.length - 1; i++) {
        let unit = dataArray[i] + dataArray[i + 1] + dataArray[i + 2];
        window.push(unit);
    }
    for (let i = 0; i <= window.length - 1; i++) {
        if (window[i+1] > window[i]) {
                increaseCounter++;
                console.log(`${window[i+1]} is greater than ${window[i]} - (increased!)`);
          
        }
    }
    console.log('----------Stand by for report on depth measurement-------')
    console.log('🧝🧝🧝🧝');
    console.log(window);
    console.log('We calculated a total of', window.length, 'depths!');
    console.log('The depths increased', increaseCounter, 'times');
}