import axios from 'axios'
const backendUrl = 'http://localhost:8000'

export default {
  state: {
    checkedProducts: [],
    address: '',
    name: '',
    phone: '',
    accessToken: ''
  },
  getters: {
    checkedProducts: (state) => state.checkedProducts,
    userData: (state) => ({
      address: state.address,
      name: state.name,
      phone: state.phone,
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
        state.checkedProducts.push(saledProductInfo)
      }
    },
    removeProductFromBasket (state, productId) {
      state.checkedProducts = state.checkedProducts.filter(value => value.product.id !== productId)
    },
    setUser (state, user) {
      for (const [key, value] of Object.entries(user)) {
        if (!['address', 'name', 'phone', 'accessToken'].includes(key)) {
          console.log(`Error key ${key} with value ${value}`)
        } else {
          console.log(key)
          state[key] = value
        }
      }
      localStorage.setItem('userData', JSON.stringify({
        address: state.address,
        name: state.name,
        phone: state.phone,
        accessToken: state.accessToken
      }))
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
      const phone = userForm.phone
      const password = userForm.password

      if (phone.length === 0 || password.length === 0) {
        alert('Empty line')
        return
      }
      let response
      try {
        response = (await axios.post(`${backendUrl}/user/signin`,
          JSON.stringify({
            phone: phone,
            password: password
          }))).data
      } catch (e) {
        alert(e)
        return
      }

      const newUser = {
        name: response.name,
        phone: phone,
        accessToken: response.accessToken
      }
      localStorage.setItem('refreshToken', response.refreshToken)
      context.commit('setUser', newUser)
    },
    async signUp (context, userForm) {
      const name = userForm.name
      const phone = userForm.phone
      const password = userForm.password

      if (name.length === 0 || phone.length === 0 || password.length === 0) {
        alert('Empty line')
        return
      }
      let response
      try {
        response = (await axios.post(
          `${backendUrl}/user/signup`,
          JSON.stringify({ name: name, phone: phone, password: password })
        )).data
      } catch (e) {
        alert(e)
        return
      }
      const newUser = {
        name: name,
        phone: phone,
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
      let response
      try {
        response = (await axios.post(`${backendUrl}/user/refresh`, JSON.stringify(
          {
            accessToken: user.accessToken,
            refreshToken: refreshToken
          }
        ))).data
      } catch (e) {
        alert(e)
        return
      }

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
      let response
      try {
        response = (await axios.post(
          `${backendUrl}/basket/new`,
          JSON.stringify({
            address: user.address,
            products: savedProducts
          }),
          { headers: { 'Access-Token': user.accessToken } }
        )).data
      } catch (e) {
        alert(e)
        return
      }

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
        .catch(err => alert(err))
      state.commit('clearBasket')
      state.commit('setUser', { address: '', name: '', phone: '', accessToken: '' })
    }
  }
}
