const { readFile } = require('fs');

readFile('../files/december-3.txt', 'utf8', (err, data) => {
    err ? console.log(err) : null;
    const dataArray = data.split('\n')
    console.log('\n')
    console.log('----Gamma and Epsilon Computation follows----')
    
    calculateGammaAndEpsilon(dataArray);
    
    console.log('🎄🎄🎄🎄🎄🎄🎄🎄🎄');
    console.log('\n')

    console.log('--02 and CO2 reading below--')

    let rating = calculateO2andCO2Rating(dataArray);

    console.log('Rating: ', rating);
    console.log('--------------')

})

// The gamble for silver
function calculateGammaAndEpsilon(data) {
    let ones = Array(12).fill(0);
    let zeroes = Array(12).fill(0);
    let gamma;
    let epsilon;

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            if (data[i][j] === '1') {
                ones[j]++
            } else {
                zeroes[j]++
            }
        }

    }

    gamma = ones.map((item, index) => {
        if (item > zeroes[index]) {
            return 1
        } else return 0
    });

    epsilon = gamma.map(item => {
        if (item === 1) {
            return 0
        } else return 1
    })

    epsilon = epsilon.toString().replace(/,/g, '');
    gamma = gamma.toString().replace(/,/g, '');
    console.log('Submarine gamma rate:', parseInt(gamma, 2));
    console.log('Submarine epsilon rate:', parseInt(epsilon, 2));
    console.log('Submarine power consumption:', parseInt(gamma, 2) * parseInt(epsilon, 2));
    gammaData = gamma;
    epsilonData = epsilon;
}


// Going for gold
// Write small function that loops through the main 
function calculateO2andCO2Rating(data) {
    let o2val = tracking(true, data);
    let co2val = tracking(false, data);
    
    let a = parseInt(o2val.toString(), 2);
    let b = parseInt(co2val.toString(), 2);

    console.log('O2 reading: ', a);
    console.log('CO2 reading: ', b);
    
    return a * b;
}

function tracking(oxygen, data) {
    let onecounter = 0;
    let zerocounter = 0;
    let tempTracker = []
    let thingToTrack = data
    
    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < thingToTrack.length; j++) {
            if (thingToTrack[j][i] === '1') {
                onecounter++
            } else if (thingToTrack[j][i] === '0') {
                zerocounter++
            }
        }
        for (let k = 0; k < thingToTrack.length; k++) {
                if (thingToTrack.length == 1) {
                        tempTracker = thingToTrack;
                        return thingToTrack;
                    }
                if (oxygen) {
                    if (onecounter >= zerocounter && thingToTrack[k][i] === '1') {
                        tempTracker.push(thingToTrack[k]);
                    } else if (onecounter < zerocounter && thingToTrack[k][i] === '0') {
                        tempTracker.push(thingToTrack[k]);
                    }
                } else {
                    if (onecounter < zerocounter && thingToTrack[k][i] === '1') {
                        tempTracker.push(thingToTrack[k]);
                    } else if (zerocounter <= onecounter && thingToTrack[k][i] === '0') {
                        tempTracker.push(thingToTrack[k]);
                    }
                }
            }

        thingToTrack = tempTracker;
        tempTracker = []
        onecounter = 0;
        zerocounter = 0;
    };
    return thingToTrack;
}