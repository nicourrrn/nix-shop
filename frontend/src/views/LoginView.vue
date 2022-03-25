<template>
  <div class="login">
    <input type="button" :value="newUser ? 'Login' : 'SingUp'" @click="() => newUser = !newUser"/>
    <div v-if="!newUser">
      <input type="text" v-model="login"/>
      <input type="password" v-model="password">
      <input type="button" @click="LogIn" value="Login">
    </div>
    <div v-else>
      <input type="text" v-model="login"/>
      <input type="password" v-model="password">
      <input type="password" v-model="copyPassword">
      <input type="button" @click="LogIn" value="Login" :disabled="password !== copyPassword">
    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'LoginView',
  data () {
    return {
      login: '',
      password: '',
      copyPassword: '',
      newUser: false
    }
  },
  methods: {
    LogIn () {
      const baseUrl = this.$store.getters.backendUrl
      axios.post(baseUrl + '/user/login', {
        login: this.login,
        password: this.password
      })
    }
  }
}
</script>

<style scoped>

</style>
