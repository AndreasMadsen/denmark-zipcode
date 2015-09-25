
'use strict';
'use strong';

const mappoint = require('mappoint');
const DAWA = require('denmark-dawa');

module.exports = function () {
  const ret = mappoint({objectMode: true}, function (item, done) {
    done(null, {
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

  new DAWA('/postnumre', { stormodtagere: true })
    .on('error', ret.emit.bind(ret, 'error'))
    .pipe(ret);

  return ret;
}
