import React from 'react';
import './Info.css';
import commas from './functions/commas';

const MoreInfo = (props) => {
  const burnt = 400305904.089023;

  return(
    <div className='moreInfoDiv'>
      <p>
        Tokens of Babel began with a total supply of 4,012,101 $TOB. <br/>
        601,815.16 of creator's $TOB locked in a vesting contract August 14, 2020. For 1,382,400 blocks. <br/> Roughly 240 days.<br/>
        <a href='https://etherscan.io/address/0xa44cc80840f205fb2bf001765c012476766fae13' target='_blank' rel='noopener noreferrer'> First vesting deposit @ 541,633.64 $TOB</a><br/>
        <a href='https://etherscan.io/address/0x3474ea3e41372efecbdc1b41a3c92df293370aa8' target='_blank' rel='noopener noreferrer'> Second vesting deposit @ 60,181.52 $TOB</a>
      </p>
    </div>
  )
}

export default MoreInfo;
