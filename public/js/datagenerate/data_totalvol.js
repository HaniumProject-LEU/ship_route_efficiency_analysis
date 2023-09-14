// 사용자 사전 입력 데이터 예시
let inputData = {
	departurePort: "Busan", // 출발 항구
	arrivalPort: "Ulsan", // 도착 항구
	continent: "asia", // 권역 종류 예시(Europe, NorthAmerica, NorthAmerica)
	callingPortCount: 6, // 기항지 개수
	dmuCount: 20, // DMU (노선) 개수
	teu: 3000, // 선박 규모 TEU
}

// 논문에 기재된 TEU 별 수송거리 및 수송량 평균치를 바탕으로 데이터 생성
const pre_obj = [
    {distance : [7483, 18199, 22160, 28470]
        ,ship_transportation : [6767, 14589, 15561, 22641]
        ,ship_teu : [1000, 2000, 3000, 4000]}
]

const mean_teu = inputData['teu']
const std_teu = 0;
const generatedData = [];


console.log(pre_obj[0]['distance'])

// 확률 분포 모델링 (가우시안 분포)
const mean_size = pre_obj[0]['distance'].reduce((sum, val) => sum + val, 0) / pre_obj[0]['distance'].length;
const std_size = Math.sqrt(pre_obj[0]['distance'].map(val => Math.pow(val - mean_size, 2)).reduce((sum, val) => sum + val, 0) / pre_obj[0]['distance'].length);
const mean_transportation = pre_obj[0]['ship_transportation'].reduce((sum, val) => sum + val, 0) / pre_obj[0]['ship_transportation'].length;
const std_transportation = Math.sqrt(pre_obj[0]['ship_transportation'].map(val => Math.pow(val - mean_transportation, 2)).reduce((sum, val) => sum + val, 0) / pre_obj[0]['ship_transportation'].length);


// 수송거리 데이터 생성
const new_ship_distance = Array.from({ length: inputData['dmuCount'] }, () => Math.random() * std_size + mean_size);

// 총수송량 데이터 생성
const new_ship_transportation = Array.from({ length: inputData['dmuCount'] }, () => Math.random() * std_transportation + mean_transportation);

// TEU 고정
const new_ship_teu = Array.from({ length: inputData['dmuCount'] }, () => Math.random() * std_teu + mean_teu);

// 생성된 데이터 출력
for (let i = 0; i < inputData['dmuCount']; i++) {
    console.log(`새로운 수송거리: ${new_ship_distance[i].toFixed(2)}, 새로운 수송량: ${new_ship_transportation[i].toFixed(2)}, TEU: ${new_ship_teu[i].toFixed(2)}`);
}

// 제너레이트된 데이터 객체화
for (let i = 0; i < inputData['dmuCount']; i++) {
    const newData = {
        size: new_ship_distance[i].toFixed(2),
        transportation: new_ship_transportation[i].toFixed(2),
        teu: new_ship_teu[i].toFixed(2)
    };

    generatedData.push(newData);
}

console.log(generatedData);

