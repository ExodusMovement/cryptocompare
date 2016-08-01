var test = require('tape')

// set to global
global.fetch = require('node-fetch')
var cc = require('../')

test('coinList()', function (t) {
  t.plan(1)
  cc.coinList().then(coinList => {
    console.dir(coinList.BTC)
    t.strictEqual(coinList.BTC.CoinName, 'Bitcoin')
  }).catch(t.end)
})
