const labels = Array.from({ length: dmuCount }, (_, i) => `DMU${i + 1}`);
const dataValues = Array.from({ length: dmuCount }, () => Math.random().toFixed(2)); 

const data = {
    labels: labels, 
    datasets: [
        {
            label: 'Efficiency',
            data: dataValues,
            backgroundColor: 'rgba(255,255,255, 0.7)', 
            borderColor: 'rgb(255, 112, 3)', 
            borderWidth: 3,
            borderRadius: 20, 

        },
    ],
};

var ctxBar = document.getElementById('myChartBar').getContext('2d');
var ctxBubble = document.getElementById('myChartBubble').getContext('2d');
var ctxLine = document.getElementById('myChartLine').getContext('2d');
var ctxPie = document.getElementById('myChartPie').getContext('2d');

var myChartBar = new Chart(ctxBar, {
    type: 'bar',
    data: data,
});

var myChartBubble = new Chart(ctxBubble, {
    type: 'bubble',
    data: data,  
});

var myChartLine = new Chart(ctxLine, {
    type: 'line',
    data: data,  
});

var myChartPie = new Chart(ctxPie, {
    type: 'pie',
    data: data,  
});

document.getElementById('close-btn').addEventListener('click', function () {
    document.getElementById('popup-wrapper').style.right = '-60%';
    document.getElementById('close-btn').style.display = 'none'; 
});

[myChartBar, myChartBubble, myChartLine, myChartPie].forEach(chart => {
    chart.canvas.addEventListener('click', function (event) {
        var activePoints = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
        if (activePoints && activePoints.length > 0) {
            var selectedIndex = activePoints[0].index;
            var selectedDMU = data.labels[selectedIndex];
            var selectedEfficiency = data.datasets[0].data[selectedIndex];

            document.getElementById('dmu').textContent = selectedDMU;
            document.getElementById('efficiency').textContent = selectedEfficiency;

            document.getElementById('popup-wrapper').style.right = '0';
            document.getElementById('close-btn').style.display = 'block';
        }
    });
});