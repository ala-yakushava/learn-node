// const csv = require('csvtojson')



// csv()
// .fromFile(csvFilePath)
// .then((jsonObj)=>{
//   console.log(jsonObj);
// });

// const readStream = require('fs').createReadStream(csvFilePath);

// const writeStream = '../scv/nodejs-hw1-ex1.json';

// readStream.pipe(csv()).pipe(writeStream);

import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream';
import csv from 'csvtojson';

const inputFilePath = path.join(__dirname, '../csv/nodejs-hw1-ex1.csv');
const outputFilePath = path.join(__dirname, '../csv/nodejs-hw1-ex1.txt');

const convertCsvToJson = () => {
  pipeline(
    fs.createReadStream(inputFilePath),
    csv(),
    fs.createWriteStream(outputFilePath),
    (err) => {
      if (err) {
        console.error('Pipeline failed.', err);
      } else {
        console.log('Pipeline succeeded.');
      }
    }
  );
};

export default convertCsvToJson;