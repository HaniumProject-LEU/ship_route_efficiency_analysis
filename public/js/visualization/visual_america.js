var lrmap = L.map('map', {
    maxZoom: 6,           // 최대 줌 레벨
    minZoom: 4            // 최소 줌 레벨
}).setView([10, 150], 4); // 초기 지도 중심 및 줌 레벨 설정

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
            { name: "기항지10", coordinates: [128, 28] },
            { name: "기항지11", coordinates: [155, 30] },
            { name: "기항지12", coordinates: [255, 10] },
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
    },
    "북미": {
        "미국": [
            { name: "벤쿠버WA", coordinates: [237.3220, 45.6280] },
            { name: "LA", coordinates: [241.8038, 34.0508] },
        ],
        "캐나다": [
            { name: "벤쿠버BC", coordinates: [236.8540, 49.2842] }
        ],
        "멕시코": [
            { name: "카데나스", coordinates: [257.8060, 17.9637] },
        ],
    },
    "중/남미": {
        "콜롬비아": [
            { name: "부에나 벤투라", coordinates: [283.4399, 6.3946] }
        ],
        "페루": [
            { name: "카야오", coordinates: [282.2890, -8.9691] }
        ],
        "칠레": [
            { name: "발파라이소", coordinates: [288.3915, -33.0483] }
        ],
    },
};

var groups = {
    "그룹5": [
        { name: "칭다오", coordinates: [120.3847, 36.0694] },
        { name: "상하이", coordinates: [121.8406, 30.8718] },
        { name: "부산", coordinates: [129.0756, 35.1796] },
        { name: "고베", coordinates: [135.1973, 34.6882] },
    ],
    "그룹6": [
        { name: "벤쿠버BC", coordinates: [236.8540, 49.2842] },
        { name: "벤쿠버WA", coordinates: [237.3220, 45.6280] },
        { name: "LA", coordinates: [241.8038, 34.0508] },
        { name: "카데나스", coordinates: [257.8060, 17.9637] },
    ],
    "그룹7": [
        { name: "부에나 벤투라", coordinates: [283.4399, 6.3946] },
        { name: "카야오", coordinates: [282.2890, -8.9691] },
        { name: "발파라이소", coordinates: [288.3915, -33.0483] },
    ]

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


// 새로운 아이콘 클래스를 생성합니다.
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
    { "from": [128, 28], "to": [155, 30], "labels": ["기항지10", "기항지11"], "color": "#ffffff" },
    { "from": [155, 30], "to": [236.8540, 49.2842], "labels": ["기항지11", "벤쿠버BC"], "color": "#ffffff" },
    { "from": [155, 30], "to": [237.3220, 45.6280], "labels": ["기항지11", "벤쿠버WA"], "color": "#ffffff" },
    { "from": [155, 30], "to": [241.8038, 34.0508], "labels": ["기항지11", "LA"], "color": "#ffffff" },
    { "from": [155, 30], "to": [257.8060, 17.9637], "labels": ["기항지11", "카데나스"], "color": "#ffffff" },
    { "from": [155, 30], "to": [283.4399, 6.3946], "labels": ["기항지11", "부에나 벤투라"], "color": "#ffffff" },
    { "from": [155, 30], "to": [282.2890, -8.9691], "labels": ["기항지11", "카야오"], "color": "#ffffff" },
    { "from": [155, 30], "to": [288.3915, -33.0483], "labels": ["기항지11", "발파라이소"], "color": "#ffffff" },
    { "from": [155, 30], "to": [128, 28], "labels": ["기항지11", "기항지10"], "color": "#ffffff" },
    { "from": [236.8540, 49.2842], "to": [155, 30], "labels": ["벤쿠버BC", "기항지11"], "color": "#ffffff" },
    { "from": [237.3220, 45.6280], "to": [155, 30], "labels": ["벤쿠버WA", "기항지11"], "color": "#ffffff" },
    { "from": [241.8038, 34.0508], "to": [155, 30], "labels": ["LA", "기항지11"], "color": "#ffffff" },
    { "from": [257.8060, 17.9637], "to": [155, 30], "labels": ["카데나스", "기항지11"], "color": "#ffffff" },
    { "from": [283.4399, 6.3946], "to": [155, 30], "labels": ["부에나 벤투라", "기항지11"], "color": "#ffffff" },
    { "from": [282.2890, -8.9691], "to": [155, 30], "labels": ["카야오", "기항지11"], "color": "#ffffff" },
    { "from": [288.3915, -33.0483], "to": [155, 30], "labels": ["발파라이소", "기항지11"], "color": "#ffffff" },
];

var 테스트노선1 = [


    { "from": [128, 28], "to": [120.3847, 36.0694], "labels": ["기항지10", "칭다오"], "color": "#2cf246" },
    { "from": [128, 28], "to": [121.8406, 30.8718], "labels": ["기항지10", "상하이"], "color": "#2cf246" },
    { "from": [128, 28], "to": [129.0756, 35.1796], "labels": ["기항지10", "부산"], "color": "#2cf246" },
    { "from": [128, 28], "to": [135.1973, 34.6882], "labels": ["기항지10", "고베"], "color": "#2cf246" },
    // 기항지10에서 그룹5까지

    { "from": [236.8540, 49.2842], "to": [255, 10], "labels": ["기항지12", "벤쿠버BC"], "color": "#ffe600" },
    { "from": [237.3220, 45.6280], "to": [255, 10], "labels": ["기항지12", "벤쿠버WA"], "color": "#ffe600" },
    { "from": [241.8038, 34.0508], "to": [255, 10], "labels": ["기항지12", "LA"], "color": "#ffe600" },
    { "from": [257.8060, 17.9637], "to": [255, 10], "labels": ["기항지12", "카데나스"], "color": "#ffe600" },
    // 그룹6에서 기항지12까지

    { "from": [255, 10], "to": [283.4399, 6.3946], "labels": ["기항지12", "부에나 벤투라"], "color": "#ffe600" },
    { "from": [255, 10], "to": [282.2890, -8.9691], "labels": ["기항지12", "카야오"], "color": "#ffe600" },
    { "from": [255, 10], "to": [288.3915, -33.0483], "labels": ["기항지12", "발파라이소"], "color": "#ffe600" },
    // 기항지12에서 그룹7까지

];

var 테스트노선2 = [
    { "from": [120.3847, 36.0694], "to": [128, 28], "labels": ["칭다오", "기항지10"], "color": "#2cf246" },
    { "from": [121.8406, 30.8718], "to": [128, 28], "labels": ["상하이", "기항지10"], "color": "#2cf246" },
    { "from": [129.0756, 35.1796], "to": [128, 28], "labels": ["부산", "기항지10"], "color": "#2cf246" },
    { "from": [135.1973, 34.6882], "to": [128, 28], "labels": ["고베", "기항지10"], "color": "#2cf246" },
    // 그룹5에서 기항지10까지
    { "from": [255, 10], "to": [236.8540, 49.2842], "labels": ["벤쿠버BC", "기항지12"], "color": "#ffe600" },
    { "from": [255, 10], "to": [237.3220, 45.6280], "labels": ["벤쿠버WA", "기항지12"], "color": "#ffe600" },
    { "from": [255, 10], "to": [241.8038, 34.0508], "labels": ["LA", "기항지12"], "color": "#ffe600" },
    { "from": [255, 10], "to": [257.8060, 17.9637], "labels": ["카데나스", "기항지12"], "color": "#ffe600" },
    // 기항지12에서 그룹6까지
    { "from": [283.4399, 6.3946], "to": [255, 10], "labels": ["부에나 벤투라", "기항지12"], "color": "#ffe600" },
    { "from": [282.2890, -8.9691], "to": [255, 10], "labels": ["카야오", "기항지12"], "color": "#ffe600" },
    { "from": [288.3915, -33.0483], "to": [255, 10], "labels": ["발파라이소", "기항지12"], "color": "#ffe600" },
    // 그룹7에서 기항지12까지
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


