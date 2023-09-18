const CONST = require('./Constant');
const normal_distribution = require('./normal_distribution');
const data_voyageTime = require('./data_voyageTime');

const data_member = {
    /**
     * 선원수를 반환한다.
     * 선원수는 운항시간을 사용하여 생성한다.
     * @param {Object} userInput 사용자 입력 
     * @param {String[]} callingPorts 기항지 배열
     */
    getMember(userInput, callingPorts) {
        let ratio = CONST.dmuVariableTimes['member'] / CONST.dmuVariableTimes['workTime'];
        let voyageTime = data_voyageTime.getVoyageTime(userInput, callingPorts);
        let averageMember = voyageTime * ratio;
        let generatedMember = normal_distribution(averageMember * 0.9, averageMember * 1.1);
        return generatedMember;
    }
}

// console.log(data_member.getMember(CONST.userInput, CONST.callingPorts));

module.exports = data_member;