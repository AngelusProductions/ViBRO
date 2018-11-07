import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import AudioContainer from '../containers/AudioContainer'

class MixForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      blurb: "",
      bpm: 0,
      color: "",
      audioFile: [],
      art: [],
      message: "",
      newMixShow: true
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleBlurbChange = this.handleBlurbChange.bind(this)
    this.handleBPMChange = this.handleBPMChange.bind(this)
    this.handleColorChange = this.handleColorChange.bind(this)
    this.handleAudioFileDrop = this.handleAudioFileDrop.bind(this)
    this.handleArtDrop = this.handleArtDrop.bind(this)
  }

  handleNameChange (event) {
    this.setState({ name: event.target.value })
  }

  handleBlurbChange (event) {
    this.setState({ blurb: event.target.value })
  }

  handleBPMChange (event) {
    this.setState({ bpm: event.target.value })
  }

  handleColorChange (event) {
    this.setState({ color: event.target.value })
  }

  handleAudioFileDrop (file) {
    if (file.length == 1) {
      this.setState({ audioFile: file })
    } else {
      this.setState({ message: 'only one mix at a time!'})
    }
  }

  handleArtDrop (file) {
    if (file.length == 1) {
      this.setState({ art: file })
    } else {
      this.setState({ message: 'only one pic at a time!'})
    }
  }

  handleSubmit(event) {
    event.preventDefault()

    let payload = new FormData()
    payload.append("name", this.state.name)
    payload.append("blurb", this.state.blurb)
    payload.append("bpm", parseInt(this.state.bpm))
    payload.append("color", this.state.color)
    payload.append("audio_file", this.state.audioFile[0])
    payload.append("art", this.state.art[0])

    fetch(`/api/v1/vibes/${this.props.vibe.id}/mixes`, {
      method: 'POST',
      headers: {
       "Accept": "application/json",
       "Content-Type": "application/json"
      },
      body: payload })
      .then(response => response.json())
    .then(body => {
      this.setState({ message: body.message,
                      newMixShow: false })
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form small-6 column center" id="mix-form">
        <h1 id="new-mix-title">new mix</h1>

        <div className="mix-form-field" id="mix-form-name">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" onChange={this.handleNameChange}/>
        </div>

        <div className="mix-form-field" id="mix-form-blurb">
          <label htmlFor="blurb">Blurb:</label>
          <input type="text" id="blurb" name="blurb" onChange={this.handleBlurbChange} />
        </div>

        <div className="mix-form-field" id="mix-form-bpm">
          <label htmlFor="bpm">BPM:</label>
          <input type="text" id="bpm" name="bpm" onChange={this.handleBPMChange}/>
        </div>

        <div className="mix-form-field" id="mix-form-color">
          <label htmlFor="color">Color:</label>
          <select id="color-dropdown" name="color" onChange={this.handleColorChange}>
          <option value="blue">Blue</option>
          <option value="purple">Purple</option>
          <option value="pink">Pink</option>
          <option value="green">Green</option>
          </select>
        </div>

        <div id="dropzones">
          <section className="dropzone-section">
            <div id="mix-form-audio-file" className="dropzone">
              <Dropzone onDrop={this.handleAudioFileDrop}>
                <p>Mix:</p>
              </Dropzone>
            </div>
            <aside>
              <ul>
                { this.state.audioFile.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>) }
              </ul>
            </aside>

            <div id="mix-form-art" className="dropzone">
              <Dropzone onDrop={this.handleArtDrop}>
                <p>Art:</p>
              </Dropzone>
            </div>
            <aside>
              <ul>
                { this.state.art.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>) }
              </ul>
            </aside>
          </section>
        </div>

        <input id="mix-form-submit" type="submit" className="button" value="Submit"/>
      </form>
    )
  }
}

export default MixForm;
