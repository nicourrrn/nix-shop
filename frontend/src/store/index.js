import { createStore } from 'vuex'

export default createStore({
  state: {
    backendUrl: 'localhost:8000',
    allIngredients: ['one', 'two'],
    suppliers: [
      {
        id: 1,
        name: 'Pizza Club',
        type: 'restaurant',
        image: 'https://play-lh.googleusercontent.com/qMewibe3u5Wvq3fBf3Ca3_QItjHCOKeGrOAzVXWxqzgRpMwxYlD5CA6M2M5L78SwNA',
        workingHours: {
          opening: '09:00',
          closing: '20:00'
        },
        menu: [
          {
            id: 0,
            image: 'https://lh3.google.com/u/0/ogw/ADea4I7ZvvAWWv7SGDCxTlNmSjJMoB7SGrgQR3RSkdU=s32-c-mo',
            name: 'Some name',
            type: 'Some type',
            price: 999,
            ingredients: ['one', 'two', 'three']
          }
        ]
      }
    ],
    basket: {
      productsInfo: [],
      address: ''
    }
  },
  getters: {
    suppliers: (state) => state.suppliers,
    ingredients: (state) => state.allIngredients,
    products: (state) => {
      const suppliersMenus = state.suppliers.map((s) => {
        return s.menu.map(p => { p.supplier = { id: s.id, name: s.name }; return p })
      })
      let result = []
      for (const menu of suppliersMenus) {
        result = result.concat(menu)
      }
      return result
    },
    basketProducts: (state) => state.basket.productsInfo,
    backendUrl: (state) => state.backendUrl
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
