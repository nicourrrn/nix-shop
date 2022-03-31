<template>
<div class="product">
  <h1 v-if="product === undefined">
    Product not found
  </h1>
  <div v-else class="product">
    <div class="main-info">
      <h2 class="name">{{product.name}}</h2>
      <span class="supplier" @click="() => $router.push('/suppliers/'+product.supplier.id)">Постачальник: {{product.supplier.name}}</span>
      <img :src="product.image" class="img"/>
    </div>
    <div class="sub-info">
      <span class="ingredients">Ingredients: {{ product.ingredients.join(", ") }}</span>
      <div class="info">
        <span class="type">Type: {{product.type}}</span>
        <span class="price">Price: {{product.price * productCount}}</span>
      </div>
      <div class="add">
        <input type="button" value="Додати до кошика" @click="addToBasket" />
        <input type="number" v-model="productCount" min="1" max="20">
      </div>
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
      this.$store.commit('addProductToBasket', { product: this.product, count: this.productCount })
      this.$router.push('/basket')
    }
  },
  data () {
    return {
      productCount: 1
    }
  }
}
</script>

<style scoped lang="sass">
.product
  display: flex
.main-info
  display: flex
  flex-direction: column
  h2
    margin-bottom: 1px
img
  max-width: 100%
  max-height: 100%
.supplier
  color: royalblue
  cursor: pointer
  &:hover
    color: blueviolet
.sub-info
  margin: 70px 10px
  display: flex
  flex-direction: column
.info
  display: flex
  justify-content: space-around
.add
  display: flex
  flex-direction: column
</style>
