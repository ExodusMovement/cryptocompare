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
