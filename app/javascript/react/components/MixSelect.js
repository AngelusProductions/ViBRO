import React, { Component } from 'react'

class MixSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.vibePlaying.mixes.length
    }
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(event) {
    debugger
  }

  render() {
    let options = this.props.vibePlaying.mixes.map( mix => {
        return <option value={mix.number} key={mix.number}>{mix.number}</option>
      })

    return (
      <div className={this.props.size(12, "row mix-info-container")} id="mix-select-container">
        <ul className={this.props.size(12, "row")} id="mix-select-ul">
          <li className={this.props.size(3, "row")} id="mix-select-label">mix:</li>
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
