import React, { Component, PropTypes } from 'react';

import {
  Panel,
  Button,
  Glyphicon,
  Row,
  Col
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import SubjectsList from '../SubjectsList';
import Spinner from '../../Spinner';
import DelegateModal from '../DelegateModal'

import store from '../../../core/subjects-store';

import './index.scss';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
      isDataResolved: false,
      showDelegate: false,
    };
  }

  getNewSubjects(subjects){
    return subjects.filter(element => { return element.votes.length === 0 });
  }

  getDelegatedSubjects(subjects){
    return [];
  }

  getMySubjects(subjects){
    return [];
  }

  getVotedSubjects(subjects){
    return subjects.filter(element => { return element.votes.length > 0 });
  }


  componentDidMount() {
    store.getSubjects()
    .then(subjects => {

      var newSubjects = this.getNewSubjects(subjects);
      var delegatedSubjects = this.getDelegatedSubjects(subjects);
      var mySubjects = this.getMySubjects(subjects);
      var votedSubjects = this.getVotedSubjects(subjects);


      this.setState({
        newSubjects: newSubjects,
        delegatedSubjects: delegatedSubjects,
        mySubjects: mySubjects,
        votedSubjects: votedSubjects,
        isDataResolved: true
      });
    });
  }

  openDelegate(subject){
    this.setState({showDelegate:true});
  }

  closeDelegate(){
    this.setState({showDelegate:false});
  }


  render() {
    const { newSubjects, delegatedSubjects, mySubjects, votedSubjects, isDataResolved } = this.state;
    if (!isDataResolved) {
      return <Spinner />;
    }
    return (

      <div>
        <DelegateModal show={this.state.showDelegate} onClose={()=> this.closeDelegate()}/>
        <Row>
          <Col xs={6}>
            <Panel header="Need an action">
              <SubjectsList subjects={ newSubjects } onDelegate={ subject => this.openDelegate(subject) } onSelect={ subject => this.context.router.push(`/subjects/${subject.uuid}`) }></SubjectsList>
            </Panel>
          </Col>
          <Col xs={6}>
            <Panel header="Voted" >
              <SubjectsList emptyMessage="You didn't vote on any subject yet" subjects={ votedSubjects }></SubjectsList>
            </Panel>
          </Col>
          <Col xs={6}>
            <Panel header="Delegated" >
              <SubjectsList emptyMessage="You don't have any delegated subject" subjects={ delegatedSubjects } onDelegate={ subject => this.openDelegate(subject) } onSelect={ subject => this.context.router.push(`/subjects/${subject.uuid}`) }></SubjectsList>
            </Panel>
          </Col>
          <Col xs={6}>
            <Panel header="Your subjects" >
              <SubjectsList emptyMessage="You don't have created any subject yet" subjects={ mySubjects } onDelegate={ subject => this.openDelegate(subject) } onSelect={ subject => this.context.router.push(`/subjects/${subject.uuid}`) }></SubjectsList>
            </Panel>
          </Col>
        </Row>
      </div>
    );
  }
}
Home.contextTypes= {
  router: PropTypes.object.isRequired
};
