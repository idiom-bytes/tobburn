import React, {useState, useEffect} from 'react';
import MoreInfo from './MoreInfo';
import Rebase from './Rebase';
import './Info.css';
import fetchData from './functions/fetchCoinGecko';
import commas from './functions/commas';

const Info = (props) => {
  const [toggle, setToggle] = useState(false);
  const [price, setPrice] = useState({
    fetch:false,
    data:{},
  })
  const burnt = 400305904.089023;
  const circSupp = (props.info.supply / 1000000000) - burnt;
  const data = {
    circSupp: circSupp,
    supp: props.info.supply/1000000000,
    burn: 1000000000 - circSupp,
    stack:props.info.stack
  }
  const toggleOff = () => {
    setToggle(false);
  }
  useEffect(() => {
    if (price.fetch === false) {
      fetchData()
        .then(res => {
          setPrice({
            fetch:true,
            data:res,
          })
        })
        .catch(err => console.log(err));
    }
  }, [price]);

  return (
    <div className='outerDiv'>
      <div className='burnDiv innerDiv'>
        {/*
        <div className='lineDiv'><p className='burnP'><span className='burnSpan'>{commas(data.burn.toFixed(3))}</span> TOB burned.</p></div>
        <div className='lineDiv'><p className='burnP'><span className='burnSpan'>{commas(data.circSupp.toFixed(3))}</span> TOB remains.</p></div>
        <div className='lineDiv'><p className='burnP'><span className='burnSpan'>{(data.burn/1000000000*100).toFixed(2)}%</span> of intitial supply gone forever.</p></div>
        */}
        <div className='lineDiv'><p className='burnP'><span className='burnSpan'>TODO - Live @ $TOB burned.</span></p></div>
        <div className='lineDiv'><p className='burnP'><span className='burnSpan'>TODO - Live @ $TOB remains.</span></p></div>
        <div className='lineDiv'><p className='burnP'><span className='burnSpan'>TODO - Live @ intitial supply gone forever.</span></p></div>

        {data.stack > 0 ?
          <div className='lineDiv'><p className='burnP'><span>{commas((data.stack/1000000000).toFixed(3))}</span> $TOB in your MetaMask.</p></div> :
          null
        }

        {/* MOVE "More Info" about TOB to the top
        {!toggle ?
          <p className='clickP' onClick={() => setToggle(true)}>More Info</p> :
          <MoreInfo info={data} handleClick={toggleOff} price={price.data} fetched={price.fetch}/>
        }
        */}
        {!price.fetch ? null :
          <Rebase data={props.info} price={price.data.data['tokens-of-babel'].usd} supply={data.circSupp + burnt} />
        }
      </div>
    </div>
  )
}

export default Info;
