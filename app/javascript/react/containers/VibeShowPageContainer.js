import React, { Component } from 'react';
import VibeShow from '../components/VibeShow'
import ProgressBar from 'progressbar.js'
import AudioPlayer from '../components/AudioPlayer'

class VibeShowPageContainer extends Component {
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
     newMixButtonShow: false,
     audioPlayerShow: false,

     afterFetch: false,
     progressBar: {},
     progressBarCreated: false,
     progressBarDestroyed: false,

     ideas: [],
     newIdeaModalShow: false,
     newIdeaClickProgressPercent: 0,

     reactions: [],
     currentUser: null
   }
   this.handlePlayClick = this.handlePlayClick.bind(this)

   this.handleMixClick = this.handleMixClick.bind(this)
   this.handleNewMixClick = this.handleNewMixClick.bind(this)
   this.handleNewMixAdded = this.handleNewMixAdded.bind(this)

   this.handleNewIdeaClick = this.handleNewIdeaClick.bind(this)
   this.handleNewIdeaModalClose = this.handleNewIdeaModalClose.bind(this)
   this.handleNewIdeaAdded = this.handleNewIdeaAdded.bind(this)

   this.handleProgressBarCreated = this.handleProgressBarCreated.bind(this)
   this.handleProgressBarDestroyed = this.handleProgressBarDestroyed.bind(this)
   this.afterFetch = this.afterFetch.bind(this)
 }

 componentDidMount() {
   fetch(`/api/v1/current_user`)
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
       if (body) {
         this.setState({ currentUser: body.user })
       } else {
         this.setState({ currentUser: null })
       }
     })
     .catch(error => console.error(`Error in fetch: ${error.message}`));

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
                      mixes: body.vibe.mixes,
                      reactions: body.vibe.reactions })
      this.afterFetch()
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
 }

 afterFetch () {
   let newMixButtonShow = false
   let mix = this.state.mixes[this.state.mixNum - 1]

   if (this.state.currentUser != null &&
       this.state.currentUser.id === this.state.vibe.user.id) {
     newMixButtonShow = true
   }

   this.setState({ mix: mix,
                   afterFetch: true,
                   audioPlayerShow: true,
                   newMixButtonShow: newMixButtonShow,
                   ideas: mix.ideas })
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
   let oldMixes = this.state.vibe.mixes
   let newMixes = oldMixes.concat(mix)
   this.setState({ mixes: newMixes })
 }

 handleNewIdeaClick(event) {
   event.preventDefault()

   let newIdeaClickPageHeight = event.clientY

   let progressBarTopHeight = document.getElementById("container").getBoundingClientRect().top
   let progressBarBottomHeight = document.getElementById("container").getBoundingClientRect().bottom
   let progressBarLength = document.getElementById("container").getBoundingClientRect().bottom - document.getElementById("container").getBoundingClientRect().top

   let newIdeaClickProgressDifference = newIdeaClickPageHeight - progressBarTopHeight
   let newIdeaClickProgressPercent = newIdeaClickProgressDifference / progressBarLength
   newIdeaClickProgressPercent *= 100

   this.setState({ newIdeaClickProgressPercent: newIdeaClickProgressPercent,
                   newIdeaModalShow: true })
 }

 handleNewIdeaModalClose() {
   this.setState({ newIdeaModalShow: false })
 }

 handleNewIdeaAdded(idea) {
   let oldIdeas = this.state.ideas
   let newIdeas = oldIdeas.concat(idea)
   this.setState({ newIdeaModalShow: false,
                   ideas: newIdeas })
 }

 render() {
   let vibeShow;

   if (this.state.afterFetch) {
     vibeShow = <VibeShow
                      vibe={this.state.vibe}
                      currentUser={this.state.currentUser}
                      reactions={this.state.reactions}
                    />
   } else {
     vibeShow = ""
   }

   return(
     <div>
      {vibeShow}

      <AudioPlayer
        vibe={this.state.vibe}
        mix={this.state.mix}
        mixNum={this.state.mixNum}
        mixes={this.state.mixes}

        handleMixClick={this.handleMixClick}
        handleNewMixClick={this.handleNewMixClick}
        handleNewMixAdded={this.handleNewMixAdded}
        handlePlayClick={this.handlePlayClick}

        ideas={this.state.ideas}
        newIdeaModalShow={this.state.newIdeaModalShow}
        handleNewIdeaClick={this.handleNewIdeaClick}
        handleNewIdeaModalOpen={this.handleNewIdeaModalOpen}
        handleNewIdeaModalClose={this.handleNewIdeaModalClose}
        newIdeaClickProgressPercent={this.state.newIdeaClickProgressPercent}
        handleNewIdeaAdded={this.handleNewIdeaAdded}

        playing={this.state.playing}
        afterFetch={this.state.afterFetch}
        newMixShow={this.state.newMixShow}
        newMixButtonShow={this.state.newMixButtonShow}
        audioPlayerShow={this.state.audioPlayerShow}

        progressBar={this.state.progressBar}
        progressBarCreated={this.state.progressBarCreated}
        handleProgressBarCreated={this.handleProgressBarCreated}
        handleProgressBarDestroyed={this.handleProgressBarDestroyed}
        progressBarDestroyed={this.state.progressBarDestroyed}

        currentUser={this.state.currentUser}
      />

     </div>
   )
 }
}

export default VibeShowPageContainer;
