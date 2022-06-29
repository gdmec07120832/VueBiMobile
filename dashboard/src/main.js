import Vue from 'vue'
import App from './App.vue'
import router from "@/routes";
import store from '@/store/index'
import '@/components/antd/lazy_antd'

import '@/assets/index.styl'
import instance from "@/utils/axios";

Vue.prototype.$axios = instance

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
