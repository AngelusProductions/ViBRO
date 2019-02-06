import React from 'react'

const Waveform = ( props => {
  const green = '#80ffbf'
  const pink = ' #ff00dc'
  const indigo = '#476cff'
  let waveSurfer = WaveSurfer.create({
      id: 'waveform',
      container: '#waveform',
      waveColor: indigo,
      progressColor: green,
      backend: 'MediaElement',
      barWidth: 1,
      scrollParent: false,
      hideScrollbar: true,
      autoCenter:	true,
      barHeight: 1,
      normalize: true,
      interact: true,
      loopSelection: true,
      responsive: true,
      cursorColor: pink,
      audioprocess: {}
    })
  let url = props.mixPlaying.audio_file.url
  waveSurfer.load(url)
  waveSurfer.setVolume(1)
  props.waveSurferRendered(waveSurfer)
 return(
   <div/>
 )
})

export default Waveform
