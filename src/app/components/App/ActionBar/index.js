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
      selectedLabel: "ALL",
    };
  }

  selectCategory(key) {
    if (key === "ALL") {
      this.setState({
        selectedLabel: "ALL",
      });
    } else {
      this.setState({
        selectedLabel: this.props.categories.find(c => c.uuid === key).title,
      });
    }

    this.props.selectCategory(key);
  }

  render() {
    const { selectedLabel } = this.state;

    return (
      <Row className="action-bar">
        <Col xs={6}>
            Catégorie :
            <DropdownButton title={this.state.selectedLabel} id="bg-nested-dropdown" >
              <MenuItem eventKey="ALL" onSelect={key => this.props.selectCategory(key)}>ALL</MenuItem>
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
        </Col>
        <Col xs={3}>
          <Button className="pull-right"
            onClick={() => this.props.manageNewSubject(true)}
          >
            <Glyphicon glyph="plus" /> Créer un sujet
          </Button>
        </Col>
        <Col xs={3}>
          <Button onClick={() => this.props.manageNewCategory(true)}>
            <Glyphicon glyph="plus" /> Créer une nouvelle catégorie
          </Button>
        </Col>
      </Row>
    );

  }
}
