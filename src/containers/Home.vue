<template>
    <div class="home">

      <filter-line></filter-line>
      <subjects-view></subjects-view>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import SubjectsView from './SubjectsView'
import FilterLine from './FilterLine'

export default {
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
    ])
  },
  components: {
    SubjectsView,
    FilterLine
  }
}
</script>

<style>

.home {
  display: flex;
  flex-direction: column;
}
</style>
