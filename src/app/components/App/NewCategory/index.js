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
import store from '../../../core/categories-store';
import MessageManager from '../MessageManager';
import Messagebar from '../../Messagebar';

import './index.scss';

export default class NewCategory extends MessageManager {
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
        <Modal.Title>Délégation</Modal.Title>
      </Modal.Header>
        <Modal.Body>
          <Messagebar message = {this.state.message} isMessageSuccessVisible = {this.state.isMessageSuccessVisible}  isMessageDangerVisible = {this.state.isMessageDangerVisible} handleAlertDismiss = {() => this.handleAlertDismiss()} />
          <form id="categoryForm" onSubmit={e => this.saveCategory(e)} >
            <fieldset>
              <legend>New Category</legend>
              <FormControl onChange={ e => this.handleChange(e, 'title') } type="text" label="Titre" placeholder="Entrez votre titre..." />
              <MarkdownTextArea onChange={ e => this.handleChange(e, 'description') }
                label="Description" placeholder="Entrez votre description... (Markdown supporté)"/>

              <ButtonToolbar>
                <LinkContainer to={{ pathname: '/' }}>
                  <Button className="new-category-buttons"><Glyphicon glyph="remove" /> Cancel</Button>
                </LinkContainer>
                <Button className="new-category-buttons" type="submit" bsStyle="success" >Save</Button>
              </ButtonToolbar>
            </fieldset>
          </form>
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

  saveCategory(e) {
    e.preventDefault();
    const {
      title,
      description,
    } = this.state;

    store.createCategory({
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
NewCategory.contextTypes = {
  router: PropTypes.object.isRequired,
};
