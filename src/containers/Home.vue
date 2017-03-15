<template>
    <div class="home">
      <subject-view></subject-view>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import SubjectView from './SubjectView'

export default {
  created () {
    this.refreshSubjects()
  },
  methods: {
    ...mapActions(['refreshSubjects'])
  },
  components: {
    SubjectView
  }
}
</script>

<style>
</style>
