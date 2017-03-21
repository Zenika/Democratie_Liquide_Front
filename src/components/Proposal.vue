<template>
  <div class="proposal">
    <div class="wrapper"
      :class="{
        selected: this.proposal.points > 0,
        vote: isVote
      }"
      @click.stop="isVote && onClick($event)"
      @mousemove.stop="isVote && onHover($event)"
      @mouseleave.stop="isVote && onLeave()"
    >
      <div class="line-hover"
        v-if="isVote"
        :style="{ transform: 'scaleX(' + hoverPoints / maxPoints + ')' }"
      ></div>
      <div class="line-selected"
        :style="{ transform: 'scaleX(' + this.proposal.points / maxPoints + ')' }"
      ></div>

      <span class="points">{{ mouseIsOver && isVote ? hoverPoints : proposal.points }}</span>

      <span>
        <div class="title"> {{ proposal.title }}</div>
        <div class="description">{{ proposal.description }}</div>
      </span>
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

  data () {
    return {
      hoverPoints: 0,
      mouseIsOver: false
    }
  },

  computed: {
    barLength () {
      return this.proposal.points / this.maxPoints
    },

    remainingPoints () {
      return this.maxPoints - this.totalPoints + this.proposal.points
    }
  },

  methods: {

    getPointsFromMousePosition (e) {
      return Math.round(e.layerX / e.currentTarget.clientWidth * this.maxPoints)
    },

    onClick (e) {
      let points = this.getPointsFromMousePosition(e)
      this.proposal.points = points <= this.remainingPoints ? points : this.remainingPoints
    },

    onHover (e) {
      let points = this.getPointsFromMousePosition(e)
      this.hoverPoints = points <= this.remainingPoints ? points : this.remainingPoints
      this.mouseIsOver = true
    },

    onLeave () {
      this.mouseIsOver = false
    }

  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/style';

  .wrapper {
    margin: 10px 5px;
    padding: 5px;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    border-radius: 15px;
    z-index: 0;
    transition: all 100ms linear;
    border: 0px solid map-get($reds, 'light');

    &.selected {
      background: map-get($reds, 'lightest');
      border-bottom-width: 4px;
      .points {
        color: map-get($reds, 'medium');        
      }
    }


    &:not(:hover) {
      .line-hover {
        transform: scaleX(0) !important;
      }
    }


    &.vote {
      cursor: pointer;      
      &:hover {
        background: map-get($reds, 'lightest');
        .line-hover {
          opacity: 0.5;
        }
      }

      &:not(.selected):hover {
        .points {
          color: map-get($reds, 'medium');
        }
      }
      
    }
  }

  .title {
    font-weight: bold;
    font-size: 1em;
  }

  .description {
    font-size: 0.8em;
  }

  .line-selected, .line-hover {
    transform-origin: left;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background: map-get($reds, 'light');
    z-index: -1;
    overflow: hidden;
  }

  .line-selected {
    opacity: 0.5;
    transition: all 500ms ease;
  }

  .line-hover {
    transition: all 200ms ease;
    background: map-get($reds, 'light');
    opacity: 0;
  }

  .points {
    margin-left: 5px;
    margin-right: 10px;
    margin-top: 3px;
    transition: all 200ms ease;
    text-shadow: 0 1px 0 white;
    font-weight: bold;
    font-size: 2em;
    color: map-get($blues, 'medium');
  }

  input {
    display: none;
    width: 100%;
  }

</style>
