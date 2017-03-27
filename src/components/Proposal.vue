<template>
  <div class="proposal">

    <gauge
      class="line"
      v-if="!isDelegated || !isVote"
      :mouseEnabled="mouseEnabled"
      :maxPoints="maxPoints"
      :currentPoints="proposal.points"
      :remainingPoints="remainingPoints"
      :showPoints="true"
      @new-value="changeValue($event)"
    >
      <div class="title"> {{ proposal.title }}</div>
      <div class="description">{{ proposal.description }}</div>
    </gauge>
    <div class="line padded" v-else>
      <div class="title"> {{ proposal.title }}</div>
      <div class="description">{{ proposal.description }}</div>
    </div>
  </div>
</template>

<script>

import Gauge from '@/components/Gauge'

export default {
  name: 'proposal',

  props: {
    proposal: {
      type: Object,
      required: true
    },

    isVote: Boolean,
    isDelegated: Boolean,

    maxPoints: Number,
    totalPoints: Number
  },

  computed: {

    remainingPoints () {
      return this.maxPoints - this.totalPoints + this.proposal.points
    },

    mouseEnabled () {
      return this.isVote && !this.isDelegated
    }
  },

  methods: {
    changeValue (value) {
      this.proposal.points = value
    }
  },

  components: {
    Gauge
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/style';

  .line {
    margin: 10px 0px;
    border-radius: 15px;

    &:last-child {
      margin-bottom: 0;
    }

    &.padded {
      padding: 5px;
    }
  }

  .title {
    font-weight: bold;
    font-size: 1em;
  }

  .description {
    font-size: 0.8em;
  }

</style>
