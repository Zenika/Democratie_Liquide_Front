import React, { Component, PropTypes } from 'react';
import { Input } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

export default class MarkdownTextArea extends Component {

  constructor(props) {
    super(props);

    this.state = {field: ''};
  }
  fieldChange(e) {
    this.setState({
      field: e.target.value
    });
    this.props.onChange(e);
  }
  render() {
    const { field } = this.state;
    const { label, placeholder } = this.props;
    return (
      <div>
        <Input onChange={ e => this.fieldChange(e) } type="textarea" label={ label } placeholder={ placeholder } />
        <ReactMarkdown source={ field } />
      </div>
    );
  }
}

MarkdownTextArea.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};