import React, { Component } from 'react'

class MixSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.vibePlaying.mixes.length
    }
  }

  render() {
    let options = this.props.vibePlaying.mixes.map( mix => {
        if (this.props.mixSelect === mix.id) {
          return <option value={mix.number} key={mix.number} selected>{mix.number}</option>
        } else {
          return <option value={mix.number} key={mix.number}>{mix.number}</option>
        }
      })

    return (
      <div className="row mix-info-container" id="mix-select-container">
        <ul className="row" id="mix-select-ul">
          <li className="row" id="mix-select-label">mix:</li>
          <li className={this.props.size(9, "columns")} >
            <select name="mix-select" id="mix-select" onChange={this.props.mixSelectClick}>
              {options.reverse()}
            </select>
          </li>
        </ul>
	    </div>
    )
  }
}

export default MixSelect
