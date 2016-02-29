import React, { Component, PropTypes } from 'react';
import ReactMarkdown from 'react-markdown';

import {
  Panel,
  Input,
  Button,
  RadioGroup
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
    
    const votesCheckBox = Array(maxPoints).fill().map((e, index) => {
      const nbPoints = index + 1;
      return (
      <Input key={ index } onChange={ e => this.handlePointsChange(e) }
        type="radio" name="vote" label={ nbPoints } value={ nbPoints } ref={ nbPoints } groupClassName="col-sm-1"/>
    )});

    return (
      <Panel>
        <h3>{proposal.title}</h3>
        <ReactMarkdown source={ proposal.description } />
        <form className="form-inline">
          <Input label="Points" labelClassName="col-sm-2" wrapperClassName="col-sm-10">
            { votesCheckBox }
          </Input>
          <Button onClick={ e => this.vote(e) } className="pull-rigth" >Vote</Button>
        </form>
      </Panel>
    );
  }

  handlePointsChange(e) {
    this.setState({
      points: e.target.value
    });

  }

  vote(e) {
    e.preventDefault();
    this.props.onVote(this.props.proposal, this.state.points);
  }
}
ProposalDetails.propTypes = {
  proposal: PropTypes.object.isRequired,
  maxPoints: PropTypes.number.isRequired,
  onVote: PropTypes.func.isRequired
}
