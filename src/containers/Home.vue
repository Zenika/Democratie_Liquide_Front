<template>
  <div class="home">

    <div class="header">
      <span class="logo">
        <img src="../assets/logo.png"/>
        ZDemocracy
      </span>
      <button title="Logout" class="small" @click="logout"></button>
    </div>

    <filter-line></filter-line>
    <subject-list></subject-list>
    <router-link tag="button" to="/subject/create" class="simple create" title="Créer un sujet"><i class="fa fa-plus" aria-hidden="true"></i></router-link>

    <transition name="zoom-in">
      <modal v-if="modal && modal.component" :title="modal.title" @close="closeModal">
        <component :is="modal.component" v-bind="modal.props"/>
      </modal>
    </transition>

    <notification-center></notification-center>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SubjectList from '@/containers/SubjectList'
import FilterLine from '@/containers/FilterLine'
import NotificationCenter from '@/containers/NotificationCenter'
import Modal from '@/components/Modal'
import { goHome } from '@/config/router'

export default {
  name: 'home',

  props: {
    modal: Object
  },

  created () {
    this.refreshSubjects()
    this.refreshCategories()
    this.refreshChannels()
    this.refreshCollaborator()
  },
  methods: {
    ...mapActions([
      'refreshCollaborator',
      'refreshSubjects',
      'refreshCategories',
      'refreshChannels',
      'logout'
    ]),

    closeModal () {
      goHome()
    }
  },
  components: {
    SubjectList,
    FilterLine,
    NotificationCenter,
    Modal
  }
}
</script>

<style lang="scss" scoped>

@import '../assets/transitions';

.header {
  display: flex;
  align-items: center;
  font-weight: bold;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid lightgray;
  background-color: rgba(0,0,0,0.05);
  flex-shrink: 0;

  .logo {
    display: flex;
    align-items: center;
    font-weight: bold;
    img {
      margin-top: -2px;
      height: 25px;
      width: 25px;
      margin-right: 10px;
    }
  }
}

.home {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;

  .filter-line {
    // margin: 0px 0 10px 0;
  }
}

.create {
    width: 96%;
    height: 50px;
    font-size: 2.5em;
    margin: 20px 2%;
    flex-shrink: 0;
  }
</style>
