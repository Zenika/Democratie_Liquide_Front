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
import DelegateSubjectModal from '../DelegateSubjectModal';
import DelegateCategoryModal from '../DelegateCategoryModal';
import NewSubject from '../NewSubject';
import NewCategory from '../NewCategory';
import NewChannel from '../NewChannel';
import JoinedChannels from '../JoinedChannels';
import ActionBar  from '../ActionBar';
import SideBarWrapper  from '../SideBarWrapper';

import subjectStore from '../../../core/subjects-store';
import usersStore from '../../../core/users-store';
import powersStore from '../../../core/powers-store';
import categoriesStore from '../../../core/categories-store';
import channelsStore from '../../../core/channels-store';

import './index.scss';
import MessageManager from '../MessageManager';
import Messagebar from '../../Messagebar';

export default class Home extends MessageManager {

  constructor(props) {
    super(props);
    this.state = {
      collaborator: {},
      delegateSubject: {},
      selectedCategory: "ALL",
      selectedChannel: "general",
      isDataResolved: false,
      showSubjectDelegate: false,
      showCategoryDelegate: false,
    };
  }

  getNewSubjects(subjects, collaboratorId) {
    return subjects.filter(subject => {
      const userVotes = subject.votes.filter(vote => collaboratorId === vote.collaboratorId);
      const userDelegations = subject.powers.filter(power => collaboratorId === power.collaboratorIdFrom);

      if (userVotes.length === 0 && userDelegations.length === 0) {
        const delegatedToMe = subject.powers.filter(power => collaboratorId === power.collaboratorIdTo);
        if (delegatedToMe.length > 0) {
          subject.delegatedToMe = delegatedToMe.length;
        }

        return true;
      };

      return false;
    });
  }

  getDelegatedSubjects(subjects, collaboratorId) {
    return subjects.filter(subject => {
      const userDelegations = subject.powers.filter(power => collaboratorId === power.collaboratorIdFrom);
      if (userDelegations.length > 0) {
        subject.delegation = userDelegations[0].collaboratorIdTo.replace('@zenika.com', '');
      }

      return userDelegations.length > 0;
    });
  }

  getMySubjects(subjects, collaboratorId) {
    return subjects.filter(element => element.collaboratorId === collaboratorId);
  }

  getVotedSubjects(subjects, collaboratorId) {
    return subjects.filter(subject => {
      const userVotes = subject.votes.filter(vote => collaboratorId === vote.collaboratorId);
      return userVotes.length > 0;
    });
  }

  refreshData() {
    usersStore.getCurrentUser().then(user => {
      subjectStore.getSubjects()
      .then(subjects => {
        const { opened, closed } = subjects;
        const all = [...opened, ...closed];

        categoriesStore.getCategories()
          .then(categories => {
            this.setState({
              categories: categories,
              isDataResolved: true,
            });
          });

        channelsStore.getChannels()
          .then(channels => {
            this.setState({
              allChannels: channels,
              joinedChannels: channels.filter((channel) => channel.people.indexOf(user.email) !== -1),
            });
          });

        this.setState({
          allNewSubjects: this.getNewSubjects(opened, user.email),
          allDelegatedSubjects: this.getDelegatedSubjects(all, user.email),
          allMySubjects: this.getMySubjects(all, user.email),
          allVotedSubjects: this.getVotedSubjects(all, user.email),
          collaborator: user,
        });

        this.filterSubjects();

      });
    });
  }

  componentDidMount() {
    this.refreshData();
  }

  openSubjectDelegate(subject) {
    this.setState({ delegateSubject: subject }, () => this.manageSubjectDelegate(true));
  }

  manageSubjectDelegate(show) {
    this.setState({ showSubjectDelegate: show }, show ? undefined : this.refreshData);
  }

  manageCategoryDelegate(show) {
    this.setState({ showCategoryDelegate: show }, show ? undefined : this.refreshData);
  }

  removeDelegation(subject) {
    powersStore.removePower(subject).then((response)=> {
      this.refreshData();
      this.displayMessage(response, "Délégation supprimée");
    });
  }

  removeCategoryDelegation() {
    powersStore.removeCategoryPower(this.state.selectedCategory).then((response)=> {
      this.refreshData();
      this.displayMessage(response, "Délégation supprimée");
    });
  }

  manageNewSubject(show) {
    this.setState({ showNewSubject: show }, show ? undefined : this.refreshData);
  }

  manageNewCategory(show) {
    this.setState({ showNewCategory: show }, show ? undefined : this.refreshData);
  }

  manageNewChannel(show) {
    this.setState({ showNewChannel: show }, show ? undefined : this.refreshData);
  }

  manageJoinedChannels(show) {
    this.setState({ showJoinedChannels: show }, show ? undefined : this.refreshData);
  }

  selectCategory(key) {
    this.setState({ selectedCategory: key }, this.filterSubjects);
  }

  selectChannel(key) {
    this.setState({ selectedChannel: key }, this.filterSubjects);
  }

  filterSubjects() {
    console.log('app/components/App/Home@filterSubjects');

    // Initialize objects
    let filteredNewSubjects = this.state.allNewSubjects;
    let filteredDelegatedSubjects = this.state.allDelegatedSubjects;
    let filteredMySubjects = this.state.allMySubjects;
    let filteredVotedSubjects = this.state.allVotedSubjects;

    // Filter according to selected category
    if (this.state.selectedCategory !== "ALL") {
      filteredNewSubjects = filteredNewSubjects.filter(s => s.category && s.category.uuid === this.state.selectedCategory);
      filteredDelegatedSubjects = filteredDelegatedSubjects.filter(s => s.category && s.category.uuid === this.state.selectedCategory);
      filteredMySubjects = filteredMySubjects.filter(s => s.category && s.category.uuid === this.state.selectedCategory);
      filteredVotedSubjects = filteredVotedSubjects.filter(s => s.category && s.category.uuid === this.state.selectedCategory);
    }

    // Filter according to selected channel
    if (this.state.selectedChannel !== "general") {
      filteredNewSubjects = filteredNewSubjects.filter(s => s.channel && s.channel.uuid === this.state.selectedChannel);
      filteredDelegatedSubjects = filteredDelegatedSubjects.filter(s => s.channel && s.channel.uuid === this.state.selectedChannel);
      filteredMySubjects = filteredMySubjects.filter(s => s.channel && s.channel.uuid === this.state.selectedChannel);
      filteredVotedSubjects = filteredVotedSubjects.filter(s => s.channel && s.channel.uuid === this.state.selectedChannel);
    }

    // Update state
    this.setState({
      filteredNewSubjects: filteredNewSubjects,
      filteredDelegatedSubjects: filteredDelegatedSubjects,
      filteredMySubjects: filteredMySubjects,
      filteredVotedSubjects: filteredVotedSubjects,
    });
  }

  render() {
    const {
      allNewSubjects,
      allDelegatedSubjects,
      allMySubjects,
      allVotedSubjects,
      filteredNewSubjects,
      filteredDelegatedSubjects,
      filteredMySubjects,
      filteredVotedSubjects,
      categories,
      allChannels,
      joinedChannels,
      selectedCategory,
      isDataResolved,
    } = this.state;

    if (!isDataResolved) {
      return <Spinner />;
    }

    return (
      <SideBarWrapper
        allChannels = {this.state.allChannels}
        joinedChannels = {this.state.joinedChannels}
        selectChannel = {(key) => this.selectChannel(key)}
        manageNewChannel = {(show) => this.manageNewChannel(show)}
        manageJoinedChannels = {(show) => this.manageJoinedChannels(show)}
      >
        <Panel>
          <ActionBar
            manageNewSubject = {(show) => this.manageNewSubject(show)}
            manageNewCategory = {(show) => this.manageNewCategory(show)}
            categories = {this.state.categories}
            selectedCategory = {this.state.selectedCategory}
            selectCategory = {(key) => this.selectCategory(key)}
            showCategoryDelegate = {(v) => this.manageCategoryDelegate(v)}
            onRemoveDelegation = {() => this.removeCategoryDelegation()} />
          <div>
            <Messagebar message = {this.state.message} isMessageSuccessVisible = {this.state.isMessageSuccessVisible}  isMessageDangerVisible = {this.state.isMessageDangerVisible} handleAlertDismiss = {() => this.handleAlertDismiss()} />
            <DelegateSubjectModal subject={this.state.delegateSubject} show={this.state.showSubjectDelegate} onClose={()=> this.manageSubjectDelegate()}/>
            <DelegateCategoryModal category={this.state.selectedCategory} show={this.state.showCategoryDelegate} onClose={()=> this.manageCategoryDelegate()}/>
            <NewSubject show={this.state.showNewSubject} onClose={()=> this.manageNewSubject(false)} categories={this.state.categories}/>
            <NewCategory show={this.state.showNewCategory} onClose={()=> this.manageNewCategory(false)}/>
            <NewChannel show={this.state.showNewChannel} onClose={()=> this.manageNewChannel(false)}/>
            <JoinedChannels show={this.state.showJoinedChannels} onClose={()=> this.manageJoinedChannels(false)}/>
            <Row>
              <Col md={6}>
                <Panel header="A traiter">
                  <SubjectsList emptyMessage="Rien à traiter" subjects={ filteredNewSubjects } onDelegate={ subject => this.openSubjectDelegate(subject) } onSelect={ subject => this.context.router.push(`/subjects/${subject.uuid}`) }></SubjectsList>
                </Panel>
              </Col>
              <Col md={6}>
                <Panel header="Voté" >
                  <SubjectsList emptyMessage="Vous n'avez pas encore voté sur un sujet" subjects={ filteredVotedSubjects } onSelect={ subject => this.context.router.push(`/subjects/${subject.uuid}/results`) }></SubjectsList>
                </Panel>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Panel header="Délégué" >
                  <SubjectsList emptyMessage="Vous n'avez pas encore délégué de sujet" subjects={ filteredDelegatedSubjects } onRemoveDelegation={subject => this.removeDelegation(subject)} collaborator={this.state.collaborator} onSelect={ subject => this.context.router.push(`/subjects/${subject.uuid}/results`) }></SubjectsList>
                </Panel>
              </Col>
              <Col md={6}>
                <Panel header="Vos sujets" >
                  <SubjectsList emptyMessage="Vous n'avez pas encore créé de sujet" subjects={ filteredMySubjects } onSelect={ subject => this.context.router.push(`/subjects/${subject.uuid}/results`) }></SubjectsList>
                </Panel>
              </Col>
            </Row>
          </div>
        </Panel>
      </SideBarWrapper>
    );
  }
}

Home.contextTypes = {
  router: PropTypes.object.isRequired,
};
