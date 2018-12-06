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
      mixBPM: 0,
      mixArt: [],
      mixAudioFile: [],
      vibeShow: true,
      mixShow: false,
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

    payload.append("mixName", this.state.mixName)
    payload.append("mixBlurb", this.state.mixBlurb)
    payload.append("mixBPM", parseInt(this.state.mixBPM))
    payload.append("mixColor", this.state.mixColor)
    payload.append("mixArt", this.state.mixArt[0])
    payload.append("mixAudioFile", this.state.mixAudioFile[0])

    fetch(`/api/v1/vibes`, {
      method: 'POST',
      body: JSON.stringify(payload),
      credentials: 'same-origin',
      headers: {
       'Content-Type': 'application/json',
       'X-Requested-With': 'XMLHttpRequest'
      }
    })
    .then(response => response.json())
    .then(body => {
      debugger
    })
  }

  render() {
    let vibeForm = ""
    let mixForm = ""

    if (this.state.vibeShow) {
      vibeForm = <form onSubmit={this.handleVibeSubmit} className="form small-6 column center" id="vibe-form">
                    <h1 id="new-vibe-title">new vibe</h1>

                    <div className="vibe-form-field" id="vibe-form-name">
                      <label htmlFor="vibeName">what do you call it?</label>
                      <input type="text" id="vibeName" name="vibeName" onChange={this.handleVibeNameChange}/>
                    </div>

                    <div className="vibe-form-field" id="vibe-form-blurb">
                      <label htmlFor="vibeBlurb">what is the goal?</label>
                      <input type="text" id="vibeBlurb" name="vibeBlurb" onChange={this.handleVibeBlurbChange} />
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
      mixForm = <form onSubmit={this.handleSubmit} className="form small-6 column center" id="mix-form">
                  <h1 id="new-mix-title">first mix</h1>

                  <div className="mix-form-field" id="mix-form-name">
                    <label htmlFor="mixName">describe it!</label>
                    <input type="text" id="mixName" name="mixName" onChange={this.handleMixNameChange}/>
                  </div>

                  <div className="mix-form-field" id="mix-form-blurb">
                    <label htmlFor="mixBlurb">what does it need?</label>
                    <input type="text" id="mixBlurb" name="mixBlurb" onChange={this.handleMixBlurbChange} />
                  </div>

                  <div className="mix-form-field" id="mix-form-bpm">
                    <label htmlFor="mixBPM">bpm?</label>
                    <input type="text" id="mixBPM" name="mixBPM" onChange={this.handleMixBPMChange}/>
                  </div>

                  <div className="mix-form-field" id="mix-form-color">
                    <label htmlFor="mixColor">choose a color:</label>
                    <select id="color-dropdown" name="mixColor" onChange={this.handleMixColorChange}>
                      <option value="blue">blue</option>
                      <option value="purple">purple</option>
                      <option value="pink">pink</option>
                      <option value="green">green</option>
                    </select>
                  </div>

                  <div id="dropzones">
                    <section className="dropzone-section">
                      <div id="mix-form-art" className="dropzone">
                        <Dropzone onDrop={this.handleMixArtDrop}>
                          <p>art</p>
                          </Dropzone>
                      </div>
                      <aside>
                        <ul>
                          { this.state.mixArt.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>) }
                        </ul>
                      </aside>
                    </section>
                  </div>
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

                  <input id="mix-form-submit" type="submit" className="button" value="Submit"/>
                </form>
    } else {
      mixForm = ""
    }

    return (
      <div>
        {vibeForm}
        {mixForm}
      </div>
    )
  }
}

export default VibeForm;
