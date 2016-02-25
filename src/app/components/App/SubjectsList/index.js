import React, { Component, PropTypes } from 'react';

import {
  ListGroup,
  ListGroupItem,
  Button
} from 'react-bootstrap';

export default class SubjectsList extends Component {

  render() {
    const { subjects } = this.props;

    const createSubjectEntry = subject => (
      <ListGroupItem key={subject.uuid} href="#" header={subject.title}>
        {subject.description} 
        <span className="pull-right">
          <Button bsStyle="primary" className="btn-xs">Vote</Button>
        </span>
      </ListGroupItem>
    );

    return (
      <ListGroup>
        {subjects.map(createSubjectEntry)}
      </ListGroup>
    );
  }
}

SubjectsList.propTypes = {
  subjects: PropTypes.array.isRequired
};
