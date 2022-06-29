<template>
  <LocaleProvider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </LocaleProvider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import {LocaleProvider} from 'ant-design-vue'
export default {
  name: 'App',
  components: {LocaleProvider},
  data() {
    return {
      locale: zhCN
    }
  }
}
</script>

<style>
body {
  overflow-x: auto;
  min-width: 1366px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
