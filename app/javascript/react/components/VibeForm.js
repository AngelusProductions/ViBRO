import React, { Component } from 'react'
import Dropzone from 'react-dropzone'

class VibeForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vibeName: "",
      vibeBlurb: "",
      vibeArt: [],
      mixName: "",
      mixBlurb: "",
      mixColor: "",
      mixBPM: "",
      mixArt: [],
      mixAudioFile: [],
      vibeShow: true,
      mixShow: false,
      currentUser: null,
      message: ""
    }
    this.handleVibeNameChange = this.handleVibeNameChange.bind(this)
    this.handleVibeBlurbChange = this.handleVibeBlurbChange.bind(this)
    this.handleVibeArtDrop = this.handleVibeArtDrop.bind(this)
    this.handleVibeSubmit = this.handleVibeSubmit.bind(this)

    this.handleMixNameChange = this.handleMixNameChange.bind(this)
    this.handleMixBlurbChange = this.handleMixBlurbChange.bind(this)
    this.handleMixBPMChange = this.handleMixBPMChange.bind(this)
    this.handleMixColorChange = this.handleMixColorChange.bind(this)
    this.handleMixAudioFileDrop = this.handleMixAudioFileDrop.bind(this)
    this.handleMixArtDrop = this.handleMixArtDrop.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.handleBackClick = this.handleBackClick.bind(this)
  }

  componentDidMount() {
    // get lineups
    fetch('/api/v1/current_user')
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
      this.setState({ currentUser: body.user })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleVibeNameChange (event) {
    this.setState({ vibeName: event.target.value })
  }

  handleVibeBlurbChange (event) {
    this.setState({ vibeBlurb: event.target.value })
  }

  handleVibeArtDrop (file) {
    if (file.length == 1) {
      this.setState({ vibeArt: file })
    } else {
      this.setState({ message: 'only one pic at a time!'})
    }
  }

  handleVibeSubmit(event) {
    event.preventDefault()
    this.setState({ vibeShow: false,
                    mixShow: true })
  }

  handleBackClick () {
    event.preventDefault()
    this.setState({ vibeShow: true,
                    mixShow: false })
  }

  handleMixNameChange (event) {
    this.setState({ mixName: event.target.value })
  }

  handleMixBlurbChange (event) {
    this.setState({ mixBlurb: event.target.value })
  }

  handleMixBPMChange (event) {
    this.setState({ mixBPM: event.target.value })
  }

  handleMixColorChange (event) {
    this.setState({ mixColor: event.target.value })
  }

  handleMixArtDrop (file) {
    if (file.length == 1) {
      this.setState({ mixArt: file })
    } else {
      this.setState({ message: 'only one pic at a time!'})
    }
  }

  handleMixAudioFileDrop (file) {
    if (file.length == 1) {
      this.setState({ mixAudioFile: file })
    } else {
      this.setState({ message: 'only one mix at a time!'})
    }
  }

  handleSubmit(event) {
    event.preventDefault()

    let payload = new FormData()
    payload.append("vibeName", this.state.vibeName)
    payload.append("vibeBlurb", this.state.vibeBlurb)
    payload.append("vibeArt", this.state.vibeArt[0])
    payload.append("currentUserId", this.state.currentUser.id)

    payload.append("mixName", this.state.mixName)
    payload.append("mixBlurb", this.state.mixBlurb)
    payload.append("mixBPM", parseInt(this.state.mixBPM))
    payload.append("mixColor", this.state.mixColor)
    payload.append("mixArt", this.state.mixArt[0])
    payload.append("mixAudioFile", this.state.mixAudioFile[0])

    fetch(`/api/v1/vibes`, {
      method: 'POST',
      body: payload,
      credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {

    let vibeForm = ""
    let mixForm = ""

    if (this.state.vibeShow) {
      vibeForm = <form onSubmit={this.handleVibeSubmit} className="form small-6 column center" id="vibe-form">
                    <h1 id="new-vibe-title">new vibe</h1>

                    <div className="vibe-form-field" id="vibe-form-name">
                      <label htmlFor="vibeName">what do you call it?</label>
                      <input type="text" id="vibeName" name="vibeName" value={this.state.vibeName} onChange={this.handleVibeNameChange}/>
                    </div>

                    <div className="vibe-form-field" id="vibe-form-blurb">
                      <label htmlFor="vibeBlurb">what is the goal?</label>
                      <input type="text" id="vibeBlurb" name="vibeBlurb" value={this.state.vibeBlurb} onChange={this.handleVibeBlurbChange} />
                    </div>

                    <div id="vibe-form-art" className="dropzone">
                      <Dropzone onDrop={this.handleVibeArtDrop}>
                        <p>art</p>
                      </Dropzone>
                    </div>

                    <aside>
                      <ul>
                        { this.state.vibeArt.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>) }
                      </ul>
                    </aside>

                    <input id="vibe-form-submit" type="submit" className="button" value="upload mix"/>
                </form>
    } else {
      vibeForm = ""
    }

    if (this.state.mixShow) {
      mixForm = <div>
                  <form onSubmit={this.handleSubmit} className="form small-6 column center" id="mix-form">
                    <i className="fas fa-caret-left fa-4x" onClick={this.handleBackClick}></i>
                    <h1 id="first-mix-title">first mix</h1>

                    <div className="mix-form-field" id="mix-form-name">
                      <label htmlFor="mixName">describe it!</label>
                      <input type="text" id="mixName" name="mixName" value={this.state.mixName} onChange={this.handleMixNameChange}/>
                    </div>

                    <div className="mix-form-field" id="mix-form-blurb">
                      <label htmlFor="mixBlurb">what does it need?</label>
                      <input type="text" id="mixBlurb" name="mixBlurb" value={this.state.mixBlurb} onChange={this.handleMixBlurbChange} />
                    </div>

                    <div className="mix-form-field" id="mix-form-bpm">
                      <label htmlFor="mixBPM">bpm?</label>
                      <input type="text" id="mixBPM" name="mixBPM" value={this.state.mixBPM} onChange={this.handleMixBPMChange}/>
                    </div>

                    <div className="mix-form-field" id="mix-form-color">
                      <label htmlFor="mixColor">choose a color:</label>
                      <select id="color-dropdown" name="mixColor" value={this.state.mixColor} onChange={this.handleMixColorChange}>
                        <option value="blue">blue</option>
                        <option value="purple">purple</option>
                        <option value="pink">pink</option>
                        <option value="green">green</option>
                      </select>
                    </div>

                    <section className="dropzone-section">
                      <div id="mix-form-audio-file" className="dropzone">
                        <Dropzone onDrop={this.handleMixAudioFileDrop}>
                          <p>audio file</p>
                        </Dropzone>
                      </div>
                      <aside>
                        <ul>
                          { this.state.mixAudioFile.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>) }
                        </ul>
                      </aside>
                    </section>

                    <input id="mix-form-submit" type="submit" className="button" value="submit"/>
                  </form>
                </div>
    } else {
      mixForm = ""
    }

    return (
      <div>
        <span className="flash">{this.state.message}</span>
        {vibeForm}
        {mixForm}
      </div>
    )
  }
}

export default VibeForm;
