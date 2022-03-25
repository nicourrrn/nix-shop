<template>
  <div class="menu">
    <div class="menu-setting">
      <div class="sort-setting">
        <input
          v-model="setting.input_form"
          placeholder="Название ингредиента"
          type="text"
        />
        <div class="sort-preview">
          <div
            v-for="(ingredient, index) in addebleIngredients"
            :key="index"
            class="ingredient"
            @click="setting.added_ingredient.push(ingredient)"
          >
            {{ ingredient }}
          </div>
        </div>
        <div class="checked-ingredients">
          <div
            v-for="(ingredient, index) in this.setting.added_ingredient"
            :key="index"
            class="ingredient"
            @click="setting.added_ingredient.pop(index)"
          >
            {{ ingredient }}
          </div>
        </div>
      </div>
    </div>
    <div class="menu-list">
      <ProductListElement
        v-for="(product, index) in lookedProducts"
        :product = product
        :key="index"
      ></ProductListElement>
    </div>
  </div>
</template>

<script>
import ProductListElement from '@/components/ProductListElement'

export default {
  name: 'MenuView',
  data () {
    return {
      setting: {
        input_form: '',
        added_ingredient: []
      }
    }
  },
  computed: {
    addebleIngredients () {
      return this.$store.getters.ingredients.filter(
        (value) =>
          !this.setting.added_ingredient.includes(value) &&
          value.startsWith(this.setting.input_form)
      )
    },
    lookedProducts () {
      console.log(this.$store.getters.products)
      return this.$store.getters.products.filter(
        product => this.setting.added_ingredient.every(ingredient => product.ingredients.includes(ingredient))
      )
    }

  },
  components: {
    ProductListElement
  }
}
</script>

<style lang="sass" scoped>

.ingredient
  margin: 5px

.menu
  display: flex

  .sort-preview
    display: flex

    .ingredient
      &:hover
        background-color: #42b983

  .checked-ingredients
    display: flex

    .ingredient
      &:hover
        background-color: #2c3e50
</style>
