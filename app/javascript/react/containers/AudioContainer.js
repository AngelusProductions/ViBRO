import React, { Component } from 'react';
import AudioPlayer from '../components/AudioPlayer'
import Mix from '../components/Mix'
import Progress from '../components/Progress'

class AudioContainer extends Component {
 constructor(props) {
   super(props);
   this.state = {
     vibe: {
       name: "",
       art: "",
       blurb: "",
       waves: 0,
       collab_id: null,
       manager_id: null,
       user_id: null,
       lineup_id: null,
       mixes: [{
         number: 1,
         runtime: 0,
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
     mix: {},
     mixes: [],
     mixNum: 1,
     playing: false,
     newMixShow: false,
     audioPlayerShow: false,
     progressShow: false,
     runtime: 0
   }
   this.handlePlayClick = this.handlePlayClick.bind(this)
   this.handleMixClick = this.handleMixClick.bind(this)
   this.handleNewMixClick = this.handleNewMixClick.bind(this)
   this.afterFetchSetStates = this.afterFetchSetStates.bind(this)
   this.handleNewMixAdded = this.handleNewMixAdded.bind(this)
 }

 componentDidMount() {
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
      this.setState( { vibe: body.vibe } )
      this.afterFetchSetStates()
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
 }

 handlePlayClick() {
   let player = document.getElementsByTagName("audio")[0]
   let runtime = player.duration

   if (this.state.playing === false) {
     player.play()
     this.setState({ playing: true,
                     runtime: runtime })
    } else {
      player.pause()
     this.setState({ playing: false,
                     runtime: runtime })
    }
 }

 handleMixClick(event) {
   let mixNum = parseInt(event.target.value)
   let mix = this.state.mixes[mixNum - 1]
   let player = document.getElementsByTagName("audio")[0]
   player.pause()

   if (this.state.mixNum != mixNum ) {
     this.setState({ mix: mix,
                     mixNum: mixNum,
                     runtime: mix.runtime,
                     playing: false });
   } else {
     this.setState({ playing: false });
   }
 }

 handleNewMixClick() {
   if (this.state.newMixShow) {
     this.setState({ newMixShow: false})
   } else {
     this.setState({ newMixShow: true })
   }
 }

 handleNewMixAdded(mix) {
   let mixes = this.state.vibe.mixes
   let newMixes = mixes.concat(mix)
   this.setState({ mixes: newMixes })
 }

 afterFetchSetStates() {
   let mix = this.state.vibe.mixes[this.state.mixNum - 1]
   this.setState({ mix: mix,
                   mixes: this.state.vibe.mixes,
                   mixRuntime: this.state.mixRuntime,
                   progressShow: true,
                   audioPlayerShow: true })
   }

 render() {
   return(
     <div>
      <AudioPlayer
        vibe={this.state.vibe}
        handleMixClick={this.handleMixClick}
        handlePlayClick={this.handlePlayClick}
        audioPlayerShow={this.state.audioPlayerShow}
        progressShow={this.state.progressShow}
        mix={this.state.mix}
        mixNum={this.state.mixNum}
        mixes={this.state.mixes}
        playing={this.state.playing}
        handleNewMixClick={this.handleNewMixClick}
        newMixShow={this.state.newMixShow}
        handleNewMixAdded={this.handleNewMixAdded}
        runtime={this.state.runtime}
      />

     </div>
   )
 }
}

export default AudioContainer;
