

<template>
<div style="background: rgb(245, 245, 245);">
  <div ref="container_pro_supp" class="Productmarket_all" :style="{backgroundImage:`url(${orgBackground})`}">
    <!-- 头部切换开始 -->
    


    <!-- 滑屏开始:style="swiping_css_all" :style="swiperOptions.noSwiping==false ?swiping_css:swiping_css_no"  v-if="swiper_show==false"-->
    <div>
      <swiper

        :style="data_loay_f==true? Object.assign({},swiping_css_all,{'height': 'auto'}):Object.assign({},swiping_css_all,{'height': '1170px'})"
        ref="mySwiper_supply"
        :options="swiperOptions"
      >

        <!-- <template v-for="value in [1, 2, 3,4,5]">
          <swiper-slide :key="value" class="">
              <Prosuppset></Prosuppset>
          </swiper-slide>
        </template> -->

        <!-- 优化后开始 -->
          <template>

            <swiper-slide>
              <keep-alive >
                <Prosuppset6 v-if="sel_value.swiper_num==1"></Prosuppset6> <div style="padding: 20px 0" v-else><van-skeleton title :row="10"  /></div>  
              </keep-alive>
            </swiper-slide>

            <swiper-slide>
              <keep-alive >
                <Prosuppset v-if="sel_value.swiper_num==2"></Prosuppset> <div style="padding: 20px 0" v-else><van-skeleton title :row="10"  /></div>  
              </keep-alive>
            </swiper-slide>

            <!-- <swiper-slide>
              <keep-alive >
                <Prosuppset2 v-if="sel_value.swiper_num==2"></Prosuppset2> <div style="padding: 20px 0" v-else><van-skeleton title :row="10"  /></div>  
              </keep-alive>
            </swiper-slide> -->

            <swiper-slide>
              <keep-alive >
                <Prosuppset3 v-if="sel_value.swiper_num==3"></Prosuppset3> <div style="padding: 20px 0" v-else><van-skeleton title :row="10"  /></div>  
              </keep-alive>
            </swiper-slide>

            <swiper-slide>
              <keep-alive >
                <Prosuppset4 v-if="sel_value.swiper_num==4"></Prosuppset4> <div style="padding: 20px 0" v-else><van-skeleton title :row="10"  /></div>  
              </keep-alive>
            </swiper-slide>

            <swiper-slide>
              <keep-alive >
                <Prosuppset5 v-if="sel_value.swiper_num==5"></Prosuppset5> <div style="padding: 20px 0" v-else><van-skeleton title :row="10"  /></div>  
              </keep-alive>
            </swiper-slide>
          </template>
        <!-- 优化后结束 -->




        <!-- <swiper-slide> asdadasd </swiper-slide> -->
      </swiper>
    </div>
    <!-- 滑屏结束 -->

    <!-- <div style="height: 50px;width: 100%;"></div> -->
  </div>  
</div>

</template>

<script>
// var Range = "";
// import InProgress from '@/assets/svg/in-progress.svg'

import Prosupp_con from "@/views/product-supply/ProductSupply_con.vue";   // SKU均值页面
// 新加的2021-01-19开始
// import Prosupp_con2 from "@/views/product-supply/ProductSupply_con2.vue"; // 客单价页面
import Prosupp_con3 from "@/views/product-supply/ProductSupply_con3.vue"; // 欠货页面
import Prosupp_con4 from "@/views/product-supply/ProductSupply_con4.vue"; // 品质页面
import Prosupp_con5 from "@/views/product-supply/ProductSupply_con5.vue"; // 库存页面
import Prosupp_con6 from "@/views/product-supply/ProductSupply_con6.vue"; // 新品页面
// 新加的2021-01-19结束
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
  name: "ProductSupply",
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
    [Sticky.name]: Sticky,

    Prosuppset: Prosupp_con,
    // Prosuppset2: Prosupp_con2,
    Prosuppset3: Prosupp_con3,
    Prosuppset4: Prosupp_con4,
    Prosuppset5: Prosupp_con5,
    Prosuppset6: Prosupp_con6,

    
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
          pinzhi: false,
          kedanjia:false,
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

      chanpin_zhuti_qie: {
        chanpin_pd: "2",
      },

      chanpin_zhuti_qie_css: {
        chanpin_y: {
          // background: "rgb(204, 204, 204)",
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

      data_loay_f:false,
      orgBackground:''


    };
  },

  //    this.$EventBus.$emit("Range_Single_choice_f",{Range_value_set:1})
  mounted(){
    this.orgBackground = watermark(this.$store.state.app.getusername);

    this.container_set = this.$refs.container_pro_supp; // 固定导航


    this.$EventBus.$on("Swiper_content_fsupply", (data_loay) => {
      // console.log("===导航栏====");
      // console.log(data_loay.data_loay);
      this.data_loay_f=data_loay.data_loay;
    });


    this.$EventBus.$on("Salechan_choice_suppy", (Range_value_set) => {
      console.log("===产供 导航切换页！！产品中心->切换页！====");
      // console.log(Range_value_set);
      console.log(Range_value_set.Range_value_set);

      if(Range_value_set.Range_value_set=='1'){
        // this.Range_Single_choice('cpcy','_this.sel_value.Range_on',true,'_this.sel_value.theme',Range_value_set.Range_value_set);  //原来的SKU均值
        this.Range_Single_choice('cpcy','_this.sel_value.Range_on',true,'_this.sel_value.theme','6');

      }else if(Range_value_set.Range_value_set=='2'){
        // this.Range_Single_choice('kedanjia','_this.sel_value.Range_on',true,'_this.sel_value.theme','5')    //原来客单价
        this.Range_Single_choice('cpcy','_this.sel_value.Range_on',true,'_this.sel_value.theme','1');
      }
      
      else if(Range_value_set.Range_value_set=='3'){
        this.Range_Single_choice('muying','_this.sel_value.Range_on',true,'_this.sel_value.theme',Range_value_set.Range_value_set)
      }else if(Range_value_set.Range_value_set=='4'){
        this.Range_Single_choice('pinzhi','_this.sel_value.Range_on',true,'_this.sel_value.theme',Range_value_set.Range_value_set)
      }
      else if(Range_value_set.Range_value_set=='5'){
        this.Range_Single_choice('ouk','_this.sel_value.Range_on',true,'_this.sel_value.theme','2')  
      }
      
    });


    // 滑动的开始
    this.$refs['mySwiper_supply'].$swiper.on("slideChangeTransitionEnd", (swiper) => {
      const index = swiper.realIndex;
      this.sel_value.swiper_num=index+1;
      console.log("这里运行了！！！  " + (index));

      if(((index+1)+'')=='1'){
        // this.Range_Single_choice('cpcy','_this.sel_value.Range_on',true,'_this.sel_value.theme',index+1+'');  //原来的SKU均值
        this.Range_Single_choice('cpcy','_this.sel_value.Range_on',true,'_this.sel_value.theme',6+'');

        this.$EventBus.$emit("Salechan_choice_supply_Callback", {
          Range_value_set: (index + 1 + ""),
        });    

      }else if(((index+1)+'')=='2'){
        // this.Range_Single_choice('ouk','_this.sel_value.Range_on',true,'_this.sel_value.theme',5+'');  //原来的客单价
        this.Range_Single_choice('ouk','_this.sel_value.Range_on',true,'_this.sel_value.theme',1+'');
        //修改了导航栏排序
        this.$EventBus.$emit("Salechan_choice_supply_Callback", {
          Range_value_set: (2 + ""),
        });
      }else if(((index+1)+'')=='3'){
        this.Range_Single_choice('muying','_this.sel_value.Range_on',true,'_this.sel_value.theme',index+1+'')
        this.$EventBus.$emit("Salechan_choice_supply_Callback", {
          Range_value_set: (index + 1 + ""),
        });
      }else if(((index+1)+'')=='4'){
        this.Range_Single_choice('pinzhi','_this.sel_value.Range_on',true,'_this.sel_value.theme',index+1+'')
        this.$EventBus.$emit("Salechan_choice_supply_Callback", {
          Range_value_set: (index + 1 + ""),
        });
      }else if(((index+1)+'')=='5'){
        this.Range_Single_choice('kedanjia','_this.sel_value.Range_on',true,'_this.sel_value.theme',2+'')

        //修改了导航栏排序
        this.$EventBus.$emit("Salechan_choice_supply_Callback", {
          Range_value_set: (5 + ""),  
        });

      }

      
    });

    // 滑动的结束
    // this.chenSwiper(0);
    // 第一次加载的默认值
    let PermList = this.$store.state.app.PermissionArrList;
    if(PermList.length==1){
      if(PermList[0]=='新品'){   //需要修改的
        this.chenSwiper(0);
        // }else if(PermList[0]=='客单'){  //需要修改的
      }else if(PermList[0]=='SKU均值'){  //需要修改的
        this.chenSwiper(1);
      }else if(PermList[0]=='欠货'){
        this.chenSwiper(2);
      }else if(PermList[0]=='品质'){
        this.chenSwiper(3);
      }else if(PermList[0]=='库存'){
        this.chenSwiper(4);
      }
      this.JumpToPageFunCon();
    }else if(PermList.length==2||PermList.length==3||PermList.length==4){
      let PermString='';
      Object.keys(PermList).forEach((permkey) => {
        PermString+=PermList[permkey]+' ';
      });
      if(PermString.indexOf("新品")>=0){   //需要修改的
        this.chenSwiper(0);
      }else if(PermString.indexOf("SKU均值")>=0){   //需要修改的
        this.chenSwiper(1);
      }else if(PermString.indexOf("欠货")>=0){
        this.chenSwiper(2);
      }else if(PermString.indexOf("品质")>=0){
        this.chenSwiper(3);
      }else if(PermString.indexOf("库存")>=0){
        this.chenSwiper(4);
      }
      this.JumpToPageFunCon();
    }else{
      this.chenSwiper(0);
      this.JumpToPageFunCon();
    }



  },

      

  methods: {

    JumpToPageFunCon(){
      // 2021-07-21增加了首页跳转
      console.log("==============asdasd  adad      asdas      ===============")
      console.log(this.$store.state.app.JumpToPageVal);
      if(this.$store.state.app.JumpToPageVal=="SKU均值"){  //需要修改的
        this.chenSwiper(1);
      }else if(this.$store.state.app.JumpToPageVal=="欠货"){
        this.chenSwiper(2);
      }else if(this.$store.state.app.JumpToPageVal=="品质"){
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

      Object.keys(for_value).forEach((key) => {
        if (key == value) {
          for_value[key] = target_value;
        } else {
          for_value[key] = false;
        }
      });

      if (josn_value) {
        this.$EventBus.$emit("prosupply_choice_f", {
          Range_value_set: number_value,
        });
        josn_value = eval(josn_value);
        Object.keys(josn_value).forEach((key_fun) => {
          josn_value[key_fun] = number_value;
        });
      }


      // console.log("============主题的页面->aASasdasda================");
      // console.log(_this.sel_value.Range_on.Range_set);


      if(_this.sel_value.Range_on.Range_set=='1'){
        // this.chenSwiper(0);  //原来的
        this.chenSwiper(1);

      }else if(_this.sel_value.Range_on.Range_set=='2'){
        this.chenSwiper(4);
      }else if(_this.sel_value.Range_on.Range_set=='3'){
        this.chenSwiper(2);
      }else if(_this.sel_value.Range_on.Range_set=='4'){
        this.chenSwiper(3);
      }
      // else if(_this.sel_value.Range_on.Range_set=='5'){
      //   this.chenSwiper(1);  // 原来的客单价
      // }
      else if(_this.sel_value.Range_on.Range_set=='6'){
        this.chenSwiper(0);
      }



    },

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


    chenSwiper(value){
      this.sel_value.swiper_num=value+1;
      this.$refs['mySwiper_supply'].$swiper.slideTo(value,0,false)
    },

  },


  //生命周期结束之前销毁
  beforeDestroy () {
    this.$EventBus.$off("Salechan_choice_suppy");
    this.$EventBus.$off("Swiper_content_fsupply");

  },



};
</script>

<style scoped lang="scss">
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
