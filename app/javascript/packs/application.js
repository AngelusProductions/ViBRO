
import React from 'react'
import { render } from 'react-dom'

import App from '../react/components/app'
import Hamburger from '../react/components/Hamburger'
import SearchBar from '../react/components/SearchBar'

import RedBox from 'redbox-react'

require('wavesurfer.js')
// require('wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js')
// require('wavesurfer.js/dist/plugin/wavesurfer.regions.min.js')
// require('wavesurfer.js/dist/plugin/wavesurfer.minimap.min.js')

document.addEventListener('DOMContentLoaded', () => {
  let reactElement = document.getElementById('app')
  let hamburgerElement = document.getElementById('hamburger')
  let searchBarElement = document.getElementById('search-bar')

  if (reactElement) {
    if(window.railsEnv && window.railsEnv === 'development'){
      try {
        render(<App />, reactElement)
      } catch (e) {
        render(<RedBox error={e} />, reactElement)
      }
    }
    else {
      render(<App />, reactElement)
    }
  }

  if (hamburgerElement) {
    if(window.railsEnv && window.railsEnv === 'development'){
      try {
        render(<Hamburger />, hamburgerElement)
      } catch (e) {
        render(<RedBox error={e} />, hamburgerElement)
      }
    }
    else {
      render(<Hamburger />, hamburgerElement)
    }
  }

  if (searchBarElement) {
    if(window.railsEnv && window.railsEnv === 'development'){
      try {
        render(<SearchBar />, searchBarElement)
      } catch (e) {
        render(<RedBox error={e} />, searchBarElement)
      }
    }
    else {
      render(<SearchBar />, searchBarElement)
    }
  }

})

  //
  // window.addEventListener('load', function(){
  //   document.querySelector('.glider').Glider({
  //     settingname: settingvalue
  //   })
  // })
