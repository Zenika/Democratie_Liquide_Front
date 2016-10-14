import React, { Component, PropTypes } from 'react';
import {
  Modal,
  FormControl,
  ButtonToolbar,
  Button,
  Glyphicon
} from 'react-bootstrap';
import MarkdownTextArea from '../../MarkdownTextArea';

import { LinkContainer } from 'react-router-bootstrap';
import store from '../../../core/channels-store';
import MessageManager from '../MessageManager';
import Messagebar from '../../Messagebar';

import './index.scss';

export default class ChannelsList extends MessageManager {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleChange(e, fieldName) {
    e.preventDefault();
    this.setState({ [fieldName]: e.target.value });
  }

  close() {
    this.handleAlertDismiss();
    this.props.onClose();
  }

  render() {
    const { isMessageSuccessVisible, isMessageDangerVisible, message } = this.state;

    return (
      <Modal className="channelsList" show={this.props.show} onHide={()=>this.close()}>
        <Modal.Header closeButton>
          <Modal.Title>Liste des channels</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <legend>Channels que vous pouvez rejoindre</legend>
          <ul>
            {
              this.props.unjoinedChannels.map((channel) =>
                <li>
                  <span className="people"><Glyphicon glyph="user"/>{channel.people.length}</span>
                  <span className="title">{channel.title}</span>
                  <span className="description">{channel.description}</span>
                  <Button className="action">
                    <Glyphicon glyph="log-in"/> Rejoindre
                  </Button>
                </li>
              )
            }
          </ul>

          <legend>Channels auxquels vous appartenez</legend>
          <ul>
            {
              this.props.joinedChannels.map((channel) =>
                <li>
                  <span className="people"><Glyphicon glyph="user"/>{channel.people.length}</span>
                  <span className="title">{channel.title}</span>
                  <span className="description">{channel.description}</span>
                  <Button className="action">
                    <Glyphicon glyph="log-out"/> Quitter
                  </Button>
                </li>
              )
            }
            <li>
              <span className="people"><Glyphicon glyph="user"/>all</span>
              <span className="title">general</span>
              <span className="description">Le channel par défaut :)</span>
            </li>
          </ul>

        </Modal.Body>
      </Modal>
    );
  }
}
ChannelsList.contextTypes = {
  router: PropTypes.object.isRequired,
};
