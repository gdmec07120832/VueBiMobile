<template>
<div style="background: rgb(245, 245, 245);">
  <div ref="container_sales" class="SalesChannel_all" :style="{backgroundImage:`url(${orgBackground})`}">
    <!-- 开头开始 -->


    <!-- 原来的结束 -->

    <!-- 滑屏开始 :style="swiperOptions.noSwiping==false ?swiping_css:swiping_css_no"  v-if="swiper_show==false"-->
    <div>
      <swiper
        :style="swiping_css_all"
        ref="mySwiper_sal"
        :options="swiperOptions"
      >

        <!-- <template v-for="value in [1,2]">
          <swiper-slide :key="value" class="">
            <MarketOpset></MarketOpset>
          </swiper-slide>
        </template> -->

        <!-- 优化后开始 -->
          <template>

            <swiper-slide >
              <keep-alive>
                <MarketOpset3 v-if="sel_value.swiper_num==1"></MarketOpset3> <div style="padding: 20px 0" v-else><van-skeleton title :row="10"  /></div>  
              </keep-alive>
            </swiper-slide>

            <swiper-slide >
              <keep-alive>
                <MarketOpset v-if="sel_value.swiper_num==2"></MarketOpset> <div style="padding: 20px 0" v-else><van-skeleton title :row="10"  /></div>  
              </keep-alive>
            </swiper-slide>

            <swiper-slide >
              <keep-alive>
                <MarketOpset4 v-if="sel_value.swiper_num==3"></MarketOpset4> <div style="padding: 20px 0" v-else><van-skeleton title :row="10"  /></div>  
              </keep-alive>
            </swiper-slide>

            <swiper-slide >
              <keep-alive>
                <MarketOpset2 v-if="sel_value.swiper_num==4"></MarketOpset2> <div style="padding: 20px 0" v-else><van-skeleton title :row="10"  /></div>  
              </keep-alive>
            </swiper-slide>

            <!-- <swiper-slide>
              <keep-alive >
                <MarketOpset v-if="sel_value.swiper_num==1"></MarketOpset> <div style="padding: 20px 0" v-else><van-skeleton title :row="10"  /></div>  
              </keep-alive>
            </swiper-slide>
            <swiper-slide>
              <keep-alive >
                <MarketOpset2 v-if="sel_value.swiper_num==2"></MarketOpset2> <div style="padding: 20px 0" v-else><van-skeleton title :row="10"  /></div>  
              </keep-alive>
            </swiper-slide> -->

          </template>
        <!-- 优化后结束 -->



      </swiper>
    </div>
    <!-- 滑屏结束 -->

    <!-- <div style="height: 50px;width: 100%;"></div> -->
  </div>
</div>
</template>


<script>
import MarketOp_con from "@/views/market-operation/MarketOperation_con.vue";
// import MarketOp_con from "@/views/market-operation/MarketOperation_con2.vue";
import MarketOp_con2 from "@/views/market-operation/MarketOperation_con2.vue";

import MarketOp_con3 from "@/views/market-operation/MarketOperation_con3.vue";  //推广引流
import MarketOp_con4 from "@/views/market-operation/MarketOperation_con4.vue";  //客单价


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
  Loading, 
} from "vant";

export default {
  name: "MarketOperation",
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
    [Loading.name]:Loading,

    MarketOpset: MarketOp_con,
    MarketOpset2: MarketOp_con2,
    MarketOpset3: MarketOp_con3,
    MarketOpset4: MarketOp_con4,
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
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true//修改swiper的父元素时，自动初始化swiper
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
          pinzhi: false,
        },
        Range_on: {
          Range_set: "",
        },

        target: {
          all_muri_value: "",
        },
        swiper_num: null,

      },
      SelView:{
        code1:false,
        code2:false,
        code3:false,
        code4:false,
      },
      swiping_css_all: {
        // height: "1830px",
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

      orgBackground:''

    };
  },

  //    this.$EventBus.$emit("Range_Single_choice_f",{Range_value_set:1})

  created(){

    // let PermList = this.$store.state.app.PermissionArrList;
    // if(PermList.length==1){
    //   if(PermList[0]=='推广引流'){
    //     this.SelView.code1=true;
    //   }else if(PermList[0]=='流量分析'){
    //     this.SelView.code2=true;
    //   }else if(PermList[0]=='客单价'){
    //     this.SelView.code3=true;
    //   }else if(PermList[0]=='未发取消'){
    //     this.SelView.code4=true;
    //   }
    // }else if(PermList.length==2||PermList.length==3){
    //   Object.keys(PermList).forEach((permkey) => {
    //     if(PermList[permkey].indexOf("推广引流")>=0){
    //       this.SelView.code1=true;
    //     }else if(PermList[permkey].indexOf("流量分析")>=0){
    //       this.SelView.code2=true;
    //     }else if(PermList[permkey].indexOf("客单价")>=0){
    //       this.SelView.code3=true;
    //     }else if(PermList[permkey].indexOf("未发取消")>=0){
    //       this.SelView.code4=true;
    //     }
    //   });
    // }else{
    //   this.SelView.code1=true;
    //   this.SelView.code2=true;
    //   this.SelView.code3=true;
    //   this.SelView.code4=true;
    // }

  },

  mounted(){

    this.orgBackground = watermark(this.$store.state.app.getusername);

    this.container_set = this.$refs.container_sales; // 固定导航

  

    // this.$EventBus.$on("Swiper_content_f", (height) => {
    //   // console.log("===导航栏====");
    //   // console.log(height.height);
    //   this.swiping_css_all.height=height.height+'px';
    // });
    console.log("==========运行到渠道运营这里来了！！！啊啊啊==============");
    // console.log(this.sel_value.Range_on);
    // console.log(this.sel_value.swiper_num);


    this.$EventBus.$on("Salechan_choice_marketop", (Range_value_set) => {
      console.log("===渠道运营 导航切换页！！====");
      // console.log(Range_value_set);
      console.log(Range_value_set.Range_value_set);
      // 备注： 1->流量分析    2->未发取消  3->推广引流  5->客单价
      if(Range_value_set.Range_value_set=='1'){
        // this.Range_Single_choice('cpcy','_this.sel_value.Range_on',true,'_this.sel_value.theme',Range_value_set.Range_value_set);
        this.Range_Single_choice('cpcy','_this.sel_value.Range_on',true,'_this.sel_value.theme','3');
      }else if(Range_value_set.Range_value_set=='2'){
        this.Range_Single_choice('ouk','_this.sel_value.Range_on',true,'_this.sel_value.theme','1');
      }else if(Range_value_set.Range_value_set=='3'){
        this.Range_Single_choice('muying','_this.sel_value.Range_on',true,'_this.sel_value.theme','5');
      }else if(Range_value_set.Range_value_set=='4'){
        this.Range_Single_choice('pinzhi','_this.sel_value.Range_on',true,'_this.sel_value.theme','2');
      }
      
    });







    // 滑动的开始
    this.$refs['mySwiper_sal'].$swiper.on("slideChangeTransitionEnd", (swiper) => {
      const index = swiper.realIndex;
      this.sel_value.swiper_num=index+1;
      console.log("这里运行了！！！  " + (index));

      if(((index+1)+'')=='1'){
        // this.Range_Single_choice('cpcy','_this.sel_value.Range_on',true,'_this.sel_value.theme',index+1+'');
        this.Range_Single_choice('cpcy','_this.sel_value.Range_on',true,'_this.sel_value.theme',3+'');
      }else if(((index+1)+'')=='2'){
        this.Range_Single_choice('ouk','_this.sel_value.Range_on',true,'_this.sel_value.theme',1+'');
      }else if(((index+1)+'')=='3'){
        this.Range_Single_choice('muying','_this.sel_value.Range_on',true,'_this.sel_value.theme',5+'');
      }else if(((index+1)+'')=='4'){
        this.Range_Single_choice('pinzhi','_this.sel_value.Range_on',true,'_this.sel_value.theme',2+'');
      }

      this.$EventBus.$emit("Salechan_choice_sales_Callback", {
        Range_value_set: (index + 1 + ""),
      });

      
    });
    // 滑动的结束  PermissionArr.push('推广引流','流量分析','客单价','未发取消');  推广引流->付费推广
    // 第一次加载的默认值   流量分析   未发取消
    let PermList = this.$store.state.app.PermissionArrList;
    console.log(PermList);
    if(PermList.length==1){
      if(PermList[0]=='付费推广'){
        this.chenSwiper(0);
      }else if(PermList[0]=='流量分析'){
        this.chenSwiper(1);
      }else if(PermList[0]=='客单价'){
        this.chenSwiper(2);
      }else if(PermList[0]=='未发取消'){
        this.chenSwiper(3);
      }
      this.JumpToPageFunCon();      
    }else if(PermList.length==2||PermList.length==3){
      let PermString='';
      Object.keys(PermList).forEach((permkey) => {
        PermString+=PermList[permkey]+' ';
      });
      if(PermString.indexOf("付费推广")>=0){
        this.chenSwiper(0);
      }else if(PermString.indexOf("流量分析")>=0){
        this.chenSwiper(1);
      }else if(PermString.indexOf("客单价")>=0){
        this.chenSwiper(2);
      }else if(PermString.indexOf("未发取消")>=0){
        this.chenSwiper(3);
      }
      this.JumpToPageFunCon();
    }else{
      this.chenSwiper(0);
      this.JumpToPageFunCon();
    }

    console.log(this.SelView);

    // this.$EventBus.$on("JumpToPageCon", (val) => {
    //   console.log("==========渠道运营 导航切换页！再次通过i澳洲！========");
    //   this.Range_Single_choice('ouk','_this.sel_value.Range_on',true,'_this.sel_value.theme',val.setval+'')
    // });
  },

  methods: {

    JumpToPageFunCon(){
      // 2021-07-21增加了首页跳转
      console.log("==============asdasd  adad      asdas      ===============")
      console.log(this.$store.state.app.JumpToPageVal);
      if(this.$store.state.app.JumpToPageVal=="流量分析"){
        this.chenSwiper(1);
      }else if(this.$store.state.app.JumpToPageVal=="未发取消"){
        this.chenSwiper(3);
      }
      // 2021-07-21增加了首页跳转
    },

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
        this.$EventBus.$emit("Salechan_marketoper_f", {
          
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
        this.chenSwiper(3);
      }else if(_this.sel_value.Range_on.Range_set=='3'){
        // this.chenSwiper(2);
        this.chenSwiper(0);
      }else if(_this.sel_value.Range_on.Range_set=='5'){
        this.chenSwiper(2);
      }


    },

    chenSwiper(value){

      this.sel_value.swiper_num=value+1;
      this.$refs['mySwiper_sal'].$swiper.slideTo(value,0,false)

    },


  },

  //生命周期结束之前销毁
  beforeDestroy () {
    this.$EventBus.$off("Salechan_choice_sales");
    this.$EventBus.$off("Salechan_choice_marketop");
    this.$EventBus.$off("Salechan_marketoper_f");
    this.$EventBus.$off("Salechan_choice_sales_Callback");
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
