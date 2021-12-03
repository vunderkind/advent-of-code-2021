// Reduce the data in the text to three data units (forward, down, up)
// Sum the total in each data unit

const { Console } = require('console');
const { readFile } = require('fs');

readFile('../files/december-2.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
    }
    console.log('\n');
    console.log('----FIRST STAR------')
    const down = addDirections('down', data);
    const up = addDirections('up', data);
    const forward = addDirections('forward', data);
    const depth = down - up;
    console.log('Position:', forward * depth);
    console.log('----FIRST STAR CAPTURED-----')
        console.log('\n');
    console.log('----SECOND STAR------')
    // Test 2: Using Aim
    console.log('Upgraded calculations', calculateAim(data));
    console.log('----SECOND STAR CAPTURED-----')
        console.log('\n');


});

function addDirections(direct, data) {
    const directions = data.split('\n');
    const forward = directions.filter(direction => {
        let baseDirection = direction.split(' ');
        return baseDirection[0] === direct;

    })
    const pureNumbers = forward.map(item => {
        return Number(item.split(' ')[1]);
    });
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    return pureNumbers.reduce(reducer);
}

function calculateAim(data) {
    const FORWARD_DIRECTION = 'forward';
    const DOWN_DIRECTION = 'down';
    const UP_DIRECTION = 'up';
    let forward = 0;
    const down = 0;
    let up = 0;
    let aim = 0;
    let depth = 0
    const directions = data.split('\n');
    const directionalArray = directions.map(item => {
        let baseDirection = item.split(' ');
        return baseDirection
    })
    
    // Loop through base directions and implement logic
    for (let i = 0; i < directionalArray.length; i++) {
        if (directionalArray[i][0] === FORWARD_DIRECTION) {
            let numbers = Number(directionalArray[i][1])
            forward += numbers;
            depth+=(aim * numbers);
        }

        if (directionalArray[i][0] === DOWN_DIRECTION) {
            let numbers = Number(directionalArray[i][1])
            aim += numbers;
        }


        if (directionalArray[i][0] === UP_DIRECTION) {
            let numbers = Number(directionalArray[i][1])
            aim -= numbers;
        }
    }

    return depth * forward;
}