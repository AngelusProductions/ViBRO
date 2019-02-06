import React, { Component } from 'react';

class WaveyPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {

    return (
      <div className='music-card playing'>

        <div className='wave'></div>
        <div className='wave'></div>
        <div className='wave'></div>

        <div className="info">
          <div className='title'>{this.props.vibePlaying.name}</div>
          <div className='artist'>by {this.props.artist.username}</div>
        </div>

      </div>
    )
  }
}

export default WaveyPlayer
