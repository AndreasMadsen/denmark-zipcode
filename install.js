
'use strict';
'use strong';

const fs = require('fs');
const csv = require('rfc-csv');
const path = require('path');
const http = require('http');
const xlsx = require('xlsx');
const async = require('async');
const endpoint = require('endpoint');
const startpoint = require('startpoint');

const allZipcodesUrl = 'http://www.postdanmark.dk/da/Documents/Lister/postnummerfil-excel.xls';
const refZipcodesUrl = 'http://www.postdanmark.dk/da/Documents/Lister/regionsopdelt-postnummer-excel.xls';

// function to fetch xlsx and return it as a 2D array
function getSheet(content, callback) {
  const workbook = xlsx.read(content);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const csvData = xlsx.utils.sheet_to_csv(sheet).replace(/\n/g, '\r\n');
  return startpoint(csvData)
    .pipe(csv())
    .pipe(endpoint({ objectMode: true }, callback));
}

function fetch(href, callback) {
  http.get(href, function (res) {
    res.pipe(endpoint(function (err, content) {
      if (err) return callback(err, null);
      getSheet(content, callback);
    }));
  });
}

// Array.from is not yet supported, implement simlar functionality here
function arrayfrom(iterable) {
  const a = [];
  for (const v of iterable) a.push(v);
  return a;
}

// Load both xlsx sheets
async.map(
  [allZipcodesUrl, refZipcodesUrl],
  fetch,
  function (err, docs) {
    if (err) throw err;

    const allDoc = docs[0];
    const refDoc = docs[1];

    // Will contain all zipcodes
    const zipcodes = new Map();
    const countrycodes = ['', 'Denmark', 'Greenland', 'Faroe Islands'];

    for (let row of allDoc.slice(2, -1)) {
      const zipcode = parseInt(row[0], 10);
      if (Number.isNaN(zipcode)) throw new Error('malformated zipcode');

      // Do only take those from denmark, otherwise they are hard to cross reference
      if (parseInt(row[5], 10) !== 1) continue;

      zipcodes.set(zipcode, {
        zipcode: zipcode,
        city: row[1] || null,
        street: row[2] || null,
        firm: row[3] || null,
        province: row[4] === 'True',
        region: null,
        communes: []
      });
    }

    for (let row of refDoc.slice(2, -1)) {
      const zipcode = parseInt(row[4], 10);
      if (Number.isNaN(zipcode)) throw new Error('malformated zipcode');

      const details = zipcodes.get(zipcode);
      details.region = {
        'number': parseInt(row[0], 10),
        'name': row[1]
      };
      details.communes.push({
        'number': parseInt(row[2], 10),
        'name': row[3]
      });
    }

    fs.writeFileSync(
      path.resolve(__dirname, 'data.json'),
      JSON.stringify(arrayfrom(zipcodes.values()))
    );
  }
);
