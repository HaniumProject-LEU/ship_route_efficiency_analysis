var map = L.map('map').setView([20, 15], 3); // 초기 중심 좌표와 줌 레벨

//맵 지도 추가
L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
    maxZoom: 6
}).addTo(map);

//위도경도 표시 라이브러리 추가
L.latlngGraticule({
    showLabel: true,
    color: '#333'
}).addTo(map);


//fix값[좌표]
var continents = {
    "아시아": {
        "한국": [
            { name: "당진", coordinates: [36.8936, 126.6283] },
            { name: "부산", coordinates: [35.1796, 129.0756] },
            { name: "포항", coordinates: [36.0190, 129.3434] },
            { name: "인천", coordinates: [37.4562, 126.7052] }
        ],
        "일본": [
            { name: "도쿄", coordinates: [35.8056, 139.7689] },
            { name: "고베", coordinates: [34.6882, 135.1973] },
            { name: "요코하마", coordinates: [35.4456, 139.6485] },
            { name: "기미쓰", coordinates: [35.3460, 139.8962] }
        ],
        "중국": [
            { name: "톈진", coordinates: [39.0885, 117.2061] },
            { name: "칭다오", coordinates: [36.0694, 120.3847] },
            { name: "상하이", coordinates: [30.8718, 121.8406] },
            { name: "다롄", coordinates: [38.9153, 121.6107] }
        ],
        "베트남": [
            { name: "호치민", coordinates: [10.8219, 106.6355] },
            { name: "퀴논", coordinates: [13.7802, 109.2153] },
            { name: "다낭", coordinates: [16.0445, 108.1985] },
            { name: "깟라이", coordinates: [10.7710, 106.7944] }
        ],
        "인도네시아": [
            { name: "자카르타", coordinates: [-6.2147, 106.8487] },
            { name: "세마랑", coordinates: [-6.7695, 110.4986] },
            { name: "수라바야", coordinates: [-7.2596, 112.7456] }
        ],
        "말레이시아": [
            { name: "탄중펠레파스", coordinates: [1.3652, 103.5586] },
            { name: "클랑", coordinates: [2.9994, 101.4014] }
        ],
        "태국": [
            { name: "방콕", coordinates: [13.7721, 100.5088] },
            { name: "램차방", coordinates: [13.1017, 100.9090] }
        ],
    },
    "유럽": {
        "스페인": [
            { name: "타라고나", coordinates: [41.1195, 1.2436] },
            { name: "알헤시라스", coordinates: [36.1436, -5.4505] }, { name: "빌바오", coordinates: [43.2664, -2.9475] },
        ],
        "영국": [
            { name: "리버풀", coordinates: [51.4105, -2.9862] },
        ],
        "벨기에": [
            { name: "안트베르펜", coordinates: [51.2251, 4.4195] },
        ],
        "이탈리아": [
            { name: "나폴리", coordinates: [42.9800, 12.7003] },
        ],
        "포르투갈": [
            { name: "세투발", coordinates: [38.5271, -8.8905] },
        ],
    },
    "중동": {
        "사우디아라비아": [
            { name: "제다", coordinates: [21.4945, 39.2001] },
            { name: "담맘", coordinates: [26.4338, 50.0996] },
        ],
        "이집트": [
            { name: "수에즈", coordinates: [29.9693, 32.5414] },
        ],
        "쿠웨이트": [
            { name: "쿠웨이트항", coordinates: [29.3203, 47.3938] },
        ],
    },
    "북미": {
        "미국": [
            { name: "휴스턴", coordinates: [29.7589, -95.3097] },
            { name: "벤쿠버WA", coordinates: [45.6280, -122.6780] },
            { name: "LA", coordinates: [34.0508, -118.1962] },
            { name: "필라델피아", coordinates: [39.9563, -75.1780] },
            { name: "사바나", coordinates: [32.0830, -81.0836] },
            { name: "탬파", coordinates: [27.9459, -82.4433] },
        ],
        "캐나다": [
            { name: "해밀턴", coordinates: [43.2673, -79.8755] },
            { name: "쏘헬", coordinates: [46.0513, -73.1095] },
            { name: "벤쿠버BC", coordinates: [49.2842, -123.1460] },
        ],
        "멕시코": [
            { name: "만사니요", coordinates: [19.1126, -104.3378] },
            { name: "카데나스", coordinates: [17.9637, -102.1940] },
            { name: "탐피코", coordinates: [22.2319, -97.8619] },
        ],
    },
    "중/남미": {
        "콜롬비아": [
            { name: "부에나 벤투라", coordinates: [6.3946, -76.5601] },
        ],
        "페루": [
            { name: "카야오", coordinates: [-8.9691, -77.7110] },
        ],
        "칠레": [
            { name: "발파라이소", coordinates: [-33.0483, -71.6085] },
        ],
        "파나마": [
            { name: "크리스토발", coordinates: [9.3532, -79.9002] },
        ],
    },
};


for (var continent in continents) {
    var continentCoordinates = [];
    for (var country in continents[continent]) {
        continents[continent][country].forEach(port => {
            continentCoordinates.push(port.coordinates);
            L.marker(port.coordinates).addTo(map)
                .bindPopup(`${continent} -> ${country} -> ${port.name} [${port.coordinates[0]}, ${port.coordinates[1]}]`)
                .openPopup();
        });
    }

    // 대륙별 폴리곤 구현
    var polygon = L.polygon(continentCoordinates, {
        color: getColorByContinent(continent),
        fillOpacity: 0
    }).addTo(map);

    // 마우스 호버 시 색상 변경
    polygon.on('mouseover', function (e) {
        e.target.setStyle({
            fillOpacity: 0.5
        });
    });


    //원래대로 복구 
    polygon.on('mouseout', function (e) {
        e.target.setStyle({
            fillOpacity: 0
        });
    });
}

//대륙 별로 색깔 다르게
function getColorByContinent(continent) {
    switch (continent) {
        case "아시아": return 'purple';
        case "유럽": return 'green';
        case "중동": return 'red';
        case "북미": return 'yellow';
        case "중/남미": return 'purple';
        default: return 'gray';
    }
}
