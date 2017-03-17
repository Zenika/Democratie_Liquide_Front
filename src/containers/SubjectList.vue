<template>
  <div class="subject-list">

    <div class="tabs">
      <div
        v-for="tab in tabs"
        :class="{selected: filter.tab === tab}"
        @click="filterTab(tab)"
      >{{ tab.label }}</div>
    </div>

    <div class="subjects" v-show="filteredSubjects.length">
      <template v-for="subject in subjects">
        <keep-alive>
          <subject-line v-if="globalFilterCheck(subject)"
            :subject="subject"
            :key="subject.uuid"
            @removeSubject="removeSubject(subject)"
            @delegateSubject="delegateSubject(subject)"
            @selectSubject="selectSubject(subject)"
        />
        </keep-alive>
      </template>
    </div>
    <span v-show="!filteredSubjects.length">{{ filter.tab.empty }}</span>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SubjectLine from '../components/SubjectLine'
import ModalManager from '@/managers/ModalManager'
import SubjectVoteForm from '@/components/SubjectVoteForm'
import SubjectVoteResults from '@/components/SubjectVoteResults'
import { tabs } from '@/config/constants'

export default {
  name: 'subject-list',

  computed: {
    ...mapGetters([
      'subjects',
      'filteredSubjects',
      'globalFilterCheck',
      'filter'
    ]),
    tabs () {
      return tabs
    }
  },

  methods: {
    ...mapActions(['filterTab']),

    selectSubject (subject) {
      let props = { subject }
      if (!subject.isClosed && !subject.isVoted) {
        ModalManager.display('Vote en cours', createElement => createElement(SubjectVoteForm, { props }))
      } else {
        ModalManager.display('Résultats du vote', createElement => createElement(SubjectVoteResults, { props }))
      }
    },

    removeSubject (subject) {
      ModalManager.display('Supprimer un sujet', createElement => createElement('div', 'Suppression de ' + subject.title))
    },

    delegateSubject (subject) {
      ModalManager.display('Choix d\'un délégataire', createElement => createElement('div', 'Delegation de ' + subject.title))
    }

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

  .tabs {
    border-bottom: 1px solid rgba(0,0,0,0.1);
    * {
      display: inline-block;
      cursor: pointer;
      outline: none;
      padding: 10px 20px;
      margin: 0;
      border: none;
      background: transparent;
      transition: color 0.3s ease;
      font-size: 16px;
      position: relative;

      &:hover {
        color: map-get($colors, 'base');
      }

      &:active, &:focus, &.selected {
        color: map-get($colors, 'base');
      }

      &.selected {
        color: map-get($colors, 'base');
        &::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          top: 100%;
          border-bottom: 2px solid map-get($colors, 'base');
        }
      }
    }
  }

  .subjects {
    *:not(:hover):nth-child(2n+1) {
        background: rgba(0,0,0,0.05);
      }
  }
</style>
