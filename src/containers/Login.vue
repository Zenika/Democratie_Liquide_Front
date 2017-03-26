<template>
    <div class="login">
        <button v-if="methods.GOOGLE_AUTH" class="small" title="Login with Google" @click="loginWithGoogle()"><i class="fa fa-google" aria-hidden="true"></i></button>
        <div v-else class="form" label-width="120px">
            <text-input placeholder="Email" v-model="form.email"></text-input>
            <text-input placeholder="Password" v-model="form.password"></text-input>
            <button class="small" title="Login" @click.prevent="login(form)"></button>
        </div>
        <notification-center></notification-center>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import NotificationCenter from '@/containers/NotificationCenter'
import TextInput from '@/components/TextInput'
import { getAuthMethods } from '@/api/auth-api'

export default {
  name: 'login',

  data () {
    return {
      methods: {},
      form: {
        email: '',
        password: ''
      }
    }
  },

  methods: {
    ...mapActions(['login', 'loginWithGoogle'])
  },

  beforeRouteEnter (to, from, next) {
    getAuthMethods().then(({data}) => {
      next(vm => (vm.methods = data))
    })
  },

  components: {
    NotificationCenter,
    TextInput
  }
}

</script>

<style lang="scss" scoped>

  .login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background: lightgray;

    .form {
      display: flex;
      flex-direction: column;
    }

    .small {
      margin-top: 10px;
      padding: 5px 20px;
      font-size: 1.25em;
      color: grey;
      &:active {
        color: white
      }
      // height: 30px;
    }
  }

  .text-input {
    margin: 5px;
    font-size: 1em
  }

</style>
