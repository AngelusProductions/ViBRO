import React, { Component } from 'react'
import WaveyPlayer from '../components/WaveyPlayer'
import Hamburger from '../components/Hamburger'

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
                      artist={this.props.artist}
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
      repeat = <li className={this.props.size(12, "next-icon row")}><i className="fas fa-redo-alt repeat-clicked" onClick={this.props.toggleRepeat}></i></li>
    } else {
      repeat = <li className={this.props.size(12, "next-icon row")}><i className="fas fa-redo-alt repeat-unclicked" onClick={this.props.toggleRepeat}></i></li>
    }

    let shuffle
    if (this.props.shuffle) {
      shuffle = <li className={this.props.size(12, "next-icon row")}><i className="fas fa-random shuffle-clicked" onClick={this.props.toggleShuffle}></i></li>
    } else {
      shuffle = <li className={this.props.size(12, "next-icon row")}><i className="fas fa-random shuffle-unclicked" onClick={this.props.toggleShuffle}></i></li>
    }

    let playPause
    if (this.props.playing) {
      playPause = <i className="far fa-pause-circle" onClick={this.props.playPauseClick}></i>
    } else {
      playPause = <i className="far fa-play-circle" onClick={this.props.playPauseClick}></i>
    }

    return (
      <div className={this.props.size(4, "columns my-player")}>
          <ul className={this.props.size(12, "row")}>

            <li className={this.props.size(1, "columns")}>
              <ul className={this.props.size(12, "columns what-is-next")}>
                {repeat}
                {shuffle}
              </ul>
            </li>

              <div className="playback-buttons">
                <div className="playback-buttons-container">

                  <li className={this.props.size(1, "columns control back-icon playback")}>
                    <i className="fas fa-backward" onClick={this.props.skipBack}></i>
                  </li>

                  <li className={this.props.size(1, "columns control play-icon playback")}>
                    {playPause}
                  </li>

                  <li className={this.props.size(1, "columns control forward-icon playback")}>
                    <i className="fas fa-forward" onClick={this.props.skipAhead}></i>
                  </li>

                </div>
              </div>

            <li className={this.props.size(4, "columns volume-slider")}>
              <input type="range" value={this.props.volume} className="custom-range" id="customRange1" onChange={this.props.volumeSlide}/>
            </li>

            <li className={this.props.size(4, "columns hamburger-party")}>
              <Hamburger
                currentUser={this.props.currentUser}
              />
            </li>

          </ul>

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

            //
            // <li className={this.props.size(2, "switch round small columns playback")}>
            //   {mute}
            //   <label htmlFor="on-off"></label>
            // </li>
