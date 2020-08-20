import React from 'react';
import './Twitter.css';
import { TwitterFollowButton, TwitterMentionButton } from 'react-twitter-embed';

function Twitter() {


  return(
    <div className='twitterDiv'>
      <p className='socialName'>Tokens of Babel creator @burn_the_state on Twitter</p>
      <a className="twitter-timeline tw-align-center" data-height="400" data-theme="dark" href="https://twitter.com/burn_the_state?ref_src=twsrc%5Etfw">Tweets by burn_the_state</a> <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
      <div className='tweetDiv'>
        <TwitterFollowButton
          screenName={'burn_the_state'}
        />
        <TwitterMentionButton
          screenName={'burn_the_state'}
        />
      </div>
    </div>
  )
}

export default Twitter;
