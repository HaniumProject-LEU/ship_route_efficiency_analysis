// Leaflet 맵 생성 및 설정
var lrmap = L.map('map', {
    maxZoom: 6,           // 최대 줌 레벨
    minZoom: 5           // 최소 줌 레벨
}).setView([15, 115], 5); // 초기 지도 중심 및 줌 레벨 설정

// 타일 레이어 추가: 월드 이미지를 표시하는 ArcGIS 타일 서비스
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}')
    .addTo(lrmap);

// 위도 경도 그리드 표시 라이브러리 추가
L.latlngGraticule({
    showLabel: true,   // 라벨 표시 여부
    color: '#FFFFFF'   // 그리드 라인 색상
}).addTo(lrmap);

var continents = {
    "세계": {
        "기항지": [
            { name: "기항지7", coordinates: [107, 0] },
            { name: "기항지8", coordinates: [110, 7] },
            { name: "기항지9", coordinates: [115, 18] },
            { name: "기항지10", coordinates: [128, 28] },
        ],
    },
    "아시아": {
        "한국": [
            { name: "부산", coordinates: [129.0756, 35.1796] },
        ],
        "일본": [
            { name: "고베", coordinates: [135.1973, 34.6882] },
        ],
        "중국": [
            { name: "칭다오", coordinates: [120.3847, 36.0694] },
            { name: "상하이", coordinates: [121.8406, 30.8718] },
        ],
        "베트남": [
            { name: "호치민", coordinates: [106.6355, 10.8219] },
            { name: "퀴논", coordinates: [109.2153, 13.7802] },
            { name: "다낭", coordinates: [108.1985, 16.0445] },
        ],
        "인도네시아": [
            { name: "자카르타", coordinates: [106.8487, -6.2147] },
            { name: "세마랑", coordinates: [110.4986, -6.7695] },
            { name: "수라바야", coordinates: [112.7456, -7.2596] }
        ],
        "말레이시아": [
            { name: "탄중펠레파스", coordinates: [103.5586, 1.3652] },
        ],
    },

};

var groups = {
    "그룹3": [
        { name: "탄중펠레파스", coordinates: [103.5586, 1.3652] },
        { name: "자카르타", coordinates: [106.8487, -6.2147] },
        { name: "세마랑", coordinates: [110.4986, -6.7695] },
        { name: "수라바야", coordinates: [112.7456, -7.2596] },
    ],
    "그룹4": [
        { name: "호치민", coordinates: [106.6355, 10.8219] },
        { name: "퀴논", coordinates: [109.2153, 13.7802] },
        { name: "다낭", coordinates: [108.1985, 16.0445] },
    ],
    "그룹5": [
        { name: "칭다오", coordinates: [120.3847, 36.0694] },
        { name: "상하이", coordinates: [121.8406, 30.8718] },
        { name: "부산", coordinates: [129.0756, 35.1796] },
        { name: "고베", coordinates: [135.1973, 34.6882] },
    ],
};

for (var groupName in groups) {
    var groupCoordinates = groups[groupName].map(port => [port.coordinates[1], port.coordinates[0]]);
    // 그룹 내 폴리곤 구현
    var polygon = L.polygon(groupCoordinates, {
        // color: getRandomColor(),
        color: '#2e332f',
        weight: 1,
        fillOpacity: 0.5
    }).addTo(lrmap);
    // 호버 시 색상 변경
    polygon.on('mouseover', function (e) {
        e.target.setStyle({
            fillOpacity: 0.9
        });
    });
    // 복구
    polygon.on('mouseout', function (e) {
        e.target.setStyle({
            fillOpacity: 0.5
        });
    });
}

// 기본 마커 아이콘의 크기 조정을 위한 클래스 정의
var customDefaultIcon = L.Icon.Default.extend({
    options: {
        iconSize: [15, 20],      // 새로운 아이콘 크기 설정
        iconAnchor: [9, 21]     // 아이콘 앵커 위치 설정 (아이콘 중심 아래)
    }
});


// 새로운 아이콘 클래스를 생성
var customIcon = new customDefaultIcon();

for (var continent in continents) {
    var continentCoordinates = [];
    for (var country in continents[continent]) {
        continents[continent][country].forEach(port => {
            continentCoordinates.push([port.coordinates[1], port.coordinates[0]]);
            // 새로운 아이콘 클래스를 사용하여 마커 생성
            L.marker([port.coordinates[1], port.coordinates[0]], { icon: customIcon }).addTo(lrmap)
                .bindPopup(`${continent} -> ${country} -> ${port.name} [${port.coordinates[1]}, ${port.coordinates[0]}]`)
                .openPopup();
        });
    }
}


// 그룹 별로 색깔 다르게
// function getRandomColor() {
//     // var letters = '0123456789ABCDEF';
//     // var color = '#';
//     // for (var i = 0; i < 6; i++) {
//     //     color += letters[Math.floor(Math.random() * 16)];
//     // }
//     // return color;
// }

var 기항지노선 = [
    { "from": [107, 0], "to": [110, 7], "labels": ["기항지7", "기항지8"], "color": "#ffffff" },
    { "from": [115, 18], "to": [128, 28], "labels": ["기항지9", "기항지10"], "color": "#ffffff" },
    { "from": [110, 7], "to": [107, 0], "labels": ["기항지8", "기항지7"], "color": "#ffffff" },
    { "from": [128, 28], "to": [115, 18], "labels": ["기항지10", "기항지9"], "color": "#ffffff" },
];

var 테스트노선1 = [
    { "from": [103.5586, 1.3652], "to": [107, 0], "labels": ["탄중펠레파스", "기항지7"], "color": "#2cf246" },
    { "from": [106.8487, -6.2147], "to": [107, 0], "labels": ["자카르타", "기항지7"], "color": "#2cf246" },
    { "from": [112.7456, -7.2596], "to": [107, 0], "labels": ["수라바야", "기항지7"], "color": "#2cf246" },
    { "from": [110.4986, -6.7695], "to": [107, 0], "labels": ["세마랑", "기항지7"], "color": "#2cf246" },
    // 그룹3에서 기항지7까지
    { "from": [110, 7], "to": [106.6355, 10.8219], "labels": ["기항지8", "호치민"], "color": "#2cf246" },
    { "from": [110, 7], "to": [109.2153, 13.7802], "labels": ["기항지8", "퀴논"], "color": "#2cf246" },
    { "from": [110, 7], "to": [108.1985, 16.0445], "labels": ["기항지8", "다낭"], "color": "#2cf246" },
    // 기항지8에서 그룹4까지
    { "from": [106.6355, 10.8219], "to": [115, 18], "labels": ["호치민", "기항지9"], "color": "#2cf246" },
    { "from": [109.2153, 13.7802], "to": [115, 18], "labels": ["퀴논", "기항지9"], "color": "#2cf246" },
    { "from": [108.1985, 16.0445], "to": [115, 18], "labels": ["다낭", "기항지9"], "color": "#2cf246" },
    // 그룹4에서 기항지9까지

    { "from": [128, 28], "to": [120.3847, 36.0694], "labels": ["기항지10", "칭다오"], "color": "#2cf246" },
    { "from": [128, 28], "to": [121.8406, 30.8718], "labels": ["기항지10", "상하이"], "color": "#2cf246" },
    { "from": [128, 28], "to": [129.0756, 35.1796], "labels": ["기항지10", "부산"], "color": "#2cf246" },
    { "from": [128, 28], "to": [135.1973, 34.6882], "labels": ["기항지10", "고베"], "color": "#2cf246" },
    // 기항지10에서 그룹5까지
];

var 테스트노선2 = [
    { "from": [107, 0], "to": [103.5586, 1.3652], "labels": ["기항지7", "탄중펠레파스"], "color": "#2cf246" },
    { "from": [107, 0], "to": [106.8487, -6.2147], "labels": ["기항지7", "자카르타"], "color": "#2cf246" },
    { "from": [107, 0], "to": [112.7456, -7.2596], "labels": ["기항지7", "수라바야"], "color": "#2cf246" },
    { "from": [107, 0], "to": [110.4986, -6.7695], "labels": ["기항지7", "세마랑"], "color": "#2cf246" },
    // 기항지7에서 기항지3까지
    { "from": [106.6355, 10.8219], "to": [110, 7], "labels": ["호치민", "기항지8"], "color": "#2cf246" },
    { "from": [109.2153, 13.7802], "to": [110, 7], "labels": ["퀴논", "기항지8"], "color": "#2cf246" },
    { "from": [108.1985, 16.0445], "to": [110, 7], "labels": ["다낭", "기항지8"], "color": "#2cf246" },
    // 그룹4에서 기항지8까지
    { "from": [115, 18], "to": [106.6355, 10.8219], "labels": ["기항지9", "호치민"], "color": "#2cf246" },
    { "from": [115, 18], "to": [109.2153, 13.7802], "labels": ["기항지9", "퀴논"], "color": "#2cf246" },
    { "from": [115, 18], "to": [108.1985, 16.0445], "labels": ["기항지9", "다낭"], "color": "#2cf246" },
    // 기항지9에서 그룹4까지
    { "from": [120.3847, 36.0694], "to": [128, 28], "labels": ["칭다오", "기항지10"], "color": "#2cf246" },
    { "from": [121.8406, 30.8718], "to": [128, 28], "labels": ["상하이", "기항지10"], "color": "#2cf246" },
    { "from": [129.0756, 35.1796], "to": [128, 28], "labels": ["부산", "기항지10"], "color": "#2cf246" },
    { "from": [135.1973, 34.6882], "to": [128, 28], "labels": ["고베", "기항지10"], "color": "#2cf246" },
    // 그룹5에서 기항지10까지
];


// MigrationLayer 객체 생성과 설정: Leaflet 맵에 이동 경로 레이어 추가
var migrationLayer1 = new L.migrationLayer({
    map: lrmap,                 // Leaflet 맵 객체
    data: 기항지노선,                 // 데이터 배열
    pulseRadius: 30,            // 이동 경로 표시 원의 반지름
    pulseBorderWidth: 3,        // 이동 경로 표시 원의 테두리 너비
    arcWidth: 3,                // 이동 경로의 선 너비
    arcLabel: false,             // 출발지와 도착지 라벨 표시 여부
    arcLabelFont: '10px sans-serif', // 출발지와 도착지 라벨의 폰트 설정
    maxWidth: 10                // 이동 경로의 최대 너비 설정
});

var migrationLayer2 = new L.migrationLayer({
    map: lrmap,                 // Leaflet 맵 객체
    data: 테스트노선1,                 // 데이터 배열
    pulseRadius: 30,            // 이동 경로 표시 원의 반지름
    pulseBorderWidth: 3,        // 이동 경로 표시 원의 테두리 너비
    arcWidth: 3,                // 이동 경로의 선 너비
    arcLabel: false,             // 출발지와 도착지 라벨 표시 여부
    arcLabelFont: '10px sans-serif', // 출발지와 도착지 라벨의 폰트 설정
    maxWidth: 10                // 이동 경로의 최대 너비 설정
});
var migrationLayer3 = new L.migrationLayer({
    map: lrmap,                 // Leaflet 맵 객체
    data: 테스트노선2,                 // 데이터 배열
    pulseRadius: 30,            // 이동 경로 표시 원의 반지름
    pulseBorderWidth: 3,        // 이동 경로 표시 원의 테두리 너비
    arcWidth: 3,                // 이동 경로의 선 너비
    arcLabel: false,             // 출발지와 도착지 라벨 표시 여부
    arcLabelFont: '10px sans-serif', // 출발지와 도착지 라벨의 폰트 설정
    maxWidth: 10                // 이동 경로의 최대 너비 설정
});


// MigrationLayer 객체를 Leaflet 맵에 추가
migrationLayer1.addTo(lrmap);
migrationLayer2.addTo(lrmap);
migrationLayer3.addTo(lrmap);


function hide() {
    migrationLayer1.hide();
    migrationLayer2.hide();
    migrationLayer3.hide();
}
function show() {
    migrationLayer1.show();
    migrationLayer2.show();
    migrationLayer3.show();
}
function play() {
    migrationLayer1.play();
    migrationLayer2.play();
    migrationLayer3.play();
}
function pause() {
    migrationLayer1.pause();
    migrationLayer2.pause();
    migrationLayer3.pause();
}
