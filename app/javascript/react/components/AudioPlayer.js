import React from 'react';
import Mix from './Mix'

const AudioPlayer = ( props => {
  let mixNum = props.mix
  let mix = props.vibe.mixes[mixNum - 1]
  let playerClass = "";

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

     <audio src={mix.audio_file.url} id="vibe-player" className={playerClass} loop="loop"></audio>

   </div>

     <Mix
       mix={mix}
       mixes={props.mixes}
       vibe={props.vibe}
       handleMixClick={props.handleMixClick}
       handleNewMixClick={props.handleNewMixClick}
       newMixShow={props.newMixShow}
     />

  </div>
 )
})

export default AudioPlayer;
