const CONST = require('./Constant');
const normal_distribution = require('./normal_distribution');
const data_member = require('./data_member');

const data_capcost = {
    /**
     * 기항지의 자본비용을 반환한다.
     * 선원수를 반환받은 뒤 그 수를 사용하여 자본비용을 생성한다.
     * @param {Object} userInput 사용자 입력 
     * @param {String[]} callingPorts 기항지 배열
     */
    getCapcost(userInput, callingPorts) {
        let ratio = CONST.dmuVariableTimes['capitalCost'] / CONST.dmuVariableTimes['sailorsCount'];
        let member = data_member.getMember(userInput, callingPorts);
        let average_capCost = member * ratio;
        let generatedCapcost = normal_distribution(average_capCost * 0.8, average_capCost * 1.2);
        return generatedCapcost;
    }
}

// console.log(data_capcost.getCapcost(CONST.userInput, CONST.callingPorts));

module.exports = data_capcost;