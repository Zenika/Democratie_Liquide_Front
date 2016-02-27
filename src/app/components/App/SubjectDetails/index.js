import React, { Component, PropTypes } from 'react';
import subjectsStore from '../../../core/subjects-store';
import votesStore from '../../../core/votes-store';
import ReactMarkdown from 'react-markdown';

import {
  Panel,
  Alert
} from 'react-bootstrap';
import ProposalDetails from './ProposalDetails';
import Spinner from '../../Spinner';

export default class SubjectDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDataResolved: false,
      isAlertVisible: false,
      subject: {},
    };

  }

  componentDidMount() {
    const { id } = this.props.params;

    subjectsStore.getSubject(id)
    .then(subject => {
      this.setState({
        isDataResolved: true,
        subject: subject
      });
    });
  }

  render() {
    const { subject, isDataResolved, isAlertVisible } = this.state;

    if (!isDataResolved) {
      return <Spinner />;
    }

    const displayAlert = () => {
      if (isAlertVisible) {
        return (
          <Alert bsStyle="success" onDismiss={() => this.handleAlertDismiss()} dismissAfter={2000}>
            <h4>You vote!</h4>
            <p>Thank you very much.</p>
          </Alert>
        )
      }
    };
    const createProposition = (proposition, i) => (
      <ProposalDetails key={ i } proposal={ proposition } onVote={ proposal => this.voteFor(proposal) }/>
    );
    return (
      <Panel>
        { displayAlert() }
        <h2>{subject.title}</h2>
        <ReactMarkdown source={ subject.description } />
        {subject.propositions.map(createProposition)}
      </Panel>
    );
  }

  voteFor(proposition) {
    const {id} = this.props.params;
    const propositionId = proposition.id;
    votesStore.voteFor(id, propositionId)
    .then(() => {
      this.setState({
        isAlertVisible : true
      });  
    });
  }

  handleAlertDismiss() {
    this.setState({
      isAlertVisible : false
    });
  }
}