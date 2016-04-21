import React, { Component, PropTypes } from 'react';

import {
  Panel,
  Button,
  Glyphicon,
  Row,
  Col,
  DropdownButton,
  MenuItem
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import SubjectsList from '../SubjectsList';
import Spinner from '../../Spinner';
import DelegateModal from '../DelegateModal'
import NewSubject from '../NewSubject'
import NewCategory from '../NewCategory'

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
      isDataResolved: false,
      showDelegate: false,
    };
  }

  getNewSubjects(subjects, collaboratorId){
    var collaboratorId = collaboratorId;
    return subjects.filter(subject => {
      var userVotes = subject.votes.filter(vote => {
        return collaboratorId === vote.collaborateurId;
      })
      var userDelegations = subject.powers.filter(power => {
        return collaboratorId === power.collaborateurIdFrom;
      })
      if(userVotes.length === 0 && userDelegations.length === 0){
        var delegatedToMe = subject.powers.filter(power => {
          return collaboratorId === power.collaborateurIdTo;
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
        return collaboratorId === power.collaborateurIdFrom;
      })
      if(userDelegations.length > 0){
        subject.delegation = userDelegations[0].collaborateurIdTo.replace('@zenika.com', '');
      }
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
      subjectStore.getSubjects()
      .then(subjects => {
        //user.collaboratorId = 123456;
        var newSubjects = this.getNewSubjects(subjects, user.email);
        var delegatedSubjects = this.getDelegatedSubjects(subjects, user.email);
        var mySubjects = this.getMySubjects(subjects, user.email);
        var votedSubjects = this.getVotedSubjects(subjects, user.email);

        this.setState({
          newSubjects: newSubjects,
          delegatedSubjects: delegatedSubjects,
          mySubjects: mySubjects,
          votedSubjects: votedSubjects,
          collaborator: user
        });

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

  openDelegate(subject){
    this.setState({
      showDelegate:true,
      delegateSubject:subject
    });
  }

  removeDelegation(subject){
    powersStore.removePower(subject).then((response)=>{
      this.refreshData();
      this.displayMessage(response, "Délégation supprimée");
    })
  }

  closeDelegate(){
    this.setState({showDelegate:false});
    this.refreshData();
  }

  closeNewSubject(){
    this.setState({showNewSubject:false});
    this.refreshData();
  }

  closeNewCategory(){
    this.setState({showNewCategory:false});
    this.refreshData();
  }


  render() {
    const { newSubjects, delegatedSubjects, mySubjects, votedSubjects, categories, isDataResolved } = this.state;
    if (!isDataResolved) {
      return <Spinner />;
    }
    return (
     <panel>
      <div>
        <row>
          <Col xs={6}>
          </Col>
          <Col xs={6}>
              <DropdownButton title="Catégories" id="bg-nested-dropdown">
                  {
                    this.state.categories.map( (c,i) =>
                      <MenuItem eventKey={i}>{c.title}</MenuItem>
                    )
                  }
              </DropdownButton>
              <Button onClick={()=>this.setState({showNewSubject:true})}><Glyphicon glyph="plus" /> Créer un sujet</Button>
              <Button onClick={()=>this.setState({showNewCategory:true})}><Glyphicon glyph="plus" /> Créer une nouvelle catégorie</Button>
          </Col>
        </row>
      </div>
      <div>
        <Messagebar message = {this.state.message} isMessageSuccessVisible = {this.state.isMessageSuccessVisible}  isMessageDangerVisible = {this.state.isMessageDangerVisible} handleAlertDismiss = {() => this.handleAlertDismiss()} />
        <DelegateModal subject={this.state.delegateSubject} show={this.state.showDelegate} onClose={()=> this.closeDelegate()}/>
        <NewSubject show={this.state.showNewSubject} onClose={()=> this.closeNewSubject()} categories={this.state.categories}/>
        <NewCategory show={this.state.showNewCategory} onClose={()=> this.closeNewCategory()}/>
        <Row>
          <Col xs={6}>
            <Panel header="A traiter">
              <SubjectsList emptyMessage="Rien à traiter" subjects={ newSubjects } onDelegate={ subject => this.openDelegate(subject) } onSelect={ subject => this.context.router.push(`/subjects/${subject.uuid}`) }></SubjectsList>
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
