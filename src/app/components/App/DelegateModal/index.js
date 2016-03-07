import React, { Component, PropTypes } from 'react';

import {
  Panel,
  Modal,
  Glyphicon,
  Button
} from 'react-bootstrap';

//import './index.scss';

export default class DelegateModal extends Component {

  close() {
    this.props.onClose();
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={()=>this.close()}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={()=>this.close()}>Close</Button>
          </Modal.Footer>
        </Modal>
    );
  }
}
DelegateModal.propTypes= {
  show : PropTypes.bool.isRequired,
  onClose : PropTypes.func.isRequired
};
