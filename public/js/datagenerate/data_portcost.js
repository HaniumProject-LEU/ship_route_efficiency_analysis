const CONST = require('./Constant');

const data_portCost = {
    /**
     * 항만비용 반환 함수
     * @param {Object} userInput 사용자 입력 
     * @param {String[]} callingPorts 기항지 배열
     */
    getPortCost(userInput, callingPorts) {
        let totalPortCost = 0;
        for (let i = 0; i < callingPorts.length; i++) {
            let country = (CONST.portCountry[callingPorts[i]]);
            totalPortCost += CONST.continents[userInput.continent][country][callingPorts[i]].portCost;
        }
        return totalPortCost;
    }
}

//console.log(data_portCost.getPortCost(CONST.userInput, CONST.callingPorts));

module.exports = data_portCost;