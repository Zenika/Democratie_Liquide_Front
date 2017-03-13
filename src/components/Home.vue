<template>
    <div class="home">

    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  created () {
    this.refreshSubjects()
  },
  methods: {
    ...mapActions(['refreshSubjects'])
  }
}
</script>

<style>
</style>
