import {appValues} from '.././AppValues'
import {secrets} from '.././Secrets'

async function getTokenSupply() {
  const request_url = `https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=${appValues['CONTRACT_TOB_0x']}&apikey=${secrets['ETHERSCAN_API_KEY']}`;
  console.log(request_url);

  const response = await fetch(request_url);
  const json = await response.json();

  console.log(`Data returned ${json}`);

  return json;
}

async function getBurnedSupply() {
  var request_url = `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${appValues['CONTRACT_TOB_0x']}&address=${appValues['CONTRACT_BURN_0x']}&tag=latest&apikey=${secrets['ETHERSCAN_API_KEY']}`;
  console.log(request_url);

  const response = await fetch(request_url);
  const json = await response.json();

  console.log(`Data returned ${json}`);

  return json;
}

export {getTokenSupply, getBurnedSupply};