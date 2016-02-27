import React, { Component, PropTypes } from 'react';

import {
  Grid,
  Row,
  Well
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
        </Well>  
      </Row>
    );

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
