import React from 'react';
import BankRobber from './music/Bankrobber.mp3';
import Anarchy from './music/Anarchy.mp3';
import Sublime from './music/Sublime.mp3'
import FireInCairo from './music/FireInCairo.mp3'
import WaitingRoom from './music/WaitingRoom.mp3';
import AudioPlayer from 'react-modular-audio-player';
import './Audio.css';
import play from './images/play.png';
import forward from './images/forward.png';
import back from './images/rewind.png';
import volume from './images/speaker.png';
import mute from './images/mute.png';
import pause from './images/pause.png';

const AudioComp = () => {
  let playlist = [
  { src: Anarchy,
    title: "Sex Pistols - Anarchy In the UK",
    artist: "Song 1" },
  { src: FireInCairo,
    title: "The Cure - Fire In Cairo",
    artist: "Song 2" },
  { src: WaitingRoom,
    title: "Fugazi - Waiting Room",
    artist: "Song 3" },
  { src: Sublime,
    title: "Sublime - 5446 Thats My Number/Ball and Chain",
    artist: "Song 4" },
  { src: BankRobber,
    title: "The Clash - Bankrobber",
    artist: "Song 5" }
];
  return(
    <div className='audioDiv'>
      <AudioPlayer
        audioFiles={playlist}
        fontWeight='450'
        fontSize='.825rem'
        iconSize='1.35rem'
        playerWidth='320px'
        sliderClass='slider'
        playIcon={play}
        forwardIcon={forward}
        rewindIcon={back}
        pauseIcon={pause}
        volumeIcon={volume}
        muteIcon={mute}
        hideLoop
      />
    </div>
  )
}

export default AudioComp;
