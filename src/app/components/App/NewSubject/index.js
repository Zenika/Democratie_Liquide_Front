import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';

import ProposalForm from './ProposalForm';
import MarkdownTextArea from '../../MarkdownTextArea';

import { LinkContainer } from 'react-router-bootstrap';
import store from '../../../core/subjects-store';
import MessageManager from '../../MessageManager';

import './index.scss';

export default class NewSubject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      propositions: [{}, {}],
    };
  }

  render() {
    const { categories, channels, selectedCategory, selectedChannel } = this.props;
    const { propositions } = this.state;

    return (
        <Modal show={this.props.show} onHide={()=>this.close()}>
          <Modal.Header closeButton>
            <Modal.Title>Créez votre sujet</Modal.Title>
            </Modal.Header>
          <Modal.Body>

            <ProposalForm
              categories={categories}
              selectedCategory={selectedCategory}
              selectedChannel={selectedChannel}
              channels={channels}
              propositions={propositions}
              saveSubject={subject => this.saveSubject(subject)}
              close={() => this.close()}
            />
          </Modal.Body>
        </Modal>
    );
  }

  close() {
    this.props.onClose();
  }

  saveSubject(subject) {
    this.props.saveSubject(subject).then((response) => {
      MessageManager.displayMessage(response, "Sujet créé");
      this.close();
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
