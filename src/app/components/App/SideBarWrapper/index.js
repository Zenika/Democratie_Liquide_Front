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
      forceDisplay: false,
    };
  }

  render() {

    return (
     <div id="wrapper" className={this.state.forceDisplay ? 'toggled' : ''}>
       <div id="sidebar-wrapper">
         <div className="sidebar-brand">
           <span className="sidebar-title">
             <a onClick={() => this.props.manageChannelsList(true)}>Channels ( {this.props.unjoinedChannels.length + this.props.joinedChannels.length + 1} )</a>
           </span>
           <span className="sidebar-add">
             <a onClick={() => this.props.manageNewChannel(true)}><Glyphicon glyph="plus-sign"/></a>
           </span>
         </div>
         <ul className="sidebar-nav">
           <li className={this.props.selectedChannel === 'general' ? 'selected' : ''}>
             <a onClick={() => this.props.selectChannel('general')}>general</a>
           </li>
           {
             this.props.joinedChannels.map((c, i) =>
               <li key={c.uuid} title={c.description} className={this.props.selectedChannel === c.uuid ? 'selected' : ''}>
                 <a onClick={() => this.props.selectChannel(c.uuid)}>{c.title}</a>
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

SideBarWrapper.defaultProps = {
  unjoinedChannels: [],
};
