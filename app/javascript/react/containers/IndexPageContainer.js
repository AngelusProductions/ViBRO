import React, { Component } from 'react'
import { Route, Link } from 'react-router'

import CarouselComponent from '../components/CarouselComponent'

class IndexPageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vibes: []
    };
  }

  componentDidMount() {
    fetch(`/api/v1/vibes`)
     .then(response => {
         if (response.ok) {
         return response;
       } else {
         let errorMessage = `${response.status} (${response.statusText})`,
             error = new Error(errorMessage);
         throw(error);
       }
     })
     .then(response => response.json())
     .then(body => {
       this.setState({ vibes: body.vibes })
     })
     .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleImageClick(event) {
    return <Link push to='/vibes/1' />
  }

  render() {

    let carousel = ""
    if (this.state.vibes.length > 0) {
      carousel = <CarouselComponent
                   vibes={this.state.vibes}
                   handleImageClick={this.handleImageClick}
                 />
    }

    return(
      <div>
        {carousel}
      </div>
    );
  }
};

export default IndexPageContainer;
