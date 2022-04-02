<template>
  <div class="supplier">
    <h1 v-if="supplier === undefined">
      Supplier not found
    </h1>
    <div v-else>
      <div class="main-info">
        <h2 class="name">{{supplier.name}}</h2>
        <span class="type">Type: {{supplier.type}}</span>
        <span> Open at: {{supplier.openAt}} </span>
        <span> Close at: {{supplier.closeAt}} </span>
        <img :src="supplier.image" class="img"/>
      </div>
      <h3>Products: </h3>
      <div class="product-list">
        <ProductListElement v-for="(product, index) in menu"
                            :key="index"
                            :product="product"
                            class="item"
        ></ProductListElement>
      </div>
    </div>
  </div>
</template>

<script>
import ProductListElement from '@/components/ProductListElement'
export default {
  name: 'SupplierView',
  computed: {
    supplier () {
      for (const value of this.$store.getters.suppliers) {
        if (value.id === Number(this.$route.params.id)) {
          return value
        }
      }
      return []
    },
    menu () {
      const menu = this.$store.getters.products
      return menu.filter(value => value.supplier.id === this.supplier.id)
    }
  },
  components: {
    ProductListElement
  }
}
</script>

<style scoped lang="sass">
.main-info
  display: flex
  flex-direction: column
  span
    margin-left: 10px
  h2
    margin: 10px 0
  img
    max-height: 50%
    max-width: 50%
    align-self: center
  margin-bottom: 10px
.product-list
  display: flex
  .item
    margin: 10px
</style>
