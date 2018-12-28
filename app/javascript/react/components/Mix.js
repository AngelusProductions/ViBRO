import React, { Component } from 'react'
import MixForm from './MixForm'
import AudioVisualizer from '../components/AudioVisualizer'

class Mix extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mixSelected: 1
    }
  }

  render() {
    let mixForm = ""
    let mixText = "new mix"
    let mix = this.props.mix
    this.props.mixes.reverse

    let mixRadio = this.props.mixes.map( mix => {
      return (
          <div className="radio-button" id={mix.number} key={mix.number} onClick={this.props.handleMixClick}>{mix.number}</div>
      )
    })

    if (this.props.newMixButtonShow && this.props.newMixShow) {
      mixForm = <div>
                  <div className="small-4 right">
                    <button id="new-mix-button" className="right" onClick={this.props.handleNewMixClick}>{mixText}</button>
                  </div>
                  <MixForm
                    vibe={this.props.vibe}
                    newMixShow={this.props.newMixShow}
                    mixes={this.props.mixes}
                    handleNewMixClick={this.props.handleNewMixClick}
                    handleNewMixAdded={this.props.handleNewMixAdded}
                  />
                </div>
      mixText = "close form"
    } else if (this.props.newMixButtonShow) {
      mixText = "new mix"
      mixForm = <div className="small-4 right">
                  <button id="new-mix-button" className="right" onClick={this.props.handleNewMixClick}>{mixText}</button>
                </div>
    } else {
      mixForm = ""
    }

   return(
     <div className="mix right small-7">
     <div className="radio-button-container">
        <div id="mixes-label">mixes:</div>
       {mixRadio}
     </div>
      <h1 id="mix-num">MIX #{this.props.mix.number}</h1>
      <h2 id="mix-name">{this.props.mix.name}</h2>
      <h3 id="mix-blurb">{this.props.mix.blurb}</h3>
      {mixForm}
      <AudioVisualizer />
    </div>
   )
  }
}

export default Mix
