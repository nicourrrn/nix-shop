import { createStore } from 'vuex'
import axios from 'axios'

const backendUrl = 'http://localhost:8000'

export default createStore({
  state: {
    allIngredients: [],
    suppliers: [{
      id: 33,
      name: 'texst'
    }],
    products: [],
    basket: {
      productsInfo: [],
      address: ''
    },
    userData: {
      name: '',
      email: '',
      accessToken: ''
    }
  },
  getters: {
    userData: (state) => state.userData,
    suppliers: (state) => state.suppliers,
    ingredients: (state) => state.allIngredients,
    products: (state) => state.products,
    basketProducts: (state) => state.basket.productsInfo,
    basketAddress: (state) => state.basket.address

  },
  mutations: {
    clearBasket (state) {
      state.basket = {
        productsInfo: [],
        address: ''
      }
    },
    addProductToBasket (state, saledProductInfo) {
      const productsIds = state.basket.productsInfo.map(value => value.product.id)
      if (!productsIds.includes(saledProductInfo.product.id)) {
        state.basket.productsInfo.push(saledProductInfo)
      }
    },
    setAddress (state, address) {
      state.basket.address = address
    },
    setIngredients (state, newIngredients) {
      state.allIngredients = newIngredients
    },
    setSuppliers (state, newSuppliers) {
      state.suppliers = newSuppliers.map(v => { v.menu = []; return v })
    },
    addProduct (state, product) {
      state.products.push(product)
    },
    setUser (state, user) {
      state.userData = user
      localStorage.setItem('userData', JSON.stringify(user))
    },
    removeProductFromBasket (state, productId) {
      state.basket.productsInfo = state.basket.productsInfo.filter(value => value.product.id !== productId)
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
    loadUser (context) {
      const savedUser = localStorage.getItem('userData')
      context.commit('setUser', JSON.parse(savedUser))
    },

    async signIn (context, userData) {
      const email = userData.email
      const password = userData.password

      if (email === undefined || password === undefined) {
        alert('Empty line')
        return
      }
      const response = (await axios.post(`${backendUrl}/user/signin`,
        JSON.stringify({
          email: email,
          password: password
        }))).data

      const newUser = {
        name: response.name,
        email: email,
        accessToken: response.accessToken
      }
      localStorage.setItem('refreshToken', response.refreshToken)

      context.commit('setUser', newUser)
    },
    async signUp (context, userData) {
      const name = userData.name
      const email = userData.email
      const password = userData.password

      if (name.length === 0 || email.length === 0 || password.length === 0) {
        alert('Empty line')
        return
      }

      const response = (await axios.post(
        `${backendUrl}/user/signup`,
        JSON.stringify({ name: name, email: email, password: password })
      )).data
      const newUser = {
        name: name,
        email: email,
        accessToken: response.accessToken
      }
      localStorage.setItem('refreshToken', response.refreshToken)
      context.commit('setUser', newUser)
    },
    async refresh (context) {
      context.dispatch('loadUser')
      const user = context.getters.userData
      const refreshToken = localStorage.getItem('refreshToken')
      if (user.accessToken === '') {
        return
      }
      const response = (await axios.post(`${backendUrl}/user/refresh`, JSON.stringify(
        {
          accessToken: user.accessToken,
          refreshToken: refreshToken
        }
      ))).data

      const newUser = {
        name: user.name,
        email: user.email,
        accessToken: response.accessToken
      }
      localStorage.setItem('refreshToken', response.refreshToken)
      context.commit('setUser', newUser)
    },

    async sendBasket (context) {
      let savedProducts = context.getters.basketProducts

      savedProducts = savedProducts.map(v => ({
        count: v.count,
        productId: v.product.id,
        priceOne: v.product.price
      }))

      const address = context.getters.basketAddress
      const user = context.getters.userData
      const response = (await axios.post(
        `${backendUrl}/basket/new`,
        JSON.stringify({ address: address, products: savedProducts }),
        { headers: { 'Access-Token': user.accessToken } }
      )).data

      alert(`Дякуємо за замовлення, ваш номер ${response.basketId}`)
      context.commit('clearBasket')
    }
  },
  modules: {}
})
