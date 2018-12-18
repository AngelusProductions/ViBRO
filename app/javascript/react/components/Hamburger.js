import React, { Component } from 'react'
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown'

class Hamburger extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hamburgerClass: "fas fa-bars",
      dropdownShow: false,
      currentUser: null
    }
    this.handleHamburgerClick = this.handleHamburgerClick.bind(this)
  }

  componentDidMount() {
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
      this.setState({ currentUser: body })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleHamburgerClick () {
    if (this.state.hamburgerClass === "fas fa-bars") {
      this.setState({ hamburgerClass: "fas fa-times",
                      dropdownShow: true })
    } else {
      this.setState({ hamburgerClass: "fas fa-bars",
                      dropdownShow: false })
    }
  }

  render() {
    let logLink = ""
    let dropdownMenu = ""

    let icon = <i onClick={this.handleHamburgerClick} className={this.state.hamburgerClass}></i>

    if (this.state.dropdownShow) {
      if (currentUser) {
        let userPath = "/users/" + this.state.currentUser.id.toString()
        let userLink = <a href={userPath}>my page</a>
        let logLink = <a href="/users/sign_out">sign out</a>
      } else {
        let logLink = ""
      }
      dropdownMenu = <div className="navbar">
                      {userLink}
                      <a href="/users/edit">settings</a>
                      {logLink}

    </div>
    }

    return (
      <div>
        {icon}
        {dropdownMenu}
      </div>
    )
  }
}

export default Hamburger;
