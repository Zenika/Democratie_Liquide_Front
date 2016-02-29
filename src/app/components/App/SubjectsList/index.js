import React, { Component, PropTypes } from 'react';

import {
  Grid,
  Row,
<<<<<<< HEAD
  Col,
  Button,
  ButtonGroup,
  Glyphicon,
  Well
=======
  Well,
  Badge
>>>>>>> f9e3c7f3edd683a7ff20eeb4e5b697c3216de556
} from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

import './index.scss';

export default class SubjectsList extends Component {

  render() {
    const { subjects } = this.props;

    const createSubjectEntry = subject => (
      <Well key={subject.uuid}>
        <Row>
            <Col xs={10}>
              <h3>{subject.title}</h3>
              <ReactMarkdown source={ subject.description } />
              <Badge>{subject.votes.length} votes</Badge>
            </Col>
            <Col xs={2}>
              <ButtonGroup vertical block>
                <Button onClick={ e => this.selectSubject(e, subject) } className="action-button">
                  Vote <Glyphicon glyph="edit" className="pull-left"/>
                </Button>
                <Button onClick={ e => this.delegateSubject(e, subject)} className="action-button">
                  Delegate <Glyphicon glyph="transfer"  className="pull-left"/>
                </Button>
              </ButtonGroup>
            </Col>
        </Row>
      </Well>
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

  delegateSubject(e, subject){
    e.preventDefault();
    this.props.onDelegate(subject);
  }
}

SubjectsList.propTypes = {
  subjects: PropTypes.array.isRequired,
  onSelect: PropTypes.func,
  onDelegate: PropTypes.func
};
