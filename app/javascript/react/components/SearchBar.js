import React, { Component } from 'react'

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vibes: [],
      searchField: '',
      searchResultShow: false
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleFieldSubmit = this.handleFieldSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false)
  }

  componentWillUnmount() {
    debugger
    document.addEventListener('mousedown', this.handleClick, false)
  }

  handleClick (event) {
    let searchFieldPosition = document.getElementById('search-field').getBoundingClientRect()
    if (event.clientX < searchFieldPosition.left ||
        event.clientX > searchFieldPosition.right ||
        event.clientY < searchFieldPosition.top ||
        event.clientY > searchFieldPosition.bottom) {
      this.setState({ searchResultShow: false })
    }
  }

  handleFieldChange(event) {
    this.setState({ searchField: event.target.value })
  }

  handleFieldSubmit(event) {
    event.preventDefault()
    const payload = JSON.stringify({
      search_field: this.state.searchField
    })
    fetch('/api/v1/vibes/search.json', {
      method: 'POST',
      body: payload,
      credentials: 'same-origin',
      headers: { 'Accept': 'application/json',
                'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({ vibes: body.vibes,
                      searchResultShow: true })
    })
  }

  render() {
    let vibeSearch = ''
    let vibeSearchUl = ''

    if (this.state.searchResultShow) {
      if (this.state.vibes.length > 0) {
        vibeSearch = this.state.vibes.map( vibe => {
          let link = `/vibes/${vibe.id}`
          return(
            <li className="columns search-list-li" key={vibe.id}>
              <a href={link}>{vibe.name}</a>
            </li>
          )
        })
      } else {
        vibeSearch = <li className="search-list-li">no results :(</li>
      }
      vibeSearchUl = <ul className="row search-list">
                      {vibeSearch}
                     </ul>
    } else {
      vibeSearch = ''
      vibeSearchUl = ''
    }

    return (
      <div id='search-bar' ref={node => this.node = node }>
        <form id="search-field" className='sample eleven' onSubmit={this.handleFieldSubmit}>
          <input type='text'
                 name='searchField'
                 value={this.state.searchField}
                 onChange={this.handleFieldChange}
                 placeholder=''
          />
          <button type="submit" className="btn btn-search">
            <i className="fa fa-search"></i>
          </button>
          {vibeSearchUl}
        </form>
      </div>
    )
  }
}

export default SearchBar;
