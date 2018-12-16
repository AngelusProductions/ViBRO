import React from 'react';
import ProgressBar from 'progressbar.js'
import Mix from './Mix'
import NewIdeaModal from './NewIdeaModal'

const AudioPlayer = ( props => {

  let url = ""
  let playerClass = ""
  let newIdeaModal = ""
  let progressBar = props.progressBar
  let player = document.getElementsByTagName("audio")[0]

  if (props.audioPlayerShow) {
    url = props.mix.audio_file.url
  }

  if (props.playing) {
    playerClass = "playing"
  } else {
    playerClass = ""
  }

  if (props.afterFetch
  && !props.progressBarCreated) {
      progressBar = new ProgressBar.Line(container, {
      strokeWidth: 100,
      progress: 0,
      trailColor: '#e6e6ff',
      trailWidth: 100,
      svgStyle: {width: '200%', height: '250%'},
    })
    props.handleProgressBarCreated(progressBar)
  }

  if (props.playing
   && props.progressBarCreated
  && !props.progressBarDestroyed) {
    progressBar.destroy()
    progressBar = new ProgressBar.Line(container, {
    strokeWidth: 100,
    progress: 0,
    duration: player.duration * 1000,
    color: '#476cff',
    trailColor: '#e6e6ff',
    trailWidth: 100,
    svgStyle: {width: '200%', height: '250%'},
    from: {color: '#80ffbf'},
    to: {color: '#476cff'},
    step: (state, bar) => {
      bar.path.setAttribute('stroke', state.color);
    }
  })
  props.handleProgressBarDestroyed(progressBar)
  } else if (props.playing
          && props.progressBarCreated
          && props.progressBarDestroyed) {
    progressBar.animate(1)
  } else if (!props.playing
          && props.progressBarCreated
          && props.progressBarDestroyed) {
    progressBar.stop()
  }

  if (props.newIdeaModalShow) {
    newIdeaModal = <NewIdeaModal
                      mix={props.mix}
                      mixNum={props.mixNum}
                      vibe={props.vibe}
                      handleNewIdeaModalOpen={props.handleNewIdeaModalOpen}
                      handleNewIdeaModalClose={props.handleNewIdeaModalClose}
                      handleNewIdeaFormSubmit={props.handleNewIdeaFormSubmit}
                      newIdeaClickProgressPercent={props.newIdeaClickProgressPercent}
                      handleNewIdeaAdded={props.handleNewIdeaAdded}
                    />
  } else {
    newIdeaModal = ""
  }

 return(
   <div className="player small-12">
    <div className={`player-div small-4 left ${playerClass}`} >
      <div className={`spinner-outer ${playerClass}`}></div>
      <div className={`spinner-center ${playerClass}`}></div>
      <div className={`play-sprite ${playerClass}`}
           onClick={props.handlePlayClick}>
      </div>

      <audio
       src={url}
       id="vibe-player"
       className={playerClass}
       loop="loop"
       crossOrigin="anonymous"
      ></audio>

      <div id="container" onClick={props.handleNewIdeaClick}></div>
      <i className="fas fa-mouse-pointer"></i>
      <div className="click-me">CLiCK to add your idea!</div>

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

      {newIdeaModal}

   </div>
 )
})

export default AudioPlayer;
