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
  Popover,
  Tooltip
} from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

import './index.scss';

export default class SubjectsList extends Component {

  render() {
    const { subjects } = this.props;

    const showSubjectDetails = subject => (
      <Popover id="subjectDescription">
          <h3>{subject.title} : </h3>
          <ReactMarkdown source={ subject.description } />
          {subject.propositions.map(showProposalDetails)}
      </Popover>
    );

    const showProposalDetails = (proposal, index) => (
        <div key={index}>
          <h3>{proposal.title} : </h3>
          <ReactMarkdown source={ proposal.description } />
        </div>
    );

    const createSubjectEntry = subject => (
        <div key={subject.uuid} className="subject-item">
          <Row>
            <Col xs={6} lg={7}>
              <span>{subject.title}</span>
            </Col>
            <Col xs={6} lg={5}>
              <Badge>{subject.votes.length} votes</Badge>
              {subject.delegation ? (
              <Badge style={{"marginLeft":'10px'}}>
                {subject.delegation}
              </Badge>
              ) : null}
              {subject.delegatedToMe ? (
              <Badge style={{"marginLeft":'10px'}}>
                {subject.delegatedToMe} délégation{subject.delegatedToMe > 1 ? 's' : ''}
              </Badge>
              ) : null}
              <ButtonGroup className="pull-right">
                {this.props.onDelegate && !subject.delegatedToMe ? (
                  <OverlayTrigger placement="top" overlay={<Tooltip id="Déléguer">Déléguer</Tooltip>}>
                    <Button onClick={ e => this.delegateSubject(e, subject)} className="action-button">
                      <Glyphicon glyph="transfer"/>
                    </Button>
                  </OverlayTrigger>
                ) : null}
                <OverlayTrigger placement="left" trigger="click" overlay={showSubjectDetails(subject)}>
                  <Button className="action-button">
                    <Glyphicon glyph="zoom-in"/>
                  </Button>
                </OverlayTrigger>
                {this.props.onRemoveDelegation ? (
                  <OverlayTrigger placement="top" overlay={<Tooltip id="Supprimer">Supprimer la délégation</Tooltip>}>
                    <Button onClick={ e => this.removeDelegation(e, subject)} className="action-button">
                      <Glyphicon glyph="remove"/>
                    </Button>
                  </OverlayTrigger>
                ) : null}
                {this.props.onSelect ? (
                  <OverlayTrigger placement="top" overlay={<Tooltip id="Voter">Voter ou voir le résultat des votes</Tooltip>}>
                    <Button onClick={ e => this.selectSubject(e, subject) } className="action-button">
                      <Glyphicon glyph="check"/>
                    </Button>
                  </OverlayTrigger>
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
