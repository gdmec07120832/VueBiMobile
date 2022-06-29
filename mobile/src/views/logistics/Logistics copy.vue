<template>
  <div>
    <div style="background-color: #ffffff;" :style="{'height':(windowHeight_set)+'px'}">
      <!-- <div style="text-align: center">style="min-height: 100vh"
        <in-progress style="width: 100px; height: 100px" />
        <div style="color: #ccc">开发中</div>
      </div> -->

      <div style="padding-top: 50%;">
        <img :src="images_set.images_set_bg"  style="width: 50%;margin: 0 auto;display: block;"/>
      </div>
      <div style="margin-top: 80px;"><p style="text-align: center;padding: 0px;margin: 0px;color: #5E5E5E;">披星戴月开发中</p></div>
    </div>
  </div>

</template>

<script>
// import InProgress from '@/assets/svg/in-progress.svg'
export default {
  name: "Financial",
  // components: {InProgress}

  data() {
    return {
      images_set: {
        images_set_bg: require("@/assets/images/developing.png"),
        // images_set_con: require("@/assets/images/welcome/welcome_wz.png"),
      },
      windowHeight_set:0,
    };
  },

  created(){

    this.windowHeight_set=document.documentElement.clientHeight || document.body.clientHeight

  },

  mounted() {
    let _this=this;
    setTimeout(function name() {
      _this.$EventBus.$emit("data_loay_set", {
        data_loay_seton: true,
      });  
    }, 500);
  }
};
</script>

<style scoped>
</style>
