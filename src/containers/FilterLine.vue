<template>
  <div class="filter-line">
    <span>J'observe</span>
    <dropdown :title="filter.tab.title">
      <ul>
        <li v-for="tab in tabs" @click="filterTab(tab)">{{ tab.title }}</li>
      </ul>
    </dropdown>
    <span>du channel</span>
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Dropdown from '@/components/Dropdown'
import { tabs } from '@/config/constants'

export default {
  name: 'filter-line',

  computed: {
    ...mapGetters([
      'channels',
      'categories',
      'filter'
    ]),

    tabs () {
      return tabs
    }
  },

  methods: {
    ...mapActions([
      'filterTab',
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
    padding: 15px 25px;
    background: #fcfcfc;
    line-height: 2em;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }

  li {
    padding: 5px 20px;
    line-height: 1.5em;
    cursor: pointer;
    text-shadow: none;
    white-space: nowrap;
    user-select: none;
    transition: all 100ms linear;

    &:nth-child(2n) {
      background: rgba(0,0,0,0.05);
    }

    &:hover {
      background: map-get($colors, 'lightest');
      color: map-get($colors, 'base');
    }
  }


</style>
