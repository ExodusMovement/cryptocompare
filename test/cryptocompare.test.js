'use strict'
const test = require('tape')

if (!global.fetch) global.fetch = require('node-fetch')
const cc = require('../')
const helpers = require('./helpers')

test('price()', t => {
  t.plan(2)
  cc.price('BTC', ['USD', 'EUR']).then(prices => {
    t.strictEqual(typeof prices.USD, 'number', 'prices.USD is a number')
    t.strictEqual(typeof prices.EUR, 'number', 'prices.EUR is a number')
    t.end()
  }).catch(t.end)
})

test('price() allows passing a string as the second parameter', t => {
  t.plan(1)
  cc.price('BTC', 'USD').then(prices => {
    t.strictEqual(typeof prices.USD, 'number', 'prices.USD is a number')
    t.end()
  }).catch(t.end)
})

test("price()'s tryConversion=false works", t => {
  helpers.testTryConversion(cc.price(helpers.NOT_USD_TRADABLE, 'USD', { tryConversion: false }), t)
})

test("price()'s exchanges option works", t => {
  t.plan(1)
  Promise.all([
    cc.price('BTC', 'USD'),
    cc.price('BTC', 'USD', { exchanges: ['Coinbase'] })
  ]).then(data => {
    t.notDeepEqual(data[0], data[1])
    t.end()
  })
})

test('exchanges option allows passing a string', t => {
  t.plan(1)
  Promise.all([
    cc.price('BTC', 'USD'),
    cc.price('BTC', 'USD', { exchanges: 'Coinbase' })
  ]).then(data => {
    t.notDeepEqual(data[0], data[1])
    t.end()
  })
})

test('priceMulti()', t => {
  t.plan(4)
  cc.priceMulti(['BTC', 'ETH'], ['USD', 'EUR']).then(prices => {
    t.strictEqual(typeof prices.BTC.USD, 'number', 'prices.BTC.USD is a number')
    t.strictEqual(typeof prices.BTC.EUR, 'number', 'prices.BTC.EUR is a number')
    t.strictEqual(typeof prices.ETH.USD, 'number', 'prices.ETH.USD is a number')
    t.strictEqual(typeof prices.ETH.EUR, 'number', 'prices.ETH.EUR is a number')
    t.end()
  }).catch(t.end)
})

test('priceMulti() allows passing strings instead of arrays', t => {
  t.plan(1)
  cc.priceMulti('BTC', 'USD').then(prices => {
    t.strictEqual(typeof prices.BTC.USD, 'number', 'prices.BTC.USD is a number')
    t.end()
  }).catch(t.end)
})

test("priceMulti()'s tryConversion=false works", t => {
  helpers.testTryConversion(cc.priceMulti(helpers.NOT_USD_TRADABLE, 'USD', { tryConversion: false }), t)
})

test("priceMulti()'s exchanges option works", t => {
  t.plan(1)
  Promise.all([
    cc.priceMulti('BTC', 'USD'),
    cc.priceMulti('BTC', 'USD', { exchanges: ['Coinbase'] })
  ]).then(data => {
    t.notDeepEqual(data[0], data[1])
    t.end()
  })
})

test('priceFull()', t => {
  t.plan(5 * 2 * 2)
  cc.priceFull(['BTC', 'ETH'], ['USD', 'EUR']).then(prices => {
    for (let fsym in prices) {
      for (let tsym in prices[fsym]) {
        t.is(typeof prices[fsym][tsym].PRICE, 'number', `prices.${fsym}.${tsym}.PRICE is a number`)
        t.is(typeof prices[fsym][tsym].SUPPLY, 'number', `prices.${fsym}.${tsym}.SUPPLY is a number`)
        t.is(typeof prices[fsym][tsym].MKTCAP, 'number', `prices.${fsym}.${tsym}.MKTCAP is a number`)

        t.is(typeof prices[fsym][tsym].MARKET, 'string', `prices.${fsym}.${tsym}.MARKET is a string`)
        t.is(typeof prices[fsym][tsym].LASTMARKET, 'string', `prices.${fsym}.${tsym}.LASTMARKET is a string`)
      }
    }
    t.end()
  }).catch(t.end)
})

test('priceFull() allows passing strings instead of arrays', t => {
  t.plan(5)
  cc.priceFull('BTC', 'USD').then(prices => {
    t.is(typeof prices.BTC.USD.PRICE, 'number', `prices.BTC.USD.PRICE is a number`)
    t.is(typeof prices.BTC.USD.SUPPLY, 'number', `prices.BTC.USD.SUPPLY is a number`)
    t.is(typeof prices.BTC.USD.MKTCAP, 'number', `prices.BTC.USD.MKTCAP is a number`)

    t.is(typeof prices.BTC.USD.MARKET, 'string', `prices.BTC.USD.MARKET is a string`)
    t.is(typeof prices.BTC.USD.LASTMARKET, 'string', `prices.BTC.USD.LASTMARKET is a string`)
    t.end()
  }).catch(t.end)
})

test("priceFull()'s tryConversion=false works", t => {
  helpers.testTryConversion(cc.priceFull(helpers.NOT_USD_TRADABLE, 'USD', { tryConversion: false }), t)
})

test("priceFull()'s exchanges option works", t => {
  t.plan(1)
  Promise.all([
    cc.priceFull('BTC', 'USD'),
    cc.priceFull('BTC', 'USD', { exchanges: ['Coinbase'] })
  ]).then(data => {
    t.notDeepEqual(data[0], data[1])
    t.end()
  })
})

test('priceHistorical()', t => {
  t.plan(3)
  // NOTE: Historical values are hard-coded into this test
  const timestamp = new Date('2017-01-01')
  cc.priceHistorical('BTC', ['USD', 'EUR'], timestamp).then(prices => {
    t.strictEqual(typeof prices.USD, 'number', 'prices.USD is a number')
    t.is(prices.USD, 995.44, 'Correct historical value')
    t.strictEqual(typeof prices.EUR, 'number', 'prices.EUR is a number')
    t.end()
  }).catch(t.end)
})

test("priceHistorical()'s tryConversion=false works", t => {
  const timestamp = new Date('2017-01-01')
  helpers.testTryConversion(
    cc.priceHistorical(
      helpers.NOT_USD_TRADABLE,
      'USD',
      timestamp,
      { tryConversion: false }
    ), t)
})

test("priceHistorical()'s exchanges option works", t => {
  t.plan(1)
  const timestamp = new Date()
  Promise.all([
    cc.priceHistorical('BTC', 'USD', timestamp),
    cc.priceHistorical('BTC', 'USD', timestamp, { exchanges: ['Coinbase'] })
  ]).then(data => {
    t.notDeepEqual(data[0], data[1])
    t.end()
  })
})

test('generateAvg()', t => {
  t.plan(6)
  cc.generateAvg('BTC', 'USD', ['Coinbase', 'Kraken', 'Bitstamp', 'Bitfinex']).then(data => {
    t.is(typeof data.PRICE, 'number', `data.PRICE is a number`)
    t.is(typeof data.VOLUME24HOUR, 'number', `data.VOLUME24HOUR is a number`)
    t.is(typeof data.VOLUME24HOURTO, 'number', `data.VOLUME24HOURTo is a number`)
    t.is(typeof data.OPEN24HOUR, 'number', `data.OPEN24HOUR is a number`)
    t.is(typeof data.HIGH24HOUR, 'number', `data.OPEN24HOUR is a number`)
    t.is(typeof data.LOW24HOUR, 'number', `data.OPEN24HOUR is a number`)
    t.end()
  }).catch(t.end)
})

test("generateAvg()'s tryConversion=false works", t => {
  helpers.testTryConversion(
    cc.generateAvg(helpers.NOT_USD_TRADABLE, 'USD', ['Coinbase', 'Kraken'], false),
    t
  )
})

test('topPairs()', t => {
  t.plan(3 * 5 + 1)
  cc.topPairs('BTC').then(pairs => {
    t.equal(pairs.length, 5, 'returns 5 pairs by default')
    pairs.forEach(pair => {
      t.is(typeof pair.toSymbol, 'string', 'pair.toSymbol is a string')
      t.is(typeof pair.volume24h, 'number', 'pair.volume24hr is a number')
      t.is(typeof pair.volume24hTo, 'number', 'pair.volume24hrTo is a number')
    })
    t.end()
  }).catch(t.end)
})

test("topPairs()'s limit option works", t => {
  t.plan(1)
  cc.topPairs('BTC', 3).then(pairs => {
    t.equal(pairs.length, 3, 'limit works')
    t.end()
  }).catch(t.end)
})

test('topExchanges()', t => {
  t.plan(6 * 5 + 1)
  cc.topExchanges('BTC', 'USD').then(exchanges => {
    let prev
    t.equal(exchanges.length, 5, 'returns 5 pairs by default')
    exchanges.forEach(item => {
      t.is(typeof item.exchange, 'string', 'item.exchange is a string')
      t.notEqual(item.exchange, prev, 'item.exchange is unique')
      prev = item.exchange
      t.is(typeof item.fromSymbol, 'string', 'item.fromSymbol is a string')
      t.is(typeof item.toSymbol, 'string', 'item.toSymbol is a string')
      t.is(typeof item.volume24h, 'number', 'item.volume24hr is a number')
      t.is(typeof item.volume24hTo, 'number', 'item.volume24hrTo is a number')
    })
    t.end()
  }).catch(t.end)
})

test("topExchanges()'s limit option works", t => {
  t.plan(1)
  cc.topExchanges('BTC', 'USD', 3).then(exchanges => {
    t.equal(exchanges.length, 3, 'limit works')
    t.end()
  }).catch(t.end)
})

test('error handling', t => {
  cc.price('BTC').then(prices => {
    t.end('Promise should not resolve')
  }).catch(e => {
    t.ok(e, 'Errors')
    t.end()
  }).catch(t.end)
})
