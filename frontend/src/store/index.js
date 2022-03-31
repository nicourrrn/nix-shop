import { createStore } from 'vuex'

import { userModule } from './user'
import { supplierModule } from './suppliers'

export default createStore({
  modules: {
    user: userModule,
    suppliers: supplierModule
  }
})
