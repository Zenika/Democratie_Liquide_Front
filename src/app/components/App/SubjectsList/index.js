import React, { Component, PropTypes } from 'react';

import {
  Grid,
  Row,
  Col,
  Button,
  ButtonGroup,
  Glyphicon,
  Well,
  Badge,
  OverlayTrigger,
  Popover
} from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

import './index.scss';

export default class SubjectsList extends Component {

  render() {
    const { subjects } = this.props;

    const createSubjectEntry = subject => (
        <div key={subject.uuid} className="subject-item">
          <Row>
            <Col xs={6} lg={7}>
              <span>{subject.title}</span>
            </Col>
            <Col xs={6} lg={5}>
              <Badge>{subject.votes.length} votes</Badge>
              <ButtonGroup className="pull-right">
              <OverlayTrigger placement="top" trigger="click" overlay={(<Popover id="subjectDescription"><ReactMarkdown source={ subject.description } /></Popover>)}>
                <Button className="action-button">
                  <Glyphicon glyph="zoom-in"/>
                </Button>
              </OverlayTrigger>
              {this.props.onDelegate ? (
              <Button onClick={ e => this.delegateSubject(e, subject)} className="action-button">
                <Glyphicon glyph="transfer"/>
              </Button>
              ) : null}
              {this.props.onRemoveDelegation ? (
              <Button onClick={ e => this.removeDelegation(e, subject)} className="action-button">
                <Glyphicon glyph="remove"/>
              </Button>
              ) : null}
              {this.props.onSelect ? (
              <Button onClick={ e => this.selectSubject(e, subject) } className="action-button">
                <Glyphicon glyph="check"/>
              </Button>
              ) : null}
              </ButtonGroup>
            </Col>
          </Row>
        </div>
    );
    if (!subjects.length) {
      return (
        <span>{this.props.emptyMessage}</span>
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

  removeDelegation(e, subject){
    e.preventDefault();
    this.props.onRemoveDelegation(subject);
  }
}

SubjectsList.propTypes = {
  subjects: PropTypes.array.isRequired,
  onSelect: PropTypes.func,
  onDelegate: PropTypes.func,
  onRemoveDelegation: PropTypes.func,
  collaborator: PropTypes.object,
  emptyMessage: PropTypes.string
};
