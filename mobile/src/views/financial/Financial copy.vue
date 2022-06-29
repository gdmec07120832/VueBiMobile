<template>
  <div >


    <!-- 测试的开始 style="height:1000px;"-->
    <!-- <div class="scrollTop">
      <div class="backTop"
           @click="backTop">
        <p v-show="flag_scroll">
                   返回顶部
        </p>
      </div>
   
      <div></div>
    </div> -->
    <!-- 测试的结束 -->





    <div style="background-color: #ffffff;" :style="{'height':(windowHeight_set)+'px'}">
      <!-- <div style="text-align: center">style="min-height: 100vh"
        <in-progress style="width: 100px; height: 100px" />
        <div style="color: #ccc">开发中</div>
      </div> -->

      <div style="padding-top: 50%">
        <img
          :src="images_set.images_set_bg"
          style="width: 50%; margin: 0 auto; display: block"
        />
      </div>
      <div style="margin-top: 80px">
        <p style="text-align: center; padding: 0px; margin: 0px; color: #5e5e5e">
          披星戴月开发中
        </p>
      </div>


      <!--  v-on:leave="leave"-->
      <!-- <div id = "databinding">
        <button v-on:click = "show = !show">点我</button>
        <transition
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-bind:css="false"
          >
            <p v-if="show" style="margin: 0px;">菜鸟教程 -- 学的不仅是</p>
        </transition>
      </div> -->


      <!-- <div>
        <div style="height: 35px;width:300px;background:orangered;border-radius: 4px;" id="animat"></div>
      </div> -->



          
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

      show: false,
      windowHeight_set:0,



      flag_scroll: false,
      scroll: 0,

    };
  },

  created(){

    this.windowHeight_set=document.documentElement.clientHeight || document.body.clientHeight

  },

  destroyed() {
    // window.removeEventListener('scroll', this.handleScroll, true) //移除监听事件
  },


  mounted() {

    // window.addEventListener('scroll', this.handleScroll, true);



    let _this=this;
    setTimeout(function name() {
      _this.$EventBus.$emit("data_loay_set", {
        data_loay_seton: true,
      });  
    }, 500);

    this.show=true;


  },


  methods: {

    //返回顶部事件
    backTop() {
      //回到顶部方法 点击按钮调用
      // let top = document.getElementsByClassName('scrollTop')[0].scrollTop
      let top= document.documentElement.scrollTop || document.body.scrollTop;

      console.log("运行到这里");
      console.log(document.documentElement.scrollTop);
      console.log(document.body.scrollTop);


      // 实现滚动效果，缓慢回到顶部
      const timeTop = setInterval(() => {
        // document.getElementsByClassName(
        //   'scrollTop'
        // )[0].scrollTop = top -= 50
        (document.documentElement.scrollTop)=0

        clearInterval(timeTop) //清除定时器

        if (top <= 0) {
          clearInterval(timeTop) //清除定时器
        }
      }, 20)
    },
   //滑动超过200时显示按钮
    handleScroll() {
      // let scrollTop = document.getElementsByClassName('scrollTop')[0].scrollTop;

      let scrollTop= document.documentElement.scrollTop || document.body.scrollTop;


        // console.log(scrollTop_test);
        console.log(scrollTop)

      if (scrollTop > 200) {
        this.flag_scroll = true
      } else {
        this.flag_scroll = false
      }
    },





    beforeEnter: function (el) {
      el.style.opacity = 0
      el.style.transformOrigin = 'left'
    },
    enter: function (el, done) {
 
      this.$velocity(el, { opacity: 1, fontSize: '12px' }, { duration: 600,easing: "swing", })
      this.$velocity(el, { fontSize: '26px' }, { complete: done })

      // this.$velocity(el, { opacity: 1, 'margin-left': '100px' }, { duration: 300 })
      // this.$velocity(el, { opacity: 1, 'margin-left': '60px' }, { loop: 2 })
      // this.$velocity(el, { 'margin-left': '80px' }, { complete: done })
    },


  }






};
</script>




<style scoped>

  #animat{
      position:relative;
      animation:mymove 5s infinite;
      -webkit-animation:mymove 5s infinite; /*Safari and Chrome*/
      animation-direction:alternate;/*轮流反向播放动画。*/
      animation-timing-function: ease-in-out; /*动画的速度曲线*/
      /* Safari 和 Chrome */
      -webkit-animation:mymove 5s infinite;
      -webkit-animation-direction:alternate;/*轮流反向播放动画。*/
      -webkit-animation-timing-function: ease-in-out; /*动画的速度曲线*/
  }
  @keyframes mymove
  {
      0%{
      transform: scale(1);  /*开始为原始大小*/
      }
      25%{
          transform: scale(1.1); /*放大1.1倍*/
      }
      50%{
          transform: scale(1);
      }
      75%{
          transform: scale(1.1);
      }
  }

  @-webkit-keyframes mymove /*Safari and Chrome*/
  {
      0%{
      transform: scale(1);  /*开始为原始大小*/
      }
      25%{
          transform: scale(1.1); /*放大1.1倍*/
      }
      50%{
          transform: scale(1);
      }
      75%{
          transform: scale(1.1);
      }
  }
















  .scrollTop{
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
}
.backTop {
  position: fixed;
  bottom: 250px;
  z-index: 100;
  right: 20;
  background: white;
}

</style>
