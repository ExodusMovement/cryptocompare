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

`price(fsym, tsyms[, options])`

- `fsym` (String) From Symbol
- `tsyms` (Array of Strings | String) To Symbol(s)
- `options` (Object)
  - `tryConversion` (Boolean) By default, if the crypto does not trade directly into the toSymbol requested, BTC will be used for conversion. Set `tryConversion` to `false` to disable using BTC for conversion.
  - `exchanges` (Array of Strings | Array) Exchanges to get price data from. By default, average data is used. (You can get a list of top exchanges for a given pair with `topExchanges()`.)

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

`priceMulti(fsyms, tsyms[, options])`

- `fsyms` (Array of Strings | String) From Symbol(s)
- `tsyms` (Array of Strings | String) To Symbol(s)
- `options` (Object)
  - `tryConversion` (Boolean) By default, if the crypto does not trade directly into the toSymbol requested, BTC will be used for conversion. Set `tryConversion` to `false` to disable using BTC for conversion.
  - `exchanges` (Array of Strings | Array) Exchanges to get price data from. By default, average data is used. (You can get a list of top exchanges for a given pair with `topExchanges()`.)

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

`priceFull(fsyms, tsyms[, options])`

- `fsyms` (Array of Strings | String) From Symbol(s)
- `tsyms` (Array of Strings | String) To Symbol(s)
- `options` (Object)
  - `tryConversion` (Boolean) By default, if the crypto does not trade directly into the toSymbol requested, BTC will be used for conversion. Set `tryConversion` to `false` to disable using BTC for conversion.
  - `exchanges` (Array of Strings | Array) Exchanges to get price data from. By default, average data is used. (You can get a list of top exchanges for a given pair with `topExchanges()`.)

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

`priceHistorical(fsym, tsyms, time[, options])`

- `fsym` (String) From Symbol
- `tsyms` (Array of Strings | String) To Symbol(s)
- `time` (Date) Date in history that you want price data for
- `options` (Object)
  - `tryConversion` (Boolean) By default, if the crypto does not trade directly into the toSymbol requested, BTC will be used for conversion. Set `tryConversion` to `false` to disable using BTC for conversion.
  - `exchanges` (Array of Strings | Array) Exchanges to get price data from. By default, average data is used. (You can get a list of top exchanges for a given pair with `topExchanges()`.)

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

### `generateAvg()`

Compute the current trading info (price, vol, open, high, low etc) of the requested pair as a volume weighted average based on the markets requested.

`generateAvg(fsym, tsym, markets[, tryConversion])`

- `fsym` (String) From Symbol
- `tsym` (String) To Symbol
- `markets` (Array) Array of markets to base the average on. (You can get a list of top exchanges for a given pair with `topExchanges()`.)
- `tryConversion` (Boolean) By default, if the crypto does not trade directly into the toSymbol requested, BTC will be used for conversion. Set `tryConversion` to `false` to disable using BTC for conversion.

```js
const cc = require('cryptocompare')

// Basic Usage:
cc.generateAvg('BTC', 'USD', ['Coinbase', 'Kraken', 'Bitstamp', 'Bitfinex'])
.then(data => {
  console.log(data)
  // -> { MARKET: 'CUSTOMAGG',
  //      FROMSYMBOL: 'BTC',
  //      TOSYMBOL: 'USD',
  //      FLAGS: '2',
  //      PRICE: 1155.61,
  //      LASTUPDATE: 1488059738,
  //      LASTVOLUME: 0.25546663,
  //      LASTVOLUMETO: 294.93622433499996,
  //      LASTTRADEID: 26533969,
  //      VOLUME24HOUR: 27318.892083369985,
  //      VOLUME24HOURTO: 31652183.38370657,
  //      OPEN24HOUR: 1177.16,
  //      HIGH24HOUR: 1189.9,
  //      LOW24HOUR: 1110,
  //      LASTMARKET: 'Bitfinex',
  //      CHANGE24HOUR: -21.550000000000182,
  //      CHANGEPCT24HOUR: -1.830677223147251 }
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

### `histoDay()`

Get open, high, low, close, volumefrom and volumeto from the daily historical data. The values are based on 00:00 GMT time.

`histoDay(fsym, tsym[, options])`

- `fsym` (String) From Symbol
- `tsym` (String) To Symbol
- `options` (Object)
  - `aggregate` (Number) Number of data points to aggregate.
  - `limit` (Number | `'none'`) Limit the number of days to lookup. Default is 30. If you set it to the string `'none'`, you will get all available data.
  - `tryConversion` (Boolean) By default, if the crypto does not trade directly into the toSymbol requested, BTC will be used for conversion. Set `tryConversion` to `false` to disable using BTC for conversion.
  - `timestamp` (Date) By default, `histoDay()` gets historical data for the past several days. Use the `timestamp` option to set a historical start point.
  - `exchange` (String) Exchange to get history data from. By default, average data is used. (You can get a list of top exchanges for a given pair with `topExchanges()`.)

```js
cc.histoDay('BTC', 'USD')
.then(data => {
  console.log(data)
  // -> [ { time: 1485388800,
  //        close: 915.65,
  //        high: 917.71,
  //        low: 893.81,
  //        open: 893.97,
  //        volumefrom: 35494.93,
  //        volumeto: 32333344.2 },
  //        ... ]
})
.catch(console.error)
```

### `histoHour()`

Get open, high, low, close, volumefrom and volumeto from the hourly historical data.

`histoHour(fsym, tsym[, options])`

- `fsym` (String) From Symbol
- `tsym` (String) To Symbol
- `options` (Object)
  - `aggregate` (Number) Number of data points to aggregate.
  - `limit` (Number) Limit the number of hours to lookup. Default is 168.
  - `tryConversion` (Boolean) By default, if the crypto does not trade directly into the toSymbol requested, BTC will be used for conversion. Set `tryConversion` to `false` to disable using BTC for conversion.
  - `timestamp` (Date) By default, `histoHour()` gets historical data for the past several hours. Use the `timestamp` option to set a historical start point.
  - `exchange` (String) Exchange to get history data from. By default, average data is used. (You can get a list of top exchanges for a given pair with `topExchanges()`.)

```js
cc.histoHour('BTC', 'USD')
.then(data => {
  console.log(data)
  // -> [ { time: 1487448000,
  //        close: 1060.34,
  //        high: 1061.44,
  //        low: 1058.85,
  //        open: 1059.24,
  //        volumefrom: 739.6,
  //        volumeto: 790019.22 },
  //        ... ]
})
.catch(console.error)
```

### `histoMinute()`

Get open, high, low, close, volumefrom and volumeto from the minute-by-minute historical data.

`histoMinute(fsym, tsym[, options])`

- `fsym` (String) From Symbol
- `tsym` (String) To Symbol
- `options` (Object)
  - `aggregate` (Number) Number of data points to aggregate.
  - `limit` (Number) Limit the number of minutes to lookup. Default is 1440.
  - `tryConversion` (Boolean) By default, if the crypto does not trade directly into the toSymbol requested, BTC will be used for conversion. Set `tryConversion` to `false` to disable using BTC for conversion.
  - `timestamp` (Date) By default, `histoMinute()` gets historical data for the past several minutes. Use the `timestamp` option to set a historical start point.
  - `exchange` (String) Exchange to get history data from. By default, average data is used. (You can get a list of top exchanges for a given pair with `topExchanges()`.)

```js
cc.histoMinute('BTC', 'USD')
.then(data => {
  console.log(data)
  // -> [ { time: 1487970960,
  //        close: 1171.97,
  //        high: 1172.72,
  //        low: 1171.97,
  //        open: 1172.37,
  //        volumefrom: 25.06,
  //        volumeto: 29324.12 },
  //        ... ]
})
.catch(console.error)
```

## License

[MIT](LICENSE.md)
