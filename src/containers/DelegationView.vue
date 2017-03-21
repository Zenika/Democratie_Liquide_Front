<template>
  <div class="delegation-view">
    <span class="current" v-if="selected">
      Délégataire actuel :
      <span title="Supprimer" @click="remove" class="tag">{{ selected | mailToName }}  <i class="fa fa-times"/></span>
    </span>
    <span class="current" v-else>Aucun délégataire choisi</span>
    <input placeholder="Filtre" v-model="filter"/>
    <ul>
      <li v-for="collaborator in sorted"
        :class="{ selected: isSelected(collaborator)}"
        @click="select(collaborator)"
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
import { getSubject, delegate, removeDelegation } from '@/api/subject-api'

export default {
  name: 'delegation-view',

  props: {
    subjectId: String
  },

  data () {
    return {
      filter: '',
      subject: {}
    }
  },

  computed: {
    ...mapGetters(['collaborator']),

    sorted () {
      return collaborators.sort().filter(collaborator => collaborator.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1 && collaborator !== this.collaborator.email)
    },

    selected () {
      return this.subject && this.subject.givenDelegation
    }
  },

  methods: {
    fetch () {
      getSubject(this.subjectId).then(({data}) => {
        this.subject = data
      })
    },

    isSelected (collaborator) {
      return this.selected === collaborator
    },

    remove () {
      removeDelegation(this.subjectId).then(() => {
        this.fetch()
        store.dispatch('refreshSubjects')
      })
    },

    select (collaborator) {
      let promise
      if (this.isSelected(collaborator)) {
        promise = removeDelegation(this.subjectId)
      } else {
        promise = this.selected ? removeDelegation(this.subjectId).then(() => delegate(this.subjectId, collaborator)) : delegate(this.subjectId, collaborator)
      }
      promise.then(() => {
        this.fetch()
        store.dispatch('refreshSubjects')
      })
    }
  },

  created () {
    this.fetch()
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

  .current {
    padding: 10px 20px;
    font-weight: bold;
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
