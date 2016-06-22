import React, { PropTypes, Component } from 'react';

import {
  Row,
  Col,
  Form,
  FormControl,
  ButtonToolbar,
  Button,
  Glyphicon,
  DropdownButton,
  MenuItem,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import NewProposal from '../NewProposal';
import MarkdownTextArea from '../../../MarkdownTextArea';

export default class ProposalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deadLine: undefined,
      propositions: this.props.propositions,
    };
  }

  handleChange(field, value) {
    this.setState({ [field]: value });
  }

  handleEvent(e, field) {
    this.handleChange(field, e.target.value);
  }

  handleDateChange(moment) {
    this.handleChange('deadLine', moment);
  }

  onCategoryChange(key) {
    const category = key < 0 ? undefined : categories[key];
    this.handleChange('category', category);
  }

  addProposal(e) {
    e.preventDefault();
    this.setState({
      propositions: [...this.state.propositions, {}],
    });
  }

  setProposal(i, proposal) {
    const { propositions } = this.state;
    propositions[i] = proposal;
    this.setState({
      propositions: propositions,
    });
  }

  submitForm(e) {
    e.preventDefault();
    const {
      title,
      description,
      category,
      deadLine,
      maxPoints,
      propositions,
    } = this.state;

    this.props.saveSubject({
      title,
      description,
      category,
      deadLine,
      maxPoints,
      propositions,
    });
  }

  render() {
    const { categories, propositions } = this.props;

    const createProposal = (proposition, i) => (
      <NewProposal key={ i } rank={ i }
        onChange={ (i, proposal) => this.setProposal(i, proposal) } />
    );

    const categoriesMenuItems = categories.map((c, i) =>
      <MenuItem key={i} eventKey={i} onSelect={(e, key) => onCategoryChange(key)}>{c.title}</MenuItem>
    );

    const category = this.state.category == undefined ? "Catégorie..." : this.state.category.title;
    return (
      <Form onSubmit={e => this.submitForm(e)} >
        <fieldset>
          <legend>New Subject</legend>
          <FormControl
            value={this.state.title}
            onChange={ e => this.handleEvent(e, 'title') }
            type="text"
            label="Titre"
            placeholder="Entrez votre titre..."
          />
          <MarkdownTextArea
            value={this.state.description}
            onChange={ e => this.handleEvent(e, 'description') }
            label="Description"
            placeholder="Entrez votre description... (Markdown supporté)"
          />
          <Row>
            <Col sm={4}>
              <DropdownButton
                id="bg-nested-dropdown"
                title={category}
                onSelect={(e, key) => this.onCategoryChange(e, key)}
              >
                <MenuItem eventKey="-1">Aucune</MenuItem>
                { categoriesMenuItems }
              </DropdownButton>
            </Col>
            <Col sm={4}>
              <DatePicker
                selected={this.state.deadLine}
                minDate={moment()}
                onChange={ date => this.handleDateChange(date) }
                locale='fr-FR'
                placeholderText="Date de fin"
                className="form-control"
              />
            </Col>
            <Col sm={4}>
              <FormControl
                value={this.state.maxPoints}
                onChange={ e => this.handleEvent(e, 'maxPoints') }
                type="number" defaultValue="1"
                label="Nombre de points à répartir"
                placeholder="Nombre de points à répartir en dot voting."
              />
            </Col>
          </Row>
          <hr />
          { propositions.map(createProposal) }

          <Button
            className="new-subject-buttons"
            onClick={ e => this.addProposal(e) }
          >
            <Glyphicon glyph="plus" /> Ajouter une réponse
          </Button>

          <ButtonToolbar>
            <LinkContainer to={ { pathname: '/' } }>
              <Button className="new-subject-buttons"><Glyphicon glyph="remove" /> Cancel</Button>
            </LinkContainer>
            <Button className="new-subject-buttons" type="submit" bsStyle="success">Save</Button>
          </ButtonToolbar>
        </fieldset>
      </Form>
    );
  }
};

ProposalForm.propTypes = {
  categories: PropTypes.array.isRequired,
  propositions: PropTypes.array.isRequired,
  saveSubject: PropTypes.func.isRequired,
};

export default ProposalForm;
