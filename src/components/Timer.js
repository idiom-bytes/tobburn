import React, {useState, useEffect} from 'react';

const GetRebaseDisplay = (props) => {
  // :: move this into its own top level componennt. pass props
  console.log('XXXXXXXXXXXXXXXXXXXXX getRebaseDisplay')
  if(!props.tob_canRebase) {
      return (
          <div className='targetRebase'>
            <p className='infoRebase'>Time Until Next Possible Rebase</p>
            <p className='timerRebase'>{props.hour} hours {props.minute} minutes {props.s} seconds</p>
            <p className='infoRebase'>Or price needs to reach: {props.tob_lastExchangeRate}</p>
          </div>
      )
  }
  else {
      return (
        <div className='innerPriceDiv'>
            <p className='priceP'>Rebase can be called.</p>
        </div>
      )
  }
};

const Timer = (props) => {
  const [seconds, setSeconds] = useState(((new Date().getTime()/1000)).toFixed(0) - (new Date(props.data.tob_nextRebaseDate).getTime()/1000));
  useEffect(() => {
    let interval = null;
      interval = setInterval(() => {
        // :: removed seconds => since it can reference the one set in state on line 4
        setSeconds(seconds - 1);
      }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);
  let hours = Math.floor(seconds%(3600*12)/3600)
  let minutes = Math.floor(seconds%3600/60);
  let second = Math.floor(seconds%60);
  let hour = hours === 1 ? hours + ' hour, '
      : hours + ' hours, '
    let minute = minutes === 1 ? minutes + ' minute, '
      : minutes + ' minutes, ';
    let s = seconds === 1 ? second + ' second.'
      : second + ' seconds.'

  // :: All components need to have a parent. you cant have many siblings on the render root else react would prob throw an error. you can use fragments <></> or if importing Fragment <Fragment></Fragment>
  return(
    <>
      <GetRebaseDisplay
        // :: is tob_canRebase being passed into timer?
        tob_canRebase={props.data.tob_canRebase}
        hour={hours}
        minute={minutes}
        s={second}
        tob_lastExchangeRate={props.data.tob_lastExchangeRate}
      />
    </>
  )
}

export default Timer