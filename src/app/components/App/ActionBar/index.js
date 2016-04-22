import React, { Component, PropTypes } from 'react';

import {
  DropdownButton,
  MenuItem,
  Button,
  Glyphicon,
  Row,
  Col
} from 'react-bootstrap';

export default class ActionBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedLabel: "ALL"
    };
  }

  selectCategory(key) {
    if (key === "ALL") {
      this.setState({
        selectedLabel: "ALL"
      });
    } else {
      this.setState({
        selectedLabel: this.props.categories.find(c => c.uuid === key).title
      });
    }
    this.props.selectCategory(key);
  }

  render() {

    const { selectedLabel } = this.state;

    return (
      <div>
        <row>
          <Col xs={6}>
              Catégorie : <DropdownButton title={this.state.selectedLabel} id="bg-nested-dropdown" >
                <MenuItem eventKey="ALL" onSelect={(e,key) => this.props.selectCategory(key)}>ALL</MenuItem>
                  {
                    this.props.categories.map( (c,i) =>
                      <MenuItem eventKey={c.uuid} onSelect={(e,key) => this.selectCategory(key)}>
                          <Row>
                            <Col xs={12} md={8}>{c.title} </Col>
                            <Col xs={9} md={6}><Button className="action-button" onClick = {(e) => this.props.showCategoryDelegate(true)}><Glyphicon glyph="transfer"/></Button></Col>
                          </Row>
                      </MenuItem>
                    )
                  }
              </DropdownButton>
          </Col>
          <Col xs={6}>
              <Button onClick={() => this.props.manageNewSubject(true)}><Glyphicon glyph="plus" /> Créer un sujet</Button>
              <Button onClick={() => this.props.manageNewCategory(true)}><Glyphicon glyph="plus" /> Créer une nouvelle catégorie</Button>
          </Col>
        </row>
      </div>
    );

  }
}
