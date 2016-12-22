import React, { Component, PropTypes } from 'react';
import {
  Panel,
  ControlLabel,
  FormControl,
  Button,
  ButtonToolbar,
  Glyphicon
} from 'react-bootstrap';
import MarkdownTextArea from '../../../MarkdownTextArea';

export default class NewProposal extends Component {

  constructor(props) {
    super(props);
    this.state = { proposal: {} };
  }

  render() {
    const { rank } = this.props;
    return (
      <Panel className="proposal-box" header={'Proposition ' + (rank + 1) }>
        <fieldset>
          <ControlLabel>
            Titre
          </ControlLabel>
          <FormControl
            type="text"
            label="Titre"
            placeholder="Titre de la proposition..."
            onChange={ e => this.handleChange(e, 'title') } type="text" label="Titre" placeholder="Titre de la proposition..."
          />
          <br/>
          <MarkdownTextArea
            onChange={ e => this.handleChange(e, 'description') }
            label="Description"
            placeholder="Description de la proposition... (Markdown supporté)"/>
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
    this.setState({ proposal: proposal });
  }
}
NewProposal.propTypes = {
  onChange: PropTypes.func.isRequired,
};

NewProposal.defaultProps = {
  rank: 1,
};
