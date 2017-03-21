<template>
  <div class="proposal"
    @click.stop="onClick($event)"
    @mousemove.stop="onHover($event)"
  >
    <div class="line-hover"
      :style="{ transform: 'scaleX(' + hoverPoints / maxPoints + ')' }"
    ></div>
    <div class="line-selected"
      :style="{ transform: 'scaleX(' + this.proposal.points / maxPoints + ')' }"
    ></div>
    <span class="title">
      <span class="tag"><i class="fa fa-star" aria-hidden="true"></i> {{ proposal.points | pluralize('point')}}</span>
      {{ proposal.title }}
    </span>
    <div class="description">{{ proposal.description }}</div>
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

    maxPoints: Number,
    totalPoints: Number
  },

  data () {
    return {
      hoverPoints: 0
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
    }

  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/style';

  .proposal {
    margin: 5px;
    cursor: pointer;
    overflow: hidden;
    border-radius: 15px;
    z-index: 0;

    &:not(:hover) {
      .line-hover {
        transform: scaleX(0) !important;
      }
    }


    &:hover {
      background: map-get($colors, 'lightest');
      .line-hover {
        opacity: 0.5;
      }
    }
  }

  .title {
    font-weight: bold;
    font-size: 1em;
    padding-right: 15px;
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
    background: map-get($colors, 'light');
    z-index: -1;
    overflow: hidden;
  }

  .line-selected {
    opacity: 0.75;
    border-bottom: 5px solid map-get($colors, 'base');
    transition: all 500ms ease;
  }

  .line-hover {
    transition: all 200ms ease;
    opacity: 0;
  }


  .tag {
      background-color: #2196bd;
      color: white;
      padding: 2px 10px;
      border-radius: 50px;
      font-size: 12px;
      font-weight: bold;
      white-space: pre;
      float: right;
  }

  input {
    display: none;
    width: 100%;
  }

</style>
