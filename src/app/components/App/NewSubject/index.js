import React, { Component, PropTypes } from 'react';
import {
  Well,
  Input,
  ButtonInput,
  ButtonToolbar,
  Button,
  Glyphicon
} from 'react-bootstrap';
import MarkdownTextArea from '../../MarkdownTextArea';

import { LinkContainer } from 'react-router-bootstrap';
import NewProposal from './NewProposal';
import store from '../../../core/subjects-store';
import MessageManager from '../MessageManager';
import Messagebar from '../../Messagebar';

import './index.scss';

export default class NewSubject extends MessageManager {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      maxPoints: 1,
      propositions: [{}, {}]
    };
  }

  render() {
    const { propositions, isMessageSuccessVisible, isMessageDangerVisible, message } = this.state;

    const createProposal = (proposition, i) => (
      <NewProposal key={ i } rank={ i }
        onChange={ (i, proposal) => this.setProposal(i, proposal) } />
    );

    return (
      <Well>
        <Messagebar message = {this.state.message} isMessageSuccessVisible = {this.state.isMessageSuccessVisible}  isMessageDangerVisible = {this.state.isMessageDangerVisible} handleAlertDismiss = {() => this.handleAlertDismiss()} />
        <form onSubmit={e => this.saveSubject(e)} >
          <fieldset>
            <legend>New Subject</legend>
            <Input onChange={ e => this.handleChange(e, 'title') } type="text" label="Titre" placeholder="Entrez votre titre..." />
            <MarkdownTextArea onChange={ e => this.handleChange(e, 'description') }
              label="Description" placeholder="Entrez votre description... (Markdown supporté)"/>

              <Input onChange={ e => this.handleChange(e, 'maxPoints') } type="number" defaultValue="1" label="Nombre de points à répartir " placeholder="Nombre de points à répartir en dot voting." />

            { propositions.map(createProposal) }
            <Button className="new-subject-buttons" onClick={ e => this.addProposal(e) }><Glyphicon glyph="plus" /> Ajouter une réponse</Button>

            <ButtonToolbar>
              <LinkContainer to={ {pathname: '/'} }>
                <Button className="new-subject-buttons"><Glyphicon glyph="remove" /> Cancel</Button>
              </LinkContainer>
              <ButtonInput className="new-subject-buttons" type="submit" bsStyle="success" value="Save" />
            </ButtonToolbar>
          </fieldset>
        </form>
      </Well>
    );
  }

  handleChange(e, fieldName) {
    e.preventDefault();
    this.setState({[fieldName]: e.target.value});
  }

  addProposal(e) {
    e.preventDefault();
    this.setState({
      propositions: [...this.state.propositions, {}]
    });
  }

  setProposal(i, proposal) {
    const { propositions }= this.state;
    propositions[i] = proposal;
    this.setState({
      propositions: propositions
    });
  }

  saveSubject(e) {
    e.preventDefault()
    const {
      title,
      description,
      maxPoints,
      propositions
    } = this.state;

    store.createSubject({
      title,
      description,
      maxPoints,
      propositions
    })
    .then((response) => {
      this.displayMessage(response, "Sujet créé");
      if (response.error == false) {
        var subjectId = response.subjectId;
        this.context.router.push(`/subjects/${subjectId}`);
      }
    });
  }
}
NewSubject.contextTypes= {
  router: PropTypes.object.isRequired
};
