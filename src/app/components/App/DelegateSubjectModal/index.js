import React, { Component, PropTypes } from 'react';

import powersStore from '../../../core/powers-store';

import {
  Panel,
  Modal,
  Glyphicon,
  Button
} from 'react-bootstrap';

import './index.scss';
import MessageManager from '../MessageManager';
import Messagebar from '../../Messagebar';

export default class DelegateSubjectModal extends MessageManager {

  constructor(props){
    super(props);
    this.state = {
      emails:[
        'stephane.allaire@zenika.com',
        'benoit.averty@zenika.com',
        'alexandre.baron@zenika.com',
        'julie.bourhis@zenika.com',
        'antoine.cailly@zenika.com',
        'corentin.cocoual@zenika.com',
        'guillaume.gerbaud@zenika.com',
        'armel.gouriou@zenika.com',
        'serge.hardy@zenika.com',
        'herri.heas@zenika.com',
        'alan.menant@zenika.com',
        'delphine.millet@zenika.com',
        'martin.mouterde@zenika.com',
        'maxime.odye@zenika.com',
        'kevin.pennarun@zenika.com',
        'benjamin.plouzennec@zenika.com',
        'mathieu.pousse@zenika.com',
        'sylvain.revereault@zenika.com',
        'herminael.rougier@zenika.com	',
        'erwann.thebault@zenika.com',
        'sandra.parlant@zenika.com',
        'benoit.travers@zenika.com'
      ]
    };
  }

  close() {
    this.handleAlertDismiss();
    this.props.onClose(false);
  }

  selectEmail(e) {
    var email = e.target.textContent;
    powersStore.givePower(this.props.subject, email).then( (response) => {
      this.displayMessage(response, "Délégation effectuée à " + email);
    })
  }

  render() {
    var renderEmail = (email,key) => {
      return (
        <li key={key} className="delegate-item" onClick={e =>this.selectEmail(e)}>{email}</li>
      )
    }
    return (
      <Modal show={this.props.show} onHide={()=>this.close()}>
          <Modal.Header closeButton>
            <Modal.Title>Délégation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Messagebar message = {this.state.message} isMessageSuccessVisible = {this.state.isMessageSuccessVisible}  isMessageDangerVisible = {this.state.isMessageDangerVisible} handleAlertDismiss = {() => this.handleAlertDismiss()} />
            <p>Choisissez la personne à qui vous souhaitez déléguer votre vote.</p>
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
DelegateSubjectModal.propTypes= {
  show : PropTypes.bool.isRequired,
  onClose : PropTypes.func.isRequired,
  subject : PropTypes.object.isRequired
};
