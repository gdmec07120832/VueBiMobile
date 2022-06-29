<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">


      <!-- <section
        class="px10 py10"
        style="
          padding-top: 0px;
          padding-bottom: 0px;
          padding-left: 15px;
          padding-right: 15px;
        "
      >
        <div class="section-title" style="padding-top: 5px;">实时业绩</div>
      </section> -->

      <!-- <div style="border-bottom: 1px solid #EEEEEE; height: 5px"> 线来的 </div> -->

      <!-- 添加了加载项开始 -->
      <!-- <div v-if="data_loay==false"
        style="position: fixed;left: 170px;top:100px;padding: 5px;border: 1px solid #e6e6e6;border-radius: 60px;background-color: #ffffff;box-shadow: 1px 1px 1px #eeeeee;z-index: 9;">
        <van-loading  size="24px" color="#1989fa" style="" vertical></van-loading>
      </div> -->
      <!-- 添加了加载项结束 -->

      <section
        class="px10 py10"
        style="
          margin-top: 0px;
          padding-top: 10px;
          padding-bottom: 5px;
          padding-left: 15px;
          padding-right: 15px;
        "
      >

      <!-- background-color: #1678ff; #159B80  #03bacc #23B0A8-->
        <div
          style="
            min-height: 20vh;
            
            background-color: #23B0A8;
            border-radius: 10px;
            padding-bottom: 5px;
          "
        >
          <div
            class="chart-desc"
            style="padding-top: 5px; padding-bottom: 10px"
          >
            <div
              class="section-title"
              style="color: #ffffff; padding-left: 5px"
            >
              实时业绩
            </div>

            <span style="color: #ffffff; font-size: 14px; padding-left: 5px">{{
              "￥" + thousands(data["overview-realtime_perf"] / 10000) + "万"
            }}</span>

            <!-- rgb(230, 230, 230, 0.8) -->
            <span
              style="
                color: #ffffff;
                padding-left: 15px;
                padding-right: 5px;
              "
              >完成率:<i style="color: #ffffff; font-style: normal">{{
                (data["overview-realtime_perf_reach_rate"] * 100).toFixed(1) +
                "%"
              }}</i></span
            >

            <!--  calcSignClass(data['overview-realtime_perf_rate']) decimal2Percent()-->
            <span style="color: #ffffff"
              >同比:<i
                style="font-style: normal; color: #ffffff"
                :class="
                  data['overview-realtime_perf_rate'] > 0
                    ? 'rate-up-sel'
                    : 'rate-down-sel'
                "
                >{{
                  (data["overview-realtime_perf_rate"] * 100).toFixed(1) + "%"
                }}
              </i></span
            >
          </div>
          <div ref="chart" style="height: 30vw" :style="{'width':echarts_width+'px'}" class="swiper-no-swiping"></div>
        </div>
      </section>

        <!-- <van-notice-bar
        wrapable
        style="padding: 5px"
        :scrollable="false"
        color="rgba(245, 245, 245, 1)"
        background="rgba(245, 245, 245, 1)"
        text=""
      /> -->

      <section
        class="px10 py10"
        style="
          padding-top: 5px;
          padding-bottom: 5px;
          padding-left: 15px;
          padding-right: 15px;
        "
      >
        <!-- {{test_height}} -->
        <div class="section-title">经营指标</div>
      </section>
      <div style="border-bottom: 1px solid #eeeeee; height: 5px">
        <!-- 线来的 -->
      </div>
      <section
        class="px10 py10"
        style="
          padding-top: 5px;
          padding-left: 15px;
          padding-right: 15px;
          background-color: #ffffff;
        "
      >

        <!-- <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        > -->
        <!-- :style="swiping_css_all" -->
          <div class="wrapper">
            
              <swiper  ref="mySwiper_entry" :options="swiperOptions">
                <template> 

                  <swiper-slide style="background: #ffffff;">

                    <!-- 'display': 'inline-flex' -->
                      <div
                        class="wrapper_div1"
                        v-if="permissionList['SQL-overview-dev_amt']"
                        :style="list[0].display1?  { width: wrapper_con_width + 'px','display': 'inline-grid'}:{ width: wrapper_con_width + 'px','display': 'none'}"
                        
                      >
                        <span class="name" style="padding-left: 10px">
                          <!-- background-color: #eeeeff; -->
                          <i
                            style="
                              width: 20px;
                              height: 20px;
                              border-radius: 20px;
                              margin-top: 2px;
                            "
                          >
                            <i
                              style="margin-left: 5px; margin-top: 3px"
                              class="icontitle_1"
                            ></i>
                          </i>
                          <span style="line-height: 25px">发货业绩</span></span
                        >

                        <span
                          class="amount"
                          style="
                            padding-left: 15px;
                            font-size: 14px;
                            font-weight: bold;
                            color: #3c3c3c;
                          "
                        >
                          <!-- <i></i> -->
                          {{
                            (
                              (data["overview-dev_amt"] / 10000).toFixed(1) * 1
                            ).toLocaleString() + "万"
                          }}</span
                        >
                        <span
                          style="color: #a2a2a2; padding-left: 15px"
                          class="change-rate"
                        >
                          <!-- <span></span> -->
                          <!-- :class="calcSignClass(data['overview-dev_amt_rate'])" -->
                          同比：<i
                            style="font-style: normal"
                            
                            :class="
                              Number((data['overview-dev_amt_rate']||0)) > 0
                                ? 'rate-up'
                                : 'rate-down' 
                            "
                            >{{ ((data["overview-dev_amt_rate"]||0)*100).toFixed(1)+'%' }}</i
                          >
                        </span>
                      </div>


                      <div
                        class="wrapper_div2"
                        v-if="permissionList['SQL-overview-cg_amt_rate']"
                        style="margin-left: 0%; margin-right: 0%"
                        
                        :style="list[0].display1?  { width: wrapper_con_width + 'px','display': 'inline-grid'}:{ width: wrapper_con_width + 'px','display': 'none'}"
                      >
                        <span class="name" style="padding-left: 10px">
                          <!-- <i class="icontitle_2"></i> background-color: #eeeeff;-->
                          <i style="width: 20px; height: 20px; border-radius: 20px">
                            <i
                              style="margin-left: 4px; margin-top: 4px"
                              class="icontitle_2"
                            ></i>
                          </i>
                          <span style="line-height: 25px">采购毛利率</span>
                        </span>
                        <span
                          class="amount"
                          style="
                            padding-left: 15px;
                            font-size: 14px;
                            font-weight: bold;
                            color: #3c3c3c;
                          "
                        >
                          <!-- <i></i> -->
                          {{ (((data["overview-cg_amt_rate"]||0)*100).toFixed(2))+'%' }}</span
                        >
                        <span
                          style="color: #a2a2a2; padding-left: 15px"
                          class="change-rate"
                        >
                          <!-- <span></span> -->
                          <!-- :class="calcSignClass(data['overview-cg_tar_rate'])" -->
                          标杆：<i
                            style="font-style: normal"
                            :class="
                              Number((data['overview-cg_tar_rate']||0)) > 0
                                ? 'rate-up'
                                : 'rate-down' 
                            "
                            >{{ ((data["overview-cg_tar_rate"]||0)*100).toFixed(1)+'%' }}</i
                          >
                        </span>
                      </div>

                      <div
                        class="wrapper_div1"
                        v-if="permissionList['SQL-overview-cust_amt']"
                        :style="list[1].display2?  { width: wrapper_con_width + 'px','display': 'inline-grid'}:{ width: wrapper_con_width + 'px','display': 'none'}"
                      >
                        <span class="name" style="padding-left: 10px">
                          <!-- <i class="icontitle_3"></i> background-color: #eeeeff;-->
                          <i style="width: 20px; height: 20px; border-radius: 20px">
                            <i
                              style="margin-left: 4px; margin-top: 3px"
                              class="icontitle_3"
                            ></i>
                          </i>
                          <span style="line-height: 25px">客单价</span>
                        </span>
                        <span
                          class="amount"
                          style="
                            padding-left: 15px;
                            font-size: 14px;
                            font-weight: bold;
                            color: #3c3c3c;
                          "
                        >
                          <!-- <i></i> -->
                          {{ ((data["overview-cust_amt"]||0).toFixed(1)*1).toLocaleString() + "元" }}</span
                        >
                        <span
                          style="color: #a2a2a2; padding-left: 15px"
                          class="change-rate"
                        >
                          <!-- <span></span> -->
                          <!-- :class="calcSignClass(data['overview-cust_amt_rate'])" -->
                          同比：<i
                            style="font-style: normal"
                            :class="
                              Number((data['overview-cust_amt_rate']||0)) > 0
                                ? 'rate-up'
                                : 'rate-down' 
                            "
                            >{{ ((data["overview-cust_amt_rate"]||0)*100).toFixed(1)+'%' }}</i
                          >
                        </span>
                      </div>
                      <div
                        class="wrapper_div2"
                        v-if="permissionList['SQL-overview-new_product_amt']"  
                        :style="list[1].display2?  { width: wrapper_con_width + 'px','display': 'inline-grid'}:{ width: wrapper_con_width + 'px','display': 'none'}"
                      >
                        <span class="name" style="padding-left: 10px">
                          <!-- <i class="icontitle_4"></i> background-color: #eeeeff;-->
                          <i style="width: 20px; height: 20px; border-radius: 20px">
                            <i
                              style="margin-left: 4px; margin-top: 4px"
                              class="icontitle_4"
                            ></i>
                          </i>
                          <span style="line-height: 25px">新品业绩</span>
                        </span>
                        <span
                          class="amount"
                          style="
                            padding-left: 15px;
                            font-size: 14px;
                            font-weight: bold;
                            color: #3c3c3c;
                          "
                        >
                          <!-- <i></i> -->
                          {{
                            fomatMoney(
                              (data["overview-new_product_amt"] / 10000).toFixed(1)
                            ) + "万"
                          }}</span
                        >
                        <span
                          style="color: #a2a2a2; padding-left: 15px"
                          class="change-rate"
                        >
                          <!-- <span></span> -->
                          <!-- :class="calcSignClass(data['overview-new_product_amt_rate'])" -->
                          同比：<i
                            style="font-style: normal"
                            :class="
                              Number((data['overview-new_product_amt_rate']||0)) > 0
                                ? 'rate-up'
                                : 'rate-down' 
                            "
                            >{{
                              ((data["overview-new_product_amt_rate"]||0)*100).toFixed(1)+'%'
                            }}</i
                          >
                        </span>
                      </div>

                      <div
                        class="wrapper_div1"
                        v-if="permissionList['SQL-overview-short_amt']"
                        style="margin-left: 0%"
                        :style="list[2].display3?  { width: wrapper_con_width + 'px','display': 'inline-grid'}:{ width: wrapper_con_width + 'px','display': 'none'}"
                      >
                        <span class="name" style="padding-left: 10px">
                          <!-- <i class="icontitle_5"></i> background-color: #eeeeff;-->
                          <i style="width: 20px; height: 20px; border-radius: 20px">
                            <i
                              style="margin-left: 4px; margin-top: 4px"
                              class="icontitle_5"
                            ></i>
                          </i>
                          <span style="line-height: 25px">日均订单欠货</span>
                        </span>
                        <span
                          class="amount"
                          style="
                            padding-left: 15px;
                            font-size: 14px;
                            font-weight: bold;
                            color: #3c3c3c;
                          "
                        >
                          <!-- <i></i> -->
                          {{
                            fomatMoney(
                              (data["overview-short_amt"] / 10000).toFixed(1)
                            ) + "万"
                          }}</span
                        >
                        <span
                          style="color: #a2a2a2; padding-left: 15px"
                          class="change-rate"
                        >
                          <!-- <span></span> -->
                          同比：<i
                            style="font-style: normal"
                            :class="
                              Number((data['overview-short_amt_rate']||0)) > 0
                                ? 'rate-up_salesR'
                                : 'rate-down_salesR' 
                            "
                            >{{ ((data["overview-short_amt_rate"]||0)*100).toFixed(1)+'%' }}</i
                          >
                        </span>
                      </div>
                      <div
                        class="wrapper_div2"
                        v-if="permissionList['SQL-overview-shbl_rate']"
                        :style="list[2].display3?  { width: wrapper_con_width + 'px','display': 'inline-grid'}:{ width: wrapper_con_width + 'px','display': 'none'}"
                      >
                        <span class="name" style="padding-left: 10px">
                          <!-- <i class="icontitle_6"></i> background-color: #eeeeff;-->
                          <i style="width: 20px; height: 20px; border-radius: 20px">
                            <i
                              style="margin-left: 4px; margin-top: 5px"
                              class="icontitle_6"
                            ></i>
                          </i>
                          <span style="line-height: 25px">售后不良率</span>
                        </span>
                        <span
                          class="amount"
                          style="
                            padding-left: 15px;
                            font-size: 14px;
                            font-weight: bold;
                            color: #3c3c3c;
                          "
                        >
                          <!-- <i></i> -->
                          {{ ((data["overview-shbl_rate"]||0)*100).toFixed(2)+'%' }}</span
                        >
                        <span
                          style="color: #a2a2a2; padding-left: 15px"
                          class="change-rate"
                        >
                          <!-- <span></span> -->
                          同比：<i
                            style="font-style: normal"
                            :class="
                              Number((data['overview-shbl_yoy_rate']||0)) > 0
                                  ? 'rate-up_salesR'
                                  : 'rate-down_salesR'                   
                            "
                            >{{ ((data["overview-shbl_yoy_rate"]||0)*100).toFixed(1)+'%' }}</i
                          >
                        </span>
                      </div>
                      <div
                        class="wrapper_div1"
                        v-if="permissionList['SQL-overview-ka_reach_rate']"
                        :style="list[3].display4?  { width: wrapper_con_width + 'px','display': 'inline-grid'}:{ width: wrapper_con_width + 'px','display': 'none'}"
                      >
                        <span class="name" style="padding-left: 10px">
                          <!-- <i class="icontitle_7"></i> background-color: #eeeeff;-->
                          <i style="width: 20px; height: 20px; border-radius: 20px">
                            <i
                              style="margin-left: 4px; margin-top: 4px"
                              class="icontitle_7"
                            ></i>
                          </i>
                          <span style="line-height: 25px">KA达成</span>
                        </span>
                        <span
                          class="amount"
                          style="
                            padding-left: 15px;
                            font-size: 14px;
                            font-weight: bold;
                            color: #3c3c3c;
                          "
                        >
                          <!-- <i></i> -->
                          {{ ((data["overview-ka_reach_rate"]||0)*100).toFixed(2)+'%' }}</span
                        >
                        <span
                          style="color: #a2a2a2; padding-left: 15px"
                          class="change-rate"
                        >
                          <!-- <span></span> -->
                          <!-- :class="calcSignClass(data['overview-ka_reach_yoy_rate'])" -->
                          同比：<i
                            style="font-style: normal"
                            :class="
                              Number((data['overview-ka_reach_yoy_rate']||0)) > 0
                                  ? 'rate-up'
                                  : 'rate-down'                   
                            "
                            >{{ ((data["overview-ka_reach_yoy_rate"]||0)*100).toFixed(1)+'%' }}</i
                          >
                        </span>
                      </div>

                      <div
                        class="wrapper_div2"
                        v-if="permissionList['SQL-overview-visitors_cnt']"
                        style="margin-left: 0%; margin-right: 0%"
                        :style="list[3].display4?  { width: wrapper_con_width + 'px','display': 'inline-grid'}:{ width: wrapper_con_width + 'px','display': 'none'}"
                      >
                        <span class="name" style="padding-left: 10px">
                          <!-- <i class="icontitle_8"></i> background-color: #eeeeff;-->
                          <i style="width: 20px; height: 20px; border-radius: 20px">
                            <i
                              style="margin-left: 4px; margin-top: 4px"
                              class="icontitle_8"
                            ></i>
                          </i>
                          <span style="line-height: 25px">店铺访客</span>
                        </span>
                        <span
                          class="amount"
                          style="
                            padding-left: 15px;
                            font-size: 14px;
                            font-weight: bold;
                            color: #3c3c3c;
                          "
                        >
                          <!-- <i></i> -->
                          {{ fomatMoney((data["overview-visitors_cnt"]||0).toFixed(1)) }}</span
                        >
                        <span
                          style="color: #a2a2a2; padding-left: 15px"
                          class="change-rate"
                        >
                          <!-- <span></span> -->
                          <!-- :class="calcSignClass(data['overview-visitors_cnt_rate'])" -->
                          同比：<i
                            style="font-style: normal"
                            :class="
                              Number((data['overview-visitors_cnt_rate']||0)) > 0
                                  ? 'rate-up'
                                  : 'rate-down'                   
                            "
                            >{{ ((data["overview-visitors_cnt_rate"]||0)*100).toFixed(1)+'%' }}</i
                          >
                        </span>
                      </div>

                  </swiper-slide>


                  <swiper-slide style="background: ffffff;">

                      <div
                        class="wrapper_div1"
                        v-if="permissionList['SQL-overview-cancel_amt']"  
                        :style="list[4].display5?  { width: wrapper_con_width + 'px','display': 'inline-flex'}:{ width: wrapper_con_width + 'px','display': 'none'}"
                      >
                        <span class="name" style="padding-left: 10px">
                          <!-- <i class="icontitle_9"></i> background-color: #eeeeff;-->
                          <i style="width: 20px; height: 20px; border-radius: 20px">
                            <i
                              style="margin-left: 4px; margin-top: 4px"
                              class="icontitle_9"
                            ></i>
                          </i>
                          <span style="line-height: 25px">未发取消</span>
                        </span>
                        <span
                          class="amount"
                          style="
                            padding-left: 15px;
                            font-size: 14px;
                            font-weight: bold;
                            color: #3c3c3c;
                          "
                        >
                          <!-- <i></i> -->
                          {{
                            (
                              (data["overview-cancel_amt"] / 10000).toFixed(1) * 1
                            ).toLocaleString() + "万"
                          }}</span
                        >
                        <span
                          style="color: #a2a2a2; padding-left: 15px"
                          class="change-rate"
                        >
                          <!-- <span></span> -->
                          <!-- :class="calcSignClass(data['overview-cancel_amt_rate'])" -->
                          同比：<i
                            style="font-style: normal"
                            :class="
                              Number((data['overview-cancel_amt_rate']||0)) > 0
                                  ? 'rate-up'
                                  : 'rate-down'                   
                            "
                            >{{ ((data["overview-cancel_amt_rate"]||0)*100).toFixed(1)+'%' }}</i
                          >
                        </span>
                      </div>

                  </swiper-slide>



                  <!-- <swiper-slide style="background: ffffff;">
                    <div style="color:#000000" >cccccccccccccc</div>
                  </swiper-slide> --> 


                  <div class="swiper-pagination_new swiper-pagination-bullets_new" slot="pagination">
                    <div style="height: 4px;margin: 0 auto;" :style="(iphone_pd==true)? {'width':'30px'}:{'width':'22px'}">
                      <span 
                      :class="(swiper_pag===0)? (iphone_pd==true)? 'swiper-pagination-bullet-active_iphonex' :'swiper-pagination-bullet-active_new'
                      : (iphone_pd==true)? 'swiper-pagination-bullet_new_iphonex' :'swiper-pagination-bullet_new'"
                      :style="(iphone_pd==true)? (swiper_pag===0)?{'opacity':'1'}:{'opacity':'0.2'}:''"
                      
                      ></span>
                      
                      <span style="display:block;width: 6px;height: 4px;float: left;"></span>
                      <span 
                      :class="(swiper_pag===1)? (iphone_pd==true)? 'swiper-pagination-bullet-active_iphonex' :'swiper-pagination-bullet-active_new'
                      : (iphone_pd==true)? 'swiper-pagination-bullet_new_iphonex' :'swiper-pagination-bullet_new'"
                      :style="(iphone_pd==true)? (swiper_pag===1)?{'opacity':'1'}:{'opacity':'0.2'}:''"
                      ></span>                     
                    </div>

                    
                  </div><!--分页器。slot="pagination"如果放置在swiper-container外面，需要自定义样式。-->
                </template>
              </swiper>
        






          </div>
        <!-- </van-list> -->


      </section>

      <!-- @click="onLoad_more()" -->

      <div
        style="width: 100%; height: 40px; background: rgba(245, 245, 245, 1)"
      >
        <p
          style="
            text-align: center;
            margin: 0px;
            font-size: 14px;
            color: #cccccc;
            padding-top: 10px;
          "
        >
          {{ list[4].display5? '———— 已经见底了 ————':'加载更多'}}
        </p>
      </div>
    </van-pull-refresh>

    <div style="width: 100%; " :style="iphone_pd==true?{'height': (Bottom_Height_on+5)+'px'}:{'height': '50px'}"></div>
  </div>
</template>

<script>
/* eslint-disable */
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/line";
import "echarts/lib/component/legend";
import "echarts/lib/component/tooltip";

import { mapState } from "vuex";
import {
  decimal2Percent,
  thousands,
  calcSignClass,
  generatePromise,
} from "@/utils/helpers";

import { NoticeBar, PullRefresh, List, Cell,Loading } from "vant";

export default {
  name: "Entry",
  components: {
    [NoticeBar.name]: NoticeBar,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Cell.name]: Cell,
    [Loading.name]:Loading,
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
        // noSwipingSelector: "canvas",
        noSwipingClass: "test_addd",
        followFinger: false,
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true//修改swiper的父元素时，自动初始化swiper


        // pagination:'.swiper-pagination',
        // pagination:true,
        // paginationClickable:true,


        // pagination: {
        //   el: '.swiper-pagination',
        //   clickable: true,
        //   // type: "custom",
        // },


      },
      swiper_pag:0,

      swiping_css_all: {
        height: "1030px",
        overflow: "hidden",
        background: "rgb(245, 245, 245)",
      },

      count: 0,
      isLoading: false,

      count_list:0,

      Bottom_Height_on:0,
      list: [
        {display1: true},
        {display2: true},
        {display3: true},
        {display4: true},
        {display5: true},
        {display6: true},
        {display7: true},
        {display8: true},
      ],

      list_jishu:[],
      


      loading: false,
      finished: false,

      wrapper_con_width: "",
      echarts_width:'',

      chartOption: {
        grid: {
          left: "1%",
          top: "6%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },

        legend: {
          show:false,
          data: ["同期", "当期"],
          right: "3%",
          top: "0%",
          // bottom: "2%",
          textStyle: {
            fontSize: 12,
          },
          itemHeight: 4,
          itemWidth: 18,
          icon: "pie",
          formatter: function (name) {
            // console.log(name);
            return name;
          },
        },
        tooltip: {
          padding: [2, 5, 2, 5],
          trigger: "item",
          // extraCssText:'height:40px',
          // showDelay: 200,
          axisPointer: {
            // type : 'shadow',
            lineStyle: {
              // color: '#ddd'
              color: "#1F9FFB",
            },
            type: "cross",
            label: {
              color: "#000000",
              // backgroundColor: "#1678FF",
              backgroundColor: "aliceblue",
            },
          },
          backgroundColor: "rgba(22,120,255,0.2)",
          borderWidth: "1", //边框宽度设置1
          borderColor: "#E6E6E6", //设置边框颜色
          textStyle: {
            color: "#3C3C3C", //设置文字颜色
            top: "0px",
          },
          // formatter: function (params) {
          //   // console.log(params[0]);

          //   // _this.user_value=params[0].value;
          //   return (
          //     "时间：" +
          //     params[0].name * 1 +
          //     "h" +
          //     "<br/>" +
          //     "销额：" +
          //     params[0].value +
          //     "w"
          //   );
          // },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: "rgba(238, 238, 238, 0.6)",
              // color:'#1F9FFB'
              // color:'#C4C4C4'
              
            },
          },
          axisLabel: {
            // interval: 3
          },
        },
        yAxis: [
          {
            show: true,
            type: "value",
            splitLine: {
              show: true,
              lineStyle: { type: "dotted", color: "rgba(238, 238, 238, 0.1)" },
              // lineStyle: { type: "dotted", color: "#C4C4C4" },
            },
            axisLabel: {
              textStyle: {
                color: "rgba(238, 238, 238, 0.6)",
                // color:'#C4C4C4'
              },
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "当期",
            type: "line",
            showSymbol: false,
            smooth: true, //true 为平滑曲线，false为直线
            itemStyle: {
              normal: {
                // color: '#66ccff',
                // color: "#1678FF",
                color: "#ffffff",
                
                lineStyle: {
                  // color: '#66ccff'
                  // color: "#1678FF",
                  color: "#ffffff",
                },
                areaStyle: {
                  // color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  //   {
                  //     offset: 0,
                  //     // color: 'rgba(102, 204, 255, 0.35)'
                  //     color: "rgba(22,120,255,0.35)",
                  //   },
                  //   {
                  //     offset: 1,
                  //     // color: 'rgba(102, 204, 255, 1)'
                  //     color: "rgba(22,120,255,1)",
                  //   },
                  // ]),
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "rgba(102,204,255, 0.0)",
               
                    },
                    {
                      offset: 1,
                      // color: "rgba(6,69,165, 0.05)",
                      color: "rgba(102,204,255,0.0)",
                    },
                  ]),
                },
              },
            },
            data: [],
          },
          // {
          //   name: "同期",
          //   type: "line",
          //   showSymbol: false,
          //   smooth: true, //true 为平滑曲线，false为直线
          //   itemStyle: {
          //     normal: {
          //       // color: '#66ccff',
          //       // color: "#1678FF",
                
          //       // color: "#1678FF",
          //       color: "#23B0A8", 
          //       lineStyle: {
          //         // color: '#66ccff'
          //         // color: "#1678FF",
          //         color: "#23B0A8",
          //       },
          //       areaStyle: {
          //         // color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
          //         //   {
          //         //     offset: 0,
          //         //     // color: 'rgba(102, 204, 255, 0.35)'
          //         //     color: "rgba(22,120,255,0.35)",
          //         //   },
          //         //   {
          //         //     offset: 1,
          //         //     // color: 'rgba(102, 204, 255, 1)'
          //         //     color: "rgba(22,120,255,1)",
          //         //   },
          //         // ]),
          //         color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
          //           {
          //             offset: 0,
          //             // color: "rgba(6,69,165, 0.01)",
          //             color: "rgba(35,176,168, 0.01)",
                      
          //           },
          //           {
          //             offset: 1,
          //             // color: "rgba(6,69,165, 0.05)",
          //             color: "rgba(35,176,168, 1)",
          //           },
          //         ]),
          //       },
          //     },
          //   },
          //   data: [],
          // },

        ],
      },
      user_value: 25072,
      chartIns: null,
      data: {
        "overview-ka_reach_rate": "",
        "overview-ka_reach_yoy_rate": "",
        "overview-dev_amt": "",
        "overview-dev_amt_rate": "",
        "overview-cg_amt_rate": "",
        "overview-cg_tar_rate": "",
        "overview-cust_amt": "",
        "overview-cust_amt_rate": "",
        "overview-new_product_amt": "",
        "overview-new_product_amt_rate": "",
        "overview-cancel_amt": "",
        "overview-cancel_amt_rate": "",
        "overview-visitors_cnt": "",
        "overview-visitors_cnt_rate": "",
        "overview-shbl_rate": "",
        "overview-shbl_yoy_rate": "",
        "overview-short_amt": "",
        "overview-short_amt_rate": "",
        "overview-realtime_perf": "",
        "overview-realtime_perf_rate": "",
        "overview-realtime_perf_reach_rate": "",
        "overview-new_data":"",
        "overview-realtime_perf_hours": "",
      },
      data_loay:false,
      iphone_pd:false,

      test_height:'',
    };
  },
  computed: {
    ...mapState("user", ["permissionList"]),
  },
  created() {
    // this.wrapper_con_width = (window.innerWidth - 40) / 2;
    this.wrapper_con_width = (window.innerWidth - 30) / 2;
    this.echarts_width = (window.innerWidth - 30);

    // Bottom_Height_on  -40是钉钉的高度-34
    this.Bottom_Height_on=(screen.height-(177.4+29+5+383+40))-40-34;

    this.test_height=screen.height;
    console.log("===========首页得！！！！！！！！！！！！！===============")

    console.log(this.Bottom_Height_on);


    this.$EventBus.$emit("data_loay_set", {
      data_loay_seton: false,
    });


    const [p1, resolve1] = generatePromise();
    // this.p1 = p1;

    const [p2,resolve2]= generatePromise();
    this.p1= Promise.all([p1,p2]);


    const apiMap = {
      "SQL-overview-ka_reach_rate": { resultProp: "KA_REACH_RATE" },
      "SQL-overview-ka_reach_yoy_rate": { resultProp: "KA_REACH_YOY_RATE" },
      "SQL-overview-dev_amt_rate": { resultProp: "DEV_AMT_RATE" },
      "SQL-overview-dev_amt": { resultProp: "DEV_AMT" },
      "SQL-overview-cg_amt_rate": { resultProp: "CG_AMT_RATE" },
      "SQL-overview-cg_tar_rate": { resultProp: "CG_TAR_RATE" },
      "SQL-overview-cust_amt": { resultProp: "CUST_AMT" },
      "SQL-overview-cust_amt_rate": { resultProp: "CUST_AMT_RATE" },
      "SQL-overview-new_product_amt": { resultProp: "NEW_PRODUCT_AMT" },
      "SQL-overview-new_product_amt_rate": {
        resultProp: "NEW_PRODUCT_AMT_RATE",
      },
      "SQL-overview-cancel_amt": { resultProp: "CANCEL_AMT" },
      "SQL-overview-cancel_amt_rate": { resultProp: "CANCEL_AMT_RATE" },
      "SQL-overview-visitors_cnt": { resultProp: "VISITORS_CNT" },
      "SQL-overview-visitors_cnt_rate": { resultProp: "VISITORS_CNT_RATE" },
      "SQL-overview-shbl_rate": { resultProp: "SHBL_RATE" },
      "SQL-overview-shbl_yoy_rate": { resultProp: "SHBL_YOY_RATE" },
      "SQL-overview-short_amt": { resultProp: "SHORT_AMT" },
      "SQL-overview-short_amt_rate": { resultProp: "SHORT_AMT_RATE" },
      "SQL-overview-realtime_perf": { resultProp: "AMT" },
      "SQL-overview-realtime_perf_rate": { resultProp: "AGO_RATE" },
      "SQL-overview-realtime_perf_reach_rate": { resultProp: "AGO_RATE" },

      
      "SQL-overview-realtime_perf_hours": { type: Array, resolve2: resolve2 },
      "SQL-overview-new_data": { type: Array, resolve: resolve1 },
    };
    Object.keys(apiMap).forEach((key) => {
      if (this.permissionList[key]) {
        const [, prefix, interfaceName] = key.split("-");
        if (prefix && interfaceName) {
          this.$axios
            .post(`/api/admin/data/${prefix}/${interfaceName}/get`, {})

            .then(({ data }) => {

              // console.log(prefix+'-'+interfaceName);
              // console.log("=========================");
              // console.log(data[0]);

              if (apiMap[key].type === Array) {
                this.data[`${prefix}-${interfaceName}`] = data || [];
              } else {

                this.data[`${prefix}-${interfaceName}`] = (data[0] || {})[
                  apiMap[key].resultProp
                ];
              }
              if (apiMap[key].resolve) {
                apiMap[key].resolve();
                // this.data_loay=true;
                // console.log("加载完成！！！！！！！！！！！！！！！");
                // console.log(this.data_loay);
                this.$EventBus.$emit("data_loay_set", {
                  data_loay_seton: true,
                });
              }
              else if(apiMap[key].resolve2){
                apiMap[key].resolve2();
              }


            });
        }
      }
    });

    console.log(this.data);


  },
  mounted() {

    if(this.isIPhoneX()){
      this.iphone_pd=true;
    }else{
      this.iphone_pd=false;
    }
    console.log("entry mounted", Date.now());


    this.initChart();

    // 滑动的开始
    this.$refs['mySwiper_entry'].$swiper.on("slideChangeTransitionEnd", (swiper) => {
      const index = swiper.realIndex;
      console.log("这里是首页啊！！！！！  " + (index));
      this.swiper_pag=index;


    });
    // 滑动的结束


    this.chenSwiper(0);


  },
  methods: {

    onLoad_more(){

      console.log("============");
      this.list[4][`display${5}`]=true;
      // -14

      this.Bottom_Height_on=(screen.height-(177.4+29+5+475+40))-40+35;



    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {

        //display1
        let qqq=0;
        for (let i = 0; i < 1; i++) {
          // this.list.push(this.list.length + 1);
          // this.list[i][`display${i+1}`]=true;
          // console.log(this.list[i][`display${i+1}`])
          this.list_jishu.push(this.list_jishu.length + 1);

          console.log(i);
          qqq=this.count_list;
          this.list[qqq][`display${qqq+1}`]=true;

          console.log(this.list[qqq]);
          console.log(this.count_list);


          this.count_list++;

          
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        
        if (this.list_jishu.length>= 5) {
          this.finished = true;
        }
      }, 1000);
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


    onRefresh() {
      setTimeout(() => {
        // Toast('刷新成功');
        // 暂时还没用得上只是做个效果出来
        this.isLoading = false;
        this.count++;
      }, 1000);
    },



    initChart() {
      this.chartIns = echarts.init(this.$refs["chart"]);
      let _this = this;
      this.p1.then(() => {
        let data = this.data["overview-realtime_perf_hours"];

        // console.log("+++++++首页+++++++");
        // console.log(data);

        data = data.sort((a, b) => {
          return Number(a["TDATE_HOURS"]) - Number(b["TDATE_HOURS"]);
        });
        this.chartOption.xAxis.data = data.map(
          (item) => item["TDATE_HOURS"] * 1
        );
        this.chartOption.series[0].data = data.map((item) =>
          Number((item["AMT"] / 10000).toFixed(0))
        );


        // this.chartOption.series[1].data = data.map((item) =>
        //   Number((item["AGO_AMT"] / 10000).toFixed(0))
        // );

        this.chartOption.tooltip.formatter = function (params) {
          // _this.user_value=params[0].value;
          // return (
          //   "时间：" +
          //   params[0].name * 1 +
          //   "h" +
          //   "<br/>" +
          //   "销额：" +
          //   params[0].value +
          //   "w"
          // );
        };

        this.chartOption.tooltip.axisPointer.label.formatter = function (
          params
        ) {
          // console.log(params);
          // let test=0;

          if (params["axisDimension"] == "x") {
            // console.log(params["seriesData"][0]["value"])
            _this.user_value = params["seriesData"][0]["value"];
            // test=params["seriesData"][0]["value"];
          } else {
            _this.user_value = _this.user_value;
          }

          if (params["axisDimension"] == "x") {
            return params["value"];
          } else if (params["axisDimension"] == "y") {
            return _this.user_value;
          }
        };

        console.log(this.chartOption.series[0].data);
        this.chartIns.setOption(this.chartOption);
      });
    },

    fomatMoney(num) {
      num = num + '';
      if (!num.includes('.')) {
          num += '.'
      }
      return num.replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
          return $1 + ',';
      }).replace(/\.$/, '');

    },



    decimal2Percent,
    calcSignClass,
    thousands,

    chenSwiper(value){
      this.$refs['mySwiper_entry'].$swiper.slideTo(value,0,false)
    },


  },





};
</script>

<style scoped lang="scss">
.section-title {
  font-size: 14px;

  font-weight: bold;
}

.change-rate {
  font-size: 12px;
  color: #666;
}


                                        
/deep/ .change-rate i.rate-up_salesR:after {
  right: -11px;
}

/deep/ .change-rate i.rate-down_salesR:after {
  right: -11px;
}


.chart-desc {
  display: flex;
  justify-content: flex-start;
  align-items: baseline;

  > span {
    font-size: 12px;
    // padding: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    // padding-right: 10px;
  }

  > span:first-child {
    font-size: 18px;
    // font-weight: bold;
  }
}

.wrapper {
  display: flex;
  flex-wrap: wrap;
  font-size: 13px;

  //  > 
  // > div{
  //   display: flex;
  //   flex-flow: column;
  //   // width: 50%;
  //   // padding: 2px 0 2px 30px;
  //   // padding: 5px 0 5px 15px;
  //   // width: 32%;

  //   // box-shadow: 1px 1px 1px #eeeeee;

  //   // padding-top: 10px;
  //   // padding-bottom: 10px;
  //   padding-top: 15px;
  //   padding-bottom: 15px;
  //   // margin-top: 10px;
    
  //   border: 1px solid #e6e6e6;
  //   border-top: 0px;
  //   border-left: 0px;
  //   border-right: 0px;
  //   // border-radius: 4px;
  //   background-color: #ffffff;



  //   .name {
  //     color: #333;
  //   }

  //   .amount {
  //     // font-size: 15px;
  //     font-size: 12px;
  //     line-height: 20px;
  //     height: 20px;
  //     // font-weight: bold;
  //   }
  // }

  // > div.wrapper_div1 {
  //   // margin-right: 10px;
  //   margin-right: 0px;
  //   border-right: 1px solid #e6e6e6;
  // }
}

.wrapper_div2,.wrapper_div1 {
    display: flex;
    flex-flow: column;
    // width: 50%;
    // padding: 2px 0 2px 30px;
    // padding: 5px 0 5px 15px;
    // width: 32%;

    // box-shadow: 1px 1px 1px #eeeeee;

    // padding-top: 10px;
    // padding-bottom: 10px;
    padding-top: 15px;
    padding-bottom: 15px;
    // margin-top: 10px;
    
    border: 1px solid rgba(230,230,230,0.3);
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    // border-radius: 4px;
    background-color: #ffffff;



    .name {
      color: #333;
    }

    .amount {
      // font-size: 15px;
      font-size: 12px;
      line-height: 20px;
      height: 20px;
      // font-weight: bold;
    }
}

div.wrapper_div1 {
  // margin-right: 10px;
  margin-right: 0px;
  border-right: 1px solid rgba(230,230,230,0.3);
}


.wrapper div .name i {
  // width: 17px;
  // height: 17px;
  display: block;
  float: left;
  // margin-right: 6px;
  margin-right: 4px;
}

.wrapper div .amount i {
  // background: url("~@/assets/images/icon/num2.png") no-repeat left top/cover;
  width: 17px;
  height: 17px;
  display: block;
  float: left;
  margin-right: 12px;
}

.wrapper div .change-rate span {
  // background: url("~@/assets/images/icon/num2.png") no-repeat left top/cover;
  width: 17px;
  height: 17px;
  display: block;
  float: left;
  margin-right: 12px;
}

.wrapper div .name .icontitle_1 {
  background: url("~@/assets/images/icon/num2.png") no-repeat left top/cover;
  // width: 15px;
  // height: 20px;
  width: 11px;
  height: 14px;
}
.wrapper div .name .icontitle_2 {
  background: url("~@/assets/images/icon/num3.png") no-repeat left top/cover;
  // width: 17px;
  // height: 17px;
  width: 13px;
  height: 12px;
}
.wrapper div .name .icontitle_3 {
  background: url("~@/assets/images/icon/num8.png") no-repeat left top/cover;
  // width: 17px;
  // height: 17px;
  width: 12px;
  height: 12px;
}
.wrapper div .name .icontitle_4 {
  background: url("~@/assets/images/icon/num6.png") no-repeat left top/cover;
  // width: 17px;
  // height: 17px;
  width: 12px;
  height: 12px;
}
.wrapper div .name .icontitle_5 {
  background: url("~@/assets/images/icon/num5.png") no-repeat left top/cover;
  // width: 17px;
  // height: 17px;
  width: 12px;
  height: 11px;
}
.wrapper div .name .icontitle_6 {
  background: url("~@/assets/images/icon/num7.png") no-repeat left top/cover;
  // width: 18px;
  // height: 16px;
  width: 13px;
  height: 11px;
}
.wrapper div .name .icontitle_7 {
  background: url("~@/assets/images/icon/num4.png") no-repeat left top/cover;
  // width: 17px;
  // height: 17px;
  width: 12px;
  height: 12px;
}
.wrapper div .name .icontitle_8 {
  background: url("~@/assets/images/icon/num1.png") no-repeat left top/cover;
  // width: 15px;
  // height: 17px;
  width: 11px;
  height: 12px;
}
.wrapper div .name .icontitle_9 {
  background: url("~@/assets/images/icon/num15.png") no-repeat left top/cover;
  // width: 17px;
  // height: 16px;
  width: 12px;
  height: 12px;
}


.swiper-pagination-bullet_new {
    width: 4px;
    height: 4px;
    display: block;
    border-radius: 100%;
    background: #000;
    opacity: 0.2;
    z-index: 2;
    float: left;
}

.swiper-pagination-bullet_new_iphonex {
    width: 12px;
    height: 4px;
    display: block;
    border-radius: 2px;
    background: #000;
    opacity: 0.2;
    z-index: 2;
    float: left;
}


.swiper-pagination-bullet-active_new{
  background: #23B0A8;
  border-radius: 2px;
  width: 12px;
  height: 4px;
  transition:width 0.05s;
  -moz-transition:width 0.05s; /* Firefox 4 */
  -webkit-transition:width 0.05s; /* Safari and Chrome */
  -o-transition:width 0.05s; /* Opera */
  opacity: 1;
  display: block;
  z-index: 10;
  float: left;

}

.swiper-pagination-bullet-active_iphonex{
  background: #23B0A8;
  border-radius: 2px;
  width: 12px;
  height: 4px;
  // opacity: 1;
  z-index: 999;
  display: block;
  z-index: 10;
  float: left;
  
  // transition:width 0.05s;
  // -moz-transition:width 0.05s; /* Firefox 4 */
  // -webkit-transition:width 0.05s; /* Safari and Chrome */
  // -o-transition:width 0.05s; /* Opera */

}

.swiper-pagination-bullets_new{
  bottom: 25px;
  margin-top: 15px;

  // bottom: 10px;
  left: 0;
  width: 100%;

}

.swiper-pagination_new{
  position: inherit;
  text-align: center;
  // transition: 300ms opacity;
  // transform: translate3d(0, 0, 0);
  // z-index: 10;
  z-index: 1;
}

// .swiper-pagination_new span{
//   // padding-left: 3px;
//   // padding-right: 3px;
//   margin-left: 3px;
//   margin-right: 3px;

// }

// .swiper-pagination-bullet{
//   width: 4px;
//   height: 4px;

// }





</style>
