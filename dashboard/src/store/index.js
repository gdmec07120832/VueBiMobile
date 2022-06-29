import Vue from 'vue'
import Vuex from 'vuex'


import user from './user'
import app from './app'

Vue.use(Vuex)

const store =  new Vuex.Store({
  modules: {
    user,
    app
  }
})

export default store

const initialStateCopy = JSON.parse(JSON.stringify(store.state))

export function resetState () {
  store.replaceState(JSON.parse(JSON.stringify(initialStateCopy)))
}
