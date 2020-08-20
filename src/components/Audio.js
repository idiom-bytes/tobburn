import React, {useState, useEffect, useRef} from 'react';
import BankRobber from './music/Bankrobber.mp3';
import Anarchy from './music/Anarchy.mp3';


const Audio = () => {
  const audioRef = useRef(null)
  const playlist = [Anarchy, BankRobber];
  const [index, setIndex] = useState(0);
  const onEnd = () => {
    console.log('ended');
    let counter = index + 1;
    if (counter === playlist.length) {
      setIndex(0);
    } else {
      setIndex(counter);
    }
  }
  useEffect(() => {
    console.log(audioRef)
  }, [index])
  return(
    <div>
      <audio ref={audioRef} className='audio' type="audio/mpeg" onEnded={onEnd} controls>
        <source src={playlist[index]} type="audio/mpeg" onEnded={onEnd}/>
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}

export default Audio
