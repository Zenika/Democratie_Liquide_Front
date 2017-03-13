import React, { Component, PropTypes } from 'react';
import { defaultCategory, defaultChannel } from '../../../config/constants';

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
import ChannelsList from '../ChannelsList';
import ActionBar  from '../ActionBar';
import SideBarWrapper  from '../SideBarWrapper';

import subjectStore from '../../../core/subjects-store';
import usersStore from '../../../core/users-store';
import powersStore from '../../../core/powers-store';
import categoriesStore from '../../../core/categories-store';
import channelsStore from '../../../core/channels-store';

import './index.scss';
import MessageManager from '../../MessageManager';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collaborator: {},
      delegateSubject: {},
      selectedCategory: defaultCategory,
      selectedChannel: defaultChannel,
      isDataResolved: false,
      showSubjectDelegate: false,
      showCategoryDelegate: false,
      categories: [],
      joinedChannels: [],
      unjoinedChannels: [],
    };
  }

  getNewSubjects(subjects) {
    return subjects.filter(subject => {
      let { isClosed, isVoted, receivedDelegations, givenDelegation } = subject
      return !isClosed && !isVoted && !givenDelegation
    });
  }

  getDelegatedSubjects(subjects) {
    return subjects.filter(subject => !!subject.givenDelegation).map(subject => {
      subject.givenDelegation = subject.givenDelegation.replace('@zenika.com', '')
      return subject;
    });
  }

  getMySubjects(subjects) {
    return subjects.filter(subject => subject.isMine);
  }

  getVotedSubjects(subjects) {
    return subjects.filter(subject => subject.isVoted);
  }

  refreshData() {
    // console.log('app/components/App/Home@refreshData');
    usersStore.getCurrentUser().then(user => {
      subjectStore.getSubjects()
      .then(subjects => {

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
              unjoinedChannels: channels.filter(channel => channel.collaborators.filter(collaborator => collaborator.email === user.email).length === 0),
              joinedChannels: channels.filter(channel => channel.collaborators.filter(collaborator => collaborator.email === user.email).length > 0),
            });
          });

        this.setState({
          allNewSubjects: this.getNewSubjects(subjects),
          allDelegatedSubjects: this.getDelegatedSubjects(subjects),
          allMySubjects: this.getMySubjects(subjects),
          allVotedSubjects: this.getVotedSubjects(subjects),
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
      MessageManager.displayMessage(response, "Délégation supprimée");
    });
  }

  removeCategoryDelegation() {
    powersStore.removeCategoryPower(this.state.selectedCategory.uuid).then((response)=> {
      this.refreshData();
      MessageManager.displayMessage(response, "Délégation supprimée");
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

  manageChannelsList(show) {
    this.setState({ showChannelsList: show }, show ? undefined : this.refreshData);
  }

  selectCategory(category) {
    this.setState({ selectedCategory: category }, this.filterSubjects);
  }

  selectChannel(channel) {
    this.setState({ selectedChannel: channel }, this.filterSubjects);
  }

  joinChannel(channelId) {
    channelsStore.joinChannel(channelId);
    this.refreshData();
  }

  quitChannel(channelId) {
    channelsStore.quitChannel(channelId);

    if (channelId === this.state.selectedChannel.uuid) {
      this.setState({ selectedChannel: defaultChannel});
    }

    this.refreshData();
  }

  saveSubject(subject) {
    // subject.channel = this.state.joinedChannels.find((channel) => channel.uuid === this.state.selectedChannel);
    return subjectStore.createSubject(subject);
  }

  filterSubjects() {
    // console.log('app/components/App/Home@filterSubjects');

    // Initialize objects
    let filteredNewSubjects = this.state.allNewSubjects;
    let filteredDelegatedSubjects = this.state.allDelegatedSubjects;
    let filteredMySubjects = this.state.allMySubjects;
    let filteredVotedSubjects = this.state.allVotedSubjects;

    // Filter according to selected category
    if (this.state.selectedCategory.uuid) {
      filteredNewSubjects = filteredNewSubjects.filter(s => s.category && s.category.uuid === this.state.selectedCategory.uuid);
      filteredDelegatedSubjects = filteredDelegatedSubjects.filter(s => s.category && s.category.uuid === this.state.selectedCategory.uuid);
      filteredMySubjects = filteredMySubjects.filter(s => s.category && s.category.uuid === this.state.selectedCategory.uuid);
      filteredVotedSubjects = filteredVotedSubjects.filter(s => s.category && s.category.uuid === this.state.selectedCategory.uuid);
    }

    // Filter according to selected channel
    if (this.state.selectedChannel.uuid) {
      filteredNewSubjects = filteredNewSubjects.filter(s => s.channel && s.channel.uuid === this.state.selectedChannel.uuid);
      filteredDelegatedSubjects = filteredDelegatedSubjects.filter(s => s.channel && s.channel.uuid === this.state.selectedChannel.uuid);
      filteredMySubjects = filteredMySubjects.filter(s => s.channel && s.channel.uuid === this.state.selectedChannel.uuid);
      filteredVotedSubjects = filteredVotedSubjects.filter(s => s.channel && s.channel.uuid === this.state.selectedChannel.uuid);
    } else {
      filteredNewSubjects = filteredNewSubjects.filter(s => !s.channel);
      filteredDelegatedSubjects = filteredDelegatedSubjects.filter(s => !s.channel);
      filteredMySubjects = filteredMySubjects.filter(s => !s.channel);
      filteredVotedSubjects = filteredVotedSubjects.filter(s => !s.channel);
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
      unjoinedChannels,
      joinedChannels,
      selectedCategory,
      isDataResolved,
    } = this.state;

    if (!isDataResolved) {
      return <Spinner />;
    }

    return (
      <SideBarWrapper
        unjoinedChannels = {this.state.unjoinedChannels}
        joinedChannels = {this.state.joinedChannels}
        selectChannel = {(channel) => this.selectChannel(channel)}
        selectedChannel = {this.state.selectedChannel}
        manageNewChannel = {(show) => this.manageNewChannel(show)}
        manageChannelsList = {(show) => this.manageChannelsList(show)}
      >
        <Panel>
          <ActionBar
            manageNewSubject = {(show) => this.manageNewSubject(show)}
            manageNewCategory = {(show) => this.manageNewCategory(show)}
            categories = {this.state.categories}
            selectedCategory = {this.state.selectedCategory}
            selectCategory = {(category) => this.selectCategory(category)}
            showCategoryDelegate = {(v) => this.manageCategoryDelegate(v)}
            onRemoveDelegation = {() => this.removeCategoryDelegation()} />
          <div>
            <DelegateSubjectModal
              subject={this.state.delegateSubject}
              show={this.state.showSubjectDelegate}
              onClose={()=> this.manageSubjectDelegate()}
            />
            <DelegateCategoryModal
              category={this.state.selectedCategory}
              show={this.state.showCategoryDelegate}
              onClose={()=> this.manageCategoryDelegate()}
            />
            <NewSubject
              show={this.state.showNewSubject}
              onClose={()=> this.manageNewSubject(false)}
              categories={this.state.categories}
              channels={this.state.joinedChannels}
              selectedCategory={this.state.selectedCategory}
              selectedChannel={this.state.selectedChannel}
              saveSubject={(subject) => this.saveSubject(subject)}
            />
            <NewCategory
              show={this.state.showNewCategory}
              onClose={()=> this.manageNewCategory(false)}
            />
            <NewChannel
              show={this.state.showNewChannel}
              onClose={()=> this.manageNewChannel(false)}
            />
            <ChannelsList
              joinedChannels={this.state.joinedChannels}
              unjoinedChannels={this.state.unjoinedChannels}
              show={this.state.showChannelsList}
              onClose={() => this.manageChannelsList(false)}
              joinChannel={ channelId => this.joinChannel(channelId) }
              quitChannel={ channelId => this.quitChannel(channelId) }
            />
            <Row>
              <Col md={6}>
                <Panel header="A traiter">
                  <SubjectsList
                    emptyMessage="Rien à traiter"
                    subjects={ filteredNewSubjects }
                    onDelegate={ subject => this.openSubjectDelegate(subject) }
                    onSelect={ subject => this.context.router.push(`/subjects/${subject.uuid}`) }
                  />
                </Panel>
              </Col>
              <Col md={6}>
                <Panel header="Voté" >
                  <SubjectsList
                    emptyMessage="Vous n'avez pas encore voté sur un sujet"
                    subjects={ filteredVotedSubjects }
                    onSelect={ subject => this.context.router.push(`/subjects/${subject.uuid}/results`) }
                  />
                </Panel>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Panel header="Délégué" >
                  <SubjectsList
                    emptyMessage="Vous n'avez pas encore délégué de sujet"
                    subjects={ filteredDelegatedSubjects }
                    onRemoveDelegation={subject => this.removeDelegation(subject)}
                    collaborator={this.state.collaborator}
                    onSelect={ subject => this.context.router.push(`/subjects/${subject.uuid}/results`) }
                  />
                </Panel>
              </Col>
              <Col md={6}>
                <Panel header="Vos sujets" >
                  <SubjectsList
                    emptyMessage="Vous n'avez pas encore créé de sujet"
                    subjects={ filteredMySubjects }
                    onSelect={ subject => this.context.router.push(`/subjects/${subject.uuid}/results`) }
                  />
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
