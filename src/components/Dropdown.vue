<template>
  <span class="dropdown" @mouseover="show" @mouseleave="hide">
    <span class="title" @click.stop="show" :class="{ opened: opened }">{{ title }}</span>
    <transition name="fade">

      <div class="content" v-show="opened">
        <slot></slot>
      </div>
    </transition>
  </span>
</template>

<script>
export default {

  props: {
    title: String
  },

  data () {
    return {
      opened: false
    }
  },

  methods: {
    show () {
      this.opened = true
      setTimeout(() => document.addEventListener('click', this.hide), 0)
    },

    hide () {
      this.opened = false
      document.removeEventListener('click', this.hide)
    }
  }
}
</script>

<style lang="scss" scoped>

@import '../assets/style';
@import '../assets/transitions';

.dropdown {
  position: relative;
  display: inline-block;
}

.title {
    cursor: pointer;
    font-weight: bold;
    padding: 2px 5px;
    border-bottom: solid 1px lightgray;
    position: relative;
    user-select: none;

    &.opened {
      border-bottom: solid 2px map-get($colors, 'base');
    }

    &::after {
      content: '\25bc';
      display: inline-block;
      transform: scale(0.75, 0.5) translateY(3px);
      padding-left: 5px;
    }

    &::before {
      height: 15px;
      left: 0;
      right: 0;
      position: absolute;
      top: 100%;
      background: transparent;
      content: '';
    }
  }

.content {
  position: absolute;
  top: 100%;
  margin-top: 10px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
  border: 1px solid lightgray;
  background: white;
  z-index: 5;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);

  &::before {
    position: absolute;
    top: -7px;
    left: 50%;
    transform: translateX(-50%);
    display: inline-block;
    border-right: 7px solid transparent;
    border-bottom: 7px solid lightgray;
    border-left: 7px solid transparent;
    border-bottom-color: lightgray;
    content: '';
  }

  &::after {
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    display: inline-block;
    border-right: 6px solid transparent;
    border-bottom: 6px solid white;
    border-left: 6px solid transparent;
    content: '';
  }
}

</style>
