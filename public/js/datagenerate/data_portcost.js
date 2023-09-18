const CONST = require('./Constant');

const data_portcost = {
    /**
     * 항만비용 반환 함수
     * @param {Object} userInput 사용자 입력 
     * @param {String[]} callingPorts 기항지 배열
     */
    getPortcost(userInput, callingPorts) {
        let totalPortcost = 0;
        for (let i = 0; i < callingPorts.length; i++) {
            let country = (CONST.portCountry[callingPorts[i]]);
            totalPortcost += CONST.continents[userInput.continent][country][callingPorts[i]].portCost;
        }
        return totalPortcost;
    }
}

// console.log(data_portcost.getPortcost(CONST.userInput, CONST.callingPorts));

module.exports = data_portcost;