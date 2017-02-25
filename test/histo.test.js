'use strict'
const test = require('tape')

if (!global.fetch) global.fetch = require('node-fetch')
const cc = require('../')
const helpers = require('./helpers')

test('histoDay()', t => {
  t.plan(8)
  cc.histoDay('BTC', 'USD').then(data => {
    t.is(data.length, 31, 'returns 31 items by default')
    const item = data[0]
    t.is(typeof item.time, 'number', 'item.time is a number')
    t.is(typeof item.close, 'number', 'item.close is a number')
    t.is(typeof item.high, 'number', 'item.high is a number')
    t.is(typeof item.low, 'number', 'item.low is a number')
    t.is(typeof item.open, 'number', 'item.open is a number')
    t.is(typeof item.volumefrom, 'number', 'item.volumefrom is a number')
    t.is(typeof item.volumeto, 'number', 'item.volumeto is a number')
    t.end()
  }).catch(t.end)
})

test("histoDay()'s limit option works", t => {
  t.plan(1)
  cc.histoDay('BTC', 'USD', { limit: 2 }).then(data => {
    t.is(data.length, 3, 'returns limit plus timestamped data')
    t.end()
  }).catch(t.end)
})

test("histoDay()'s timestamp option works", t => {
  t.plan(1)
  let data = []
  data.push(cc.histoDay('BTC', 'USD', { timestamp: new Date('2017-01-01') }))
  data.push(cc.histoDay('BTC', 'USD', { timestamp: new Date('2017-01-02') }))
  Promise.all(data).then(data => {
    t.notDeepEqual(data[0], data[1], 'data from different days should not be equivalent')
    t.end()
  }).catch(t.end)
})

test("histoDay()'s tryConversion=false works", t => {
  helpers.testTryConversion(cc.histoDay(helpers.NOT_USD_TRADABLE, 'USD', { tryConversion: false }), t)
})
