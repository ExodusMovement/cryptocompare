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

**Note:** cryptocompare depends on [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch) being defined globally.

- If you are using this in electron, it should work without any configuration.
- If you are using this in Node.js, you will need to use [`node-fetch`](https://www.npmjs.com/package/node-fetch).

  **Example:**
  ```js
  global.fetch = require('node-fetch')
  const cc = require('cryptocompare')
  ```

### Methods

### `price()`

Get the current price of any cryptocurrency in any other currency.

`price(fsym, tsyms[, tryConversion])`

- `fsym` (String) From Symbol
- `tsyms` (Array of Strings | String) To Symbol(s)
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

### `priceMulti()`

Works like `price()`, except it allows you to specify a matrix of From Symbols.

`priceMulti(fsyms, tsyms[, tryConversion])`

- `fsyms` (Array of Strings | String) From Symbol(s)
- `tsyms` (Array of Strings | String) To Symbol(s)
- `tryConversion` (Boolean) By default, if the crypto does not trade directly into the toSymbol requested, BTC will be used for conversion. Set `tryConversion` to `false` to disable using BTC for conversion.

```js
const cc = require('cryptocompare')

// Basic Usage:
cc.priceMulti(['BTC', 'ETH'], ['USD', 'EUR'])
.then(prices => {
  console.log(prices)
  // -> { BTC: { USD: 1114.63, EUR: 1055.82 },
  //      ETH: { USD: 12.74, EUR: 12.06 } }
})
.catch(console.error)

// Passing a single pair of currencies:
cc.priceMulti('BTC', 'USD')
.then(prices => {
  console.log(prices)
  // -> { BTC: { USD: 1114.63 } }
})
.catch(console.error)
```

### `priceFull()`

Get all the current trading info (price, vol, open, high, low, etc.) of any list of cryptocurrencies in any other currency.

`priceFull(fsyms, tsyms[, tryConversion])`

- `fsyms` (Array of Strings | String) From Symbol(s)
- `tsyms` (Array of Strings | String) To Symbol(s)
- `tryConversion` (Boolean) By default, if the crypto does not trade directly into the toSymbol requested, BTC will be used for conversion. Set `tryConversion` to `false` to disable using BTC for conversion.

```js
const cc = require('cryptocompare')

cc.priceFull(['BTC', 'ETH'], ['USD', 'EUR'])
.then(prices => {
  console.log(prices)
  // {
  //   BTC: {
  //     USD: {
  //       TYPE: '5',
  //       MARKET: 'CCCAGG',
  //       FROMSYMBOL: 'BTC',
  //       TOSYMBOL: 'USD',
  //       FLAGS: '4',
  //       PRICE: 1152.42,
  //       LASTUPDATE: 1487865689,
  //       LASTVOLUME: 0.21,
  //       LASTVOLUMETO: 242.20349999999996,
  //       LASTTRADEID: 1224703,
  //       VOLUME24HOUR: 53435.45299122338,
  //       VOLUME24HOURTO: 60671593.843186244,
  //       OPEN24HOUR: 1119.31,
  //       HIGH24HOUR: 1170,
  //       LOW24HOUR: 1086.641,
  //       LASTMARKET: 'itBit',
  //       CHANGE24HOUR: 33.11000000000013,
  //       CHANGEPCT24HOUR: 2.958072383879366,
  //       SUPPLY: 16177825,
  //       MKTCAP: 18643649086.5
  //     },
  //     EUR: ...
  //   },
  //   ETH: ...
  // }
})
.catch(console.error)
```

### `priceHistorical()`

Get the price of any cryptocurrency in any other currency at a given timestamp. The price comes from the daily info - so it would be the price at the end of the day GMT based on the requested timestamp.

`priceHistorical(fsym, tsyms, time[, tryConversion])`

- `fsym` (String) From Symbol
- `tsyms` (Array of Strings | String) To Symbol(s)
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

### `topPairs()`

Get top pairs by volume for a currency.

`topPairs(fsym[, limit])`

- `fsym` (String) From Symbol
- `limit` (Number) Limit the number of pairs you receive (default 5).

```js
const cc = require('cryptocompare')

cc.topPairs('BTC', 2)
.then(pairs => {
  console.log(pairs)
  // -> [ { exchange: 'CCCAGG',
  //        fromSymbol: 'BTC',
  //        toSymbol: 'JPY',
  //        volume24h: 235602.43493487104,
  //        volume24hTo: 31888554862.766888 },
  //      { exchange: 'CCCAGG',
  //        fromSymbol: 'BTC',
  //        toSymbol: 'USD',
  //        volume24h: 124504.4477389583,
  //        volume24hTo: 145514032.93780443 } ]
})
.catch(console.error)
```

### `topExchanges()`

Get top exchanges by volume for a currency pair.

`topExchanges(fsym, tsym[, limit])`

- `fsym` (String) From Symbol
- `tsym` (String) To Symbol
- `limit` (Number) Limit the number of exchanges you receive (default 5).

```js
const cc = require('cryptocompare')

cc.topExchanges('BTC', 'USD', 2)
.then(exchanges => {
  console.log(exchanges)
  // -> [ { exchange: 'Bitfinex',
  //        fromSymbol: 'BTC',
  //        toSymbol: 'USD',
  //        volume24h: 35239.36701090003,
  //        volume24hTo: 41472258.85534388 },
  //      { exchange: 'Bitstamp',
  //        fromSymbol: 'BTC',
  //        toSymbol: 'USD',
  //        volume24h: 19658.748675010014,
  //        volume24hTo: 23047071.74260772 } ]
})
.catch(console.error)
```

## License

[MIT](LICENSE.md)
