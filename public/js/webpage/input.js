function getSelectedValues() {
    return {
        departurePort: document.getElementById('departurePort').value,
        arrivalPort: document.getElementById('arrivalPort').value,
        region: document.getElementById('region').value,
        numberOfPorts: document.getElementById('numberOfPorts').value,
        dmuCount: document.getElementById('dmuCount').value,
        teu: document.getElementById('teu').value,
    };
}

function createQueryString(params) {
    return Object.keys(params)
        .map(key => `${key}=${encodeURIComponent(params[key])}`)
        .join('&');
}

document.getElementById('submitBtn').addEventListener('click', function (event) {
    event.preventDefault();

    const selectedValues = getSelectedValues();

    const selectedValuesDiv = document.getElementById('selectedValues');
    selectedValuesDiv.innerHTML = `
        <p>출발 항구: ${selectedValues.departurePort}</p>
        <p>도착 항구: ${selectedValues.arrivalPort}</p>
        <p>권역 종류: ${selectedValues.region}</p>
        <p>기항지의 개수: ${selectedValues.numberOfPorts}</p>
        <p>DMU 개수: ${selectedValues.dmuCount}</p>
        <p>TEU: ${selectedValues.teu}</p>
    `;
});

document.getElementById('chartBtn').addEventListener('click', function () {
    const selectedValues = getSelectedValues();

    let chartPage;
    switch (selectedValues.region) {
        case '구주노선':
            chartPage = 'chart_europe';
            break;
        case '미주노선':
            chartPage = 'chart_america';
            break;
        case '아시아내노선':
            chartPage = 'chart_asia';
            break;
        default:
            chartPage = 'chart_europe';
            break;
    }

    window.location.href = `/${chartPage}?${createQueryString(selectedValues)}`;
});

document.getElementById('visualizeBtn').addEventListener('click', function () {
    const selectedValues = getSelectedValues();

    let visualPage;
    switch (selectedValues.region) {
        case '구주노선':
            visualPage = 'visual_europe';
            break;
        case '미주노선':
            visualPage = 'visual_america';
            break;
        case '아시아내노선':
            visualPage = 'visual_asia';
            break;
        default:
            visualPage = 'visual_world';
            break;
    }

    window.location.href = `/${visualPage}?${createQueryString(selectedValues)}`;
});




const portData = {
    "아시아내노선": {
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
    },
    "구주노선": {
        "그룹1": [
            { name: "안트베르펜", coordinates: [4.4195, 51.2251] },
            { name: "리버풀", coordinates: [-2.9862, 51.4105] },
            { name: "빌바오", coordinates: [-2.9475, 43.2664] }
        ],

        "그룹2": [
            { name: "나폴리", coordinates: [12.7003, 42.9800] },
            { name: "알헤시라스", coordinates: [-5.4505, 36.1436] },
            { name: "타라고나", coordinates: [1.2436, 41.1195] },
        ],
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
    },

    "미주노선": {
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
    }
};

const regionSelect = document.getElementById('region');
const departurePortSelect = document.getElementById('departurePort');
const arrivalPortSelect = document.getElementById('arrivalPort');

regionSelect.addEventListener('change', function () {
    const selectedRegion = regionSelect.value;
    departurePortSelect.innerHTML = '';
    arrivalPortSelect.innerHTML = '';
    for (const group in portData[selectedRegion]) {
        const option = document.createElement('option');
        option.value = group;
        const portsInGroup = portData[selectedRegion][group].map(port => port.name).join(', ');

        option.textContent = `${group} (항구: ${portsInGroup})`;

        departurePortSelect.appendChild(option.cloneNode(true));
    }

    updateArrivalOptions();
});

departurePortSelect.addEventListener('change', updateArrivalOptions);

function updateArrivalOptions() {
    const selectedGroup = departurePortSelect.value;
    const selectedRegion = regionSelect.value;
    arrivalPortSelect.innerHTML = '';
    for (const group in portData[selectedRegion]) {
        if (group !== selectedGroup) {
            const option = document.createElement('option');
            option.value = group;
            const portsInGroup = portData[selectedRegion][group].map(port => port.name).join(', ');

            option.textContent = `${group} (항구: ${portsInGroup})`;

            arrivalPortSelect.appendChild(option);
        }
    }
}

const dmuSelect = document.getElementById('dmuCount');
const tableBody1 = document.querySelector('.info-table-deadata tbody');
const tableBody2 = document.querySelector('.info-table-portdata tbody');

dmuSelect.addEventListener('change', function () {
    const dmuCount = parseInt(this.value, 10);
    updateTable1(dmuCount);
    updateTable2(dmuCount);
});

const submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener('click', function () {
    const dmuCount = parseInt(dmuSelect.value, 10);
    updateTable1(dmuCount);
    updateTable2(dmuCount);
});

function updateTable1(dmuCount) {
    tableBody1.innerHTML = '';
    for (let i = 0; i < dmuCount; i++) {
        const row = document.createElement('tr');
        const dmuCell = document.createElement('td');
        dmuCell.textContent = `DMU ${i + 1}`;
        row.appendChild(dmuCell);
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('td');
            cell.textContent = '-';
            row.appendChild(cell);
        }
        tableBody1.appendChild(row);
    }
}
function updateTable2(dmuCount) {
    tableBody2.innerHTML = '';

    const tableHeadRow2 = document.querySelector('.info-table-portdata thead tr');

    for (let i = 0; i < dmuCount; i++) {
        const row = document.createElement('tr');
        const dmuCell = document.createElement('td');
        dmuCell.textContent = `DMU ${i + 1}`;
        row.appendChild(dmuCell);

        for (let j = 0; j < tableHeadRow2.children.length - 1; j++) {
            const cell = document.createElement('td');
            cell.textContent = '-';
            row.appendChild(cell);
        }

        tableBody2.appendChild(row);
    }
}


document.getElementById('numberOfPorts').addEventListener('change', function () {
    updatePortColumns();
});

function updatePortColumns() {
    const numberOfPorts = parseInt(document.getElementById('numberOfPorts').value, 10);
    const tableHeadRow = document.querySelector('.info-table-portdata thead tr');
    const tableBodyRows = document.querySelectorAll('.info-table-portdata tbody tr');
    tableHeadRow.querySelectorAll('th.portColumn').forEach(column => column.remove());
    tableBodyRows.forEach(row => {
        row.querySelectorAll('td.portCell').forEach(cell => cell.remove());
    });

    for (let i = 0; i < numberOfPorts; i++) {
        const newColumn = document.createElement('th');
        newColumn.textContent = `기항지 ${i + 1}`;
        newColumn.classList.add('portColumn');
        tableHeadRow.insertBefore(newColumn, tableHeadRow.children[2 + i]);
    }
}
