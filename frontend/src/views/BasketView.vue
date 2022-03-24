<template>
    <div>
    <div class="product-list">
      <div class="product" v-for="(productInfo, index) in $store.getters.basketProducts" :key="index">
        <ProductListElement :product="productInfo.product"></ProductListElement>
        <input type="number" v-model="productInfo.count" />
      </div>
    </div>
    <div class="buy-menu">
      <p>Адресс:</p>
      <input type="text" v-model="address"/>
      <input type="button" value="Замовити" @click="buy"/>
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
      if (this.address === '') {
        return
      }
      this.$store.commit('setAddress', this.address)
      alert(`Дякуємо за замовлення, ваш номер ${(Math.random() * 100000).toFixed()}`)
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
