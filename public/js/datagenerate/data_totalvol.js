// 실제 수송 거리를 제공하는 오픈소스 결정이 나지 않았으므로 임의의 수송 거리 데이터를 출력하게 만들었음. 
const CONST = require('./Constant');

// 논문에 기재된 TEU 별 수송거리 및 수송량 평균치(이를 바탕으로 데이터 생성)
const obj_paperNum = [
    {paper_transportationDinstance : [7483, 18199, 22160, 28470]
        ,paper_totalTransportationAmount : [6767, 14589, 15561, 22641]
        ,paper_teu : [1000, 2000, 3000, 4000]}
]

function calculateMean(array) {
    return array.reduce((sum,val) => sum + val ,0)/array.length;
}

function calculateStd(array){
    const meanValue = calculateMean(array);
    return Math.sqrt(array.map(val => Math.pow(val - meanValue ,2)).reduce((sum,val) => sum + val ,0)/array.length);
}

//확률 분포 모델링 (가우시안 분포)
function generateData(mean,std,count){
    return Array.from({ length : count }, () => Math.random() * std + mean);
}

//DMU 수 길이의 객체 배열 생성 
function makeDataObject(dmuCount,created_transportationDinstance,created_totalTransportationAmount,fixed_teu){
    let generatedData=[];
    
    for(let i=0;i<dmuCount;i++){
        const newData={
            수송거리:created_transportationDinstance[i].toFixed(2),
            수송량:created_totalTransportationAmount[i].toFixed(2),
            teu:fixed_teu[i].toFixed(2)
        };
        
        generatedData.push(newData);
    }
    
   return generatedData;
}


const mean_size=calculateMean(obj_paperNum[0]['paper_transportationDinstance']);
const std_size=calculateStd(obj_paperNum[0]['paper_transportationDinstance']);
const mean_transportation=calculateMean(obj_paperNum[0]['paper_totalTransportationAmount']);
const std_transportation=calculateStd(obj_paperNum[0]['paper_totalTransportationAmount']);

// 수송거리 데이터 생성 
let created_transportationDinstance=generateData(mean_size,std_size,CONST.userInput['dmuCount']);

// 총수송량 데이터 생성 
let created_totalTransportationAmount=generateData(mean_transportation,std_transportation,CONST.userInput['dmuCount']);

// TEU 고정 
const std_teu = 0;
let fixed_teu=generateData(CONST.userInput['teu'],std_teu,CONST.userInput['dmuCount']);

const obj_createdRes = makeDataObject(CONST.userInput['dmuCount'],created_transportationDinstance,created_totalTransportationAmount,fixed_teu);

// 수송량 수송거리 teu 데이터를 포함한 obj 출력
console.log(obj_createdRes)
