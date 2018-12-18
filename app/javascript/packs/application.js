
import React from 'react'
import { render } from 'react-dom'

import App from '../react/components/app'
import Hamburger from '../react/components/Hamburger'
import RedBox from 'redbox-react'

document.addEventListener('DOMContentLoaded', () => {
  let reactElement = document.getElementById('app')
  let hamburgerElement = document.getElementById('hamburger')

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

})
