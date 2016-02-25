import React, { Component } from 'react';
import { 
  Input,
  ButtonInput
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class NewSubject extends Component {

  render() {
    return (
      <form>
        <fieldset>
          <legend>New Subject</legend>
          <Input type="text" label="Title" placeholder="Enter title..." />
          <Input type="textarea" label="Description" placeholder="Write a description ..." />
          <LinkContainer to={{ pathname: '/' }}>
            <ButtonInput type="button" value="Cancel" />
          </LinkContainer>
          <ButtonInput type="submit" bsStyle="success" value="Save" />
        </fieldset>
      </form>
    );
  }
}
