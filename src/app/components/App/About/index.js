import React, { Component } from 'react';
import { Glyphicon, Panel } from 'react-bootstrap';

export default class About extends Component {

  render() {
    const heartStyle = {color:'red'}
    return (
      <section>
        <h2>Liquidifions la démocratie</h2>
        <Panel>
          <Glyphicon glyph="heart" style={heartStyle} />
            ZDemocracy is builded by the awesome <b>Zenika Rennes</b> team
          <Glyphicon glyph="heart" style={heartStyle} />
        </Panel>
      </section>
    );
  }
}