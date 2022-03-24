import { createStore } from 'vuex'

export default createStore({
  state: {
    allIngredients: ['one', 'two'],
    products: [
      {
        id: 0,
        imgSrc:
          'https://lh3.google.com/u/0/ogw/ADea4I7ZvvAWWv7SGDCxTlNmSjJMoB7SGrgQR3RSkdU=s32-c-mo',
        name: 'Some name',
        type: 'Some type',
        price: 999,
        ingredients: ['one', 'two', 'three']
      }
    ],
    basket: {
      productsInfo: [],
      address: ''
    }
  },
  getters: {
    ingredients: (state) => state.allIngredients,
    products: (state) => state.products,
    basketProducts: (state) => state.basket.productsInfo
  },
  mutations: {
    addProduct (state, saledProductInfo) {
      const productsIds = state.basket.productsInfo.map(value => value.product.id)
      if (!productsIds.includes(saledProductInfo.product.id)) {
        state.basket.productsInfo.push(saledProductInfo)
      }
    },
    setAddress (state, address) {
      state.basket.address = address
    }
  },
  actions: {},
  modules: {}
})
