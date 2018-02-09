<template>
  <div class="delegation-view">

    <router-link v-if="data" class="title" :to="isCategory ? '' : '/subject/view/' + data.uuid">
      {{ data.title }}
    </router-link>

    <span v-if="currentDelegation" class="subtitle">
      Délégation attribuée à
      <span title="Supprimer" @click="!fetching && remove()" class="tag">{{ currentDelegation | mailToName }}  <i class="fa fa-times"/></span>
    </span>
    <span v-else class="subtitle">
      Aucun délégataire
    </span>

    <text-input placeholder="Filtre" v-model="collaboratorFilter" ref="collaboratorFilter"/>
    <ul>
      <li
        v-for="collaborator in sorted"
        :class="{ selected: isSelected(collaborator)}"
        @click="!fetching && select(collaborator)"
        :key="collaborator"
      >
        {{ collaborator | mailToName }}
        <i v-if="isSelected(collaborator)" class="fa fa-user" aria-hidden="true"></i>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { delegateSubject, removeSubjectDelegation, replaceSubjectDelegation } from '@/api/subject-api'
import { delegateCategory, removeCategoryDelegation, replaceCategoryDelegation } from '@/api/category-api'
import TextInput from '@/components/TextInput'

export default {
  name: 'delegation-view',

  props: {
    dataId: String,
    isCategory: Boolean
  },

  data () {
    return {
      collaboratorFilter: '',
      fetching: false
    }
  },

  computed: {
    ...mapGetters([
      'collaborator',
      'collaborators',
      'currentSubject',
      'currentCategory',
      'filter'
    ]),

    data () {
      return this.isCategory ? this.currentCategory : this.currentSubject
    },

    sorted () {
      return (this.filter.channel.collaborators || this.collaborators || [])
        .map(collaborator => collaborator.email)
        .sort()
        .filter(collaborator => collaborator.toLowerCase().indexOf(this.collaboratorFilter.toLowerCase()) !== -1 && collaborator !== this.collaborator.email)
    },

    currentDelegation () {
      return this.data && this.data.givenDelegation
    },

    delegate () {
      return this.isCategory
        ? collaborator => delegateCategory(this.currentCategory.uuid, collaborator)
        : collaborator => delegateSubject(this.currentSubject.uuid, collaborator)
    },

    removeDelegation () {
      return this.isCategory
        ? () => removeCategoryDelegation(this.currentCategory.uuid)
        : () => removeSubjectDelegation(this.currentSubject.uuid)
    },

    replaceDelegation () {
      return this.isCategory
      ? collaborator => replaceCategoryDelegation(this.currentCategory.uuid, collaborator)
      : collaborator => replaceSubjectDelegation(this.currentSubject.uuid, collaborator)
    }
  },

  methods: {
    isSelected (collaborator) {
      return this.currentDelegation === collaborator
    },

    remove () {
      this.fetching = true
      return this.removeDelegation(this.dataId).then(() => { this.fetching = false })
    },

    select (collaborator) {
      this.fetching = true
      let promise
      if (this.isSelected(collaborator)) {
        promise = this.removeDelegation()
      } else if (this.currentDelegation) {
        promise = this.replaceDelegation(collaborator)
      } else {
        promise = this.delegate(collaborator)
      }
      return promise.then(() => (this.fetching = false), () => (this.fetching = false))
    }
  },

  mounted () {
    this.$refs.collaboratorFilter && this.$refs.collaboratorFilter.focus()
  },

  components: {
    TextInput
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

  .text-input {
    margin: 5px;
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
