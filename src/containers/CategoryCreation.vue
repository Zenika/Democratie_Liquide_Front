<template>
  <div class="category-creation">
    <input class="simple title" placeholder="Titre" v-model="category.title"/>
    <textarea class="simple description" placeholder="Description" v-model="category.description"/>
    <div class="footer">
      <span class="actions">
        <button @click="init" title= "Réinitialiser" class="small refresh"><i class="fa fa-refresh" aria-hidden="true"></i></button>
        <button @click="send" title= "Envoyer" class="small refresh"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
      </span>
    </div>
  </div>
</template>

<script>
import { createCategory } from '@/api/category-api'
import { goHome } from '@/config/router'

export default {
  name: 'category-creation',

  data () {
    return {
      category: {}
    }
  },

  methods: {

    init () {
      this.category = {
        title: '',
        description: ''
      }
    },

    send () {
      createCategory(this.category).then(goHome)
    }
  },

  created () {
    this.init()
  },

  components: {}
}
</script>

<style lang="scss" scoped>

  @import '../assets/style';

  .category-creation {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 5px;
  }
  input, textarea {
    min-height: 15px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
  }


  .title {
    font-weight: bold;
    font-size: 1.5em;
  }

  .description {
    font-size: 1em;
    margin-bottom: 0;
  }

  .footer {
    margin-top: 10px;
    border-top: 1px solid lightgrey;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;

    button {
      margin-left: 10px;
    }
  }

</style>
