import React, { Component } from 'react';
import ProgressBar from 'progressbar.js'
import AudioPlayer from '../components/AudioPlayer'
import Mix from '../components/Mix'

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
     runtime: 0,
     playing: false,

     newMixShow: false,
     audioPlayerShow: false,

     afterFetch: false,
     progressBar: {},
     progressBarCreated: false,
     progressBarDestroyed: false
   }
   this.handlePlayClick = this.handlePlayClick.bind(this)
   this.handleMixClick = this.handleMixClick.bind(this)
   this.handleNewMixClick = this.handleNewMixClick.bind(this)
   this.handleNewMixAdded = this.handleNewMixAdded.bind(this)
   this.handleIdeaClick = this.handleIdeaClick.bind(this)
   this.handleProgressBarCreated = this.handleProgressBarCreated.bind(this)
   this.handleProgressBarDestroyed = this.handleProgressBarDestroyed.bind(this)
   this.afterFetch = this.afterFetch.bind(this)
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
      this.setState({ vibe: body.vibe,
                      mixes: body.vibe.mixes })
      this.afterFetch()
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
 }

 afterFetch () {
   let mix = this.state.mixes[this.state.mixNum - 1]
   this.setState({ mix: mix,
                   afterFetch: true,
                   audioPlayerShow: true })
 }

  handleProgressBarCreated(progressBar) {
    this.setState({ progressBar: progressBar,
                    progressBarCreated: true })
  }

  handleProgressBarDestroyed(progressBar) {
    this.setState({ progressBar: progressBar,
                    progressBarDestroyed: true })
  }

 handlePlayClick() {
   let player = document.getElementsByTagName("audio")[0]
   let runtime = player.duration * 1000

   if (!this.state.playing) {
     player.play()
     this.setState({ playing: true})
    } else {
     player.pause()
     this.setState({ playing: false })
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

 handleIdeaClick() {
   debugger
 }

 render() {
   return(
     <div>

      <AudioPlayer
        vibe={this.state.vibe}
        mix={this.state.mix}
        mixNum={this.state.mixNum}
        mixes={this.state.mixes}

        handleMixClick={this.handleMixClick}
        handleNewMixClick={this.handleNewMixClick}
        handleNewMixAdded={this.handleNewMixAdded}

        handlePlayClick={this.handlePlayClick}
        handleIdeaClick={this.handleIdeaClick}

        playing={this.state.playing}
        audioPlayerShow={this.state.audioPlayerShow}
        newMixShow={this.state.newMixShow}
        afterFetch={this.state.afterFetch}

        progressBar={this.state.progressBar}
        progressBarCreated={this.state.progressBarCreated}
        handleProgressBarCreated={this.handleProgressBarCreated}
        handleProgressBarDestroyed={this.handleProgressBarDestroyed}
        progressBarDestroyed={this.state.progressBarDestroyed}
      />

     </div>
   )
 }
}

export default AudioContainer;
