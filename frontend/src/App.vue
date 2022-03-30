<template>
    <nav>
      <div class="center">
        <router-link to="/">Menu</router-link> |
        <router-link to="/basket">Basket</router-link>
      </div>
      <div class="right-side">
        <router-link to="/login">{{ LoginText }}</router-link> |
        <router-link to="/about">About</router-link>
      </div>
    </nav>
    <router-view />
</template>

<script>

export default {
  computed: {
    LoginText () {
      const userDefined = this.user !== undefined
      const haveName = typeof (this.user.name) === 'string'
      const lenMoreZero = this.user.name.length > 0
      console.log(userDefined, haveName, lenMoreZero)
      if (userDefined && haveName && lenMoreZero) {
        return `Привіт, ${this.user.name}`
      } else {
        return 'Login'
      }
    }
  },
  data () {
    return {
      updater: undefined,
      user: this.$store.getters.userData
    }
  },
  mounted () {
    this.$store.dispatch('refresh')
    this.updater = setInterval(() => this.$store.dispatch('refresh'), 50000)
  }
}

</script>

<style lang="sass">
html
  background-color: antiquewhite
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50

nav
  display: flex
  justify-content: flex-end
  padding: 30px
  a
    font-weight: bold
    color: #2c3e50

    &.router-link-exact-active
      color: #42b983

  .right-side
    margin-left: 10%

</style>
