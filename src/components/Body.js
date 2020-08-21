import React, {useState,useEffect} from 'react';
import './Body.css';
import Loader from './images/loader';
import Info from './Info';
import Web3 from 'web3';
import logo from './images/toblogo.jpeg'
import twitter_dp from './images/twitter_icon.jpeg'
import Twitter from './Twitter';
import Links from './Links';
import Icon from './images/flame'
import MoreInfo from './MoreInfo';
import Header from './Header';

const Body = (props) => {
  {/*Header - Functionality*/}
  const quote = [];
  // const rand = Math.floor(Math.random() * quote.length);
  const [rand, setRand] = useState({
    init: false,
    num:0,
  });

  {/*TOB Functionality*/}
  const [fetch, setFetch] = useState(false);
  const [data, setData] = useState({supply:0, stack:0});
  const address = "0x7777770f8A6632ff043c8833310e245EBa9209E6"
  const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"epoch","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalSupply","type":"uint256"}],"name":"LogRebase","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"_owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner_","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"who","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"epoch","type":"uint256"},{"internalType":"uint256","name":"supplyDelta","type":"uint256"}],"name":"rebase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]
  useEffect(() => {
    if(!rand.init) {
      setRand({
        init:true,
        num: Math.floor(Math.random() * quote.length),
      })
    }
  }, [rand, quote.length]);
  useEffect(() => {
    if (!fetch) {
      const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/5999cb4e3dd84741958006998142aaff"));
      const contract = new web3.eth.Contract(abi, address);
      setFetch(true)
      contract.methods.totalSupply().call((err, result) => {
        setData({
          supply: result,
          burn: 400305904.089023,
          stack:0,
        })
      });
    }
  }, [fetch,abi]);


  return(
    <div className='body'>
      {/* HEADER*/}
      <div className='head'>
        <div></div>
        <div>
          <div><a href='https://www.tokensofbabel.com/' target='_blank' rel='noopener noreferrer'><img className="headLogo" alt="TOB Logo" src={logo} /></a></div>
        </div>
      </div>

      <Header/>
      <MoreInfo/>

      {/* TOKEN BLOCK*/}
      <div className='burnDiv'>
        {!fetch ?
          <Loader name='Blockchain'/> :
          <Info info={data} />
        }
      </div>

      {/* COMMUNITY BLOCK */}
      <div className='buttonDiv'>
      <div className='swapDiv'>
        <a className='uniswapLink' href='https://app.uniswap.org/#/swap?outputCurrency=0x7777770f8A6632ff043c8833310e245EBa9209E6' target='_blank' rel='noopener noreferrer'>Buy $TOB</a>
      </div>
      </div>
      <div>
        <Links />
      </div>

      {/* TWITTER FEED HTML */}
      <div className='socialDiv'>
        <Twitter />
      </div>

      {/* FOOT HTML */}
      <div className='footDiv'>
        <br/>
        <br/>
        <div>Credit</div>
        <div><a className='attLink' href='https://github.com/ethereum/web3.js/' target='_blank' rel='noopener noreferrer'>Ethereum data powered by Web3.js</a></div>
        <div><a className='attLink' href='https://coingecko.com' target='_blank' rel='noopener noreferrer'>Price Data powered by CoinGecko API</a></div>
        <div>
            <a className='cp' href='https://twitter.com/GStauffy' target='_blank' rel='noopener noreferrer'>OG Code by GS</a><br/>

            <a href='https://www.twitter.com/idiom_bytes' target='_blank' rel='noopener noreferrer'><img className="twitter_img" alt="Idiom" src={twitter_dp}/></a><br/>
            $TOB port by Idiom<br/>
         </div>
      </div>

      {/* FIREBASE BLOCK */}
      <script src="https://www.gstatic.com/firebasejs/7.18.0/firebase-app.js"></script>
      <script src="https://www.gstatic.com/firebasejs/7.18.0/firebase-analytics.js"></script>
    </div>
  )
}

export default Body;
