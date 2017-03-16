<template>
  <span class="dropdown">
    <span class="title" @click="show" :class="{ opened: visible }">{{ title }}</span>
    <div class="content" v-show="visible">
      <slot/>
    </div>
  </span>
</template>

<script>
export default {

  props: {
    title: String
  },

  data () {
    return {
      visible: false
    }
  },

  methods: {
    show () {
      this.visible = !this.visible
    }
  }
}
</script>

<style lang="scss" scoped>

@import '../assets/style';

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
  }


.content {
  position: absolute;
  top: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
  padding: 5px 0px;
  border: 1px solid lightgray;
  background: white;
  z-index: 5;

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
