import React, { Component, PropTypes } from 'react';

import {
  Grid,
  Row,
  Well,
  Badge
} from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

import './index.scss';

export default class SubjectsList extends Component {

  render() {
    const { subjects } = this.props;

    const createSubjectEntry = subject => (
      <Row key={subject.uuid} >
        <Well onClick={ e => this.selectSubject(e, subject) } className="subject-item">
          <h3>{subject.title}</h3>
          <ReactMarkdown source={ subject.description } />
          <Badge>{subject.votes.length} votes</Badge>
        </Well>  
      </Row>
    );
    if (!subjects.length) {
      return (
        <Well>
          There is currently no subject in progress.
          You can create one by clicking on the <em>Create</em> button
        </Well>
      )
    }
    return (
      <div>
        {subjects.map(createSubjectEntry)}
      </div>
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
