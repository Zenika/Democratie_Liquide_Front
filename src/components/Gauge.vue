<template>
  <div class="gauge"
    @click="!disabled && onClick($event)"
    @mousemove.stop="!disabled && onMove($event)"
    @mouseleave.stop="!disabled && onLeave($event)"
    :class="{
      selected: currentPoints > 0,
      active: !disabled
    }"
  >
    <div class="line-hover"
      v-if="!disabled"
      :style="{ transform: 'scaleX(' + hoverPoints / maxPoints + ')' }"
    />

    <div class="line-selected"
      :style="{ transform: 'scaleX(' + currentPoints / maxPoints + ')' }"
    />

    <span v-if="showPoints" class="points">{{ mouseIsOver && !disabled ? hoverPoints : currentPoints }}</span>

    <span class="content">
      <slot></slot>
    </span>

  </div>
</template>

<script>
export default {
  name: 'gauge',

  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    showPoints: Boolean,
    maxPoints: Number,
    remainingPoints: Number,
    currentPoints: Number
  },

  data() {
    return {
      hoverPoints: 0,
      mouseIsOver: false
    }
  },

  methods: {
    getPointsFromMousePosition(e) {
      return Math.round(
        (e.clientX - this.$el.getBoundingClientRect().x) /
          e.currentTarget.clientWidth *
          this.maxPoints
      )
    },

    onClick(e) {
      let points = this.getPointsFromMousePosition(e)
      this.$emit('new-value', points <= this.remainingPoints ? points : this.remainingPoints)
    },

    onMove(e) {
      let points = this.getPointsFromMousePosition(e)
      this.hoverPoints = points <= this.remainingPoints ? points : this.remainingPoints
      this.mouseIsOver = true
    },

    onLeave() {
      this.mouseIsOver = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/style';

.gauge {
  padding: 5px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
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

  &.active {
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

.line-selected,
.line-hover {
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
  margin-left: 10px;
  // margin-bottom: 5px;
  margin-top: 3px;
  transition: all 200ms ease;
  text-shadow: 0 1px 0 white;
  position: relative;
  font-weight: bold;
  font-size: 2em;
  color: map-get($blues, 'medium');
  // &::after {
  //   content: 'points';
  //   position: absolute;
  //   left: 50%;
  //   bottom: 0;
  //   margin-bottom: -2px;
  //   transform: translateX(-50%);
  //   text-shadow: none;
  //   font-weight: normal;
  //   font-size: 0.3em;
  // }
}

.content {
  margin: 0 15px;
}
</style>
