import React, { Component } from 'react'
import { browserHistory } from 'react-router';
import SearchBar from '../components/SearchBar'
import MyPlayer from '../components/MyPlayer'
import BreadCrumbs from '../components/BreadCrumbs'
import Coverflow from '../components/Coverflow'
import SideBar from '../components/SideBar'

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
      playing: false
    }
    this.size = this.size.bind(this)
    this.getRandomMix = this.getRandomMix.bind(this)
    this.handleMiniPlayClick = this.handleMiniPlayClick.bind(this)
  }

  componentDidMount() {
   fetch(`/api/v1/vibes`)
    .then(response => response.json())
    .then(body => {
      let vibeSelect = Math.floor(Math.random() * body.vibes.length + 1)
      this.setState({ vibes: body.vibes,
                      vibeSelect: vibeSelect })
    })
    fetch(`/api/v1/users`)
      .then(response => response.json())
      .then(body => {
        this.setState({ users: body.users })
    })
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

  handleMiniPlayClick() {
    this.setState({ playing: true })
  }

  render() {
    let vibesLoaded = this.state.vibes.length > 0
    let mixLoaded = Object.keys(this.state.mixPlaying).length > 0
    if (vibesLoaded && !mixLoaded ) {
      this.getRandomMix()
    }

    let myPlayer, coverflow
    if (vibesLoaded) {
      myPlayer = <MyPlayer
                    vibes={this.state.vibes}
                    vibePlaying={this.state.vibePlaying}
                    vibeSelect={this.state.vibeSelect}
                    mixPlaying={this.state.mixPlaying}
                    mixPlayingUser={this.state.mixPlayingUser}
                    mixSelect={this.state.mixSelect}
                    handleMiniPlayClick={this.handleMiniPlayClick}
                    users={this.state.users}
                    size={this.size}
                  />
      coverflow = <Coverflow
                    size={this.size}
                    vibes={this.state.vibes}
                  />
    }

    let waveyPlayer
    if (mixLoaded) {
      var waveSurfer = WaveSurfer.create({
                        container: '#waveform',
                        waveColor: '#B6C6FE',
                        progressColor: '#A3E2F7',
                        backend: 'MediaElement',
                        scrollParent: false,
                        hideScrollbar: true,
                        autoCenter:	true,
                        barHeight: 1,
                        normalize: true,
                        interact: true,
                        loopSelection: true,
                        responsive: true
                      })
      waveSurfer.load(this.state.mixPlaying.audio_file.url)
    }

    return(
      <div className={this.size(12, "row")} id="index-page-container">
        <div className={this.size(9, "columns")} id="index-page-left">
          <div className={this.size(12, "row")} id="index-page-left-top">
            <div className={this.size(3, "columns")}>
              <h1 className="kreon large-offset-1" id="vibro-logo">ViBRO</h1>
              <p className="small-offset-0 medium-offset-2 large-offset-3" id="vibe-bro">do you feel my vibe, bro?</p>
              <BreadCrumbs />
            </div>
            <div className={this.size(6, "columns text-center")} id="waviest-vibes">
              <h1 className="kreon">welcome.</h1>
              <h2 className="kreon">here are today&#39;s waviest vibes.</h2>
            </div>
            {myPlayer}
          </div>

          <div className={this.size(9, "row offset-2")} id="index-page-left-middle">
            {coverflow}
          </div>

          <div className={this.size(9, "columns")} id="index-page-left-bottom">
            <div id="waveform">
            </div>
          </div>
        </div>

        <div className={this.size(3, "columns")} id="index-page-right">
          <div className={this.size(3, "row search-bar-container")}>
            <SearchBar
              vibes={this.state.vibes}
              users={this.state.users}
            />
          </div>

          <div className={this.size(12, "columns side-bar-container")}>
            <SideBar

            />
          </div>
        </div>
      </div>
    );
  }
};

export default LandingPage;