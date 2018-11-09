import React from 'react';
import Mix from './Mix'
import AudioVisualizer from '../components/AudioVisualizer'
import Progress from '../components/Progress'

const AudioPlayer = ( props => {

  let url = ""
  let playerClass = "";

  if (props.audioPlayerShow) {
    url = props.mix.audio_file.url
  }

  if (props.playing) {
    playerClass = "playing"
  } else {
    playerClass = ""
  }

 return(
   <div className="player small-12">
    <div className={`player-div small-4 left ${playerClass}`} >
      <div className={`spinner-outer ${playerClass}`}></div>
      <div className={`spinner-center ${playerClass}`}></div>
      <div className={`play-sprite ${playerClass}`} onClick={props.handlePlayClick}></div>

      <audio
       src={url}
       id="vibe-player"
       className={playerClass}
       loop="loop"
       crossOrigin="anonymous"
      ></audio>

      <Progress
        mix={props.mix}
        show={props.progressShow}
        playing={props.playing}
        runtime={props.runtime}
      />

      <AudioVisualizer />

    </div>

      <Mix
        mix={props.mix}
        mixes={props.mixes}
        vibe={props.vibe}
        handleMixClick={props.handleMixClick}
        handleNewMixClick={props.handleNewMixClick}
        handleNewMixAdded={props.handleNewMixAdded}
        newMixShow={props.newMixShow}
      />
   </div>
 )
})

export default AudioPlayer;
