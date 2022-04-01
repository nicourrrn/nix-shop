<template>
  <div class="component">
    <span class="id"> Id: {{basket.id}}</span>
    <p class="date"> Date: {{ basket.date }} </p>
    <p class="address">Address: {{basket.address}} </p>
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
.component
  *
    margin: 0
.products
  *
    color: black

</style>
