<template>
  <div class="component">
    <div class="date-address">
      <p class="date"> Date: {{ basket.date }} </p>
      <p class="address">Address: {{basket.address}} </p>
    </div>
    <span>Product list:</span>
    <div class="products">
        <span
          v-for="(product, i) of basket.products"
          :key="product.id"
          @click="() => $router.push(`products/${product.id}`)"
        >
          {{ product.name }}{{ i != basket.products.length - 1 ? ',' : ''  }}
        </span>
    </div>
    <p class="price">Price: {{basket.price}} </p>
  </div>
</template>

<script>
export default {
  name: 'CompBasket',
  props: ['basket']
}
</script>

<style scoped lang="sass">
.date
  color: black
.date-address
  display: flex
  *
    margin-right: 5px
</style>
