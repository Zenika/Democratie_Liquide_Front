<template>
  <div class="subjects-view">

    <div class="tabs">
      <div v-for="(tab, index) in tabs" :class="{selected: activeTab === index}" @click="switchTab(index)">{{ tab.label }}</div>
    </div>

    <subject-list :emptyText="tabs[activeTab].emptyText" :subjects="tabs[activeTab].subjects()"/>
    <!--<button class="big" title="Créer un sujet"><i class="fa fa-plus"/></button>-->

  </div>
</template>

<script>
import SubjectList from '../components/SubjectList'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'subjects-view',
  data () {
    return {
      activeTab: 0,
      tabs: [{
        label: 'Sujets à traiter',
        emptyText: 'Rien à traiter',
        subjects: () => this.newSubjects
      }, {
        label: 'Sujets déjà votés',
        emptyText: 'Vous n\'avez pas encore voté sur un sujet',
        subjects: () => this.votedSubjects
      }, {
        label: 'Sujets délégués',
        emptyText: 'Vous n\'avez pas encore délégué de sujet',
        subjects: () => this.delegatedSubjects
      }, {
        label: 'Mes sujets',
        emptyText: 'Vous n\'avez pas encore créé de sujet',
        subjects: () => this.mySubjects
      }, {
        label: 'Sujets archivés',
        emptyText: 'Aucune archive',
        subjects: () => this.archivedSubjects
      }]
    }
  },

  computed: {
    ...mapGetters([
      'mySubjects',
      'votedSubjects',
      'delegatedSubjects',
      'newSubjects',
      'archivedSubjects'
    ])
  },

  methods: {
    ...mapActions([]),

    switchTab (index) {
      this.activeTab = index
    }
  },

  components: {
    SubjectList
  }
}
</script>

<style lang="scss" scoped>

  @import '../assets/style';

  .subjects-view {
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
</style>
