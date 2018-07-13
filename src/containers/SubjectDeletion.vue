<template>
  <div class="subject-deletion">
    <div class="message">Voulez vous vraiment supprimer le sujet "{{ currentSubject.title }}" ? </div>
    <div class="buttons">
      <router-link tag="button" to="/" class="small">Non</router-link>
      <button class="small" @click="!deleting && confirm()">Oui</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { deleteSubject } from '@/api/subject-api'
import { goHome } from '@/config/router'

export default {
  name: 'subject-deletion',

  data() {
    return {
      deleting: false
    }
  },

  computed: {
    ...mapGetters(['currentSubject'])
  },

  methods: {
    confirm() {
      this.deleting = true
      deleteSubject(this.currentSubject.uuid).then(goHome, () => (this.deleting = false))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/style';

.subject-deletion {
  display: flex;
  flex-direction: column;
}

.message {
  padding: 10px 20px;
}

.buttons {
  display: flex;
  padding: 0 10px;
  margin-bottom: 10px;
  button {
    flex-grow: 1;
    height: 30px;
    margin: 0 10px;
  }
}
</style>
