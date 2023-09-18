const CONST = {
    // 임시 항로 기항지 데이터
    callingPorts: ["la", "sohel", "hamilton", "vancouver WA"],

    // 항구별 정보 데이터 (권역으로 분류)
    continents: {
        "NorthAmerica": {
            "usa": {
                "vancouver WA": {
                    coordinates: [237.3220, 45.6280],
                    portCost: 11225,
                    waitingTime: 1224
                },
                "la": {
                    coordinates: [241.8038, 34.0508],
                    portCost: 33221,
                    waitingTime: 1224
                },
                //이어서
            },
            "canada": {
                "sohel": {
                    coordinates: [286.8905, 46.0513],
                    portCost: 32132,
                    waitingTime: 3524
                },
                "hamilton": {
                    coordinates: [280.1245, 43.2673],
                    portCost: 12124,
                    waitingTime: 3524
                },
                //이어서 항구
            },
            // 이어서 국가
        },
        //이어서 권역
    },

    // 항구가 어느 나라에 속하는지 저정하는 배열
    portCountry: {
        "vancouver WA": "usa",
        "la": "usa",
        "sohel": "canada",
        "hamilton": "canada"
    },

    // 임시 사용자 입력 데이터
    userInput: {
        departurePort: "vancouver WA", // 출발항
        arrivalPort: "hamilton", // 도착항
        continent: "NorthAmerica", // 권역
        callingPortCount: 2, // 기항지 개수
        dmuCount: 10,
        teu: 2000,
    },

    // dmu 변수 예시 (임시 데이터)
    dmuVariable: {
        totalTransportationAmount: 429212, //총수송량
        transportationinstance: 557660, // 총수송거리
        operatingTime: 32332.5, // 운항시간 
        waitingTime: 1560.1, // 대기시간
        workingTime: 7748.4, // 작업시간
        portCost: 5708387, // 항만비용
        capitalCost: 1097629, // 자본비용
        sailorsCount: 1597, // 선원수
        fuelAmount: 12, // 연료량
    },

    // DMU 변수간의 배수의 평균
    dmuVariableTimes: {
        totalTransportationAmount: 1741.72, //총수송량
        transportationinstance: 2256.74, // 총수송거리
        operatingTime: 130.57, // 운항시간 
        waitingTime: 6.29, // 대기시간
        workingTime: 31.21, // 작업시간
        portCost: 23128.58, // 항만비용
        capitalCost: 4440.3, // 자본비용
        sailorsCount: 6.46, // 선원수
        fuelAmount: 1.0, // 연료량
    },
}


module.exports = CONST;