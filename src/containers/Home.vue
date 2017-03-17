<template>
  <div class="home">
    <filter-line></filter-line>
    <subject-list></subject-list>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SubjectList from '@/containers/SubjectList'
import FilterLine from '@/containers/FilterLine'

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
</style>
