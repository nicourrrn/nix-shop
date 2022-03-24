<template>
  <div class="element" @click="openPage">
    <img :src="product.imgSrc" />
    <div class="name">{{ product.name }}</div>
    <div class="description">
      <div class="type">{{ product.type }}</div>
      <div class="price">{{ product.price }}</div>
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

<style scoped></style>
