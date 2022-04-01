<template>
  <div class="element" @click="openPage">
    <img :src="product.image" />
    <div class="name">{{ product.name }}</div>
    <div class="description">
      <div class="type">Type: {{ product.type }}</div>
      <div class="price">Price: {{ product.price }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductListElement',
  props: ['product'],
  methods: {
    openPage () {
      this.$router.push(`/products/${this.product.id}`)
    }
  }
}
</script>

<style scoped lang="sass">
img
  max-height: 100%
  max-width: 100%
.element
  display: flex
  flex-direction: column
  .name
    align-self: center
.description
  display: flex
  justify-content: space-around
</style>
