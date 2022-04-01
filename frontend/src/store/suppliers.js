import axios from 'axios'
const backendUrl = 'http://localhost:8000'

export default {
  state: {
    allIngredients: [],
    suppliers: [],
    products: []
  },
  getters: {
    suppliers: (state) => state.suppliers,
    ingredients: (state) => state.allIngredients,
    products: (state) => state.products,
    product_types: (state) => new Set(state.products.map(value => value.type))
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
    async getData (context) {
      axios.get(`${backendUrl}/ingredients`)
        .then(value => {
          context.commit('setIngredients', value.data)
        })
        .catch(e => alert(e))
      let suppliers
      try {
        suppliers = (await axios.get(`${backendUrl}/suppliers`)).data
      } catch (e) {
        alert(e)
        return
      }
      for (const s of suppliers) {
        axios.get(`${backendUrl}/products?id=${s.id}`)
          .then(value => {
            value.data.forEach(p => {
              p.supplier = { id: s.id, name: s.name }
              context.commit('addProduct', p)
            })
          })
          .catch(e => { alert(e) })
      }
      context.commit('setSuppliers', suppliers)
    }
  }
}
