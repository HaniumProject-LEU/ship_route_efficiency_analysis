const express = require('express');
const { spawn } = require('child_process');
const generateData = require('./dataGenerator');
const app = express();
const port = 3002;

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}/ 에서 실행 중입니다.`);
});

app.get('/', (req, res) => {
    const rows = 20;
    const data = generateData(rows);
    res.render('inputForm', { data });
});

app.post('/submit', (req, res) => {
    const inputData = req.body;
    const numDMUs = 20;
    const efficiencies = [];

    for (let i = 0; i < numDMUs; i++) {
        const x1 = inputData[`x1_${i}`];
        const x2 = inputData[`x2_${i}`];
        const x3 = inputData[`x3_${i}`];
        const x4 = inputData[`x4_${i}`];
        const x5 = inputData[`x5_${i}`];
        const x6 = inputData[`x6_${i}`];
        const x7 = inputData[`x7_${i}`];
        const y1 = inputData[`y1_${i}`];
        const y2 = inputData[`y2_${i}`];

        const result = spawn('python', ['Deafile.py', x1, x2, x3, x4, x5, x6, x7, y1, y2]);

        let output = '';
        let errorOutput = '';

        result.stdout.on('data', (data) => {
            output += data.toString();
        });

        result.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        result.on('close', (code) => {
            console.log(`${code}`);

            if (code === 0) {
                console.log("Output:", output);
                efficiencies.push(output.trim());
                if (efficiencies.length === numDMUs) {
                    res.render('resultPage', { efficiencies });
                }
            } else {
                console.error("Error:", errorOutput);
                res.status(500).send("An error occurred during the Python script execution.");
            }
        });
    }
});
