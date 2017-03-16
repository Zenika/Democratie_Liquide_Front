<template>
  <div class="filter-line">
    <span>J'observe les sujets du channel</span>
    <dropdown :title="filter.channel.title">
      <ul>
        <li v-for="channel in channels" @click="filterChannel(channel)">{{ channel.title }}</li>
        <li> ... </li>
      </ul>
    </dropdown>
    <span>et de la categorie</span>
    <dropdown :title="filter.category.title">
      <ul>
        <li v-for="category in categories" @click="filterCategory(category)">{{ category.title }}</li>
        <li> ... </li>
      </ul>
    </dropdown>
    <span> : </span>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Dropdown from '@/components/Dropdown'

export default {
  name: 'filter-line',
  data () {
    return {

    }
  },

  computed: {
    ...mapGetters([
      'channels',
      'categories',
      'filter'
    ])
  },

  methods: {
    ...mapActions([
      'filterChannel',
      'filterCategory'
    ])
  },

  components: {
    Dropdown
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

  li {
    padding: 5px 20px;
    cursor: pointer;
    user-select: none;
    &:nth-child(2n) {
      background: rgba(0,0,0,0.05);
    }

    &:hover {
      background: rgba(0,0,0,0.1);
    }

  }


</style>
