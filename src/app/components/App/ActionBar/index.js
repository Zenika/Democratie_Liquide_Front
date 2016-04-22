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
  }


  render() {

    return (
      <div>
        <row>
          <Col xs={6}>
              Catégorie : <DropdownButton title={this.props.selectedCategory} id="bg-nested-dropdown" >
                <MenuItem eventKey="ALL" onSelect={(e,key) => this.props.selectCategory(key)}>ALL</MenuItem>
                  {
                    this.props.categories.map( (c,i) =>
                      <MenuItem eventKey={c.uuid} onSelect={(e,key) => this.props.selectCategory(key)}>
                          <Row>
                            <Col xs={12} md={8}>{c.title} </Col>
                            <Col xs={9} md={6}><Button className="action-button" onClick = {() => console.log("ok")}><Glyphicon glyph="transfer"/></Button></Col>
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
