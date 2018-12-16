import React from 'react'
import Coverflow from 'react-coverflow'
import { Link, BrowserRouter } from 'react-router'

const CarouselComponent = ( props => {

    function refreshPage() {
      window.location.reload();
    }

    let carouselPics = props.vibes.map( vibe => {
      return <Link to={`/vibes/${vibe.id}`}
                   key={vibe.id}
                   onClick={refreshPage}
              >
                <img src={vibe.art.url}
                  key={vibe.id}
                  id={vibe.id}
                  alt={vibe.name}
                  onClick={props.handleImageClick}
                />
              </Link>
    })

    return (
      <div id="coverflow-inner">
        <Coverflow
          width={960}
          height={480}
          navigation={true}
          displayQuantityOfSide={1}
          navigation={false}
          clickable={true}
          currentFigureScale={2}
          otherFigureScale={0.8}
          enableHeading={true}
        >
          {carouselPics}
        </Coverflow>
      </div>
    )
  }
)

export default CarouselComponent;
