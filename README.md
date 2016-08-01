cryptocompare
=============

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]

[npm-image]: https://img.shields.io/npm/v/cryptocompare.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/cryptocompare
[travis-image]: https://img.shields.io/travis/jprichardson/cryptocompare.svg?style=flat-square
[travis-url]: https://travis-ci.org/jprichardson/cryptocompare
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard

CryptoCompare JavaScript API

Install
-------

    npm install --save cryptocompare


Usage
-----

### Methods

#### coinList

Reference: https://www.cryptocompare.com/api/#-api-data-coinlist-

- Signature: `coinList()`
- Parameters: (none)           
- Returns:    A Promise function that returns contains an associative array of coins.

```js
var cc = require('cryptocompare')
cc.coinList()
.then(coinList => {
  console.dir(coinList.BTC)
})
.catch(console.error.bind(console)
```

outputs:

```
{ Id: '1182',
  Url: '/coins/btc/overview',
  ImageUrl: '/media/19633/btc.png',
  Name: 'BTC',
  CoinName: 'Bitcoin',
  FullName: 'Bitcoin (BTC)',
  Algorithm: 'SHA256',
  ProofType: 'PoW',
  FullyPremined: '0',
  TotalCoinSupply: '21000000',
  PreMinedValue: 'N/A',
  TotalCoinsFreeFloat: 'N/A',
  SortOrder: '1' }
```


## License

[MIT](LICENSE.md)
