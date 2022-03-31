import { createStore } from 'vuex'

import user from './user'
import suppliers from './suppliers'

export default createStore({
  modules: {
    user,
    suppliers
  }
})
