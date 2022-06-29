import Vue from 'vue'
import App from './App.vue'
import router from '@/routes/index'
import store from "@/store";
import instance from "@/utils/axios";
import { Skeleton, Notify } from 'vant';
import '@/assets/styles/index.styl'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

//自己加的dd开始
// import * as dd from 'dingtalk-jsapi'; // 此方式为整体加载，也可按需进行加载
// Vue.prototype.$dd = dd;
//自己加的dd结束

// 添加Velocity开始
import Velocity from 'velocity-animate'
Vue.prototype.$velocity = Velocity;
// 添加Velocity结束



Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.use(Skeleton)
Vue.use(Notify)


Vue.config.productionTip = false
Vue.prototype.$axios = instance
Vue.prototype.$EventBus = new Vue()
Vue.prototype.$message = {
  error: function (message) {
    Notify({
      type: 'danger',
      message: message
    })
  }
}



// 测试捕获异常开始
//系统错误捕获
const errorHandler = (error, vm,Infoset)=>{
  if(vm.$route.path.startsWith('/data-report-ding')) {
    return
  }
  // console.log('抛出全局异常');
  console.log(vm);
  console.error(error);
  console.error(Infoset);
  instance.get('/api/admin/common/log/save',{params:{qualifiedName:'移动数据灯塔',description:'移动数据灯塔日志：异常输出'+error,logLevel:'Info',logType:'Web'}})
  .then(({success})=>{
    // console.log("===========这里是测试日志的=======================");
    console.log(success+'信息已记录！');
  });
}
Vue.config.errorHandler = errorHandler;
Vue.prototype.$throw = (error)=> errorHandler(error,this);

// 测试捕获异常结束



// Vue.prototype.$test_value=11
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
