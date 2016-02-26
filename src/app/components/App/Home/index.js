import React, { Component } from 'react';

import {
  Button,
  Glyphicon
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import SubjectsList from '../SubjectsList';

import store from '../../../core/subjects-store';

export default class Home extends Component {
  
  constructor(props) {
    super(props);
    this.state = {subjects: []};
  }

  componentDidMount() {
    store.getSubjects()
      .then(subjects => {
        this.setState({
          subjects: subjects
        });
      })
  }

  render() {
    const { subjects } = this.state;
    return (
      <div>
        <LinkContainer to="/subjects/new">
          <Button bsStyle="success" bsSize="large" className="pull-right"><Glyphicon glyph="plus" /> Create</Button>
        </LinkContainer>  
        <h2>Subjects in progress</h2>
        <SubjectsList subjects={ subjects }></SubjectsList>
      </div>
    );
  }
}