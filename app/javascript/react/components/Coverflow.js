import React, { Component } from 'react'
import Swiper from 'react-id-swiper'
const swipe = require('swiper')

class Coverflow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0
    }
    this.handleSlideChange = this.handleSlideChange.bind(this)
  }

  componentDidMount () {
    this.setState({ activeIndex: this.props.vibeSelect - 1})
  }

  handleSlideChange(activeIndex) {
    this.setState({ activeIndex: activeIndex })
  }

 render() {
   let params = {
      effect: 'coverflow',
      loop: false,
      width: 1000,
      speed: 300,
      spaceBetween: 50,
      slidesPerView: 3,
      grabCursor: false,
      virtualTranslate: false,
      initialSlide: this.props.vibeSelect - 1,
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
        modifier: 2,
        slideShadows: false
      },
      fadeEffect: {
        crossFade: true
      },
      navigation: {
       nextEl: '.swiper-button-prev',
       prevEl: '.swiper-button-next'
     },
     on: {
       'activeIndexChange': () => {
         let index = this.activeIndex
         this.handleSlideChange(this.activeIndex)
       }
     }
    }

    let covers = this.props.vibes.map(vibe => {
      let button, borderGlow
      let url = `/vibes/${vibe.id}`
      let isPlaying = this.props.vibePlaying.id === vibe.id
      if (isPlaying) { borderGlow = "is-playing"}

      let saturation = "de-saturate"
      if (vibe.id === this.state.activeIndex) { saturation = "" }
      let coverClass = `swiper-slide ${saturation}`

      let playPause = `fas fa-play-circle play-overlay`
      if (this.props.playing && isPlaying) { playPause = `fas fa-pause-circle play-overlay` }

      return <div id={vibe.id} className={`${coverClass} ${borderGlow}`} key={vibe.id}>
               <img src={vibe.art.url} className={borderGlow}/>
               <button className="play-overlay-button">
                 <i className={playPause} onClick={this.props.playPauseClick}></i>
               </button>
               <div className="cover-title">{vibe.name}</div>
             </div>
    }, this)


    let swiper = <Swiper {...params} shouldSwiperUpdate ref={(swiper) => {this.swiper = swiper}}>
                   {covers}
                 </Swiper>

   return (
    <div id="coverflow-div">
      {swiper}
    </div>
   )
 }
}

export default Coverflow
