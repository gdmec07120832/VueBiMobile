<template>
  <a-sub-menu :key="menuInfo.key" v-bind="$props" v-on="$listeners">
    <span slot="title">
      <a-icon :type="menuInfo.icon" v-if="menuInfo.icon"/>
      <span>{{menuInfo.title }}</span>
    </span>
    <template v-for="item in menuInfo.children">
      <sub-menu
          v-if="item.children && item.children.length"
          :key="item.key"
          :menu-info="item"
      />
      <a-menu-item v-else :key="item.key" :path="item.path">
        <a-icon :type="item.icon" v-if="item.icon"/>
        <span>{{ item.title }}</span>
      </a-menu-item>
    </template>
  </a-sub-menu>
</template>

<script>
import {Menu} from 'ant-design-vue'

export default {
  name: 'SubMenu',
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style scoped></style>
