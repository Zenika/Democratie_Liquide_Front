import React, { Component, PropTypes } from 'react';
import ReactMarkdown from 'react-markdown';

import {
  Panel,
  Radio,
  Button,
  RadioGroup,
  Row,
  Col
} from 'react-bootstrap';

import './index.scss';

export default class ProposalDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      points: undefined,
    };
  }

  render() {
    const { proposal, maxPoints } = this.props;
    const votesCheckBox = Array(this.props.leftPoints + this.props.proposalPoints + 1).fill().map((e, index) => {
      const nbPoints = "" + index;
      return (
        <Radio inline
               key={ index }
               type="radio"
               name="vote"
               className="voteBtn"
               value={ nbPoints }
               ref={ nbPoints }
               onChange={ e => {this.props.onChangePoints(this.props.proposal, parseInt(e.target.value))}}
        >
          <span>{ nbPoints }</span>
        </Radio>
      );
    });

    return (
      <Panel>
        <Row>
          <Col md={6}>
            <div className="proposalHeader">
              <p className="pastille"
                 style={{ backgroundColor: `${this.props.color}` }}></p>
              <h3>
                {proposal.title}
              </h3>
            </div>
            <ReactMarkdown source={ proposal.description }/>
          </Col>
          <Col md={6} className="proposalVote">
            <form className="voteBtn-group">
                { votesCheckBox }
            </form>
          </Col>
        </Row>
      </Panel>
    );
  }
}

ProposalDetails.propTypes = {
  proposal: PropTypes.object.isRequired,
  proposalPoints: PropTypes.number.isRequired,
  leftPoints: PropTypes.number.isRequired,
  onChangePoints: PropTypes.func.isRequired,
};
