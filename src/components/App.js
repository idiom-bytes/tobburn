import React from 'react';
import './App.css';
import Body from './Body';
import {Helmet} from 'react-helmet';

const App = () => {
  return(
    <div className='container'>
      <Helmet>
            <title>TOB Burn</title>
            <meta charSet="utf-8" />
            <meta name="description" content="Burn statistics for Token of Babel's TOB token." />
      </Helmet>
      <Body />
    </div>

  )
}

export default App;
