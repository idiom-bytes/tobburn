import React, { useState , useRef, useEffect } from 'react';

function CurrencyButton(props) {
  const currencies = ['usd', 'btc', 'eth', 'eur', 'krw', 'jpy', 'sgd', 'mxn', 'aud', 'brl', 'gbp', 'cad'];
  const [drop, setDrop] = useState(false);
  const dropRef = useRef(null)
  if (drop){
    window.addEventListener('click', offclick);
  }
  function offclick(e) {
    if (!dropRef.current.contains(e.target)) {
      setDrop(!drop);
    }
  }
  function handleClick(e) {
    setDrop(false);
    props.setCurrency(e.target.textContent);
  }
  useEffect(() => {
    return function cleanupListener() {
      window.removeEventListener('click', offclick);
    }
  })
  return(
    <div ref={dropRef} className="currWrapper" >
      <div className='spanDiv'>
    	 <p className='displayCurrency' onClick={() => setDrop(!drop)}>Currency</p>
      </div>
      {!drop ? null :
      	<div className="currDrop">
      		{currencies.map((currency,i) =>
            <p key={i} className='curLI' value={currency} onClick={handleClick}>{currency}</p>
          )}
      	</div>
      }
    </div>

  )
}

export default CurrencyButton;
