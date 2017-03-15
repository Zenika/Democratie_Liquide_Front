<template>
  <div class="subject-view">
    <button v-for="(tab, index) in tabs" class="tab" :class="{selected: activeTab === index}" @click="switchTab(index)"> {{ tab.label }} </button>
    <subject-list :emptyText="tabs[activeTab].emptyText" :subjects="tabs[activeTab].subjects()"/>
  </div>
</template>

<script>
import SubjectList from '../components/SubjectList'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'subject-view',
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

  created () {
    this.refreshSubjects()
    this.refreshCategories()
    this.refreshChannels()
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
    ...mapActions([
      'refreshSubjects',
      'refreshCategories',
      'refreshChannels'
    ]),

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

  $button-color: #af1e3a;

  button {
    cursor: pointer;
    outline: none;
    padding: 10px 20px;
    border: none;
    background: transparent;
    transition: color 0.3s ease;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    font-size: 16px;

    &:hover {
      color: $button-color;
    }

    &:active, &:focus, &.selected {
      color: $button-color;
    }

    &.selected {
      color: $button-color;
      border-bottom: 2px solid $button-color;
    }
  }
</style>
