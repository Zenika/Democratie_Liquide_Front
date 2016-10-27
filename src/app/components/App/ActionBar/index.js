import React, { Component, PropTypes } from 'react';
import wording from '../../../config/wording';
import {
  DropdownButton,
  MenuItem,
  Button,
  ButtonGroup,
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
      selectedCategory: undefined,
    };
  }

  selectCategory(category) {
    console.log('app/components/App/ActionBar@selectCategory', category);
    this.setState({ selectedCategory: category });
    this.props.selectCategory(category);
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
          <DropdownButton title={this.state.selectedCategory || wording.allCategories} id="bg-nested-dropdown" >
            <MenuItem onSelect={() => this.selectCategory(wording.allCategories)}>{wording.allCategories}</MenuItem>
            {
              this.props.categories.map((c, i) =>
                <MenuItem key={i} eventKey={c.uuid} onSelect={() => this.selectCategory(c.title)}>

                  <span className="title">{c.title}</span>
                    <ButtonGroup className="buttons">


                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="Déléguer">Déléguer</Tooltip>}
                      >
                        <Button
                          className="action-button"
                          onClick={(e) => this.props.showCategoryDelegate(true)}
                          bsSize="xsmall"
                        >
                          <Glyphicon
                            glyph="transfer"
                          />
                        </Button>
                      </OverlayTrigger>

                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="Supprimer">Supprimer la délégation</Tooltip>}
                      >
                        <Button
                          className="action-button"
                          onClick={(e) => this.props.onRemoveDelegation()}
                          bsSize="xsmall"
                        >
                          <Glyphicon glyph="remove" />
                        </Button>
                      </OverlayTrigger>

                    </ButtonGroup>

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
