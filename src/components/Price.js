import React, {useState, useEffect} from 'react';
import './Price.css';
import {fetchDataType} from './functions/fetchCoinGecko';
import {VictoryLine} from 'victory';
import VisibilitySensor from 'react-visibility-sensor';
import { useSpring, animated as a} from 'react-spring';
import CurrencyButton from './priceComponents/currencyButton';

const Price = () => {
  const [curr, setCurr] = useState('usd');
  function setCurrency(currency) {
    setCurr(currency);
  }
  const [vis, setVis] = useState(false);
  const fade = useSpring({
    opacity: vis ? 1 : 0,
    from: {opacity:0},
    config: {duration: 1500},
  })
  const [price, setPrice] = useState({
    fetch:false,
    data:{},
    history:[],
  })
  useEffect(() => {
    if (price.fetch === false) {
      fetchDataType('complicated')
        .then(res => {
          setPrice({
            fetch:true,
            data:res[0],
            history:res[1],
          })
        })
        .catch(err => console.log(err));
    }
  }, [price]);
  let data = [];
  if (price.fetch) {
    price.history.data.prices.forEach((price, i) => {
      let obj = {
        x:price[0],
        y:price[1],
      }
      data.push(obj)
    })
  }
  const digits = curr === 'btc' || curr === 'eth' ? 8 : 6
  const prefix = curr === 'btc' || curr === 'eth' ? '' : "$"
  return(
    <VisibilitySensor onChange={(isVisible) => setVis(isVisible)} partialVisibility offset={{bottom:125, top:125}}>
      <a.div style={fade}>
        {price.fetch ?
          <div className='xPriceDiv'>
            <div className='xPriceTopDiv'>
              <p className='xPriceTitle'>TOB Price Info</p>
              <p className='price'>{prefix}{price.data.data.market_data.current_price[curr].toFixed(digits)} {curr.toUpperCase()}</p>
              <VictoryLine  style={{
                data: { stroke: "#6DAFFE" }
              }} animate={{
                duration: 2000,
                onLoad: { duration: 3000 }
              }} data={data} width={1000} height={400} />
              <div className='currButtDiv'>
                <div></div>
                <CurrencyButton setCurrency={setCurrency} />
                <div></div>
              </div>
            </div>
            <div className='hiLoDiv'>
              <div className='hiLoInnerDiv'><p className='hiLoP titleP'>24 Hour High</p><p className='hiLoP'> {prefix}{price.data.data.market_data.high_24h[curr].toFixed(digits)} {curr.toUpperCase()}</p></div>
              <div className='hiLoInnerDiv'><p className='hiLoP titleP'>24 Hour Low</p><p className='hiLoP'>{prefix}{price.data.data.market_data.low_24h[curr].toFixed(digits)} {curr.toUpperCase()}</p></div>
              <div className='hiLoInnerDiv'><p className='hiLoP titleP'>All Time High</p><p className='hiLoP'>{prefix}{price.data.data.market_data.ath[curr].toFixed(digits)} {curr.toUpperCase()}</p></div>
              <div className='hiLoInnerDiv'><p className='hiLoP titleP'>All Time Low</p><p className='hiLoP'>{prefix}{price.data.data.market_data.atl[curr].toFixed(digits)} {curr.toUpperCase()}</p></div>
            </div>
            <div className='changeDiv'>
              <div className='changeInnerDiv'>
                <p className='changeP titleP'>24 Hour Change</p>
                <p className='changeP'>{price.data.data.market_data.price_change_percentage_24h.toFixed(2)}%</p>
              </div>
              <div className='changeInnerDiv'>
                <p className='changeP titleP'>7 Day Change</p>
                <p className='changeP'>{price.data.data.market_data.price_change_percentage_7d.toFixed(2)}%</p>
              </div>
              <div className='changeInnerDiv'>
                <p className='changeP titleP'>1 Year Change</p>
                <p className='changeP'>{price.data.data.market_data.price_change_percentage_1y.toFixed(2)}%</p>
              </div>
            </div>
          </div> : null
        }
      </a.div>
    </VisibilitySensor>
  )
}

export default Price;
