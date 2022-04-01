<template>
  <div v-if="$store.getters.userData.accessToken === ''">
    <h1>Необхідна авторизація!</h1>
  </div>
  <div v-else>
      <div class="buy-menu">
        <span>Адресс:</span>
        <input type="text" v-model="address"/>
        <input type="button" value="Замовити" @click="buy"/>
      </div>
      <div class="product-list">
        <div class="product" v-for="(productInfo, index) in $store.getters.checkedProducts" :key="index">
          <ProductListElement :product="productInfo.product"></ProductListElement>
          <input type="number" v-model="productInfo.count" max="20" min="1"/>
          <input type="button" value="Видалити" @click="() => $store.commit('removeProductFromBasket', productInfo.product.id)">
        </div>
      </div>
  </div>
</template>

<script>
import ProductListElement from '@/components/ProductListElement'

export default {
  name: 'BasketView',
  components: {
    ProductListElement
  },
  data () {
    return {
      address: ''
    }
  },
  methods: {
    buy () {
      if (this.address !== '') {
        this.$store.commit('setUser', { address: this.address })
        this.$store.dispatch('sendBasket')
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped lang="sass">
.buy-menu
  margin-bottom: 10px
  input
    margin: 0 10px
.product
  display: flex
  flex-direction: column
  input
    width: 50%
    align-self: center
  margin-bottom: 10px
</style>
