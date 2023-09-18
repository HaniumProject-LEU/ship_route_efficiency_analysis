// 미완성
const CONST = require('./Constant');
const normal_distribution = require('./normal_distribution');

const data_fuel = {
    // TEU: 연료 사용량(ton/day)
    fuelUseDependsOnTEU: {
        1000: 50,
        2000: 78.1,
        3000: 106.4,
        4000: 136.4,
        5000: 171.3,
    },

    /**
     * 연료사용량을 반환한다.
     * 논문에 나온 평균치를 사용했다.
     * @param {Object} userInput 사용자 입력 
     * @param {String[]} callingPorts 기항지 배열
     */
    getFuel(userInput, callingPorts) {
        let averageFuel = this.fuelUseDependsOnTEU[userInput.teu];
        return normal_distribution(averageFuel * 0.7, averageFuel * 1.3);
    }
}

//console.log(data_fuel.getFuel(CONST.userInput, CONST.callingPorts));

module.exports = data_fuel;