const urlWind = "https://taipower-th385.web.app/wind.csv";
const urlSolar = "https://taipower-th385.web.app/solar.csv";
const urlFossil = "https://taipower-th385.web.app/fossil.csv";
const idWind = "chartWind";
const idSolar = "chartSolar";
const idFossil = "chartFossil";
//=====================================
var getDataPointsFromCSV = function (csv) {
    var dataPoints = csvLines = points = [];
    csvLines = csv.split(/[\r?\n|\r|\n]+/);
    for (var i = 0; i < csvLines.length; i++) {
        if (csvLines[i].length > 0) {
            points = csvLines[i].split(",");
            dataPoints.push({
                x: new Date(points[0] + ":00"),
                y: parseFloat(points[2])
            });
        }
    }
    return dataPoints;
}
const axisX = {
    // title: null,
    // titleWrap: true,
    // titleMaxWidth: 100,
    // titleFontColor: "#666666",
    titleFontSize: 20,
    // titleFontFamily: "Calibri, Optima, Candara, Verdana, Geneva, sans-serif",
    // titleFontWeight: "normal",
    // titleFontStyle: "normal",
    margin: 2,
    labelBackgroundColor: "transparent",
    valueFormatString: "YYYY-MM-DD HH:mm",
    labelAngle: 90,
    labelFontSize: 10,
    gridThickness: 1
};
const axisY = {
    suffix: "%",
    labelFontSize: 10,
    minimum: 0,
    maximum: 100,
    gridThickness: 1
};
//=====================================
var init = function () {
    $.get(urlWind, function (data) {
        var chart = new CanvasJS.Chart(idWind, {
            animationEnabled: false,
            zoomEnabled: true,
            axisX: axisX,
            axisY: axisY,
            data: [{
                type: "spline",
                dataPoints: getDataPointsFromCSV(data)
            }]
        });
        chart.render();
    });
    $.get(urlSolar, function (data) {
        var chart = new CanvasJS.Chart(idSolar, {
            animationEnabled: false,
            zoomEnabled: true,
            axisX: axisX,
            axisY: axisY,
            data: [{
                type: "spline",
                dataPoints: getDataPointsFromCSV(data)
            }]
        });
        chart.render();
    });
    $.get(urlFossil, function (data) {
        var chart = new CanvasJS.Chart(idFossil, {
            animationEnabled: false,
            zoomEnabled: true,
            axisX: axisX,
            axisY: axisY,
            data: [{
                type: "spline",
                dataPoints: getDataPointsFromCSV(data)
            }]
        });
        chart.render();
    });
}
//=====================================
$(init); //$(document).ready(init);
