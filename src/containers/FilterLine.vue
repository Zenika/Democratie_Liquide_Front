<template>
  <div class="filter-line">
    <span>J'observe les sujets du channel</span>
    <span class="field">{{ filter.channel.title }}</span>
    <span>et de la categorie</span>
    <span class="field">{{ filter.category.title }}</span>
    <span> : </span>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'filter-line',
  data () {
    return {

    }
  },

  computed: {
    ...mapGetters([
      'filter'
    ])
  },

  methods: {
    ...mapActions([])

  }
}
</script>

<style lang="scss" scoped>

  @import '../assets/style';

  .filter-line {
    text-align: center;
    padding: 25px 0px;
    // background-color: map-get($colors, 'lightest');
  }

  .field {
    cursor: pointer;
    font-weight: bold;
    padding: 2px 5px;
    border-bottom: solid 1px lightgray;
    position: relative;

    &:focus, &:active {
      border-bottom: solid 2px map-get($colors, 'base');
    }

    &::after {
      content: '\25bc';
      display: inline-block;
      transform: scale(0.75, 0.5) translateY(3px);
      padding-left: 5px;
    }
  }


</style>
