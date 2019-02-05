1.0.0 / 2019-02-05
------------------

- added: `constituentExchangeList()` method ([#36](https://github.com/exodusmovement/cryptocompare/pull/36))
- added: `latestSocial()` method ([#36](https://github.com/exodusmovement/cryptocompare/pull/36))
- added: `histoSocial()` method ([#36](https://github.com/exodusmovement/cryptocompare/pull/36))
- fixed: docs for `toTs` option ([#36](https://github.com/exodusmovement/cryptocompare/pull/36))

0.7.2 / 2019-01-25
------------------

- Fix bug with `newsList()` & `newsFeedsAndCategories()` ([#35](https://github.com/exodusmovement/cryptocompare/pull/35))

0.7.1 / 2018-12-24
------------------

- Fix bug in `newsList()` ([#33](https://github.com/exodusmovement/cryptocompare/pull/33))

0.7.0 / 2018-11-26
------------------

- added: API key support via `setApiKey()` ([#32](https://github.com/exodusmovement/cryptocompare/pull/32))
- added: `newsList()` & `newsFeedsAndCategories()` methods ([#32](https://github.com/exodusmovement/cryptocompare/pull/32))

0.6.0 / 2018-11-06
------------------

- added: `topExchangesFull()` method ([#22](https://github.com/exodusmovement/cryptocompare/pull/22))
- added: support for `toTs`, `allData`, and `aggregatePredictableTimePeriods` options ([#31](https://github.com/exodusmovement/cryptocompare/pull/31))

0.5.0 / 2018-03-23
------------------

- changed: Handles HTTP status errors; throws on non-2xx error codes [#20](https://github.com/ExodusMovement/cryptocompare/pull/20)

0.4.0 / 2018-01-09
------------------

- added: `exchangeList()` method

0.3.0 / 2017-11-27
------------------

- added: `coinList()` method
- fixed: `generateAvg()` was broken due to endpoint changes

0.2.0 / 2017-09-01
------------------

- added: `exchange` option to `histoDay()`, `histoHour()`, & `histoMinute()`

0.1.0 / 2017-04-04
------------------

Switched to https://min-api.cryptocompare.com/

- removed: `coinList()`
- changed: `price()` returns a different data structure
- changed: `priceHistorical()` returns a different data structure
- changed: `price()` and `priceHistorical)()` function signature has changed
- added: `priceMulti()`
- added: `priceFull()`
- added: `topPairs()`
- added: `topExchanges()`
- added: `histoDay()`
- added: `histoHour()`
- added: `histoMinute()`
- added: `generateAvg()`
- added: `exchanges` option for methods that support it

0.0.2 / 2016-11-21
------------------
- bug fix: `priceHistorical()` - wrong endpoint

0.0.1 / 2016-08-01
------------------
- initial release
