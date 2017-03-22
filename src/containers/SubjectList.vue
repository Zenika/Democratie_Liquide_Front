<template>
  <div class="subject-list">

    <template v-for="subject in subjects" v-show="filteredSubjects.length">
      <keep-alive>
        <subject-line class="subject-line" v-if="globalCheck(subject)"
          :subject="subject"
          :key="subject.uuid"
          @removeSubject="removeSubject(subject)"
          @delegateSubject="delegateSubject(subject)"
          @selectSubject="selectSubject(subject)"
      />
      </keep-alive>
    </template>
    <div class="empty" v-show="!filteredSubjects.length">{{ filter.subjectType.empty }}</div>
    <button class="simple create" title="Créer un sujet" @click="createSubject"><i class="fa fa-plus" aria-hidden="true"></i></button>


  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SubjectLine from '../components/SubjectLine'
import ModalManager from '@/managers/ModalManager'
import SubjectView from '@/containers/SubjectView'
import DelegationView from '@/containers/DelegationView'
import SubjectCreation from '@/containers/SubjectCreation'

export default {
  name: 'subject-list',

  data () {
    return {
      newSubject: {}
    }
  },

  computed: {
    ...mapGetters([
      'subjects',
      'filteredSubjects',
      'globalCheck',
      'filter',
      'defaultCategory',
      'defaultChannel'
    ])
  },

  methods: {

    selectSubject (subject) {
      let props = { subjectId: subject.uuid }
      ModalManager.display('Vote ', createElement => createElement(SubjectView, { props }))
    },

    removeSubject (subject) {
      ModalManager.display('Supprimer un sujet', createElement => createElement('div', 'Suppression de ' + subject.title))
    },

    delegateSubject (subject) {
      let props = { dataId: subject.uuid }
      ModalManager.display('Délégation d\'un sujet', createElement => createElement(DelegationView, { props }))
    },

    createSubject () {
      let props = { subject: this.newSubject }
      ModalManager.display('Création d\'un sujet', createElement => createElement(SubjectCreation, { props }))
    },

    initNewSubject () {
      this.newSubject = {
        title: '',
        description: '',
        maxPoints: 10,
        propositions: [{}, {}],
        category: this.defaultCategory,
        channel: this.defaultChannel,
        deadLine: null
      }
    }
  },

  mounted () {
    this.initNewSubject()
  },

  components: {
    SubjectLine
  }
}
</script>

<style lang="scss" scoped>

  @import '../assets/style';
  @import '../assets/transitions';

  .subject-list {
    text-align: center;
  }

  .empty {
    padding: 20px;
    font-weight: bold;
    font-size: 1.5em;
    color: lightgray;
  }

  .subject-line {
    transition: all 100ms linear;
    border-left: 0px solid map-get($reds, 'medium');

    &:nth-child(2n) {
      background: rgba(0,0,0,0.05);
    }
    &:hover {
      background: map-get($reds, 'lightest');
      color: map-get($reds, 'medium');
      border-left-width: 5px;
    }
  }

  .create {
    width: 96%;
    height: 100px;
    font-size: 3em;
    margin: 20px 2%;
  }
</style>
