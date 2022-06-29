<template>
  <div style="text-align: center; color: #ccc; padding: 40px 20px; user-select: none">
    <!-- <error-page style="width: 50%; height: auto"></error-page> -->
    <!-- <p style="font-size: 13px">{{msg}}</p> -->
    <div class="Shutdown">
        <img :src="images_set" style="width: 100%;border-radius: 20px;" />

    </div>

    <div style="display: flex;justify-content: center">
      <!-- <span style="width: 50%; line-height: 30px; padding: 10px 0" @click="$router.push('/')">回到大苏打的首页</span> -->
    </div>
  </div>
</template>

<script>
// import ErrorPage from '@/assets/svg/error-page.svg'

export default {
  name: "Error",
  components: {
    // ErrorPage
  },
  data() {
     return {
        images_set:require("@/assets/images/Shutdown.png")
     }
  },
  computed: {
    msg() {
      return this.$route.query.reason || '抱歉，出错了！'
    }
  },
  methods: {}
}
</script>

<style scoped>
.Shutdown{
    /* background: url("~@/assets/images/Shutdown.png") no-repeat left top/cover;
    width: 100%;
    height: 500px; */

}

</style>
