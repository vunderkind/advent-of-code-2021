const { readFile } = require('fs');

readFile('../files/december-4-1.txt', 'utf-8', (err, looper) => {
    err ? console.log(err) : null;

    readFile('../files/december-4-2.txt', 'utf-8', (err, data) => {
        err ? console.log(err) : null;

        let { callout, bingo } = prepareBingo(looper, data, 6);

        // playBingo(callout, bingo);

        // bingo.map(item => console.log(item.length))




    })
})

const playBingo = (callout, bingoSource) => {
    const main = [...bingoSource];
    let bingo = [...bingoSource]
    let isInProgress = true;
    let bingoPosition = 0;
    let results;
    let boardWithCompleteRows = false;

    while (isInProgress) {
        
        // Continue to go through the list of bingo boards
        for (let i = 0; i < bingo.length; i++) {
            for (let k = 0; k < callout.length; k++) {

                for (let j = 0; j < bingo[i].length; j++) {
                    console.log(bingo[i].length)

                    // Check the bingo board for a match
                    if (bingo[i][j] === callout[k]) {
                            bingo[i][j] = 'X';
                    }
                    
                    // Check if the boards have a full cross
                    let { status, position } = checkBingo(bingo[i], i);
                    if (status) {
                        boardWithCompleteRows = status;
                        console.log(boardWithCompleteRows)
                        bingoPosition = position;
                        results = {
                            bingoPosition,
                            board: bingo[bingoPosition],
                            data: main[bingoPosition].length,
                            number: callout[k],
                        }
                        isInProgress = false;
                        break;
                    }

                    // if we have a board with complete rows...
                    if (boardWithCompleteRows === true) {
                        break;
                    }
                }
            }

        }
    }

    console.log('Total: ', results)

}

function checkBingo(array, position) {
    if ((array[0] === 'X' && array[1] === 'X' && array[2] === 'X' && array[3] === 'X' && array[4] === 'X')
    || (array[0] === 'X' && array[5] === 'X' && array[10] === 'X' && array[15] === 'X' && array[20] === 'X')) {
        return {
            status: true,
            position,
        }
    }

    else {
        return {
            status: false,
            position: null,
        }
    }
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