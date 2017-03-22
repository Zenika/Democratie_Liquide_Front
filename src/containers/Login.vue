<template>
    <div class="login">
        <form ref="form" v-model="form" label-width="120px">
            <div label="Email">
                <input v-model="form.email" placeholder="Entrez votre email"></input>
            </div>
            <div label="password">
                <input v-model="form.password" placeholder="Entrez votre mot de passe"></input>
            </div>
            <div>
                <button class="small" type="primary" @click="login(form)">Login</button>
                <button class="small" type="danger" @click="loginWithGoogle()">Login with Google</button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'login',

  data () {
    return {
      form: {
        email: 'valentin.bailleul@zenika.com',
        password: 'valentin.bailleul@zenika.com'
      }
    }
  },

  methods: {
    ...mapActions(['login', 'loginWithGoogle'])
  }
}

</script>

<style>

</style>
