<template>
  <div class="login">
    <div v-if="!newUser" class="login-form">
      <p>Email</p>
      <input type="email" v-model="email"/>
      <p>Password</p>
      <input type="password" v-model="password">
      <input type="button" @click="this.SignIn" value="SignIn" :disabled="email.length === 0 || password.length === 0">
    </div>
    <div v-else class="login-form">
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
    <input type="button" :value="newUser ? 'SingIn' : 'SingUp'" @click="() => newUser = !newUser"/>
    <input type="button" value="LogOut" @click="() => $store.dispatch('LogOut')" />
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

<style scoped lang="sass">
.login
  display: flex
  flex-direction: column
  align-content: center
  margin: 0 30%
  p
    margin: 0
  input
    margin-bottom: 10px
.login-form
  display: flex
  flex-direction: column
  align-content: center
</style>
