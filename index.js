'use strict'
/* global fetch */

const baseUrl = 'https://min-api.cryptocompare.com/data/'
let apiKey = ''

function setApiKey (userApiKey) {
  apiKey = userApiKey
}

function fetchJSON (url) {
  if (apiKey !== '') {
    if (url.indexOf('?') > -1) {
      url += '&api_key='
    } else {
      url += '?api_key='
    }
    url += apiKey
  }
  return fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
      }
      return res.json()
    })
    .then(body => {
      if (body.Response === 'Error') throw body.Message
      return body
    })
}

function coinList () {
  const url = `${baseUrl}all/coinlist`
  return fetchJSON(url)
}

function exchangeList () {
  const url = `${baseUrl}all/exchanges`
  return fetchJSON(url)
}

function constituentExchangeList (options) {
  options = options || {}
  let url = `${baseUrl}all/includedexchanges`
  if (options.instrument) url += `?instrument=${options.instrument}`
  return fetchJSON(url).then(result => result.Data)
}

function newsFeedsAndCategories () {
  const url = `${baseUrl}news/feedsandcategories`
  return fetchJSON(url).then(result => result.Data)
}

function newsList (lang, options) {
  options = options || {}
  let url = `${baseUrl}v2/news/?lang=${lang}`
  if (options.feeds) url += `&feeds=${options.feeds}`
  if (options.categories) url += `&categories=${options.categories}`
  if (options.excludeCategories) url += `&categories=${options.excludeCategories}`
  if (options.lTs) {
    options.lTs = dateToTimestamp(options.lTs)
    url += `&lTs=${options.lTs}`
  }
  return fetchJSON(url).then(result => result.Data)
}

function price (fsym, tsyms, options) {
  options = options || {}
  let url = `${baseUrl}price?fsym=${fsym}&tsyms=${tsyms}`
  if (options.exchanges) url += `&e=${options.exchanges}`
  if (options.tryConversion === false) url += '&tryConversion=false'
  return fetchJSON(url)
}

function priceMulti (fsyms, tsyms, options) {
  options = options || {}
  let url = `${baseUrl}pricemulti?fsyms=${fsyms}&tsyms=${tsyms}`
  if (options.exchanges) url += `&e=${options.exchanges}`
  if (options.tryConversion === false) url += '&tryConversion=false'
  return fetchJSON(url)
}

function priceFull (fsyms, tsyms, options) {
  options = options || {}
  let url = `${baseUrl}pricemultifull?fsyms=${fsyms}&tsyms=${tsyms}`
  if (options.exchanges) url += `&e=${options.exchanges}`
  if (options.tryConversion === false) url += '&tryConversion=false'
  // We want the RAW data, not the DISPLAY data:
  return fetchJSON(url).then(result => result.RAW)
}

function priceHistorical (fsym, tsyms, time, options) {
  options = options || {}
  time = dateToTimestamp(time)
  let url = `${baseUrl}pricehistorical?fsym=${fsym}&tsyms=${tsyms}&ts=${time}`
  if (options.exchanges) url += `&e=${options.exchanges}`
  if (options.tryConversion === false) url += '&tryConversion=false'
  // The API returns json with an extra layer of nesting, so remove it
  return fetchJSON(url).then(result => result[fsym])
}

function generateAvg (fsym, tsym, e, tryConversion) {
  let url = `${baseUrl}generateAvg?fsym=${fsym}&tsym=${tsym}&e=${e}`
  if (tryConversion === false) url += '&tryConversion=false'
  return fetchJSON(url).then(result => result.RAW)
}

function topPairs (fsym, limit) {
  let url = `${baseUrl}top/pairs?fsym=${fsym}`
  if (limit) url += `&limit=${limit}`
  return fetchJSON(url).then(result => result.Data)
}

function topExchanges (fsym, tsym, limit) {
  let url = `${baseUrl}top/exchanges?fsym=${fsym}&tsym=${tsym}`
  if (limit) url += `&limit=${limit}`
  return fetchJSON(url).then(result => result.Data)
}

function topExchangesFull (fsym, tsym, limit) {
  let url = `${baseUrl}top/exchanges/full?fsym=${fsym}&tsym=${tsym}`
  if (limit) url += `&limit=${limit}`
  return fetchJSON(url).then(result => result.Data)
}

function histoDay (fsym, tsym, options) {
  options = options || {}
  if (options.timestamp) options.timestamp = dateToTimestamp(options.timestamp)
  let url = `${baseUrl}histoday?fsym=${fsym}&tsym=${tsym}`
  if (options.exchange) url += `&e=${options.exchange}`
  if (options.limit === 'none') url += '&allData=true'
  else if (options.limit) url += `&limit=${options.limit}`
  if (options.tryConversion === false) url += '&tryConversion=false'
  if (options.aggregate) url += `&aggregate=${options.aggregate}`
  if (options.timestamp) url += `&toTs=${options.timestamp}`
  if (options.aggregatePredictableTimePeriods) url += `&aggregatePredictableTimePeriods=${options.aggregatePredictableTimePeriods}`
  if (options.allData) url += `&allData=${options.allData}`
  if (options.toTs) url += `&toTs=${options.toTs}`
  return fetchJSON(url).then(result => result.Data)
}

function histoHour (fsym, tsym, options) {
  options = options || {}
  if (options.timestamp) options.timestamp = dateToTimestamp(options.timestamp)
  let url = `${baseUrl}histohour?fsym=${fsym}&tsym=${tsym}`
  if (options.exchange) url += `&e=${options.exchange}`
  if (options.limit) url += `&limit=${options.limit}`
  if (options.tryConversion === false) url += '&tryConversion=false'
  if (options.aggregate) url += `&aggregate=${options.aggregate}`
  if (options.timestamp) url += `&toTs=${options.timestamp}`
  if (options.allData) url += `&allData=${options.allData}`
  if (options.toTs) url += `&toTs=${options.toTs}`
  return fetchJSON(url).then(result => result.Data)
}

function histoMinute (fsym, tsym, options) {
  options = options || {}
  if (options.timestamp) options.timestamp = dateToTimestamp(options.timestamp)
  let url = `${baseUrl}histominute?fsym=${fsym}&tsym=${tsym}`
  if (options.exchange) url += `&e=${options.exchange}`
  if (options.limit) url += `&limit=${options.limit}`
  if (options.tryConversion === false) url += '&tryConversion=false'
  if (options.aggregate) url += `&aggregate=${options.aggregate}`
  if (options.timestamp) url += `&toTs=${options.timestamp}`
  if (options.allData) url += `&allData=${options.allData}`
  if (options.toTs) url += `&toTs=${options.toTs}`
  return fetchJSON(url).then(result => result.Data)
}

function dateToTimestamp (date) {
  if (!(date instanceof Date)) throw new Error('timestamp must be an instance of Date.')
  return Math.floor(date.getTime() / 1000)
}

function latestSocial (options) {
  options = options || {}
  let url = `${baseUrl}social/coin/latest`
  if (options.coinId) url += `?coinId=${options.coinId}`
  return fetchJSON(url).then(result => result.Data)
}

function histoSocial (timePeriod, options) {
  options = options || {}
  let url = `${baseUrl}social/coin/histo/${timePeriod === 'hour' ? 'hour' : 'day'}`
  let query = []
  if (options.coinId) query.push(`coinId=${options.coinId}`)
  if (options.aggregate >= 1 && options.aggregate <= 30) query.push(`aggregate=${options.aggregate}`)
  if (options.aggregate && typeof options.aggregatePredictableTimePeriods === 'boolean') query.push(`&aggregatePredictableTimePeriods=${options.aggregatePredictableTimePeriods}`)
  if (options.limit >= 1 && options.limit <= 2000) query.push(`limit=${options.limit}`)
  if (options.toTs) query.push(`toTs=${options.toTs}`)
  return fetchJSON(`${url}${query.length > 0 ? '?' + query.join('&') : ''}`).then(result => result.Data)
}

module.exports = {
  setApiKey,
  coinList,
  constituentExchangeList,
  exchangeList,
  newsFeedsAndCategories,
  newsList,
  price,
  priceMulti,
  priceFull,
  priceHistorical,
  generateAvg,
  topPairs,
  topExchanges,
  topExchangesFull,
  histoDay,
  histoHour,
  histoMinute,
  latestSocial,
  histoSocial
}
