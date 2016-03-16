import React, { Component, PropTypes } from 'react';
import {
  Panel,
  Input,
  ButtonInput,
  ButtonToolbar,
  Button,
  Glyphicon
} from 'react-bootstrap';
import MarkdownTextArea from '../../../MarkdownTextArea';

export default class NewProposal extends Component {

  constructor(props) {
    super(props);
    this.state = {proposal: {}};
  }

  render() {
    const { rank } = this.props;
    return (
      <Panel className="proposal-box">
        <fieldset>
          <legend>Proposal { rank + 1 }</legend>
          <Input onChange={ e => this.handleChange(e, 'title') } type="text" label="Title" placeholder="Enter title..." />
          <MarkdownTextArea onChange={ e => this.handleChange(e, 'description') }
              label="Description" placeholder="Write a proposal description... (Markdown supported)"/>
        </fieldset>
      </Panel>
    );
  }

  handleChange(e, fieldName) {
    e.preventDefault();
    const { proposal } = this.state;
    proposal[fieldName] = e.target.value;

    this.props.onChange(
      this.props.rank,
      proposal
    );
    this.setState({proposal: proposal});

  }


}
NewProposal.propTypes = {
  onChange: PropTypes.func.isRequired
};

NewProposal.defaultProps = {
  rank: 1,
};
