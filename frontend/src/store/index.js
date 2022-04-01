import { createStore } from 'vuex'

import user from './user'
import suppliers from './suppliers'

export default createStore({
  getters: {
    backendUrl: () => 'http://localhost:8000'
  },
  modules: {
    user,
    suppliers
  }
})
