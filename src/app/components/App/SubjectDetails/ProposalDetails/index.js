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

export default class ProposalDetails extends Component {

  constructor(props) {
    super(props);
    this.state= {
      points: undefined
    }
  }

  render() {
    const { proposal, maxPoints } = this.props;
    const votesCheckBox = Array(this.props.leftPoints + this.props.proposalPoints + 1).fill().map((e, index) => {
      const nbPoints = ""+index;
      return (
      <Radio key={ index } onChange={ e =>{this.props.onChangePoints(this.props.proposal, parseInt(e.target.value))} }
        type="radio" name='vote' label={ nbPoints } value={ nbPoints } ref={ nbPoints } groupClassName="col-sm-1"/>
    )});

    return (
      <Panel>
        <h3>{proposal.title}</h3>
        <ReactMarkdown source={ proposal.description } />
         <Row>
          <form>
             <Col sm={6}>
                { votesCheckBox }
             </Col>
          </form>
         </Row>
      </Panel>
    );
  }
}

ProposalDetails.propTypes = {
  proposal: PropTypes.object.isRequired,
  proposalPoints: PropTypes.number.isRequired,
  leftPoints: PropTypes.number.isRequired,
  onChangePoints: PropTypes.func.isRequired
}
