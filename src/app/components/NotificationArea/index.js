import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Alert
} from 'react-bootstrap';


import './index.scss';

class NotificationArea extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: '', // info, success, warning, error
      message: '',
    };

    this.timeout = null;
  }

  close() {
    this.setState({ type: '' });
  }

  notify(type, message, duration) {

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.close(), duration);

    this.setState({
      type: type,
      message: message,
    });
  }

  notifySuccess(message) {
    this.notify('success', message, 5000);
  }

  notifyInfo(message) {
    this.notify('info', message, 5000);
  }

  notifyWarning(message) {
    this.notify('warning', message, 5000);
  }

  notifyError(message) {
    this.notify('danger', message, 5000);
  }

  render() {
      return (
        <div className={'notification-area ' + (this.state.type === '' ? '' : 'visible')}>
          <Alert
            bsStyle={this.state.type || 'info'}
            onDismiss={() => this.close()}
            className='notification'
          >
            <h3>{this.state.message}</h3>
          </Alert>
        </div>
      );
  }
}

export default ReactDOM.render(
  <NotificationArea/>,
  document.getElementById('notification')
);
