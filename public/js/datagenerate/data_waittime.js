const CONST = require('./Constant');

const data_waitTime = {
    /**
     * 기항지 배열안의 항구 이름들 받아서 각 항구의 평균 대기시간 데이터를 불러와 모두 더한 다음 반환한다.
     * @param {Object} userInput 사용자 입력 
     * @param {String[]} callingPorts 기항지 배열
     */
    getWaitTime(userInput, callingPorts) {
        let totalWaitTime = 0;
        for (let i = 0; i < callingPorts.length; i++) {
            let country = (CONST.portCountry[callingPorts[i]]);
            totalWaitTime += CONST.continents[userInput.continent][country][callingPorts[i]].waitingTime;
        }
        return totalWaitTime;
    }
}

// console.log(data_waitTime.getWaitTime(CONST.userInput, CONST.callingPorts));

module.exports = data_waitTime;