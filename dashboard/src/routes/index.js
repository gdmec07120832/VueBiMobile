import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
import Layout from '@/components/Layout'
import { getLoginUser, changeUserInfoResolved } from '@/routes/helper'
// eslint-disable-next-line no-unused-vars
import SqlConfig from '@/views/sql-config/sql-config-index/index'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/index',
      component: Layout,
      children: [
        {
          path: 'index',
          name: 'index',
          component: {
            render () {
              return <span>数据灯塔移动端管理配置后台</span>
            }
          },
          meta: {
            title: '首页',
            fixedTab: true
          }
        },
        {
          path: '/auth/role_manage',
          name: '/auth/role_manage',
          component: () => import('@/views/auth/role-manage/index'),
          meta: {
            title: '角色管理'
          }
        },
        {
          path: '/auth/user_manage',
          name: '/auth/user_manage',
          component: () => import('@/views/auth/user-manage/index'),
          meta: {
            title: '用户管理'
          }
        },
        {
          path: '/auth/auth_configuration',
          name: '/auth/auth_configuration',
          component: () => import('@/views/auth/auth-configuration/index'),
          meta: {
            title: '权限设置'
          }
        },
        {
          name: '/sql_config/index',
          path: '/sql_config/index',
          component: () => import('@/views/sql-config/sql-config-index/index'),
          meta: {
            title: '移动灯塔'
          }
        },
        {
          name: '/sql_config2/index',
          path: '/sql_config2/index',
          component: () => import('@/views/sql-config/sql-config2/SqlConfig2'),
          meta: {
            title: '数据灯塔'
          }
        },
        {
          name: '/sql_config3/index',
          path: '/sql_config3/index',
          component: {
            name: 'sql_config3',
            render () {
              return <SqlConfig/>
            }
          },
          meta: {
            title: '大屏'
          }
        },
        {
          name: '/sql_config4/index',
          path: '/sql_config4/index',
          component: {
            name: 'sql_config4',
            render () {
              return <SqlConfig/>
            }
          },
          meta: {
            title: '业务系统'
          }
        },
        {
          name: '/sql_config5/index',
          path: '/sql_config5/index',
          component: {
            name: 'sql_config5',
            render () {
              return <SqlConfig/>
            }
          },
          meta: {
            title: '数讯传送'
          }
        },
        {
          name: '/push_config/index',
          path: '/push_config/index',
          component: () => import('../views/PushConfig/PushConfigList'),
          meta: {
            title: '数讯传送配置'
          }
        },
        {
          name: '/dict_config/index',
          path: '/dict_config/index',
          component: () => import('../views/DictConfig/DictConfigList'),
          meta: {
            title: '字典配置'
          }
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/components/Login')
    },
    {
      name: '404',
      path: '/404',
      component: {
        render () {
          return (
            <div style="text-align: center; padding:50px">
              这里什么都没有 <br/>
              <router-link to={'/'}>回到首页</router-link>
            </div>
          )
        }
      }
    },
    {
      name: 'fallback',
      path: '*',
      redirect: '/404'
    }
  ]
})

const cacheRoute = (to, next) => {
  const title = to?.meta?.title
  document.title = title || '数据灯塔移动端管理配置后台'
  const cachedRoutes = store.state.app.cachedRoutes
  if (!cachedRoutes.find(item => item.path === to.path) && to.path !== '/login' && to.path !== '/404') {
    store.commit('app/addCachedRoute', to)
  }
  next()
  store.commit('app/setCurrentPath', to.path)
}

router.beforeEach((to, form, next) => {
  if (to.path !== '/404' && to.path !== '/login') {
    getLoginUser().then(() => {
      cacheRoute(to, next)
    }).catch(() => {
      next({
        path: '/login',
        query: {
          redirect: to.path
        }
      })
    })
  } else {
    if (to.path === '/login') {
      changeUserInfoResolved(false)
    }
    next()
  }
  cacheRoute(to, next)
})

export default router
