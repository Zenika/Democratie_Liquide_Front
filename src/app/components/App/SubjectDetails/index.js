import React, { Component, PropTypes } from 'react';
import subjectsStore from '../../../core/subjects-store';
import votesStore from '../../../core/votes-store';
import ReactMarkdown from 'react-markdown';

import {
  Well,
  Alert,
  Button,
  Row,
  Col,
} from 'react-bootstrap';
import ProposalDetails from './ProposalDetails';
import Spinner from '../../Spinner';
import MessageManager from '../../MessageManager';
import DeadLine from '../../DeadLine/DeadLine';
import PointsProgress from './PointsProgress';
import randomColor from 'randomcolor';

export default class SubjectDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDataResolved: false,
      isAlertVisible: false,
      subject: {},
      leftPoints: 0,
      colors: [],
    };

  }

  componentDidMount() {
    const { id } = this.props.params;

    subjectsStore.getSubject(id)
    .then(subject => {
      var ppArray = [];
      subject.propositions.map(function (value, index) {
        ppArray[index] = 0;
      });

      this.setState({
        isDataResolved: true,
        subject: subject,
        leftPoints: 0 + subject.maxPoints,
        proposalPointsArray: ppArray,
        colors: randomColor({
          count: subject.propositions.length,
        }),
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
        leftPoints={ leftPoints }
        proposal={ proposition }
        proposalPoints={this.state.proposalPointsArray[index]}
        onChangePoints={ (proposal, points) => this.handlePointsChange(index, points) }
                       color={ this.state.colors[index] }
      />
    );

    return (
      <div>
        <Well>
          <Row>
            <Col md={6}>
              <h2 style={{ marginTop: '0' }}>{subject.title}</h2>
            </Col>
            <Col md={6} className="text-right">
              Date de cloture : <DeadLine deadLine={subject.deadLine}/>
            </Col>
          </Row>
          <ReactMarkdown source={ subject.description }/>
          <PointsProgress propositions={ subject.propositions }
            maxPoints={subject.maxPoints}
            proposalPoints={this.state.proposalPointsArray}
            colors={ this.state.colors }
          />
          {subject.propositions.map(createProposition)}
          <Button onClick={e => this.vote(this.state.subject, this.state.proposalPointsArray)}>
            Vote
          </Button>
        </Well>
      </div>
    );
  }

  handlePointsChange(proposalIndex, points) {
    this.setState(function (previousState, currentProps) {
      var previousTotal = previousState.leftPoints + previousState.proposalPointsArray[proposalIndex];
      previousState.proposalPointsArray[proposalIndex] = points;

      return {
        proposalPointsArray: previousState.proposalPointsArray,
        leftPoints: previousTotal - previousState.proposalPointsArray[proposalIndex],
      };
    });
  }

  vote(subject, pointArray) {
    const { id } = this.props.params;
    const propositions = this.state.subject.propositions;
    const pointsArray = this.state.proposalPointsArray;
    votesStore.voteFor(id, propositions, pointsArray)
      .then((response) => {
        MessageManager.displayMessage(response, "Vote effectué");
      });
  }
}
