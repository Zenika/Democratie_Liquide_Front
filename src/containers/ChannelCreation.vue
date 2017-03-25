<template>
  <div class="channel-creation">
    <text-input class="simple title" placeholder="Titre" v-model="channel.title" ref="title"/>
    <text-input textarea class="simple description" placeholder="Description" v-model="channel.description"/>
    <div class="footer">
      <span class="actions">
        <button @click="init" title= "Réinitialiser" class="small refresh"><i class="fa fa-refresh" aria-hidden="true"></i></button>
        <button @click="!posting && send()" title= "Envoyer" class="small refresh"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
      </span>
    </div>
  </div>
</template>

<script>
import { createChannel } from '@/api/channel-api'
import { goHome } from '@/config/router'
import TextInput from '@/components/TextInput'

export default {
  name: 'channel-creation',

  data () {
    return {
      channel: {},
      posting: false
    }
  },

  methods: {
    init () {
      this.channel = {
        title: '',
        description: ''
      }
    },

    send () {
      this.posting = true
      createChannel(this.channel).then(goHome, () => (this.posting = false))
    }
  },

  created () {
    this.init()
  },

  mounted () {
    this.$refs.title.focus()
  },

  components: {
    TextInput
  }
}
</script>

<style lang="scss" scoped>

  @import '../assets/style';

  .channel-creation {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 5px;
  }

  .text-input {
    min-height: 15px;
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
