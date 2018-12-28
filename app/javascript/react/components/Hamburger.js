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
      if (body != null) {
        this.setState({ currentUser: body.user })
      }
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

  handleSearch

  render() {
    let logLink = ""
    let userLink = ""
    let dropdownMenu = ""

    let icon = <i onClick={this.handleHamburgerClick} className={this.state.hamburgerClass}></i>

    if (this.state.dropdownShow) {
      if (this.state.currentUser != null) {
        let userPath = "/users/" + this.state.currentUser.id
        dropdownMenu = <div className="hamburger-menu">
                          <ul className="row">
                            <li className="small-12 columns hamburger-li" id="first-hamburger-li"><a href="/">home</a></li>
                            <li className="small-12 columns hamburger-li"><a href={userPath}>my page</a></li>
                            <li className="small-12 columns hamburger-li"><a href="/users/edit">settings</a></li>
                            <li className="small-12 columns hamburger-li"><a className="sign-out"
                                   href="/users/sign_out"
                                   rel="nofollow"
                                   data-method="delete"
                                >sign out</a></li>
                          </ul>
                        </div>
      } else {
        dropdownMenu = <div className="hamburger-menu">
                          <ul>
                            <li className="small-12 columns hamburger-li" id="first-hamburger-li"><a href="/">home</a></li>
                            <li className="small-12 columns hamburger-li"><a href="/users/sign_in">sign in</a></li>
                            <li className="small-12 columns hamburger-li"><a href="/users/sign_up">sign up</a></li>
                          </ul>
                        </div>
      }
    }

    return (
      <div className="hamburger-container">
        {icon}
        {dropdownMenu}
      </div>
    )
  }
}

export default Hamburger;
