<template>
  <div class="menu">
    <div class="menu-setting">
      <div class="sort-setting">
        <input
          v-model="setting.input_form"
          placeholder="Название ингредиента"
          type="text"
          class="ingredient-input"
        />
        <div class="sort-preview">
          <div
            v-for="(ingredient, index) in addebleIngredients.slice(0, 10)"
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
      return this.$store.getters.products.filter(
        product => this.setting.added_ingredient.every(ingredient => product.ingredients.includes(ingredient))
      )
    }

  },
  components: {
    ProductListElement
  },
  mounted () {
    this.$store.dispatch('loadData')
  }
}
</script>

<style lang="sass" scoped>
.menu
  display: grid
  grid-template-columns: 30% 68%

.menu-setting
  display: flex
  margin: 2vh 2vw
  .ingredient-input
    width: 100%
  .ingredient
    margin: 1vw 0
    &:hover
      color: dodgerblue
      cursor: cell

.menu-list
  display: grid
  grid-template-columns: 1fr 1fr
  column-gap: 5px
  row-gap: 5px
</style>
