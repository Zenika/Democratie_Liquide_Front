import React, { Component, PropTypes } from 'react';

import {
  Panel,
  Button,
  Glyphicon,
  Row,
  Col,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import SubjectsList from '../SubjectsList';
import Spinner from '../../Spinner';
import DelegateSubjectModal from '../DelegateSubjectModal'
import DelegateCategoryModal from '../DelegateCategoryModal'
import NewSubject from '../NewSubject'
import NewCategory from '../NewCategory'
import ActionBar  from '../ActionBar'

import subjectStore from '../../../core/subjects-store';
import usersStore from '../../../core/users-store';
import powersStore from '../../../core/powers-store';
import categoriesStore from '../../../core/categories-store';

import './index.scss';
import MessageManager from '../MessageManager';
import Messagebar from '../../Messagebar';

export default class Home extends MessageManager {

  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
      collaborator: {},
      delegateSubject: {},
      selectedCategory: "ALL",
      isDataResolved: false,
      showSubjectDelegate: false,
      showCategoryDelegate: false
    };
  }

  getNewSubjects(subjects, collaboratorId){
    var collaboratorId = collaboratorId;
    return subjects.filter(subject => {
      var userVotes = subject.votes.filter(vote => {
        return collaboratorId === vote.collaboratorId;
      })
      var userDelegations = subject.powers.filter(power => {
        return collaboratorId === power.collaboratorIdFrom;
      })
      if(userVotes.length === 0 && userDelegations.length === 0){
        var delegatedToMe = subject.powers.filter(power => {
          return collaboratorId === power.collaboratorIdTo;
        })
        if (delegatedToMe.length > 0){
          subject.delegatedToMe = delegatedToMe.length;
        }
        return true;
      };
      return false;
     });
   }

  getDelegatedSubjects(subjects, collaboratorId){
    return subjects.filter(subject => {
      var userDelegations = subject.powers.filter(power => {
        return collaboratorId === power.collaboratorIdFrom;
      })
      if(userDelegations.length > 0){
        subject.delegation = userDelegations[0].collaboratorIdTo.replace('@zenika.com', '');
      }
      return userDelegations.length > 0
     });
  }

  getMySubjects(subjects, collaboratorId){
    return subjects.filter(element => {
      return element.collaboratorId === collaboratorId
    });
  }

  getVotedSubjects(subjects, collaboratorId){
    return subjects.filter(subject => {
      var userVotes = subject.votes.filter(vote => {
        return collaboratorId === vote.collaboratorId;
      })
      return userVotes.length > 0
     });
  }

  refreshData() {
    usersStore.getCurrentUser().then(user => {
      subjectStore.getSubjects()
      .then(subjects => {
        var newSubjects = this.getNewSubjects(subjects, user.email);
        var delegatedSubjects = this.getDelegatedSubjects(subjects, user.email);
        var mySubjects = this.getMySubjects(subjects, user.email);
        var votedSubjects = this.getVotedSubjects(subjects, user.email);

        this.setState({
          newSubjects: newSubjects,
          delegatedSubjects: delegatedSubjects,
          mySubjects: mySubjects,
          votedSubjects: votedSubjects,
          completeNewSubjects: newSubjects,
          completeDelegatedSubjects: delegatedSubjects,
          completeMySubjects: mySubjects,
          completeVotedSubjects: votedSubjects,
          collaborator: user
        });

        this.filterSubjectsByCategory(this.state.selectedCategory);

        categoriesStore.getCategories()
          .then(categories => {
            this.setState({
              categories: categories,
              isDataResolved: true
            });
          });

      });
    });
  }

  componentDidMount() {
    this.refreshData();
  }

  openSubjectDelegate(subject) {
    this.setState({
      delegateSubject:subject
    });
    this.manageSubjectDelegate(true);
  }

  manageSubjectDelegate(value){
    this.setState({
      showSubjectDelegate:value
    });
    if (!value) {
      this.refreshData();
    }
  }

  manageCategoryDelegate(value){
    this.setState({
      showCategoryDelegate:value
    });
    if (!value) {
      this.refreshData();
    }
  }

  removeDelegation(subject){
    powersStore.removePower(subject).then((response)=>{
      this.refreshData();
      this.displayMessage(response, "Délégation supprimée");
    })
  }

  removeCategoryDelegation(){
    powersStore.removeCategoryPower(this.state.selectedCategory).then((response)=>{
      this.refreshData();
      this.displayMessage(response, "Délégation supprimée");
    })
  }

  manageNewSubject(value){
    this.setState({showNewSubject:value});
    this.refreshData();
  }

  manageNewCategory(value){
    this.setState({showNewCategory:value});
    this.refreshData();
  }

  selectCategory(key) {
    this.setState({selectedCategory:key});
    this.filterSubjectsByCategory(key);
  }

  filterSubjectsByCategory(key) {
    if (key == "ALL") {
      this.setState({
        newSubjects: this.state.completeNewSubjects,
        delegatedSubjects: this.state.completeDelegatedSubjects,
        mySubjects: this.state.completeMySubjects,
        votedSubjects: this.state.completeVotedSubjects
      });
    } else {
      this.setState({
        newSubjects: this.state.completeNewSubjects.filter(s => {
              return s.category && s.category.uuid === key;
            }),
        delegatedSubjects: this.state.completeDelegatedSubjects.filter(s => {
              return s.category && s.category.uuid === key;
            }),
        mySubjects: this.state.completeMySubjects.filter(s => {
              return s.category && s.category.uuid === key;
            }),
        votedSubjects: this.state.completeVotedSubjects.filter(s => {
              return s.category && s.category.uuid === key;
            })
      });
    }
  }


  render() {
    const { completeNewSubjects, completeDelegatedSubjects, completeMySubjects, completeVotedSubjects, newSubjects, delegatedSubjects, mySubjects, votedSubjects, categories, selectedCategory, isDataResolved } = this.state;
    if (!isDataResolved) {
      return <Spinner />;
    }
    return (
     <panel>
      <ActionBar manageNewSubject = {(value) => this.manageNewSubject(value)} manageNewCategory = {(value) => this.manageNewCategory(value)} categories = {this.state.categories} selectedCategory = {this.state.selectedCategory}  selectCategory = {(key) => this.selectCategory(key)} showCategoryDelegate = {(v) => this.manageCategoryDelegate(v)} onRemoveDelegation = {() => this.removeCategoryDelegation()} />
      <div>
        <Messagebar message = {this.state.message} isMessageSuccessVisible = {this.state.isMessageSuccessVisible}  isMessageDangerVisible = {this.state.isMessageDangerVisible} handleAlertDismiss = {() => this.handleAlertDismiss()} />
        <DelegateSubjectModal subject={this.state.delegateSubject} show={this.state.showSubjectDelegate} onClose={()=> this.manageSubjectDelegate()}/>
        <DelegateCategoryModal category={this.state.selectedCategory} show={this.state.showCategoryDelegate} onClose={()=> this.manageCategoryDelegate()}/>
        <NewSubject show={this.state.showNewSubject} onClose={()=> this.manageNewSubject(false)} categories={this.state.categories}/>
        <NewCategory show={this.state.showNewCategory} onClose={()=> this.manageNewCategory(false)}/>
        <Row>
          <Col xs={6}>
            <Panel header="A traiter">
              <SubjectsList emptyMessage="Rien à traiter" subjects={ newSubjects } onDelegate={ subject => this.openSubjectDelegate(subject) } onSelect={ subject => this.context.router.push(`/subjects/${subject.uuid}`) }></SubjectsList>
            </Panel>
          </Col>
          <Col xs={6}>
            <Panel header="Voté" >
              <SubjectsList emptyMessage="Vous n'avez pas encore voté sur un sujet" subjects={ votedSubjects } onSelect={ subject => this.context.router.push(`/subjects/${subject.uuid}/results`) }></SubjectsList>
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <Panel header="Délégué" >
              <SubjectsList emptyMessage="Vous n'avez pas encore délégué de sujet" subjects={ delegatedSubjects } onRemoveDelegation={subject => this.removeDelegation(subject)} collaborator={this.state.collaborator} onSelect={ subject => this.context.router.push(`/subjects/${subject.uuid}/results`) }></SubjectsList>
            </Panel>
          </Col>
          <Col xs={6}>
            <Panel header="Vos sujets" >
              <SubjectsList emptyMessage="Vous n'avez pas encore créé de sujet" subjects={ mySubjects } onSelect={ subject => this.context.router.push(`/subjects/${subject.uuid}/results`) }></SubjectsList>
            </Panel>
          </Col>
        </Row>
      </div>
     </panel>
    );
  }
}
Home.contextTypes= {
  router: PropTypes.object.isRequired
};
