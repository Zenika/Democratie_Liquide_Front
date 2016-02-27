import React, { Component, PropTypes } from 'react';

import {
  Panel,
  Tabs,
  Tab,
  Input,
  Button
} from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

const MODE = {
  write : 'write',
  preview: 'preview'
};

export default class MarkdownTextArea extends Component {

  constructor(props) {
    super(props);

    this.state = {field: '', mode: MODE.write};
  }

  fieldChange(e) {
    this.setState({
      field: e.target.value
    });
    this.props.onChange(e);
  }

  render() {
    const { field, mode } = this.state;
    const { label, placeholder } = this.props;
    return (
      <Panel>
        <label className="controle-label">{ label }</label>
        <Tabs activeKey={ this.state.mode } onSelect={ mode => this.setState({mode: mode}) }>
          <Tab eventKey={ MODE.write } title="Write">
            <Input onChange={ e => this.fieldChange(e) } type="textarea" placeholder={ placeholder } />
          </Tab>
          <Tab eventKey={ MODE.preview }  title="Preview">
            <ReactMarkdown source={ field } />
          </Tab>
        </Tabs>
      </Panel>
    );
  }
}

MarkdownTextArea.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};