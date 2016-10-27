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
import store from '../../../core/channels-store';
import MessageManager from '../../MessageManager';

import './index.scss';

export default class NewChannel extends Component {
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
              Créer un channel
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form id="categoryForm" onSubmit={e => this.saveChannel(e)} >
              <fieldset>
                <ControlLabel>
                  Titre
                </ControlLabel>
                <FormControl
                  onChange={ e => this.handleChange(e, 'title') }
                  type="text"
                  label="Titre"
                  placeholder="Entrez le nom du channel"
                  value={this.state.title}
                />
                <MarkdownTextArea
                  onChange={ e => this.handleChange(e, 'description') }
                  label="Description"
                  placeholder="Entrez la description (Markdown supporté)"
                  value={this.state.description}
                />

                <ButtonToolbar>
                  <Button onClick={() => this.close()} className="new-category-buttons"><Glyphicon glyph="remove" /> Cancel</Button>
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
      MessageManager.displayMessage(response, "Channel créé");
      this.close();
      if (!response.isInError) {
        this.context.router.push(`/`);
      }
    });
  }
}
NewChannel.contextTypes = {
  router: PropTypes.object.isRequired,
};
