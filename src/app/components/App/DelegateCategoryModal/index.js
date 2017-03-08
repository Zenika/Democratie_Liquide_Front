import React, { Component, PropTypes } from 'react';
import {
  Panel,
  Modal,
  Glyphicon,
  Button
} from 'react-bootstrap';

import emails from '../../../datas/emails.json';
import powersStore from '../../../core/powers-store';

import './index.scss';
import MessageManager from '../../MessageManager';

export default class DelegateCategoryModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      emails,
    };
  }

  close() {
    this.props.onClose();
  }

  selectEmail(e) {
    var email = e.target.textContent;
    powersStore.giveCategoryPower(this.props.category.uuid, email).then((response) => {
        MessageManager.displayMessage(response, "Délégation effectuée à " + email);
        this.close();
    });
  }

  render() {
    var renderEmail = (email, key) =>  (
      <li key={key} className="delegate-item" onClick={e =>this.selectEmail(e)}>{email}</li>
    );

    return (
      <Modal show={this.props.show} onHide={()=>this.close()}>
          <Modal.Header closeButton>
            <Modal.Title>Délégation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Choisissez la personne à qui vous souhaitez déléguer votre vote pour la catégorie sélectionnée.</p>
            <ul>
              {this.state.emails.map(renderEmail)}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={()=>this.close()}>Close</Button>
          </Modal.Footer>
        </Modal>
    );
  }
}
DelegateCategoryModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
};
