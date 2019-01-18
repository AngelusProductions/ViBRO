import React, { Component } from 'react'
import Swiper from 'react-id-swiper'

class Coverflow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
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
      spaceBetween: 50,
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
        stretch: 250,
        depth: 350,
        modifier: 3,
        slideShadows: true
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
       nextEl: '.swiper-button-next',
       prevEl: '.swiper-button-prev'
     }
    }

    let covers = this.props.vibes.map(vibe => {
      let id = `vibe${vibe.id}`
      let url = `/vibes/${vibe.id}`
      return <div id={id} className="swiper-slide" key={vibe.id}>
               <img src={vibe.art.url} />
             </div>
    })
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
