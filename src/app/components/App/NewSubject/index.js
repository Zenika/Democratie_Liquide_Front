import React, { Component, PropTypes } from 'react';
import {
  Panel,
  Input,
  ButtonInput,
  ButtonToolbar,
  Button,
  Glyphicon
} from 'react-bootstrap';
import MarkdownTextArea from '../../MarkdownTextArea';

import { LinkContainer } from 'react-router-bootstrap';
import NewProposal from './NewProposal';
import store from '../../../core/subjects-store';

export default class NewSubject extends Component {
  constructor(props) {
    super(props);
    this.state = {title: '', description: '', propositions: [{}, {}]};

  }

  handleChange(e, fieldName) {
    e.preventDefault();
    this.setState({[fieldName]: e.target.value});
  }

  addProposal(e) {
    e.preventDefault();
    this.setState({
      propositions: [...this.state.propositions, {}]
    });
  }

  setProposal(i, proposal) {
    const { propositions }= this.state;
    propositions[i] = proposal;
    this.setState({
      propositions: propositions
    });
  }

  saveSubject(e) {
    e.preventDefault()
    const {title, description, propositions} = this.state;
    store.createSubject({
      title,
      description,
      propositions
    })
    .then(subjectId => this.context.router.push(`/subjects/${subjectId}`));
  }

  render() {
    const { description, propositions } = this.state;

    const createProposal = (proposition, i) => (
      <NewProposal key={ i } rank={ i } 
        onChange={ (i, proposal) => this.setProposal(i, proposal) } />
    );

    return (
      <Panel>
        <form onSubmit={e => this.saveSubject(e)} >
          <fieldset>
            <legend>New Subject</legend>
            <Input onChange={ e => this.handleChange(e, 'title') } type="text" label="Title" placeholder="Enter title..." />
            <MarkdownTextArea onChange={ e => this.handleChange(e, 'description') } 
              label="Description" placeholder="Enter Description... (Markdown supported)"/>

            { propositions.map(createProposal) }
            <Button onClick={ e => this.addProposal(e) }><Glyphicon glyph="plus" /> Add proposal</Button>

            <ButtonToolbar>
              <LinkContainer to={ {pathname: '/'} }>
                <Button ><Glyphicon glyph="remove" /> Cancel</Button>
              </LinkContainer>
              <ButtonInput type="submit" bsStyle="success" value="Save" />
            </ButtonToolbar>
          </fieldset>
        </form>
      </Panel>
    );
  }
}
NewSubject.contextTypes= {
  router: PropTypes.object.isRequired
};