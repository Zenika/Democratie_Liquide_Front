import React, { Component } from 'react';
import {
  Alert
} from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';

export default class Messagebar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const displayMessageSuccess = () => {
      if (this.props.isMessageSuccessVisible) {
        return (
          <Alert bsStyle="success" onDismiss={() => this.props.handleAlertDismiss()} dismissAfter={5000} className="fixed">
            <h2>{this.props.message}</h2>
          </Alert>
        )
      }
    };

    const displayMessageDanger = () => {
      if (this.props.isMessageDangerVisible) {
        return (
          <Alert bsStyle="danger" onDismiss={() => this.props.handleAlertDismiss()} dismissAfter={5000} className="fixed">
            <h2>{this.props.message}</h2>
          </Alert>
        )
      }
    };

    return (
      <div>
          { displayMessageSuccess() }
          { displayMessageDanger() }
      </div>
    );

  }

}
