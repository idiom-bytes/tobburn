import React, {useState, useEffect} from 'react';
import moment from 'moment'

const GetRebaseDisplay = (props) => {
  const diffTime = props.tob_nextRebaseDate ? props.tob_nextRebaseDate.toDate() - new Date() : new Date()
  const duration = moment.duration(diffTime)

  if(!props.tob_canRebase && duration.asSeconds() > 0.0 ) {
      return (
          <div className='targetRebase'>
            <p className='infoRebase'>Time Until Next Possible Rebase</p>
            <p className='timerRebase'>{duration.hours()} hours {duration.minutes()} minutes {duration.seconds()} seconds</p>
            <p className='infoRebase'>Or price needs to reach: {props.tob_lastExchangeRate}</p>

            <button className='rebaseButtonDisabled' disabled>
                <div className='innerButtonDiv'>
                    <div></div>
                        <span className='rebaseSpan'>Rebase Disabled</span>
                    <div></div>
                </div>
            </button>
          </div>
      )
  }
  else {
      return (
        <div className='innerPriceDiv'>
            <p className='priceP'>Rebase can be called.</p>

            <button className='rebaseButton' onClick={props.callRebase}>
                <div className='innerButtonDiv'>
                    <div></div>
                        <span className='rebaseSpan'>Call Rebase</span>
                    <div></div>
                </div>
            </button>
        </div>
      )
  }
};

const Timer = (props) => {
  const [seconds, setSeconds] = useState((new Date().getTime()));
  useEffect(() => {
    let interval = null;
      interval = setInterval(() => {
        // :: removed seconds => since it can reference the one set in state on line 4
        setSeconds(seconds - 1);
      }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  // :: All components need to have a parent. you cant have many siblings on the render root else react would prob throw an error. you can use fragments <></> or if importing Fragment <Fragment></Fragment>
  return(
    <>
      <GetRebaseDisplay
        // :: is tob_canRebase being passed into timer?
        tob_canRebase={props.data.tob_canRebase}
        tob_lastExchangeRate={props.data.tob_lastExchangeRate}
        tob_nextRebaseDate={props.data.tob_nextRebaseDate}
        callRebase={props.callRebase}
      />
    </>
  )
}

export default Timer