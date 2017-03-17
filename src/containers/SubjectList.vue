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
    <span v-show="!filteredSubjects.length">{{ filter.subjectType.empty }}</span>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SubjectLine from '../components/SubjectLine'
import ModalManager from '@/managers/ModalManager'
import SubjectView from '@/containers/SubjectView'

export default {
  name: 'subject-list',

  computed: {
    ...mapGetters([
      'subjects',
      'filteredSubjects',
      'globalCheck',
      'filter'
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

  .subject-line {
    transition: all 100ms linear;
    &:nth-child(2n) {
      background: rgba(0,0,0,0.05);
    }
    &:hover {
      background: map-get($colors, 'lightest');
      color: map-get($colors, 'base');
      border-left: 5px solid map-get($colors, 'base');
    }
  }
</style>
