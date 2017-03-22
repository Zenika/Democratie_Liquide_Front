<template>
  <div class="filter-line">
    <span>J'observe</span>
    <dropdown :title="filter.subjectType.title">
      <ul>
        <li v-for="subjectType in subjectTypes" @click="filterSubjectType(subjectType)">{{ subjectType.title }}</li>
      </ul>
    </dropdown>
    <span>dans le channel</span>
    <dropdown :title="filter.channel.title">
      <ul>
        <li v-for="channel in channels" @click="filterChannel(channel)">{{ channel.title }}</li>
        <li> ... </li>
      </ul>
    </dropdown>
    <span>et la categorie</span>
    <dropdown :title="filter.category.title">
      <ul>
        <li v-for="category in categories" @click="filterCategory(category)">
          {{ category.title }}
          <button v-if="category.uuid" class="small" title="Déléguer" @click.stop="delegateCategory(category)"><i class="fa fa-users"/></button>
        </li>
        <li> ... </li>
      </ul>
    </dropdown>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Dropdown from '@/components/Dropdown'
import DelegationView from '@/containers/DelegationView'
import ModalManager from '@/managers/ModalManager'
import { subjectTypes } from '@/config/constants'

export default {
  name: 'filter-line',

  computed: {
    ...mapGetters([
      'channels',
      'categories',
      'filter'
    ]),

    subjectTypes () {
      return subjectTypes
    }
  },

  methods: {
    ...mapActions([
      'filterSubjectType',
      'filterChannel',
      'filterCategory'
    ]),

    delegateCategory (category) {
      let props = { dataId: category.uuid, isCategory: true }
      ModalManager.display('Délégation d\'une catégorie', createElement => createElement(DelegationView, { props }))
    }
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
    padding: 15px 60px;
    background: #fcfcfc;
    line-height: 2em;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }

  li {
    padding: 5px 10px;
    line-height: 1.5em;
    cursor: pointer;
    text-shadow: none;
    white-space: nowrap;
    user-select: none;
    transition: all 100ms linear;
    display: flex;
    justify-content: space-between;

    &:nth-child(2n) {
      background: rgba(0,0,0,0.05);
    }

    &:hover {
      background: map-get($reds, 'lightest');
      color: map-get($reds, 'medium');
    }

    button {
      margin-left:10px;
    }
  }


</style>
