import React from 'react'
import ProgressBar from 'progressbar.js'

const Progress = ( props => {

  let duration = props.runtime * 1000

  if (props.show && props.playing ) {
    let bar = new ProgressBar.Line(container, {
      strokeWidth: 100,
      progress: 0,
      duration: duration,
      color: '#476cff',
      trailColor: '#e6e6ff',
      trailWidth: 100,
      svgStyle: {width: '100%', height: '175%'},
      from: {color: '#80ffbf'},
      to: {color: '#476cff'},
      step: (state, bar) => {
        bar.path.setAttribute('stroke', state.color);
      }
    });
    bar.animate(1.0);
  }

 return(
   <div id="container"></div>
 )
})

export default Progress;
