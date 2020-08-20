import React from 'react';
import './Info.css';
import commas from './functions/commas';
import {logDonationClick} from "./GoogleAnalytics";

const MoreInfo = (props) => {
  const clicked = () => {
    props.handleClick();
  }
  var dt = new Date(props.date);
  var DD = ("0" + dt.getDate()).slice(-2);
  var MM = ("0" + (dt.getMonth() + 1)).slice(-2);
  var YYYY = dt.getFullYear();
  var hh = ("0" + dt.getHours()).slice(-2);
  var mm = ("0" + dt.getMinutes()).slice(-2);
  var date_string =  + MM + "/" + DD + "/" + YYYY  + " at " + hh + ":" + mm;
  return(
    <div className='moreInfoDiv' onClick={clicked}>
      <p>
        <h3>Why are you here?</h3>
        TOB's [Rebase Function] below triggers the [Coin Burn].<br/>
        Every 12 hours the [Rebase Function] can be called.
      </p>
      <p>
        <h3>TOB Mechanisms</h3>
        [IF] [Current Price] is greater than Historical All-Time-High [Burn-Target Price]<br/>
        [THEN] 1% of [Total TOB Supply] is destroyed<br/>
        [ELSE] Reduce [Burn-Target Price]
      </p>
      <p>
        Next [Rebase Function] is able to be triggered on {date_string}.<br/>
        If these conditions are met, TODO - Live @ $TOB will be burned.
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
