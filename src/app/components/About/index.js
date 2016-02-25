import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';

export default class About extends Component {

  render() {
    const heartStyle = {color:'red'}
    return (
      <p>
        <Glyphicon glyph="heart" style={heartStyle} />
          ZDemocracy is builded by the awesome <b>Zenika Rennes</b> team
        <Glyphicon glyph="heart" style={heartStyle} />
      </p>
    );
  }
}