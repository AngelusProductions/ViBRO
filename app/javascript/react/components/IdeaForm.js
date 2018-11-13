import React, { Component } from 'react'
import Dropzone from 'react-dropzone'

class IdeaForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      idea: ""
    }
    this.handleIdeaChange = this.handleIdeaChange.bind(this)
    this.handleIdeaSubmit = this.handleIdeaSubmit.bind(this)
  }

  handleIdeaChange(event) {
    this.setState({ idea: event.target.value })
  }

  handleIdeaSubmit() {
    debugger
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="form small-6 column center" id="idea-form">
          <h1 id="new-idea-title">new idea</h1>

          <div className="idea-form-field" id="idea-form-name">
            <label htmlFor="idea">Idea</label>
            <input type="text" id="idea" name="idea" onChange={this.handleIdeaChange}/>
          </div>

          <input id="idea-form-submit" type="submit" className="button" value="Submit"/>
        </form>
      </div>
    )
  }
}

export default IdeaForm;
