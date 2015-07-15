
'use strict';
'use strong';

const fs = require('fs');
const path = require('path');
const DAWA = require('denmark-dawa');

const req = new DAWA('/postnumre', { stormodtagere: true });
const zipcodes = [];

req.on('data', function (item) {
  zipcodes.push({
    zipcode: parseInt(item.nr, 10),
    city: item.navn,
    province: !item.stormodtageradresser ? null : item.stormodtageradresser.map(function (place) {
      return place.id;
    }),
    communes: item.kommuner.map(function (commune) {
      return { id: commune.kode, name: commune.navn };
    })
  });
});

req.on('end', function () {
  fs.writeFileSync(
    path.resolve(__dirname, 'data.json'),
    JSON.stringify(zipcodes)
  );
});
