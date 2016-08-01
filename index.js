/* global fetch */

var baseUrl = 'https://www.cryptocompare.com/api/data/'

function fetchJSON (url) {
  return fetch(url)
    .then(res => res.json())
    .then(body => {
      // 'response' is a CryptoCompare field
      if (body.Response !== 'Success') throw new Error(body.Message)
      return body.Data
    })
}

function coinList () {
  var url = baseUrl + 'coinlist/'
  return fetchJSON(url)
}

function price (fsym, tsyms, useBtc) {
  if (!Array.isArray(tsyms)) tsyms = [tsyms]
  var url = baseUrl + 'price?fsym=' + fsym + '&tsyms=' + tsyms.join(',')
  if (useBtc) url += 'usebtc=true'
  return fetchJSON(url)
}

module.exports = {
  coinList,
  price
}
