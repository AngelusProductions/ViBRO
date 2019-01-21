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
    .then(response => response.json())
    .then(body => {
      if (body != null) {
        this.setState({ currentUser: body.user })
      }
    })
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
    let dropdownMenu, userName
    let logLink = ""
    let userLink = ""
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
        userName = <a href={userPath} className="hamburger-user-name">{this.state.currentUser.username}</a>
      } else {
        dropdownMenu = <div className="hamburger-menu">
                          <ul>
                            <li className="small-12 columns hamburger-li" id="first-hamburger-li"><a href="/">home</a></li>
                            <li className="small-12 columns hamburger-li"><a href="/users/sign_in">sign in</a></li>
                            <li className="small-12 columns hamburger-li"><a href="/users/sign_up">sign up</a></li>
                          </ul>
                        </div>
      userName = <a href="/users/sign_in" className="hamburger-user-name">sign in</a>
      }
    } else {
      if (this.state.currentUser != null) {
        let userPath = "/users/" + this.state.currentUser.id
        userName = <a href={userPath} className="hamburger-user-name">{this.state.currentUser.username}</a>
      } else {
        userName = <a href="/users/sign_in" className="hamburger-user-name">sign in</a>
      }
    }

    return (
      <div className="hamburger-container">
        {userName}
        {icon}
        {dropdownMenu}
      </div>
    )
  }
}

export default Hamburger
