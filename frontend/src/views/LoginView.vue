<template>
  <div class="login">
    <input type="button" :value="newUser ? 'Login' : 'SingUp'" @click="() => newUser = !newUser"/>
    <div v-if="!newUser">
      <p>Email</p>
      <input type="email" v-model="email"/>
      <p>Password</p>
      <input type="password" v-model="password">
      <input type="button" @click="this.SignIn" value="SignIn" :disabled="email.length === 0 || password.length === 0">
    </div>
    <div v-else>
      <p>Name</p>
      <input type="text" v-model="name">
      <p>Login</p>
      <input type="email" v-model="email"/>
      <p>Password</p>
      <input type="password" v-model="password">
      <p>Password again</p>
      <input type="password" v-model="copyPassword">
      <input type="button" @click="this.SignUp" value="SignUp" :disabled="password !== copyPassword || password.length === 0 || name.length === 0 || email.length === 0">
    </div>
  </div>
</template>

<script>

// import axios from 'axios'

export default {
  name: 'LoginView',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      copyPassword: '',
      newUser: false
    }
  },
  methods: {
    SignIn () {
      this.$store.dispatch('signIn', { email: this.email, password: this.password })
    },
    SignUp () {
      this.$store.dispatch('signUp', { name: this.name, email: this.email, password: this.password })
    }
  }
}
</script>

<style scoped>

</style>
