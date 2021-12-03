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
    calculateO2andCO2Rating(data);

})

function calculateGammaAndEpsilon(data) {
    let gamma;
    let epsilon;
    let ones = Array(12).fill(0);
    let zeroes = Array(12).fill(0);

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
}

function calculateO2andCO2Rating(data) {
    console.log('WIP!')
}