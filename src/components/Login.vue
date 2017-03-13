<template>
    <div class="home">
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="Email">
                <el-input v-model="form.email" placeholder="Entrez votre email"></el-input>
            </el-form-item>
            <el-form-item label="password">
                <el-input v-model="form.password" placeholder="Entrez votre mot de passe"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login(form)">Login</el-button>

            </el-form-item>
        </el-form>       
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      form: {
        email: 'aaa@zenika.com',
        password: 'aaa@zenika.com'
      }
    }
  },

  methods: {
    ...mapActions(['login'])
  }
}

</script>

<style>

</style>
