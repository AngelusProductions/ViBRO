import React, { Component } from 'react';
import AudioPlayer from '../components/AudioPlayer'
import Mix from '../components/Mix'

class AudioContainer extends Component {
 constructor(props) {
   super(props);
   this.state = {
     vibe: {
       name: "",
       runtime: 0,
       art: "",
       blurb: "",
       waves: 0,
       collab_id: null,
       manager_id: null,
       user_id: null,
       lineup_id: null,
       mixes: [{
         number: 1,
         audio_file: "",
         blurb: "",
         art: "",
         bpm: 0,
         color: "",
         fire: 0,
         ice: 0,
         vibe_id: 0
      }]
     },
     mix: 1,
     playing: false,
     newMixShow: false
   }
   this.handlePlayClick = this.handlePlayClick.bind(this)
   this.handleMixClick = this.handleMixClick.bind(this)
   this.handleNewMixClick = this.handleNewMixClick.bind(this)
 }

 componentDidMount () {
   fetch(`/api/v1/vibes/${this.props.params.id}`)
    .then(response => {
        if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState( { vibe: body.vibe })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
 }

 handlePlayClick () {
   let player = document.getElementsByTagName("audio")[0]

   if (this.state.playing === false) {
     player.play()
     this.setState({ playing: true })
    } else {
      player.pause()
     this.setState({ playing: false})
    }

 }

 handleMixClick (event) {
   let mix = parseInt(event.target.value)
   let player = document.getElementsByTagName("audio")[0]
   player.pause()

   if (this.state.mix != mix ) {
     this.setState({ mix: mix,
                     playing: false });
   } else {
     this.setState({ playing: false });
   }
 }

 handleNewMixClick () {
   if (this.state.newMixShow) {
     this.setState({ newMixShow: false})
   } else {
     this.setState({ newMixShow: true })
   }
 }

 render() {
   return(
     <div>

      <AudioPlayer
        vibe={this.state.vibe}
        handleMixClick={this.handleMixClick}
        handlePlayClick={this.handlePlayClick}
        mix={this.state.mix}
        playing={this.state.playing}
        mixes={this.state.vibe.mixes}
        handleNewMixClick={this.handleNewMixClick}
        newMixShow={this.state.newMixShow}
      />

     </div>
   )
 }
}

export default AudioContainer;
