import React, { Component } from 'react'
import { browserHistory } from 'react-router';
import SearchBar from '../components/SearchBar'
import MyPlayer from '../components/MyPlayer'
import BreadCrumbs from '../components/BreadCrumbs'
import Coverflow from '../components/Coverflow'
import MixSelect from '../components/MixSelect'
import SideBar from '../components/SideBar'
import Hamburger from '../components/Hamburger'

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      vibes: [],
      vibePlaying: {},
      vibeSelect: 0,
      mixPlaying: {},
      mixPlayingUser: null,
      mixSelect: 1,
      playing: false,
      waveSurfer: "",
      volume: 0.5,
      progress: 0,
      mute: false,
      repeat: false,
      shuffle: false
    }
    this.getRandomMix = this.getRandomMix.bind(this)
    this.waveSurferRendered = this.waveSurferRendered.bind(this)
    this.handleKey = this.handleKey.bind(this)
    this.size = this.size.bind(this)

    this.playPauseClick = this.playPauseClick.bind(this)
    this.volumeSlide = this.volumeSlide.bind(this)
    this.skipAhead = this.skipAhead.bind(this)
    this.skipBack = this.skipBack.bind(this)
    this.toggleMute = this.toggleMute.bind(this)
    this.toggleRepeat = this.toggleRepeat.bind(this)
    this.toggleShuffle = this.toggleShuffle.bind(this)
    this.whatIsNext = this.whatIsNext.bind(this)
    this.mixSelectClick = this.mixSelectClick.bind(this)
  }

  componentDidMount() {
   fetch(`/api/v1/vibes`)
    .then(response => response.json())
    .then(body => {
      // let vibeSelect = Math.floor(Math.random() * body.vibes.length + 1)
      let vibeSelect = 1
      this.setState({ vibes: body.vibes,
                      vibeSelect: vibeSelect })
    })
    fetch(`/api/v1/users`)
      .then(response => response.json())
      .then(body => {
        this.setState({ users: body.users })
    })

    document.addEventListener('keydown', this.handleKey)
  }

  getRandomMix() {
    fetch(`/api/v1/vibes/${this.state.vibeSelect}`)
    .then(response => response.json())
    .then(body => {
      let latestMixId = body.vibe.mixes.length - 1
      this.setState({ vibePlaying: body.vibe,
                      mixPlaying: body.vibe.mixes[latestMixId],
                      mixPlayingUser: body.vibe.user })
      })
    }

  size(amt, other = "") {
    return `${other} small-${amt} medium-${amt} large-${amt}`
  }

  waveSurferRendered(waveSurfer) {
    this.setState({ waveSurfer: waveSurfer })
  }

  handleKey(event) {
    // event.preventDefault()
    if (event.keyCode === 32) { this.playPauseClick() }
    if (event.keyCode === 39) { this.skipAhead() }
    if (event.keyCode === 37) { this.skipBack() }
  }

  playPauseClick() {
    this.state.waveSurfer.playPause()
    this.setState({ playing: !this.state.playing})
  }
  volumeSlide(volume) {
    this.state.waveSurfer.setVolume(volume.target.value / 100)
  }
  skipAhead() {
    let currentTime = Math.floor(this.state.waveSurfer.getCurrentTime())
    let duration = Math.floor(this.state.waveSurfer.getDuration())
    if (duration - currentTime <= 5) { this.whatIsNext() }
    this.state.waveSurfer.skipForward(5)
  }
  skipBack() {
    this.state.waveSurfer.skipBackward(5)
  }
  toggleRepeat() {
    this.setState({ repeat: !this.state.repeat })
  }
  toggleShuffle() {
    this.setState({ shuffle: !this.state.shuffle })
  }
  toggleMute() {
    this.state.waveSurfer.toggleMute()
    this.setState({ mute: !this.state.mute })
  }
  whatIsNext() {
    debugger
  }

  mixSelectClick(event) {
    this.setState({ mixSelect: event.target.value,
                    mixPlaying: this.state.vibePlaying.mixes[event.target.value -1] })
    this.playPauseClick()
  }

  render() {
    let vibesRendered = this.state.vibes.length > 0
    let mixRendered = Object.keys(this.state.mixPlaying).length > 0
    if (vibesRendered && !mixRendered ) {
      this.getRandomMix()
    }

    let myPlayer, coverflow
    if (vibesRendered) {
      myPlayer = <MyPlayer
                    vibes={this.state.vibes}
                    vibePlaying={this.state.vibePlaying}
                    vibeSelect={this.state.vibeSelect}
                    mixPlaying={this.state.mixPlaying}
                    mixPlayingUser={this.state.mixPlayingUser}
                    mixSelect={this.state.mixSelect}
                    users={this.state.users}
                    size={this.size}

                    playing={this.state.playing}
                    progress={this.state.progress}
                    mute={this.state.mute}
                    repeat={this.state.repeat}
                    shuffle={this.state.shuffle}

                    playPauseClick={this.playPauseClick}
                    volumeSlide={this.volumeSlide}
                    skipAhead={this.skipAhead}
                    skipBack={this.skipBack}
                    toggleMute={this.toggleMute}
                    toggleRepeat={this.toggleRepeat}
                    toggleShuffle={this.toggleShuffle}
                    whatIsNext={this.whatIsNext}
                  />
      coverflow = <Coverflow
                    size={this.size}
                    vibes={this.state.vibes}
                  />
    }

    let mixSelect, mixInfo, buttonLink
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
    }

    let waveform = document.getElementById("waveform")
    let waveformDivRendered = waveform != null
    let waveformRendered = false
    if (waveformDivRendered) {
      waveformRendered = waveform.children.length > 0
    }
    if (mixRendered && waveformDivRendered
                    && !waveformRendered) {
      let waveSurfer = WaveSurfer.create({
          container: '#waveform',
          waveColor: '#4300ff',
          progressColor: '#00ffff',
          backend: 'MediaElement',
          barWidth: 1,
          scrollParent: false,
          hideScrollbar: true,
          autoCenter:	true,
          barHeight: 1,
          normalize: true,
          interact: true,
          loopSelection: true,
          responsive: true,
          cursorColor: '#00ffc7',
          audioprocess: {}
        })
      waveSurfer.load(this.state.mixPlaying.audio_file.url)
      waveSurfer.setVolume(0.5)
      this.waveSurferRendered(waveSurfer)
    }

    if (waveformRendered) {
      this.state.waveSurfer.on('finish', function() {
        this.whatIsNext()
      }.bind(this))
    }

    return(
      <div className={this.size(12, "row")} id="index-page-container">
        <div className={this.size(9, "columns")} id="index-page-left">
          <div className={this.size(12, "row")} id="index-page-left-top">
            <div className={this.size(3, "columns")}>
              <h1 className="kreon large-offset-1" id="vibro-logo">ViBRO</h1>
              <p className="small-offset-0 medium-offset-2 large-offset-3" id="vibe-bro">do you feel my vibe, bro?</p>
              <BreadCrumbs/>
            </div>
            <div className={this.size(6, "columns text-center")} id="waviest-vibes">
              <h1 className="kreon">welcome.</h1>
              <h2 className="kreon">here are today&#39;s waviest vibes.</h2>
            </div>
            {myPlayer}
          </div>

          <div className={this.size(9, "row offset-2")} id="index-page-left-middle-high">
            {coverflow}
          </div>

          <div className={this.size(9, "row")} id="index-page-left-middle-low">
            <ul className="row">

              <li className={this.size(4, "columns")}>
                <img id="swirl-left" src="http://www.clker.com/cliparts/H/T/1/n/4/n/a-purple-purple-swirl-2-hi.png"/>
              </li>

              <li className={this.size(4, "columns")}>
                <ul className="columns">
                	<li className="row">{mixSelect}</li>
                  <li className="row">
                    <div className={this.size(12, "row")} id="mix-blurb-container">
                    {mixInfo}
                    </div>
                  </li>
                  <li className="row">
                    <div className={this.size(12, "row")} id="mix-button-container">
                      <button href={buttonLink} id="mix-button">help finish this vibe</button>
                    </div>
                  </li>
                </ul>
              </li>

              <li className={this.size(4, "columns")}>
                <img id="swirl-right" src="http://www.clipartable.com/images/22/waudYMX4.png"/>
              </li>

            </ul>
          </div>

          <div className={this.size(9, "columns")} id="index-page-left-bottom">
            <div id="waveform"/>
          </div>
        </div>

        <div className={this.size(3, "columns")} id="index-page-right">
          <div className={this.size(3, "row search-bar-container")}>
            <ul className={this.size(12, "columns top-right-ul")}>
              <li className={this.size(8, "columns top-right-elements")}>
                <SearchBar
                  vibes={this.state.vibes}
                  users={this.state.users}
                />
              </li>
              <li className={this.size(4, "columns top-right-elements")}>
                <Hamburger />
              </li>
            </ul>
          </div>

          <div className={this.size(12, "columns side-bar-container")}>
            <SideBar/>
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
//       small 12
//       small 12
//     end
//   end
//   div class small 3 columns
//     div class row
//       div small 12
//       div small 12
//     end
//   end
// end

// <li className="row">
//   <div className={this.size(12, "row")} id="mix-description-container">
//     {mixDesc}
//   </div>
// </li>

// <i className="fa fa-question-circle" id="mix-question-mark"></i>
