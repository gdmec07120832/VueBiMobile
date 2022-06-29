<template>
  <div class="SalesChannel_all">
    <!-- 开头开始 -->
    <section
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
              >库存周转</van-button
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
              >承运管理</van-button
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
              >三包成本</van-button
            ></van-col
          >
        </van-row>
      </div>
    </section>

    <!-- 原来的结束 -->


    <!-- 滑屏开始 :style="swiperOptions.noSwiping==false ?swiping_css:swiping_css_no"  v-if="swiper_show==false"-->
    <div>
      <swiper
        :style="swiping_css_all"
        ref="mySwiper_logist_new"
        :options="swiperOptions"
      >
        <template v-for="value in [1,2,3]">
          <swiper-slide :key="value" class="">
            <!-- <div v-if="value" :style="swiping_css_all">1</div> -->
            <Logisticsset></Logisticsset>
          </swiper-slide>
        </template>
        <!-- <swiper-slide> asdadasd </swiper-slide> -->
      </swiper>
    </div>
    <!-- 滑屏结束 -->


  </div>
</template>

<script>
// import InProgress from '@/assets/svg/in-progress.svg'
import Logistics_con from "@/views/logistics/Logistics_con.vue";

import {
  Row,
  Col,
  Button,
  NoticeBar,
  PullRefresh,
  Toast,
  DatetimePicker,
  Popup,
} from "vant";

export default {
  name: "Logistics-222",
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

    Logisticsset: Logistics_con,
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
        swiper_num: 0,
      },

      swiping_css_all: {
        height: "1030px",
        // overflow: "hidden",
        background: "rgb(245, 245, 245)",
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
    };
  },

  mounted(){


    // 滑动的开始
    // let _this=this;
    
    this.$refs['mySwiper_logist_new'].$swiper.on("slideChangeTransitionEnd", (swiper) => {
      const index = swiper.realIndex;
      console.log("这里运行了！！！  " + (index));

      if(((index+1)+'')=='1'){
        this.Range_Single_choice('cpcy','_this.sel_value.Range_on',true,'_this.sel_value.theme',index+1+'')
        // _this.chenSwiper(0);
      }else if(((index+1)+'')=='2'){
        this.Range_Single_choice('ouk','_this.sel_value.Range_on',true,'_this.sel_value.theme',index+1+'')
        // _this.chenSwiper(1);
      }else if(((index+1)+'')=='3'){
        this.Range_Single_choice('muying','_this.sel_value.Range_on',true,'_this.sel_value.theme',index+1+'')
        // _this.chenSwiper(2);
      }

      
    });
    // 滑动的结束
    this.chenSwiper(0);

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
        this.$EventBus.$emit("Logistics_choice_f", {
          Range_value_set: number_value,
        });
        josn_value = eval(josn_value);
        Object.keys(josn_value).forEach((key_fun) => {
          josn_value[key_fun] = number_value;
        });
      }


      console.log("=========主题！！========");
      // console.log(_this.sel_value.Range_on);


      if(_this.sel_value.Range_on.Range_set=='1'){
        _this.chenSwiper(0);
      }else if(_this.sel_value.Range_on.Range_set=='2'){
        _this.chenSwiper(1);
      }else if(_this.sel_value.Range_on.Range_set=='3'){
        _this.chenSwiper(2);
      }
    },

    chenSwiper(value){
      // console.log("运行的函数！！")
      this.$refs['mySwiper_logist_new'].$swiper.slideTo(value,0,false)
    },
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
</style>

