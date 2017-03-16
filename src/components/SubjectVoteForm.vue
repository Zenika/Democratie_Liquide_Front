<template>
  <div class="subject-vote-form">
    <div class="title">{{ subject.title }}</div>
    <div class="description">{{ subject.description }}</div>

    <proposal :key="proposal.uuid" v-for="proposal in subject.propositions" :proposal="proposal"/>

  </div>
</template>

<script>

import Proposal from '@/components/Proposal'

export default {
  name: 'subject-vote-form',

  props: {
    subject: Object,
    required: true
  },

  components: {
    Proposal
  }
}
</script>

<style lang="scss" scoped>

.subject-vote-form {
  display: flex;
  flex-direction: column;
}

</style>
