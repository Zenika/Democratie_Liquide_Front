<template>
    <div class="login">
        <span class="logo">
          <img src="../assets/logo.png"/>
          ZDemocracy
        </span>
        <form method="POST" action="/signin/google" v-if="methods.GOOGLE_AUTH">
          <button type="submit" class="small" title="Login with Google"></button>
        </form>
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

  .logo {
    display: flex;
    align-items: center;
    font-weight: bold;
    padding: 10px;


    img {
      padding-bottom: 5px;
      height: 25px;
      width: 25px;
      margin-right: 10px;
    }
  }

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
