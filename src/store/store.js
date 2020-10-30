import state from './state/state'
import mutations from './mutations/mutations'
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations
})