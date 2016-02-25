import React, { Component } from 'react';

import {
  Button,
  Glyphicon
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import SubjectsList from '../SubjectsList';

export default class Home extends Component {
  render() {

    const testSubjects = [
      {uuid: 'uuii', title: 'subject One', description: 'Description One'},
      {uuid: 'rerer', title: 'subject Two', description: 'Description TwoTwoT'},
      {uuid: 'erere', title: 'subject Three', description: 'Description ThreeThreeThree'},
    ]

    return (
      <div>
        <LinkContainer to="/subjects/new">
          <Button bsStyle="success" bsSize="large" className="pull-right">Create <Glyphicon glyph="plus" /></Button>
        </LinkContainer>  
        <h2>Subjects in progress</h2>
        <SubjectsList subjects={testSubjects}></SubjectsList>
      </div>
    );
  }
}