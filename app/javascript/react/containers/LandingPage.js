import React, { Component } from 'react'
import { browserHistory } from 'react-router';
import SearchBar from '../components/SearchBar'
import MyPlayer from '../components/MyPlayer'
import Coverflow from '../components/Coverflow'
import MixSelect from '../components/MixSelect'
import SideBar from '../components/SideBar'
import Hamburger from '../components/Hamburger'
import AudioVisualizer from '../components/AudioVisualizer'
import WaveyPlayer from '../components/WaveyPlayer'
import Waveform from '../components/Waveform'
import IdeaSummary from '../components/IdeaSummary'
import tippy from 'tippy.js'


class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      vibes: [],
      ideas: [],
      vibePlaying: {},
      vibeSelect: 0,
      mixPlaying: {},
      mixPlayingIdeas: [],
      mixSelect: 1,
      artist: null,
      playing: false,
      waveSurfer: "",
      volume: 1,
      progress: 0,
      repeat: false,
      shuffle: false,
      ideaOpen: false,
      idea: {}
    }
    this.fetchVibe = this.fetchVibe.bind(this)
    this.waveSurferRendered = this.waveSurferRendered.bind(this)
    this.handleKey = this.handleKey.bind(this)
    this.size = this.size.bind(this)
    this.playPauseClick = this.playPauseClick.bind(this)
    this.volumeSlide = this.volumeSlide.bind(this)
    this.skipAhead = this.skipAhead.bind(this)
    this.skipBack = this.skipBack.bind(this)
    this.toggleRepeat = this.toggleRepeat.bind(this)
    this.toggleShuffle = this.toggleShuffle.bind(this)
    this.whatIsNext = this.whatIsNext.bind(this)
    this.mixSelectClick = this.mixSelectClick.bind(this)
    this.changePlaying = this.changePlaying.bind(this)
    this.openCloseIdea = this.openCloseIdea.bind(this)
  }

  componentDidMount() {
   fetch(`/api/v1/vibes`)
    .then(response => response.json())
    .then(body => {
      let vibeSelect = Math.floor(Math.random() * body.vibes.length + 1)
      this.setState({ vibes: body.vibes,
                      vibeSelect: vibeSelect })
    })
    fetch(`/api/v1/ideas`)
      .then(response => response.json())
      .then(body => {
        this.setState({ ideas: body })
    })
    fetch(`/api/v1/users`)
      .then(response => response.json())
      .then(body => {
        this.setState({ users: body.users })
    })

    document.addEventListener('keydown', this.handleKey)
  }

  fetchVibe(vibeSelect) {
    fetch(`/api/v1/vibes/${vibeSelect}`)
    .then(response => response.json())
    .then(body => {
      let vibe = body.vibe
      let latestMixId = vibe.mixes.length - 1
      let latestMix = vibe.mixes[latestMixId]
      if (this.state.waveSurfer != "") {
        this.changePlaying(vibe, latestMix)
      } else {
        this.setState({ vibePlaying: body.vibe,
                        mixSelect: latestMixId + 1,
                        mixPlaying: latestMix,
                        artist: body.vibe.user,
                        mixPlayingIdeas: latestMix.ideas })
      }
    })
  }

  size(amt, other = "") {
    return `${other} small-${amt} medium-${amt} large-${amt}`
  }

  waveSurferRendered(waveSurfer) {
    this.setState({ waveSurfer: waveSurfer })
  }

  handleKey(event) {
    if (event.keyCode === 32) { this.playPauseClick() }
    if (event.keyCode === 39) { this.skipAhead() }
    if (event.keyCode === 37) { this.skipBack() }
  }

  changePlaying(vibe, mix) {
    this.state.waveSurfer.empty()
    this.state.waveSurfer.load(mix.audio_file.url)
    this.state.waveSurfer.play()
    this.setState({ vibePlaying: vibe,
                    vibeSelect: vibe.id,
                    mixPlaying: mix,
                    mixPlayingIdeas: mix.ideas,
                    mixSelect: mix.number,
                    artist: vibe.user,
                    playing: true })
  }

  mixSelectClick(event) {
    let newMixPlaying = this.state.vibePlaying.mixes[event.target.value - 1]
    this.changePlaying(this.state.vibePlaying, newMixPlaying)
  }

  playPauseClick(event = "") {
    let currentVibeId, vibeId = currentVibeId = this.state.vibePlaying.id
    if (event != "" && event.keyCode != 32) {
      let divClass = event.target.parentElement.parentElement.parentElement.classList[0]
      if (divClass != "playback-buttons") { vibeId = event.target.parentElement.parentElement.id }
    }
    if (vibeId != currentVibeId) {
      let vibe = this.fetchVibe(vibeId)
      this.changePlaying(vibe)
    } else {
      this.state.waveSurfer.playPause()
      this.setState({ playing: !this.state.playing})
    }
  }

  volumeSlide(volume) {
    this.state.waveSurfer.setVolume(volume.target.value / 100)
  }
  skipAhead() {
    event.preventDefault()
    let currentTime = Math.floor(this.state.waveSurfer.getCurrentTime())
    let duration = Math.floor(this.state.waveSurfer.getDuration())
    if (duration - currentTime <= 5) {
      this.whatIsNext()
    } else {
      this.state.waveSurfer.skipForward(5)
    }
  }
  skipBack() {
    event.preventDefault()
    this.state.waveSurfer.skipBackward(5)
  }
  toggleRepeat() {
    this.setState({ repeat: !this.state.repeat })
  }
  toggleShuffle() {
    this.setState({ shuffle: !this.state.shuffle })
  }
  whatIsNext() {
    if (this.state.repeat) {
      this.changePlaying(this.state.vibePlaying, this.state.mixPlaying)
    } else {
      if (this.state.shuffle) {
        let vibeSelect = Math.floor(Math.random() * this.state.vibes.length)
        let newVibePlaying = this.state.vibes[vibeSelect]
        let newMixPlaying = newVibePlaying.mixes[newVibePlaying.mixes.length - 1]
        this.changePlaying(newVibePlaying, newMixPlaying)
      } else {
        if (this.state.vibePlaying.mixes.length === this.state.mixPlaying.number) {
          if (this.state.vibeSelect === this.state.vibes.length) {
            let firstVibe = this.state.vibes[0]
            let firstVibeLatestMix = firstVibe.mixes[firstVibe.mixes.length - 1]
            this.changePlaying(firstVibe, firstVibeLatestMix)
          } else {
            let newVibePlaying = this.state.vibes[this.state.vibePlaying.id]
            let newMixPlaying = newVibePlaying.mixes[newVibePlaying.mixes.length - 1]
            this.changePlaying(newVibePlaying, newMixPlaying)
          }
        } else {
          let newMixPlaying = this.state.vibePlaying.mixes[this.state.mixPlaying.number]
          this.changePlaying(this.state.vibePlaying, newMixPlaying)
        }
      }
    }
  }

  openCloseIdea(event) {
    if (event != undefined) {
      let ideaClass = event.target.classList[3]
      let ideaId = ideaClass.slice(ideaClass.length - 1)
      this.setState({ idea: this.state.ideas[ideaId - 1],
                      ideaOpen: !this.state.ideaOpen})
    } else {
      this.setState({ ideaOpen: false })
    }
  }

  render() {
    let vibesRendered = this.state.vibes.length > 0
    let mixRendered = Object.keys(this.state.mixPlaying).length > 0
    if (vibesRendered && !mixRendered ) {
      this.fetchVibe(this.state.vibeSelect)
    }

    let myPlayer, coverflow
    if (vibesRendered) {
      myPlayer = <MyPlayer
                    vibes={this.state.vibes}
                    vibePlaying={this.state.vibePlaying}
                    vibeSelect={this.state.vibeSelect}
                    mixPlaying={this.state.mixPlaying}
                    artist={this.state.artist}
                    mixSelect={this.state.mixSelect}
                    currentUser={this.state.currentUser}
                    users={this.state.users}
                    size={this.size}
                    playing={this.state.playing}
                    progress={this.state.progress}
                    repeat={this.state.repeat}
                    shuffle={this.state.shuffle}
                    playPauseClick={this.playPauseClick}
                    volumeSlide={this.volumeSlide}
                    skipAhead={this.skipAhead}
                    skipBack={this.skipBack}
                    toggleRepeat={this.toggleRepeat}
                    toggleShuffle={this.toggleShuffle}
                    whatIsNext={this.whatIsNext}
                  />
      coverflow = <Coverflow
                    vibeSelect={this.state.vibeSelect}
                    vibePlaying={this.state.vibePlaying}
                    waveSurfer={this.state.waveSurfer}
                    playPauseClick={this.playPauseClick}
                    playing={this.state.playing}
                    size={this.size}
                    vibes={this.state.vibes}
                  />
    }

    let ideas = ""
    let mixSelect, mixInfo, waveyPlayer, buttonLink
    if (mixRendered) {
      mixSelect = <MixSelect
                    size={this.size}
                    vibePlaying={this.state.vibePlaying}
                    mixPlaying={this.state.mixPlaying}
                    mixSelect={this.state.mixSelect}
                    mixSelectClick={this.mixSelectClick}
                  />
      mixInfo = this.state.mixPlaying.blurb
      buttonLink = `/vibes/${this.state.vibePlaying.id}`
      waveyPlayer = <WaveyPlayer
                      size={this.size}
                      vibePlaying={this.state.vibePlaying}
                      mixPlaying={this.state.mixPlaying}
                      artist={this.state.artist}
                      playing={this.state.playing}
                    />

      ideas = this.state.mixPlayingIdeas.map( idea => {
        const waveformLength = 88
        let CSSclass = `far fa-lightbulb idea-icon idea-${idea.id}`
        let left = idea.time / this.state.mixPlaying.runtime * waveformLength
        return  <i className={CSSclass}
                       key={idea.id}
                       onClick={this.openCloseIdea} >
                  <style dangerouslySetInnerHTML={{__html: `
                    .idea-${idea.id} { left: ${left}rem; }
                  `}} />
                </i>
        }, this)
    }

    let visualizer, url = visualizer = ""
    let waveform = document.getElementById("waveform")
    let waveformDivRendered = waveform != null
    let waveformRendered = false
    if (waveformDivRendered) { waveformRendered = waveform.children.length > 0 }

    if (mixRendered && waveformDivRendered
                    && !waveformRendered) {
      waveform = <Waveform
                    mixPlaying={this.state.mixPlaying}
                    waveSurferRendered={this.waveSurferRendered}
                  />
    }

    if (waveformRendered) {
      this.state.waveSurfer.on('finish', function() {
        this.whatIsNext()
      }.bind(this))
    }

    let ideaSummary = <IdeaSummary
                        idea={this.state.idea}
                        ideaOpen={this.state.ideaOpen}
                        users={this.state.users}
                        currentUser={this.state.currentUser}
                        openCloseIdea={this.openCloseIdea}
                      />
    return(
      <div className="row" id="index-page-container">
        <div className={this.size(12, "columns")} id="index-page-left">
          <div className="row" id="index-page-left-top">
            <div className={this.size(3, "columns")}>
              <h1 className="kreon large-offset-1" id="vibro-logo">ViBRO</h1>
              <p className="small-offset-0 medium-offset-2 large-offset-3" id="vibe-bro">by Angelus Productions</p>
            </div>
            <div className={this.size(5, "columns text-center")}>
            <div className="row" id="top-bar-middle">
              <ul className="row">
                <li className={this.size(2, "columns now-playing")}>
                  Now Playing:
                </li>
                <li className={this.size(10, "columns wavey-player")}>
                  {waveyPlayer}
                </li>
              </ul>
            </div>
            </div>
            {myPlayer}
          </div>

          <div className="row offset-2" id="index-page-left-middle-high">
            {coverflow}
          </div>

          <div className="row" id="index-page-left-middle-low">
            <ul className="row">

              <li className={this.size(4, "columns")}>
                <img id="swirl-left" src="http://www.clker.com/cliparts/H/T/1/n/4/n/a-purple-purple-swirl-2-hi.png"/>
              </li>

              <li className={this.size(4, "columns")}>
                <ul className="columns mix-info">
                	<li className="row">{mixSelect}</li>
                  <li className="row">
                    <div className="row" id="mix-blurb-container">

                    </div>
                  </li>
                  <li className="row">
                    <div className="row" id="mix-button-container">
                    </div>
                  </li>
                </ul>
              </li>

              <li className={this.size(4, "columns")}>
                <img id="swirl-right" src="http://www.clipartable.com/images/22/waudYMX4.png"/>
              </li>

            </ul>
          </div>

          <div className={this.size(12, "columns")} id="index-page-left-bottom-top">
            <img className="new-idea" id="drag-new-idea" src="https://cdn0.iconfinder.com/data/icons/finance-1-2/97/35-512.png" />
            {ideas}
            {ideaSummary}
          </div>

          <div className={this.size(12, "columns")} id="index-page-left-bottom-bottom">
            <div id="waveform"/>
            {waveform}
          </div>
        </div>

      </div>
    );
  }
};

export default LandingPage;

//
// div class row
//   div class small 9 columns
//     div class row
//       div small 3 columns
//       div small 6
//       small 3
//     div class row
//       small 12
//     div class row
//       small 12
//     end
//   end
//   div class small 3 columns
//     div class row
//       div small 12
//     div class row
//       div small 12
//     end
//   end
// end

// <li className="row">
//   <div className="row" id="mix-description-container">
//     {mixDesc}
//   </div>
// </li>

// <i className="fa fa-question-circle" id="mix-question-mark"></i>

// <BreadCrumbs/>

// <h1 className="kreon">welcome.</h1>
// <h2 className="kreon">here are today&#39;s waviest vibes.</h2>

// http://www.clker.com/cliparts/H/T/1/n/4/n/a-purple-purple-swirl-2-hi.png
// http://www.clipartable.com/images/22/waudYMX4.png
// <h1 className="construction">UNDER CONSTRUCTION</h1>

        //
        // <div className={this.size(3, "columns")} id="index-page-right">
        //   <div className="row search-bar-container">
        //     <ul className={this.size(12, "columns top-right-ul")}>
        //       <li className={this.size(8, "columns top-right-elements")}>
        //         <SearchBar
        //           vibes={this.state.vibes}
        //           users={this.state.users}
        //         />
        //       </li>
        //       <li className={this.size(4, "columns top-right-elements")}>
        //         <Hamburger />
        //       </li>
        //     </ul>
        //   </div>
        //
        //   <div className={this.size(12, "columns side-bar-container")}>
        //     <SideBar/>
        //   </div>
        // </div>

        // <button href={buttonLink} id="mix-button">help finish this vibe</button>

// {mixInfo}
