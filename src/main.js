import css from './main.css';

// require Handlebars template
const listTemplate = require('./listTemplate.hbs');
// coinMCap API URL
const coinMarketCapApiUrl = 'https://api.coinmarketcap.com/v2/ticker/';
let cryptoList;

// check status of coinMCap API response
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}
// convert fetch http response promise to json
function toJson(response) {
  return response.json()
}
function prettyNums(uglyNumber) {
  return uglyNumber > 0 ? uglyNumber.toLocaleString('en') : '-';
}
// transform coinMCap API data
function transformCoinMCapData(coinMCapData) {
  // create new array with IDs
  const coinMCapDataIds = Object.keys(coinMCapData.data);
  // 1. create parent property "coinData" 2. map() coinMCapDataIds and select needed data from original object by mapped ID 3. pipe the result of map() through sort() to sort list by coin rank
  const transformedData = {
    coinData: coinMCapDataIds.map(id => ({
      coinName : coinMCapData.data[id].name,
      coinSymbol: coinMCapData.data[id].symbol,
      coinImg: `https://s2.coinmarketcap.com/static/img/coins/16x16/${id}.png`,
      circulatingSupply: prettyNums(coinMCapData.data[id].circulating_supply),
      totalSupply: prettyNums(coinMCapData.data[id].total_supply),
      maxSupply: prettyNums(coinMCapData.data[id].max_supply),
      rank: coinMCapData.data[id].rank,
      coinId: id
      })).sort(function (a, b) { return a.rank - b.rank; })
  };
  return transformedData;
}
// pass data to Handlebars template
function createList(coinMCapData) {
  cryptoList = document.getElementById('crypto-list');
  cryptoList.innerHTML = listTemplate(transformCoinMCapData(coinMCapData));
}

// fetch data
fetch(coinMarketCapApiUrl)
  .then(checkStatus)
  .then(toJson)
  .then(function(coinMCapData) {
    createList(coinMCapData)
  }).catch(function(error) {
    cryptoList.innerHTML = `Request failed: ${error}`;
  });
