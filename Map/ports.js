var map = L.map('map').setView([36.5, 130], 5); // 초기 중심 좌표와 줌 레벨

//맵 지도 추가
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
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
        "아시아내노선": [
            { name: "기항지점", coordinates: [25, 125] },
        ],
    },
    "유럽": {
        "한국": [
            { name: "당진", coordinates: [36.8936, 126.6283] },
        ],
    },
    "중동": {
        "한국": [
            { name: "당진", coordinates: [36.8936, 126.6283] },
        ],
    },
    "북미": {
        "한국": [
            { name: "당진", coordinates: [36.8936, 126.6283] },
        ],
    },
    "중/남미": {
        "한국": [
            { name: "당진", coordinates: [36.8936, 126.6283] },
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
