import React from 'react';
import MixForm from './MixForm'

const Mix = ( props => {

  let mixForm = "";
  let mixText = "new mix"
  let mix = props.mix
  props.mixes.reverse;

  let mixRadio = props.mixes.map( mix => {
    return (
        <input type="radio" className="radio-button" name="mix" value={mix.number} key={mix.number} onClick={props.handleMixClick}></input>
    )
  })

  if (props.newMixShow) {
    mixForm = <MixForm
                vibe={props.vibe}
                newMixShow={props.newMixShow}
                handleNewMixClick={props.handleNewMixClick}
              />
    mixText = "close form"
  } else {
    mixForm = ""
    mixText = "new mix"
  }

 return(
   <div className="mix right small-7">
    <h1 id="mix-num">mix {mix.number}
    </h1>
    <div className="radio-button-container">
      {mixRadio}
    </div>
    <h2 id="mix-name">{mix.name}</h2>
    <h3 id="mix-blurb">{mix.blurb}</h3>
    <div className="small-4 right">
      <button id="new-mix-button" className="right" onClick={props.handleNewMixClick}>{mixText}</button>
    </div>
    {mixForm}
  </div>
 )
})

export default Mix;
