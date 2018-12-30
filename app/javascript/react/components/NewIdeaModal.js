import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap';

class NewIdeaModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: null,
      newIdeaTitle: "",
      newIdeaDescripton: "",
      errorMessage: ""
    }
    this.onNewIdeaTitleChange = this.onNewIdeaTitleChange.bind(this)
    this.onNewIdeaDescriptionChange = this.onNewIdeaDescriptionChange.bind(this)
    this.handleNewIdeaFormSubmit = this.handleNewIdeaFormSubmit.bind(this)
    this.clearNewIdeaForm = this.clearNewIdeaForm.bind(this)
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
       if (body != null) {
         this.setState({ currentUser: body.user })
       }
     })
     .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  onNewIdeaTitleChange(event) {
    this.setState({ newIdeaTitle: event.target.value})
  }

  onNewIdeaDescriptionChange(event) {
    this.setState({ newIdeaDescription: event.target.value})
  }

  handleNewIdeaFormSubmit(event) {
    event.preventDefault()

    let player = document.getElementsByTagName("audio")[0]
    let newIdeaTime = this.props.newIdeaClickProgressPercent * player.duration / 100
    let payload = new FormData()

    if (this.state.currentUser != null) {
      payload.append("title", this.state.newIdeaTitle)
      payload.append("description", this.state.newIdeaDescription)
      payload.append("time", newIdeaTime)
      payload.append("user_id", this.state.currentUser.id)
      payload.append("vibe_id", this.props.vibe.id)
      payload.append("mix_id_copy", this.props.mix.id)

      fetch(`/api/v1/vibes/${this.props.vibe.id}/mixes/${this.props.mixNum}/ideas`, {
        method: 'POST',
        body: payload
      })
      .then(response => response.json())
      .then(body => {
        this.clearNewIdeaForm()
        this.props.handleNewIdeaAdded(body)
      })
    } else {
      this.setState({errorMessage: "please log in/sign up before leaving a comment :)"})
    }
  }

  clearNewIdeaForm() {
    this.setState({ newIdeaTitle: "",
                    newIdeaDescription: "" })
  }

  render() {

    let time = document.getElementsByTagName("audio")[0].duration * this.props.newIdeaClickProgressPercent
    time /= 100
    time = Math.floor(time)

    return (
      <div>
        <Modal.Dialog>
          <Modal.Header closeButton onClick={this.props.handleNewIdeaModalClose} />
          <Modal.Body id="new-idea-form">

          <i className="far fa-lightbulb"></i>

          <div id="error-message" className="small-6">{this.state.errorMessage}</div>

          <div id="new-idea-form-time">@ {time} seconds</div>

          <div id="new-idea-form-text-input">
            <label id="new-idea-form-title-label" htmlFor="new-idea-form-title-input">what is your idea?</label>
            <input type="text" id="new-idea-form-title-input" name="new-idea-form-title-input" onChange={this.onNewIdeaTitleChange}/>

            <label id="new-idea-form-description-label" htmlFor="new-idea-form-description-input">care to elaborate?</label>
            <textarea id="new-idea-form-description-input" name="new-idea-form-description-input" value={this.state.newIdeaDescription} onChange={this.onNewIdeaDescriptionChange}/>
          </div>

          </Modal.Body>
          <Modal.Footer>
            <Button id="new-idea-form-button" onClick={this.handleNewIdeaFormSubmit}>submit</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    )
  }
}

export default NewIdeaModal
