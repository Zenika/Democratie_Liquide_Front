<template>
  <div class="home">

    <filter-line></filter-line>
    <subject-list></subject-list>
    <router-link tag="button" to="/subject/create" class="simple create" title="Créer un sujet"><i class="fa fa-plus" aria-hidden="true"></i></router-link>

    <transition name="zoom">
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
      'refreshChannels'
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

.zoom-enter, .zoom-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

.zoom-enter-active, .zoom-leave-active {
  transition: all 250ms;
}

.zoom-enter-to, .zoom-leave {
  opacity: 1;
}

.home {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;

  .filter-line {
    margin: 25px 0 10px 0;
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
