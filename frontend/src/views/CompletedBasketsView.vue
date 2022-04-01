<template>
  <div class="baskets">
    <CompBasket
    v-for="basket of baskets"
    :key="basket.id"
    :basket="basket"
    >
    </CompBasket>
  </div>
</template>

<script>
import axios from 'axios'
import CompBasket from '@/components/CompBasket'

export default {
  name: 'CompletedBasketsView',
  data () {
    return {
      baskets: []
    }
  },
  methods: {
    async getBaskets () {
      const accessToken = this.$store.getters.userData.accessToken
      console.log(accessToken)
      if (accessToken.length === 0) {
        alert('Need login', accessToken)
        return
      }
      let response = []
      try {
        response = (await axios.get(`${this.$store.getters.backendUrl}/basket/all`, { headers: { 'Access-Token': accessToken } })).data
      } catch (e) {
        alert(e)
      }
      console.log(response)
      this.baskets = response
    }
  },
  mounted () {
    this.getBaskets()
  },
  components: { CompBasket }
}
</script>

<style scoped lang="sass">
.baskets
  display: flex
  flex-wrap: wrap
  *
    margin: 10px
</style>
