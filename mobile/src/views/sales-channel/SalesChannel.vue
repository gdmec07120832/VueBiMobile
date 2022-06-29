<template>

  <div style="background: rgb(245, 245, 245);">
    <div ref="container_sales" class="SalesChannel_all" :style="{backgroundImage:`url(${orgBackground})`}">

      <!-- 开头开始 -->

      <!-- <van-sticky :container="container_set" :offset-top="60">
      </van-sticky> -->
      
        <div style="background-color: #ffffff;border-bottom: 1px solid #EEEEEE;display: none;">


          <!-- 二级目录开始 -->
          <section
            class="px10 py10 nav-wrapper"
            style="padding-top: 5px; padding-bottom: 13px"
            :style="show == true ? nvl_css.nvl_cssn : nvl_css.nvl_cssb"
          >
            <div class="Productmarket_title" style="">
              <van-row type="flex" justify="center">
                <van-col span="7" @click="Range_Single_choice('cpcy','_this.sel_value.Range_on',true,'_this.sel_value.theme','1')">
                
                  <div
                    class="select_title_css"
                    :class="{ active: sel_value.theme.cpcy === true }"
                  >
                    实时业绩
                  </div>
                </van-col>
                <van-col span="7" @click="Range_Single_choice('ouk','_this.sel_value.Range_on',true,'_this.sel_value.theme','2')">
                  <div
                    class="select_title_css"
                    :class="{ active: sel_value.theme.ouk === true }"
                  >
                    业绩达成
                  </div>
                </van-col>
                <van-col span="7" @click="Range_Single_choice('muying','_this.sel_value.Range_on',true,'_this.sel_value.theme','3')"
                  ><div
                    class="select_title_css"
                    :class="{ active: sel_value.theme.muying === true }"
                  >
                    订单状态
                  </div></van-col
                >
              </van-row>
            </div>
          </section>
          <!-- 二级目录结束 -->
        </div>



      <!-- <section
        class="px10 py10 nav-wrapper"
        :style="show == true ? nvl_css.nvl_cssn : nvl_css.nvl_cssb"
      >
        <div class="SalesChannel_title" style="">
          <van-row type="flex" justify="center">
            <van-col
              span="7"
              @click="
                Range_Single_choice(
                  'cpcy',
                  '_this.sel_value.Range_on',
                  true,
                  '_this.sel_value.theme',
                  '1'
                )
              "
              ><van-button
                round
                :type="
                  sel_value.theme.cpcy ? click_css_set.type : click_css_no.type
                "
                :color="
                  sel_value.theme.cpcy ? click_css_set.color : click_css_no.color
                "
                style="margin: 0 auto; display: block"
                >实时业绩</van-button
              ></van-col
            >
            <van-col
              span="7"
              @click="
                Range_Single_choice(
                  'ouk',
                  '_this.sel_value.Range_on',
                  true,
                  '_this.sel_value.theme',
                  '2'
                )
              "
              ><van-button
                round
                :type="
                  sel_value.theme.ouk ? click_css_set.type : click_css_no.type
                "
                class="but_no_select"
                :color="
                  sel_value.theme.ouk ? click_css_set.color : click_css_no.color
                "
                style="margin: 0 auto; display: block"
                >业绩达成</van-button
              ></van-col
            >
            <van-col
              span="7"
              @click="
                Range_Single_choice(
                  'muying',
                  '_this.sel_value.Range_on',
                  true,
                  '_this.sel_value.theme',
                  '3'
                )
              "
              ><van-button
                round
                :type="
                  sel_value.theme.muying ? click_css_set.type : click_css_no.type
                "
                class="but_no_select"
                :color="
                  sel_value.theme.muying
                    ? click_css_set.color
                    : click_css_no.color
                "
                style="margin: 0 auto; display: block"
                >订单状态</van-button
              ></van-col
            >
          </van-row>
        </div>
      </section> -->

      <!-- 原来的结束 -->



      <!-- 滑屏开始 :style="swiperOptions.noSwiping==false ?swiping_css:swiping_css_no"  v-if="swiper_show==false"-->
      <div>
        <swiper
          :style="swiping_css_all"
          ref="mySwiper_sal"
          :options="swiperOptions"
        >

          <!-- <template v-for="value in [1,2,3]">
            <swiper-slide :key="value" class="">
              <Salechanset></Salechanset>
            </swiper-slide>
          </template> -->

          <!-- 优化后开始 -->
          <template>
            <swiper-slide>
              <keep-alive >
                <Salechanset2 v-if="sel_value.swiper_num==1"></Salechanset2> <div style="padding: 20px 0" v-else><van-skeleton title :row="10"  /></div>  
              </keep-alive>
            </swiper-slide>

            <swiper-slide>
              <keep-alive >
                <Salechanset v-if="sel_value.swiper_num==2"></Salechanset> <div style="padding: 20px 0" v-else><van-skeleton title :row="10"  /></div>  
              </keep-alive>
            </swiper-slide>

            <swiper-slide>
              <keep-alive >
                <Salechanset3 v-if="sel_value.swiper_num==3"></Salechanset3> <div style="padding: 20px 0" v-else><van-skeleton title :row="10"  /></div>  
              </keep-alive>
            </swiper-slide>
          </template>
          <!-- 优化后结束 -->


          


          <!-- <swiper-slide> asdadasd </swiper-slide> -->
        </swiper>
      </div>
      <!-- 滑屏结束 -->

      <div v-if="iphone_pd==true" style="height: 70px;width: 100%;"></div>
    </div>   

  </div>


</template>


<script>
// import InProgress from '@/assets/svg/in-progress.svg'
import Salechan_con from "@/views/sales-channel/SalesChannel_con.vue";

import Salechan_con2 from "@/views/sales-channel/SalesChannel_con2.vue";
import Salechan_con3 from "@/views/sales-channel/SalesChannel_con3.vue";
// 加上水印的
import watermark from "@/utils/watermark";

import {
  Row,
  Col,
  Button,
  NoticeBar,
  PullRefresh,
  Toast,
  DatetimePicker,
  Popup,
  Sticky,
} from "vant";

export default {
  name: "SalesChannel",
  components: {
    // InProgress
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [NoticeBar.name]: NoticeBar,
    [PullRefresh.name]: PullRefresh,
    [Toast.name]: Toast,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Sticky.name]:Sticky,

    Salechanset: Salechan_con,
    Salechanset2: Salechan_con2,
    Salechanset3: Salechan_con3,
  },

  data() {
    return {
      swiperOptions: {
        // direction: "vertical", // 垂直切换选项
        loop: false, // 循环模式选项
        initialSlide: 1,
        preventInteractionOnTransition: true,
        noSwiping: true,
        // noSwipingClass : 'stop-swiping',
        noSwipingSelector: "canvas",
        noSwipingClass: "test_addd",
        followFinger: false,
      },
      show: false,
      container_set: null,

      nvl_css: {
        nvl_cssb: {
          display: "block",
        },

        nvl_cssn: {
          display: "none",
        },
      },

      sel_value: {
        day_set: {
          day_1: true,
          day_7: false,
          day_30: false,
          month: false,
        },
        theme: {
          cpcy: true,
          ouk: false,
          muying: false,
        },
        Range_on: {
          Range_set: "",
        },

        target: {
          all_muri_value: "",
        },
        swiper_num: 1,
      },

      swiping_css_all: {
        // height: "1030px",
        overflow: "hidden",
        // background: "rgb(245, 245, 245)",
      },

      click_css_set: { type: "info", color: "rgba(89, 178, 178, 1)" },
      click_css_no: { type: "default", color: "" },

      sel_title: {
        chanzhi_wenzi: {
          title_all: "总产值",
          title_muban: "板木产值",
          title_ruanti: "软体产值",
          target: "目标",
          reach_rate: "达成率",
          ago_rate: "同比增幅",
        },
      },

      iphone_pd:false,
      orgBackground:''

    };
  },

  //    this.$EventBus.$emit("Range_Single_choice_f",{Range_value_set:1})


  created(){

    // console.log("===========运行到父类页面这里了！！！！222222222222222222222222=============");

    // // 滑动的开始
    // this.$refs['mySwiper_sal'].$swiper.on("slideChangeTransitionEnd", (swiper) => {
    //   const index = swiper.realIndex;
    //   // console.log("这里运行了！！！  " + (index));
    //   this.sel_value.swiper_num=index+1;

    //   if(((index+1)+'')=='1'){
    //     this.Range_Single_choice('cpcy','_this.sel_value.Range_on',true,'_this.sel_value.theme',index+1+'')
    //   }else if(((index+1)+'')=='2'){
    //     this.Range_Single_choice('ouk','_this.sel_value.Range_on',true,'_this.sel_value.theme',index+1+'')
    //   }else if(((index+1)+'')=='3'){
    //     this.Range_Single_choice('muying','_this.sel_value.Range_on',true,'_this.sel_value.theme',index+1+'')
    //   }

    //   this.$EventBus.$emit("Salechan_choice_sales_Callback", {
    //     Range_value_set: (index + 1 + ""),
    //   });

      
    // });
    // // 滑动的结束


  },

  mounted(){
    this.orgBackground = watermark(this.$store.state.app.getusername);

    this.container_set = this.$refs.container_sales; // 固定导航

    if(this.isIPhoneX()){
      this.iphone_pd=true;
    }else{
      this.iphone_pd=false;
    }

    console.log("====这是父类页面！！！=====");
    sessionStorage.removeItem("saleschan"); //删除


    this.$EventBus.$on("Swiper_content_f", (height) => {
      // console.log("===渠道的！！！导航栏====");
      // console.log(height.height);
      this.swiping_css_all.height=height.height+'px';
    });


    this.$EventBus.$on("Salechan_choice_sales", (Range_value_set) => {
      console.log("====渠道的运行到！====");
      // console.log(Range_value_set);
      console.log(Range_value_set.Range_value_set);

      if(Range_value_set.Range_value_set=='1'){
        // this.Range_Single_choice('cpcy','_this.sel_value.Range_on',true,'_this.sel_value.theme',Range_value_set.Range_value_set)
        this.Range_Single_choice('ouk','_this.sel_value.Range_on',true,'_this.sel_value.theme','2')
      }else if(Range_value_set.Range_value_set=='2'){
        // this.Range_Single_choice('ouk','_this.sel_value.Range_on',true,'_this.sel_value.theme',Range_value_set.Range_value_set)
        this.Range_Single_choice('cpcy','_this.sel_value.Range_on',true,'_this.sel_value.theme','1')

      }else if(Range_value_set.Range_value_set=='3'){
        this.Range_Single_choice('muying','_this.sel_value.Range_on',true,'_this.sel_value.theme',Range_value_set.Range_value_set)
      }
      
    });


    // 滑动的开始
    this.$refs['mySwiper_sal'].$swiper.on("slideChangeTransitionEnd", (swiper) => {
      const index = swiper.realIndex;
      // console.log("这里运行了！！！  " + (index));
      this.sel_value.swiper_num=index+1;

      if(((index+1)+'')=='1'){
        // this.Range_Single_choice('cpcy','_this.sel_value.Range_on',true,'_this.sel_value.theme',index+1+'')
        this.Range_Single_choice('ouk','_this.sel_value.Range_on',true,'_this.sel_value.theme',2+'')
        
      }else if(((index+1)+'')=='2'){
        // this.Range_Single_choice('ouk','_this.sel_value.Range_on',true,'_this.sel_value.theme',index+1+'')
        this.Range_Single_choice('cpcy','_this.sel_value.Range_on',true,'_this.sel_value.theme',1+'')
      }else if(((index+1)+'')=='3'){
        this.Range_Single_choice('muying','_this.sel_value.Range_on',true,'_this.sel_value.theme',index+1+'')
      }

      this.$EventBus.$emit("Salechan_choice_sales_Callback", {
        Range_value_set: (index + 1 + ""),
      });

      
    });
    // 滑动的结束
    // 第一次加载的默认值
    let PermList = this.$store.state.app.PermissionArrList;
    if(PermList.length==1){
      if(PermList[0]=='业绩达成'){
        this.chenSwiper(0);
      }else if(PermList[0]=='实时业绩'){
        this.chenSwiper(1);
      }else if(PermList[0]=='订单状态'){
        this.chenSwiper(2);
      }
    }else if(PermList.length==2){
      let PermString='';
      Object.keys(PermList).forEach((permkey) => {
        PermString+=PermList[permkey]+' ';
      });
      if(PermString.indexOf("业绩达成")>=0){
        this.chenSwiper(0);
      }else if(PermString.indexOf("实时业绩")>=0){
        this.chenSwiper(1);
      }
    }else{
      this.chenSwiper(0);
    }

  },

  methods: {
    Range_Single_choice(
      value,
      josn_value,
      target_value,
      for_value,
      number_value
    ) {
      var _this = this;
      _this.show; //意义不大 防止定义不调用出现的报错
      for_value = eval(for_value);
      // let pd_num=0;

      Object.keys(for_value).forEach((key) => {
        if (key == value) {
          for_value[key] = target_value;
        } else {
          for_value[key] = false;
        }
      });

      if (josn_value) {
        this.$EventBus.$emit("Salechan_choice_f", {
          
          Range_value_set: number_value,
        });
        josn_value = eval(josn_value);
        Object.keys(josn_value).forEach((key_fun) => {
          josn_value[key_fun] = number_value;
        });
      }

      if(_this.sel_value.Range_on.Range_set=='1'){
        // this.chenSwiper(0);
        this.chenSwiper(1);
      }else if(_this.sel_value.Range_on.Range_set=='2'){
        // this.chenSwiper(1);
        this.chenSwiper(0);
      }else if(_this.sel_value.Range_on.Range_set=='3'){
        this.chenSwiper(2);
      }


    },

    chenSwiper(value){

      // console.log("=======运行到滑动这里！这里了！！！！！！！！！=============");
      // console.log(value);
      this.sel_value.swiper_num=value+1;

      this.$refs['mySwiper_sal'].$swiper.slideTo(value,0,false)

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

  //生命周期结束之前销毁
  beforeDestroy () {
    this.$EventBus.$off("Salechan_choice_sales");
    this.$EventBus.$off("Salechan_choice_f");
  },


};
</script>

<style scoped lang="scss">
.SalesChannel_title .van-row .van-col button {
  font-size: 14px;
  height: 28px;
  // color: #ffffff;
}
.SalesChannel_title .van-row .van-col .but_no_select {
  font-size: 14px;
  height: 28px;
  color: #000000;
}

.SalesChannel_all .van-notice-bar {
  line-height: 12px;
  font-size: 12px;
}


.select_title_css {
  position: relative;
  font-size: 14px;
  text-align: center;
  line-height: 25px;

  &.active {
    font-size: 14px;
    color: #1678ff;
    font-weight: bold;

    &:after {
      position: absolute;
      content: "";
      left: 50%;
      width: 30%;
      transform: translateX(-50%);
      height: 2px;
      background-color: #1678ff;
      bottom: -3px;
    }
  }
}
</style>
