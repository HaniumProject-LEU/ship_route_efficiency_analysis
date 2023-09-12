const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public/views'));

// 미들웨어
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// 라우트
app.get('/', (req, res) => {
  res.render('page');
});

app.get('/chart_europe', (req, res) => {
  const {
    departurePort,
    arrivalPort,
    region,
    numberOfPorts,
    dmuCount,
    teu,
  } = req.query;


  res.render('chart_europe', {
    departurePort,
    arrivalPort,
    region,
    numberOfPorts,
    dmuCount,
    teu,
  });
});

app.get('/chart_america', (req, res) => {
  const {
    departurePort,
    arrivalPort,
    region,
    numberOfPorts,
    dmuCount,
    teu,
  } = req.query;

  res.render('chart_america', {
    departurePort,
    arrivalPort,
    region,
    numberOfPorts,
    dmuCount,
    teu,
  });
});

app.get('/chart_asia', (req, res) => {
  const {
    departurePort,
    arrivalPort,
    region,
    numberOfPorts,
    dmuCount,
    teu,
  } = req.query;

  res.render('chart_asia', {
    departurePort,
    arrivalPort,
    region,
    numberOfPorts,
    dmuCount,
    teu,
  });
});

app.get('/visual_europe', (req, res) => {
  const {
    departurePort,
    arrivalPort,
    region,
    numberOfPorts,
    dmuCount,
    teu,
  } = req.query;

  res.render('visual_europe', {
    departurePort,
    arrivalPort,
    region,
    numberOfPorts,
    dmuCount,
    teu,
  });
});

app.get('/visual_america', (req, res) => {
  const {
    departurePort,
    arrivalPort,
    region,
    numberOfPorts,
    dmuCount,
    teu,
  } = req.query;

  res.render('visual_america', {
    departurePort,
    arrivalPort,
    region,
    numberOfPorts,
    dmuCount,
    teu,
  });
});

app.get('/visual_asia', (req, res) => {
  const {
    departurePort,
    arrivalPort,
    region,
    numberOfPorts,
    dmuCount,
    teu,
  } = req.query;

  res.render('visual_asia', {
    departurePort,
    arrivalPort,
    region,
    numberOfPorts,
    dmuCount,
    teu,
  });
});
// app.get('/visual_world', (req, res) => {
//   res.render('visual_world');
// });

// app.get('/visual_europe', (req, res) => {
//   res.render('visual_europe');
// });

// app.get('/visual_asia', (req, res) => {
//   res.render('visual_asia');
// });

// app.get('/visual_america', (req, res) => {
//   res.render('visual_america');
// });



module.exports = app;