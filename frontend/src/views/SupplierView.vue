<template>
  <div class="supplier">
    <h1 v-if="supplier === undefined">
      Supplier not found
    </h1>
    <div v-else>
      <div class="main-info">
        <h2 class="name">{{supplier.name}}</h2>
        <img :src="supplier.image" class="img"/>
        <span class="type">{{supplier.type}}</span>
      </div>
      <div class="product-list">
        <ProductListElement v-for="(product, index) in supplier.menu"
                            :key="index"
                            :product="product"
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
      return undefined
    }
  },
  components: {
    ProductListElement
  }
}
</script>

<style scoped>

</style>
