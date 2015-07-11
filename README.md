#denmark-zipcode

> A list of zipcodes in denmark and associated information

## Installation

```sheel
npm install denmark-zipcode
```

## Documentation

On installation this module will download two excel files and compile a
json file, containing cross referenced information.

The source is postdanmark:

* overview: http://www.postdanmark.dk/da/Privat/Kundeservice/postnummerkort/Sider/postnummerkort.aspx
* zipcodes (full list): http://www.postdanmark.dk/da/Documents/Lister/postnummerfil-excel.xls
* zipcodes by regions (incomplete): http://www.postdanmark.dk/da/Documents/Lister/regionsopdelt-postnummer-excel.xls

Get the zipcodes by:

```javascript
zipcodes = require('denmark-zipcode')
```

This is a `Map` object, with zipcodes as keys and associated information
as values.

```javascript
for (let [zipcode, info] of zipcodes) {
  // zipcode is a number
  zipcode = 2800;

  // info is an object
  info = {
    zipcode: 2800,
    city: 'Kongens Lyngby',
    // This can be a string, if information was provided
    street: null,
    // This can be a string, if information was provided
    firm: null,
    province: true,
    // This can be null, if no cross referenced information was found
    region: { number: 1084, name: 'Region Hovedstaden' },
    // This can be an empty array, if no cross referenced information was found
    communes:
     [ { number: 230, name: 'Rudersdal Kommune' },
       { number: 173, name: 'Lyngby-Taarbæk Kommune' },
       { number: 159, name: 'Gladsaxe Kommune' },
       { number: 157, name: 'Gentofte Kommune' } ],
    // Possible values are ['Denmark', 'Greenland', 'Faroe Islands']
    country: 'Denmark'
  };
}
```

##License

**The software is license under "MIT"**

> Copyright (c) 2015 Andreas Madsen
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in
> all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
> THE SOFTWARE.
