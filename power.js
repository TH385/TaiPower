'use strict';
const fs = require('fs');

if (process.argv.length < 3) {
    return;
}

let jsonFilename = process.argv.slice(2);
let rawData = fs.readFileSync(jsonFilename[0]);
let jsonData = JSON.parse(rawData);
let aaTime = jsonData[''];
let aaData = jsonData['aaData'];

aaData.forEach(element => {
    if (element[2] === '小計') {
        let type = element[0].split(">")[3].split("(")[0];
        let absValue = element[4].split("(")[0];
        let perValue = element[4].split("(")[1].split(")")[0];
        console.log(type + "," + aaTime + "," + absValue + "," + perValue);
    }
});

