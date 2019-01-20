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

        <div className='image'></div>
        <div className='wave'></div>
        <div className='wave'></div>
        <div className='wave'></div>

        <div className="info">
          <h2 className='title'>{this.props.vibePlaying.name}</h2>
          <div className='artist'>{this.props.mixPlayingUser.username}</div>
        </div>

      </div>
    )
  }
}

export default WaveyPlayer
