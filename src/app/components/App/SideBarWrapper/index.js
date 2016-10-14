import React, { Component, PropTypes } from 'react';

import {
  DropdownButton,
  MenuItem,
  Button,
  Glyphicon,
  Row,
  Col,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';

import './index.scss';

export default class SideBarWrapper extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedChannel: 'general',
      forceDisplay: false,
    };
  }

  selectChannel(key) {
    console.log('app/components/App/SideBarWrapper@selectChannel', key);
    this.setState({ selectedChannel: key === 'general' ? 'general' : this.props.joinedChannels.find(c => c.uuid === key).title });
    this.props.selectChannel(key);
  }

  render() {

    return (
     <div id="wrapper" className={this.state.forceDisplay ? 'toggled' : ''}>
      <div id="sidebar-wrapper">
        <div className="sidebar-brand">
          <span className="sidebar-title">
            <a onClick={() => this.props.manageJoinedChannels(true)}>Channels ( {this.props.allChannels.length + 1} )</a>
          </span>
          <span className="sidebar-add">
            <a onClick={() => this.props.manageNewChannel(true)}><Glyphicon glyph="plus-sign"/></a>
          </span>
        </div>
        <ul className="sidebar-nav">
          <li className={this.state.selectedChannel === 'general' ? 'selected' : ''}>
            <a onClick={() => this.selectChannel('general')}>general</a>
          </li>
            {
              this.props.joinedChannels.map((c, i) =>
                <li key={c.uuid} className={this.state.selectedChannel === c.title ? 'selected' : ''}>
                  <a onClick={() => this.selectChannel(c.uuid)}>{c.title}</a>
                </li>
              )
            }
        </ul>
      </div>

      <div id="page-content-wrapper">
        {this.props.children}
      </div>
     </div>
    );

  }
}
