import React, { Component } from 'react'
import Modal from 'react-awesome-modal';

const IdeaSummary = ( props => {
  let modal, description = modal = ""
  let idea = props.idea
  if (Object.keys(idea).length > 0) {
    let user = props.users[idea.user_id - 1]
    description = idea.description
    modal = <Modal
              visible={props.ideaOpen}
              width="50%"
              height="35%"
              effect="fadeInUp"
              onClickAway={() => props.openCloseIdea()}
            >
              <div id="idea-header-bar columns">
                <img src={user.pro_pic.url} className="user-photo" id="idea-user" />
                <div id="idea-username">{user.username}</div>
              </div>
              <div id="idea-title">{idea.title}</div>
              <div id="idea-description">{description}</div>
              <i className="far fa-lightbulb ideas" id="idea-lightbulb"></i>
            </Modal>
  }

  return (
    <div id="idea-summary">
      {modal}
    </div>
  )
})

export default IdeaSummary
