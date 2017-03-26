<template>
  <div class="dropdown-element" :class="{ selected }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'dropdown-element',
  props: {
    selected: Boolean
  }
}
</script>

<style lang="scss" scoped>

  @import '../assets/style';
  @import '../assets/transitions';

  .dropdown-element {
    padding: 5px 10px;
    white-space: nowrap;
    user-select: none;
    cursor: pointer;
    transition: all 100ms linear;
    display: flex;
    justify-content: center;
    align-items: center;


    &:nth-child(2n) {
      background: rgba(0,0,0,0.05);
    }

    &:hover {
      background: map-get($reds, 'lightest');
      color: map-get($reds, 'medium');
    }

    &.selected {
      font-weight: bold;
    }
  }


</style>
