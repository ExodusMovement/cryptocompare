'use strict'
const test = require('tape')

// set to global
global.fetch = require('node-fetch')
const cc = require('../')

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
  t.plan(1)
  cc.price('LTD', 'USD', false).then(prices => {
    t.end('Promise should not resolve')
  }).catch(e => {
    t.ok(e.match(/market does not exist/i), 'Converting LTD to USD fails')
    t.end()
  }).catch(t.end)
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

test('priceHistorical()', t => {
  t.plan(3)
  // NOTE: Historical values are hard-coded into this test
  const timestamp = new Date('2017-01-01')
  cc.priceHistorical('BTC', ['USD', 'EUR'], timestamp).then(prices => {
    t.strictEqual(typeof prices.USD, 'number', 'prices.USD is a number')
    t.is(prices.USD, 997, 'Correct historical value')
    t.strictEqual(typeof prices.EUR, 'number', 'prices.EUR is a number')
    t.end()
  }).catch(t.end)
})

test("priceHistorical()'s tryConversion=false works", t => {
  t.plan(1)
  // NOTE: Historical values are hard-coded into this test
  const timestamp = new Date('2017-01-01')
  cc.priceHistorical('LTD', 'USD', timestamp, false).then(prices => {
    t.end('Promise should not resolve')
  }).catch(e => {
    t.ok(e.match(/market does not exist/i), 'Converting LTD to USD fails')
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
