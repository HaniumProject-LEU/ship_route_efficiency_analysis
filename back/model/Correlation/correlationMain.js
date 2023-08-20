const dmu = require("./dmuConstant")
const Correlation = require("./correlation")

var corArray = [];

var correlation = new Correlation(dmu);
for (var i = 0; i < dmu[0].length; i++) {
    corArray.push(correlation.displayCorrelation(i));
}

for (var i = 0; i < corArray.length; i++) {
    console.log(corArray[i]);
}