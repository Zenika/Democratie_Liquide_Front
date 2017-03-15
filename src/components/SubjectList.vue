<template>
  <div class="subject-list">
    <ul v-if="subjects.length">
      <li v-for="subject in subjects">
        <subject-line :subject="subject"/>
      </li>
    </ul>
    <span v-else>{{ emptyText }}</span>
  </div>
</template>

<script>
import SubjectLine from './SubjectLine'

export default {
  name: 'subject-list',

  props: {
    subjects: {
      type: Array
    },
    emptyText: {
      type: String,
      default: 'Aucun sujet à afficher'
    }
  },

  components: {
    SubjectLine
  }

}
</script>

<style lang="scss" scoped>

ul {
  list-style-type: none;
}

li {
  padding: 10px 5px;
  &:nth-child(2n) {
    background: rgba(0,0,0,0.05);  
  }
}

span {
  display: block;
  margin-top: 50px;
}

</style>
