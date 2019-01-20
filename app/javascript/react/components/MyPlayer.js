import React, { Component } from 'react'
import WaveyPlayer from '../components/WaveyPlayer'

class MyPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.handleMiniPlayClick = this.handleMiniPlayClick.bind(this)
  }

  handleMiniPlayClick() {
    this.setState({ playing: true })
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

    return (
      <div className={this.props.size(3, "columns my-player")}>
        <div className="playback-buttons row small-offset-0 medium-offset-1 large-offset-6">
          <ul className="row text-right">
            <li className={this.props.size(2, "columns")}><i className="fas fa-redo-alt"></i></li>
            <li className={this.props.size(2, "columns")}><i className="fas fa-random"></i></li>
            <li className={this.props.size(5, "switch round small columns")}>
              <input id="on-off" type="checkbox" name="on-off" />
              <label htmlFor="on-off"></label>
            </li>
          </ul>
        </div>

        <div className="row audio-controls">
          <ul className={this.props.size(12, "row")}>
            <li className={this.props.size(1, "columns control")}><i className="fas fa-fast-backward"></i></li>
            <li className={this.props.size(1, "columns control play-icon")}>
              <i className="far fa-play-circle" onClick={this.handleMiniPlayClick}></i>
            </li>
            <li className={this.props.size(1, "columns control")}><i className="fas fa-fast-forward"></i></li>
            <li className={this.props.size(5, "columns volume-slider small-offset-1")}>
              <input type="range" className="custom-range" id="customRange1" />
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

        <div className="reactions row">
          <ul className="row" id="index-page-vibe-reactions">
            <li className="row">
              <div className="fire columns">
                <i className="fas fa-fire"></i>
                <span className="reaction-num">{this.props.vibePlaying.fire}</span>
              </div>
            </li>

            <li className="row">
              <div className="ice columns">
                <i className="fas fa-snowflake"></i>
                <span className="reaction-num">{this.props.vibePlaying.ice}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default MyPlayer
