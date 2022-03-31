import { createStore } from 'vuex'
import axios from 'axios'
import { userModule } from 'user.js'

const backendUrl = 'http://localhost:8000'

export default createStore({
  state: {
    allIngredients: [],
    suppliers: [],
    products: []
  },
  getters: {
    suppliers: (state) => state.suppliers,
    ingredients: (state) => state.allIngredients,
    products: (state) => state.products
  },
  mutations: {
    setIngredients (state, newIngredients) {
      state.allIngredients = newIngredients
    },
    setSuppliers (state, newSuppliers) {
      state.suppliers = newSuppliers.map(v => { v.menu = []; return v })
    },
    addProduct (state, product) {
      state.products.push(product)
    }
  },
  actions: {
    async loadData (context) {
      axios.get(`${backendUrl}/ingredients`)
        .then(value => {
          context.commit('setIngredients', value.data)
        })
      const suppliers = (await axios.get(`${backendUrl}/suppliers`)).data
      for (const s of suppliers) {
        axios.get(`${backendUrl}/products?id=${s.id}`)
          .then(value => {
            value.data.forEach(p => {
              p.supplier = { id: s.id, name: s.name }
              context.commit('addProduct', p)
            })
          })
      }
      context.commit('setSuppliers', suppliers)
    },
  },
  modules: {
    user: userModule
  }
})
