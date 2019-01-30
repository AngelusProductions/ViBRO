import React from 'react'
import AudioSpectrum from 'react-audio-spectrum'


const AudioVisualizer = ( props => {

 return(
   <div className="visualizer">

     <AudioSpectrum
       id="audio-canvas"
       height={100}
       width={900}
       audioId={'audio-element'}
       capColor={'blueviolet'}
       capHeight={2}
       meterWidth={2}
       meterCount={512}
       meterColor={[
         {stop: 0, color: 'blueviolet'},
         {stop: 0.25, color: '#80ffbf'},
         {stop: 0.75, color: '#476cff'},
         {stop: 1, color: '#ff00dc'}
       ]}
       gap={5}
     />
  </div>
 )
})

export default AudioVisualizer;
