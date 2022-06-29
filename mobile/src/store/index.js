import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import user from "@/store/user";
import app from '@/store/app'

const store =  new Vuex.Store({
  modules: {
    user,
    app
  }
})


export default store
