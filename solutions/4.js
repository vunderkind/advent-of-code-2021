const { readFile } = require('fs');

readFile('../files/december-4-1.txt', 'utf-8', (err, looper) => {
    err ? console.log(err) : null;

    readFile('../files/december-4-2.txt', 'utf-8', (err, data) => {
        err ? console.log(err) : null;

        let { callout, bingo } = prepareBingo(looper, data, 6);

        playBingo(callout, bingo);
    })
})

const playBingo = (callout, bingo) => {

    // keep a cache of board positions that have won
    let cache = []

    // keep a cache of winning numbers
    const winningNumber = []

    // time for some fugly loops!
    for (let i = 0; i < callout.length; i++) {
        for (let j = 0; j < bingo.length; j++) {
            for (let k = 0; k < bingo[j].length; k++) {

                // Check the bingo board for a match
                if (!cache.includes(j)) {
                    if (bingo[j][k] === callout[i]) {
                        bingo[j][k] = '🐙';
                        checkBingo(bingo[j], cache, j, winningNumber, callout[i])
                    }
                }
            }

        }
    }
    const results = {
        winner: {
            ["Winning board number"]: cache[0],
            ["Winning board"]: bingo[cache[0]],
            ["Sum of unmarked slots"]: sumUnmarkedSlots(bingo[cache[0]]),
            ["Winning numbers"]: winningNumber[0],
            ["Puzzle winning score"]: winningNumber[0] * sumUnmarkedSlots(bingo[cache[0]])
        },
        loser: {
            ["Winning board number"]: cache[cache.length-1],
            ["Winning board"]: bingo[cache[cache.length-1]],
            ["Sum of unmarked slots"]: sumUnmarkedSlots(bingo[cache[cache.length-1]]),
            ["Winning numbers"]: winningNumber[winningNumber.length-1],
            ["Puzzle winning score"]: winningNumber[winningNumber.length-1] * sumUnmarkedSlots(bingo[cache[cache.length-1]])
        }
    }

    console.log(results);

}

function checkBingo(array, cache, position, winningNumber, number) {
    // Count five times, and at each stop, check the row and columns
    for (let i = 0; i <= 5; i++) {
        for (let j = 0; j < 24; j += 5) {
            if (
                array[i] === '🐙' && array[i + 5] === '🐙' && array[i + 10] === '🐙' && array[i + 15] === '🐙' && array[i + 20] === '🐙'
                || array[j] === '🐙' && array[j + 1] === '🐙' && array[j + 2] === '🐙' && array[j + 3] === '🐙' && array[j + 4] === '🐙'
            ) {
                cache.push(position);
                winningNumber.push(number);
                    return true;
            }
        }
    }
    return;
}

//Sort the data from the puzzle input into a a standard array (for the bingo numbers)
// and a 2 x 2 array (for the bingo cards)
function prepareBingo(looper, data, cutNumber){
        looper = looper.split(' ');
        data = data.split('\n').join();
        data = data.split(',');
        let newArray = [];

        for (let i = 0; i < data.length; i += cutNumber) {
            let temp = []
            for (let j = 0; j < cutNumber-1; j++) {
                temp.push(data[i + j]);
            }
            newArray.push(temp);
        }
    
    looper = looper[0].split(',').map(number => Number(number));
    for (let i = 0; i < newArray.length; i++){
        newArray[i] = newArray[i].join(' ');
    }

    for (let i = 0; i < newArray.length; i++) {
        newArray[i] = newArray[i].split(' ')
            .filter(item => item !== '')
            .map(number => Number(number));
    }

        return {
            callout: looper,
            bingo: newArray,
        }
}
    
    const sumUnmarkedSlots = (data) => {
        let clean = data.filter(item => item !== '🐙')
            .reduce((a, b) => a + b);
        return clean;
    }