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

export default class NewChannel extends MessageManager {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
    };
  }

  render() {
    const { isMessageSuccessVisible, isMessageDangerVisible, message } = this.state;

    return (
      <Modal show={this.props.show} onHide={()=>this.close()}>
      <Modal.Header closeButton>
        <Modal.Title>Liste des channels</Modal.Title>
      </Modal.Header>
        <Modal.Body>
          
        </Modal.Body>
      </Modal>
    );
  }

  handleChange(e, fieldName) {
    e.preventDefault();
    this.setState({ [fieldName]: e.target.value });
  }

  close() {
    this.handleAlertDismiss();
    this.props.onClose();
  }

  saveChannel(e) {
    e.preventDefault();
    const {
      title,
      description,
    } = this.state;

    store.createChannel({
      title,
      description,
    })
    .then((response) => {
      this.displayMessage(response, "Catégorie créée");
      if (!response.isInError) {
        this.context.router.push(`/`);
      }
    });
  }
}
NewChannel.contextTypes = {
  router: PropTypes.object.isRequired,
};
