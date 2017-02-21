'use strict'
/* global fetch */

const baseUrl = 'https://www.cryptocompare.com/api/data/'

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
  let url = `${baseUrl}coinlist/`
  return fetchJSON(url)
}

function price (fsym, tsyms, useBtc) {
  let url = `${baseUrl}price?fsym=${fsym}&tsyms=${tsyms}`
  if (useBtc) url += 'usebtc=true'
  return fetchJSON(url)
}

function priceHistorical (fsym, tsyms, time) {
  if (!(time instanceof Date)) throw new Error('time parameter must be an instance of Date.')
  time = Math.floor(time.getTime() / 1000)
  let url = `${baseUrl}pricehistorical?fsym=${fsym}&tsyms=${tsyms}&ts=${time}`
  return fetchJSON(url)
}

module.exports = {
  coinList,
  price,
  priceHistorical
}
