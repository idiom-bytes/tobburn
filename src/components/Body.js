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
import Header from './Header';

const Body = (props) => {
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

      {/* TOKEN BLOCK*/}
      <div className='burnDiv'>
          <Info />
      </div>

      {/* COMMUNITY BLOCK */}
      <div className='buttonDiv'>
      <div className='swapDiv'>
        <a className='uniswapLink' href='https://app.uniswap.org/#/swap?outputCurrency=0x7777770f8A6632ff043c8833310e245EBa9209E6' target='_blank' rel='noopener noreferrer'>Buy TOB</a>
        <a className='uniswapLink' href='https://www.chartex.pro/?symbol=UNISWAP:TOB' target='_blank' rel='noopener noreferrer'>TOB Chart</a>
      </div>
      </div>
      <div>
        <Links />
      </div>

      {/* FOOT HTML */}
      <div className='footDiv'>
        <div>Credit</div>
        <div><a className='attLink' href='https://github.com/ethereum/web3.js/' target='_blank' rel='noopener noreferrer'>Ethereum data powered by Web3.js</a></div>
        <div><a className='attLink' href='https://coingecko.com' target='_blank' rel='noopener noreferrer'>Price Data powered by CoinGecko API</a></div>
        <div>
            <a className='cp' href='https://twitter.com/GStauffy' target='_blank' rel='noopener noreferrer'>OG Code by GS</a><br/>

            <a href='https://www.twitter.com/idiom_bytes' target='_blank' rel='noopener noreferrer'><img className="twitter_img" alt="Idiom" src={twitter_dp}/></a><br/>
            <a className='cp' href='https://www.xampburn.com' target='_blank' rel='noopener noreferrer'>xampbburn.com</a> ported by <a className='cp' href='https://www.twitter.com/idiom_bytes' target='_blank' rel='noopener noreferrer'>Idiom</a><br/>
         </div>
      </div>

      {/* FIREBASE BLOCK */}
      <script src="https://www.gstatic.com/firebasejs/7.18.0/firebase-app.js"></script>
      <script src="https://www.gstatic.com/firebasejs/7.18.0/firebase-analytics.js"></script>
    </div>
  )
}

export default Body;
