<template>
    <nav>
      <div class="center">
        <router-link to="/">Menu</router-link> |
        <router-link to="/basket">Basket</router-link>
      </div>
      <div class="right-side">
        <router-link to="/login">Login</router-link> |
        <router-link to="/about">About</router-link>
      </div>
    </nav>
    <router-view />
</template>

<script>

export default {
  methods: {
    acceptCookies () {
      if (localStorage.getItem('cookies') !== 'true') {
        const answer = confirm('Accept cookies please')
        if (answer) {
          localStorage.setItem('cookies', 'true')
        } else {
          this.acceptCookies()
        }
      }
    }
  },
  mounted () {
    this.acceptCookies()
    this.$store.dispatch('refresh')
  }
}

</script>

<style lang="sass">
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
