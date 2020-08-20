import CoinGecko from 'coingecko-api';

async function fetchData() {
  const CoinGeckoClient = new CoinGecko();
  const tob = await CoinGeckoClient.simple.price({
    ids: ['tokens-of-babel'],
    vs_currencies: ['usd'],
  });
  return tob;
}

export default fetchData;
