const labels = Array.from({ length: dmuCount }, (_, i) => `DMU${i + 1}`);
const dataValues = Array.from({ length: dmuCount }, () => Math.random().toFixed(2));

const data = {
    labels: labels,
    datasets: [
        {
            label: 'Efficiency',
            data: dataValues.map((value, index) => ({
                x: index,
                y: value,
                r: Math.random() * 10 + 5,
            })),
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)'
            ],
            borderColor: [
                'rgba(0, 0,0 , 0.6)',
            ],
            borderWidth: 1,
            borderRadius: 5,
        },
    ],
};

const dataForBarAndLine = {
    labels: labels,
    datasets: [
        {
            label: 'Efficiency',
            data: dataValues,
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)'
            ],
            borderColor: [
                'rgba(0, 0,0 , 0.6)',
            ],
            borderWidth: 1,
            borderRadius: 5,
        },
    ],
};

const pieData = {
    labels: labels,
    datasets: [
        {
            label: 'Efficiency',
            data: dataValues,
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)'
            ],
            borderColor: [
                'rgba(0, 0, 0, 0.6)',
            ],
            borderWidth: 1,
            borderRadius: 5,
        },
    ],
};

var ctxBar = document.getElementById('myChartBar').getContext('2d');
var ctxScatter = document.getElementById('myChartScatter').getContext('2d');
var ctxLine = document.getElementById('myChartLine').getContext('2d');
var ctxPie = document.getElementById('myChartPie').getContext('2d');

var myChartBar = new Chart(ctxBar, {
    type: 'bar',
    data: dataForBarAndLine,
    options: {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

var myChartScatter = new Chart(ctxScatter, {
    type: 'scatter',
    data: {
        labels: labels,
        datasets: [
            {
                label: 'Efficiency',
                data: dataValues.map((value, index) => ({
                    x: index,
                    y: value,
                })),
                borderWidth: 5,
            },
        ],
    },
    options: {
        maintainAspectRatio: false,
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
    },
});

var myChartLine = new Chart(ctxLine, {
    type: 'line',
    data: dataForBarAndLine,
    options: {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

var myChartPie = new Chart(ctxPie, {
    type: 'pie',
    data: pieData,
    options: {
        maintainAspectRatio: false,
    },
});

document.getElementById('close-btn').addEventListener('click', function () {
    document.getElementById('popup-wrapper').style.right = '-60%';
    document.getElementById('close-btn').style.display = 'none';
});

myChartScatter.canvas.addEventListener('click', function (event) {
    var activePoints = myChartScatter.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
    if (activePoints.length > 0) {
        var firstPoint = activePoints[0];
        var selectedIndex = firstPoint.index;
        var selectedDMU = myChartScatter.data.labels[selectedIndex];
        var selectedEfficiency = myChartScatter.data.datasets[0].data[selectedIndex].y;

        document.getElementById('dmu').textContent = selectedDMU;
        document.getElementById('efficiency').textContent = selectedEfficiency;

        document.getElementById('popup-wrapper').style.right = '0';
        document.getElementById('close-btn').style.display = 'block';
    }
});

myChartBar.canvas.addEventListener('click', function (event) {
    var activePoints = myChartBar.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
    if (activePoints.length > 0) {
        var firstPoint = activePoints[0];
        var selectedIndex = firstPoint.index;
        var selectedDMU = myChartBar.data.labels[selectedIndex];
        var selectedEfficiency = myChartBar.data.datasets[0].data[selectedIndex];

        document.getElementById('dmu').textContent = selectedDMU;
        document.getElementById('efficiency').textContent = selectedEfficiency;

        document.getElementById('popup-wrapper').style.right = '0';
        document.getElementById('close-btn').style.display = 'block';
    }
});

myChartLine.canvas.addEventListener('click', function (event) {
    var activePoints = myChartLine.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
    if (activePoints.length > 0) {
        var firstPoint = activePoints[0];
        var selectedIndex = firstPoint.index;
        var selectedDMU = myChartLine.data.labels[selectedIndex];
        var selectedEfficiency = myChartLine.data.datasets[0].data[selectedIndex];

        document.getElementById('dmu').textContent = selectedDMU;
        document.getElementById('efficiency').textContent = selectedEfficiency;

        document.getElementById('popup-wrapper').style.right = '0';
        document.getElementById('close-btn').style.display = 'block';
    }
});

myChartPie.canvas.addEventListener('click', function (event) {
    var activePoints = myChartPie.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
    if (activePoints.length > 0) {
        var firstPoint = activePoints[0];
        var selectedIndex = firstPoint.index;
        var selectedDMU = myChartPie.data.labels[selectedIndex];
        var selectedEfficiency = myChartPie.data.datasets[0].data[selectedIndex];

        document.getElementById('dmu').textContent = selectedDMU;
        document.getElementById('efficiency').textContent = selectedEfficiency;

        document.getElementById('popup-wrapper').style.right = '0';
        document.getElementById('close-btn').style.display = 'block';
    }
});
