import React, { Component } from 'react'
import WaveyPlayer from '../components/WaveyPlayer'
import Audio from '../components/Audio'

class MyPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    let waveyPlayer
    let mixLoaded = Object.keys(this.props.mixPlaying).length > 0
    if (mixLoaded) {
      waveyPlayer = <WaveyPlayer
                      size={this.props.size}
                      vibePlaying={this.props.vibePlaying}
                      mixPlaying={this.props.mixPlaying}
                      mixPlayingUser={this.props.mixPlayingUser}
                      playing={this.props.playing}
                    />
    }

    let mute
    if (this.props.mute) {
      mute = <input id="on-off" type="checkbox" name="on-off" className="playback" onClick={this.props.toggleMute}/>
    } else {
      mute = <input checked id="on-off" type="checkbox" name="on-off" className="playback" onClick={this.props.toggleMute}/>
    }

    let repeat
    if (this.props.repeat) {
      repeat = <li className={this.props.size(2, "columns playback")}><i className="fas fa-redo-alt repeat-clicked" onClick={this.props.toggleRepeat}></i></li>
    } else {
      repeat = <li className={this.props.size(2, "columns playback")}><i className="fas fa-redo-alt repeat-unclicked" onClick={this.props.toggleRepeat}></i></li>
    }

    let shuffle
    if (this.props.shuffle) {
      shuffle = <li className={this.props.size(2, "columns playback")}><i className="fas fa-random shuffle-clicked" onClick={this.props.toggleShuffle}></i></li>
    } else {
      shuffle = <li className={this.props.size(2, "columns playback")}><i className="fas fa-random shuffle-unclicked" onClick={this.props.toggleShuffle}></i></li>
    }

    let playPause
    if (this.props.playing) {
      playPause = <i className="far fa-pause-circle" onClick={this.props.playPauseClick}></i>
    } else {
      playPause = <i className="far fa-play-circle" onClick={this.props.playPauseClick}></i>
    }

    return (
      <div className={this.props.size(3, "columns my-player")}>

      <Audio />

        <div className="playback-buttons row small-offset-0 medium-offset-1 large-offset-6">
          <ul className="row text-right">
            {repeat}
            {shuffle}
            <li className={this.props.size(5, "switch round small columns playback")}>
              {mute}
              <label htmlFor="on-off"></label>
            </li>
          </ul>
        </div>

        <div className="row audio-controls">
          <ul className={this.props.size(12, "row")}>
            <li className={this.props.size(1, "columns control playback")}>
              <i className="fas fa-backward" onClick={this.props.skipBack}></i>
            </li>
            <li className={this.props.size(1, "columns control play-icon playback")}>
              {playPause}
            </li>
            <li className={this.props.size(1, "columns control playback")}>
              <i className="fas fa-forward" onClick={this.props.skipAhead}></i>
            </li>
            <li className={this.props.size(5, "columns volume-slider small-offset-1")}>
              <input type="range" value={this.props.volume} className="custom-range" id="customRange1" onChange={this.props.volumeSlide}/>
            </li>
          </ul>
        </div>

        <div className="row">
          <ul className="row">
            <li className={this.props.size(2, "columns now-playing")}>
              Now Playing:
            </li>
            <li className={this.props.size(10, "columns wavey-player")}>
              {waveyPlayer}
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default MyPlayer
//
// <div className="reactions row">
//   <ul className="row" id="index-page-vibe-reactions">
//     <li className="row">
//       <div className="fire columns">
//         <i className="fas fa-fire"></i>
//         <span className="reaction-num">{this.props.vibePlaying.fire}</span>
//       </div>
//     </li>
//
//     <li className="row">
//       <div className="ice columns">
//         <i className="fas fa-snowflake"></i>
//         <span className="reaction-num">{this.props.vibePlaying.ice}</span>
//       </div>
//     </li>
//   </ul>
// </div>
