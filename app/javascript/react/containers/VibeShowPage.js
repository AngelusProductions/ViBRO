import React, { Component } from 'react'
import Waveform from '../components/Waveform'

class VibeShowPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vibe: {},
      mixes: [],
      ideas: [],
      mixPlaying: {},
      currentUser: {},
      waveSurfer: {},
      playing: false
    }
    this.size = this.size.bind(this)
    this.waveSurferRendered = this.waveSurferRendered.bind(this)
    this.playPauseClick = this.playPauseClick.bind(this)
    this.expandIdea = this.expandIdea.bind(this)
  }

  componentDidMount() {
    fetch(`/api/v1/vibes/${this.props.params.id}`)
     .then(response => response.json())
     .then(body => {
       let vibe = body.vibe
       let mixes = vibe.mixes
       let mixPlaying = mixes[mixes.length - 1]
       this.setState({ vibe: vibe,
                       mixes: mixes,
                       mixPlaying: mixPlaying,
                       ideas: mixPlaying.ideas })})
     fetch(`/api/v1/current_user`)
       .then(response => response.json())
       .then(body => { if (body) { this.setState({ currentUser: body.user })}})
  }

  size(amt, other = "") {
    return `${other} small-${amt} medium-${amt} large-${amt}`
  }

  waveSurferRendered(waveSurfer) {
    this.setState({ waveSurfer: waveSurfer })
  }

  playPauseClick(event = "") {
    this.state.waveSurfer.playPause()
    this.setState({ playing: !this.state.playing})
  }

  expandIdea(event) {
    debugger
  }

  render() {
    let vibe, mixPlaying, artist, ideas, playerClass = ideas = artist = mixPlaying = vibe = ""
    let mixRendered = Object.keys(this.state.mixPlaying).length > 0
    let waveform = document.getElementById("waveform")
    let waveformDivRendered = waveform != null
    let waveformRendered = false
    if (waveformDivRendered) { waveformRendered = waveform.children.length > 0 }

    if (mixRendered && !waveformRendered) {
      vibe = this.state.vibe
      mixPlaying = this.state.mixPlaying
      artist = this.state.vibe.user
      ideas = this.state.ideas
      waveform = <Waveform
                    mixPlaying={this.state.mixPlaying}
                    waveSurferRendered={this.waveSurferRendered}
                 />
      let ideas = this.state.ideas.map( idea => {
        const waveformLength = 20
        let CSSclass = `far fa-lightbulb idea-icon idea-${idea.id}`
        let left = idea.time / this.state.mix.runtime * waveformLength
        return  <i className={CSSclass}
                       key={idea.id}
                       onClick={this.expandIdea}
                       data-tippy-content={ideaTitle}
                    >
                  <style dangerouslySetInnerHTML={{__html: `
                    .idea-${idea.id} { left: -${left}rem; }
                  `}} />
                </i>
        }, this)
    }

    if (this.state.playing) { playerClass = "playing" }

    return (
      <div className={this.size(12)}>

        <div className={this.size(12, "row")}>
          <div className={this.size(3, "columns")}>
            <h1 className="large-offset-1" id="vibro-logo">{vibe.name}</h1>
            <p className="small-offset-0 medium-offset-2 large-offset-3" id="vibe-bro">by {artist.username}</p>
          </div>
          <div className={this.size(9, "show-waveform columns")} id="waveform"/>
            <div className={this.size(12, "show-waveform row")} id="waveform"/>{waveform}
            <div className={this.size(12, "row")}>
              {ideas}
              <img className="new-idea" src="https://cdn0.iconfinder.com/data/icons/finance-1-2/97/35-512.png" />
            </div>

        </div>

        <div className={this.size(12, "row")}>
          <div className={this.size(10, "columns small-offset-0 large-offset-2")}>

          </div>
        </div>

        <div className={this.size(12, "row")}>
          <div className={this.size(4, "columns")} />
          <div className={this.size(4, "player-column columns")}>
            <div className={`player-div ${playerClass}`}>
              <div className={`spinner-outer ${playerClass}`}/>
            </div>
          </div>
          <div className={this.size(4, "columns")} />
        </div>

      </div>
    )
  }
}

export default VibeShowPage

// <div className={`spinner-center ${playerClass}`}></div>
// <div className={`play-sprite ${playerClass}`} onClick={this.playPauseClick}></div>
