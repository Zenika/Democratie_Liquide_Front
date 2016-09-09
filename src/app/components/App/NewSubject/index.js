import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';

import ProposalForm from './ProposalForm';
import MarkdownTextArea from '../../MarkdownTextArea';

import { LinkContainer } from 'react-router-bootstrap';
import store from '../../../core/subjects-store';
import MessageManager from '../MessageManager';
import Messagebar from '../../Messagebar';

import './index.scss';

export default class NewSubject extends MessageManager {
  constructor(props) {
    super(props);
    this.state = {
      propositions: [{}, {}],
    };
  }

  render() {
    const { categories } = this.props;
    const {
      propositions,
      isMessageSuccessVisible,
      isMessageDangerVisible,
      message,
    } = this.state;

    return (
        <Modal show={this.props.show} onHide={()=>this.close()}>
          <Modal.Header closeButton>
            <Modal.Title>Créez votre sujet</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <Messagebar
                message={this.state.message}
                isMessageSuccessVisible={this.state.isMessageSuccessVisible}
                isMessageDangerVisible={this.state.isMessageDangerVisible}
                handleAlertDismiss={() => this.handleAlertDismiss()}
              />

              <ProposalForm
                categories={categories}
                propositions={propositions}
                saveSubject={e => this.saveSubject(e)}
              />
            </Modal.Body>
        </Modal>
    );
  }

  close() {
    this.handleAlertDismiss();
    this.props.onClose();
  }

  saveSubject(subject) {

    store.createSubject(subject)
    .then((response) => {
      this.displayMessage(response, "Sujet créé");
      if (!response.isInError) {
        var subjectId = response.subjectId;
        this.context.router.push(`/subjects/${subjectId}`);
      }
    });
  }
}
NewSubject.contextTypes = {
  router: PropTypes.object.isRequired,
};
