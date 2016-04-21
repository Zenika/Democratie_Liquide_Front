import React, { Component, PropTypes } from 'react';
import {
  Modal,
  Input,
  ButtonInput,
  ButtonToolbar,
  Button,
  Glyphicon,
  DropdownButton,
  MenuItem,
  FormControl
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
      category: undefined,
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
        <Modal show={this.props.show} onHide={()=>this.close()}>
          <Modal.Header closeButton>
            <Modal.Title>Délégation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Messagebar message = {this.state.message} isMessageSuccessVisible = {this.state.isMessageSuccessVisible}  isMessageDangerVisible = {this.state.isMessageDangerVisible} handleAlertDismiss = {() => this.handleAlertDismiss()} />
              <form onSubmit={e => this.saveSubject(e)} >
                <fieldset>
                  <legend>New Subject</legend>
                  <Input onChange={ e => this.handleChange(e, 'title') } type="text" label="Titre" placeholder="Entrez votre titre..." />
                  <MarkdownTextArea onChange={ e => this.handleChange(e, 'description') }
                    label="Description" placeholder="Entrez votre description... (Markdown supporté)"/>

                    <DropdownButton title={this.state.category == undefined ? "Catégorie..." : this.state.category.title} id="bg-nested-dropdown" onSelect={(eventKey,event) => this.change(event)}>
                            <MenuItem eventKey="-1">Aucune</MenuItem>
                      {
                        this.props.categories.map( (c,i) =>
                            <MenuItem eventKey={i}>{c.title}</MenuItem>
                        )
                      }
                    </DropdownButton>

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
            </Modal.Body>
        </Modal>
    );
  }

  change(event){
      this.setState({category: event < 0 ? undefined : this.props.categories[event]});
  }

  close() {
    this.handleAlertDismiss();
    this.props.onClose();
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
      category,
      propositions
    } = this.state;

    store.createSubject({
      title,
      description,
      maxPoints,
      category,
      propositions
    })
    .then((response) => {
      this.displayMessage(response, "Sujet créé");
      if (!response.isInError) {
        var subjectId = response.subjectId;
        console.log("redirect")
        this.context.router.push(`/subjects/${subjectId}`);
      }
    });
  }
}
