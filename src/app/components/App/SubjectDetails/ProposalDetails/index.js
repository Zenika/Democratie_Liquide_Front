import React, { Component, PropTypes } from 'react';
import ReactMarkdown from 'react-markdown';

import {
  Panel  
} from 'react-bootstrap';

export default class ProposalDetails extends Component {

  render() {
    const { proposal } = this.props;
    return (
      <Panel>
        <h3>{proposal.title}</h3>
        <ReactMarkdown source={ proposal.description } />
      </Panel>
    );
  }
}
ProposalDetails.propTypes = {
  proposal: PropTypes.object.isRequired
}
