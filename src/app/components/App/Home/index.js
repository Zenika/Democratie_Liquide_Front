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
import usersStore from '../../../core/users-store';
import powersStore from '../../../core/powers-store';

import './index.scss';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
      collaborator: {},
      delegateSubject: {},
      isDataResolved: false,
      showDelegate: false,
    };
  }

  getNewSubjects(subjects, collaboratorId){
    return subjects.filter(subject => {
      var userVotes = subject.votes.filter(vote => {
        return collaboratorId === vote.collaborateurId;
      })
      var userDelegations = subject.powers.filter(power => {
        return collaboratorId === power.collaborateurIdFrom;
      })
      return userVotes.length === 0 && userDelegations.length === 0;
     });
   }

  getDelegatedSubjects(subjects, collaboratorId){
    return subjects.filter(subject => {
      var userDelegations = subject.powers.filter(power => {
        return collaboratorId === power.collaborateurIdFrom;
      })
      return userDelegations.length > 0
     });
  }

  getMySubjects(subjects, collaboratorId){
    return subjects.filter(element => {
      return element.collaborateurId === collaboratorId
    });
  }

  getVotedSubjects(subjects, collaboratorId){
    return subjects.filter(subject => {
      var userVotes = subject.votes.filter(vote => {
        return collaboratorId === vote.collaborateurId;
      })
      return userVotes.length > 0
     });
  }

  refreshData() {
    usersStore.getCurrentUser().then(user => {
      store.getSubjects()
      .then(subjects => {
        //user.collaboratorId = 123456;
        var newSubjects = this.getNewSubjects(subjects, user.collaboratorId);
        var delegatedSubjects = this.getDelegatedSubjects(subjects, user.collaboratorId);
        var mySubjects = this.getMySubjects(subjects, user.collaboratorId);
        var votedSubjects = this.getVotedSubjects(subjects, user.collaboratorId);


        this.setState({
          newSubjects: newSubjects,
          delegatedSubjects: delegatedSubjects,
          mySubjects: mySubjects,
          votedSubjects: votedSubjects,
          collaborator: user,
          isDataResolved: true
        });
      });
    });
  }

  componentDidMount() {
    this.refreshData();
  }

  openDelegate(subject){
    this.setState({
      showDelegate:true,
      delegateSubject:subject
    });
  }

  removeDelegation(subject){
    powersStore.removePower(subject).then(()=>{
      this.refreshData();
    })
  }

  closeDelegate(){
    this.setState({showDelegate:false});
    this.refreshData();
  }


  render() {
    const { newSubjects, delegatedSubjects, mySubjects, votedSubjects, isDataResolved } = this.state;
    if (!isDataResolved) {
      return <Spinner />;
    }
    return (

      <div>
        <DelegateModal subject={this.state.delegateSubject} show={this.state.showDelegate} onClose={()=> this.closeDelegate()}/>
        <Row>
          <Col xs={6}>
            <Panel header="Need an action">
              <SubjectsList subjects={ newSubjects } onDelegate={ subject => this.openDelegate(subject) } onSelect={ subject => this.context.router.push(`/subjects/${subject.uuid}`) }></SubjectsList>
            </Panel>
          </Col>
          <Col xs={6}>
            <Panel header="Voted" >
              <SubjectsList emptyMessage="You didn't vote on any subject yet" subjects={ votedSubjects } onSelect={ subject => this.context.router.push(`/subjects/${subject.uuid}/results`) }></SubjectsList>
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <Panel header="Delegated" >
              <SubjectsList emptyMessage="You don't have any delegated subject" subjects={ delegatedSubjects } onRemoveDelegation={subject => this.removeDelegation(subject)} collaborator={this.state.collaborator} onSelect={ subject => this.context.router.push(`/subjects/${subject.uuid}/results`) }></SubjectsList>
            </Panel>
          </Col>
          <Col xs={6}>
            <Panel header="Your subjects" >
              <SubjectsList emptyMessage="You don't have created any subject yet" subjects={ mySubjects } onSelect={ subject => this.context.router.push(`/subjects/${subject.uuid}/results`) }></SubjectsList>
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
