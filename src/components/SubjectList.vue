<template>
  <div class="subject-list">
    
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'subject-list',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },

  created () {
    this.refreshSubjects()
  },

  methods: {
    ...mapActions(['refreshSubjects'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
