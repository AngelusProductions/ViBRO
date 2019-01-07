import React, { Component } from 'react'
import Modal from 'react-awesome-modal';

const IdeaSummary = ( props => {
  let modal = ""

  if (props.ideaId) {
    let description = ""
    let idea = props.ideas[props.ideaId]
    let user = props.users[idea.user_id - 1]
    let url = user.pro_pic.url
    if (idea.description) {
      description = idea.description
    }

    modal = <Modal
              visible={props.ideaSummaryShow}
              width="50%"
              height="50%"
              effect="fadeInLeft"
              onClickAway={() => props.handleIdeaSummaryClose()}
            >
            <div id="idea-header-bar columns">
              <img src={url} className="user-photo" id="idea-user" />
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
