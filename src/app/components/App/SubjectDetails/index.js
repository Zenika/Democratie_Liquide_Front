import React, { Component, PropTypes } from 'react';
import store from '../../../core/subjects-store';
import ReactMarkdown from 'react-markdown';

import {
  Panel  
} from 'react-bootstrap';
import ProposalDetails from './ProposalDetails';
import Spinner from '../../Spinner';

export default class SubjectDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDataResolved: false,
      subject: {},
    };

  }

  componentDidMount() {
    const { id } = this.props.params;

    store.getSubject(id)
    .then(subject => {
      this.setState({
        isDataResolved: true,
        subject: subject
      });
    });
  }

  render() {
    const { subject, isDataResolved } = this.state;

    if (!isDataResolved) {
      return <Spinner />;
    }

    const createProposition = (proposition, i) => <ProposalDetails key={ i } proposal={ proposition } />;
    return (
      <Panel>
        <h2>{subject.title}</h2>
        <ReactMarkdown source={ subject.description } />
        {subject.propositions.map(createProposition)}
      </Panel>
    );
  }
}