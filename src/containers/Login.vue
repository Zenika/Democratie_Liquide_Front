<template>
    <div class="login">
        <form ref="form" v-model="form" label-width="120px">
            <!--<input class="simple email" v-model="form.email" placeholder="Entrez votre email"></input>-->
            <text-input placeholder="Email" v-model="form.email"></text-input>
            <text-input placeholder="Password" v-model="form.password"></text-input>
            <!--<input class="simple password" v-model="form.password" placeholder="Entrez votre mot de passe"></input>
            <div>
                <button class="small" title="login" @click="login(form)"></button>
                <button class="small" title="Login" @click="loginWithGoogle()"><i class="fa fa-google" aria-hidden="true"></i></button>
            </div>-->
        </form>
        <notification-center></notification-center>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import NotificationCenter from '@/containers/NotificationCenter'
import TextInput from '@/components/TextInput'

export default {
  name: 'login',

  data () {
    return {
      form: {
        email: '', // 'valentin.bailleul@zenika.com',
        password: '' // 'valentin.bailleul@zenika.com'
      }
    }
  },

  methods: {
    ...mapActions(['login', 'loginWithGoogle'])
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

    form {
      display: flex;
      flex-direction: column;
    }
  }

  .text-input {
    margin: 5px;
    font-size: 1em
  }

</style>
