<template>
<div class="product">
  <h1 v-if="product === undefined">
    Product not found
  </h1>
  <div v-else>
    <div class="main-info">
      <h2 class="name">{{product.name}}</h2>
      <img :src="product.imgSrc" class="img"/>
    </div>
    <div class="sub-info">
      <span class="ingredients">{{ product.ingredients.join(", ") }}</span>
      <div>
        <span class="type">{{product.type}}</span>
        <span class="price">{{product.price}}</span>
      </div>
      <input type="button" value="Додати до кошика" @click="addToBasket" />
      <input type="number" v-model="productCount">
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ProductView',
  computed: {
    product () {
      for (const value of this.$store.getters.products) {
        if (value.id === Number(this.$route.params.id)) {
          return value
        }
      }
      return undefined
    }
  },
  methods: {
    addToBasket () {
      this.$store.commit('addProduct', { product: this.product, count: this.productCount })
      this.$router.push('/basket')
    }
  },
  data () {
    return {
      productCount: 0
    }
  }
}
</script>

<style scoped>

</style>
