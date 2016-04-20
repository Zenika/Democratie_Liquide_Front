import React, { Component, PropTypes } from 'react';
import subjectsStore from '../../../core/subjects-store';
import votesStore from '../../../core/votes-store';
import ReactMarkdown from 'react-markdown';

import {
  Well,
  Alert,
  Button
} from 'react-bootstrap';
import ProposalDetails from './ProposalDetails';
import Spinner from '../../Spinner';
import MessageManager from '../MessageManager';
import Messagebar from '../../Messagebar';

export default class SubjectDetails extends MessageManager {

  constructor(props) {
    super(props);
    this.state = {
      isDataResolved: false,
      isAlertVisible: false,
      subject: {},
      leftPoints: 0
    };

  }

  componentDidMount() {
    const { id } = this.props.params;

    subjectsStore.getSubject(id)
    .then(subject => {
      var ppArray = [];
      subject.propositions.map(function(value, index){
        ppArray[index] = 0;
      })
      this.setState({
        isDataResolved: true,
        subject: subject,
        leftPoints: 0+subject.maxPoints,
        proposalPointsArray:ppArray
      });
    });
  }

  render() {
    const { subject, isDataResolved, isAlertVisible, leftPoints } = this.state;

    if (!isDataResolved) {
      return <Spinner />;
    }

        const createProposition = (proposition, index) => (
      <ProposalDetails key={ index }
        leftPoints= { leftPoints }
        proposal={ proposition }
        proposalPoints = {this.state.proposalPointsArray[index]}
        onChangePoints={ (proposal, points) => this.handlePointsChange(index, points) } />
    );
    return (
      <Well>
        <Messagebar message = {this.state.message} isMessageSuccessVisible = {this.state.isMessageSuccessVisible}  isMessageDangerVisible = {this.state.isMessageDangerVisible} handleAlertDismiss = {() => this.handleAlertDismiss()} />
        <h2>{subject.title}</h2>
        <ReactMarkdown source={ subject.description } />
        {subject.propositions.map(createProposition)}
        <Button onClick={e => this.vote(this.state.subject,this.state.proposalPointsArray)}>
        Vote
        </Button>
      </Well>
    );
  }

  handlePointsChange(proposalIndex, points) {
    this.setState(function(previousState, currentProps){
      var previousTotal = previousState.leftPoints + previousState.proposalPointsArray[proposalIndex]
      previousState.proposalPointsArray[proposalIndex] = points;
      return{
        proposalPointsArray : previousState.proposalPointsArray,
        leftPoints : previousTotal - previousState.proposalPointsArray[proposalIndex],
      }
    })
  }

  vote(subject, pointArray) {
    const {id} = this.props.params;
    const propositions = this.state.subject.propositions;
    const pointsArray = this.state.proposalPointsArray;
    votesStore.voteFor(id, propositions, pointsArray)
    .then((response) => {
      this.displayMessage(response, "Vote effectué");
    });
  }


}
