import React, { Component } from 'react'

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vibes: [],
      users: [],
      searchField: '',
      searchResultShow: false
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleFieldSubmit = this.handleFieldSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleKey = this.handleKey.bind(this)
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick)
    document.addEventListener('keydown', this.handleKey)
  }

  handleClick(event) {
    let searchFieldPosition = document.getElementById('search-field').getBoundingClientRect()
    if (event.clientX < searchFieldPosition.left ||
        event.clientX > searchFieldPosition.right ||
        event.clientY < searchFieldPosition.top ||
        event.clientY > searchFieldPosition.bottom) {
      this.setState({ searchResultShow: false })
    }

    if (event.target.href != undefined) {
      window.location = event.target.href
    }
  }

  handleKey(event) {
    if(event.keyCode === 27) {
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
      this.setState({ vibes: body.vibes })
    })
    fetch('/api/v1/users/search.json', {
      method: 'POST',
      body: payload,
      credentials: 'same-origin',
      headers: { 'Accept': 'application/json',
                'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({ users: body.users,
                      searchResultShow: true })
    })
  }

  render() {
    let vibeSearch = ''
    let userSearch = ''
    let vibeTitle = ''
    let userTitle = ''
    let searchUl = ''

    if (this.state.searchResultShow) {

      if (this.state.users.length > 0) {
        userSearch = this.state.users.map( user => {
          let link = `/users/${user.id}`
          return(
            <li className="columns search-list-li" key={user.id}>
            <a href={link}>{user.username}</a>
            </li>
          )
        })
      } else {
        userSearch = []
      }

      if (this.state.vibes.length > 0) {
        vibeSearch = this.state.vibes.map( vibe => {
          let link = `/vibes/${vibe.id}`
          return(
            <li className="columns search-list-li" key={vibe.id}>
              <a href={link}>{vibe.name}<div className="search-username">{vibe.user.username}</div></a>
            </li>
          )
        })
      } else {
        vibeSearch = []
      }

      if (this.state.vibes.length > 0 ||
          this.state.users.length > 0) {

        if (this.state.users.length > 0) {
          userTitle = <li className="search-divider"> artists </li>
        }

        if (this.state.vibes.length > 0) {
          vibeTitle = <li className="search-divider"> vibes </li>
        }

        searchUl = <ul className="row search-list">
                        {userTitle}
                        {userSearch}
                        {vibeTitle}
                        {vibeSearch}
                       </ul>
      } else {
        searchUl = <ul className="row search-list">
                      <li className="search-list-li"> no results :(</li>
                   </ul>
      }

    } else {
      searchUl = ''
    }

    return (
      <div id='search-bar'>
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
          {searchUl}
        </form>
      </div>
    )
  }
}

export default SearchBar;
