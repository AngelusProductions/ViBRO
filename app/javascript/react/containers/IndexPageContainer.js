import React, { Component } from 'react'
import { Route, Link } from 'react-router'

import CarouselComponent from '../components/CarouselComponent'

class IndexPageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vibes: [],
      users: []
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

    fetch(`/api/v1/users`)
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
        this.setState({ users: body.users })
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

    let userList = this.state.users.map(user => {
      let link = "/users/" + user.id
      let proPicUrl = user.pro_pic.url
      if (user.pro_pic != null && user.vibes.length > 0) {
        return <div id="discover-tile" key={user.id}>
                <div className="user-avatar">
                    <a href={link}>
                      <img src={proPicUrl} className="pro-pic-mini"/>
                    </a>
                 </div>
                 <i className="fas fa-broadcast-tower"></i>
                 <span id="tower-text">{user.vibes.length}</span>
              </div>
      }
    })

    return(
      <div id="index-page">
        <div id="coverflow-outer">
        <span className="discover-vibes">DiSCOVER DAiLY</span>
        </div>
        {carousel}
        <div id="discover-container">
          {userList}
          <span className="discover-vibes">WAViEST ARTiSTS</span>
        </div>
      </div>
    );
  }
};

export default IndexPageContainer;
