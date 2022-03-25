<template>
<div class="product">
  <h1 v-if="product === undefined">
    Product not found
  </h1>
  <div v-else>
    <div class="main-info">
      <h2 class="name">{{product.name}}</h2>
      <span class="supplier" @click="() => $router.push('/suppliers/'+product.supplier.id)">{{product.supplier.name}}</span>
      <img :src="product.image" class="img"/>
    </div>
    <div class="sub-info">
      <span class="ingredients">{{ product.ingredients.join(", ") }}</span>
      <span class="type">{{product.type}}</span>
      <span class="price">{{product.price}}</span>
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
