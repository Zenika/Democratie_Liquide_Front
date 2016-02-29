import React, { Component, PropTypes } from 'react';
import {
  Well,
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
    this.state = {
      title: '',
      description: '',
      maxPoints: 1,
      propositions: [{}, {}]};

  }
  
  render() {
    const { propositions } = this.state;

    const createProposal = (proposition, i) => (
      <NewProposal key={ i } rank={ i } 
        onChange={ (i, proposal) => this.setProposal(i, proposal) } />
    );

    return (
      <Well>
        <form onSubmit={e => this.saveSubject(e)} >
          <fieldset>
            <legend>New Subject</legend>
            <Input onChange={ e => this.handleChange(e, 'title') } type="text" label="Title" placeholder="Enter title..." />
            <MarkdownTextArea onChange={ e => this.handleChange(e, 'description') } 
              label="Description" placeholder="Enter Description... (Markdown supported)"/>

              <Input onChange={ e => this.handleChange(e, 'maxPoints') } type="number" defaultValue="1" label="Max points" placeholder="Choose the max points for each proposition" />

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
      </Well>
    );
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
    const {
      title,
      description,
      maxPoints,
      propositions
    } = this.state;

    store.createSubject({
      title,
      description,
      maxPoints,
      propositions
    })
    .then(subjectId => this.context.router.push(`/subjects/${subjectId}`));
  }
}
NewSubject.contextTypes= {
  router: PropTypes.object.isRequired
};