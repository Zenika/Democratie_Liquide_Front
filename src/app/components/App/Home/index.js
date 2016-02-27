import React, { Component, PropTypes } from 'react';

import {
  Button,
  Glyphicon
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import SubjectsList from '../SubjectsList';
import Spinner from '../../Spinner';

import store from '../../../core/subjects-store';

export default class Home extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
      isDataResolved: false,
    };
  }

  componentDidMount() {
    store.getSubjects()
    .then(subjects => {
      this.setState({
        subjects: subjects,
        isDataResolved: true
      });
    });
  }

  render() {
    const { subjects, isDataResolved } = this.state;
    if (!isDataResolved) {
      return <Spinner />;
    }
    return (
      <div>
        <LinkContainer to="/subjects/new">
          <Button bsStyle="success" bsSize="large" className="pull-right"><Glyphicon glyph="plus" /> Create</Button>
        </LinkContainer>  
        <h2>Subjects in progress</h2>
        <SubjectsList subjects={ subjects } onSelect={ subject => this.context.router.push(`/subjects/${subject.uuid}`) }></SubjectsList>
      </div>
    );
  }
}
Home.contextTypes= {
  router: PropTypes.object.isRequired
};