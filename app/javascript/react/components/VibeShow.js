import React, { Component } from 'react'

class VibeShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      fireSelected: false,
      iceSelected: false
    };
  }

  componentDidMount() {
    fetch(`/api/v1/current_user`)
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
        this.setState({ currentUser: body })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {

    let userLink = "/users/" + this.props.vibe.user.id
    let artUrl = this.props.vibe.art.url

    return(
      <div id="vibe-show-page-container">
        <div className="show-page">
          <div className="vibe-show-page-div row">
            <div className="song-info small-6 medium-6 columns">
              <h1 className="vibe-name">{this.props.vibe.name}</h1>
              <h2>
                <a href={userLink} className="vibe-user" id="show-page-vibe-name">{this.props.vibe.user.username}</a>
              </h2>
              <p className="vibe-blurb">{this.props.vibe.blurb}</p>
              <div className="columns">
                <div className="fire-text">
                  <i className="fas fa-fire"></i>
                  <span className="reaction-num">{this.props.vibe.fire}</span>
                </div>
                <div className="chill-text">
                  <i className="fas fa-snowflake"></i>
                  <span className="reaction-num">{this.props.vibe.ice}</span>
                </div>
              </div>
            </div>
            <img src={artUrl} className="vibe-art small-6 medium-6 columns" />
          </div>
        </div>
      </div>
    );
  }
};

export default VibeShow;
