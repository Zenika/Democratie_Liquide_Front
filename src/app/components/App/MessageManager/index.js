import React, { Component } from 'react';
import {
  Alert
} from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';

export default class MessageManager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isMessageSuccessVisible: false,
      isMessageDangerVisible: false,
      message: ""
    };
  }

  displayMessage(response, messageSuccess) {
      if (response.isInError) {
          this.setState({
            isMessageSuccessVisible : false,
            isMessageDangerVisible : true,
            message : response.msg
          });
      } else {
        this.setState({
          isMessageSuccessVisible : true,
          isMessageDangerVisible : false,
          message : messageSuccess
        });
      }
  }

  handleAlertDismiss() {
    this.setState({
      isMessageSuccessVisible : false,
      isMessageDangerVisible : false,
      message : ""
    });
  }
}
