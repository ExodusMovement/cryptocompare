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

module.exports = {
  coinList
}
