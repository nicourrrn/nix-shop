<template>
  <div class="suppliers">
    <SupplierListElement
      v-for="s of supplierList"
      :key="s.id"
      :supplier="s">
    </SupplierListElement>
  </div>
</template>

<script>
import SupplierListElement from '../components/SupplierListElement'

export default {
  name: 'SuppliersView',
  data () {
    return {
      supplierList: this.$store.getters.suppliers
    }
  },
  components: {
    SupplierListElement
  }
}
</script>

<style scoped lang="sass">
.suppliers
  display: flex
  flex-wrap: wrap
  *
    margin: 10px
</style>
