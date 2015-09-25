#denmark-zipcode [![Build Status](https://travis-ci.org/denmark-io/denmark-zipcode.svg?branch=master)](https://travis-ci.org/denmark-io/denmark-zipcode)

> A list of zipcodes in denmark and associated information

## Installation

```sheel
npm install denmark-zipcode
```

## Documentation

```javascript
const zipcodes = require('denmark-zipcode');

// zipcodes() returns an object stream
zipcodes().once('data', function (data) {
  data = {
    zipcode: 2800,
    city: 'Kgs. Lyngby',
    province: null,
    communes: [
      { id: '0157', name: 'Gentofte' },
      { id: '0159', name: 'Gladsaxe' },
      { id: '0173', name: 'Lyngby-Taarbæk' },
      { id: '0230', name: 'Rudersdal' }
    ]
  };
});
```

## Source

The source is: http://dawa.aws.dk/postnummerdok

An alternative source may be postdanmark, which was used in a previouse version:

* overview: http://www.postdanmark.dk/da/Privat/Kundeservice/postnummerkort/Sider/postnummerkort.aspx
* zipcodes (full list): http://www.postdanmark.dk/da/Documents/Lister/postnummerfil-excel.xls
* zipcodes by regions (incomplete): http://www.postdanmark.dk/da/Documents/Lister/regionsopdelt-postnummer-excel.xls
