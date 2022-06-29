<template>
  <div style="min-height: 100vh">
      
    <!-- <div class="bg_css" :style="{ width: bgwidth_css.width + 'px' }"></div>
    <div class="bg_css_con" :style="{ width: bgwidth_css.width + 'px' }"></div> -->

    <div>
      <div style="height:470px;"><img :src="images_set.images_set_bg" :onload="welcome_img_fun()" id="images" ref="welcome_img" style="display: block;" /></div>
      <div  :style="isIPhoneX()? {'margin-top': '50px'}:{'margin-top': '10px'}"><img :src="images_set.images_set_con" style="width: 40%;margin: 0 auto;display: block;" /></div>
      <div style="margin-top: 20px;" :style="xian_yin_css? {'display': 'block'}:{'display': 'none'}"><p style="text-align: center;padding: 0px;margin: 0px;color: #5E5E5E;">欢迎进入林氏的数字世界</p></div>
    </div>

  </div>
</template>

<script>
// import InProgress from "@/assets/svg/in-progress.svg";
export default {
  name: "welcome",
  //   components: { InProgress },

  data() {
    return {

      sessionStorage_set: "",
      bgwidth_css: {
        width: "",
      },
      images_set: {
          images_set_bg:require("@/assets/images/welcome/welcome_bg.png"),
          images_set_con:require("@/assets/images/welcome/welcome_wz.png")
      },
      xian_yin_css:false,
       
    };
  },

  beforeMount() {
    console.log("=========baidu!!!========");
    if (sessionStorage.getItem("welcome") == null) {
      this.sessionStorage_set = "1";
    } else {
      this.sessionStorage_set = "2";
    }
  },

  mounted() {

    this.bgwidth_css.width = window.innerWidth;



    if (this.sessionStorage_set == "1") {
      console.log("欢迎！！");
      sessionStorage.setItem("welcome", "1"); //添加
      this.welcome_fun();
    } else if (this.sessionStorage_set == "2") {
      console.log("意见访问过了！！");
      this.$router.push({
        path: "/entry",
      });
    }

  },
  methods: {

    welcome_img_fun(){
      let _this=this;
      
      console.log(this.$refs["welcome_img"]);
      
      let images_info= document.createElement("img");

      console.log(images_info.height);



      setTimeout(function name() {
        _this.xian_yin_css=true;
      },100);


    },

    welcome_fun() {
      let _this = this;
      setTimeout(function name() {
        _this.$router.push({
          path: "/entry",
        });
      }, 1500);
    },


    // 判断是否iphonex开始
    isIPhoneX(){
        var u = navigator.userAgent;
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        var model_wh=[{height:812,width:375},{height:896,width:414}];
        if (isIOS) {        
            if ((screen.height == model_wh[0].height && screen.width == model_wh[0].width)||(screen.height == model_wh[1].height && screen.width == model_wh[1].width)){
                //是iphoneX
                console.log("是iphoneX");
                return true;
            }else{
                //不是iphoneX
                console.log("否");
                return false;
            } 
        }

    }
    // 判断是否iphonex结束



  },
};
</script>

<style lang="scss" scoped>
.bg_css {
  background: url("~@/assets/images/welcome/welcome_bg.png") no-repeat left
    top/cover;

  background-size: 100% auto;

  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  //   width: 100%;
  //   height: 100%;
}

.bg_css_con {
  background: url("~@/assets/images/welcome/welcome_wz.png") no-repeat left
    top/cover;

  background-size: 50% auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
}
</style>
