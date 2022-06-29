<template>
  <a-menu
    theme="dark"
    mode="inline"
    :default-open-keys="menuShowKeys.openedKeys"
    :selected-keys.sync="menuShowKeys.selectedKeys"
    @click="handleMenuClick"
  >
    <template v-for="item in menus">
      <sub-menu
        v-if="item.children && item.children.length"
        :key="item.key"
        :menu-info="item"
      />
      <a-menu-item v-else :key="item.key" :path="item.path">
        <a-icon :type="item.icon" v-if="item.icon" />
        <span>{{ item.title }}</span>
      </a-menu-item>
    </template>
  </a-menu>
</template>

<script>
import SubMenu from './SubMenu'
import menus from './mockMenu'

const createMenuMap = menu => {
  let map = {}
  const tree = (m, parentKeys = []) => {
    m.forEach(item => {
      map[item.key] = {
        ...item,
        parentKeys
      }
      if (item.children) {
        tree(item.children, [...parentKeys, item.key])
      }
    })
    return map
  }

  return tree(menu)
}

const menuMap = createMenuMap(menus)
console.log(menuMap)

export default {
  name: 'AsideMenu',
  components: { SubMenu },
  data: () => ({
    menus,
  }),
  watch: {
    'menuShowKeys'() {
    }
  },
  computed: {
    menuShowKeys() {
      let ret = {
        openedKeys: [],
        selectedKeys: []
      }
      for(let key of Object.keys(menuMap)) {
        if(menuMap[key].path === this.$route.path) {
          ret.selectedKeys = [key]
          ret.openedKeys = menuMap[key].parentKeys
          break
        }
      }
      return ret
    }
  },
  methods: {
    handleMenuClick({ key }) {
      let item = menuMap[key]
      if (item && item.path && item.path !== this.$route.path) {
        this.$router.push(item.path)
      }
    },
  },
}
</script>

<style scoped></style>
