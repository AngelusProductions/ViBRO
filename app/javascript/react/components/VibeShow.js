import React, { Component } from 'react'

class VibeShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fireTally: 0,
      iceTally: 0,
      fireIconId: "fire-icon-deselected",
      iceIconId: "ice-icon-deselected",
      fireTextId: "fire-text-deselected",
      iceTextId: "ice-text-deselected",
      userReaction: {},
      errorMessage: ""
    };
    this.handleFireClick = this.handleFireClick.bind(this)
    this.handleIceClick = this.handleIceClick.bind(this)
  }

  componentDidMount() {
    let fireTally = 0
    let iceTally = 0
    let fireIconId = "fire-icon-deselected"
    let fireTextId = "fire-text-deselected"
    let iceIconId = "ice-icon-deselected"
    let iceTextId = "ice-text-deselected"

    this.props.reactions.forEach( reaction => {
      if (reaction.kind === "fire") {
        fireTally++
        if (reaction.user_id === this.props.currentUser.id) {
          fireIconId = "fire-icon-selected"
          fireTextId = "fire-text-selected"
          this.setState({ userReaction: reaction })
        }
      } else if (reaction.kind === "ice") {
        iceTally++
        if (reaction.user_id === this.props.currentUser.id) {
          iceIconId = "ice-icon-selected"
          iceTextId = "ice-text-selected"
          this.setState({ userReaction: reaction })
        }
      }
    })

    this.setState({fireTally: fireTally,
                   fireIconId: fireIconId,
                   fireTextId: fireTextId,
                   iceTally: iceTally,
                   iceIconId: iceIconId,
                   iceTextId: iceTextId
                  })
  }

  handleFireClick() {
    if (this.props.currentUser != null) {
      if (this.state.fireIconId === "fire-icon-deselected") {
        let payload = new FormData()
        payload.append("kind", "fire")
        payload.append("vibe_id", this.props.vibe.id)
        payload.append("user_id", this.props.currentUser.id)

        fetch(`/api/v1/vibes/${this.props.vibe.id}/reactions`, {
          method: 'POST',
          body: payload
        })
        .then(response => {
          return response.json(); })
        .then(body => {
          this.setState({ userReaction: body.reaction })
        })

        if (this.state.iceIconId === "ice-icon-selected") {
          fetch(`/api/v1/vibes/${this.props.vibe.id}/reactions/${this.state.userReaction.id}`, {
            method: 'DELETE',
            body: this.state.userReaction
          })
        }

        this.setState({ userReaction: payload,
                        fireTally: this.state.fireTally + 1,
                        fireIconId: "fire-icon-selected",
                        fireTextId: "fire-text-selected",
                        iceIconId: "ice-icon-deselected",
                        iceTextId: "ice-text-deselected",
                        errorMessage: ""})
      } else {
        let payload = new FormData()
        payload.append("kind", "fire")
        payload.append("vibe_id", this.props.vibe.id)
        payload.append("user_id", this.props.currentUser.id)

        fetch(`/api/v1/vibes/${this.props.vibe.id}/reactions/${this.state.userReaction.id}`, {
          method: 'DELETE',
          body: payload
        })

        this.setState({ userReaction: {},
                        fireTally: this.state.fireTally - 1,
                        fireIconId: "fire-icon-deselected",
                        fireTextId: "fire-text-deselected"})
      }
    } else {
      this.setState({ errorMessage: "please log in first!"})
    }
  }

  handleIceClick() {
    if (this.props.currentUser != null) {
      if (this.state.iceIconId === "ice-icon-deselected") {
        let payload = new FormData()
        payload.append("kind", "ice")
        payload.append("vibe_id", this.props.vibe.id)
        payload.append("user_id", this.props.currentUser.id)

        fetch(`/api/v1/vibes/${this.props.vibe.id}/reactions`, {
          method: 'POST',
          body: payload
        })
        .then(response => {
          return response.json(); })
        .then(body => {
          this.setState({ userReaction: body.reaction })
        })

        if (this.state.iceIconId === "fire-icon-selected") {
          fetch(`/api/v1/vibes/${this.props.vibe.id}/reactions/${this.state.userReaction.id}`, {
            method: 'DELETE',
            body: this.state.userReaction
          })
        }

        this.setState({ userReaction: payload,
                        iceTally: this.state.iceTally + 1,
                        iceIconId: "ice-icon-selected",
                        iceTextId: "ice-text-selected",
                        fireIconId: "fire-icon-deselected",
                        fireTextId: "fire-text-deselected",
                        errorMessage: ""})
      } else {
        let payload = new FormData()
        payload.append("kind", "ice")
        payload.append("vibe_id", this.props.vibe.id)
        payload.append("user_id", this.props.currentUser.id)

        fetch(`/api/v1/vibes/${this.props.vibe.id}/reactions/${this.state.userReaction.id}`, {
          method: 'DELETE',
          body: payload
        })

        this.setState({ userReaction: {},
                        iceTally: this.state.iceTally - 1,
                        iceIconId: "ice-icon-deselected",
                        iceTextId: "ice-text-deselected"})
      }
    } else {
      this.setState({ errorMessage: "please log in first!"})
    }
  }

  render() {
    let feelin = ""
    let feelinClass = ""
    let userLink = "/users/" + this.props.vibe.user.id
    let artUrl = this.props.vibe.art.url

    if (this.state.fireIconId === "fire-icon-selected") {
      feelin = "FiRE ViBES"
      feelinClass = "feelin-fire"
    } else if (this.state.iceIconId === "ice-icon-selected") {
      feelin = "CHiLL ViBES"
      feelinClass = "feelin-ice"
    } else {
      feelin = ""
    }

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
              <div className="reactions row">
                <div className="fire column">
                  <i className="fas fa-fire" id={this.state.fireIconId} onClick={this.handleFireClick}></i>
                  <span className="reaction-num" id={this.state.fireTextId}>{this.state.fireTally}</span>
                </div>
                <div className="ice column">
                  <i className="fas fa-snowflake" id={this.state.iceIconId} onClick={this.handleIceClick}></i>
                  <span className="reaction-num" id={this.state.iceTextId}>{this.state.iceTally}</span>
                </div>
                <div className={feelinClass} id="feelin">{feelin}</div>
              </div>
              <span className="vibe-show-error">{this.state.errorMessage}</span>
            </div>
            <img src={artUrl} className="vibe-art small-6 medium-6 columns" />
          </div>
        </div>
      </div>
    );
  }
};

export default VibeShow;
