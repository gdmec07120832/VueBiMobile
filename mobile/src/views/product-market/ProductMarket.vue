<template>
  <div ref="container_pro_mark" class="Productmarket_all">
    <!-- 头部切换开始 -->
    <!-- <van-sticky :container="container_set" :offset-top="0">  没有用的开始-->

      <div style="background-color: #ffffff;border-bottom: 1px solid #EEEEEE;display: none;">
        <div class="title_all_css">
          <!-- 切换优化开始 -->
          <van-row
            gutter=""
            type="flex"
            justify="center"
            style="padding-top: 16px"
          >
            <van-col
              span="7"
              @click="
                Single_choice(
                  'chanpin_pd',
                  ['_this.router_change(' + 1 + ')'],
                  '1',
                  '_this.chanpin_zhuti_qie'
                )
              "
              :style="
                chanpin_zhuti_qie.chanpin_pd == '1'
                  ? Object.assign({}, chanpin_zhuti_qie_css.chanpin_n, {
                      'border-right': '0px',
                    })
                  : Object.assign({}, chanpin_zhuti_qie_css.chanpin_y, {
                      'border-right': '0px',
                    })
              "
              style="
                border-top-left-radius: 8px;
                border-bottom-left-radius: 8px;
              "
            >
              <div
                style="
                  padding: 2px;
                  text-align: center;
                  font-size: 16px;
                  padding-bottom: 4px;
                "
              >
                产品市场
              </div>
            </van-col>
            <van-col
              span="7"
              @click="
                Single_choice(
                  'chanpin_pd',
                  ['_this.router_change(' + 2 + ')'],
                  '2',
                  '_this.chanpin_zhuti_qie'
                )
              "
              :style="
                chanpin_zhuti_qie.chanpin_pd == '2'
                  ? Object.assign({}, chanpin_zhuti_qie_css.chanpin_n, {
                      'border-left': '0px',
                    })
                  : Object.assign({}, chanpin_zhuti_qie_css.chanpin_y, {
                      'border-left': '0px',
                    })
              "
              style="
                border-top-right-radius: 8px;
                border-bottom-right-radius: 8px;
              "
            >
              <div
                style="
                  padding: 2px;
                  text-align: center;
                  font-size: 16px;
                  padding-bottom: 4px;
                  padding-top: 3px;
                "
              >
                产品供应
              </div>
            </van-col>
          </van-row>
          <div style="clear: both"></div>
          <!-- 切换优化结束 class="px10 py10"-->
        </div>

        <!-- 二级目录开始 -->
        <section
          class="px10 py10 nav-wrapper"
          style="padding-top: 5px; padding-bottom: 13px"
          :style="show == true ? nvl_css.nvl_cssn : nvl_css.nvl_cssb"
        >
          <div class="Productmarket_title" style="">
            <van-row type="flex" justify="center">
              <van-col span="7" @click="Range_Single_choice('1')">
                <div
                  class="select_title_css"
                  :class="{ active: sel_value.cpcy === true }"
                >
                  产值概览
                </div>
              </van-col>
              <van-col span="7" @click="Range_Single_choice('2')">
                <div
                  class="select_title_css"
                  :class="{ active: sel_value.ouk === true }"
                >
                  欧康品质
                </div>
              </van-col>
              <van-col span="7" @click="Range_Single_choice('3')"
                ><div
                  class="select_title_css"
                  :class="{ active: sel_value.muying === true }"
                >
                  母婴概览
                </div></van-col
              >
            </van-row>
          </div>
        </section>
        <!-- 二级目录结束 -->
      </div>
    <!-- </van-sticky>  没有用的结束-->
    <!-- 头部切换结束 -->




    <!-- 开头开始 -->

 

    <!-- 原来的开始v-if="swiper_show==true" :style="swiperOptions.noSwiping==true ?swiping_css:swiping_css_no"-->
    <!-- <div  >
      <ProMarkconset></ProMarkconset>
    </div> -->
    <!-- 原来的结束 -->

    <!-- 滑屏开始 :style="swiperOptions.noSwiping==false ?swiping_css:swiping_css_no"  v-if="swiper_show==false"-->
    <div>
      <swiper
        :style="swiping_css_all"
        ref="mySwiperaa"
        :options="swiperOptions"
      >

        <!-- <template v-for="value in [1, 2, 3]">
          <swiper-slide :key="value" class="">
            <div v-if="value" :style="swiping_css_all">
              <ProMarkconset></ProMarkconset>
            </div>
          </swiper-slide>
        </template> -->

        <!-- 优化后开始 -->
          <template>

            <swiper-slide>
              <keep-alive >
                <ProMarkconset v-if="sel_value.swiper_num==1"></ProMarkconset> <div style="padding: 20px 0" v-else><van-skeleton title :row="10"  /></div>  
              </keep-alive>
            </swiper-slide>

            <swiper-slide>
              <keep-alive >
                <ProMarkconset2 v-if="sel_value.swiper_num==2"></ProMarkconset2> <div style="padding: 20px 0" v-else><van-skeleton title :row="10"  /></div>  
              </keep-alive>
            </swiper-slide>

            <swiper-slide>
              <keep-alive >
                <ProMarkconset3 v-if="sel_value.swiper_num==3"></ProMarkconset3> <div style="padding: 20px 0" v-else><van-skeleton title :row="10"  /></div>  
              </keep-alive>
            </swiper-slide>

          </template>
        <!-- 优化后结束 -->


      </swiper>

    </div>


    <div style="width: 100%; " :style="iphone_pd==true? {'height': '300px'}:{'height': '0px'}"></div>
    <!-- 滑屏结束 -->
    <!-- <ProMarkconset></ProMarkconset> -->
  </div>
</template>




<script>
// import InProgress from '@/assets/svg/in-progress.svg';
// import Layout_name from '@/components/Layout.vue';
// import  Swiper from "swiper";
import ProMark_con from "@/views/product-market/ProductMarket_con.vue";
import ProMark_con2 from "@/views/product-market/ProductMarket_con2.vue";
import ProMark_con3 from "@/views/product-market/ProductMarket_con3.vue";
// import echarts from "echarts/lib/echarts";
// import "echarts/lib/chart/line";
// import "echarts/lib/chart/bar";
// import "echarts/lib/component/legend";
// import "echarts/lib/component/tooltip";

// import { mapState } from "vuex";

var Range = "";

// import {
//   decimal2Percent,
//   calcSignClass,
//   generatePromise,
// } from "@/utils/helpers";

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

  // GoodsAction,
  // GoodsActionIcon,
  // GoodsActionButton
} from "vant";

export default {
  name: "Productmarket",

  components: {
    //   InProgress,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [NoticeBar.name]: NoticeBar,
    [PullRefresh.name]: PullRefresh,
    [Toast.name]: Toast,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Sticky.name]: Sticky,

    ProMarkconset: ProMark_con,

    ProMarkconset2: ProMark_con2,
    ProMarkconset3: ProMark_con3,

    // [GoodsAction.name]:GoodsAction,
    // [GoodsActionIcon.name]:GoodsActionIcon,
    // [GoodsActionButton.name]:GoodsActionButton
    // test_name:Layout_name
  },

  data() {
    return {
      // swiperOptions_test:{
      //   direction: "vertical",
      //   // height : 300,
      //   initialSlide: 1,
      //   nested:true,

      // },
      swiperOptions: {
        // direction: "vertical", // 垂直切换选项
        loop: false, // 循环模式选项
        initialSlide: 1,
        preventInteractionOnTransition: true,
        noSwiping: true,
        // noSwipingClass : 'stop-swiping',
        noSwipingSelector: "canvas,i",
        noSwipingClass: "test_addd",
        followFinger: false,
      },

      swiper_show: true,
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

      swiping_css_all: {
        // height: "645px",
        // // height: "1145px",
        overflow: "hidden",
        // background: "rgb(245, 245, 245)",
      },
      swiping_css: {
        "padding-top": "0px",
        display: "block",
      },
      swiping_css_no: {
        "padding-top": "0px",
        display: "none",
      },

      click_css_set: { type: "info", color: "#2AA5F8" },
      click_css_no: { type: "default", color: "#2AA5F8" },
      click_css_hxzb_y: {
        width: "33.33333%",
        float: "left",
        "border-top": "2px solid rgba(89, 178, 178, 1)",
        "background-color": "#EEEEEE",
        "padding-bottom": "10px",
      },
      click_css_hxzb_n: {
        width: "33.33333%",
        float: "left",
        "border-top": "2px solid #dddddd",
        "background-color": "#ffffff",
      },
      sum_zhibiao: {
        title: {
          width: "100%",
          "font-weight": "bold",
          "font-size": "14px",
          display: "block",
          "padding-left": "3px",
          "padding-top": "10px",
        },
        zhognxin: {
          width: "100%",
          "font-size": "16px",
          display: "block",
          "padding-left": "3px",
          "padding-top": "10px",
        },
        body: {
          width: "100%",
          "font-size": "12px",
          display: "block",
          "padding-left": "3px",
          "padding-top": "10px",
        },
        red_css: {
          color: "red",
          "font-style": "normal",
        },
        green_css: {
          color: "green",
          "font-style": "normal",
        },
        erji_text_wenzi: "二级类目产值",
      },

      echarts2_css_y: {
        "padding-top": "0px",
        display: "block",
      },
      echarts2_css_n: {
        "padding-top": "0px",
        display: "none",
      },

      sel_value: {
        day_1: true,
        day_7: false,
        day_30: false,
        month: false,
        cpcy: true,
        ouk: false,
        muying: false,
        Range_set: "",
        all_muri_value: "",
        swiper_num: 1,
      },
      set_target_data: {
        all_valeu: {
          ago_rate: "",
          reach_rate: "",
          target: "",
          value: "",
        },
        muban_valeu: {
          ago_rate: "",
          reach_rate: "",
          target: "",
          value: "",
        },
        ruanti_valeu: {
          ago_rate: "",
          reach_rate: "",
          target: "",
          value: "",
        },
      },
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

      chanpin_zhuti_qie: {
        chanpin_pd: "1",
      },

      chanpin_zhuti_qie_css: {
        chanpin_y: {
          // background: "#E6E6E6",
          // color: "rgb(255, 255, 255)",
          background: "#ffffff",
          color: "#1678FF",
          border: "0px solid #ffffff",
        },
        chanpin_n: {
          color: "rgb(255, 255, 255)",
          border: "1px solid #ffffff",
        },
      },

      data_test: {},
      data_sum: {},
      iphone_pd:false,
    };
  },
  computed: {
    // swiper() {
    //   return this.$refs.mySwiperaa.$swiper;
    // },
  },

  created() {},

  mounted() {
    this.container_set = this.$refs.container_pro_mark; // 固定导航

    // console.log(this.$refs)
    let _this = this;
    let _this_swiper=_this.$refs["mySwiperaa"];
    // 第一次加载的默认值
    let PermList = this.$store.state.app.PermissionArrList;
    if(PermList.length==1){
      if(PermList[0]=='抖音快手'){
        this.Range_Single_choice("1");
      }else if(PermList[0]=='欧康品质'){
        this.Range_Single_choice("2");
      }else if(PermList[0]=='母婴概览'){
        this.Range_Single_choice("3");
      }
    }else if(PermList.length==2){
      let PermString='';
      Object.keys(PermList).forEach((permkey) => {
        PermString+=PermList[permkey]+' ';
      });
      if(PermString.indexOf("抖音快手")>=0){
        this.Range_Single_choice("1");
      }else if(PermString.indexOf("欧康品质")>=0){
        this.Range_Single_choice("2");
      }
    }else{
      this.Range_Single_choice("1");
    }

    // var scrollHeight_test = document.documentElement.scrollHeight||document.body.scrollHeight;
    // console.log(scrollHeight_test+"  ===========");

    // 成功的结束
    this.$EventBus.$on("Salechan_choice_ProMark", (Range_value_set) => {
      console.log("====222====");
      // console.log(Range_value_set);
      console.log(Range_value_set);
      // console.log(_this.$refs["mySwiperaa"]);

      // if(_this.$refs["mySwiperaa"]!=undefined){ }
      _this.Range_Single_choice(Range_value_set.Range_value_set + "");
     

    });


    // this.$EventBus.$on("all_muban_ruanti_f", (value_send) => {
    //   // console.log("====222====");
    //   // console.log(value_send);
    //   if (value_send.send_value == 3 && value_send.Range_set == 3) {
    //     // this.swiping_css_all.height=520+"px";
    //     this.swiping_css_all.height = 645 + "px";
    //   } else {
    //     // this.swiping_css_all.height=820+"px";
    //     this.swiping_css_all.height = 645 + "px";
    //   }
    // });

    this.$EventBus.$on("nav_theme_show", (show) => {
      this.show = show.show;
    });

    // 成功的开始

    // 滑动的开始
    // console.log("Current Swiper instance object", this.swiper);

    if(_this.$refs["mySwiperaa"]!=undefined){
      _this_swiper.$swiper.on(
        "slideChangeTransitionEnd",
        (swiper) => {
          const index = swiper.realIndex;

          this.sel_value.swiper_num=index+1;

          _this.$store.commit("app/setProductMarket", index + 1); //参考的
          console.log("这里运行了！！！  " + index);
          _this.Range_Single_choice(index + 1 + "");

          _this.$EventBus.$emit("Salechan_choice_ProMark_Callback", {
            Range_value_set: (index + 1 + ""),
          });


        }
      );
    }




    // setTimeout(() => {}, 50);
    // this.chenSwiper(0)
    // console.log("========================a阿萨大大  阿大撒大撒        啊飒飒大大   啊大大==================================");
    // console.log(PermList);

    // 滑动的结束
  },
  methods: {
    showPopup() {
      this.show = true;
    },

    // 判断是否iphonex开始
    isIPhoneX(){
        var u = navigator.userAgent;
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        var model_wh=[{height:812,width:375},{height:896,width:414}];
        if (isIOS) {        
            if ((screen.height == model_wh[0].height && screen.width == model_wh[0].width)||(screen.height == model_wh[1].height && screen.width == model_wh[1].width)){
                //是iphoneX
         
                return true;
            }else{
                //不是iphoneX
       
                return false;
            } 
        }

    },
    // 判断是否iphonex结束


    chenSwiper(value) {
      // console.log(this.swiperOptions.noSwiping);
      // console.log(this.swiperOptions.noSwipingClass);
      let _this=this;
      this.sel_value.swiper_num=value+1;
      _this.$refs["mySwiperaa"].$swiper.slideTo(value, 0, false);

      // this.swiper.slideTo(value,0, false);
    },

    Range_Single_choice(Range_value) {
      this.sel_value.cpcy = false;
      this.sel_value.ouk = false;
      this.sel_value.muying = false;



      switch (Range_value) {
        case "1":
          this.sel_value.cpcy = true;
          // console.log(this.data);
          Range = 1;
          this.sel_title.chanzhi_wenzi.title_all = "总产值";
          this.sel_title.chanzhi_wenzi.title_muban = "板木产值";
          this.sel_title.chanzhi_wenzi.title_ruanti = "软体产值";
          this.sel_title.chanzhi_wenzi.target = "目标";
          this.sel_title.chanzhi_wenzi.reach_rate = "达成率";
          this.sel_title.chanzhi_wenzi.ago_rate = "增幅";
          this.sum_zhibiao.erji_text_wenzi = "二级类目产值";

          this.sel_value.Range_set = Range;
          this.$store.commit("app/setProductMarket", 1); //参考的
          this.chenSwiper(0);

          break;
        case "2":
          this.sel_value.ouk = true;
          Range = 2;
          this.sel_title.chanzhi_wenzi.title_all = "售后率";
          this.sel_title.chanzhi_wenzi.title_muban = "板木售后率";
          this.sel_title.chanzhi_wenzi.title_ruanti = "软体售后率";
          this.sel_title.chanzhi_wenzi.target = "标杆";
          this.sel_title.chanzhi_wenzi.reach_rate = "差额";
          this.sel_title.chanzhi_wenzi.ago_rate = "增幅";
          this.sum_zhibiao.erji_text_wenzi = "考核分类不良率";

          this.sel_value.Range_set = Range;
          this.$store.commit("app/setProductMarket", 2); //参考的
          this.chenSwiper(1);
          break;
        case "3":
          this.sel_value.muying = true;
          Range = 3;
          this.sel_title.chanzhi_wenzi.title_all = "支付业绩";
          this.sel_title.chanzhi_wenzi.title_muban = "发货业绩";
          this.sel_title.chanzhi_wenzi.title_ruanti = "毛利率";
          this.sel_title.chanzhi_wenzi.target = "目标";
          this.sel_title.chanzhi_wenzi.reach_rate = "达成率";
          this.sel_title.chanzhi_wenzi.ago_rate = "增幅";
          this.sum_zhibiao.erji_text_wenzi = "叶子类目TOP10";

          this.sel_value.Range_set = Range;
          this.$store.commit("app/setProductMarket", 3); //参考的
          this.chenSwiper(2);
          break;
        default:
          Range = 1;
          this.$store.commit("app/setProductMarket", 1); //参考的
          this.chenSwiper(0);
          this.sel_value.cpcy = true;
      }

      // this.all_muban_ruanti("1");
    },

    // all_muban_ruanti(send_value) {
    //   this.sel_value.all_muri_value = send_value;
    // },

    router_change(value) {
      if (value == 1) {
        this.$router.push({
          path: "/product-market",
        });
      } else if (value == 2) {
        this.$router.push({
          path: "/product-supply",
        });
      }
    },

    // 切换单点开始
    Single_choice(value, josn_value, target_value, for_value) {
      var _this = this;
      _this.show; //意义不大 防止定义不调用出现的报错
      for_value = eval(for_value);

      // console.log(for_value);

      Object.keys(for_value).forEach((key) => {
        if (key == value) {
          for_value[key] = target_value;
        } else {
          for_value[key] = false;
        }
      });

      if (josn_value) {
        Object.keys(josn_value).forEach((key_fun) => {
          try {
            eval(josn_value[key_fun]);
          } catch (e) {
            console.log("找不到对应的函数！！！");
          }
        });
      }

      // console.log(for_value);
    },
    // 切换单点结束
  },


  //生命周期结束之前销毁
  beforeDestroy () {
    this.$EventBus.$off("Salechan_choice_ProMark");
  },


};
</script>

<style scoped lang="scss">
// @import "swiper/swiper-bundle.css";
.section-title {
  font-size: 14px;
  font-weight: bold;
  padding-bottom: 10px;
}

.Productmarket_title .van-row .van-col button {
  font-size: 14px;
  height: 28px;
  // color: #ffffff;
}
.Productmarket_title .van-row .van-col .but_no_select {
  font-size: 14px;
  height: 28px;
  color: #000000;
}

.Productmarket_all .van-notice-bar {
  line-height: 12px;
  font-size: 12px;
}

.Productmarket_day .van-row .van-col button {
  font-size: 12px;
  height: 28px;
  color: #000000;
  width: 70px;
}

.but_set_select {
  color: rgba(89, 178, 178, 1);
}

.title_all_css {
  display: inline-block;
  width: 100%;
  height: 60px;
  // background-image: linear-gradient(#2aa5f8, #1678FF);
  background-image: linear-gradient(#1678ff, #1678ff);
  background-blend-mode: lighten;
  background-size: cover;
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
