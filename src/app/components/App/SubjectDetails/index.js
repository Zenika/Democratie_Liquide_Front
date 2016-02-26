import React, { Component, PropTypes } from 'react';
import store from '../../../core/subjects-store';

// import {
  
// } from 'react-bootstrap';

export default class SubjectDetails extends Component {

  constructor(props) {
    super(props);
    const { id } = props ? props.params : this.props.params
    this.state = { subject: store.getSubject(id) };
  }

  render() {
    const { subject } = this.state;

    const createProposition = (proposition, i) => <li key={ i }>{proposition.title} {proposition.description}</li>;

    return (
      <div>
        <h2>{subject.title}</h2>
        <p>
          {subject.description}
        </p>
        <ul>
          {subject.propositions.map(createProposition)}
        </ul>
      </div>
    );
  }
}