import React, { Component, PropTypes } from 'react';
import subjectsStore from '../../../core/subjects-store';
import votesStore from '../../../core/votes-store';
import ReactMarkdown from 'react-markdown';

import {
  Panel,
  Well,
  Alert,
  Button,
  Badge
} from 'react-bootstrap';
import Spinner from '../../Spinner';

export default class SubjectResult extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDataResolved: false,
      subject: {},
      leftPoints: 0,
    };

  }

  componentDidMount() {
    const { id } = this.props.params;

    subjectsStore.getSubject(id)
      .then(subject => {
        this.setState({
          isDataResolved: true,
          subject: subject,
        });
      });
  }

  render() {
    const { subject, isDataResolved, leftPoints } = this.state;
    if (!isDataResolved) {
      return <Spinner />;
    }

    const createProposition = (proposal, index) => (
      <Panel key={index}>
        <h3>{proposal.title}</h3>
        <Badge>{proposal.points} points</Badge>
        <ReactMarkdown source={ proposal.description }/>
      </Panel>
    );
    return (
      <Well>
        <h2>{subject.title}</h2>
        <ReactMarkdown source={ subject.description }/>
        {subject.propositions.map(createProposition)}
      </Well>
    );
  }
}
