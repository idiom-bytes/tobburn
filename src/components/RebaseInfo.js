import React from 'react';
import './Info.css';
import commas from './functions/commas';
import {logDonationClick} from "./GoogleAnalytics";

const MoreInfo = (props) => {
  return(
    <div className='moreInfoDiv'>
      <p>
        <h3>Why are you here?</h3>
        TOB's [Rebase Function] powers the token's mechanisms.<br/>
        To trigger [Rebase Function] press the button below.
      </p>
      <p>
        <h3>Token Mechanisms</h3>
        [IF] [Current Price] > [Rebase Target Price]<br/>
        [OR] [Current Time] > [Last Rebase Date + 12 hours]<br/>
        [THEN] You can trigger [Rebase Function]
      </p>
      <p>
        [IF] [Current Price] > [Rebase Target Price]<br/>
        [THEN] 1% of [Total TOB Supply] is destroyed.<br/>
        [ELSE] [Rebase Target Price] = [Current Price + 10%]
      </p>
      <h5>
        Support & Donations<br/><br/>
        Donate below so I can continue helping Bill Drummond's work, and community. <br/>
        ♥♥♥ $ETH, $XAMP $TOB ♥♥♥ <br/>
        <a href='https://etherscan.io/address/0x50f8fBE4011E9dDF4597AAE512ccFb00387fdBD2' onclick="logDonationClick();" target='_blank' rel='noopener noreferrer'>0x50f8fBE4011E9dDF4597AAE512ccFb00387fdBD2</a>
      </h5>
    </div>
  )
}

export default MoreInfo;
