import React, { Component, PropTypes } from 'react';
import {
  Modal,
  ControlLabel,
  FormControl,
  ButtonToolbar,
  Button,
  Glyphicon
} from 'react-bootstrap';
import MarkdownTextArea from '../../MarkdownTextArea';

import { LinkContainer } from 'react-router-bootstrap';
import store from '../../../core/categories-store';
import MessageManager from '../../MessageManager';

import './index.scss';

export default class NewCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
    };
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={()=>this.close()}>
        <Modal.Header closeButton>
          <Modal.Title>
            Créer une catégorie
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="categoryForm" onSubmit={e => this.saveCategory(e)} >
            <fieldset>
              <ControlLabel>
                Titre
              </ControlLabel>
              <FormControl
                onChange={ e => this.handleChange(e, 'title') }
                type="text"
                placeholder="Entrez votre titre..."
                value={this.state.title}
              />
              <MarkdownTextArea
                onChange={ e => this.handleChange(e, 'description') }
                label="Description"
                placeholder="Entrez votre description... (Markdown supporté)"
                value={this.state.description}
              />
              <ButtonToolbar>
                <Button onClick={() => this.close()} className="new-category-buttons">
                  <Glyphicon glyph="remove"/> Cancel
                </Button>
                <Button className="new-category-buttons" type="submit" bsStyle="success" >
                  Save
                </Button>
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
      MessageManager.displayMessage(response, "Catégorie créée");
      this.close();
      if (!response.isInError) {
        this.context.router.push(`/`);
      }
    });
  }
}
NewCategory.contextTypes = {
  router: PropTypes.object.isRequired,
};
