var test = require('tape')

// set to global
global.fetch = require('node-fetch')
var cc = require('../')

test('coinList()', function (t) {
  t.plan(1)
  cc.coinList().then(coinList => {
    t.strictEqual(coinList.BTC.CoinName, 'Bitcoin', 'CoinName field should be Bitcoin')
  }).catch(t.end)
})

test('price()', function (t) {
  t.plan(4)
  cc.price('BTC', ['USD', 'CNY']).then(prices => {
    t.strictEqual(prices[0].Symbol, 'USD', 'prices[0].Symbol === USD')
    t.strictEqual(typeof prices[0].Price, 'number', 'prices[0].Price is a number')
    t.strictEqual(prices[1].Symbol, 'CNY')
    t.strictEqual(typeof prices[1].Price, 'number')
    t.end()
  }).catch(t.end)
})

test('priceHistorical()', function (t) {
  t.plan(5)
  // Arbitrary timestamp; historical values are hard-coded into this test
  var timestamp = new Date(1456149600 * 1000)
  cc.priceHistorical('BTC', ['USD', 'CNY'], timestamp).then(prices => {
    t.strictEqual(prices[0].Symbol, 'USD', 'prices[0].Symbol === USD')
    t.strictEqual(typeof prices[0].Price, 'number', 'prices[0].Price is a number')
    t.is(prices[0].Price, 438.26)
    t.strictEqual(prices[1].Symbol, 'CNY')
    t.strictEqual(typeof prices[1].Price, 'number')
    t.end()
  }).catch(t.end)
})
