<template>
  <div class="proposal">
    <span class="title">{{ proposal.title }}</span>
    <span class="description">{{ proposal.description }}</span>
    <div class="points-line">
      <div class="bar"
        :style="{ transform: 'scaleX(' + barLength + ')' }"
      />
      <div class="points">
        <button class="point"
          :class="{ selected: isSelected(0) }"
          @click="proposal.points = 0"
        >0</button>
        <button class="point"
          v-for="i in maxPoints"
          :class="{ disabled: isDisabled(i), selected: isSelected(i) }"
          @click="proposal.points = isDisabled(i) ? proposal.points : i"
        >{{ i }}</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'proposal',

  props: {
    proposal: {
      type: Object,
      required: true
    },

    isVote: Boolean,
    maxPoints: Number,
    totalPoints: Number
  },

  computed: {
    barLength () {
      return (this.proposal.points + 1) / (this.maxPoints + 1)
    }
  },

  methods: {
    isDisabled (value) {
      return this.totalPoints + value > this.maxPoints + this.proposal.points
    },

    isSelected (value) {
      return this.proposal.points === value
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/style';

  $bar-radius: 0px;

  .proposal {
    padding: 5px 0;
  }

  .title {
    font-weight: bold;
    font-size: 1em;
    padding: 0 5px;
  }

  .description {
    font-size: 0.8em;
  }

  .points-line {
    position: relative;
    margin: 5px;
    border-radius: $bar-radius;
    border: transparent;
    overflow: hidden;
    z-index: 1;
  }

  .bar {
    transform-origin: left;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    transition: all 500ms ease;
    background: map-get($colors, 'light');
    z-index: -1;
    overflow: hidden;
  }

  .points {
    display: flex;
    justify-content: space-around;
    background: rgba(255,255,255,0.5);
    opacity: 0.5;

    .point {
      transition: all 250ms ease;
      border: 2px solid rgba(0,0,0,0.2);
      background: transparent;
      border-left-width: 0px;
      border-right-width: 2px;
      width: 50px;
      font-size: 2em;
      height: 50px;
      text-align: center;
      color: rgba(0,0,0,0.2);
      text-shadow: 0 1px 0 rgba(255,255,255,0.2);
      font-weight: bold;

      &:first-child {
        border-left-width: 2px;
        border-bottom-left-radius: $bar-radius;
        border-top-left-radius: $bar-radius;
      }

      &:not(.disabled):hover {
        background: rgba(0,0,0,0.1)
      }

      &:last-child {
        border-bottom-right-radius: $bar-radius;
        border-top-right-radius: $bar-radius;
      }

      &.disabled {
        cursor: default;
        opacity: 0.25
      }

      &.selected {
        color: map-get($colors, 'base');
      }
    }
  }

</style>
