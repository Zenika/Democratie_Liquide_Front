<template>
  <div class="delegation-view">

    <span v-if="data" class="title">
      {{ data.title }}
    </span>

    <span v-if="selected" class="subtitle">
      Délégation attribuée à
      <span title="Supprimer" @click="!fetching && remove()" class="tag">{{ selected | mailToName }}  <i class="fa fa-times"/></span>
    </span>
    <span v-else class="subtitle">
      Aucun délégataire
    </span>

    <input placeholder="Filtre" v-model="filter"/>
    <ul>
      <li v-for="collaborator in sorted"
        :class="{ selected: isSelected(collaborator)}"
        @click="!fetching && select(collaborator)"
      >
        {{ collaborator | mailToName }}
        <i v-if="isSelected(collaborator)" class="fa fa-user" aria-hidden="true"></i>
      </li>
    </ul>
  </div>
</template>

<script>
import { collaborators } from '@/config/constants'
import { mapGetters } from 'vuex'
import store from '@/store/index'
import { getSubject, delegateSubject, removeSubjectDelegation } from '@/api/subject-api'
import { getCategory, delegateCategory, removeCategoryDelegation } from '@/api/category-api'

export default {
  name: 'delegation-view',

  props: {
    dataId: String,
    isCategory: Boolean
  },

  data () {
    return {
      filter: '',
      data: null,
      fetching: false
    }
  },

  computed: {
    ...mapGetters(['collaborator']),

    sorted () {
      return collaborators.sort().filter(collaborator => collaborator.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1 && collaborator !== this.collaborator.email)
    },

    selected () {
      return this.data && this.data.givenDelegation
    },

    removeDelegation () {
      return this.isCategory ? removeCategoryDelegation : removeSubjectDelegation
    },

    delegate () {
      return this.isCategory ? delegateCategory : delegateSubject
    },

    fetch () {
      return this.isCategory ? getCategory : getSubject
    }
  },

  methods: {
    refresh () {
      this.fetching = true
      return this.fetch(this.dataId).then(({data}) => {
        this.fetching = false
        this.data = data
      })
    },

    afterAction () {
      return this.refresh().then(() => {
        return this.isCategory ? store.dispatch('refreshCategories') : store.dispatch('refreshSubjects')
      })
    },

    isSelected (collaborator) {
      return this.selected === collaborator
    },

    remove () {
      this.fetching = true
      return this.removeDelegation(this.dataId).then(this.afterAction)
    },

    select (collaborator) {
      let promise
      this.fetching = true
      if (this.isSelected(collaborator)) {
        promise = this.removeDelegation(this.dataId)
      } else {
        promise = this.selected ? this.removeDelegation(this.dataId).then(() => this.delegate(this.dataId, collaborator)) : this.delegate(this.dataId, collaborator)
      }
      return promise.then(this.afterAction)
    }
  },

  created () {
    this.refresh()
  }
}
</script>

<style lang="scss" scoped>

  @import '../assets/style';

  .delegation-view {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
  }

  .title {
    text-align: center;
    padding: 10px 20px 0px 20px;
    font-weight: bold;
    color: grey;
  }

  .subtitle {
    text-align: center;
    padding: 10px 10px;
    font-size:0.8em;
    color: grey;
  }

  .tag {
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: 100px;
      background: rgba(0,0,0,0.2);
    }
  }

  input {
    border-radius: 100px;
    margin: 5px;
    padding: 5px 10px;
    outline: none;
    border: 1px solid lightgray;
    box-shadow: inset 0 1px 0 lightgray;
    &:active, &:focus {
      border-color: map-get($reds, 'light');
    }
  }

  ul {
    overflow-y: scroll;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
  }

  li {
    transition: all 100ms linear;
    border-left: 0px solid map-get($reds, 'medium');
    cursor: pointer;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 15px;
    padding-right: 20px;
    user-select: none;

    * {
      padding-left: 10px;
    }

    &:nth-child(2n) {
      background: rgba(0,0,0,0.05);
    }
    &:hover, &.selected {
      background: map-get($reds, 'lightest');
      color: map-get($reds, 'medium');
      border-left-width: 5px;
      padding-right: 15px;
      font-weight: bold;
    }
    .fa {
      float: right;
      padding-top: 3px;
    }
  }



</style>
