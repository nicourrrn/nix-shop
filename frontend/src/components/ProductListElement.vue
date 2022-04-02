<template>
  <div class="element" @click="() => $router.push(`/products/${this.product.id}`)">
    <img :src="product.image" alt="Image not loaded"/>
    <div class="name">{{ product.name }}</div>
    <div class="description">
      <div class="type">Type: {{ product.type }}</div>
      <div class="price">Price: {{ product.price * count }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductListElement',
  props: {
    product: {
      type: Object
    },
    count: {
      type: Number,
      default: 1
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
