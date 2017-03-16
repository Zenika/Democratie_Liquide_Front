<template>
  <div class="subject-list">
    <ul v-if="subjects.length">
      <li v-for="subject in subjects" @click="handleSubjectClick(subject)">
        <subject-line :subject="subject"/>
      </li>
    </ul>
    <span v-else>{{ emptyText }}</span>
  </div>
</template>

<script>
import SubjectLine from '@/components/SubjectLine'
import ModalManager from '@/managers/ModalManager'
import SubjectVoteForm from '@/components/SubjectVoteForm'
import SubjectVoteResults from '@/components/SubjectVoteResults'

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

  methods: {
    handleSubjectClick (subject) {
      let props = { subject }
      if (!subject.isClosed && !subject.isVoted) {
        ModalManager.display(createElement => createElement(SubjectVoteForm, { props }))
      } else {
        ModalManager.display(createElement => createElement(SubjectVoteResults, { props }))
      }
    }
  },

  components: {
    SubjectLine,
    SubjectVoteForm,
    SubjectVoteResults
  }

}
</script>

<style lang="scss" scoped>

li {
  padding: 10px 10px;
  cursor: pointer;

  &:nth-child(2n+1) {
    background: rgba(0,0,0,0.05);
  }
  &:hover {
    background: rgba(0,0,0,0.1);
  }
}

span {
  display: block;
  margin-top: 50px;
}

</style>
