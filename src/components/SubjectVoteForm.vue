<template>
  <div class="subject-vote-form">
    <div class="header">
      <div class="title">{{ subject.title }}</div>
      <div class="description">{{ subject.description }}</div>
    </div>
    <div class="proposals">
      <proposal :key="proposal.uuid" v-for="proposal in subject.propositions" :proposal="proposal"/>
    </div>

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
  position: relative;
  overflow: hidden;
  height: 100%;
}

.header {

  border-bottom: solid 1px lightgray;

  .title {
    font-weight: bold;
    font-size: 1.5em;
  }
}

.proposals {
  overflow: auto;
}

</style>
