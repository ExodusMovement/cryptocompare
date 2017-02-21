cryptocompare
=============

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]

[npm-image]: https://img.shields.io/npm/v/cryptocompare.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/cryptocompare
[travis-image]: https://img.shields.io/travis/ExodusMovement/cryptocompare.svg?style=flat-square
[travis-url]: https://travis-ci.org/ExodusMovement/cryptocompare
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard

[CryptoCompare](https://www.cryptocompare.com/) JavaScript API

Install
-------

    npm install --save cryptocompare


Usage
-----

### Methods

### `price()`

`price(fsym, tsyms[, tryConversion])`

- `fsym` (String) From Symbol
- `tsym` (Array of Strings | String) To Symbol(s)
- `tryConversion` (Boolean) By default, if the crypto does not trade directly into the toSymbol requested, BTC will be used for conversion. Set `tryConversion` to `false` to disable using BTC for conversion.

```js
const cc = require('cryptocompare')

// Basic Usage:
cc.price('BTC', ['USD', 'EUR'])
.then(prices => {
  console.log(prices)
  // -> { USD: 1100.24, EUR: 1039.63 }
})
.catch(console.error)

// Passing a single pair of currencies:
cc.price('BTC', 'USD')
.then(prices => {
  console.log(prices)
  // -> { USD: 1100.24 }
})
.catch(console.error)
```

### priceHistorical

`priceHistorical(fsym, tsyms, time[, tryConversion])`

- `fsym` (String) From Symbol
- `tsym` (Array of Strings | String) To Symbol(s)
- `time` (Date) Date in history that you want price data for
- `tryConversion` (Boolean) By default, if the crypto does not trade directly into the toSymbol requested, BTC will be used for conversion. Set `tryConversion` to `false` to disable using BTC for conversion.

```js
const cc = require('cryptocompare')

// Basic Usage:
cc.priceHistorical('BTC', ['USD', 'EUR'], new Date('2017-01-01'))
.then(prices => {
  console.log(prices)
  // -> { BTC: { USD: 997, EUR: 948.17 } }
})
.catch(console.error)
```





## License

[MIT](LICENSE.md)
