<template>

  <div class="MarketOperation_all" >
    <!-- style="background: rgb(245, 245, 245)" -->

    <van-popup
      get-container="body"
      v-model="show"
      position="bottom"
      :style="{ height: '50%', overflow: 'hidden' }"
    >
      <!-- <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        title="选择月日"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @confirm="time_sel"
        @cancel="time_cancel"
      /> -->

      

      <van-picker
        title="选择年月"
        show-toolbar
        :columns="test_time_date"
        :default-index="ym_default_index"
        @confirm="onConfirm"
        @cancel="onCancel"
        @change="onChange"
      />



    </van-popup>

    <!-- 滑屏开始 -->
    <van-pull-refresh v-model="isLoading" :head-height="0" :pull-distance="0" @refresh="onRefresh"> 

      <!-- 下拉提示，通过 scale 实现一个缩放效果 ="props"-->
      <template #pulling>
        <!-- <img
          class="doge"
          src="https://img01.yzcdn.cn/vant/doge.png"
          :style="{ transform: `scale(${props.distance / 80})` }"
        /> -->
        <p></p>
      </template>
      <!-- 释放提示 -->
      <template #loosing>
        <p></p>
      </template>
      <!-- 加载提示 -->
      <template #loading>
        <p></p>
      </template>

    <div>

      <section
        style="padding-top: 5px; padding-bottom: 5px; border-radius: 4px; ;margin-left: 10px;margin-right: 10px;margin-bottom: 0px;"
      >
       <!-- <div class="section-title test_addd" style="padding-left: 0px; padding-bottom: 0px;color: #999999;">
          {{'更新时间：' + data_load_time}}
        </div> -->


        <div class="" style="padding-left: 0px; padding-bottom: 0px;color: #999999;font-size: 12px;display: flex;justify-content: space-between;">
          <span>{{'更新时间：' + data_load_time}}</span>
          <span @click="showPopup_sm"><i style="font-style: normal;color:#4395ff;padding-right: 4px;">口径说明</i>
            <i style="float: right;margin-top: 0px;"><van-icon name="question-o" color="rgb(153, 153, 153)" size="14" /></i>
          </span>
        </div>

        <van-popup v-model="question_show" @close='showPopup_close' class="popup_css" get-container="body">
          <div class="kjsm_bg" style="">
            <p style="margin: 0 auto;">口径说明</p>
          </div> 
          <div style="text-align: left;font-size: 14px;padding-left: 20px;
            padding-right: 20px;padding-bottom: 20px;line-height: 23px; color:#555555;">


            <p style="font-weight: bold;">
                <i style="width: 5px;height: 16px;background-color: #23B0A8;display: block;float: left;margin-right: 5px;margin-top: 3px;border-radius: 4px;"></i>
                <span style="color: #000000;">更新频率</span></p>
              <p style="margin-bottom: 20px;margin-top: 5px;">更新频率：10分钟更新一次</p>

            <p style="font-weight: bold;">
              <i style="width: 5px;height: 16px;background-color: #23B0A8;display: block;float: left;margin-right: 5px;margin-top: 3px;border-radius: 4px;"></i>
              <span style="color: #000000;">逻辑说明</span></p>


            <van-collapse v-model="activeNames_tips" accordion>
              <van-collapse-item title="未发取消" name="1">
                以支付口径追溯计算未发取消的分布节奏；渠道占比是未发取消金额/对应订单支付当日的销售业绩
              </van-collapse-item>

              <!-- <van-collapse-item title="商品访客" name="2">
                统计周期内浏览商品为详情3秒及以上、访问宝贝详情页的去重人数，一个人在统计时间范围内访问多次只记为一个。所有终端商品访客数为PC端商品访客数和无线端商品访客数相加去重。
              </van-collapse-item>
              <van-collapse-item title="搜索" name="3">
                在统计时间内，由全网搜索直接引导至商品详情页的访客数。
              </van-collapse-item>
              <van-collapse-item title="访客" name="4">
                统计周期内访问您店铺页面或宝贝详情页的去重人数，一个人在统计时间范围内访问多次只记为一个。所有终端访客数为PC端访客数和无线端访客数相加去重。
              </van-collapse-item> -->

            </van-collapse>


          </div>
        </van-popup>        



      </section>


      <!-- 添加了加载项开始 -->
      <!-- <div v-if="data_loay==false"
        style="position: fixed;left: 170px;top:100px;padding: 5px;border: 1px solid #e6e6e6;border-radius: 60px;background-color: #ffffff;box-shadow: 1px 1px 1px #919191;z-index: 9;">
        <van-loading  size="24px" color="#1989fa" style="" vertical></van-loading>
      </div> -->
      <!-- 添加了加载项结束 -->



      <section  style="padding-top: 10px; padding-bottom: 10px;background: #ffffff;border-radius: 4px;margin-left: 10px;margin-right: 10px;">
        <div class="Productmarket_day">
          <van-row type="flex" justify="center">
            <!-- <van-col
              v-if="sel_value.Range_set == 4"
              span="5"
              @click="Single_choice('1')"
              >
              <van-button
                :type="sel_value.day_1 ? click_css_set.type : click_css_no.type"
                class="but_set_select"
                :color="
                  sel_value.day_1 ? click_css_set.color : click_css_no.color
                "
                >1天</van-button
              ></van-col
            > -->

            <!-- :type="(sel_value.Range_set==3||sel_value.Range_set==1)? sel_value.day_7 ? click_css_set.type : click_css_no.type:click_css_no_grey.type" -->
            <!-- (sel_value.Range_on.Range_set=='1'||sel_value.Range_on.Range_set=='3') -->

            <van-col
              style="margin-right: 0px;"
              span="6"
              @click="(sel_value.Range_on.Range_set=='3')? '': Single_choice('day_7',['_this.loading_data_fun()','_this.data_screen_quota()','_this.initChart2()','_this.echarts_clear=true'],true,'_this.sel_value.day_set')"
              >
              <van-button plain 
                :style="sel_value.day_set.day_7 ? {'background-color': 'rgb(255, 255, 255)'}:{'background-color': 'rgb(247, 247, 247)'}"
              
                :type="(sel_value.Range_on.Range_set=='3')?  click_css_no_grey.type: sel_value.day_set.day_7 ? click_css_set.type : click_css_no.type"
                class="but_no_select"
                :color="(sel_value.Range_on.Range_set=='3')?  click_css_no_grey.color:sel_value.day_set.day_7 ? click_css_set.color : click_css_no.color"
                >近7天</van-button
              >

              <!-- 近7天 -->

              </van-col
            >
            <van-col
              style="margin-right: 10px;margin-left: 10px;"
              span="6"
              @click="(sel_value.Range_on.Range_set=='3')? '': Single_choice('day_1',['_this.loading_data_fun()','_this.data_screen_quota()','_this.initChart2()','_this.echarts_clear=true'],true,'_this.sel_value.day_set')"
              >
              <van-button plain 
                :style="sel_value.day_set.day_1 ? {'background-color': 'rgb(255, 255, 255)'}:{'background-color': 'rgb(247, 247, 247)'}"
              
                :type="(sel_value.Range_on.Range_set=='3')? click_css_no_grey.type: sel_value.day_set.day_1 ? click_css_set.type : click_css_no.type"
                class="but_no_select"
                :color="(sel_value.Range_on.Range_set=='3')? click_css_no_grey.color: sel_value.day_set.day_1 ? click_css_set.color : click_css_no.color"
                >近30天</van-button
              >
              <!-- 近30天 -->

              </van-col
            >
            <van-col style="margin-right: 0px;" span="6" @click="showPopup"
              >
              <van-button plain 
                :style="sel_value.day_set.month ? {'background-color': 'rgb(255, 255, 255)'}:{'background-color': 'rgb(247, 247, 247)'}"
              
                :type="sel_value.day_set.month ? click_css_set.type : click_css_no.type"
                class="but_no_select"
                :color="
                  sel_value.day_set.month ? click_css_set.color : click_css_no.color
                "
                >月</van-button
              >

              <!-- 月 -->
              
              </van-col
            >
          </van-row>
        </div>
        <div style="padding-top: 5px">
          <span
            style="
              text-align: center;
              display: block;
              font-size: 12px;
              color: #999999;
            "
            >（时间范围：{{
              sel_value.day_set.day_1 || sel_value.day_set.day_7
                ? set_time_range.start + "~" + set_time_range.end
                : set_time.substring(0, 4) +
                  "年" +
                  set_time.substring(5, 7) +
                  "月"
            }}）</span
          >
        </div>
      </section>

      <section
        style="padding-top: 5px; padding-bottom: 5px; border-radius: 4px; ;margin-left: 10px;margin-right: 10px;margin-bottom: 0px;"
      >
       <div
          class="section-title test_addd"
          style="padding-left: 0px; padding-bottom: 0px"
        >
          {{sel_value.Range_on.Range_set=='3'? '概况':'核心指标'}}
        </div>
      </section>



      

      <section
        :style="(sel_value.Range_on.Range_set=='1'||sel_value.Range_on.Range_set=='3')? {'display': 'block'}:{'display': 'none'}"
        style="padding-top: 10px; padding-bottom: 10px; border-radius: 4px;background: #ffffff;margin-left: 10px;margin-right: 10px;"
      >

        <div
          class="Productmarket_labqie"
          :style="hexinzhibiao"
          style="border-bottom: 0px solid #dddddd;margin-left: 10px; margin-right: 10px;"
        >

        <!--  -->

          <div
            @click="Single_choice('all_muri_value',['_this.initChart()'],1,'_this.sel_value.target')"
            class="Productmarket_labqie_con1"
            :style="
              sel_value.target.all_muri_value == 1
                ? click_css_hxzb_y
                : click_css_hxzb_n
            "
          >
            <span  :class="sel_value.target.all_muri_value == 1? 'title_change':''" :style="sum_zhibiao.title">{{ sel_value.Range_on.Range_set=='3'? '集团':'访客'}}</span>
            <span :style="sum_zhibiao.zhognxin">{{sel_title.quota_value.cont1}}</span>




            <!--                     
            sel_value.target.all_muri_value == 1&&sel_value.Range_on.Range_set!='2'
            ? Number(
                sel_title.quota_value.cont2
              ) > 0
              ? 'rate-up-sel'
              : 'rate-down-sel'
            :  -->
            <span :style="sum_zhibiao.body">
              <i
                style="
                
                  width: 35%;
                  display: inline-block;
                  font-style: normal;
                "
                >环比</i
              >
              <i 
                style="font-style: normal"
                :class="

                      Number(
                          sel_title.quota_value.cont2
                        ) > 0
                      ? 'rate-up'
                      : 'rate-down'
                  "
              >
                {{sel_value.Range_on.Range_set!='2'? sel_title.quota_value.cont2+'%':sel_title.quota_value.cont2}}
              </i>
            </span>
            
            <!-- <span style="padding-bottom: 4px;" :style="sum_zhibiao.body">
              <i
                style="
                 
                  width: 35%;
                  display: inline-block;
                  font-style: normal;
                "
                >{{ "暂时定的" }}</i
              >
              <i style="font-style: normal;">
                {{ 0+'%'}}
              
              </i>
            </span> -->
            
          </div>

          <div
            @click="Single_choice('all_muri_value',['_this.initChart()'],2,'_this.sel_value.target')"
            class="Productmarket_labqie_con2"
            :style="
              sel_value.target.all_muri_value == 2
                ? click_css_hxzb_y
                : click_css_hxzb_n
            "
          >
            <span :class="sel_value.target.all_muri_value == 2? 'title_change':''" :style="sum_zhibiao.title">{{sel_value.Range_on.Range_set=='3'? '线上':'搜索'}}</span>
            <span :style="sum_zhibiao.zhognxin">{{sel_title.quota_value.cont3}}</span>


            <span :style="sum_zhibiao.body">
              <i
                style="
                
                  width: 35%;
                  display: inline-block;
                  font-style: normal;
                "
                >环比</i
              >

              <!-- sel_value.target.all_muri_value == 2&&sel_value.Range_on.Range_set!='2'
                    ? Number(
                        sel_title.quota_value.cont4
                      ) > 0
                      ? 'rate-up-sel'
                      : 'rate-down-sel'
                    :   -->

              <i style="font-style: normal"
                :class="
                 
                    Number(
                        sel_title.quota_value.cont4
                      ) > 0
                    ? 'rate-up'
                    : 'rate-down'
                "
              >{{sel_value.Range_on.Range_set!='2'?sel_title.quota_value.cont4+'%':sel_title.quota_value.cont4}}</i>
            </span>
            
            <!-- <span style="padding-bottom: 4px;" :style="sum_zhibiao.body">
              <i
                style="
                 
                  width: 35%;
                  display: inline-block;
                  font-style: normal;
                "
                >{{ "暂时定的" }}</i
              >
              <i style="font-style: normal;">
                {{ 0+'%' }}
              </i>
            </span> -->

          </div>

          <div
            @click="Single_choice('all_muri_value',['_this.initChart()'],3,'_this.sel_value.target')"
            class="Productmarket_labqie_con3"
            :style="
              sel_value.target.all_muri_value == 3
                ? Object.assign({},click_css_hxzb_y,{'margin-right':'0%'}) 
                : Object.assign({},click_css_hxzb_n,{'margin-right':'0%'}) 
            "
          >

            <span :class="sel_value.target.all_muri_value == 3? 'title_change':''" :style="sum_zhibiao.title">{{sel_value.Range_on.Range_set=='3'?  '线下':'商品效果访客'}}</span>
            <span :style="sum_zhibiao.zhognxin">{{sel_title.quota_value.cont5}}</span>


            <span :style="sum_zhibiao.body">
              <i
                style="
                  
                  width: 35%;
                  display: inline-block;
                  font-style: normal;
                "
                >环比</i
              >

              <!--sel_value.target.all_muri_value == 3&&sel_value.Range_on.Range_set!='2'
                    ? Number(
                        sel_title.quota_value.cont6
                      ) > 0
                      ? 'rate-up-sel'
                      : 'rate-down-sel'
                    :  -->

              <i 
                style="font-style: normal"
                :class="

                    Number(
                        sel_title.quota_value.cont6
                      ) > 0
                    ? 'rate-up'
                    : 'rate-down'
                "
              >{{sel_value.Range_on.Range_set!='2'?sel_title.quota_value.cont6+'%':sel_title.quota_value.cont6}}</i>
            </span>
            
            <!-- <span style="padding-bottom: 4px;" :style="sum_zhibiao.body">
              <i
                style="
                  
                  width: 35%;
                  display: inline-block;
                  font-style: normal;
                "
                >{{ "暂时定的" }}</i
              >
              <i style="font-style: normal;">
                {{ 0+'%' }}
                
              </i>
            </span> -->
          </div>

          <div style="clear: both; padding-bottom: 0px"></div>
        </div>
      </section>



      <!-- 未发取消——开始 -->
      <section
        :style="(sel_value.Range_on.Range_set=='2')? {'display': 'block'}:{'display': 'none'}"
        style="padding-top: 10px; padding-bottom: 10px; border-radius: 4px;background: #ffffff;margin-left: 10px;margin-right: 10px;"
      >

      
        <div class="target_info">

          <van-row class="target_info_body" style="padding-left: 0px;padding-right: 0px;padding-top: 3px;">

            <van-col span="8">
              <i class="target_info_text_i">
                <span>金额</span></i
              >
              <span class="target_info_text_span">{{ fomatMoney(sel_title.quota_value.cont1)}}</span>
            </van-col>


            <!--  -->

            <van-col
              span="8"
              style=""
            >

              <i class="target_info_text_i"
                ><span>同期金额</span></i
              >
              <span style="border-right: 1px solid #eeeeee; border-left: 1px solid #eeeeee;" 
              class="target_info_text_span">{{fomatMoney(sel_title.quota_value.cont2)}}</span>

            </van-col>

            <van-col span="8">

              <i class="target_info_text_i"
                ><span>金额增额</span></i
              >
              <!-- 金额增幅 -->
              <span class="target_info_text_span" 
             
              
              >{{fomatMoney(sel_title.quota_value.cont3)}}</span>
              
            </van-col>
          </van-row>

          <van-row class="target_info_body" style="padding-top: 15px">
            <van-col span="8">
              <i class="target_info_text_i">
                <span>占销售比</span></i
              >             
              <span class="target_info_text_span">{{fomatMoney(sel_title.quota_value.cont4)}}</span>
            </van-col>

            <!-- border-right: 1px solid #eeeeee; border-left: 1px solid #eeeeee; -->
            <van-col
              span="8"
              style=""
            >
              <i class="target_info_text_i"
                ><span>同期占比</span></i
              >
              <span style="border-right: 1px solid #eeeeee; border-left: 1px solid #eeeeee;" 
              class="target_info_text_span">{{fomatMoney(sel_title.quota_value.cont5)}}</span>
            </van-col>

            <van-col span="8">
              <i class="target_info_text_i"
                ><span>同期差值</span></i
              > 
              <!-- 比率同比 -->
              <span class="target_info_text_span" >

                <i style="font-style: normal;font-size: 16px;"
                   :class="sel_value.Range_on.Range_set=='2'? Number(sel_title.quota_value.cont6)>0? 'rate-up_salesR':'rate-down_salesR':''"
                >
                  {{ sel_value.Range_on.Range_set=='2'?fomatMoney(sel_title.quota_value.cont6)+'%':0}}
                </i>

                
              </span>
            </van-col>
          </van-row>
        </div>


      </section>

      <!-- 未发取消——结束 -->





      <section
        style="padding-top: 5px; padding-bottom: 5px; border-radius: 4px; ;margin-left: 10px;margin-right: 10px;margin-bottom: 0px;"
        v-if="sel_value.Range_on.Range_set!='1'"
      >
       <div
          class="section-title test_addd"
          style="padding-left: 0px; padding-bottom: 0px"
        >
          {{ sel_value.Range_on.Range_set=='2'? '渠道分类趋势':'趋势'}}
        </div>
      </section>

      <div v-if="sel_value.Range_on.Range_set=='1'" style="width: 100%;margin-top: 10px;"></div>


      <section
        :style="(sel_value.Range_on.Range_set=='1'||sel_value.Range_on.Range_set=='3')? {'display': 'block'}:{'display': 'none'}"
        style="padding-top: 10px; padding-bottom: 10px; border-radius: 4px; ;margin-left: 10px;margin-right: 10px;margin-bottom: 0px;background-color: #ffffff;"
      >

          <!-- 图例开始 -->
          <!-- <i style="font-style: normal;display: block;height:40px;"></i> -->

          <i style="font-style: normal;display: block;height:40px; margin-bottom: 10px;margin-top: 0px; padding-left: 10px; padding-right: 10px;">
            <van-row  type="flex" justify="center" :style="canvas_qiehuan.canvas_toli_kg==true?canvas_qiehuan.canvas_toli_cssy:canvas_qiehuan.canvas_toli_cssn">
              <!-- <van-col span="6">span: 6</van-col> -->
              <van-col span="8">
                <div>
                  <div style="margin: 0 auto; width: 53px; height: 17px;">
                    <span>
                      <!-- <i style="font-style: normal;font-size: 12px; width: 15px;height: 2px;display: block; margin-left: 4px;margin-right: 4px;margin-top: 4px;float: left;">T&nbsp;-</i> -->
                      <i style="font-style: normal;font-size: 12px; width: 10px;height: 2px;display: block; margin-left: 4px;margin-top: 4px;float: left;">T</i>
                      <i style="font-style: normal;margin-right: 2px;">-</i>

                    </span>
  
                    <span style="font-size: 12px;">时间</span>
                  </div>
                  <div style="text-align: center;">
                    <!-- <i style="width: 15px;height: 4px;display: block; margin-right: 6px;margin-top: 6px;float: left;"></i> -->
                    <span style="font-size: 12px; color: #FF3300;">{{ barData.month }}</span>
                  </div> 
                </div>
                <!-- <div></div> -->
              </van-col>

              <van-col span="8">
                <div>
                  <div style="margin: 0 auto; width: 50px; height: 17px;">
                    <div style="height: 17px;display: block;float: left;">
                      <div style="width: 100%; height: 8px;"></div>
                      <i style="width: 15px;height: 2px;background-color: #1678FF;display: block; margin-right: 6px;"></i>

                    </div>
  
                    <div style="font-size: 12px;"><span>当期</span></div>
                  </div>
                  <div style="text-align: center;">
                    <!-- <i style="width: 15px;height: 4px;display: block; margin-right: 6px;margin-top: 6px;float: left;"></i> -->
                    <span style="font-size: 12px; color: #FF3300;">{{ barData.value }}</span>
                  </div> 
                </div>
                <!-- <div></div> -->
              </van-col>
              <van-col span="8">
                <div>
                  <div style="margin: 0 auto; width: 50px; height: 17px;">
                    <div style="height: 17px;display: block;float: left;">
                      <div style="width: 100%; height: 8px;"></div>
                      <i style="width: 15px;height: 2px;background-color: #F5A028;display: block; margin-right: 6px;"></i>
                    </div>
                    <div style="font-size: 12px;"><span>同期</span></div>

                  </div>
                  <div style="text-align: center;">
                    <!-- <i style="width: 15px;height: 4px;display: block; margin-right: 6px;margin-top: 6px;float: left;"></i> -->
                    <span style="font-size: 12px; color: #FF3300;">{{ barData.ago_value }}</span>
                  </div> 
                </div>
                <!-- <div></div> -->

              </van-col>
            </van-row>
          </i>
          <!-- 图例结束 style="height: 50vw"-->



        <div style="padding-left: 10px;padding-right: 10px;">
          <div ref="chart" style=" height: 200px;" 
          :style="{'width':(canvas_char.width-20)+'px'}"
              @touchstart="canvas_qiehuan.canvas_toli_kg=true" @touchend="canvas_qiehuan.canvas_toli_kg=false"></div>
        </div>
      </section>

      <!-- 未发取消——开始 -->
      <section
        :style="(sel_value.Range_on.Range_set=='2')? {'display': 'block'}:{'display': 'none'}"
        style="padding-top: 10px; padding-bottom: 10px; border-radius: 4px; ;margin-left: 10px;margin-right: 10px;margin-bottom: 0px;background-color: #ffffff;"
      >


        <!-- 切换优化开始 -->
        <!-- 切换优化结束 -->


          <!-- 图例开始 -->
          <!-- <i style="font-style: normal;display: block;height:40px;"></i> -->

          <i style="font-style: normal;display: block;height:40px; margin-bottom: 10px;margin-top: 0px; padding-left: 10px; padding-right: 10px;">
            <van-row  type="flex" justify="center" :style="canvas_qiehuan.canvas_toli_kg==true?canvas_qiehuan.canvas_toli_cssy:canvas_qiehuan.canvas_toli_cssn">
              <!-- <van-col span="6">span: 6</van-col> -->
              <van-col span="6">
                <div>
                  <div style="margin: 0 auto; width: 53px; height: 17px;">
                    <span>
                      <!-- <i style="font-style: normal;font-size: 12px; width: 15px;height: 2px;display: block; margin-left: 4px;margin-right: 4px;margin-top: 4px;float: left;">T&nbsp;-</i> -->
                      <i style="font-style: normal;font-size: 12px; width: 10px;height: 2px;display: block; margin-left: 4px;margin-top: 4px;float: left;">T</i>
                      <i style="font-style: normal;margin-right: 2px;">-</i>

                    </span>
  
                    <span style="font-size: 12px;">时间</span>
                  </div>
                  <div style="text-align: center;">
                    <!-- <i style="width: 15px;height: 4px;display: block; margin-right: 6px;margin-top: 6px;float: left;"></i> -->
                    <span style="font-size: 12px; color: #FF3300;">{{ nll_undefined(barData_lin.month) }}</span>
                  </div> 
                </div>
                <!-- <div></div> -->
              </van-col>


              <van-col span="6">
                <div>
                  <div style="margin: 0 auto; width: 50px; height: 17px;">
                    <div style="height: 17px;display: block;float: left;">
                      <div style="width: 100%; height: 8px;"></div>
                      <i style="width: 15px;height: 2px;background-color: #1678FF;display: block; margin-right: 6px;"></i>
                    </div>
                    <div style="font-size: 12px;"><span>线上</span></div>

                  </div>
                  <div style="text-align: center;">
                    <!-- <i style="width: 15px;height: 4px;display: block; margin-right: 6px;margin-top: 6px;float: left;"></i> -->
                    <span style="font-size: 12px; color: #FF3300;">{{ nll_undefined(barData_lin.value3) }}</span>
                  </div> 
                </div>
                <!-- <div></div> -->

              </van-col>



              <van-col span="6">
                <div>
                  <div style="margin: 0 auto; width: 50px; height: 17px;">
                    <div style="height: 17px;display: block;float: left;">
                      <div style="width: 100%; height: 8px;"></div>
                      <i style="width: 15px;height: 2px;background-color: #657798;display: block; margin-right: 6px;"></i>
                    </div>
                    <div style="font-size: 12px;"><span>线下</span></div>

                  </div>
                  <div style="text-align: center;">
                    <!-- <i style="width: 15px;height: 4px;display: block; margin-right: 6px;margin-top: 6px;float: left;"></i> -->
                    <span style="font-size: 12px; color: #FF3300;">{{ nll_undefined(barData_lin.value2) }}</span>
                  </div> 
                </div>
                <!-- <div></div> -->

              </van-col>

              
              <van-col span="6">
                <div>
                  <div style="margin: 0 auto; width: 50px; height: 17px;">
                    <div style="height: 17px;display: block;float: left;">
                      <div style="width: 100%; height: 8px;"></div>
                      <i style="width: 15px;height: 2px;background-color: #F5A028;display: block; margin-right: 6px;"></i>

                    </div>
  
                    <div style="font-size: 12px;"><span>海外</span></div>
                  </div>
                  <div style="text-align: center;">
                    <!-- <i style="width: 15px;height: 4px;display: block; margin-right: 6px;margin-top: 6px;float: left;"></i> -->
                    <span style="font-size: 12px; color: #FF3300;">{{ nll_undefined(barData_lin.value1) }}</span>
                  </div> 
                </div>
                <!-- <div></div> -->
              </van-col>


              <!-- <van-col span="6">
                <div>
                  <div style="margin: 0 auto; width: 50px; height: 17px;">
                    <div style="height: 17px;display: block;float: left;">
                      <div style="width: 100%; height: 8px;"></div>
                      <i style="width: 15px;height: 2px;background-color: #6A00A5;display: block; margin-right: 6px;"></i>
                    </div>
                    <div style="font-size: 12px;"><span>其它</span></div>
                  </div>
                  <div style="text-align: center;">
                    <span style="font-size: 12px; color: #FF3300;">{{ nll_undefined(barData_lin.value4) }}</span>  
                  </div> 
                </div>
              </van-col> -->


            </van-row>
          </i>
          <!-- 图例结束 style="height: 50vw"-->

        <div style="padding-left: 10px;padding-right: 10px;">
          <div ref="chart2" style=" height: 200px;" 
          :style="{'width':(canvas_char.width-20)+'px'}"
              @touchstart="canvas_qiehuan.canvas_toli_kg=true" @touchend="canvas_qiehuan.canvas_toli_kg=false"></div>
        </div>
      </section>
      <!-- 未发取消——结束 -->

      <!-- 活动区间趋势开始——开始 -->
      <section
        :style="(sel_value.Range_on.Range_set=='3')? {'display': 'block'}:{'display': 'none'}"
        style="padding-top: 5px; padding-bottom: 5px; border-radius: 4px; ;margin-left: 10px;margin-right: 10px;margin-bottom: 0px;"
      >
       <div
          class="section-title test_addd"
          style="padding-left: 0px; padding-bottom: 0px"
        >
          活动区间趋势
        </div>
      </section>



      <section 
      :style="(sel_value.Range_on.Range_set=='3')? {'display': 'block'}:{'display': 'none'}"
      style="padding-top: 10px; padding-bottom: 10px; border-radius: 4px; ;margin-left: 10px;margin-right: 10px;margin-bottom: 0px;background-color: #ffffff;">



          <!-- 切换优化开始 -->
          <van-row
            gutter=""
            type="flex"
            style="padding-left: 10px; padding-top: 0px;padding-bottom: 0px;"
          >
            <van-col
              span="5"
              @click="Single_choice('value_set',['_this.initChart3()'],1,'_this.shop_switch.shop_value')"
              :style="(shop_switch.shop_value.value_set==1)? shop_switch.shop_css.set_on:shop_switch.shop_css.set_off"
              style="margin-right: 1.5%; border-radius: 4px;"
            >
              <div style="padding: 4px; text-align: center; font-size: 12px">
                B店
              </div>
            </van-col>
            <van-col
              span="5"
              @click="Single_choice('value_set',['_this.initChart3()'],2,'_this.shop_switch.shop_value')"
              :style="(shop_switch.shop_value.value_set==2)? shop_switch.shop_css.set_on:shop_switch.shop_css.set_off"
              style="margin-right: 1.5%; border-radius: 4px;"
            >
              <div style="padding: 4px; text-align: center; font-size: 12px">
                D店
              </div>
            </van-col>

            <van-col
              span="5"
              @click="Single_choice('value_set',['_this.initChart3()'],3,'_this.shop_switch.shop_value')"
              :style="(shop_switch.shop_value.value_set==3)? shop_switch.shop_css.set_on:shop_switch.shop_css.set_off"
              style="margin-right: 1.5%; border-radius: 4px;"
            >
              <div style="padding: 4px; text-align: center; font-size: 12px">
                京东
              </div>
            </van-col>

            <van-col span="7">
              <div style="text-align: right; font-size: 12px;color: #CCCCCC;padding: 4px;padding-right: 0px;">单位：万</div>
            </van-col>
          </van-row>
          <div style="clear: both"></div>
          <!-- 切换优化结束 -->


      
        <div style="padding-left: 10px;padding-right: 10px;padding-top: 10px;">
          <div ref="chart3" style="width: 320px; height: 200px;"></div>
        </div>
      </section>
      <!-- 活动区间趋势结束——结束 -->



      <!-- 店铺来源开始 -->
      <section
        :style="(sel_value.Range_on.Range_set=='1')? {'display': 'block'}:{'display': 'none'}"
        style="padding-top: 5px; padding-bottom: 5px; border-radius: 4px; ;margin-left: 10px;margin-right: 10px;margin-bottom: 0px;"
      >
       <div
          class="section-title test_addd"
          style="padding-left: 0px; padding-bottom: 0px"
        >
          店铺来源
        </div>
      </section>

      <section
        :style="(sel_value.Range_on.Range_set=='1')? {'display': 'block'}:{'display': 'none'}"
        style="padding-top: 10px; padding-bottom: 10px; border-radius: 4px; ;margin-left: 10px;margin-right: 10px;margin-bottom: 0px;background-color: #ffffff;"
      >

        <!-- 具体表格开始 -->
        <ul
            class="table_all"
            style="
              margin-top: 0px;
              padding-left: 10px;
              padding-right: 10px;
              margin-left: 10px;
              margin-right: 10px;
              background-color: #f7f7f7;
              border-radius: 6px;
              text-align: center;
            "
          >
            <li class="table_title">
              <ul>
                        
                <li>指标名称</li>
                <li>访客数</li>
                <li>占比</li>
                <li>同比增额</li>
                <li>比率同比</li>
              </ul>
            </li>


          
            <li
              class="table_content"
              v-for="(val, key) in sel_title.quota_value.shop_source_value"
              :key="key"
            >
              <ul>

                <li >{{ val.NAME }}</li>
                <li >{{ ((val.PTD_CNT/10000||0).toFixed(1)).toLocaleString()+"万" }}</li>
                <li >{{((val.PTD_RATE||0)*100).toFixed(1)+"%"}}</li>
                <li >{{(((val.PTD_DIF||0)/10000).toFixed(1)).toLocaleString()+"万"}}</li>
                <li >
                  <i style="font-style: normal;" :class="Number((val.AGO_DIF_RATE||0))>0? 'rate-up':'rate-down'"
                  >{{((val.AGO_DIF_RATE||0)*100).toFixed(1)+"%"}}</i>
                </li>
  
              </ul>
            </li>

            <li style="clear: both"></li>
        </ul>
        <!-- 具体表格结束 -->
      </section>
      <div style="width:100%;clear: both;"></div>
      <!-- 店铺来源结束 -->


      <!-- 商品访客top10开始 -->
      <section
        :style="(sel_value.Range_on.Range_set!='3')? {'display': 'block'}:{'display': 'none'}"
        style="padding-top: 5px; padding-bottom: 5px; border-radius: 4px; ;margin-left: 10px;margin-right: 10px;margin-bottom: 0px;"
      >
       <div
          class="section-title test_addd"
          style="padding-left: 0px; padding-bottom: 0px"
        >
          {{sel_value.Range_on.Range_set=='2'? ' 宝贝ID TOP 10':'商品访客top10'}}
        </div>
      </section>


      <section
        :style="(sel_value.Range_on.Range_set!='3')? {'display': 'block'}:{'display': 'none'}"
        style="padding-top: 10px; padding-bottom: 10px; border-radius: 4px; ;margin-left: 10px;margin-right: 10px;margin-bottom: 0px;background-color: #ffffff;"
      >

        <!-- 具体表格开始 -->
        <ul
            class="table_all_top10"
            style="
              margin-top: 0px;
              padding-left: 10px;
              padding-right: 10px;
              margin-left: 10px;
              margin-right: 10px;
              background-color: #f7f7f7;
              border-radius: 6px;
              text-align: center;
            "
          >
            <li class="table_title">
              <ul>
                        
                <li style="width: 10%;">序号</li>
                <li style="width: 50%;">产品名称</li>
                <li style="width: 20%;">{{sel_value.Range_on.Range_set=='2'? '金额':'访客数'}}</li>
                <li style="width: 20%;">占比</li>
          
              </ul>
            </li>


            <li
              class="table_content"
              v-for="(val, key) in sel_title.quota_value.goods_top10_value"
              :key="key"
            >
              <ul class="table_top10">
                <!-- color: #1678ff; #159B80  color:#919191 ;-->

                <li style="width: 10%; ">{{ key+1 }}</li>
                <li style="width: 50%;text-align: left;">{{ val.ITEMS_TITLE }}</li>
                <li style="width: 20%;">{{ (((val.VISITORS||0)/10000).toFixed(1)).toLocaleString()+'万' }}</li>
                <li style="width: 20%;">
                  <i style="font-style: normal;" >
                    {{ (((val.VISITORS_RATE||0)*100).toFixed(1)).toLocaleString()+"%" }}
                  </i>
                  
                </li>
              
              </ul>
            </li>


            <li style="clear: both"></li>
        </ul>


        <!-- 具体表格结束 -->

      </section>


      <!-- 商品访客top10结束 -->



      <!-- 城市等级变化开始 -->
      <section
        :style="(sel_value.Range_on.Range_set=='3')? {'display': 'block'}:{'display': 'none'}"
        style="padding-top: 5px; padding-bottom: 5px; border-radius: 4px; ;margin-left: 10px;margin-right: 10px;margin-bottom: 0px;"
      >
       <div
          class="section-title test_addd"
          style="padding-left: 0px; padding-bottom: 0px"
        >
          城市等级变化
        </div>
      </section>

      <section
        :style="(sel_value.Range_on.Range_set=='3')? {'display': 'block'}:{'display': 'none'}"
        style="padding-top: 10px; padding-bottom: 10px; border-radius: 4px; ;margin-left: 10px;margin-right: 10px;margin-bottom: 0px;background-color: #ffffff;"
      >

        <!-- 具体表格开始 -->
        <ul
            class="table_all_top10"
            style="
              margin-top: 0px;
              padding-left: 10px;
              padding-right: 10px;
              margin-left: 10px;
              margin-right: 10px;
              background-color: #f7f7f7;
              border-radius: 6px;
              text-align: center;
            "
          >
            <li class="table_title">
              <ul>
                        
                <li style="width: 33.33333%;">城市等级</li>
                <li style="width: 33.33333%;">客单价</li>
                <li style="width: 33.33333%;">同比增幅</li>
                <!-- <li style="width: 33.33333%;">占比</li> -->
              </ul>
            </li>

            

            <li
              class="table_content"
              v-for="(val, key) in sel_title.quota_value.city_value"
              :key="key"
            >
              <ul>

                <li style="width: 33.33333%;">{{ val.GRADE }}</li>
                <li style="width: 33.33333%;">{{ ((val.PCT_COMP).toFixed(1)*1).toLocaleString()+""||0 }}</li>
                <li style="width: 33.33333%;">{{ ((val.PCT_COMP_RATE_PREV||0)*100).toFixed(2)+'%'}}</li>
  
              </ul>
            </li>

  
          
            <li style="clear: both"></li>
        </ul>
        <!-- 具体表格结束 -->

      </section>

      <!-- 城市等级变化结束 -->



    <!-- background: rgba(245, 245, 245, 1); -->
    <div style="width: 100%; height: 50px; ">
      <!-- <p style="text-align: center;margin: 0px;font-size: 14px;color: #CCCCCC;padding-top: 10px;">————  已经见底了  ————</p> -->
      <!-- <p style="text-align: center;margin: 0px;font-size: 14px;color: #CCCCCC;padding-top: 10px;">
        <span style="margin-top: 1px;position: absolute;margin-left: -60px;border-bottom: 1px solid #CCCCCC;height: 10px;width: 56px;"></span> 
        <span style="font-weight: bold;">·</span> 已经见底了 
        <span style="font-weight: bold;">·</span>  
        <span style="margin-top: 1px;position: absolute;margin-left: 3.5px;border-bottom: 1px solid #CCCCCC;height: 10px;width: 56px;"></span>
      </p> -->
      <!-- <van-row type="flex" justify="center">
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
      </van-row> -->
      <BottomCss></BottomCss>

    </div>
    <div style="width: 100%; height: 50px; "></div>

    </div>
    </van-pull-refresh>
    <!-- 滑屏结束 -->



  </div>

</template>

<script>
// import InProgress from '@/assets/svg/in-progress.svg'
import bottom_css from "@/views/bottom-css/bottom-css.vue";

import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";
import "echarts/lib/component/legend";
import "echarts/lib/component/tooltip";


import { mapState } from "vuex";
import {
  // decimal2Percent,
  calcSignClass,
  generatePromise,
  Information_log
} from "@/utils/helpers";

import {
  Row,
  Col,
  Button,
  NoticeBar,
  PullRefresh,
  Toast,
  DatetimePicker,
  Popup,
  Collapse,
  CollapseItem,  
  Empty,
  Loading,
  Picker,
  Icon,
} from "vant";


export default {
  name: "MarketOperation_con",
  // components: {InProgress}
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
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Empty.name]: Empty,
    [Loading.name]:Loading,
    [Picker.name]:Picker,
    [Icon.name]:Icon,
    BottomCss:bottom_css
  },
  data(){
    return {

      activeNames_tips:['1'],

      loading_value:{
        day_1_val:false,
        day_7_val:false,
        day_month_val:false
      },

      test_time_date:['2020年01月','2020年02月','2020年03月','2020年04月','2020年05月','2020年06月','2020年07月','2020年08月','2020年09月','2020年10月','2020年11月','2020年12月',],
      ym_default_index:"",
      isLoading: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      show: false,

      question_show: false,

      canvas_qiehuan:{

        canvas_toli_cssy:{
          "padding-top": '0px',
          "background-color": 'aliceblue' ,
          // "padding-bottom": '0px',
          // "margin-top": '10px'
        },
        canvas_toli_cssn:{
          "padding-top": '0px',
          "background-color": '#ffffff' ,
          // "padding-bottom": '0px',
          // "margin-top": '10px'
        },
        canvas_toli_kg:false,

      },

      barData: {
        value: 0,
        ago_value: 0,
        month:0,
      },

      barData_lin: {
        value1: 0,
        value2: 0,
        value3: 0,
        value4: 0,
        month:0,
      },


      sel_value: {
        day_set: {
          day_1: false,
          day_7: false,
          day_30: false,
          month: false,
        },
        theme: {
          cpcy: true,
          ouk: false,
          muying: false,
        },
        target: {
          all_muri_value: "",
        },
        Range_on: {
          Range_set: "",
        },
        canvas_on: {
          canvas_yes: false,
          canvas_no: false,
        },
      },

      hexinzhibiao:{
        width:'',
      },
      canvas_char:{
        width:'',
      },


      // click_css_set: { type: "info", color: "rgb(22, 120, 255)" color: "#159B80" },
      click_css_set: { type: "info", color: "#23B0A8" },
      click_css_no: { type: "default", color: "" },
      click_css_no_grey: { type: "default", color: "#CCCCCC" },

      click_css_hxzb_y: {
        width: "32%",
        float: "left",
        // color:"#FFFFFF",
        color:"#000000",

        // "border-top": "2px solid rgba(89, 178, 178, 1)",
        // "background-color": "#1678FF", 
        // "background-color": "#1196EE",
        // "background-color": "#159B80",
        // "background-color": "#159B80",
        "border": "1px solid #23B0A8",

        "padding-bottom": "5px",
        "border-radius": "4px",
        "margin-right": "1.5%",
        "padding-left": "5px"
        
      },
      click_css_hxzb_n: {
        width: "32%",
        float: "left",

        // color:"#FFFFFF",
        color:"#000000",

        // "border-top": "2px solid #dddddd",
        "background-color": "#F7F7F7",
        "border-radius": "4px",
        "padding-bottom": "5px",
        "margin-right": "1.5%",
        "padding-left": "5px",
        "border": "1px solid #F7F7F7",

      },


      sum_zhibiao: {
        title: {
          width: "100%",
          // "font-weight": "bold",
          "font-size": "12px",
          display: "block",
          "padding-left": "3px",
          "padding-top": "8px",
        },
        zhognxin: {
          width: "100%",
          "font-size": "14px",
          display: "block",
          "padding-left": "3px",
          "padding-top": "2px",
          "height": "21px"
        },
        body: {
          width: "100%",
          "font-size": "12px",
          display: "block",
          "padding-left": "3px",
          "padding-top": "2px",
        },
        red_css: {
          color: "red",
          "font-style": "normal",
        },
        green_css: {
          color: "green",
          "font-style": "normal",
        },
        white_css: {
          color: "#ffffff",
          // color: "red",
          "font-style": "normal",
        },

      },


      // 关于店铺的切换样式开始
      shop_switch:{
        shop_value:{
          value_set:""
        },
        shop_css:{
          set_on:{
            "border-radius": "4px",
            "background": "rgb(22, 120, 255)",
            "color": "rgb(255, 255, 255)",
            // "padding": "5px",
          },
          set_off:{
            "border-radius": "4px",
            "background": "rgb(230, 230, 230)",
            // "color": "rgb(255, 255, 255)",
            // "padding": "5px",
          }

        },


      },
      // 关于店铺的切换样式结束


      set_time:
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1 >= 1 && new Date().getMonth() + 1 <= 9
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1) +
        "-01",
      set_time_range: {
        start: "",
        end: "",
      },


      sel_title: {
        chanzhi_wenzi: {
          title_all: "实时业绩",
          title_content: {
            content1: "",
            content2: "",
            content3: "",
            content4: "",
            content5: "",
            content6: "",
          },
        },

        quota_value: {
          cont1: 0,
          cont2: 0,
          cont3: 0,
          cont4: 0,
          cont5: 0,
          cont6: 0,
          city_value:[],  
          shop_source_value:[],
          goods_top10_value:[],
        }, //六大指标的

      },


      data_load_time:"",

      data:{
       
        "FS_YY_KD-PCT_CITY_M": "" ,
        "FS_YY_KD-PCT_SHOP_ACT_M": "" ,
        "FS_YY_KD-PCT_CANAL_M": "" ,

        "FS_YY_FX-LOAD_TIME":"",

        "FS_YY_WF-BAO_BEO_TOP10_1DAY":"",
        "FS_YY_WF-SALE_RATE_1DAY":"",
        "FS_YY_WF-AGO_RATE_1DAY":"",
        "FS_YY_WF-AGO_AMT_1DAY":"",
        "FS_YY_WF-YOY_RATE_1DAY":"",
        "FS_YY_WF-AMT_1DAY":"",
        "FS_YY_WF-RATE_AMT_1DAY":"",
        "FS_YY_WF-RATE_TREND_1DAY":"",

        "FS_YY_WF-BAO_BEO_TOP10_7DAY":"",
        "FS_YY_WF-SALE_RATE_7DAY":"",
        "FS_YY_WF-AGO_RATE_7DAY":"",
        "FS_YY_WF-AGO_AMT_7DAY":"",
        "FS_YY_WF-YOY_RATE_7DAY":"",
        "FS_YY_WF-AMT_7DAY":"",
        "FS_YY_WF-RATE_AMT_7DAY":"",
        "FS_YY_WF-RATE_TREND_7DAY":"",
        "FS_YY_WF-BAO_BEO_TOP10_MONTH":"",
        "FS_YY_WF-SALE_RATE_MONTH":"",
        "FS_YY_WF-AGO_RATE_MONTH":"",
        "FS_YY_WF-AGO_AMT_MONTH":"",
        "FS_YY_WF-YOY_RATE_MONTH":"",
        "FS_YY_WF-AMT_MONTH":"",
        "FS_YY_WF-RATE_AMT_MONTH":"",
        "FS_YY_WF-RATE_TREND_MONTH":"",

      },
      data_loay:false,
      echarts_clear:false

    }
  },

  computed: {
    ...mapState("user", ["permissionList"]), //大概的意思是获取权限
  },



  created() {
    this.hexinzhibiao.width=window.innerWidth-40+'px';
    this.canvas_char.width=window.innerWidth-20;

    this.time_update_now();

    this.$EventBus.$emit("data_loay_set", {
      data_loay_seton: false,
    });


    const [p1, resolve1] = generatePromise();
    const [p2, resolve2]= generatePromise();
    const [p3, resolve3]= generatePromise();
    const [p4, resolve4]= generatePromise();
    const [p5, resolve5]= generatePromise();
    const [p6, resolve6]= generatePromise();
    const [p7, resolve7]= generatePromise();
    const [p8, resolve8]= generatePromise();
    // this.p1 = p1;
    this.p1= Promise.all([p1,p2,p3,p4,p5,p6,p7,p8]);

    const apiMap = {

      "SQL-FS_YY_FX-LOAD_TIME":{ resultProp: "LOAD_TIME" },

      //  实际上用到的！！！
      // "SQL-FS_YY_WF-BAO_BEO_TOP10_7DAY":{ resultProp: "BAO_BEO_TOP10_7DAY" },
      // "SQL-FS_YY_WF-SALE_RATE_7DAY":{ resultProp: "SALE_RATE_7DAY" },
      // "SQL-FS_YY_WF-AGO_RATE_7DAY":{ resultProp: "AGO_RATE_7DAY" },
      // "SQL-FS_YY_WF-AGO_AMT_7DAY":{ resultProp: "AGO_AMT_7DAY" },
      // "SQL-FS_YY_WF-YOY_RATE_7DAY":{ resultProp: "YOY_RATE_7DAY" },
      // "SQL-FS_YY_WF-AMT_7DAY":{ resultProp: "AMT_7DAY" },
      // "SQL-FS_YY_WF-RATE_AMT_7DAY":{ resultProp: "RATE_AMT_7DAY" },
      // "SQL-FS_YY_WF-RATE_TREND_7DAY":{ resultProp: "RATE_TREND_7DAY" },

      // "SQL-FS_YY_WF-BAO_BEO_TOP10_MONTH":{ resultProp: "BAO_BEO_TOP10_MONTH" },
      // "SQL-FS_YY_WF-SALE_RATE_MONTH":{ resultProp: "SALE_RATE_MONTH" },
      // "SQL-FS_YY_WF-AGO_RATE_MONTH":{ resultProp: "AGO_RATE_MONTH" },
      // "SQL-FS_YY_WF-AGO_AMT_MONTH":{ resultProp: "AGO_AMT_MONTH" },
      // "SQL-FS_YY_WF-YOY_RATE_MONTH":{ resultProp: "YOY_RATE_MONTH" },
      // "SQL-FS_YY_WF-AMT_MONTH":{ resultProp: "AMT_MONTH" },
      // "SQL-FS_YY_WF-RATE_AMT_MONTH":{ resultProp: "RATE_AMT_MONTH" },
      // "SQL-FS_YY_WF-RATE_TREND_MONTH":{ resultProp: "RATE_TREND_MONTH" },

      // "SQL-FS_YY_WF-YOY_RATE_1DAY":{ resultProp: "YOY_RATE_1DAY" },



      // "SQL-FS_YY_FX-F_AMT_1DAY":{ resultProp: "F_AMT_1DAY" },
      // "SQL-FS_YY_WF-BAO_BEO_TOP10_1DAY":{ type: Array, resolve8: resolve8 },
      // "SQL-FS_YY_WF-SALE_RATE_1DAY":{ type: Array, resolve7: resolve7 },
      // "SQL-FS_YY_WF-AGO_RATE_1DAY":{ type: Array, resolve6: resolve6 },
      // "SQL-FS_YY_WF-AGO_AMT_1DAY":{ type: Array, resolve5: resolve5 },
      // "SQL-FS_YY_WF-RATE_AMT_1DAY":{ type: Array, resolve4: resolve4 },
      "SQL-FS_YY_WF-RATE_TREND_1DAY":{ resultProp: "RATE_TREND_1DAY" },
      "SQL-FS_YY_WF-AMT_1DAY":{ resultProp: "AMT_1DAY" },
      // "SQL-FS_YY_WF-YOY_RATE_1DAY":{ type: Array, resolve: resolve1 },


      "SQL-FS_YY_WF-BAO_BEO_TOP10_7DAY":{ type: Array, resolve8: resolve8 },
      "SQL-FS_YY_WF-SALE_RATE_7DAY":{ type: Array, resolve7: resolve7 },
      "SQL-FS_YY_WF-AGO_RATE_7DAY":{ type: Array, resolve6: resolve6 },
      "SQL-FS_YY_WF-AGO_AMT_7DAY":{ type: Array, resolve5: resolve5 },
      "SQL-FS_YY_WF-YOY_RATE_7DAY":{ type: Array, resolve4: resolve4 },
      "SQL-FS_YY_WF-AMT_7DAY":{ type: Array, resolve3: resolve3 },
      "SQL-FS_YY_WF-RATE_AMT_7DAY":{ type: Array, resolve2: resolve2 },
      "SQL-FS_YY_WF-RATE_TREND_7DAY":{ type: Array, resolve: resolve1 },



    };

    Object.keys(apiMap).forEach((key) => {
      if (this.permissionList[key]) { 
        const [, prefix, interfaceName] = key.split("-"); //把上面的拆分出来
        if (prefix && interfaceName) {
          // console.log(prefix+"              "+interfaceName);
          this.$axios
            .post(`/api/admin/data/${prefix}/${interfaceName}/get`, {})
            .then(({ data }) => {

              if (apiMap[key].type === Array) {
                this.data[`${prefix}-${interfaceName}`] = data;
              } else {
                this.data[`${prefix}-${interfaceName}`] = data;
              }

              if (apiMap[key].resolve) {
                apiMap[key].resolve();
                this.data_loay=true;
                console.log("加载完成！！！！！！！！！！！！！！！");
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
              }
              else if(apiMap[key].resolve4){
                apiMap[key].resolve4();
              }
              else if(apiMap[key].resolve5){
                apiMap[key].resolve5();
              }
              else if(apiMap[key].resolve6){
                apiMap[key].resolve6();
              }
              else if(apiMap[key].resolve7){
                apiMap[key].resolve7();
              }
              else if(apiMap[key].resolve8){
                apiMap[key].resolve8();
              }

            });
        }
      }
    });

    console.log("===========渠道运营==============");
    console.log(this.data);


    // console.log(resolve1);
    // console.log(decimal2Percent);
    console.log(generatePromise);
    console.log(calcSignClass);

    
  },

  mounted(){

    this.Single_choice('all_muri_value','',1,'_this.sel_value.target');

    this.$EventBus.$on("Salechan_marketoper_f", (Range_value_set) => {
      console.log("父类传值过来的   渠道运营！！！！");
      // console.log(Range_value_set.Range_value_set);
      // this.change_show(Range_value_set.Range_value_set);
      let set_value = "";

      this.sel_value.Range_on.Range_set = Range_value_set.Range_value_set;
      switch (Range_value_set.Range_value_set) {
        // case "1":
        //   set_value = "cpcy";
        //   Information_log('渠道运营-流量分析','渠道运营-流量分析页面:  '+'数据加载完成');
        //   break;

        case "2":
          Information_log('渠道运营-未发取消','渠道运营-未发取消页面:  '+'数据加载完成');
          set_value = "ouk";

          // if(Range_value_set.Range_value_set=='3'){
          //   this.Single_choice('month',['_this.data_screen_quota()','_this.initChart()','_this.initChart2()'],true,'_this.sel_value.day_set')
          // }else{          }
          this.Single_choice('day_7',['_this.data_screen_quota()','_this.initChart2()'],true,'_this.sel_value.day_set')


          // this.data_screen_quota();
          this.Single_choice(set_value,'',true,'_this.sel_value.theme');
          // this.initChart3();
          this.echarts_clear=true;

          break;

        // case "3":
        //   set_value = "muying";
        //   break;
        // default:
        //   set_value = "cpcy";
      }


      // console.log(set_value);
      // console.log(this.sel_value.Range_on.Range_set);


    });



    this.sel_value.Range_on.Range_set='2';
    this.Single_choice('ouk','',true,'_this.sel_value.theme')


    this.Single_choice('value_set','',1,'_this.shop_switch.shop_value')

    this.Single_choice('day_7',['_this.data_screen_quota()',],true,'_this.sel_value.day_set')


    // this.data_screen_quota();
    // this.initChart();
    this.initChart2();
    // this.initChart3();

  },
  methods:{

    time_update_now(){

      console.log("as============ad");
      let year_now_time=new Date();
      let month = year_now_time.getMonth() + 1; //月
      year_now_time=year_now_time.getFullYear();

      let now_time_set=(year_now_time+'年'+(month<10?'0'+month:month)+'月');
      
      let year_month_arr=[]

      for(let i=0;i<2;i++){
        for(let j=0;j<12;j++){
          // console.log(j+1);
          if((j+1)<10){
            // console.log('0'+(j+1));
            year_month_arr.push((year_now_time-1)+'年'+'0'+(j+1)+'月');

          }else{
            // console.log(j+1);
            year_month_arr.push((year_now_time-1)+'年'+(j+1)+'月');
          }
        }
        year_now_time=year_now_time+(1)
      }




      Object.keys(year_month_arr).forEach((key) => {
        if(now_time_set==year_month_arr[key]){
          console.log(key);
          this.ym_default_index=key*1
        }
      });


      this.test_time_date=year_month_arr;

    },

    onConfirm(value, index) {
      // Toast();

      console.log(value);

      this.show = false;   
      let year_set=value.substring(0,4);
      let month_set=value.substring(5,7);
      console.log(`当前值：${value}, 当前索引：${index}`);
      // console.log(year_set);
      // console.log(month_set);
      // console.log(year_set+'-'+month_set+'-'+'01');
      this.set_time = year_set+'-'+month_set+'-'+'01';

      this.Single_choice('month',['_this.loading_data_fun()','_this.data_screen_quota()','_this.initChart2()','_this.echarts_clear=true'],true,'_this.sel_value.day_set')


    },

    onChange(picker, value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
    },
    onCancel() {
      console.log('取消');
      this.show = false;
    },



    onRefresh() {
      // setTimeout(() => {
      //   // Toast('刷新成功');
      //   // 暂时还没用得上只是做个效果出来
      //   this.isLoading = false;
      //   this.count++;
      // }, 1000);

      this.$EventBus.$emit("data_loay_set", {
        data_loay_seton: false,
      }); 
      let apiMap_set=[];
      if(this.sel_value.day_set.day_1==true){
          apiMap_set = {
            "SQL-FS_YY_WF-BAO_BEO_TOP10_7DAY":{ resultProp: "BAO_BEO_TOP10_7DAY" },
            "SQL-FS_YY_WF-SALE_RATE_7DAY":{ resultProp: "SALE_RATE_7DAY" },
            "SQL-FS_YY_WF-AGO_RATE_7DAY":{ resultProp: "AGO_RATE_7DAY" },
            "SQL-FS_YY_WF-AGO_AMT_7DAY":{ resultProp: "AGO_AMT_7DAY" },
            "SQL-FS_YY_WF-YOY_RATE_7DAY":{ resultProp: "YOY_RATE_7DAY" },
            "SQL-FS_YY_WF-AMT_7DAY":{ resultProp: "AMT_7DAY" },
            "SQL-FS_YY_WF-RATE_AMT_7DAY":{ resultProp: "RATE_AMT_7DAY" },
            "SQL-FS_YY_WF-RATE_TREND_7DAY":{ resultProp: "RATE_TREND_7DAY" },
          }; 
          this.ajax_data(apiMap_set);
      }else if(this.sel_value.day_set.day_7==true){
          apiMap_set = {
            "SQL-FS_YY_WF-BAO_BEO_TOP10_7DAY":{ resultProp: "BAO_BEO_TOP10_7DAY" },
            "SQL-FS_YY_WF-SALE_RATE_7DAY":{ resultProp: "SALE_RATE_7DAY" },
            "SQL-FS_YY_WF-AGO_RATE_7DAY":{ resultProp: "AGO_RATE_7DAY" },
            "SQL-FS_YY_WF-AGO_AMT_7DAY":{ resultProp: "AGO_AMT_7DAY" },
            "SQL-FS_YY_WF-YOY_RATE_7DAY":{ resultProp: "YOY_RATE_7DAY" },
            "SQL-FS_YY_WF-AMT_7DAY":{ resultProp: "AMT_7DAY" },
            "SQL-FS_YY_WF-RATE_AMT_7DAY":{ resultProp: "RATE_AMT_7DAY" },
            "SQL-FS_YY_WF-RATE_TREND_7DAY":{ resultProp: "RATE_TREND_7DAY" },
          }; 
          this.ajax_data(apiMap_set);
      }else if(this.sel_value.day_set.month==true){
          apiMap_set = {
            "SQL-FS_YY_WF-BAO_BEO_TOP10_MONTH":{ resultProp: "BAO_BEO_TOP10_MONTH" },
            "SQL-FS_YY_WF-SALE_RATE_MONTH":{ resultProp: "SALE_RATE_MONTH" },
            "SQL-FS_YY_WF-AGO_RATE_MONTH":{ resultProp: "AGO_RATE_MONTH" },
            "SQL-FS_YY_WF-AGO_AMT_MONTH":{ resultProp: "AGO_AMT_MONTH" },
            "SQL-FS_YY_WF-YOY_RATE_MONTH":{ resultProp: "YOY_RATE_MONTH" },
            "SQL-FS_YY_WF-AMT_MONTH":{ resultProp: "AMT_MONTH" },
            "SQL-FS_YY_WF-RATE_AMT_MONTH":{ resultProp: "RATE_AMT_MONTH" },
            "SQL-FS_YY_WF-RATE_TREND_MONTH":{ resultProp: "RATE_TREND_MONTH" },
          }; 
          this.ajax_data(apiMap_set);
      }
      this.isLoading = false;
    },

    showPopup() {
      this.show = true;
    },

    showPopup_sm(){
      this.question_show=true;
    },

    showPopup_close(){
      this.activeNames_tips=[];
    },

    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      }

      console.log(val);

      return val;
    },

    time_sel(val) {
      // console.log(val)
      let year = val.getFullYear(); //年
      let month = val.getMonth() + 1; //月
      let day = val.getDate(); //日
      let hour = val.getHours(); //时
      let minute = val.getMinutes(); //分
      if (month >= 1 && month <= 9) {
        month = `0${month}`;
      }
      if (day >= 1 && day <= 9) {
        day = `0${day}`;
      }
      if (hour >= 0 && hour <= 9) {
        hour = `0${hour}`;
      }
      if (minute >= 0 && minute <= 9) {
        minute = `0${minute}`;
      }
      // this.user_birthday = `${year}-${month}-${day} ${hour}:${minute}`
      this.set_time = `${year}-${month}-${day}`;


      console.log(this.set_time);
      this.show = false;

      this.Single_choice('month',['_this.loading_data_fun()','_this.data_screen_quota()','_this.initChart2()'],true,'_this.sel_value.day_set')

    },

    time_cancel() {
      this.show = false;
    },

    Single_choice(value, josn_value, target_value, for_value) {
      var _this = this;
      _this.show; //意义不大 防止定义不调用出现的报错
      for_value = eval(for_value);

      // console.log(for_value);
      // _this.test_fun();

      Object.keys(for_value).forEach((key) => {
        if (key == value) {
          for_value[key] = target_value;
        } else {
          for_value[key] = false;
        }
      });

      if (josn_value) {
        // console.log(josn_value);
        // _this.test_fun();
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



    loading_data_fun(){

      console.log("=======运行上 longing===========");

      let apiMap_set=[];

      if(this.sel_value.day_set.day_1==true){
        if(this.loading_value.day_1_val==false){
          this.$EventBus.$emit("data_loay_set", {
            data_loay_seton: false,
          });              
          apiMap_set = {

            // "SQL-FS_YY_WF-BAO_BEO_TOP10_7DAY":{ resultProp: "BAO_BEO_TOP10_7DAY" },
            // "SQL-FS_YY_WF-SALE_RATE_7DAY":{ resultProp: "SALE_RATE_7DAY" },
            // "SQL-FS_YY_WF-AGO_RATE_7DAY":{ resultProp: "AGO_RATE_7DAY" },
            // "SQL-FS_YY_WF-AGO_AMT_7DAY":{ resultProp: "AGO_AMT_7DAY" },
            // "SQL-FS_YY_WF-YOY_RATE_7DAY":{ resultProp: "YOY_RATE_7DAY" },
            // "SQL-FS_YY_WF-AMT_7DAY":{ resultProp: "AMT_7DAY" },
            // "SQL-FS_YY_WF-RATE_AMT_7DAY":{ resultProp: "RATE_AMT_7DAY" },
            // "SQL-FS_YY_WF-RATE_TREND_7DAY":{ resultProp: "RATE_TREND_7DAY" },

            "SQL-FS_YY_FX-F_AMT_1DAY":{ resultProp: "F_AMT_1DAY" },
            "SQL-FS_YY_WF-BAO_BEO_TOP10_1DAY":{ resultProp: "BAO_BEO_TOP10_1DAY" },
            "SQL-FS_YY_WF-SALE_RATE_1DAY":{ resultProp: "SALE_RATE_1DAY" },
            "SQL-FS_YY_WF-AGO_RATE_1DAY":{ resultProp: "AGO_RATE_1DAY" },
            "SQL-FS_YY_WF-AGO_AMT_1DAY":{ resultProp: "AGO_AMT_1DAY" },
            "SQL-FS_YY_WF-RATE_AMT_1DAY":{ resultProp: "RATE_AMT_1DAY" },
            "SQL-FS_YY_WF-RATE_TREND_1DAY":{ resultProp: "RATE_TREND_1DAY" },
            "SQL-FS_YY_WF-AMT_1DAY":{ resultProp: "AMT_1DAY" },
            "SQL-FS_YY_WF-YOY_RATE_1DAY":{ resultProp: "YOY_RATE_1DAY" },
   
          }; 
          this.ajax_data(apiMap_set);
          this.loading_value.day_1_val=true;
        }      
      
      }else if(this.sel_value.day_set.month==true){
        if(this.loading_value.day_month_val==false){
          this.$EventBus.$emit("data_loay_set", {
            data_loay_seton: false,
          });    
          apiMap_set = {

            "SQL-FS_YY_WF-BAO_BEO_TOP10_MONTH":{ resultProp: "BAO_BEO_TOP10_MONTH" },
            "SQL-FS_YY_WF-SALE_RATE_MONTH":{ resultProp: "SALE_RATE_MONTH" },
            "SQL-FS_YY_WF-AGO_RATE_MONTH":{ resultProp: "AGO_RATE_MONTH" },
            "SQL-FS_YY_WF-AGO_AMT_MONTH":{ resultProp: "AGO_AMT_MONTH" },
            "SQL-FS_YY_WF-YOY_RATE_MONTH":{ resultProp: "YOY_RATE_MONTH" },
            "SQL-FS_YY_WF-AMT_MONTH":{ resultProp: "AMT_MONTH" },
            "SQL-FS_YY_WF-RATE_AMT_MONTH":{ resultProp: "RATE_AMT_MONTH" },
            "SQL-FS_YY_WF-RATE_TREND_MONTH":{ resultProp: "RATE_TREND_MONTH" },

          }; 
          this.ajax_data(apiMap_set);
          this.loading_value.day_month_val=true;          
        }
         
      }
      

    },



    data_screen_quota(){

      console.log("======数据配对======");
      this.p1.then(() => {

        try{


          let data = this.data_screen(this.data);

          // this.data_load_time=(this.data["FS_YY_FX-LOAD_TIME"][0].LOAD_TIME).substring(0,11);


          
          // console.log(this.data["FS_YY_FX-F_AMT_1DAY"]);

          if(this.sel_value.Range_on.Range_set=='1'){
            
            this.sel_title.chanzhi_wenzi.title_all="核心指标"
            this.sel_title.chanzhi_wenzi.title_content.content1="访客"
            this.sel_title.chanzhi_wenzi.title_content.content2="搜索"
            this.sel_title.chanzhi_wenzi.title_content.content3="商品效果访客"
            this.sel_title.chanzhi_wenzi.title_content.content4="同比"
            this.sel_title.chanzhi_wenzi.title_content.content5="同比"
            this.sel_title.chanzhi_wenzi.title_content.content6="同比"

            // console.log("=======111111111======");
            // console.log(data);
            let data_timeon=[];

            if(this.sel_value.day_set.day_1==true){
              data_timeon = this.data_time_on(data,[
                'FS_YY_FX-F_BAO_BEO_TOP10_1DAY',
                'FS_YY_FX-F_SALE_RATE_1DAY',
                'FS_YY_FX-F_AGO_RATE_1DAY',
                'FS_YY_FX-F_AGO_AMT_1DAY',
                'FS_YY_FX-F_YOY_RATE_1DAY',
                'FS_YY_FX-F_AMT_1DAY',
                'FS_YY_FX-F_RATE_AMT_1DAY',
                'FS_YY_FX-F_RATE_TREND_1DAY',
                'FS_YY_FX-F_VISITOR_1DAY',
                'FS_YY_FX-F_TREND_VISITOR_1DAY',
                'FS_YY_FX-F_VISITOR_YOY_1DAY',]);

              this.sel_title.quota_value.cont1=((data_timeon["FS_YY_FX-F_VISITOR_1DAY"][0].PTD_VISITORS||0)/10000).toFixed(1)+'万';
              this.sel_title.quota_value.cont2=((data_timeon["FS_YY_FX-F_VISITOR_YOY_1DAY"][0].PTD_VISITORS_RATE||0)*100).toFixed(1);

              this.sel_title.quota_value.cont3=((data_timeon["FS_YY_FX-F_AMT_1DAY"][0].PTD_VISITORS_SEACH||0)/10000).toFixed(1)+'万';
              this.sel_title.quota_value.cont4=((data_timeon["FS_YY_FX-F_RATE_TREND_1DAY"][0].PTD_VISITORS_SEACH_RATE||0)*100).toFixed(1);

              this.sel_title.quota_value.cont5=((data_timeon["FS_YY_FX-F_AGO_RATE_1DAY"][0].PTD_NUM_VISITORS||0)/10000).toFixed(1)+'万';
              this.sel_title.quota_value.cont6=((data_timeon["FS_YY_FX-F_YOY_RATE_1DAY"][0].PTD_NUM_VISITORS_RATE||0)*100).toFixed(1);

              
              data_timeon["FS_YY_FX-F_SALE_RATE_1DAY"].sort((a, b) => {
                let a_time = "";
                let b_time = "";
                a_time = a["PTD_CNT"];
                b_time = b["PTD_CNT"];
                return  b_time-a_time;
              });
              this.sel_title.quota_value.shop_source_value=data_timeon["FS_YY_FX-F_SALE_RATE_1DAY"];



              // top10商品
              data_timeon["FS_YY_FX-F_BAO_BEO_TOP10_1DAY"].sort((a, b) => {
                let a_time = "";
                let b_time = "";
                a_time = a["VISITORS"];
                b_time = b["VISITORS"];
                return  b_time-a_time;
              });
              this.sel_title.quota_value.goods_top10_value=data_timeon["FS_YY_FX-F_BAO_BEO_TOP10_1DAY"];


              // console.log("===============到天的！！！==================")
              // console.log(this.sel_title.quota_value.goods_top10_value);
              // console.log(data_timeon);




            }else if(this.sel_value.day_set.day_7==true){
              data_timeon = this.data_time_on(data,[
                'FS_YY_FX-F_BAO_BEO_TOP10_7DAY',
                'FS_YY_FX-F_SALE_RATE_7DAY',
                'FS_YY_FX-F_AGO_RATE_7DAY',
                'FS_YY_FX-F_AGO_AMT_7DAY',
                'FS_YY_FX-F_YOY_RATE_7DAY',
                'FS_YY_FX-F_AMT_7DAY',
                'FS_YY_FX-F_RATE_AMT_7DAY',
                'FS_YY_FX-F_RATE_TREND_7DAY',
                'FS_YY_FX-F_VISITOR_7DAY',
                'FS_YY_FX-F_TREND_VISITOR_7DAY',
                'FS_YY_FX-F_VISITOR_YOY_7DAY',]);

              this.sel_title.quota_value.cont1=((data_timeon["FS_YY_FX-F_VISITOR_7DAY"][0].PTD7_VISITORS||0)/10000).toFixed(1)+'万';
              this.sel_title.quota_value.cont2=((data_timeon["FS_YY_FX-F_VISITOR_YOY_7DAY"][0].PTD_VISITORS_RATE7||0)*100).toFixed(1);

              this.sel_title.quota_value.cont3=((data_timeon["FS_YY_FX-F_AMT_7DAY"][0].PTD7_VISITORS_SEACH||0)/10000).toFixed(1)+'万';
              this.sel_title.quota_value.cont4=((data_timeon["FS_YY_FX-F_RATE_TREND_7DAY"][0].PTD_VISITORS_SEACH_RATE7||0)*100).toFixed(1);

              this.sel_title.quota_value.cont5=((data_timeon["FS_YY_FX-F_AGO_RATE_7DAY"][0].PTD7_NUM_VISITORS||0)/10000).toFixed(1)+'万';
              this.sel_title.quota_value.cont6=((data_timeon["FS_YY_FX-F_YOY_RATE_7DAY"][0].PTD_NUM_VISITORS_RATE7||0)*100).toFixed(1);

              data_timeon["FS_YY_FX-F_SALE_RATE_7DAY"].sort((a, b) => {
                let a_time = "";
                let b_time = "";
                a_time = a["PTD_CNT"];
                b_time = b["PTD_CNT"];
                return  b_time-a_time;
              });
              this.sel_title.quota_value.shop_source_value=data_timeon["FS_YY_FX-F_SALE_RATE_7DAY"];


              // top10商品
              data_timeon["FS_YY_FX-F_BAO_BEO_TOP10_7DAY"].sort((a, b) => {
                let a_time = "";
                let b_time = "";
                a_time = a["VISITORS"];
                b_time = b["VISITORS"];
                return  b_time-a_time;
              });
              this.sel_title.quota_value.goods_top10_value=data_timeon["FS_YY_FX-F_BAO_BEO_TOP10_7DAY"];


              // console.log("===============到7天的！！！==================")
              // console.log(this.sel_title.quota_value.goods_top10_value);


            }else if(this.sel_value.day_set.month==true){
              data_timeon = this.data_time_on(data,[
                'FS_YY_FX-F_BAO_BEO_TOP10_MONTH',
                'FS_YY_FX-F_SALE_RATE_MONTH',
                'FS_YY_FX-F_AGO_RATE_MONTH',
                'FS_YY_FX-F_AGO_AMT_MONTH',
                'FS_YY_FX-F_YOY_RATE_MONTH',
                'FS_YY_FX-F_AMT_MONTH',
                'FS_YY_FX-F_RATE_AMT_MONTH',
                'FS_YY_FX-F_RATE_TREND_MONTH',	
                'FS_YY_FX-F_VISITOR_MONTH',
                'FS_YY_FX-F_TREND_VISITOR_MONTH',
                'FS_YY_FX-F_VISITOR_YOY_MONTH',]);

              this.sel_title.quota_value.cont1=((this.data_time_select(data_timeon["FS_YY_FX-F_VISITOR_MONTH"],this.set_time).PTD_VISITORS||0)/10000).toFixed(1)+'万';
              this.sel_title.quota_value.cont2=((this.data_time_select(data_timeon["FS_YY_FX-F_VISITOR_YOY_MONTH"],this.set_time).PTD_DIF_VISITORS||0)*100).toFixed(1);

              this.sel_title.quota_value.cont3=((this.data_time_select(data_timeon["FS_YY_FX-F_AMT_MONTH"],this.set_time).PTD_VISITORS_SEACH||0)/10000).toFixed(1)+'万';
              this.sel_title.quota_value.cont4=((this.data_time_select(data_timeon["FS_YY_FX-F_RATE_TREND_MONTH"],this.set_time).PTD_DIF_VISITORS_SEACH||0)*100).toFixed(1);

              this.sel_title.quota_value.cont5=((this.data_time_select(data_timeon["FS_YY_FX-F_AGO_RATE_MONTH"],this.set_time).PTD_NUM_VISITORS||0)/10000).toFixed(1)+'万';
              this.sel_title.quota_value.cont6=((this.data_time_select(data_timeon["FS_YY_FX-F_YOY_RATE_MONTH"],this.set_time).PTD_DFI_NUM_VISITORS||0)*100).toFixed(1);

              this.sel_title.quota_value.shop_source_value= this.data_time_select(data_timeon["FS_YY_FX-F_SALE_RATE_MONTH"],this.set_time,"push")

              // top10商品

              let top10_data=this.data_time_select(data_timeon["FS_YY_FX-F_BAO_BEO_TOP10_MONTH"],this.set_time,"push");
              
              top10_data.sort((a, b) => {
                let a_time = "";
                let b_time = "";
                a_time = a["VISITORS"];
                b_time = b["VISITORS"];
                return  b_time-a_time;
              });
              this.sel_title.quota_value.goods_top10_value=top10_data;

              // console.log("===============到月的！！！==================")
              // console.log(this.sel_title.quota_value.goods_top10_value.length);

            }



            // this.$EventBus.$emit("Swiper_content_f", {
            //   height: 26+69+26+88+26+270+26+
            //   (10+10+10+10+(30*this.sel_title.quota_value.shop_source_value.length))+
            //   (10+10+10+30+(60*this.sel_title.quota_value.goods_top10_value.length))+90,
            // });



          }else if(this.sel_value.Range_on.Range_set=='2'){

            // console.log("=======22222======");
            // console.log(data);
            this.sel_title.chanzhi_wenzi.title_all="核心指标"

            // this.sel_title.quota_value.cont1=((data["FS_YY_KD-PCT_CANAL_M"][key_value].COMPANY_PCT||0)/10000).toFixed(2)+'万';

            // this.sel_value.day_set.day_1
            // console.log(this.sel_value.day_set);

            if(this.sel_value.day_set.day_1==true){

              let data_timeon = this.data_time_on(data,['FS_YY_WF-BAO_BEO_TOP10_1DAY','FS_YY_WF-SALE_RATE_1DAY','FS_YY_WF-AGO_RATE_1DAY',
              'FS_YY_WF-AGO_AMT_1DAY','FS_YY_WF-YOY_RATE_1DAY','FS_YY_WF-AMT_1DAY','FS_YY_WF-RATE_AMT_1DAY','FS_YY_WF-RATE_TREND_1DAY']);

  

              this.sel_title.quota_value.cont1=((data_timeon["FS_YY_WF-AMT_1DAY"][0].PTD_RE_AMT||0)/10000).toFixed(1)+'万';
              this.sel_title.quota_value.cont2=((data_timeon["FS_YY_WF-AGO_AMT_1DAY"][0].PTD_AGO_RE_AMT||0)/10000).toFixed(1)+'万';
              this.sel_title.quota_value.cont3=((data_timeon["FS_YY_WF-RATE_AMT_1DAY"][0].DIF_PTD_RE_AMT||0)/10000).toFixed(1)+'万';
              this.sel_title.quota_value.cont4=((data_timeon["FS_YY_WF-SALE_RATE_1DAY"][0].PTD_RATE_RE_AMT||0)*100).toFixed(1)+'%';
              this.sel_title.quota_value.cont5=((data_timeon["FS_YY_WF-AGO_RATE_1DAY"][0].AGO_PTD_RATE_RE_AMT||0)*100).toFixed(1)+'%';
              // this.sel_title.quota_value.cont6=((data_timeon["FS_YY_WF-YOY_RATE_1DAY"][0].PTD_DIF_RATE||0)*100).toFixed(1);  
              this.sel_title.quota_value.cont6=((data_timeon["FS_YY_WF-YOY_RATE_1DAY"][0].PTD_RATE_DIFF||0)*100).toFixed(1);

              let top10_user_data=[];

              data_timeon["FS_YY_WF-BAO_BEO_TOP10_1DAY"]=data_timeon["FS_YY_WF-BAO_BEO_TOP10_1DAY"].sort((a, b) => {
                let a_time = "";
                let b_time = "";
                a_time = a["PTD_RE_AMT"];
                b_time = b["PTD_RE_AMT"];

                return b_time - a_time;
              });


              Object.keys(data_timeon["FS_YY_WF-BAO_BEO_TOP10_1DAY"]).forEach((key_value) => {
                data_timeon["FS_YY_WF-BAO_BEO_TOP10_1DAY"][key_value].ITEMS_TITLE=data_timeon["FS_YY_WF-BAO_BEO_TOP10_1DAY"][key_value].TITLE;
                data_timeon["FS_YY_WF-BAO_BEO_TOP10_1DAY"][key_value].VISITORS=data_timeon["FS_YY_WF-BAO_BEO_TOP10_1DAY"][key_value].PTD_RE_AMT;
                data_timeon["FS_YY_WF-BAO_BEO_TOP10_1DAY"][key_value].VISITORS_RATE=data_timeon["FS_YY_WF-BAO_BEO_TOP10_1DAY"][key_value].PTD_NUM_ID_RATE;

                if(data_timeon["FS_YY_WF-BAO_BEO_TOP10_1DAY"].length<=0){
                  top10_user_data.push(data_timeon["FS_YY_WF-BAO_BEO_TOP10_1DAY"][key_value]);
                }else{
                  if(data_timeon["FS_YY_WF-BAO_BEO_TOP10_1DAY"][key_value].PTD_RE_AMT!=0&&data_timeon["FS_YY_WF-BAO_BEO_TOP10_1DAY"][key_value].RN<=10){
                    top10_user_data.push(data_timeon["FS_YY_WF-BAO_BEO_TOP10_1DAY"][key_value]);
                  }else if(key_value<10){
                    top10_user_data.push(data_timeon["FS_YY_WF-BAO_BEO_TOP10_1DAY"][key_value]);
                  }
                }

              });
              this.sel_title.quota_value.goods_top10_value=top10_user_data;

              // console.log(data_timeon);



            }else if(this.sel_value.day_set.day_7==true){
              console.log("1asd")

              let data_timeon = this.data_time_on(data,[
                'FS_YY_WF-BAO_BEO_TOP10_7DAY',
                'FS_YY_WF-SALE_RATE_7DAY',
                'FS_YY_WF-AGO_RATE_7DAY',
                'FS_YY_WF-AGO_AMT_7DAY',
                'FS_YY_WF-YOY_RATE_7DAY',
                'FS_YY_WF-AMT_7DAY',
                'FS_YY_WF-RATE_AMT_7DAY',
                'FS_YY_WF-RATE_TREND_7DAY']);

              this.sel_title.quota_value.cont1=((data_timeon["FS_YY_WF-AMT_7DAY"][0].PTD_LAST7_RE_AMT||0)/10000).toFixed(1)+'万';
              this.sel_title.quota_value.cont2=((data_timeon["FS_YY_WF-AGO_AMT_7DAY"][0].PTD_LAST7_AGO_RE_AMT||0)/10000).toFixed(1)+'万';
              this.sel_title.quota_value.cont3=((data_timeon["FS_YY_WF-RATE_AMT_7DAY"][0].DIF_PTD_LAST7_RE_AMT||0)/10000).toFixed(1)+'万';
              this.sel_title.quota_value.cont4=((data_timeon["FS_YY_WF-SALE_RATE_7DAY"][0].PTD_LAST7_RATE_RE_AMT||0)*100).toFixed(1)+'%';
              this.sel_title.quota_value.cont5=((data_timeon["FS_YY_WF-AGO_RATE_7DAY"][0].AGO_PTD_LAST7_RATE_RE_AMT||0)*100).toFixed(1)+'%';
              // this.sel_title.quota_value.cont6=((data_timeon["FS_YY_WF-YOY_RATE_7DAY"][0].PTD_LAST7_DIF_RATE||0)*100).toFixed(1);
              this.sel_title.quota_value.cont6=((data_timeon["FS_YY_WF-YOY_RATE_7DAY"][0].PTD_LAST7_RATE_DIFF||0)*100).toFixed(1);


              let top10_user_7data=[]; 
              data_timeon["FS_YY_WF-BAO_BEO_TOP10_7DAY"]=data_timeon["FS_YY_WF-BAO_BEO_TOP10_7DAY"].sort((a, b) => {
                let a_time = "";
                let b_time = "";
                a_time = a["PTD_RE_AMT"];
                b_time = b["PTD_RE_AMT"];
                return b_time - a_time;
              });


              Object.keys(data_timeon["FS_YY_WF-BAO_BEO_TOP10_7DAY"]).forEach((key_value) => {
                data_timeon["FS_YY_WF-BAO_BEO_TOP10_7DAY"][key_value].ITEMS_TITLE=data_timeon["FS_YY_WF-BAO_BEO_TOP10_7DAY"][key_value].TITLE;
                data_timeon["FS_YY_WF-BAO_BEO_TOP10_7DAY"][key_value].VISITORS=data_timeon["FS_YY_WF-BAO_BEO_TOP10_7DAY"][key_value].PTD_RE_AMT;
                data_timeon["FS_YY_WF-BAO_BEO_TOP10_7DAY"][key_value].VISITORS_RATE=data_timeon["FS_YY_WF-BAO_BEO_TOP10_7DAY"][key_value].PTD_NUM_ID_RATE;
                
                if(data_timeon["FS_YY_WF-BAO_BEO_TOP10_7DAY"].length<=0){
                  top10_user_7data.push(data_timeon["FS_YY_WF-BAO_BEO_TOP10_7DAY"][key_value]);
                }else{
                  if(data_timeon["FS_YY_WF-BAO_BEO_TOP10_7DAY"][key_value].PTD_RE_AMT!=0&&data_timeon["FS_YY_WF-BAO_BEO_TOP10_7DAY"][key_value].RN<=10){
                    
                    console.log(data_timeon["FS_YY_WF-BAO_BEO_TOP10_7DAY"][key_value].PTD_RE_AMT+"     "+data_timeon["FS_YY_WF-BAO_BEO_TOP10_7DAY"][key_value].RN)

                    top10_user_7data.push(data_timeon["FS_YY_WF-BAO_BEO_TOP10_7DAY"][key_value]);
                  }else if(key_value<10){
                    top10_user_7data.push(data_timeon["FS_YY_WF-BAO_BEO_TOP10_7DAY"][key_value]);
                  }
                }

              });

              this.sel_title.quota_value.goods_top10_value=top10_user_7data;


            }else if(this.sel_value.day_set.month==true){
              console.log("aqwe1")

              let data_timeon = this.data_time_on(data,[
                'FS_YY_WF-BAO_BEO_TOP10_MONTH',
                'FS_YY_WF-SALE_RATE_MONTH',
                'FS_YY_WF-AGO_RATE_MONTH',
                'FS_YY_WF-AGO_AMT_MONTH',
                'FS_YY_WF-YOY_RATE_MONTH',
                'FS_YY_WF-AMT_MONTH',
                'FS_YY_WF-RATE_AMT_MONTH',
                'FS_YY_WF-RATE_TREND_MONTH'
              ]);


              // let data_timeon_time=this.data_time_on(data["FS_YY_WF-AMT_MONTH"],[this.set_time])  

              this.sel_title.quota_value.cont1=((this.data_time_select(data_timeon["FS_YY_WF-AMT_MONTH"],this.set_time).MTD_RE_AMT||0)/10000).toFixed(1)+'万';
              this.sel_title.quota_value.cont2=((this.data_time_select(data_timeon["FS_YY_WF-AGO_AMT_MONTH"],this.set_time).MTD_AGO_RE_AMT||0)/10000).toFixed(1)+'万';
              this.sel_title.quota_value.cont3=((this.data_time_select(data_timeon["FS_YY_WF-RATE_AMT_MONTH"],this.set_time).DIF_MTD_RE_AMT||0)/10000).toFixed(1)+'万';  

              this.sel_title.quota_value.cont4=((this.data_time_select(data_timeon["FS_YY_WF-SALE_RATE_MONTH"],this.set_time).MTD_RATE_RE_AMT||0)*100).toFixed(1)+'%'; 
              this.sel_title.quota_value.cont5=((this.data_time_select(data_timeon["FS_YY_WF-AGO_RATE_MONTH"],this.set_time).AGO_MTD_RATE_RE_AMT||0)*100).toFixed(1)+'%';  
              // this.sel_title.quota_value.cont6=((this.data_time_select(data_timeon["FS_YY_WF-YOY_RATE_MONTH"],this.set_time).MTD_DIF_RATE||0)*100).toFixed(1); 
              this.sel_title.quota_value.cont6=((this.data_time_select(data_timeon["FS_YY_WF-YOY_RATE_MONTH"],this.set_time).MTD_RATE_DIFF||0)*100).toFixed(1); 


              // top10商品
              let top10_data=this.data_time_select(data_timeon["FS_YY_WF-BAO_BEO_TOP10_MONTH"],this.set_time,"push");

              
              top10_data.sort((a, b) => {
                let a_time = "";
                let b_time = "";
                a_time = a["MTD_RE_AMT"];
                b_time = b["MTD_RE_AMT"];
                return  b_time-a_time;
              });
              Object.keys(top10_data).forEach((key_value) => {
                top10_data[key_value].ITEMS_TITLE=top10_data[key_value].TITLE;
                top10_data[key_value].VISITORS=top10_data[key_value].MTD_RE_AMT;
                top10_data[key_value].VISITORS_RATE=top10_data[key_value].MTD_NUM_ID_RATE;
              });
              this.sel_title.quota_value.goods_top10_value=top10_data;


            }



            // this.$EventBus.$emit("Swiper_content_f", {
            //   height: 26+69+26+166+26+270+26+
            //   // (10+10+10+10+(30*this.sel_title.quota_value.shop_source_value.length))+
            //   (10+10+10+(-15)+(60*this.sel_title.quota_value.goods_top10_value.length))+90,
            // });



          }else if(this.sel_value.Range_on.Range_set=='3'){
            this.sel_title.chanzhi_wenzi.title_all="概况"
            this.sel_title.chanzhi_wenzi.title_content.content1="集团"
            this.sel_title.chanzhi_wenzi.title_content.content2="线上"
            this.sel_title.chanzhi_wenzi.title_content.content3="线下"
            this.sel_title.chanzhi_wenzi.title_content.content4="同比"
            this.sel_title.chanzhi_wenzi.title_content.content5="同比"
            this.sel_title.chanzhi_wenzi.title_content.content6="同比"



            Object.keys(data["FS_YY_KD-PCT_CANAL_M"]).forEach((key_value) => {

              if(data["FS_YY_KD-PCT_CANAL_M"][key_value].MDATE.substring(0, 10)==this.set_time){

                this.sel_title.quota_value.cont1=((data["FS_YY_KD-PCT_CANAL_M"][key_value].COMPANY_PCT||0)).toFixed(1)+'';
                this.sel_title.quota_value.cont2=((data["FS_YY_KD-PCT_CANAL_M"][key_value].COMPANY_GROWTH_RATE_PREV||0)*100).toFixed(1);

                this.sel_title.quota_value.cont3=((data["FS_YY_KD-PCT_CANAL_M"][key_value].ON_LINE_PCT||0)).toFixed(1)+'';
                this.sel_title.quota_value.cont4=((data["FS_YY_KD-PCT_CANAL_M"][key_value].ON_LINE_GROWTH_RATE_PREV||0)*100).toFixed(1);

                this.sel_title.quota_value.cont5=((data["FS_YY_KD-PCT_CANAL_M"][key_value].OFF_LINE_PCT||0)).toFixed(1)+'';
                this.sel_title.quota_value.cont6=((data["FS_YY_KD-PCT_CANAL_M"][key_value].OFF_LINE_GROWTH_RATE_PREV||0)*100).toFixed(1);


              }



            });


            data["FS_YY_KD-PCT_CITY_M"].sort((a, b) => {
              let a_time = "";
              let b_time = "";
              a_time = a["GRADE_ASC"];
              b_time = b["GRADE_ASC"];
              
              return a_time - b_time;
            });

            this.sel_title.quota_value.city_value=[];
            Object.keys(data["FS_YY_KD-PCT_CITY_M"]).forEach((key_value_city) => {

              if(data["FS_YY_KD-PCT_CITY_M"][key_value_city].TDATE.substring(0, 7)==this.set_time.substring(0,7)){

                this.sel_title.quota_value.city_value.push(data["FS_YY_KD-PCT_CITY_M"][key_value_city]);

              }

            });


          }



          this.data_load_time=(typeof(this.data["FS_YY_FX-LOAD_TIME"])!='undefined'&&typeof(this.data["FS_YY_FX-LOAD_TIME"][0])!='undefined')? 
            (this.data["FS_YY_FX-LOAD_TIME"][0].LOAD_TIME).substring(0,4)+'.'
            +(this.data["FS_YY_FX-LOAD_TIME"][0].LOAD_TIME).substring(5,7)+'.'
            +(this.data["FS_YY_FX-LOAD_TIME"][0].LOAD_TIME).substring(8,10):0; 

            // console.log("============asasasasasasasas=========");
            // console.log(this.data["FS_YY_WF-RATE_TREND_1DAY"]);
            this.data["FS_YY_WF-RATE_TREND_1DAY"].sort((a, b) => {
              let a_time = "";
              let b_time = "";
              a_time = new Date(a["TDATE"].substring(0,10)).getTime(new Date(a["TDATE"].substring(0,10)));
              b_time = new Date(b["TDATE"].substring(0,10)).getTime(new Date(b["TDATE"].substring(0,10)));
              return a_time - b_time;
            });

            this.data["FS_YY_WF-RATE_TREND_7DAY"].sort((a, b) => {
              let a_time = "";
              let b_time = "";
              a_time = new Date(a["TDATE"].substring(0,10)).getTime(new Date(a["TDATE"].substring(0,10)));
              b_time = new Date(b["TDATE"].substring(0,10)).getTime(new Date(b["TDATE"].substring(0,10)));
              return a_time - b_time;
            });

          // this.set_time_range.start=(this.sel_value.day_set.day_1)? this.data["FS_YY_FX-F_AMT_1DAY"][0].PTD_TDATE:this.data["FS_YY_FX-F_AMT_1DAY"][0].PTD7_STRAT_TDATE;
          this.set_time_range.start=(this.sel_value.day_set.day_1)? 
            // this.data["FS_YY_FX-F_AMT_1DAY"][0].PTD_TDATE
            (this.data["FS_YY_WF-RATE_TREND_1DAY"][0].TDATE).substring(0,4)+'.'
            +(this.data["FS_YY_WF-RATE_TREND_1DAY"][0].TDATE).substring(5,7)+'.'
            +(this.data["FS_YY_WF-RATE_TREND_1DAY"][0].TDATE).substring(8,10)
            // :this.data["FS_YY_FX-F_AMT_1DAY"][0].PTD7_STRAT_TDATE;
            :(this.data["FS_YY_WF-RATE_TREND_7DAY"][0].TDATE).substring(0,4)+'.'
            +(this.data["FS_YY_WF-RATE_TREND_7DAY"][0].TDATE).substring(5,7)+'.'
            +(this.data["FS_YY_WF-RATE_TREND_7DAY"][0].TDATE).substring(8,10)


          // this.set_time_range.end=(this.sel_value.day_set.day_1)? this.data["FS_YY_FX-F_AMT_1DAY"][0].PTD_TDATE:this.data["FS_YY_FX-F_AMT_1DAY"][0].PTD7_END_TDATE;
          this.set_time_range.end=(this.sel_value.day_set.day_1)? 
            // this.data["FS_YY_FX-F_AMT_1DAY"][0].PTD_TDATE
            (this.data["FS_YY_WF-RATE_TREND_1DAY"][this.data["FS_YY_WF-RATE_TREND_1DAY"].length-1].TDATE).substring(0,4)+'.'
            +(this.data["FS_YY_WF-RATE_TREND_1DAY"][this.data["FS_YY_WF-RATE_TREND_1DAY"].length-1].TDATE).substring(5,7)+'.'
            +(this.data["FS_YY_WF-RATE_TREND_1DAY"][this.data["FS_YY_WF-RATE_TREND_1DAY"].length-1].TDATE).substring(8,10)
            // :this.data["FS_YY_FX-F_AMT_1DAY"][0].PTD7_END_TDATE;
            :(this.data["FS_YY_WF-RATE_TREND_7DAY"][this.data["FS_YY_WF-RATE_TREND_7DAY"].length-1].TDATE).substring(0,4)+'.'
            +(this.data["FS_YY_WF-RATE_TREND_7DAY"][this.data["FS_YY_WF-RATE_TREND_7DAY"].length-1].TDATE).substring(5,7)+'.'
            +(this.data["FS_YY_WF-RATE_TREND_7DAY"][this.data["FS_YY_WF-RATE_TREND_7DAY"].length-1].TDATE).substring(8,10)




        }catch(error){ 
          console.log("========错误捕捉信息==========")
          // console.log(error)
              console.log("============运行好核心指标未发取消=================");
              // console.log(this.data["FS_YY_WF-F_AMT_1DAY"][0].TDATE);
          console.error(error);

          // this.info_error+=1;
          Information_log('渠道运营-'+((this.sel_value.Range_on.Range_set=='1')?'流量分析':'未发取消'),'渠道运营-核心指标:  '+error.toString());
        }


      });
      

    },


    data_screen(set_data,set_sele_field) {

      let theme_value_name = "";
      let theme_data = {};

      if(set_sele_field){
        theme_value_name=set_sele_field;
      }else{

        if (this.sel_value.Range_on.Range_set == "1") {
          theme_value_name = "FS_YY_FX";
        } else if (this.sel_value.Range_on.Range_set == "2") {
          theme_value_name = "FS_YY_WF";
        } else if (this.sel_value.Range_on.Range_set == "3") {
          theme_value_name = "FS_YY_KD";
        } else {
          theme_value_name = "";
        }
      }


      // console.log("=======数据处理======");
      // console.log(set_data);
      // console.log(theme_value_name);

      Object.keys(set_data).forEach((key) => {
        let [theme_value, theme_content] = key.split("-"); //把上面的拆分出来
        if (theme_value && theme_content) {
          if (theme_value == theme_value_name) {
            theme_data[`${theme_value}-${theme_content}`] = set_data[key];
          }
        }
      });

      return theme_data;
    },

    data_time_on(data_seton,field_choice) {
      let choice_data_set=[];
      Object.keys(data_seton).forEach((key_value) => {
      
        Object.keys(field_choice).forEach((key_value_set) => {
          if(key_value==field_choice[key_value_set]){
            // choice_data_set.push(data_seton[key_value]);
            choice_data_set[key_value]=(data_seton[key_value]);
          }
        });
      
      });
      return choice_data_set;
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

    initChart() {

      this.chartIns = echarts.init(this.$refs["chart"]);

      let hour_data = [];
      let year_time_data = [];
      let year_add_time=[];
      let sale_amt = [];
      let ago_amt = [];
      let user_data = [];
      let _time_now=new Date();
      
      this.p1.then(() => {

        try{

          
          let data = this.data_screen(this.data);
          let _this=this;

          if(this.sel_value.Range_on.Range_set=='1'){

            // console.log("====图标1的=====");
            // console.log(this.sel_value.target.all_muri_value);
            // console.log(data);

            if(this.sel_value.day_set.day_1==true){
              switch (this.sel_value.target.all_muri_value){
                case 1:
                  user_data=data["FS_YY_FX-F_TREND_VISITOR_1DAY"]
                  break;
                case 2:
                  user_data=data["FS_YY_FX-F_RATE_AMT_1DAY"]
                  Object.keys(user_data).forEach((key_value_set1day) => {
                    user_data[key_value_set1day].PTD_VISITORS=user_data[key_value_set1day].PTD_VISITORS_SEACH;
                    user_data[key_value_set1day].AGO_PTD_VISITORS=user_data[key_value_set1day].AGO_PTD_VISITORS_SEACH;
                  });

                  break;
                case 3:
                  user_data=data["FS_YY_FX-F_AGO_AMT_1DAY"] 
                  Object.keys(user_data).forEach((key_value_set1day) => {
                    user_data[key_value_set1day].PTD_VISITORS=user_data[key_value_set1day].PTD_NUM_VISITORS;
                    user_data[key_value_set1day].AGO_PTD_VISITORS=user_data[key_value_set1day].AGO_PTD_NUM_VISITORS;
                  });
                  break;
              }
            }else if(this.sel_value.day_set.day_7==true){
              switch (this.sel_value.target.all_muri_value){
                case 1:
                  user_data=data["FS_YY_FX-F_TREND_VISITOR_7DAY"]
                  break;
                case 2:  
                  user_data=data["FS_YY_FX-F_RATE_AMT_7DAY"] 
                  Object.keys(user_data).forEach((key_value_set7day) => {
                    user_data[key_value_set7day].PTD_VISITORS=user_data[key_value_set7day].PTD_VISITORS_SEACH;
                    user_data[key_value_set7day].AGO_PTD_VISITORS=user_data[key_value_set7day].AGO_PTD_VISITORS_SEACH;
                  });
                  break;
                case 3:
                  user_data=data["FS_YY_FX-F_AGO_AMT_7DAY"] 
                  Object.keys(user_data).forEach((key_value_set7day) => {
                    user_data[key_value_set7day].PTD_VISITORS=user_data[key_value_set7day].PTD_NUM_VISITORS;
                    user_data[key_value_set7day].AGO_PTD_VISITORS=user_data[key_value_set7day].AGO_PTD_NUM_VISITORS;
                  });
                  break;
              }
            }else if(this.sel_value.day_set.month==true){
              switch (this.sel_value.target.all_muri_value){
                case 1:
                  user_data=data["FS_YY_FX-F_TREND_VISITOR_MONTH"]

                  break;
                case 2:
                  user_data=data["FS_YY_FX-F_RATE_AMT_MONTH"] 
                  Object.keys(user_data).forEach((key_value_setmonth) => {
                    user_data[key_value_setmonth].PTD_VISITORS=user_data[key_value_setmonth].PTD_VISITORS_SEACH;
                    user_data[key_value_setmonth].PTD_DFI_PTD_VISITORS=user_data[key_value_setmonth].PTD_DFI_PTD_VISITORS_SEACH;
                  });                
                  break;
                case 3:
                  user_data=data["FS_YY_FX-F_AGO_AMT_MONTH"] 
                  Object.keys(user_data).forEach((key_value_setmonth) => {
                    user_data[key_value_setmonth].PTD_VISITORS=user_data[key_value_setmonth].PTD_NUM_VISITORS;
                    user_data[key_value_setmonth].PTD_DFI_PTD_VISITORS=user_data[key_value_setmonth].PTD_DFI_NUM_VISITORS;
                  });   
                  break;
              }
            }
            // console.log(user_data);

            user_data.sort((a, b) => {
              let a_time = "";
              let b_time = "";
              if(this.sel_value.day_set.month==true){
                a_time = new Date(a["MDATE"].substring(0,10)).getTime(new Date(a["MDATE"].substring(0,10)));
                b_time = new Date(b["MDATE"].substring(0,10)).getTime(new Date(b["MDATE"].substring(0,10)));

              }else{
                a_time = new Date(a["TDATE"].substring(0,10)).getTime(new Date(a["TDATE"].substring(0,10)));
                b_time = new Date(b["TDATE"].substring(0,10)).getTime(new Date(b["TDATE"].substring(0,10)));
              }
              
              
              return a_time - b_time;
            });

            // PTD_VISITORS  PTD_DFI_PTD_VISITORS

            Object.keys(user_data).forEach((key_value_chart) => {

              if(this.sel_value.day_set.month==true){
                if(user_data[key_value_chart].MDATE.substring(0,4)==this.set_time.substring(0,4)){
                  year_time_data.push((user_data[key_value_chart].MDATE.substring(0,7)));
                  year_add_time.push((user_data[key_value_chart].MDATE.substring(0,4)));

                  sale_amt.push(((user_data[key_value_chart].PTD_VISITORS||0)/10000).toFixed(2)*1);
                  ago_amt.push(((user_data[key_value_chart].PTD_DFI_PTD_VISITORS||0)/10000).toFixed(2)*1);
                }
                hour_data.push((user_data[key_value_chart].MDATE.substring(5,7))*1+'月');
              }else{
                hour_data.push((user_data[key_value_chart].TDATE.substring(5,10)));
                year_time_data.push((user_data[key_value_chart].TDATE.substring(0,10)));
                year_add_time.push((user_data[key_value_chart].TDATE.substring(0,4)));

                sale_amt.push(((user_data[key_value_chart].PTD_VISITORS||0)/10000).toFixed(2)*1);
                ago_amt.push(((user_data[key_value_chart].AGO_PTD_VISITORS||0)/10000).toFixed(2)*1);
              }

            });

            



          }else if(this.sel_value.Range_on.Range_set=='2'){
            console.log(user_data);

          }else if(this.sel_value.Range_on.Range_set=='3'){

            user_data=data['FS_YY_KD-PCT_CANAL_M'];
            user_data.sort((a, b) => {
              let a_time = "";
              let b_time = "";
              a_time = new Date(a["MDATE"].substring(0,10)).getTime(new Date(a["MDATE"].substring(0,10)));
              b_time = new Date(b["MDATE"].substring(0,10)).getTime(new Date(b["MDATE"].substring(0,10)));
              
              return a_time - b_time;
            });

            switch (this.sel_value.target.all_muri_value){
              case 1:
                Object.keys(user_data).forEach((key_value_chart) => {
                  hour_data.push((user_data[key_value_chart].MDATE.substring(5,7))*1+'月');
                  year_time_data.push((user_data[key_value_chart].MDATE.substring(0,7)));
                  year_add_time.push((user_data[key_value_chart].MDATE.substring(0,4)));

                  sale_amt.push(((user_data[key_value_chart].COMPANY_PCT||0)/10000).toFixed(2)*1);
                  ago_amt.push(((user_data[key_value_chart].COMPANY_PCT_PREV||0)/10000).toFixed(2)*1);
                });

                // console.log("集团");
                break;
              case 2:
                // console.log("线上");
                Object.keys(user_data).forEach((key_value_chart) => {
                  hour_data.push((user_data[key_value_chart].MDATE.substring(5,7))*1+'月');
                  year_time_data.push((user_data[key_value_chart].MDATE.substring(0,7)));
                  year_add_time.push((user_data[key_value_chart].MDATE.substring(0,4)));

                  sale_amt.push(((user_data[key_value_chart].ON_LINE_PCT||0)/10000).toFixed(2)*1);
                  ago_amt.push(((user_data[key_value_chart].ON_LINE_PCT_PREV||0)/10000).toFixed(2)*1);
                });

                break;
              case 3:
                Object.keys(user_data).forEach((key_value_chart) => {
                  hour_data.push((user_data[key_value_chart].MDATE.substring(5,7))*1+'月');
                  year_time_data.push((user_data[key_value_chart].MDATE.substring(0,7)));
                  year_add_time.push((user_data[key_value_chart].MDATE.substring(0,4)));

                  sale_amt.push(((user_data[key_value_chart].OFF_LINE_PCT||0)/10000).toFixed(2)*1);
                  ago_amt.push(((user_data[key_value_chart].OFF_LINE_PCT_PREV||0)/10000).toFixed(2)*1);
                });
                // console.log("线下");
                break;
            }

          }

          year_add_time=this.unique(year_add_time);
          hour_data=this.unique(hour_data);

          // console.log("===asdadasda===============");
          // console.log(sale_amt);
          // console.log(ago_amt);
          // console.log(user_data);
          // console.log(year_time_data);
          // console.log(year_add_time);
          // console.log(this.set_time);
          // console.log(hour_data)
          


          //默认值开始 
          this.barData.month=0;
          this.barData.value=0;
          this.barData.ago_value=0;

          // let day_time_set=null;
          let month_time_set=null;
          // day_time_set=(((_time_now.getDate()*1)>9)?(_time_now.getDate()*1):'0'+(_time_now.getDate()*1));
          // 

            if(this.sel_value.day_set.day_1==true||this.sel_value.day_set.day_7==true){

              Object.keys(hour_data).forEach((key_mv) => {
                if(hour_data[key_mv]==((_time_now.getMonth()+1)+'-'+(_time_now.getDate()))){
                  this.barData.month=(_time_now.getMonth()+1)+'-'+(_time_now.getDate());
                  this.barData.value=sale_amt[key_mv];
                  this.barData.ago_value=ago_amt[key_mv];
                }
              });  

              if(this.barData.month==0){  
                // this.barData.month=hour_data[hour_data.length-1];
                this.barData.month=year_time_data[year_time_data.length-1];
                this.barData.value=sale_amt[sale_amt.length-1];
                this.barData.ago_value=ago_amt[ago_amt.length-1];
              }

            }else{

              Object.keys(hour_data).forEach((key_mv) => {
                // if(hour_data[key_mv]==((_time_now.getMonth()+1)+'月')){
                if(hour_data[key_mv]==((this.set_time.substring(0,4)==_time_now.getFullYear())?((_time_now.getMonth()+1)+'月'):'12月')){
                  month_time_set=(((_time_now.getMonth()+1)>9)?(_time_now.getMonth()+1):'0'+(_time_now.getMonth()+1));
                  // this.barData.month=_time_now.getFullYear()+'-'+(_time_now.getMonth()+1)+'月';
                  // this.barData.month=this.set_time.substring(0,4)+'-'+month_time_set;

                  if(this.set_time.substring(0,4)==_time_now.getFullYear()){
                    month_time_set=(((_time_now.getMonth()+1)>9)?(_time_now.getMonth()+1):'0'+(_time_now.getMonth()+1));
                    this.barData.month=this.set_time.substring(0,4)+'-'+month_time_set;                       
                  }else{
                    this.barData.month=this.set_time.substring(0,4)+'-'+'12'; 
                  }


                  this.barData.value=sale_amt[key_mv];
                  this.barData.ago_value=ago_amt[key_mv];
                }
              });  

              if(this.barData.value==0&&this.barData.ago_value==0){
                // this.barData.month=hour_data[hour_data.length-1];
                this.barData.month=year_time_data[year_time_data.length-1];
                this.barData.value=sale_amt[sale_amt.length-1];
                this.barData.ago_value=ago_amt[ago_amt.length-1];
              }

            }
          //默认值结束



          this.chartIns.setOption({


              grid: {
                left: "1%",
                top: "6%",
                right: "5%",
                // bottom: "15%",
                bottom: "0%",
                containLabel: true,
              },

              legend: {
                show: false,
                data: ["同期", "当期"],
                // right: "3%",
                // top: "0%",
                // bottom: "2%",
                bottom: "bottom",
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
                trigger: "axis",
                axisPointer: {
                  // type: "cross",
                  label: {
                    color: "#000000",
                    backgroundColor: "aliceblue",
                  },
                },

                formatter:function (params) {

                  _this.barData.value =(params[1]==undefined||params[1].value==undefined)? '--':params[1].value;
                  _this.barData.ago_value =(params[0]==undefined||params[0].value==undefined)? '--': params[0].value;

                  if(_this.sel_value.day_set.month==true){
                    _this.barData.month =year_add_time[0]+'-'+
                      ((params[1].axisValue).replace(/[^0-9]/ig,"")>9?
                      (params[1].axisValue).replace(/[^0-9]/ig,""):'0'+(params[1].axisValue).replace(/[^0-9]/ig,""));
                  }else{
                    _this.barData.month =year_add_time[0]+'-'+(params[1].axisValue);
                  }

                }

              },

              xAxis: {
                type: "category",
                boundaryGap: false,
                data: hour_data,
                axisLine: {
                  lineStyle: {
                    color: "#ccc",
                  },
                },
                axisLabel: {
                  // interval: 'auto',
                  // interval: 4,
                  
                },
              },
              yAxis: {
                type: "value",
                splitLine: {
                  show: true,
                  lineStyle: { type: "dotted", color: "#ccc" },
                },
                axisLine: {
                  show: false,
                },
                axisTick: {
                  show: false,
                },
                axisLabel: {
                  textStyle: {
                    color: "#ccc",
                  },

                },

              },

              series: [
                {
                  name: "同期",
                  // showSymbol: false,
                  showSymbol: (ago_amt.length==1)? true:false,
                  smooth: false, //true 为平滑曲线，false为直线
                  itemStyle: {
                    color: "#919191",

                    normal: {

                      color: "#F5A028",
                      lineStyle: {
                        // color: "#BBBBBB",
                        color: "#F5A028",
                        width: 1, //设置线条粗细
                      },
                      areaStyle: {
                        color: "rgba(255, 255, 255, 0.00)",
                      },

                    },
                  },
                  data: ago_amt,
                  type: "line",
                  areaStyle: {},
                },

                {
                  name: "当期",
                  // showSymbol: false,
                  showSymbol: (sale_amt.length==1)? true:false,
                  smooth: false, //true 为平滑曲线，false为直线
                  itemStyle: {
                    color: "#0938F7",

                    normal: {
                      // color: "#66ccff",
                      color: "#1678FF",
                      lineStyle: {
                        color: "#1678FF",
                        width: 2, //设置线条粗细
                      },
                      areaStyle: {
                        // color: "rgba(102, 204, 225, 0.05)",
                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                          {
                            offset: 0,
                            // color: "rgba(6,69,165, 0.01)",
                            color: "rgba(22,120,255, 0)",
                          },

                          {
                            offset: 0.1,
                            // color: "rgba(6,69,165, 0.05)",
                            color: "rgba(22,120,255, 0)",
                          },

                          {
                            offset: 0.6,
                            // color: "rgba(6,69,165, 0.05)",
                            color: "rgba(22,120,255, 0.1)",
                          },
                        
                          {
                            offset: 1,
                            // color: "rgba(6,69,165, 0.05)",
                            color: "rgba(22,120,255, 0.1)",
                          },
                        ]),
                      },
                    },
                  },

                  data: sale_amt,

                  type: "line",
                  areaStyle: {},
                },
              ],


          });

        }catch(error){ 
          console.log("========错误捕捉信息==========")
          // console.log(error)
          console.error(error);
          // this.info_error+=1;
          Information_log('渠道运营-'+((this.sel_value.Range_on.Range_set=='1')?'流量分析':'未发取消'),'渠道运营-折线图:  '+error.toString());
        }



      });


    },

    initChart2() {

      this.chartIns2 = echarts.init(this.$refs["chart2"]);

      let hour_data = [];
      let year_time_data = [];
      let year_add_time=[];

      let sale_amt_pt = []; //平台  线上
      let sale_amt_zy = []; //直营  线下
      let sale_amt_cgjx = []; //采购经销  海外
      let sale_amt_qt=[];  //其它
      let _this=this;
      let _time_now=new Date();
      

      this.p1.then(() => {


        try{

          if(this.echarts_clear==true){
            this.chartIns2.clear();
            this.echarts_clear=false;
          }

          // console.log("========趋势图！！=========")
          let data = this.data_screen(this.data,'FS_YY_WF');
          // console.log(data);
          // console.log(this.sel_value.day_set);
          let data_timeon=[];
          let data_user=[];
          
        
          if(this.sel_value.day_set.day_1==true){
            // console.log("asd")

            // console.log(this.data_time_on(data,['FS_YY_WF-RATE_TREND_1DAY']));

            data_timeon= this.data_time_on(data,['FS_YY_WF-RATE_TREND_1DAY']);
            data_user=data_timeon["FS_YY_WF-RATE_TREND_1DAY"];
            data_user = data_user.sort((a, b) => {
              let value_sort = "";
              let a_time = new Date(a["TDATE"]).getTime(new Date(a["TDATE"]));
              let b_time = new Date(b["TDATE"]).getTime(new Date(b["TDATE"]));
              value_sort = Number(a_time) - Number(b_time);
    
              return value_sort;
            });

            Object.keys(data_user).forEach((key_value_1day) => {
              if(data_user[key_value_1day].CHANNEL=='线上渠道'){
                sale_amt_pt.push((data_user[key_value_1day].PTD_NOT_CANCEL_RATE*100).toFixed(2));
                hour_data.push(data_user[key_value_1day].TDATE.substring(5,10)); 
                year_time_data.push(data_user[key_value_1day].TDATE.substring(0,10)); 

                year_add_time.push((data_user[key_value_1day].TDATE.substring(0,4)));


              }else if(data_user[key_value_1day].CHANNEL=='线下渠道'){
                sale_amt_zy.push((data_user[key_value_1day].PTD_NOT_CANCEL_RATE*100).toFixed(2));
              }else if(data_user[key_value_1day].CHANNEL=='海外渠道'){
                sale_amt_cgjx.push((data_user[key_value_1day].PTD_NOT_CANCEL_RATE*100).toFixed(2));
              }else if(data_user[key_value_1day].CHANNEL=='其它'){
                sale_amt_qt.push((data_user[key_value_1day].PTD_NOT_CANCEL_RATE*100).toFixed(2));
              }
            });
            // console.log("==============adasdasdasdsad===========asdasdasd====================")
            // console.log(data_user);
            // console.log(hour_data);
            // console.log(sale_amt_pt);
            // console.log(sale_amt_zy);
            // console.log(sale_amt_cgjx);

          }else if(this.sel_value.day_set.day_7==true){
            console.log("asd2")
            data_timeon = this.data_time_on(data,['FS_YY_WF-RATE_TREND_7DAY']);
            data_user=data_timeon["FS_YY_WF-RATE_TREND_7DAY"];

            data_user = data_user.sort((a, b) => {
              let value_sort = "";
              let a_time = new Date(a["TDATE"]).getTime(new Date(a["TDATE"]));
              let b_time = new Date(b["TDATE"]).getTime(new Date(b["TDATE"]));
              value_sort = Number(a_time) - Number(b_time);
    
              return value_sort;
            });

            Object.keys(data_user).forEach((key_value_1day) => {
              if(data_user[key_value_1day].CHANNEL=='线上渠道'){
                sale_amt_pt.push((data_user[key_value_1day].PTD_NOT_CANCEL_RATE*100).toFixed(2));
                hour_data.push(data_user[key_value_1day].TDATE.substring(5,10)); 
                year_time_data.push(data_user[key_value_1day].TDATE.substring(0,10)); 
                year_add_time.push((data_user[key_value_1day].TDATE.substring(0,4)));

              }else if(data_user[key_value_1day].CHANNEL=='线下渠道'){
                sale_amt_zy.push((data_user[key_value_1day].PTD_NOT_CANCEL_RATE*100).toFixed(2));
              }else if(data_user[key_value_1day].CHANNEL=='海外渠道'){
                sale_amt_cgjx.push((data_user[key_value_1day].PTD_NOT_CANCEL_RATE*100).toFixed(2));
              }else if(data_user[key_value_1day].CHANNEL=='其它'){
                sale_amt_qt.push((data_user[key_value_1day].PTD_NOT_CANCEL_RATE*100).toFixed(2));
              }
            });
            // console.log(hour_data);
            // console.log(sale_amt_pt);
            // console.log(sale_amt_zy);
            // console.log(sale_amt_cgjx);

          }else if(this.sel_value.day_set.month==true){
            console.log("asd3")
            data_timeon = this.data_time_on(data,['FS_YY_WF-RATE_TREND_MONTH']);
            data_user=data_timeon["FS_YY_WF-RATE_TREND_MONTH"];
            data_user = data_user.sort((a, b) => {
              let value_sort = "";
              let a_time = new Date(a["MDATE"].substring(0,10)).getTime(new Date(a["MDATE"].substring(0,10)));
              let b_time = new Date(b["MDATE"].substring(0,10)).getTime(new Date(b["MDATE"].substring(0,10)));
              value_sort = Number(a_time) - Number(b_time);
    
              return value_sort;
            });

            

            Object.keys(data_user).forEach((key_value_1day) => {

              if(data_user[key_value_1day].MDATE.substring(0,4)==this.set_time.substring(0,4)){
                if(data_user[key_value_1day].CHANNEL=='线上渠道'){
                  sale_amt_pt.push((data_user[key_value_1day].PTD_NOT_CANCEL_RATE*100).toFixed(2));
                  hour_data.push(data_user[key_value_1day].MDATE.substring(5,7)*1+'月'); 
                  // hour_data.push(data_user[key_value_1day].MDATE.substring(0,10)); 
                  year_time_data.push(data_user[key_value_1day].MDATE.substring(0,7)); 
                  year_add_time.push((data_user[key_value_1day].MDATE.substring(0,4)));
                }else if(data_user[key_value_1day].CHANNEL=='线下渠道'){
                  sale_amt_zy.push((data_user[key_value_1day].PTD_NOT_CANCEL_RATE*100).toFixed(2));
                }else if(data_user[key_value_1day].CHANNEL=='海外渠道'){
                  sale_amt_cgjx.push((data_user[key_value_1day].PTD_NOT_CANCEL_RATE*100).toFixed(2));
                }else if(data_user[key_value_1day].CHANNEL=='其它'){
                  sale_amt_qt.push((data_user[key_value_1day].PTD_NOT_CANCEL_RATE*100).toFixed(2));
                }
              }


            });
            // console.log(hour_data);
            // console.log(sale_amt_pt);
            // console.log(sale_amt_zy);
            // console.log(sale_amt_cgjx);
          }

          // console.log(data_user);

          year_add_time=year_add_time=this.unique(year_add_time);

          // console.log(year_add_time);
          // console.log(year_time_data);         


          //默认值开始 
          this.barData_lin.value1=0;
          this.barData_lin.value2=0;
          this.barData_lin.value3=0;
          this.barData_lin.value4=0;
          this.barData_lin.month=0;

          let month_time_set=null;

            if(this.sel_value.day_set.day_1==true||this.sel_value.day_set.day_7==true){

              
              let pd_data_user_mon=(((_time_now.getMonth()+1)>9)?(_time_now.getMonth()+1):'0'+(_time_now.getMonth()+1));
              let pd_data_user_day=((_time_now.getDate()>9)?_time_now.getDate():'0'+_time_now.getDate());

              console.log(pd_data_user_mon+pd_data_user_day);

              Object.keys(hour_data).forEach((key_mv) => {
                if(hour_data[key_mv]==(pd_data_user_mon+'-'+pd_data_user_day)){
                  this.barData_lin.month=pd_data_user_mon+'.'+pd_data_user_day;
                  // this.barData_lin.month=_time_now.getFullYear()+'-'+(_time_now.getMonth()+1)+'-'+(_time_now.getDate());

                  this.barData_lin.value1=((sale_amt_cgjx[key_mv]==0)?'--':sale_amt_cgjx[key_mv]+'%');
                  this.barData_lin.value2=((sale_amt_zy[key_mv]==0)?'--':sale_amt_zy[key_mv]+'%');
                  this.barData_lin.value3=((sale_amt_pt[key_mv]==0)?'--':sale_amt_pt[key_mv]+'%');
                  this.barData_lin.value4=((sale_amt_qt[key_mv]==0)?'--':sale_amt_qt[key_mv]+'%');
                }
              });  

              // console.log("=======================");
              // console.log();

              if(this.barData_lin.month==0){
                // this.barData_lin.month=year_time_data[year_time_data.length-1];
                this.barData_lin.month=(year_time_data[year_time_data.length-1]).substring(0,4)+'.'
                +(year_time_data[year_time_data.length-1]).substring(5,7)+'.'
                +(year_time_data[year_time_data.length-1]).substring(8,10)

                this.barData_lin.value1=((sale_amt_cgjx[sale_amt_cgjx.length-1]==0)?'--':sale_amt_cgjx[sale_amt_cgjx.length-1]+'%');
                this.barData_lin.value2=((sale_amt_zy[sale_amt_zy.length-1]==0)?'--':sale_amt_zy[sale_amt_zy.length-1]+'%');
                this.barData_lin.value3=((sale_amt_pt[sale_amt_pt.length-1]==0)?'--':sale_amt_pt[sale_amt_pt.length-1]+'%');
                this.barData_lin.value4=((sale_amt_qt[sale_amt_qt.length-1]==0)?'--':sale_amt_qt[sale_amt_qt.length-1]+'%');
                
              }

            }else{

              // console.log(hour_data);

              Object.keys(hour_data).forEach((key_mv) => {
                // if(hour_data[key_mv]==((_time_now.getMonth()+1)+'月')){
                //   this.barData_lin.month=_time_now.getFullYear()+(_time_now.getMonth()+1);
                if(hour_data[key_mv]==((this.set_time.substring(0,4)==_time_now.getFullYear())?((_time_now.getMonth()+1)+'月'):'12月')){

                  if(this.set_time.substring(0,4)==_time_now.getFullYear()){
                    month_time_set=(((_time_now.getMonth()+1)>9)?(_time_now.getMonth()+1):'0'+(_time_now.getMonth()+1));
                    this.barData_lin.month=this.set_time.substring(0,4)+'.'+month_time_set;                       
                  }else{
                    this.barData_lin.month=this.set_time.substring(0,4)+'.'+'12'; 
                  }

                  this.barData_lin.value1=((sale_amt_cgjx[key_mv]==0)?'--':sale_amt_cgjx[key_mv]+'%');
                  this.barData_lin.value2=((sale_amt_zy[key_mv]==0)?'--':sale_amt_zy[key_mv]+'%');
                  this.barData_lin.value3=((sale_amt_pt[key_mv]==0)?'--':sale_amt_pt[key_mv]+'%');
                  this.barData_lin.value4=((sale_amt_qt[key_mv]==0)?'--':sale_amt_qt[key_mv]+'%');
                }
              });  

              if(this.barData.value==0&&this.barData.ago_value==0){
                this.barData_lin.month=(year_time_data[year_time_data.length-1]).replace(/[^0-9]/ig,"").substring(0,4)+'.'
                +(year_time_data[year_time_data.length-1]).replace(/[^0-9]/ig,"").substring(4,6);

                this.barData_lin.value1=((sale_amt_cgjx[sale_amt_cgjx.length-1]==0)?'--':sale_amt_cgjx[sale_amt_cgjx.length-1]+'%');
                this.barData_lin.value2=((sale_amt_zy[sale_amt_zy.length-1]==0)?'--':sale_amt_zy[sale_amt_zy.length-1]+'%');
                this.barData_lin.value3=((sale_amt_pt[sale_amt_pt.length-1]==0)?'--':sale_amt_pt[sale_amt_pt.length-1]+'%');
                this.barData_lin.value4=((sale_amt_qt[sale_amt_qt.length-1]==0)?'--':sale_amt_qt[sale_amt_qt.length-1]+'%');
              }

            }
          //默认值结束




          if(this.sel_value.day_set.day_1==true||this.sel_value.day_set.day_7==true){
            Object.keys(hour_data).forEach((key_user) => {
              hour_data[key_user]=(hour_data[key_user]).substring(0,2)+'.'+(hour_data[key_user]).substring(3,5)
            });
          }



          this.chartIns2.setOption({


              grid: {
                left: "1%",
                top: "6%",
                right: "5%",
                // bottom: "15%",
                bottom: "0%",
                containLabel: true,
              },

              legend: {
                show: false,
                data: ["海外", "线下","线上","其它"],
                // right: "3%",
                // top: "0%",
                // bottom: "2%",
                bottom: "bottom",
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
                trigger: "axis",
                axisPointer: {
                  // type: "cross",
                  label: {
                    color: "#000000",
                    backgroundColor: "aliceblue",
                  },
                },

                formatter:function (params) {

                  // console.log(params);

                  if(params.length==4){
                    _this.barData_lin.value1=(params[0]==undefined||params[0].value==undefined||params[0].value==0)? '--':params[0].value+'%';
                    _this.barData_lin.value2=(params[1]==undefined||params[1].value==undefined||params[1].value==0)? '--':params[1].value+'%';
                    _this.barData_lin.value3=(params[2]==undefined||params[2].value==undefined||params[2].value==0)? '--':params[2].value+'%';
                    _this.barData_lin.value4=(params[3]==undefined||params[3].value==undefined||params[3].value==0)? '--':params[3].value+'%';
                  }else{
                    Object.keys(params).forEach((set_value_tip) => {
                      // console.log(params[set_value_tip].seriesName);
                      if(params[set_value_tip].seriesName=='线上'){
                        _this.barData_lin.value3=(params[set_value_tip]==undefined||params[set_value_tip].value==undefined||params[set_value_tip].value==0)? '--':params[set_value_tip].value+'%';
                      }else if(params[set_value_tip].seriesName=='线下'){
                        _this.barData_lin.value2=(params[set_value_tip]==undefined||params[set_value_tip].value==undefined||params[set_value_tip].value==0)? '--':params[set_value_tip].value+'%';
                      }else if(params[set_value_tip].seriesName=='海外'){
                        _this.barData_lin.value1=(params[set_value_tip]==undefined||params[set_value_tip].value==undefined||params[set_value_tip].value==0)? '--':params[set_value_tip].value+'%';
                      }else if(params[set_value_tip].seriesName=='其它'){
                        _this.barData_lin.value4=(params[set_value_tip]==undefined||params[set_value_tip].value==undefined||params[set_value_tip].value==0)? '--':params[set_value_tip].value+'%';
                      }
                    });                    
                  }



                  // _this.barData_lin.month=year_add_time+'-'+params[0].axisValue;
                  // _this.barData.value =(params[1]==undefined||params[1].value==undefined)? '--':params[1].value;
                  // _this.barData.ago_value =(params[0]==undefined||params[0].value==undefined)? '--': params[0].value;

                  if(_this.sel_value.day_set.month==true){

                    // console.log(year_add_time[0]);
                    _this.barData_lin.month =year_add_time[0]+'.'+
                      ((params[0].axisValue).replace(/[^0-9]/ig,"")>9?
                      (params[0].axisValue).replace(/[^0-9]/ig,""):'0'+(params[0].axisValue).replace(/[^0-9]/ig,""));

                  }else{
                    // _this.barData_lin.month =year_add_time[0]+'-'+(params[0].axisValue);
                    _this.barData_lin.month =year_add_time[0]+'.'+
                    (params[0].axisValue).replace(/[^0-9]/ig,"").substring(0,2)+'.'+
                    (params[0].axisValue).replace(/[^0-9]/ig,"").substring(2,4);
                  }



                }

              },

              xAxis: {
                type: "category",
                boundaryGap: false,
                data: hour_data,
                axisLine: {
                  lineStyle: {
                    color: "#ccc",
                  },
                },
                axisLabel: {
                  // interval: 'auto',
                  // interval: 4,
                  
                },
              },
              yAxis: {
                type: "value",
                splitLine: {
                  show: true,
                  lineStyle: { type: "dotted", color: "#ccc" },
                },
                axisLine: {
                  show: false,
                },
                axisTick: {
                  show: false,
                },
                axisLabel: {
                  textStyle: {
                    color: "#ccc",
                  },

                },

              },

              series: [
                {
                  name: "海外",
                  showSymbol: false,
                  smooth: false, //true 为平滑曲线，false为直线
                  itemStyle: {
                    color: "#919191",

                    normal: {

                      color: "#F5A028",
                      lineStyle: {
                        // color: "#BBBBBB",
                        color: "#F5A028",
                        width: 1, //设置线条粗细
                      },
                      areaStyle: {
                        color: "rgba(255, 255, 255, 0.00)",
                      },

                    },
                  },
                  data: sale_amt_cgjx,
                  type: "line",
                  areaStyle: {},
                },

                {
                  name: "线下",
                  showSymbol: false,
                  smooth: false, //true 为平滑曲线，false为直线
                  itemStyle: {
                    color: "#0938F7",

                    normal: {
                      // color: "#66ccff",
                      color: "#657798",
                      lineStyle: {
                        color: "#657798",
                        width: 1, //设置线条粗细
                      },
                      areaStyle: {
                        // color: "rgba(102, 204, 225, 0.05)",
                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                          {
                            offset: 0,
                            color: "rgba(6,69,165, 0.01)",
                          },
                          {
                            offset: 1,
                            color: "rgba(6,69,165, 0.05)",
                          },
                        ]),
                      },
                    },
                  },

                  data: sale_amt_zy,

                  type: "line",
                  areaStyle: {},
                },


                {
                  name: "线上",
                  showSymbol: false,
                  smooth: false, //true 为平滑曲线，false为直线
                  itemStyle: {
                    color: "#0938F7",

                    normal: {
                      // color: "#66ccff",
                      color: "#1678FF",
                      lineStyle: {
                        color: "#1678FF", 
                        width: 1, //设置线条粗细
                      },
                      areaStyle: {
                        // color: "rgba(102, 204, 225, 0.05)",
                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                          {
                            offset: 0,
                            color: "rgba(6,69,165, 0.01)",
                          },
                          {
                            offset: 1,
                            color: "rgba(6,69,165, 0.01)",
                          },
                        ]),
                      },
                    },
                  },

                  data: sale_amt_pt,

                  type: "line",
                  areaStyle: {},
                },


                // {
                //   name: "其它",
                //   showSymbol: false,
                //   smooth: false, //true 为平滑曲线，false为直线
                //   itemStyle: {
                //     color: "#0938F7",
                //     normal: {
                //       // color: "#66ccff",
                //       color: "#6A00A5",
                //       lineStyle: {
                //         color: "#6A00A5", 
                //         width: 1, //设置线条粗细
                //       },
                //       areaStyle: {
                //         // color: "rgba(102, 204, 225, 0.05)",
                //         color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                //           {
                //             offset: 0,
                //             color: "rgba(6,69,165, 0.01)",
                //           },
                //           {
                //             offset: 1,
                //             color: "rgba(6,69,165, 0.01)",
                //           },
                //         ]),
                //       },
                //     },
                //   },
                //   data: sale_amt_qt,
                //   type: "line",
                //   areaStyle: {},
                // },



                
              ],


          });


        }catch(error){ 
          console.log("========错误捕捉信息==========")
          // console.log(error)
          console.error(error);
          // this.info_error+=1;
          Information_log('渠道运营-未发取消','渠道运营-未发取消折线图:  '+error.toString());
        }


      });

    },



    initChart3() {

      // console.log("运行到B店！！！");

      this.chartIns3 = echarts.init(this.$refs["chart3"]);

      let hour_data = [];
      let sale_amt = [];
      // let ago_amt = [];
      let user_data = [];

      this.p1.then(() => {
        
        let data = this.data_screen(this.data);

        if(this.sel_value.Range_on.Range_set=='1'){
          console.log(user_data);

        }else if(this.sel_value.Range_on.Range_set=='2'){
          console.log(user_data);

        }else if(this.sel_value.Range_on.Range_set=='3'){

          user_data=data["FS_YY_KD-PCT_SHOP_ACT_M"];


          // console.log("=========活动趋势B店图==========");
          // console.log(user_data);


          user_data.sort((a, b) => {
            let a_time = "";
            let b_time = "";
            a_time = a["CUST_PRC_A"];
            b_time = b["CUST_PRC_A"];
            
            return  b_time -a_time;
          });

          switch (this.shop_switch.shop_value.value_set){
            case 1:

                Object.keys(user_data).forEach((key_value_chart3) => {
                  // console.log(user_data[key_value_chart3].MDATE.substring(0, 7));
                  if(user_data[key_value_chart3].MDATE.substring(0, 7)==(this.set_time.substring(0,4)+"-"+this.set_time.substring(5,7))&&user_data[key_value_chart3].SHOP_CODE=='B'){
                    console.log("对应的月份");

                    let [prefix_n, interfaceName_n] = user_data[key_value_chart3].ACT_NAME.split("-"); //把上面的拆分出来
                    if(interfaceName_n==undefined){
                      interfaceName_n=prefix_n;
                    }
                    sale_amt.push((user_data[key_value_chart3].CUST_PRC_A).toFixed(2)*1);
                    // hour_data.push(user_data[key_value_chart3].ACT_NAME);
                    hour_data.push(interfaceName_n);
                  }
                });            
              break;
            case 2:
                Object.keys(user_data).forEach((key_value_chart3) => {
                  if(user_data[key_value_chart3].MDATE.substring(0, 7)==(this.set_time.substring(0,4)+"-"+this.set_time.substring(5,7))&&user_data[key_value_chart3].SHOP_CODE=='D'){
                    console.log("对应的月份");
                    sale_amt.push((user_data[key_value_chart3].CUST_PRC_A).toFixed(2)*1);
                    hour_data.push(user_data[key_value_chart3].ACT_NAME);
                  }
                });   
              break;
            case 3:
                Object.keys(user_data).forEach((key_value_chart3) => {
                  if(user_data[key_value_chart3].MDATE.substring(0, 7)==(this.set_time.substring(0,4)+"-"+this.set_time.substring(5,7))&&user_data[key_value_chart3].SHOP_CODE=='JDLS'){
                    console.log("对应的月份");
                    sale_amt.push((user_data[key_value_chart3].CUST_PRC_A).toFixed(2)*1);
                    hour_data.push(user_data[key_value_chart3].ACT_NAME);
                  }
                });  
              break;

          }

        }


        // console.log(this.shop_switch.shop_value.value_set);
        // console.log(user_data);
        // console.log(sale_amt);
        // console.log(hour_data);

        this.chartIns3.setOption({

          grid: {
            left: "1%",
            top: "6%",
            right: "5%",
            // bottom: "15%",
            bottom: "0%",
            containLabel: true,
          },

          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                color: "#000000",
                backgroundColor: "aliceblue",
              },
            },
          },

          xAxis: {
            type: "category",
            // boundaryGap: false,
            data: hour_data,
            axisLine: {
              lineStyle: {
                color: "#ccc",
              },
            },
            axisLabel: {
              // interval: 'auto',
              // interval: 4,
              
            },
            axisTick: {
              alignWithLabel: true
            }
          },

          yAxis: {
            type: "value",
            splitLine: {
              show: true,
              lineStyle: { type: "dotted", color: "#ccc" },
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              textStyle: {
                color: "#ccc",
              },
            },
          },

          series: [
            {
              name: "活动区间趋势",
              showSymbol: false,
              smooth: false, //true 为平滑曲线，false为直线
              itemStyle: {
                color: "#919191",
                normal: {
                  color: "#1678FF",
                  lineStyle: {
                    // color: "#BBBBBB",
                    color: "#1678FF",
                    width: 1, //设置线条粗细
                  },
                  areaStyle: {
                    color: "rgba(255, 255, 255, 0.00)",
                  },
                },
              },
              barWidth:'60%',
              data: sale_amt,
              type: "bar",
              areaStyle: {},
              
            },
          ],
        });
      

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


    nll_undefined(setvalue){
      // setvalue=setvalue==undefined?'--':setvalue;
      // return setvalue;
      setvalue=setvalue.toString();
      setvalue=setvalue.indexOf("undefined")==-1?setvalue:'--';
      return setvalue;
    },  


    ajax_data(apiMap){
      console.log("运行到ajax交互哪里！！！！！！！！");
      let num_api=0;
      let num_api_pd=0;
      let p_array=[];
      let variable={};

      // 数组处理开始
      Object.keys(apiMap).forEach((key_fun) => {
        num_api++;
        [variable['p'+num_api],variable['resolve'+num_api]]=generatePromise();
        p_array.push(variable['p'+num_api]);
        apiMap[key_fun].type=Array;
        apiMap[key_fun]['resolve'+num_api]=variable['resolve'+num_api];

        apiMap[key_fun]['num']=num_api;

      });
      // 数组处理结束

      Object.keys(apiMap).forEach((key) => {

        
        if (this.permissionList[key]) {
          const [, prefix, interfaceName] = key.split("-"); //把上面的拆分出来
          if (prefix && interfaceName) {
            // console.log(prefix+"              "+interfaceName);
            this.$axios
              .post(`/api/admin/data/${prefix}/${interfaceName}/get`, {})
              .then(({ data }) => {
                if (apiMap[key].type === Array) {
                  this.data[`${prefix}-${interfaceName}`] = data;
                } else {
                  this.data[`${prefix}-${interfaceName}`] = data;
                }

                num_api_pd++;
                Object.keys(variable).forEach((key_var) => {

                  if(key_var==('resolve'+apiMap[key]['num'])){
                    // console.log(apiMap[key]['resolve'+apiMap[key]['num']]());
                    apiMap[key]['resolve'+apiMap[key]['num']]();

                    if(num_api_pd==num_api){
                      console.log("加载完成！！！！！！！！！！！！！！！");
                      this.$EventBus.$emit("data_loay_set", {
                        data_loay_seton: true,
                      });
                    }

                  }
                });

              });
          }
        }
      });


      this.p1= Promise.all(p_array);

    },


    unique(arr) {
      // 数组去重
      var arr1 = []; // 新建一个数组来存放arr中的值
      for (var i = 0, len = arr.length; i < len; i++) {
        if (arr1.indexOf(arr[i]) === -1) {
          arr1.push(arr[i]);
        }
      }
      return arr1;
    },

  },

  //生命周期结束之前销毁
  beforeDestroy () {
    this.$EventBus.$off("Salechan_marketoper_f");
    this.$EventBus.$off("data_loay_set");
  },


}
</script>

<style scoped lang="scss">
.section-title {
  font-size: 12px;
  // font-weight: bold;
  padding-bottom: 10px;
}

.Productmarket_all .van-notice-bar {
  line-height: 12px;
  font-size: 12px;
}

.Productmarket_day .van-row .van-col button {
  font-size: 12px;
  height: 28px;
  color: #000000;
  width: 75px;
}







.table_all,.table_all_top10 {
  padding-top: 10px;
}
.table_all ul li,.table_all_top10 ul li {
  height: 30px;
  padding-bottom: 10px;
}

.table_all_top10 ul.table_top10 li {
  height: 60px;
  padding-bottom: 10px;
}


.table_all .table_title ul li {
  float: left;
  width: 20%;
  font-size: 12px;
  color: #999999;
}

.table_all_top10 .table_title ul li {
  float: left;
  width: 25%;
  font-size: 12px;
  color: #999999;
}

.table_all .table_content ul li {
  float: left;
  width: 20%;
  font-size: 12px;
  // color: #999999;
}

.table_all_top10 .table_content ul li {
  float: left;
  width: 20%;
  font-size: 12px;
  // color: #999999;
}





.dashboard_title p {
  margin: 0px;
  // text-align: center;
  line-height: 25px;
  font-size: 14px;
  padding-left: 50px;
}

#table_all_new {
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
}
#table_all_new ul li {
  height: 30px;
  padding-bottom: 10px;
}
#table_all_new .table_title ul li {
  float: left;
  width: 20%;
  font-size: 12px;
  color: #999999;
  // text-align: center;
}

#table_all_new .table_content ul li {
  float: left;
  width: 20%;
  font-size: 12px;
  // color: #999999;
}

#table_all_new .table_content ul {
  // margin-left: -30px;
}





.target_info .target_info_body .target_info_text_span {
  width: 100%;
  display: block;
  // font-size: 14px;
  font-size: 16px;
  text-align: center;
  // line-height: 25px;
  // color: #0066ff;
  // color: #159B80;

}

/deep/ .target_info .target_info_body .target_info_text_span .rate-down_salesR:after{
  // top: 10px;
  top: 5px;
  right: -10px;
}

/deep/ .target_info .target_info_body .target_info_text_span .rate-up_salesR:after{
  right: -11px;
  top: 5px;
}



.target_info .target_info_body .target_info_text_i {
  width: 100%;
  display: block;
  font-style: normal;
  text-align: center;
  font-size: 12px;

  padding-left: 10px;
  padding-right: 10px;
  // padding-top: 10px;
  padding-top: 0px;

}

.target_info .target_info_body .target_info_text_i span {

  padding: 4px;
  // border: 1px solid #e6e6e6;
  border-radius: 50px;
  padding-left: 5px;
  padding-right: 5px;
  // width: 90%;
  width: 100%;
  display: block;
  margin: 0 auto;

  color: #919191;


}

.title_change{
  color: #23B0A8;
}



.popup_css{
  border-radius: 10px;
}

.popup_css div p{
  margin: 0 auto;
}

.kjsm_bg{
  width: 300px;
  height: 50px;
  text-align: center;
  padding-top: 15px;
  font-weight: bold;
  font-size: 16px;
  background: url("~@/assets/images/sm_bg.png") no-repeat left top/cover;

}

</style>
