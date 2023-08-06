const faker = require('faker');

function generateRandomValue(average) {
    const standardDeviation = average / 4;
    let u, v, s;
    do {
        u = Math.random() * 2 - 1;
        v = Math.random() * 2 - 1;
        s = u * u + v * v;
    } while (s >= 1 || s === 0);

    const multiplier = Math.sqrt(-2 * Math.log(s) / s);
    const value = average + standardDeviation * u * multiplier;
    return Math.max(0, Math.floor(value));
}

function generateData(rows) {
    const data = [];

    for (let i = 0; i < rows; i++) {
        const xRow = [];
        const yRow = [];
        const xAverages = [5000, 50, 200, 50000, 50000, 50, 500];
        const yAverages = [50000, 50000];
        for (const average of xAverages) {
            xRow.push(generateRandomValue(average));
        }
        for (const average of yAverages) {
            yRow.push(generateRandomValue(average));
        }
        data.push({ x: xRow, y: yRow });
    }
    return data;
}
module.exports = generateData;
