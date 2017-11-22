'use strict'

// NOT_USD_TRADABLE is a cryptocurrency which does not trade directly with USD.
// This value is used in testing tryConversion. Currently, this is set to MRSA.
// If MRSA trades directly with USD in the future, tests will fail.
// In that case, change this value:
exports.NOT_USD_TRADABLE = 'MRSA'

exports.testTryConversion = function (promise, t) {
  t.plan(1)
  promise.then(prices => {
    t.end('Promise should not resolve')
  }).catch(e => {
    t.ok(e.match(/market does not exist/i), `Converting ${exports.NOT_USD_TRADABLE} to USD fails`)
    t.end()
  }).catch(t.end)
}
