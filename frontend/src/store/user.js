import axios from 'axios'
const backendUrl = 'http://localhost:8000'

export default {
  state: {
    checkedProducts: [],
    address: '',
    name: '',
    email: '',
    accessToken: ''
  },
  getters: {
    checkedProducts: (state) => state.checkedProducts,
    userData: (state) => ({
      address: state.address,
      name: state.name,
      email: state.email,
      accessToken: state.accessToken
    })
  },
  mutations: {
    clearBasket (state) {
      state.checkedProducts = []
    },
    addProductToBasket (state, saledProductInfo) {
      const productsIds = state.checkedProducts.map(value => value.product.id)
      if (!productsIds.includes(saledProductInfo.product.id)) {
        state.basket.productsInfo.push(saledProductInfo)
      }
    },
    setUser (state, user) {
      for (const [key, value] of user.entries()) {
        if (!['address', 'name', 'email', 'accessToken'].includes(key)) {
          console.log(`Error key ${key} with value ${value}`)
        } else {
          state[key] = value
        }
      }
      localStorage.setItem('userData', JSON.stringify(state.getters.userData))
    },
    removeProductFromBasket (state, productId) {
      state.checkedProducts = state.checkedProducts.filter(value => value.product.id !== productId)
    }
  },
  actions: {
    loadUser (context) {
      const savedUser = JSON.parse(localStorage.getItem('userData'))
      if (savedUser !== null) {
        context.commit('setUser', savedUser)
      }
    },
    async signIn (context, userForm) {
      const email = userForm.email
      const password = userForm.password

      if (email.length === 0 || password.length === 0) {
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
    async signUp (context, userForm) {
      const name = userForm.name
      const email = userForm.email
      const password = userForm.password

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
        console.log('access is null')
        return
      }
      const response = (await axios.post(`${backendUrl}/user/refresh`, JSON.stringify(
        {
          accessToken: user.accessToken,
          refreshToken: refreshToken
        }
      ))).data

      const newUser = {
        accessToken: response.accessToken
      }
      localStorage.setItem('refreshToken', response.refreshToken)
      context.commit('setUser', newUser)
    },
    async sendBasket (context) {
      let savedProducts = context.getters.checkedProducts

      savedProducts = savedProducts.map(v => ({
        count: v.count,
        productId: v.product.id,
        priceOne: v.product.price
      }))

      const user = context.getters.userData
      const response = (await axios.post(
        `${backendUrl}/basket/new`,
        JSON.stringify({ address: user.address, products: savedProducts }),
        { headers: { 'Access-Token': user.accessToken } }
      )).data

      alert(`Дякуємо за замовлення, ваш номер ${response.basketId}`)
      context.commit('clearBasket')
    },
    async logOut (state) {
      localStorage.removeItem('userData')
      localStorage.removeItem('refreshToken')
      const token = state.getters.userData.accessToken
      if (token === '') {
        return
      }
      axios
        .get(`${backendUrl}/user/logout`, { headers: { 'Access-Token': token } })
        .catch(err => console.log(err))
    }
  }
}
