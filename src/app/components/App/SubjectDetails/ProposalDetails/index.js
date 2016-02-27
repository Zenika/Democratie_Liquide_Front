import React, { Component, PropTypes } from 'react';
import ReactMarkdown from 'react-markdown';

import {
  Panel,
  Button
} from 'react-bootstrap';

export default class ProposalDetails extends Component {

  render() {
    const { proposal } = this.props;
    return (
      <Panel>
        <h3>{proposal.title}</h3>
        <ReactMarkdown source={ proposal.description } />
        <Button onClick={ e => this.vote(e) } className="pull-rigth" >Vote</Button>
      </Panel>
    );
  }

  vote(e) {
    e.preventDefault();
    this.props.onVote(this.props.proposal);
  }
}
ProposalDetails.propTypes = {
  proposal: PropTypes.object.isRequired,
  onVote: PropTypes.func.isRequired
}
