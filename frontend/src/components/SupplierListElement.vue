<template>
  <div class="element" @click="() => $router.push(`/suppliers/${supplier.id}`)">
    <span class="name"> {{supplier.name}} </span>
    <img :src="supplier.image" alt="Error image"/>
    <span class="type"> {{supplier.type}} </span>
    <span class="time"> {{ `${supplier.openAt}-${supplier.closeAt}`}} </span>
  </div>
</template>

<script>
export default {
  name: 'SupplierListElement',
  props: ['supplier']
}
</script>

<style scoped lang="sass">
.element
  display: flex
  justify-content: center
  flex-direction: column
  *
    width: 300px
img
  color: red

</style>
