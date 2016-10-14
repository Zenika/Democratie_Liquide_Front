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

export default class ActionBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: "ALL",
    };
  }

  selectCategory(key) {
    console.log('app/components/App/ActionBar@selectCategory', key);
    this.setState({ selectedCategory: key === 'ALL' ? 'ALL' : this.props.categories.find(c => c.uuid === key).title });
    this.props.selectCategory(key);
  }

  render() {
    const { selectedCategory } = this.state;

    return (
      <Row className="action-bar">

        <Col xs={6} md={6}>
          <Button
            onClick={() => this.props.manageNewSubject(true)}
          >
            <Glyphicon glyph="plus"/> Créer un sujet
          </Button>
        </Col>

        <Col xs={6} md={6}>
          Catégorie : &nbsp;
            <DropdownButton title={this.state.selectedCategory} id="bg-nested-dropdown" >
              <MenuItem eventKey="ALL" onSelect={key => this.selectCategory(key)}>ALL</MenuItem>
                {
                  this.props.categories.map((c, i) =>
                    <MenuItem key={i} eventKey={c.uuid} onSelect={key => this.selectCategory(key)}>
                        <Row>

                          <Col xs={12} md={8}>
                            {c.title}
                          </Col>

                          <Col xs={9} md={6}>
                            <OverlayTrigger
                              placement="top"
                              overlay={<Tooltip id="Déléguer">Déléguer</Tooltip>}
                            >
                              <Button
                                className="action-button"
                                onClick={(e) => this.props.showCategoryDelegate(true)}
                              >
                                <Glyphicon
                                  glyph="transfer"
                                />
                              </Button>
                            </OverlayTrigger>
                          </Col>

                          <Col xs={9} md={6}>
                            <OverlayTrigger
                              placement="top"
                              overlay={<Tooltip id="Supprimer">Supprimer la délégation</Tooltip>}
                            >
                              <Button
                                className="action-button"
                                onClick={(e) => this.props.onRemoveDelegation()}
                              >
                                <Glyphicon glyph="remove" />
                              </Button>
                            </OverlayTrigger>
                          </Col>

                        </Row>
                    </MenuItem>
                  )
                }
            </DropdownButton>

            <OverlayTrigger placement="top" overlay={<Tooltip id="Créer">Créer</Tooltip>} >
              <Button onClick={() => this.props.manageNewCategory(true)}>
                <Glyphicon glyph="plus"/>
              </Button>
            </OverlayTrigger>
        </Col>

      </Row>
    );

  }
}
