<template>
  <div class="filter-line">
    <span>J'observe</span>
    <dropdown :title="filter.subjectType.title">
      <dropdown-element v-for="subjectType in subjectTypes" :key="subjectType.title" :selected="subjectType === filter.subjectType" @click.native="filterSubjectType(subjectType)">
        {{ subjectType.title }}
      </dropdown-element>
    </dropdown>
    <span>dans le channel</span>
    <dropdown :title="filter.channel.title">
        <dropdown-element v-for="channel in channels" :selected="channel === filter.channel" :key="channel.uuid" @click.native="filterChannel(channel)">
          {{ channel.title }}
        </dropdown-element>
        <dropdown-element>
          <button class="simple create" title="Créer un channel" @click="createChannel"><i class="fa fa-plus" aria-hidden="true"></i></button>
        </dropdown-element>
    </dropdown>
    <span>et la categorie</span>
    <dropdown :title="filter.category.title">
        <dropdown-element v-for="category in categories" :selected="category === filter.category" :key="category.uuid" @click.native="filterCategory(category)">
          <span class="label">{{ category.title }}</span>
          <button v-if="category.uuid" class="small delegate" title="Déléguer" @click.stop="delegateCategory(category)"><i class="fa fa-users"/></button>
        </dropdown-element>
        <dropdown-element>
          <button class="simple create" title="Créer une catégorie" @click="createCategory"><i class="fa fa-plus" aria-hidden="true"></i></button>
        </dropdown-element>
    </dropdown>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Dropdown from '@/components/Dropdown'
import DropdownElement from '@/components/DropdownElement'
import DelegationView from '@/containers/DelegationView'
import CategoryCreation from '@/containers/CategoryCreation'
import ChannelCreation from '@/containers/ChannelCreation'
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
    },

    createCategory () {
      ModalManager.display('Création d\'une catégorie', createElement => createElement(CategoryCreation))
    },

    createChannel () {
      ModalManager.display('Création d\'un channel', createElement => createElement(ChannelCreation))
    }
  },

  components: {
    Dropdown,
    DropdownElement
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

  .label {
    flex-grow: 1;
  }

  .delegate {
    margin-left:10px;
  }

  .create {
    width: 100%;
    height: 30px;
    margin: 5px 0;
    font-size: 1.1em;
    padding-top: 5px;
  }


</style>
