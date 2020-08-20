import React, {useState, useEffect} from 'react';

const Timer = (props) => {
  const [seconds, setSeconds] = useState(((new Date(props.end).getTime()/1000) - (new Date().getTime()/1000)).toFixed(0));
  useEffect(() => {
    let interval = null;
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
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
  return(
    <div className='innerPriceDiv'>
      <p className='infoP'>Time Until Next Possible Rebase</p>
      <p className='priceP'>{hour}{minute}{s}</p>
    </div>
  )
}

export default Timer
