<template>
  <div class="menu">
    <div class="menu-setting">
      <div class="ingredients-setting">
        <input
          v-model="setting.input_ingredient"
          placeholder="Название ингредиента"
          type="text"
          class="ingredient-input"
        />
        <div class="ingredients-preview">
          <div
            v-for="(ingredient, index) in addebleIngredients.slice(0, 10)"
            :key="index"
            class="ingredient"
            @click="setting.added_ingredient.push(ingredient)"
          >
            {{ ingredient }}
          </div>
        </div>
        <h4>Обрані фільтри</h4>
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
      <div class="type-setting">
        <input
          v-model="setting.input_type"
          placeholder="Название типа"
          type="text"
          class="ingredient-input"
        />
        <div class="ingredients-preview">
          <div
            v-for="(type, index) in addebleProductTypes.slice(0, 2)"
            :key="index"
            class="ingredient"
            @click="setting.added_type.push(type)"
          >
            {{ type }}
          </div>
        </div>
        <h4>Обрані фільтри</h4>
        <div class="checked-ingredients">
          <div
            v-for="(type, index) in this.setting.added_type"
            :key="index"
            class="ingredient"
            @click="setting.added_type.pop(index)"
          >
            {{ type }}
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
        input_ingredient: '',
        added_ingredient: [],
        input_type: '',
        added_type: []
      }
    }
  },
  computed: {
    addebleIngredients () {
      return this.$store.getters.ingredients.filter(
        (value) =>
          !this.setting.added_ingredient.includes(value) &&
          value.startsWith(this.setting.input_ingredient)
      )
    },
    addebleProductTypes () {
      return [...this.$store.getters.product_types].filter(
        (value) =>
          !this.setting.added_type.includes(value) &&
          value.startsWith(this.setting.input_type)
      )
    },
    lookedProducts () {
      return this.$store.getters.products.filter(
        product => this.setting.added_ingredient.every(ingredient => product.ingredients.includes(ingredient)) &&
          this.setting.added_type.every(type => product.type === type)
      )
    }

  },
  components: {
    ProductListElement
  },
  mounted () {
    this.$store.dispatch('getData')
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

.ingredients-preview
  .ingredient
    margin: 1vw 0
    &:hover
      color: dodgerblue
      cursor: cell
.checked-ingredients
  .ingredient
    margin: 1vw 0
    &:hover
      color: red
      cursor: alias

.menu-list
  display: grid
  grid-template-columns: 1fr 1fr
  column-gap: 5px
  row-gap: 5px
</style>
