import React, { Component } from 'react'

class MyPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vibePlaying: {},
      mixPlaying: {},
      playing: false
    }
    this.handleMiniPlayClick = this.handleMiniPlayClick.bind(this)
  }

  componentDidMount() {
    fetch(`/api/v1/vibes/${this.props.vibeSelect}`)
      .then(response => response.json())
      .then(body => {
        let latestMixId = body.vibe.mixes.length - 1
        this.setState({ vibePlaying: body.vibe,
                        mixPlaying: body.vibe.mixes[latestMixId] })
    })
  }

  handleMiniPlayClick() {
    this.setState({ playing: true })
  }

  render() {

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
            <li className={this.props.size(12, "columns")}>
             - - - - - - - - - - - - - - - - - - - -
            </li>
            <li className={this.props.size(12, "columns")}>

            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default MyPlayer
