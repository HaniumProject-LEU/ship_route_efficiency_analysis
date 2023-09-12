const labels = Array.from({ length: dmuCount }, (_, i) => `DMU${i + 1}`);
const dataValues = Array.from({ length: dmuCount }, () => Math.random().toFixed(2)); 

const data = {
    labels: labels, 
    datasets: [
        {
            label: 'Efficiency',
            data: dataValues,
            backgroundColor: 'rgba(255, 255, 255, 0.5)', 
            borderColor: 'white', 
            borderWidth: 3,
            borderRadius: 30, 

        },
    ],
};

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'DMU',
                    color: 'white'
                },
                ticks: {
                    color: 'white'
                },
                grid: {
                    color: 'white'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'DEA Efficiency',
                    color: 'white'
                },
                min: 0,
                max: 1,
                ticks: {
                    color: 'white'
                },
                grid: {
                    color: 'white'
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        },
    }
});

document.getElementById('close-btn').addEventListener('click', function () {
    document.getElementById('popup-wrapper').style.right = '-60%';
    document.getElementById('close-btn').style.display = 'none'; 
});

myChart.canvas.addEventListener('click', function (event) {
    var activePoints = myChart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
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