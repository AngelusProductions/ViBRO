import React, { Component } from 'react';
import ProgressBar from 'progressbar.js'
import Mix from './Mix'
import Audio from './Audio'
import NewIdeaModal from './NewIdeaModal'
import tippy from 'tippy.js'
import Popup from 'reactjs-popup'

class AudioPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clickedIdea: null,
      hoveredIdea: null,
      ideaSummaryShow: false,
      ideaPreviewShow: false
    }
    this.handleIdeaIconClick = this.handleIdeaIconClick.bind(this)
  }

  handleIdeaIconClick(event) {
    let ideaString = event.target.classList[3].split("")
    let ideaIdString = ideaString.slice(5).join("")
    let ideaId = parseInt(ideaIdString) - 1
    let idea = this.props.ideas[ideaId]
    this.setState({ clickedIdeaId: ideaId})
  }

  render() {
    let url = ""
    let playerClass = ""
    let newIdeaModal = ""
    let progressBar = this.props.progressBar
    const player = document.getElementsByTagName("audio")[0]
    const highestREM = 28.5

    if (this.props.audioPlayerShow) {
      url = this.props.mix.audio_file.url
    }

    if (this.props.playing) {
      playerClass = "playing"
    } else {
      playerClass = ""
    }

    if (this.props.afterFetch
    && !this.props.progressBarCreated) {
        progressBar = new ProgressBar.Line(container, {
        strokeWidth: 100,
        progress: 0,
        trailColor: '#e6e6ff',
        trailWidth: 100,
        svgStyle: {width: '200%', height: '250%'}
      })
      this.props.handleProgressBarCreated(progressBar)
    }

    if (this.props.playing
     && this.props.progressBarCreated
    && !this.props.progressBarDestroyed) {
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
    this.props.handleProgressBarDestroyed(progressBar)
  } else if (this.props.playing
            && this.props.progressBarCreated
            && this.props.progressBarDestroyed) {
      progressBar.animate(1)
    } else if (!this.props.playing
            && this.props.progressBarCreated
            && this.props.progressBarDestroyed) {
      progressBar.stop()
    }

    if (this.props.newIdeaModalShow) {
      newIdeaModal = <NewIdeaModal
                        mix={this.props.mix}
                        mixNum={this.props.mixNum}
                        vibe={this.props.vibe}
                        handleNewIdeaModalOpen={this.props.handleNewIdeaModalOpen}
                        handleNewIdeaModalClose={this.props.handleNewIdeaModalClose}
                        handleNewIdeaFormSubmit={this.props.handleNewIdeaFormSubmit}
                        newIdeaClickProgressPercent={this.props.newIdeaClickProgressPercent}
                        handleNewIdeaAdded={this.props.handleNewIdeaAdded}
                      />
    } else {
      newIdeaModal = ""
    }

    let ideaIcons = this.props.ideas.map( idea => {
      let marginLeft = idea.time / this.props.mix.runtime * highestREM
      let CSSclass = `far fa-lightbulb idea-icon idea-${idea.id}`
      let ideaTitle = idea.title
      if (idea.mix_id === this.props.mix.id) {
        return  <i className={CSSclass}
                       key={idea.id}
                       onClick={this.handleIdeaIconClick}
                       data-tippy-content={ideaTitle}
                    >
                  <style dangerouslySetInnerHTML={{__html: `
                    .idea-${idea.id} { margin-left: ${marginLeft}rem; }
                  `}} />
                </i>
        }

    }, this)

    tippy('.idea-icon', {
      size: "large",
      animation: "shift-away",
      duration: 100,
      delay: [0, 1000],
      hideOnClick: true,
      inertia: true,
      theme: 'light-border',
      arrow: true,
      arrowType: 'sharp',
      animateFill: true,
      flipBehavior: ["bottom", "left"],
      distance: 10000,
      followCursor: false,
      interactiveDebounce: 500,
      placement: "right",
      offset: 0,
      hideOnClick: true,
      interactiveBorder: 5
    })

   return(
     <div className="player small-12">
      <div className={`player-div small-4 left ${playerClass}`} >
        <div className={`spinner-outer ${playerClass}`}></div>
        <div className={`spinner-center ${playerClass}`}></div>
        <div className={`play-sprite ${playerClass}`}
             onClick={this.props.handlePlayClick}>
        </div>

        <Audio
          playerClass={playerClass}
          url={url}
        />

          <div id="container" onClick={this.props.handleNewIdeaClick}>
            {ideaIcons}
          </div>
          <i className="fas fa-mouse-pointer"></i>
          <div className="click-me">CLiCK to add your idea!</div>

      </div>

        <Mix
          mix={this.props.mix}
          mixes={this.props.mixes}
          vibe={this.props.vibe}
          handleMixClick={this.props.handleMixClick}
          handleNewMixClick={this.props.handleNewMixClick}
          handleNewMixAdded={this.props.handleNewMixAdded}
          newMixShow={this.props.newMixShow}
          newMixButtonShow={this.props.newMixButtonShow}
          currentUser={this.props.currentUser}
        />

        {newIdeaModal}

     </div>
   )
 }
}

export default AudioPlayer;
