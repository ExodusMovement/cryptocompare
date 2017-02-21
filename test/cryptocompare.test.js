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
  cc.price('LTD', 'USD', false).then(prices => {
    t.end('Promise should not resolve')
  }).catch(e => {
    t.ok(e, 'Converting LTD to USD fails')
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

test('error handling', t => {
  cc.price('BTC').then(prices => {
    t.end('Promise should not resolve')
  }).catch(e => {
    t.ok(e, 'Errors')
    t.end()
  }).catch(t.end)
})
