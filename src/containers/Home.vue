<template>
  <div class="home">
    <filter-line></filter-line>
    <subject-list></subject-list>
    <button class="simple create" title="Créer un sujet" @click="createSubject"><i class="fa fa-plus" aria-hidden="true"></i></button>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SubjectList from '@/containers/SubjectList'
import FilterLine from '@/containers/FilterLine'
import SubjectCreation from '@/containers/SubjectCreation'
import ModalManager from '@/managers/ModalManager'

export default {
  name: 'home',

  created () {
    this.refreshSubjects()
    this.refreshCategories()
    this.refreshChannels()
    this.refreshCollaborator()
  },
  methods: {
    ...mapActions([
      'refreshCollaborator',
      'refreshSubjects',
      'refreshCategories',
      'refreshChannels'
    ]),

    createSubject () {
      ModalManager.display('Création d\'un sujet', createElement => createElement(SubjectCreation))
    }
  },
  components: {
    SubjectList,
    FilterLine
  }
}
</script>

<style lang="scss" scoped>

.home {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;

  .filter-line {
    margin: 25px 0 10px 0;
  }
}

.create {
    width: 96%;
    height: 50px;
    font-size: 2.5em;
    margin: 20px 2%;
    flex-shrink: 0;
  }
</style>
