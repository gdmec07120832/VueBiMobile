<template>
  <div class="flex">
    <a-input v-model="rawKeyword" @keyup.enter.native="handleSearch" allow-clear
             placeholder="输入关键字查找"/>
    <a-button class="ml5" @click="handleSearch">查找</a-button>
  </div>
</template>

<script>
export default {
  name: 'searchInput',
  data () {
    return {
      rawKeyword: ''
    }
  },
  methods: {
    handleSearch() {
      this.$emit('search', this.rawKeyword)
    }
  }
}
</script>

<style scoped>

</style>
