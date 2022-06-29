<template>
  <a-layout id="components-layout-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" @click="$router.push('/')">{{ collapsed ? 'LINSY' : 'LINSY BI' }}</div>
      <aside-menu/>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="layout-header">
        <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsed = !collapsed"
        />
        <div class="user-area">
          <span>你好,{{ userInfo.nickName }}</span>
          <a-dropdown :trigger="['click']">
            <a-icon type="user" class="user-icon"></a-icon>
            <a-menu slot="overlay" style="width: 100px">
              <a-menu-item key="1">
                <a @click="changePass">修改密码</a>
              </a-menu-item>
              <a-menu-item key="1">
                <a @click="logout">退出</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content :style="{ margin: '10px 16px', background: '#fff' }">
        <div class="route-tabs">
          <a-tabs v-model="currentPath" hide-add type="editable-card" @tabClick="tabClick" @edit="onEdit">
            <a-tab-pane v-for="item in cachedRoutes" :key="item.path" :closable="!(item.meta && item.meta.fixedTab)"
                        :tab="item.meta.title"/>
          </a-tabs>
        </div>
        <div style="padding: 15px;height: calc(100vh - 124px)">
          <keep-alive>
            <router-view/>
          </keep-alive>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import {createDialog} from "@/utils/helpers";
import ChangePassword from "@/components/ChangePassword";
import {mapState} from 'vuex';
import {resetState} from "@/store";
import AsideMenu from '@/components/AsideMenu/AsideMenu'

const ChangePassService = createDialog(ChangePassword)

export default {
  components: {AsideMenu},
  data() {
    return {
      collapsed: false,
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user?.userInfo,
      cachedRoutes: state => state?.app?.cachedRoutes || []
    }),
    currentPath: {
      get() {
        return this.$store.state.app.currentPath
      },
      set(value) {
        this.$store.commit('app/setCurrentPath', value)
      }
    }
  },
  created() {
  },
  methods: {
    tabClick(key) {
      if (this.$route.path !== key) {
        this.$router.push(key)
      }

    },
    onEdit(targetKey) {
      // action === remove
      let activeKey = this.currentPath
      let lastIndex;
      this.cachedRoutes.forEach((route, i) => {
        if (route.path === targetKey) {
          lastIndex = i - 1;
        }
      });
      const routes = this.cachedRoutes.filter(route => route.path !== targetKey);
      if (routes.length && activeKey === targetKey) {
        if (lastIndex >= 0) {
          activeKey = routes[lastIndex].path;
        } else {
          activeKey = routes[0].path;
        }
      }
      if(!routes.length) {
        activeKey = '/index'
      }
      this.$store.commit('app/removeCachedRoute', {path: targetKey})
      this.$store.commit('app/setCurrentPath', activeKey)
      if(activeKey && activeKey !== this.$route.path) {
        this.$router.push(activeKey)
      }
    },
    logout() {
      this.$axios.get('/pc/logout').then(() => {
        this.$message.success('退出成功')
        this.$router.push('/login')
        resetState()
      })
    },
    changePass() {
      ChangePassService.create.call(this)
    }
  }
}
</script>
<style scoped lang="stylus">
#components-layout-custom-trigger {
  height 100vh

  .layout-header {
    background-color #fff
    display flex
    justify-content space-between
    align-items center
    padding 0
  }

  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #1890ff;
    }
  }

  .logo {
    font-size 18px
    line-height 32px
    font-weight bold
    text-align center
    color #1890ff
    height: 32px;
    cursor pointer;
    margin: 16px;
  }

  .user-area {
    display flex
    align-items center

    .user-icon {
      font-size: 18px;
      padding: 0 24px 0 10px;
      cursor: pointer;

      &:hover {
        color: #1890ff;
      }
    }
  }
}

.route-tabs {
  background: #f0f2f5;
  user-select none

  /deep/ .ant-tabs-bar {
    margin-bottom 0
  }
  /deep/ .ant-tabs-tab {
    &:active {
      transform scale(0.9)
      transform-origin bottom center
    }
  }
}
</style>
