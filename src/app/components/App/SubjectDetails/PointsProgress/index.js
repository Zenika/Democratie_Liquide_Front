import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';
import randomColor from 'randomcolor';

export default class PointsProgress extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const propProgress = this.props.propositions.map((proposition, index) => (
      <ProgressBar
        key={ index }
        label={ this.props.proposalPoints[index] ? `${this.props.proposalPoints[index]} pts` : ''}
        now={ this.props.proposalPoints[index] }
        style={{ backgroundColor: `${this.props.colors[index]}` }}
        max={ this.props.maxPoints }
      >
      </ProgressBar>
    ));

    return (
      <div className="text-center">
        <h4>Répartition des points</h4>
        <ProgressBar >
          { propProgress }
        </ProgressBar>
      </div>
    );
  }

}
