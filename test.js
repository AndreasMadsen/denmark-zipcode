
'use strict';
'use strong';

const test = require('tap').test;
const zipcodes = require('./index.js');
const endpoint = require('endpoint');

test('all keys are numbers and values are objects', function (t) {
  zipcodes().pipe(endpoint({objectMode: true}, function (err, items) {
    t.ifError(err);
    t.ok(items.length > 0, 'there are items');

    for (const item of items) {
      t.ok(typeof item.zipcode === 'number', 'zipcode is number');
      t.ok(typeof item === 'object' && item !== null, 'item is object');
    }

    t.end();
  }));
});
