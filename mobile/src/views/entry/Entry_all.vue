<template>
  <div style="background-color: #ffffff;">
    <div :style="{backgroundImage:`url(${orgBackground})`}">


      <van-pull-refresh v-model="isLoading"  @refresh="onRefresh">


      <!-- 下拉提示，通过 scale 实现一个缩放效果 :head-height="40"-->
      <!-- <template #pulling="props">
        <img
          class="doge"
          :src="shouye_img"
          :style="{ transform: `scale(${props.distance / 40})` }"
        />
      </template>
      <template #loosing>
        <img class="doge" :src="shouye_img" />
      </template>
      <template #loading>
        <img class="doge" :src="shouye_img" />
      </template> -->



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
              style="padding-top: 5px; padding-bottom: 0px"
            >

              <div style="width: 40%;display: flex;">
                <div
                  class="section-title"
                  style="color: #ffffff; padding-left: 5px"
                >
                  实时业绩
                </div>
                <span style="color: #ffffff; font-size: 14px; padding-left: 5px">{{
                  "￥" +(((data["overview-realtime_perf"] / 10000)>9999)?fomatMoney((data["overview-realtime_perf"] / 100000000).toFixed(2)) + "亿"
                  :fomatMoney((data["overview-realtime_perf"] / 10000).toFixed(0)) + "万") 
                }}</span>                
              </div>



              <!-- <div style="width: 50%;display: flex;"></div> -->
              <!--  calcSignClass(data['overview-realtime_perf_rate']) decimal2Percent()-->
              <!-- <div style="width: 60%;display: flex;justify-content:flex-end;align-items: inherit;padding-right: 15px; font-size: 12px;"> -->
              <div style="width: 60%;display: flex;justify-content:flex-end;align-items: inherit;padding-right: 0px; font-size: 12px;">



                <span style="color: rgba(255, 255, 255,0.7);">日同比：</span>
                <span style="color: rgba(255, 255, 255,1);padding-right: 15px;"
                  :class="
                    data['overview-realtime_perf_rate'] > 0
                      ? 'rate-up-sel'
                      : 'rate-down-sel'
                  "
                >
                  {{
                    ((data["overview-realtime_perf_rate"] * 100)>999.9999)?'>1000%'
                    :((data["overview-realtime_perf_rate"] * 100) > (-999.9999))?
                    (data["overview-realtime_perf_rate"] * 100).toFixed(1) + "%"
                    :'&lt;-1000%'
                  }}
                </span>   


                <span style="color: rgba(255, 255, 255,0.7);">完成率：</span>
                <span style="padding-right: 5px;color: rgba(255, 255, 255,1);">
                  {{
                    (data["overview-realtime_perf_reach_rate"] * 100).toFixed(1) +
                    "%"
                  }}
                </span>


                              
              </div>




            </div>



            <div
              class="chart-desc2"
              style="padding-top: 5px; padding-bottom: 10px;justify-content:flex-end"
            >

              <!-- rgb(230, 230, 230, 0.8) -->
              <!-- 同期当期图例开始 -->
              <div style="width: 50%;display: flex;justify-content:flex-end;align-items: inherit;padding-right: 5px; font-size: 12px;">
              <!-- <div style="width: 100%;display: flex;justify-content:end;align-items: inherit;padding-left: 5px; font-size: 12px;"> -->
                <!-- <div style="width: 50%;height: 1px;display: block;border-bottom: 1px dashed #ffffff;"></div> -->
                <span style="width: 12px;margin-right: 5px;height: 5px;border-top: 1px solid #ffffff;"></span>
                <span style="padding-right: 15px;color: rgba(255, 255, 255,0.7);">同期</span>
                <span style="width: 8px;margin-right: 5px;height: 8px;background-color: rgba(255, 255, 255,0.9);border-radius: 3px;"></span>
                <span style="color: rgba(255, 255, 255,0.7);">当期</span>
              </div>
              <!-- 同期当期图例结束 -->            


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

        <!-- padding-top: 5px; background-color: #ffffff;-->
        <section
          class="px10 py10"
          style="
            padding-top: 0px;
            padding-left: 15px;
            padding-right: 15px;
            
          "
        >

          <!-- <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          > -->
          <!-- :style="swiping_css_all" style="background: #ffffff;"-->
            <div class="wrapper">
              
                <swiper  ref="mySwiper_entry" :options="swiperOptions">
                  <template> 

                    <swiper-slide >

                      <!-- 'display': 'inline-flex' -->
                        <div
                          class="wrapper_div1"
                          v-if="permissionList['SQL-overview-new_data']"
                          :style="list[0].display1?  { width: wrapper_con_width + 'px','display': 'inline-grid'}:{ width: wrapper_con_width + 'px','display': 'none'}"
                          @click="JumpToPageFun('支付业绩')"
                          @touchstart="LineVal.boonval = true" @touchend="LineVal.boonval = false"
                        >
                          <span class="name" :class="'padding_10px'">
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
                            <span style="line-height: 25px">支付业绩</span> 
                            <div style="float: right;border-radius: 6px;" :style="(LineVal.boonval==false)?LineVal.cssn:LineVal.cssy">
                              <van-icon name="arrow" size="14" color="#A9A9A9" style="margin-top: 5px;margin-bottom: 5px;margin-left: 10px;float: right;margin-right: 10px;" />
                            </div>

                          </span>

                          <span
                            class="amount"
                            style="
                              font-size: 14px;
                              font-weight: bold;
                              color: #3c3c3c;
                            "
                            :class="'padding_15px'"
                          >
                            <!-- <i></i>data["overview-new_data"][0].MTD_SALE_AMT|| data['overview-new_data'][0].AGO_PAY_AMT_RATE||  data["overview-new_data"][0].AGO_PAY_AMT_RATE||-->
                            {{
                              fomatMoney(
                                ((set_data_value.MTD_SALE_AMT||0) / 10000).toFixed(1)
                              ) + "万"
                            }} <b style="font-weight: normal;font-size: 12px;color: rgb(162, 162, 162);">(全司)</b></span
                          >

                          <span
                            style="color: #a2a2a2;"
                            class="change-rate"
                            :class="'padding_15px'"
                          >
                            <!-- <span></span> -->
                            <!-- :class="calcSignClass(data['overview-dev_amt_rate'])" -->
                            累计同比：
                            <!-- <i style="font-style: normal" >{{ ((set_data_value.PAY_AMT_RATE||0)*100).toFixed(1)+'%' }}</i> -->
                            <i style="font-style: normal" :class="Number((set_data_value.AGO_PAY_AMT_RATE||0)) > 0? 'rate-up': 'rate-down' ">
                              {{ ((set_data_value.AGO_PAY_AMT_RATE||0)*100).toFixed(1)+'%' }}
                            </i>

                          </span>


                          <span
                            class="amount"
                            style="
                              font-size: 14px;
                              font-weight: bold;
                              color: #3c3c3c;
                              padding-top: 4px;
                              height: 19px;
                            "
                            :class="'padding_15px'"
                          >
                            <!-- <i></i>data["overview-new_data"][0].MTD_SALE_AMT|| data['overview-new_data'][0].AGO_PAY_AMT_RATE||  data["overview-new_data"][0].AGO_PAY_AMT_RATE||-->
                            {{
                              fomatMoney(
                                ((set_data_value.MTD_QZ_PAY_AMT||0) / 10000).toFixed(1)
                              ) + "万"
                            }} <b style="font-weight: normal;font-size: 12px;color: rgb(162, 162, 162);">(全中)</b></span
                          >


                          <span
                            style="color: #a2a2a2;"
                            class="change-rate"
                            :class="'padding_15px'"
                          >
                            <!-- <span></span> -->
                            <!-- :class="calcSignClass(data['overview-dev_amt_rate'])" -->
                            日累计达成率：
                            <i style="font-style: normal" 
                              :style="(set_data_value.MTD_QZ_PAY_RATE||0)>1?{color: '#ff4d4f'}:{color: '#008000'}"
                            >{{ ((set_data_value.MTD_QZ_PAY_RATE||0)*100).toFixed(1)+'%' }}</i>

                          </span>

                        </div>


                        <div
                          class="wrapper_div2"
                          v-if="permissionList['SQL-overview-new_data']"
                          :style="list[1].display2?  { width: wrapper_con_width + 'px','display': 'inline-grid'}:{ width: wrapper_con_width + 'px','display': 'none'}"
                          @click="JumpToPageFun('发货业绩')"
                          @touchstart="LineVal.boonval2 = true" @touchend="LineVal.boonval2 = false"
                        >
                          <span class="name" :class="'padding_10px'">
                            <!-- <i class="icontitle_3"></i> background-color: #eeeeff;-->
                            <i style="width: 20px; height: 20px; border-radius: 20px">
                              <i
                                style="margin-left: 4px; margin-top: 4px"
                                class="icontitle_3"
                              ></i>
                            </i>
                            <span style="line-height: 25px">发货业绩</span>
                            <!-- <van-icon name="upgrade" size="16" color="#C0C0C0" style="margin-top: 5px;float: right;margin-right: 10px;" /> -->
                            <div style="float: right;border-radius: 6px;" :style="(LineVal.boonval2==false)?LineVal.cssn:LineVal.cssy">
                              <van-icon name="arrow" size="14" color="#A9A9A9" style="margin-top: 5px;margin-bottom: 5px;margin-left: 10px;float: right;margin-right: 10px;" />                              
                            </div>
                          </span>
                          <span
                            class="amount"
                            style="
                              font-size: 14px;
                              font-weight: bold;
                              color: #3c3c3c;
                            "
                            :class="'padding_15px'"
                          >
                            <!-- <i></i> -->
                            {{ fomatMoney(((set_data_value.DLVRED_AMT||0)/10000).toFixed(1)) + "万" }}
                            <b style="font-weight: normal;font-size: 12px;color: rgb(162, 162, 162);">(全司)</b></span
                          >

                          <span
                            style="color: #a2a2a2;"
                            class="change-rate"
                            :class="'padding_15px'"
                          >
                            <!-- <span></span> -->
                            <!-- :class="calcSignClass(data['overview-cust_amt_rate'])" -->
                            累计同比：

                            <i
                              style="font-style: normal"
                              :class="
                                Number((set_data_value.AGO_DEV_AMT_RATE||0)) > 0
                                  ? 'rate-up'
                                  : 'rate-down' 
                              "
                              >{{ 
                                ((set_data_value.AGO_DEV_AMT_RATE||0)*100)>999?
                                (((set_data_value.AGO_DEV_AMT_RATE||0)/10000)*100).toFixed(1)+'w%' 
                                :((set_data_value.AGO_DEV_AMT_RATE||0)*100).toFixed(1)+'%' 
                                }}</i
                            >

                          </span>


                          <span
                            class="amount"
                            style="
                              font-size: 14px;
                              font-weight: bold;
                              color: #3c3c3c;
                              padding-top: 4px;
                              height: 19px;
                            "
                            :class="'padding_15px'"
                          >
                            <!-- <i></i> -->
                            {{ fomatMoney(((set_data_value.MTD_QZ_DEV_AMT||0)/10000).toFixed(1)) + "万" }}
                            <b style="font-weight: normal;font-size: 12px;color: rgb(162, 162, 162);">(全中)</b></span
                          >

                          <span
                            style="color: #a2a2a2;"
                            class="change-rate"
                            :class="'padding_15px'"
                          >
                            <!-- <span></span> -->
                            <!-- :class="calcSignClass(data['overview-cust_amt_rate'])" -->
                            日累计达成率：
                            <i style="font-style: normal"
                              :style="(set_data_value.MTD_QZ_DEV_RATE||0)>1?{color: '#ff4d4f'}:{color: '#008000'}"
                            
                            >{{ ((set_data_value.MTD_QZ_DEV_RATE||0)*100).toFixed(1)+'%' }}</i>

                          </span>
                        </div>




                        <div
                          class="wrapper_div1"
                          v-if="permissionList['SQL-FS_YY_WF-AMT_MONTH']||permissionList['SQL-FS_YY_WF-SALE_RATE_MONTH']||permissionList['SQL-FS_YY_WF-AGO_RATE_MONTH']"
                          style="margin-left: 0%; margin-right: 0%"
                          
                          :style="list[0].display1?  { width: wrapper_con_width + 'px','display': 'inline-grid'}:{ width: wrapper_con_width + 'px','display': 'none'}"
                          @click="JumpToPageFun('未发取消')"
                          @touchstart="LineVal.boonval3 = true" @touchend="LineVal.boonval3 = false"
                        >
                          <span class="name" :class="'padding_10px'">
                            <!-- <i class="icontitle_2"></i> background-color: #eeeeff;-->
                            <i style="width: 20px; height: 20px; border-radius: 20px">
                              <i
                                style="margin-left: 4px; margin-top: 4px"
                                class="icontitle_2"
                              ></i>
                            </i>
                            <span style="line-height: 25px">未发取消</span>
                            <!-- <van-icon name="upgrade" size="16" color="#23B0A8" style="margin-top: 5px;float: right;margin-right: 10px;" /> -->
                            <div style="float: right;border-radius: 6px;" :style="(LineVal.boonval3==false)?LineVal.cssn:LineVal.cssy">
                              <van-icon name="arrow" size="14" color="#A9A9A9" style="margin-top: 5px;margin-bottom: 5px;margin-left: 10px;float: right;margin-right: 10px;" />                              
                            </div>
                          </span>
                          <span
                            class="amount"
                            style="
                              font-size: 14px;
                              font-weight: bold;
                              color: #3c3c3c;
                            "
                            :class="'padding_15px'"
                          >
                            <!-- <i></i> -->

                            {{ fomatMoney(((this.cancel_data.amt.MTD_RE_AMT||0)/10000).toFixed(1))+'万' }}</span
                          >

                          <span
                            style="color: #a2a2a2;"
                            class="change-rate"
                            :class="'padding_15px'"
                          >
                            <!-- <span></span> -->
                            <!-- :class="calcSignClass(data['overview-cg_tar_rate'])" -->
                            占销售比：<i
                              style="font-style: normal" 
                              

                              >{{ ((this.cancel_data.arte.MTD_RATE_RE_AMT||0)*100).toFixed(1)+'%' }}</i
                            >
                          </span>

                          <span
                            style="color: #a2a2a2;"
                            class="change-rate"
                            :class="'padding_15px'"
                          >
                            <!-- <span></span> -->
                            <!-- :class="calcSignClass(data['overview-cg_tar_rate'])" 累计同比MTD_RATE_DIFF-->
                            同期差值：<i
                              style="font-style: normal"
                              :class="
                                Number((this.cancel_data.ago_amt.MTD_RATE_DIFF||0)) > 0
                                  ? 'rate-up_salesR'
                                  : 'rate-down_salesR'  
                              "
                              >{{ ((this.cancel_data.ago_amt.MTD_RATE_DIFF||0)*100).toFixed(1)+'%' }}</i
                            >
                          </span>
                        </div>

 

                        <div
                          class="wrapper_div2"
                          v-if="permissionList['SQL-overview-new_data']"  
                          :style="list[1].display2?  { width: wrapper_con_width + 'px','display': 'inline-grid'}:{ width: wrapper_con_width + 'px','display': 'none'}"
                          @click="JumpToPageFun('采购毛利率')"
                          @touchstart="LineVal.boonval4 = true" @touchend="LineVal.boonval4 = false"
                        >
                          <span class="name" :class="'padding_10px'">
                            <!-- <i class="icontitle_4"></i> background-color: #eeeeff;-->
                            <i style="width: 20px; height: 20px; border-radius: 20px">
                              <i
                                style="margin-left: 4px; margin-top: 4px"
                                class="icontitle_4"
                              ></i>
                            </i>
                            <span style="line-height: 25px">采购毛利率</span>
                            <!-- <van-icon name="upgrade" size="16" color="#23B0A8" style="margin-top: 5px;float: right;margin-right: 10px;" /> -->
                            <div style="float: right;border-radius: 6px;" :style="(LineVal.boonval4==false)?LineVal.cssn:LineVal.cssy">
                              <van-icon name="arrow" size="14" color="#A9A9A9" style="margin-top: 5px;margin-bottom: 5px;margin-left: 10px;float: right;margin-right: 10px;" />                              
                            </div>
                          </span>
                          <span
                            class="amount"
                            style="
                              font-size: 14px;
                              font-weight: bold;
                              color: #3c3c3c;
                            "
                            :class="'padding_15px'"
                          >
                            <!-- <i></i> -->
                            {{
                              fomatMoney(
                                ((set_data_value.MTD_LCK_CG_AMT_RATE||0) *100).toFixed(1)
                              ) + "%"
                            }}</span
                          >

                          <span
                            style="color: #a2a2a2;"
                            class="change-rate"
                            :class="'padding_15px'"
                          >
                            <!-- <span></span> -->
                            <!-- :class="calcSignClass(data['overview-new_product_amt_rate'])" -->
                            标杆值：<i
                              style="font-style: normal"

                              >{{
                                ((set_data_value.LCK_CG_TAR_RATE||0)*100).toFixed(1)+'%'
                              }}</i
                            >
                          </span>

                          <span
                            style="color: #a2a2a2;"
                            class="change-rate"
                            :class="'padding_15px'"
                          >
                            <!-- <span></span> -->
                            <!-- :class="calcSignClass(data['overview-new_product_amt_rate'])" -->
                            差值占比：<i
                              style="font-style: normal"
                              :class="
                                Number((set_data_value.MTD_LCK_CG_AMT_RATE1||0)) > 0
                                  ? 'rate-up'
                                  : 'rate-down' 
                              "
                              >{{
                                ((set_data_value.MTD_LCK_CG_AMT_RATE1||0)*100).toFixed(1)+'%'
                              }}</i
                            >
                          </span>
                        </div>

                        <div
                          class="wrapper_div1"
                          v-if="permissionList['SQL-overview-new_data']"
                          style="margin-left: 0%"
                          :style="list[2].display3?  { width: wrapper_con_width + 'px','display': 'inline-grid'}:{ width: wrapper_con_width + 'px','display': 'none'}"
                          @click="JumpToPageFun('B店流量')"
                          @touchstart="LineVal.boonval5 = true" @touchend="LineVal.boonval5 = false"
                        >
                          <span class="name" :class="'padding_10px'">
                            <!-- <i class="icontitle_5"></i> background-color: #eeeeff;-->
                            <i style="width: 20px; height: 20px; border-radius: 20px">
                              <i
                                style="margin-left: 4px; margin-top: 6px"
                                class="icontitle_5"
                              ></i>
                            </i>
                            <span style="line-height: 25px">B店流量</span>
                            <!-- <van-icon name="upgrade" size="16" color="#23B0A8" style="margin-top: 5px;float: right;margin-right: 10px;" /> -->
                            <div style="float: right;border-radius: 6px;" :style="(LineVal.boonval5==false)?LineVal.cssn:LineVal.cssy">
                              <van-icon name="arrow" size="14" color="#A9A9A9" style="margin-top: 5px;margin-bottom: 5px;margin-left: 10px;float: right;margin-right: 10px;" />                              
                            </div>
                          </span>
                          <span
                            class="amount"
                            style="
                              font-size: 14px;
                              font-weight: bold;
                              color: #3c3c3c;
                            "
                            :class="'padding_15px'"
                          >
                            <!-- <i></i> -->
                            {{
                              fomatMoney(
                                ( (set_data_value.VISITORS||0)/ 10000).toFixed(1)
                              ) + "万"
                            }}</span
                          >

                          <span
                            style="color: #a2a2a2;"
                            class="change-rate"
                            :class="'padding_15px'"
                          >
                            <!-- <span></span> --> 
                            同期：<i
                              style="font-style: normal"

                              >{{ ((set_data_value.AGO_VISITORS||0)/10000).toFixed(1)+'万' }}</i
                            >
                          </span>

                          <span
                            style="color: #a2a2a2;"
                            class="change-rate"
                            :class="'padding_15px'"
                          >
                            <!-- <span></span> --> 
                            累计同比：<i
                              style="font-style: normal"
                              :class="
                                Number((set_data_value.VISITORS_RATE||0)) > 0
                                  ? 'rate-up'
                                  : 'rate-down' 
                              "
                              >{{ ((set_data_value.VISITORS_RATE||0)*100).toFixed(1)+'%' }}</i
                            >
                          </span>
                        </div>


                        <!-- 2021-01-09 新加sku值来 -->
                        <div
                          class="wrapper_div2"
                          v-if="permissionList['SQL-pds_dlvr-sku_avg_amt']"
                          :style="list[2].display3?  { width: wrapper_con_width + 'px','display': 'inline-grid'}:{ width: wrapper_con_width + 'px','display': 'none'}"
                          @click="JumpToPageFun('SKU均值')"
                          @touchstart="LineVal.boonval6 = true" @touchend="LineVal.boonval6 = false"
                        >
                          <span class="name" :class="'padding_10px'">
                            <!-- <i class="icontitle_6"></i> background-color: #eeeeff;-->
                            <i style="width: 20px; height: 20px; border-radius: 20px">
                              <i
                                style="margin-left: 4px; margin-top: 5px"
                                class="icontitle_6"
                              ></i>
                            </i>
                            <span style="line-height: 25px">SKU均值</span>
                            <!-- <van-icon name="upgrade" size="16" color="#23B0A8" style="margin-top: 5px;float: right;margin-right: 10px;" /> -->
                            <div style="float: right;border-radius: 6px;" :style="(LineVal.boonval6==false)?LineVal.cssn:LineVal.cssy">
                              <van-icon name="arrow" size="14" color="#A9A9A9" style="margin-top: 5px;margin-bottom: 5px;margin-left: 10px;float: right;margin-right: 10px;" />                              
                            </div>
                          </span>
                          <span
                            class="amount"
                            style="
                              font-size: 14px;
                              font-weight: bold;
                              color: #3c3c3c;
                            "
                            :class="'padding_15px'"
                          >
                            <!-- <i></i> -->  
                            {{ ((set_sku_value.SKU_AVG_AMT||0)/10000).toFixed(1)+'万' }}
                            </span
                          >

                          <span
                            style="color: #a2a2a2;"
                            class="change-rate"
                            :class="'padding_15px'"
                          >
                            <!-- <span></span> -->
                            同期：<i
                              style="font-style: normal"

                              >{{ ((set_sku_value.SKU_AVG_AMT_AGO||0)/10000).toFixed(1)+'万' }}</i
                            >
                          </span>
                          <!-- {{ ((||0)*100).toFixed(1)+'%' }} -->

                          <span
                            style="color: #a2a2a2;"
                            class="change-rate"
                            :class="'padding_15px'"
                          >
                            <!-- <span></span> set_data_value.AGO_MTD_AFS_AMT_RATE-->
                            累计同比：<i
                              style="font-style: normal"
                              :class="
                                Number((set_sku_value.SKU_AVG_AMT_YOY||0)) > 0
                                    ? 'rate-up'
                                    : 'rate-down'                   
                              "
                              >{{ ((set_sku_value.SKU_AVG_AMT_YOY||0)*100).toFixed(1)+'%' }}</i
                            >
                          </span>
                        </div>
                        <!-- 2021-01-09 新加sku值来 -->



                        <div
                          class="wrapper_div1"
                          v-if="permissionList['SQL-overview-new_data']"
                          :style="list[2].display3?  { width: wrapper_con_width + 'px','display': 'inline-grid'}:{ width: wrapper_con_width + 'px','display': 'none'}"
                        >
                          <span class="name" :class="'padding_10px'">
                            <!-- <i class="icontitle_6"></i> background-color: #eeeeff;-->
                            <i style="width: 20px; height: 20px; border-radius: 20px">
                              <i
                                style="margin-left: 4px; margin-top: 5px"
                                class="icontitle_6"
                              ></i>
                            </i>
                            <span style="line-height: 25px">售后费用</span>
                          </span>
                          <span
                            class="amount"
                            style="
                              font-size: 14px;
                              font-weight: bold;
                              color: #3c3c3c;
                            "
                            :class="'padding_15px'"
                          >
                            <!-- <i></i> --> 
                            {{ ((set_data_value.MTD_AFS_AMT||0)/10000).toFixed(1)+'万' }}</span
                          >


                          <span
                            style="color: #a2a2a2;"
                            class="change-rate"
                            :class="'padding_15px'"
                          >
                            <!-- <span></span> set_data_value.AGO_MTD_AFS_AMT_RATE-->
                            占发货比：<i
                              style="font-style: normal"
                              :class="
                                Number((set_data_value.MTD_AFS_AMT_RATE||0)) > 0.025
                                    ? 'rate-up_salesR'
                                    : 'rate-down_salesR'                   
                              "
                              >{{ ((set_data_value.MTD_AFS_AMT_RATE||0)*100).toFixed(1)+'%' }}</i
                            >
                          </span>

                          <span
                            style="color: #a2a2a2;"
                            class="change-rate"
                            :class="'padding_15px'"
                          >
                            <!-- <span></span> -->
                            标杆值：<i
                              style="font-style: normal"

                              >2.5%</i
                            >
                          </span>
                          <!-- {{ ((||0)*100).toFixed(1)+'%' }} -->


                        </div>



                        <div
                          class="wrapper_div2"
                          v-if="permissionList['SQL-overview-new_data']"
                          :style="list[3].display4?  { width: wrapper_con_width + 'px','display': 'inline-grid'}:{ width: wrapper_con_width + 'px','display': 'none'}"
                        >
                          <span class="name" :class="'padding_10px'">
                            <!-- <i class="icontitle_7"></i> background-color: #eeeeff;-->
                            <i style="width: 20px; height: 20px; border-radius: 20px">
                              <i
                                style="margin-left: 4px; margin-top: 4px"
                                class="icontitle_7"
                              ></i>
                            </i>
                            <span style="line-height: 25px">退货费用</span>
                          </span>
                          <span
                            class="amount"
                            style="
                              font-size: 14px;
                              font-weight: bold;
                              color: #3c3c3c;
                            "
                            :class="'padding_15px'"
                          >
                            <!-- <i></i> --> 
                            {{ ((set_data_value.MTD_REF_AMT||0)/10000).toFixed(1)+'万' }}</span
                          >


                          <span
                            style="color: #a2a2a2;"
                            class="change-rate"
                            :class="'padding_15px'"
                          >
                            <!-- <span></span> {{ ((set_data_value.MTD_REF_RATE||0)*100).toFixed(1)+'%' }}-->
                            <!-- :class="calcSignClass(data['overview-ka_reach_yoy_rate'])" -->
                            占发货比：<i
                              style="font-style: normal"
                              :class="
                                Number((set_data_value.MTD_REF_RATE||0)) > 0.01
                                    ? 'rate-up_salesR'
                                    : 'rate-down_salesR'                  
                              "
                              >{{ ((set_data_value.MTD_REF_RATE||0)*100).toFixed(1)+'%' }}</i
                            >
                          </span>

                          <span
                            style="color: #a2a2a2;"
                            class="change-rate"
                            :class="'padding_15px'"
                          >
                            <!-- <span></span> -->
                            <!-- :class="calcSignClass(data['overview-ka_reach_yoy_rate'])" -->
                            标杆值：<i
                              style="font-style: normal"
                              >1.0%</i
                            >
                          </span>


                        </div>



                    </swiper-slide>


                    <swiper-slide style="background: ffffff;">


                        <div
                          class="wrapper_div1"
                          v-if="permissionList['SQL-overview-new_data']"
                          style="margin-left: 0%; margin-right: 0%"
                          :style="list[3].display4?  { width: wrapper_con_width + 'px','display': 'inline-grid'}:{ width: wrapper_con_width + 'px','display': 'none'}"
                          @click="JumpToPageFun('欠货')"
                          @touchstart="LineVal.boonval7 = true" @touchend="LineVal.boonval7 = false"
                        >
                          <span class="name" :class="'padding_10px'">
                            <!-- <i class="icontitle_8"></i> background-color: #eeeeff;-->
                            <i style="width: 20px; height: 20px; border-radius: 20px">
                              <i
                                style="margin-left: 4px; margin-top: 4px"
                                class="icontitle_8"
                              ></i>
                            </i>
                            <span style="line-height: 25px">日均订单欠货</span>
                            <!-- <van-icon name="upgrade" size="16" color="#23B0A8" style="margin-top: 5px;float: right;margin-right: 10px;" /> -->
                            <div style="float: right;border-radius: 6px;" :style="(LineVal.boonval7==false)?LineVal.cssn:LineVal.cssy">
                              <van-icon name="arrow" size="14" color="#A9A9A9" style="margin-top: 5px;margin-bottom: 5px;margin-left: 10px;float: right;margin-right: 10px;" />                              
                            </div>
                          </span>
                          <span
                            class="amount"
                            style="
                              font-size: 14px;
                              font-weight: bold;
                              color: #3c3c3c;
                            "
                            :class="'padding_15px'"
                          >
                            <!-- <i></i> --> 
                            {{ fomatMoney(((set_data_value.TOTAL_ORDER_AMOUNT||0)/10000).toFixed(1))+'万' }}</span
                          >

                          <span
                            style="color: #a2a2a2;"
                            class="change-rate"
                            :class="'padding_15px'"
                          >
                            <!-- <span></span> -->
                            <!-- :class="calcSignClass(data['overview-visitors_cnt_rate'])" -->
                            标杆值：<i
                              style="font-style: normal"
      
                              >{{ ((set_data_value.TOTAL_ORDER_FLAG||0)/10000).toFixed(1)+'万' }}</i
                            >
                          </span>
                          

                          <span
                            style="color: #a2a2a2;"
                            class="change-rate"
                            :class="'padding_15px'"
                          >
                            <!-- <span></span> -->
                            <!-- :class="calcSignClass(data['overview-visitors_cnt_rate'])" -->
                            差值占比：<i
                              style="font-style: normal"
                              :class="
                                Number((set_data_value.TOTAL_ORDER_RATE||0)) > 0
                                    ? 'rate-up_salesR'
                                    : 'rate-down_salesR'                  
                              "
                              >{{ ((set_data_value.TOTAL_ORDER_RATE||0)*100).toFixed(1)+'%' }}</i
                            >
                          </span>

                        </div>



                        <div
                          class="wrapper_div2"
                          v-if="permissionList['SQL-overview-new_data']"  
                          :style="list[4].display5?  { width: wrapper_con_width + 'px','display': 'inline-flex'}:{ width: wrapper_con_width + 'px','display': 'none'}"
                        >
                          <span class="name" :class="'padding_10px'">
                            <!-- <i class="icontitle_9"></i> background-color: #eeeeff;-->
                            <i style="width: 20px; height: 20px; border-radius: 20px">
                              <i
                                style="margin-left: 4px; margin-top: 4px"
                                class="icontitle_10"
                              ></i>
                            </i>
                            <span style="line-height: 25px">周转率</span>
                          </span>
                          <span
                            class="amount"
                            style="
                              font-size: 14px;
                              font-weight: bold;
                              color: #3c3c3c;
                            "
                            :class="'padding_15px'"
                          >
                            <!-- <i></i> --> 
                            {{
                              fomatMoney(
                                ( (set_data_value.MTD_ZZ_RATE||0)).toFixed(1)
                              ) + ""
                            }}</span
                          >
                          <span
                            style="color: #a2a2a2;"
                            class="change-rate"
                            :class="'padding_15px'"
                          >
                            <!-- <span></span> --> 
                            <!-- :class="calcSignClass(data['overview-cancel_amt_rate'])" -->
                            标杆值：<i
                              style="font-style: normal"

                              >{{ ((set_data_value.MTD_ZZ_RATE_FLAG||0)).toFixed(1)+'' }}</i
                            >
                          </span>

                          <span
                            style="color: #a2a2a2;"
                            class="change-rate"
                            :class="'padding_15px'"
                          >
                            <!-- <span></span> --> 
                            <!-- :class="calcSignClass(data['overview-cancel_amt_rate'])" -->
                            差值占比：<i
                              style="font-style: normal"
                              :class="
                                Number((set_data_value.MTD_ZZ_RATE_DIF||0)) > 0
                                    ? 'rate-up'
                                    : 'rate-down'                   
                              "
                              >{{ ((set_data_value.MTD_ZZ_RATE_DIF||0)*100).toFixed(1)+'%' }}</i
                            >
                          </span>
                        </div>


                        <div
                          class="wrapper_div1"
                          v-if="permissionList['SQL-overview-new_data']"
                          style="margin-left: 0%; margin-right: 0%"
                          :style="list[3].display4?  { width: wrapper_con_width + 'px','display': 'inline-grid'}:{ width: wrapper_con_width + 'px','display': 'none'}"
                        >
                          <span class="name" :class="'padding_10px'">
                            <!-- <i class="icontitle_8"></i> background-color: #eeeeff;-->
                            <i style="width: 20px; height: 20px; border-radius: 20px">
                              <i
                                style="margin-left: 4px; margin-top: 6px"
                                class="icontitle_11"
                              ></i>
                            </i>
                            <span style="line-height: 25px">呆滞金额</span>
                          </span>
                          <span
                            class="amount"
                            style="
                              font-size: 14px;
                              font-weight: bold;
                              color: #3c3c3c;
                            "
                            :class="'padding_15px'"
                          >
                            <!-- <i></i> --> 
                            {{ fomatMoney(((set_data_value.REM_INV_VALUE||0)/10000).toFixed(1))+'万' }}</span
                          >
                          <span
                            style="color: #a2a2a2;"
                            class="change-rate"
                            :class="'padding_15px'"
                          >
                            <!-- <span></span> -->
                            <!-- :class="calcSignClass(data['overview-visitors_cnt_rate'])" -->
                            标杆值：<i
                              style="font-style: normal"
                              >{{ ((set_data_value.REM_INV_VALUE_FLAG||0)/10000).toFixed(1)+'万' }}</i
                            >
                          </span>


                          <span
                            style="color: #a2a2a2;"
                            class="change-rate"
                            :class="'padding_15px'"
                          >
                            <!-- <span></span> -->
                            <!-- :class="calcSignClass(data['overview-visitors_cnt_rate'])" -->
                            占总库存比：<i
                              style="font-style: normal"
                              :class="
                                Number((set_data_value.REM_INV_RATE||0)) > 0.1
                                    ? 'rate-up_salesR'
                                    : 'rate-down_salesR'                  
                              "
                              >{{ ((set_data_value.REM_INV_RATE||0)*100).toFixed(1)+'%' }}</i
                            >
                          </span>

                        </div>



                        <div
                          class="wrapper_div2"
                          v-if="permissionList['SQL-overview-new_data']"  
                          :style="list[4].display5?  { width: wrapper_con_width + 'px','display': 'inline-flex'}:{ width: wrapper_con_width + 'px','display': 'none'}"
                          @click="JumpToPageFun('品质')"
                          @touchstart="LineVal.boonval8 = true" @touchend="LineVal.boonval8 = false"
                        >
                          <span class="name" :class="'padding_10px'">
                            <!-- <i class="icontitle_9"></i> background-color: #eeeeff;-->
                            <i style="width: 20px; height: 20px; border-radius: 20px">
                              <i
                                style="margin-left: 4px; margin-top: 4px"
                                class="icontitle_12"
                              ></i>
                            </i>
                            <span style="line-height: 25px">售后不良率</span>
                            <!-- <van-icon name="upgrade" size="16" color="#23B0A8" style="margin-top: 5px;float: right;margin-right: 10px;" /> -->
                            <div style="float: right;border-radius: 6px;" :style="(LineVal.boonval8==false)?LineVal.cssn:LineVal.cssy">
                              <van-icon name="arrow" size="14" color="#A9A9A9" style="margin-top: 5px;margin-bottom: 5px;margin-left: 10px;float: right;margin-right: 10px;" />                              
                            </div>
                          </span>
                          <span
                            class="amount"
                            style="
                              font-size: 14px;
                              font-weight: bold;
                              color: #3c3c3c;
                            "
                            :class="'padding_15px'"
                          >
                            <!-- <i></i> --> 
                            {{
                              fomatMoney(
                                ( (set_data_value.SHBL_RATE||0)*100).toFixed(2)
                              ) + "%"
                            }}</span
                          >

                          <span
                            style="color: #a2a2a2;"
                            class="change-rate"
                            :class="'padding_15px'"
                          >
                            <!-- <span></span> --> 
                            <!-- :class="calcSignClass(data['overview-cancel_amt_rate'])" -->
                            标杆值：<i
                              style="font-style: normal"
  
                              >{{ ((set_data_value.SHBL_RATE_FLAG||0)*100).toFixed(1)+'%' }}</i
                            >
                          </span>


                          <span
                            style="color: #a2a2a2;"
                            class="change-rate"
                            :class="'padding_15px'"
                          >
                            <!-- <span></span> --> 
                            <!-- :class="calcSignClass(data['overview-cancel_amt_rate'])" -->
                            差值占比：<i
                              style="font-style: normal"
                              :class="
                                Number((set_data_value.SHBL_RATE_DIF||0)) > 0
                                    ? 'rate-up_salesR'
                                    : 'rate-down_salesR'                
                              "
                              >{{ ((set_data_value.SHBL_RATE_DIF||0)*100).toFixed(1)+'%' }}</i
                            >
                          </span>
                        </div>



                        <div
                          class="wrapper_div1"
                          v-if="permissionList['SQL-overview-new_data']"
                          style="margin-left: 0%; margin-right: 0%"
                          :style="list[3].display4?  { width: wrapper_con_width + 'px','display': 'inline-grid'}:{ width: wrapper_con_width + 'px','display': 'none'}"
                        >
                          <span class="name" :class="'padding_10px'">
                            <!-- <i class="icontitle_8"></i> background-color: #eeeeff;-->
                            <i style="width: 20px; height: 20px; border-radius: 20px">
                              <i
                                style="margin-left: 4px; margin-top: 4px"
                                class="icontitle_13"
                              ></i>
                            </i>
                            <span style="line-height: 25px">全渠道差评率</span>
                          </span>
                          <span
                            class="amount"
                            style="
                              font-size: 14px;
                              font-weight: bold;
                              color: #3c3c3c;
                            "
                            :class="'padding_15px'"
                          >
                            <!-- <i></i> --> 
                            {{ fomatMoney(((set_data_value.MTD_APRS_BAD_RATE||0)*100).toFixed(2))+'%' }}</span
                          >

                          <span
                            style="color: #a2a2a2;"
                            class="change-rate"
                            :class="'padding_15px'"
                          >
                            <!-- <span></span> -->
                            <!-- :class="calcSignClass(data['overview-visitors_cnt_rate'])" -->
                            标杆值：<i
                              style="font-style: normal"
      
                              >{{ ((set_data_value.MTD_APRS_BAD_RATE_FLAG||0)*100).toFixed(2)+'%' }}</i
                            >
                          </span>


                          <span
                            style="color: #a2a2a2;"
                            class="change-rate"
                            :class="'padding_15px'"
                          >
                            <!-- <span></span> -->
                            <!-- :class="calcSignClass(data['overview-visitors_cnt_rate'])" -->
                            差值占比：<i
                              style="font-style: normal"
                              :class="
                                Number((set_data_value.MTD_APRS_BAD_RATE_DIF||0)) > 0
                                    ? 'rate-up_salesR'
                                    : 'rate-down_salesR'                  
                              "
                              >{{ ((set_data_value.MTD_APRS_BAD_RATE_DIF||0)*100).toFixed(1)+'%' }}</i
                            >
                          </span>

                        </div>




                        <div
                          class="wrapper_div2"
                          v-if="permissionList['SQL-overview-new_data']"  
                          :style="list[4].display5?  { width: wrapper_con_width + 'px','display': 'inline-flex'}:{ width: wrapper_con_width + 'px','display': 'none'}"
                        >
                          <span class="name" :class="'padding_10px'">
                            <!-- <i class="icontitle_9"></i> background-color: #eeeeff;-->
                            <i style="width: 20px; height: 20px; border-radius: 20px">
                              <i
                                style="margin-left: 4px; margin-top: 4px"
                                class="icontitle_14"
                              ></i>
                            </i>
                            <span style="line-height: 25px">支装准时率</span>
                          </span>

                          <!-- height: 16px; -->
                          <span
                            class="amount"
                            style="
                              font-size: 14px;
                              font-weight: bold;
                              color: #3c3c3c;
                              
                            "
                            :class="'padding_15px'"
                          >
                            <!-- <i></i> --> 
                            {{
                              fomatMoney(
                                ( (set_data_value.ZZZS_RATE||0)*100).toFixed(2)
                              ) + "%"
                            }}</span
                          >

                          <span
                            style="color: #a2a2a2;"
                            class="change-rate"
                            :class="'padding_15px'"
                          >
                            <!-- <span></span> --> 
                            <!-- :class="calcSignClass(data['overview-cancel_amt_rate'])" -->
                            标杆值：<i
                              style="font-style: normal"
                              >{{ ((set_data_value.ZZZS_RATE_FLAG||0)*100).toFixed(1)+'%' }}</i
                            >
                          </span>

                          <span
                            style="color: #a2a2a2;"
                            class="change-rate"
                            :class="'padding_15px'"
                          >
                            <!-- <span></span> --> 
                            <!-- :class="calcSignClass(data['overview-cancel_amt_rate'])" -->
                            差值占比：<i
                              style="font-style: normal"
                              :class="
                                Number((set_data_value.ZZZS_RATE_DIF||0)) > 0
                                    ? 'rate-up'
                                    : 'rate-down'                
                              "
                              >{{ ((set_data_value.ZZZS_RATE_DIF||0)*100).toFixed(1)+'%' }}</i
                            >
                          </span>

                        </div>




                        <div
                          class="wrapper_div1"
                          v-if="permissionList['SQL-overview-new_data']"
                          style="margin-left: 0%; margin-right: 0%"
                          :style="list[3].display4?  { width: wrapper_con_width + 'px','display': 'inline-grid'}:{ width: wrapper_con_width + 'px','display': 'none'}"
                        >
                          <span class="name" :class="'padding_10px'">
                            <!-- <i class="icontitle_8"></i> background-color: #eeeeff;-->
                            <i style="width: 20px; height: 20px; border-radius: 20px">
                              <i
                                style="margin-left: 4px; margin-top: 4px"
                                class="icontitle_15"
                              ></i>
                            </i>
                            <span style="line-height: 25px">B店DSR</span>
                            <!-- style="float: right;" -->
                            <span  :style="{'margin-left': wrapper_con_width*0.16+'px'}">同行</span>
                          </span>
                          
                          <!-- <span
                            class="amount"
                            style="
                              padding-left: 15px;
                              font-size: 14px;
                              font-weight: bold;
                              color: #3c3c3c;
                            "
                          >
          
                            {{ fomatMoney(((set_data_value.MTD_APRS_BAD_RATE||0)*100).toFixed(2))+'%' }}</span
                          > -->

                          <span
                            style="color: #a2a2a2;"
                            class="change-rate"
                            :class="'padding_15px'"
                          >
                            <!-- <span></span> -->
                            <!-- :class="calcSignClass(data['overview-visitors_cnt_rate'])" -->
                            描述:<i
                              style="font-style: normal;color:#000000;margin-left: 0.2rem;"
          
                              >{{ ((set_data_value.DESCRIBE||0)).toFixed(2)+'' }}</i
                            >

                            &nbsp;对比:<i
                              style="font-style: normal;margin-left: 0.2rem;"
                              :class="
                                Number((set_data_value.DESCRIBE_PEER||0)) > 0
                                    ? 'rate-up'
                                    : 'rate-down'                  
                              "
                              >{{ ((set_data_value.DESCRIBE_PEER||0)*100).toFixed(1)+'%' }}</i
                            >
                          </span>

                          <span
                            style="color: #a2a2a2;"
                            class="change-rate"
                            :class="'padding_15px'"
                          >
                            <!-- <span></span> -->
                            <!-- :class="calcSignClass(data['overview-visitors_cnt_rate'])" -->
                            服务:<i
                              style="font-style: normal;color:#000000;margin-left: 0.2rem;"
                            
                              >{{ ((set_data_value.SERVICE||0)).toFixed(2)+'' }}</i
                            >
                            
                            &nbsp;对比:<i
                              style="font-style: normal;margin-left: 0.2rem;"
                              :class="
                                Number((set_data_value.SERVICE_PEER||0)) > 0
                                    ? 'rate-up'
                                    : 'rate-down'                  
                              "
                              >{{ ((set_data_value.SERVICE_PEER||0)*100).toFixed(1)+'%' }}</i
                            >
                          </span>

                          <span
                            style="color: #a2a2a2;"
                            class="change-rate"
                            :class="'padding_15px'"
                          >
                            <!-- <span></span> -->
                            <!-- :class="calcSignClass(data['overview-visitors_cnt_rate'])" -->
                            物流:<i
                              style="font-style: normal;color:#000000;margin-left: 0.2rem;"

                              >{{ ((set_data_value.LOGISTICS||0)).toFixed(2)+'' }}</i
                            >
                            &nbsp;对比:<i
                              style="font-style: normal;margin-left: 0.2rem;"
                              :class="
                                Number((set_data_value.LOGISTICS_PEER||0)) > 0
                                    ? 'rate-up'
                                    : 'rate-down'                  
                              "
                              >{{ ((set_data_value.LOGISTICS_PEER||0)*100).toFixed(1)+'%' }}</i
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
          style="width: 100%; height: 50px; background: rgba(245, 245, 245, 1)"
        >
          <!-- <p
            style="
              text-align: center;
              margin: 0px;
              font-size: 14px;
              color: #cccccc;
              padding-top: 10px;
            "
          >
            {{ list[4].display5? '———— 已经见底了 ————':'加载更多'}}
          </p> -->

          <!-- <p style="text-align: center;margin: 0px;font-size: 14px;color: #CCCCCC;padding-top: 10px;">
            <span style="margin-top: 1px;position: absolute;margin-left: -60px;border-bottom: 1px solid #CCCCCC;height: 10px;width: 56px;"></span> 
            <span style="font-weight: bold;">·</span> 已经见底了 
            <span style="font-weight: bold;">·</span>  
            <span style="margin-top: 1px;position: absolute;margin-left: 3.5px;border-bottom: 1px solid #CCCCCC;height: 10px;width: 56px;"></span>
          </p> -->
          <van-row type="flex" justify="center">
            <van-col span="4">
              <span style="margin-top: 9px;display: block;border-bottom: 1px solid #CCCCCC;height: 10px;width: 56px;float: right;"></span>
            </van-col>
            <van-col span="7">
              <p style="text-align: center;margin: 0px;font-size: 14px;color: #CCCCCC;padding-top: 10px;line-height: 18px;">
                <span style="font-weight: bold;">·</span> 已经见底了 
                <span style="font-weight: bold;">·</span>  
              </p>   
            </van-col>
            <van-col span="4">
              <span style="margin-top: 9px;display: block;border-bottom: 1px solid #CCCCCC;height: 10px;width: 56px;"></span>
            </van-col>
          </van-row>
        </div>
      </van-pull-refresh>

    <!-- 测试苹果适配开始 margin-bottom: 50px;-->
    <!-- <div style="width: 100%; " :style="iphone_pd==true?{'height': (Bottom_Height_on+5)+'px'}:{'height': '50px'}"></div> -->
    <!-- 测试苹果适配结束 npm install --save vue-virtual-scroll-list-->

    </div>    

  </div>
</template>

<script>
/* eslint-disable */
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/line";
import "echarts/lib/component/legend";
import "echarts/lib/component/tooltip";
import "echarts/lib/chart/bar";

import { mapState } from "vuex";
import {
  decimal2Percent,
  thousands,
  calcSignClass,
  generatePromise,
  Information_log,
} from "@/utils/helpers";

// 加上水印的
import watermark from "@/utils/watermark";

import { NoticeBar, PullRefresh, List, Cell,Loading,Icon,Row,Col } from "vant";

export default {
  name: "Entry",
  components: {
    [NoticeBar.name]: NoticeBar,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Cell.name]: Cell,
    [Loading.name]:Loading,
    [Icon.name]:Icon,
    [Row.name]:Row,
    [Col.name]:Col,
  },

  data() {
    return {

      // shouyetu.gif
      shouye_img:require("@/assets/images/welcome/shouyetu.gif"),

      // 2021-08-04连接css开始
      LineVal:{
        boonval:false,
        boonval2:false,
        boonval3:false,
        boonval4:false,
        boonval5:false,
        boonval6:false,
        boonval7:false,
        boonval8:false,
        cssy:{'background': '#DCDCDC'},
        cssn:{'background': '#ffffff'},
      },
      // 2021-08-04连接css结束

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
          // trigger: "item", axis
          trigger: "axis", 
          // extraCssText:'height:40px',
          // showDelay: 200,
          axisPointer: {
            // type : 'shadow',
            lineStyle: {
              // color: '#ddd'
              // color: "#1F9FFB",
            },
            // type: "cross",
            label: {
              color: "#000000",
              // backgroundColor: "#1678FF",
              backgroundColor: "aliceblue",
            },
          },
          // backgroundColor: "rgba(22,120,255,0.2)",
          // borderWidth: "1", //边框宽度设置1
          // borderColor: "#E6E6E6", //设置边框颜色
          textStyle: {
            // color: "#3C3C3C", //设置文字颜色
            top: "0px",
            align:'left',
            fontSize:'12'
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
          // boundaryGap: false,
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

          axisTick: {
            alignWithLabel: true
          }

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
            // type: "line",
            type: "bar",
            showSymbol: false,
            smooth: true, //true 为平滑曲线，false为直线
            itemStyle: {
              normal: {
                // color: '#66ccff',
                // color: "#1678FF",
                // color: "#ffffff",
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: "rgba(255,255,255, 0.6)",
                  },
                  {
                    offset: 1,
                    color: "rgba(255,255,255,1)",
                  },
                ]),

                
                barBorderRadius: [30, 30, 0, 0],
                
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


          {
            name: "同期",
            type: "line",
            showSymbol: false,
            smooth: false, //true 为平滑曲线，false为直线
            itemStyle: {
              normal: {
                // color: '#66ccff',
                // color: "#1678FF",
                
                // color: "#1678FF",
                color: "rgba(255,255,255, 0.6)", 
                lineStyle: {
                  // color: '#66ccff'
                  // color: "#1678FF",
                  color: "rgba(255,255,255, 0.6)",
                  width: 1, //设置线条粗细
                  // type:'dashed',
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
                      // color: "rgba(6,69,165, 0.01)",
                      color: "rgba(255,255,255, 0.0018)",
                      
                    },
                    {
                      offset: 1,
                      // color: "rgba(6,69,165, 0.05)",
                      color: "rgba(255,255,255, 0.0018)",
                    },
                  ]),
                },
              },
            },
            data: [],
          },

        ],
      },
      user_value: 25072,
      chartIns: null,
      set_data_value:{
        cont1:0,
        cont2:0,
        cont3:0,

        cont4:0,
        cont5:0,
        cont6:0,

        cont7:0,
        cont8:0,
        cont9:0,

        cont10:0,
        cont11:0,
        cont12:0,

        cont13:0,
        cont14:0,
        cont15:0,
        

      },
      set_sku_value:'',
      // 未发取消开始
      cancel_data:{
        ago_amt:'',
        amt:'',
        arte:'',
      },
      // 未发取消结束
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

        // 未发取消开始
        "FS_YY_WF-AMT_MONTH": "",
        "FS_YY_WF-SALE_RATE_MONTH": "",
        "FS_YY_WF-AGO_RATE_MONTH": "",
        // 未发取消结束

        "pds_dlvr-sku_avg_amt": "",
        "overview-realtime_perf_hours": "",
      },
      data_loay:false,
      iphone_pd:false,

      test_height:'',
      // 添加水印的
      orgBackground:'',
      echarts_clear:false,
    };
  },
  computed: {
    ...mapState("user", ["permissionList","permissionRoleList"]),
  },
  created() {
    // this.wrapper_con_width = (window.innerWidth - 40) / 2;
    this.wrapper_con_width = (window.innerWidth - 30) / 2;
    this.echarts_width = (window.innerWidth - 30);

    // Bottom_Height_on  -40是钉钉的高度-34
    this.Bottom_Height_on=(screen.height-(177.4+29+5+383+40))-40-34;

    this.test_height=screen.height;

    // console.log("===========首页得！！！！！！！！！！！！！===============")
    // console.log(this.Bottom_Height_on);


    this.$EventBus.$emit("data_loay_set", {
      data_loay_seton: false,
    });


    const [p1, resolve1] = generatePromise();
    // this.p1 = p1;

    const [p2,resolve2]= generatePromise();
    const [p3,resolve3]= generatePromise();
    const [p4,resolve4]= generatePromise();
    this.p1= Promise.all([p1,p2,p3,p4]);


    const apiMap = {


      "SQL-overview-realtime_perf": { resultProp: "AMT" },
      "SQL-overview-realtime_perf_rate": { resultProp: "AGO_RATE" },
      "SQL-overview-realtime_perf_reach_rate": { resultProp: "AGO_RATE" },


      "SQL-overview-realtime_perf_hours": { type: Array, resolve2: resolve2 },
      "SQL-overview-new_data": { type: Array, resolve: resolve1 },


      // 未发取消开始
      "SQL-FS_YY_WF-AMT_MONTH": { type: Array },
      "SQL-FS_YY_WF-SALE_RATE_MONTH": { type: Array },
      "SQL-FS_YY_WF-AGO_RATE_MONTH": { type: Array,resolve: resolve4 },
      // 未发取消结束

      // SKU均值增加开始
      // "SQL-pds_dlvr-sku_avg_amt": { resultProp: "sku_avg_amt" },
      "SQL-pds_dlvr-sku_avg_amt": { type: Array, resolve3: resolve3 },
      // SKU均值增加结束      

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
              else if(apiMap[key].resolve3){
                apiMap[key].resolve3();
              }else if(apiMap[key].resolve4){
                apiMap[key].resolve4();
              }


            });
        }
      }
    });


    // this.Information_log(" 测试日志运行 ");
    // console.log("==========================")
    // console.log(this.data);
    // console.log(this.data["pds_dlvr-sku_avg_amt"]);


  },

  watch: {
    $route: {
      handler(val) {
        console.log("======概览路由发生变化！！！=========");
        if(val.path=='/entry'){
          this.echarts_clear=true;
          Information_log('概览','返回概览页:  ');
          this.initChart();
        }
      },
      immediate: false,

    },
  },

  mounted() {

    // watermark.set("林氏木业");tool.addWaterMark()
    
    // this.orgBackground = watermark();
    this.orgBackground = watermark(this.$store.state.app.getusername);



    if(this.isIPhoneX()){
      this.iphone_pd=true;
    }else{
      this.iphone_pd=false;
    }
    console.log("entry mounted", Date.now());


    //调试的时候才开启 this.initChart();
    this.$EventBus.$on("entry_f", (Loading) => {
      // console.log("启动折线图！！！")
      // console.log(Loading);
      if(Loading.Loading==true){
        this.initChart();
      }
    });



    // 滑动的开始
    this.$refs['mySwiper_entry'].$swiper.on("slideChangeTransitionEnd", (swiper) => {
      const index = swiper.realIndex;
      console.log("这里是首页啊！！！！！  " + (index));
      this.swiper_pag=index;


    });
    // 滑动的结束


    this.chenSwiper(0);

    this.set_data_on();

    Information_log('概览','概览:  '+'数据加载完成');
      


  },
  methods: {

    JumpToPageFun(val){

      let _this=this;
      setTimeout(function name() {
        // console.log("============运行到跳转这里来了！！！============");
        if(val=='支付业绩'){
          _this.$store.commit("app/setJumpToPageVal", "支付业绩"); //store储存跳转参数
          _this.$EventBus.$emit("JumpToPage_all", {setval: 1,permission:'渠道-渠道业绩-业绩达成'});
          _this.$EventBus.$emit("JumpToPageCon", {setval: 1,});        
        }else if(val=='发货业绩'){
          _this.$store.commit("app/setJumpToPageVal", "发货业绩"); //store储存跳转参数
          _this.$EventBus.$emit("JumpToPage_all", {setval: 1,permission:'渠道-渠道业绩-业绩达成'});
          _this.$EventBus.$emit("JumpToPageCon", {setval: 2,}); 
        }else if(val=='未发取消'){
          _this.$store.commit("app/setJumpToPageVal", "未发取消"); //store储存跳转参数
          // _this.$EventBus.$emit("JumpToPage_all", {setval: 6,jumpval:2,jumpname:'ouk',permission:'渠道-渠道运营-未发取消'});
          _this.$EventBus.$emit("JumpToPage_all", {setval: 6,jumpval:4,jumpname:'pinzhi',permission:'渠道-渠道运营-未发取消'});
          // this.$EventBus.$emit("JumpToPageCon", {setval: 2,}); 
        }else if(val=='采购毛利率'){
          _this.$store.commit("app/setJumpToPageVal", "采购毛利"); //store储存跳转参数
          _this.$EventBus.$emit("JumpToPage_all", {setval: 4,jumpval:1,jumpname:'cpcy',permission:'财务-财务管理-采购毛利'});
          // this.$EventBus.$emit("JumpToPage", {setval: 4,jumpval:2,jumpname:'ouk'});
        }else if(val=='SKU均值'){
          // console.log("=========运行到sku均值这里来了！========");
          _this.$store.commit("app/setJumpToPageVal", "SKU均值"); //store储存跳转参数
          _this.$EventBus.$emit("JumpToPage_all", {setval: 2,jumpval:2,jumpname:'ouk',permission:'产品-产品中心-SKU均值'});
          // this.$EventBus.$emit("JumpToPage", {setval: 4,jumpval:2,jumpname:'ouk'});
        }else if(val=='B店流量'){
          _this.$store.commit("app/setJumpToPageVal", "流量分析"); //store储存跳转参数
          // _this.$EventBus.$emit("JumpToPage_all", {setval: 6,jumpval:1,jumpname:'cpcy',permission:'渠道-渠道运营-流量分析'});
          _this.$EventBus.$emit("JumpToPage_all", {setval: 6,jumpval:2,jumpname:'ouk',permission:'渠道-渠道运营-流量分析'});
        }else if(val=='欠货'){
          _this.$store.commit("app/setJumpToPageVal", "欠货"); //store储存跳转参数
          _this.$EventBus.$emit("JumpToPage_all", {setval: 2,jumpval:3,jumpname:'muying',permission:'产品-产品中心-欠货'});
          // this.$EventBus.$emit("JumpToPage", {setval: 4,jumpval:2,jumpname:'ouk'});
        }else if(val=='品质'){
          _this.$store.commit("app/setJumpToPageVal", "品质"); //store储存跳转参数
          _this.$EventBus.$emit("JumpToPage_all", {setval: 2,jumpval:4,jumpname:'pinzhi',permission:'产品-产品中心-品质'});
          // this.$EventBus.$emit("JumpToPage", {setval: 4,jumpval:2,jumpname:'ouk'});
        }
      },100);
       
    },


    // 日志信息接口的开始
    Information_log(info_log){

      this.$axios.get('/api/admin/common/log/save',{params:{description:info_log,logLevel:'Info',logType:'Web'}})
      .then(({success})=>{

        console.log("===========这里是测试日志的=======================");
        console.log(success);

      });
    },
    // 日志信息接口的结束


    onLoad_more(){

      console.log("============");
      this.list[4][`display${5}`]=true;
      // -14

      this.Bottom_Height_on=(screen.height-(177.4+29+5+475+40))-40+35;

    },

    set_data_on(){
      this.p1.then(() => {

        try{

          let _time_now=new Date();
          _time_now=_time_now.getTime()-(24*60*60*1000);
          _time_now=new Date(_time_now);
          let year_now = _time_now;
          year_now = year_now.getFullYear();
          let data_set_time=(year_now+'-'+((_time_now.getMonth()+1)>9?(_time_now.getMonth()+1):'0'+(_time_now.getMonth()+1))+'-'+'01');

          // console.log((year_now+'-'+((_time_now.getMonth()+1)>9?(_time_now.getMonth()+1):'0'+(_time_now.getMonth()+1))+'-'+'01'));
          // let aaa=(this.data_time_select(this.data["FS_YY_WF-AGO_RATE_MONTH"],data_set_time));
          // console.log(aaa);
          // 2021-01-01

          this.set_data_value=this.data["overview-new_data"][0];
          console.log(this.set_data_value);
          this.set_sku_value=this.data["pds_dlvr-sku_avg_amt"][0];
          // console.log(this.set_sku_value);

          this.cancel_data.ago_amt=(this.data_time_select(this.data["FS_YY_WF-AGO_RATE_MONTH"],data_set_time));
          this.cancel_data.amt=(this.data_time_select(this.data["FS_YY_WF-AMT_MONTH"],data_set_time));
          this.cancel_data.arte=(this.data_time_select(this.data["FS_YY_WF-SALE_RATE_MONTH"],data_set_time));

        }catch(error){ 
          console.log("========错误捕捉信息==========")
          // console.log(error)
          console.error(error);
          // this.info_error+=1;
          Information_log('概览','概览核心指标:  '+error.toString());
        }          


      });


    },

    data_time_select(data_seton_s,time_on,type){

      let set_on_data=[];

      Object.keys(data_seton_s).forEach((key_value_on) => {  
        if(data_seton_s[key_value_on].MDATE.substring(0,7)==time_on.substring(0,7)){
          if(type=="push"){
            set_on_data.push(data_seton_s[key_value_on]);
          }else{
            set_on_data=data_seton_s[key_value_on];
          }
          
        }
      });

      return set_on_data;

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

      // setTimeout(() => {
      //   // Toast('刷新成功');
      //   // 暂时还没用得上只是做个效果出来
      //   this.isLoading = false;
      //   this.count++;
      //   console.log("暂时还没用得上只是做个效果出来");
      //   console.log(this.count);
      // }, 1000);
      console.log("==========asdasdasd      ###########==================");

      const [p1, resolve1] = generatePromise();
      // this.p1 = p1;
      const [p2,resolve2]= generatePromise();
      const [p3,resolve3]= generatePromise();
      this.p1= Promise.all([p1,p2,p3]);
      const apiMap = {

        "SQL-overview-realtime_perf": { resultProp: "AMT" },
        "SQL-overview-realtime_perf_rate": { resultProp: "AGO_RATE" },
        "SQL-overview-realtime_perf_reach_rate": { resultProp: "AGO_RATE" },

        "SQL-overview-realtime_perf_hours": { type: Array, resolve2: resolve2 },
        "SQL-overview-new_data": { type: Array, resolve: resolve1 },

        // 未发取消开始
        "SQL-FS_YY_WF-AMT_MONTH": { type: Array },
        "SQL-FS_YY_WF-SALE_RATE_MONTH": { type: Array },
        "SQL-FS_YY_WF-AGO_RATE_MONTH": { type: Array },
        // 未发取消结束

        // SKU均值增加开始
        // "SQL-pds_dlvr-sku_avg_amt": { resultProp: "sku_avg_amt" },
        "SQL-pds_dlvr-sku_avg_amt": { type: Array, resolve3: resolve3 },
        // SKU均值增加结束      


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

                  this.isLoading = false;
                }
                else if(apiMap[key].resolve2){
                  apiMap[key].resolve2();
                }
                else if(apiMap[key].resolve3){
                  apiMap[key].resolve3();
                }


              });
          }
        }

      });




      this.p1.then(() => {
        this.set_data_on();
        this.initChart();
      });

    },



    initChart() {
      this.chartIns = echarts.init(this.$refs["chart"]);
      let _this = this;

      let _time_now=new Date();
      let amt_array=[];
      let ago_amt_array=[];
      


      this.p1.then(() => {

        try{


          let data = this.data["overview-realtime_perf_hours"];

          data = data.sort((a, b) => {
            return Number(a["TDATE_HOURS"]) - Number(b["TDATE_HOURS"]);
          });
          this.chartOption.xAxis.data = data.map(
            (item) => item["TDATE_HOURS"] * 1
          );


          console.log("================首页的同期！！！================");
          // console.log(data);

          
          Object.keys(data).forEach((screen_value) => {
            if(data[screen_value].TDATE_HOURS*1>(_time_now.getHours())){
              amt_array.push(null); 
            }else{
              amt_array.push(Number((data[screen_value].AMT/10000).toFixed(0))); 
            }

            ago_amt_array.push(Number((data[screen_value].AGO_AMT/10000).toFixed(0)));

          });


          // console.log(ago_amt_array);
          // this.chartOption.series[0].data = data.map((item) =>
          //   Number((item["AMT"] / 10000).toFixed(0))
          // );
          this.chartOption.series[0].data = amt_array;

          this.chartOption.series[1].data = ago_amt_array;


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
            // );+params[0].marker+params[1].marker
            return "小时："+params[0].axisValue+'h<br/> 当期：'+((params[0].value==undefined)?'--':params[0].value+'万')+
            '<br/> 同期：'+((params[1].value==undefined)?'--':params[1].value+'万')
            ;
          };


          // this.chartOption.tooltip.axisPointer.label.formatter = function (
          //   params
          // ) {
          //   // console.log(params);
          //   // let test=0;

          //   // 以前的开始
          //   // if (params["axisDimension"] == "x") {
          //   //   // console.log(params["seriesData"][0]["value"])
          //   //   _this.user_value = params["seriesData"][0]["value"];
          //   //   // test=params["seriesData"][0]["value"];
          //   // } else {
          //   //   _this.user_value = _this.user_value;
          //   // }

          //   // if (params["axisDimension"] == "x") {
          //   //   return ((params["value"])?(params["value"]):'--');
          //   // } else if (params["axisDimension"] == "y") {
          //   //   return ((_this.user_value!=undefined)?_this.user_value:'--');
          //   // }
          //   // 以前的结束

          //   return "小时："+params[1].axisValue+'<br/> 当期：'+params[1].marker+params[1].value+'万<br/> 同期：'+params[0].marker+params[0].value+
          //   '万'
          //   ;
     
          // };

          console.log(this.chartOption.series[0].data);
          
          if(this.echarts_clear==true){
            this.chartIns.clear();
            this.echarts_clear=false;
          }
          this.chartIns.setOption(this.chartOption);


        }catch(error){ 
          console.log("========错误捕捉信息==========")
          // console.log(error)
          console.error(error);
          // this.info_error+=1;
          Information_log('概览','概览趋势图:  '+error.toString());
        }


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

  //生命周期结束之前销毁
  beforeDestroy() {
    this.$EventBus.$off("entry_f");
    this.$EventBus.$off("JumpToPage");
    this.$EventBus.$off("JumpToPageCon");
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


.chart-desc2 {
  display: flex;
  justify-content: flex-start;
  align-items: baseline;

  > span {
    font-size: 12px;
    // padding: 10px;
    // padding-top: 5px;
    padding-top: 0px;
    padding-bottom: 5px;
    // padding-right: 10px;
  }

  > span:first-child {
    // font-size: 18px;
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

    padding-top: 8px;
    padding-bottom: 8px;
    // padding-top: 15px;
    // padding-bottom: 15px;
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
      // line-height: 20px;
      // height: 20px;
      line-height: 13px;
      height: 16px;
      // height: 18px;

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
  // width: 11px;
  // height: 14px;
  width: 13px;
  height: 14px;
}
.wrapper div .name .icontitle_2 {
  background: url("~@/assets/images/icon/num3.png") no-repeat left top/cover;
  // width: 17px;
  // height: 17px;
  width: 14px;
  height: 14px;
}
.wrapper div .name .icontitle_3 {
  background: url("~@/assets/images/icon/num8.png") no-repeat left top/cover;
  // width: 17px;
  // height: 17px;
  width: 15px;
  height: 14px;
}
.wrapper div .name .icontitle_4 {
  background: url("~@/assets/images/icon/num6.png") no-repeat left top/cover;
  // width: 17px;
  // height: 17px;
  width: 14px;
  height: 13px;
}
.wrapper div .name .icontitle_5 {
  background: url("~@/assets/images/icon/num5.png") no-repeat left top/cover;
  // width: 17px;
  // height: 17px;
  width: 15px;
  height: 12px;
}
.wrapper div .name .icontitle_6 {
  background: url("~@/assets/images/icon/num7.png") no-repeat left top/cover;
  // width: 18px;
  // height: 16px;
  width: 13px;
  height: 14px;
}
.wrapper div .name .icontitle_7 {
  background: url("~@/assets/images/icon/num4.png") no-repeat left top/cover;
  // width: 17px;
  // height: 17px;
  width: 14px;
  height: 14px;
}
.wrapper div .name .icontitle_8 {
  background: url("~@/assets/images/icon/num1.png") no-repeat left top/cover;
  // width: 15px;
  // height: 17px;
  width: 14px;
  height: 14px;
}
.wrapper div .name .icontitle_9 {
  background: url("~@/assets/images/icon/num15.png") no-repeat left top/cover;
  // width: 17px;
  // height: 16px;
  width: 12px;
  height: 12px;
}

.wrapper div .name .icontitle_10 {
  background: url("~@/assets/images/icon/num17.png") no-repeat left top/cover;
  // width: 17px;
  // height: 16px;
  width: 15px;
  height: 15px;
}

.wrapper div .name .icontitle_11 {
  background: url("~@/assets/images/icon/num18.png") no-repeat left top/cover;
  // width: 17px;
  // height: 16px;
  width: 15px;
  height: 13px;
}

.wrapper div .name .icontitle_12 {
  background: url("~@/assets/images/icon/num20.png") no-repeat left top/cover;
  // width: 17px;
  // height: 16px;
  width: 15px;
  height: 14px;
}

.wrapper div .name .icontitle_13 {
  background: url("~@/assets/images/icon/num16.png") no-repeat left top/cover;
  // width: 17px;
  // height: 16px;
  width: 14px;
  height: 14px;
}

.wrapper div .name .icontitle_14 {
  background: url("~@/assets/images/icon/num21.png") no-repeat left top/cover;
  // width: 17px;
  // height: 16px;
  width: 14px;
  height: 14px;
}

.wrapper div .name .icontitle_15 {
  background: url("~@/assets/images/icon/num22.png") no-repeat left top/cover;
  // width: 17px;
  // height: 16px;
  width: 15px;
  height: 15px;
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


.padding_10px{
  // padding-left: 10px;
  padding-left: 15px;
}
.padding_15px{
  // padding-left: 15px;
  padding-left: 20px;
}



.doge {
    width: 70px;
    height: 36px;
    margin-top: 4px;
    border-radius: 4px;
}

.van-icon-upgrade::before{
  transform:rotate(90deg);
  -ms-transform:rotate(90deg); 	/* IE 9 */
  -moz-transform:rotate(90deg); 	/* Firefox */
  -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
  -o-transform:rotate(90deg); 	/* Opera */
}


</style>
