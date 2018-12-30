
import React, { Component } from 'react'

class Audio extends Component {
 constructor(props) {
   super(props);
 }

   render () {

     return(
       <audio
        src={this.props.url}
        id="vibe-player"
        className={this.props.playerClass}
        loop="loop"
        crossOrigin="anonymous"
       ></audio>
     )
   }
 }

export default Audio
