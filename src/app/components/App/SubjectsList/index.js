import React, { Component, PropTypes } from 'react';

import {
  ListGroup,
  ListGroupItem,
  Button
} from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

export default class SubjectsList extends Component {

  render() {
    const { subjects } = this.props;

    const createSubjectEntry = subject => (
      <ListGroupItem key={subject.uuid} 
        href="#" onClick={ e => this.selectSubject(e, subject) }  header={subject.title}>
        <ReactMarkdown source={ subject.description } />
      </ListGroupItem>
    );

    return (
      <ListGroup>
        {subjects.map(createSubjectEntry)}
      </ListGroup>
    );
  }

  selectSubject(e, subject) {
    e.preventDefault();
    this.props.onSelect(subject);
  }
}

SubjectsList.propTypes = {
  subjects: PropTypes.array.isRequired,
  onSelect: PropTypes.func
};
