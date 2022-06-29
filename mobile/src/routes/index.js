import Vue from 'vue'
import VueRouter from 'vue-router'
import {getLoginUser} from '@/routes/helpers'
import store from '@/store'
import Layout from '@/components/Layout.vue'
import Entry from '@/views/entry/Entry'
import GuideSlides from '../components/GuideSlides/GuideSlides';

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  // eslint-disable-next-line no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    console.log(scrollTop, store.state.app.navbarTopOffset)
    if (scrollTop > store.state.app.navbarTopOffset) {
      return {x: 0, y: store.state.app.navbarTopOffset}
    } else {
      return false
    }
  },
  routes: [
    {
      name: 'guide-slides',
      path: '/guide-slides',
      component: GuideSlides,
    },
    {
      path: '/',
      redirect: '/entry',
      component: Layout,
      children: [
        {
          name: 'entry',
          path: 'entry',
          component: Entry,
        },
        {
          name: 'product-supply',
          path: '/product-supply',
          component: () => import('@/views/product-supply/ProductSupply')
        },
        {
          name: 'financial',
          path: '/financial',
          component: () => import('@/views/financial/Financial')
        },
        {
          name: 'logistics',
          path: '/logistics',
          component: () => import('@/views/logistics/Logistics')
        },
        {
          name: 'market-operation',
          path: '/market-operation',
          component: () => import('@/views/market-operation/MarketOperation')
        },
        {
          name: 'sales-channel',
          path: '/sales-channel',
          component: () => import('@/views/sales-channel/SalesChannel')
        },
        {
          name: 'product-market',
          path: '/product-market',
          component: () => import('@/views/product-market/ProductMarket')
        },
        // {
        //   name: 'welcome',
        //   path: '/welcome',
        //   component: () => import('@/views/welcome/welcome')
        // }
      ]
    },
    {
      name: '/data-report-ding',
      path: '/data-report-ding',
      component: {
        render() {
          return <router-view/>
        }
      },
      children: [
        {
          name: 'distributionReport',
          path: 'distributionReport',
          component: () => import('@/views/data-report-ding/distributionReport'),
          meta: {
            title: '经销报表'
          }
        },
        {
          name: 'newPdReport',
          path: 'newPdReport',
          component: () => import('@/views/data-report-ding/newPdReport'),
          meta: {
            title: '纯新面市周报'
          }
        },
        {
          name: 'newProductsReport',
          path: 'newProductsReport',
          component: () => import('@/views/data-report-ding/newProductsReport'),
          meta: {
            title: '纯新面市周报'
          }
        },
        {
          name: 'performancePkReport',
          path: 'performancePkReport',
          component: () => import('@/views/data-report-ding/performancePkReport'),
          meta: {
            title: '双11区域PK'
          }
        },
        {
          name: 'oldPdReport',
          path: 'oldPdReport',
          component: () => import('@/views/data-report-ding/oldPdReport'),
          meta: {
            title: '旧品升级周报'
          }
        },
        {
          name: 'oldProductsReport',
          path: 'oldProductsReport',
          component: () => import('@/views/data-report-ding/oldProductsReport'),
          meta: {
            title: '旧品升级面市周报'
          }
        },
        {
          name: 'deliveryReport',
          path: 'deliveryReport',
          component: () => import('@/views/data-report-ding/deliveryReport'),
          meta: {
            title: '全中发货日报'
          }
        },

        // {
        //   name: 'deliveryReport_test',
        //   path: 'deliveryReport_test',
        //   component: () => import('@/views/data-report-ding/deliveryReport_test'),
        //   meta: {
        //     title: '全中发货日报_test'
        //   }
        // },

        {
          name: 'deliveryReport2',
          path: 'deliveryReport2',
          component: () => import('@/views/data-report-ding/deliveryReport2'),
          meta: {
            title: '全中发货日报'
          }
        },
        {
          name: 'moneyTable',
          path: 'moneyTable',
          component: () => import('@/views/data-report-ding/moneyTable'),
          meta: {
            title: 'B项目报表'
          }
        },
        {
          name: 'BStorePush',
          path: 'BStorePush',
          component: () => import('@/views/data-report-ding/BStorePush'),
          meta: {
            title: 'B店推送报表(日报)'
          }
        },
        {
          name: 'BStorePushWeek',
          path: 'BStorePushWeek',
          component: () => import('@/views/data-report-ding/BStorePushWeek'),
          meta: {
            title: 'B店推送报表(周报)'
          }
        },
        {
          name: 'NewRetailReport',
          path: 'NewRetailReport',
          component: () => import('@/views/data-report-ding/NewRetailReport'),
          meta: {
            title: '新零售运营日报'
          }
        },
        {
          name: 'OnlineKStoreODaily',
          path: 'OnlineKStoreODaily',
          component: () => import('@/views/data-report-ding/OnlineKStoreODaily/OnlineKStoreODaily'),
          meta: {
            title: '线上重点店铺运营日报'
          }
        }

      ]
    },
    {
      path: '/error',
      component: () => import('@/components/Error')
    },
    {
      path: '/shutdown',
      component: () => import('@/components/Shutdown')
    },
    {
      path: '/welcome',
      component: () => import('@/views/welcome/welcome')
    }

  ]
})

// console.log(getLoginUser);


router.beforeEach((to, from, next) => {
  document.title = to.meta?.title || '数据灯塔'


  // let shutdown=1;
  // if(shutdown==1){
  //   if((to.path !== '/shutdown')){
  //     next({
  //       path: '/shutdown',
  //     })
  //   }else{
  //     next()
  //   }
  // }else{  }

  if ((to.path !== '/error') && !to.path.startsWith('/data-report-ding/')) {
    // router.replace('/shutdown')
    getLoginUser().then(() => {
      console.log('user info resolved', Date.now())
      next()
    }).catch((err) => {
      console.log(err)
      let reason = '出错啦'
      let pd_err = err.toString();
      // console.log(pd_err.replace(/[^0-9]/ig,''))
      if (pd_err.replace(/[^0-9]/ig, '') == '500' || pd_err.replace(/[^0-9]/ig, '') == '502') {
        reason = '服务不可用'
      } else {
        if (err?.msg) {
          reason = err.msg
          // console.log();
        }
      }

      next({
        path: '/error',
        query: {
          reason
        }
      })
    })
  } else {
    // document.title = to.meta?.title || '数据灯塔'
    next()
  }


})

export default router
