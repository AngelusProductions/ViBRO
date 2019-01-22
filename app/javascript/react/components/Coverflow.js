import React, { Component } from 'react'
import Swiper from 'react-id-swiper'
const swipe = require('swiper')

class Coverflow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

 render() {
   let initialIndex = 1;
   if (this.props.vibes.length > 0) {
     initialIndex = Math.floor(this.props.vibes.length / 2)
   }
   let params = {
      effect: 'coverflow',
      loop: false,
      width: 1000,
      speed: 500,
      spaceBetween: 0,
      slidesPerView: 3,
      grabCursor: false,
      virtualTranslate: false,
      initialSlide: initialIndex,
      runCallbacksOnInit: true,
      centeredSlides: true,
      touchReleaseOnEdges: true,
      simulateTouch: true,
      mousewheel: true,
      parallax: true,
      coverflowEffect: {
        rotate: 45,
        stretch: 300,
        depth: 350,
        modifier: 3,
        slideShadows: false
      },
      fadeEffect: {
        crossFade: true
      },
      zoom: {
    maxRatio: 5,
  },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      navigation: {
       nextEl: '.swiper-button-prev',
       prevEl: '.swiper-button-next'
     }
    }
    let covers = this.props.vibes.map(vibe => {
      let url = `/vibes/${vibe.id}`
      let button = ""
      let playPause = "fas fa-play-circle play-overlay"
      if(this.props.playing &&
         this.props.vibePlaying.id === vibe.id) {
        playPause = "fas fa-pause-circle play-overlay"
      }
      return <div id={vibe.id} className="swiper-slide" key={vibe.id}>
               <img src={vibe.art.url} />
               <button className="play-overlay-button">
                 <i className={playPause} onClick={this.props.playPauseClick}></i>
               </button>
             </div>
    }, this)

   return (
    <div id="coverflow-div">
       <Swiper {...params} shouldSwiperUpdate>
         {covers}
       </Swiper>
     </div>
   )
 }
}

export default Coverflow
