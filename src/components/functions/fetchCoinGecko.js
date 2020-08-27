import CoinGecko from 'coingecko-api';

async function fetchData() {
  const CoinGeckoClient = new CoinGecko();
  const tob = await CoinGeckoClient.simple.price({
    ids: ['tokens-of-babel'],
    vs_currencies: ['usd'],
  });
  return tob;
}

async function fetchDataType(type) {
  const CoinGeckoClient = new CoinGecko();
  if (type === 'simple') {
    const tob = await CoinGeckoClient.simple.price({
      ids: ['tokens-of-babel'],
      vs_currencies: ['usd'],
    });
    return tob;
  } else {
    let arr = [];
    const tob = await CoinGeckoClient.coins.fetch('tokens-of-babel', {});
    let history = await CoinGeckoClient.coins.fetchMarketChart('tokens-of-babel');
    arr.push(tob);
    arr.push(history)
    return arr;
  }
}

export {fetchData, fetchDataType}
