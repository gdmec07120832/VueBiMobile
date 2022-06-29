

<template>
  <div class="Productmarket_all" >
    <!-- style="background: rgb(245, 245, 245)" -->
    <van-popup
      get-container="body"
      v-model="show"
      position="bottom"
      :style="{ height: '50%', overflow: 'hidden' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        title="选择月日"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @confirm="time_sel"
        @cancel="time_cancel"
      />
    </van-popup>

    <!-- 滑屏开始 -->
    <van-pull-refresh v-model="isLoading" :head-height="0" :pull-distance="0" @refresh="onRefresh">
      <div>

        <!-- <van-notice-bar
          wrapable
          :scrollable="false"
          color="#999999"
          background="rgba(245, 245, 245, 1)"
          :text="'更新时间：' + data_load_time.substring(0,10)+' '+data_load_time.substring(11,19)"
        /> -->

        <section
          style="padding-top: 5px; padding-bottom: 0px; border-radius: 4px; ;margin-left: 10px;margin-right: 10px;margin-bottom: 5px;"
        >
          <!-- <div class="" style="padding-left: 0px; padding-bottom: 0px;color: #999999;font-size: 12px;">
            {{'更新时间：' + data_load_time.substring(0,10)+' '+data_load_time.substring(11,19)}}
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
                <p style="margin-bottom: 20px;margin-top: 5px;">T+1(数据截止到昨天)</p> 

              <p style="font-weight: bold;">
                <i style="width: 5px;height: 16px;background-color: #23B0A8;display: block;float: left;margin-right: 5px;margin-top: 3px;border-radius: 4px;"></i>
                <span style="color: #000000;">逻辑说明</span></p>

              <!-- <p>本页面数据为全渠道中心考核口径，目标及业绩数据范围包括线上、线下、海外；</p>
              <p>注：不包括母婴、快手、定制、拎包</p> -->

              <van-collapse v-model="activeNames_tips" accordion>
                <van-collapse-item title="豆腐块-客单价" name="1">
                  <p>不含小件客单价：</p>
                  <p>①不含小件客单价=总金额/订单数；</p>
                  <p>②以买家昵称为购买订单数进行统计，买家昵称去重；剔除发货仓库全是小商品成品仓的买家</p>
                  <p>③以买家昵称购买的商品货值为总金额，剔除已删除商品；剔除发货仓库为小商品成品仓的商品；</p>
                </van-collapse-item>
                <van-collapse-item title="活动区域-客单价" name="2">
                  <p>活动客单价：</p>
                  <p>①统计时间：结合运营活动节奏，切割计算客单价的区间变化；</p>
                  <p>②以买家昵称为购买订单数进行统计，买家昵称去重；</p>
                  <p>③以买家昵称购买的订单总支付金额为总金额，不剔除未发取消；</p>
                </van-collapse-item>
                <van-collapse-item title="城市等级-客单价" name="3">
                  <p>地域客单价：</p>
                  <p>①以百度城市分级制，观察城市客单价变化；</p>
                  <p>②以买家昵称为购买订单数进行统计，买家昵称去重；</p>
                  <p>③以买家昵称购买的商品货值为总金额，剔除已删除商品；含小商品成品仓货值；</p>
                </van-collapse-item>
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



        <!-- <section
          style="
            padding-top: 10px;
            padding-bottom: 5px;
            background: #ffffff;
            border-radius: 4px;
            margin-left: 10px;
            margin-right: 10px;
          "
        >

          <div class="Productmarket_day">
            <van-row type="flex" justify="center">
              <van-col
                span="5"
                @click="
                  Single_choice('day_1', '', true, '_this.sel_value.day_set')
                "
                ><van-button
                  :type="
                    sel_value.day_set.day_1
                      ? click_css_set.type
                      : click_css_no.type
                  "
                  class="but_set_select"
                  :color="
                    sel_value.day_set.day_1
                      ? click_css_set.color
                      : click_css_no.color
                  "
                  >1天</van-button
                ></van-col
              >

              <van-col
                span="5"
                @click="
                  Single_choice('day_7', '', true, '_this.sel_value.day_set')
                "
                ><van-button
                  :type="
                    sel_value.day_set.day_7
                      ? click_css_set.type
                      : click_css_no.type
                  "
                  class="but_no_select"
                  :color="
                    sel_value.day_set.day_7
                      ? click_css_set.color
                      : click_css_no.color
                  "
                  >近7天</van-button
                ></van-col
              >
              <van-col
                span="5"
                @click="
                  Single_choice('day_30', '', true, '_this.sel_value.day_set')
                "
                ><van-button
                  :type="
                    sel_value.day_set.day_30
                      ? click_css_set.type
                      : click_css_no.type
                  "
                  class="but_no_select"
                  :color="
                    sel_value.day_set.day_30
                      ? click_css_set.color
                      : click_css_no.color
                  "
                  >近30天</van-button
                ></van-col
              >

              <van-col
                span="5"
                @click="
                  Single_choice(
                    'month',
                    ['_this.showPopup()'],
                    true,
                    '_this.sel_value.day_set'
                  )
                "
                ><van-button
                  :type="
                    sel_value.day_set.month
                      ? click_css_set.type
                      : click_css_no.type
                  "
                  class="but_no_select"
                  :color="
                    sel_value.day_set.month
                      ? click_css_set.color
                      : click_css_no.color
                  "
                  >月</van-button
                ></van-col
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
                sel_value.day_set.day_7 || sel_value.day_set.day_30
                  ? set_time_range.start + "~" + set_time_range.end
                  : set_time.substring(0, 4) +
                    "年" +
                    set_time.substring(5, 7) +
                    "月"
              }}）</span
            >
          </div>
        </section> -->

        
        <!-- <van-notice-bar
          wrapable
          style="padding: 5px"
          :scrollable="false"
          color="rgba(245, 245, 245, 1)"
          background="rgba(245, 245, 245, 1)"
          text=""
        /> -->


        <section
          style="
            padding-top: 10px;
            padding-bottom: 10px;
            border-radius: 4px;
            background: #ffffff;
            margin-left: 10px;
            margin-right: 10px;
          "
        >
          <div
            v-if="sel_value.Range_on.Range_set=='10'"
            class="section-title test_addd"
            style="padding-left: 1.5%; padding-bottom: 5px"
          >
            核心指标
          </div>

          <div
            class="Productmarket_labqie"
            style="
              border-bottom: 0px solid #dddddd;
              margin-left: 10px;
              margin-right: 10px;
            "
          >
            <div
              @click="
                Single_choice('all_muri_value', ['_this.data_screen_quota()','_this.initChart()','_this.echarts_clear=true'], 1, '_this.sel_value.target')
              "
              class="Productmarket_labqie_con1"
              :style="
                sel_value.target.all_muri_value == 1
                  ? click_css_hxzb_y
                  : click_css_hxzb_n
              "
            >
              <span :class="sel_value.target.all_muri_value == 1? 'title_change':''" :style="sum_zhibiao.title">{{
                sel_title.chanzhi_wenzi.title_all
              }}</span>

              <!--  sel_title_setvalue.quota_value.cont1-->

              <span :style="sum_zhibiao.zhognxin"> 
                {{

                  (sel_title_setvalue.quota_value.cont1==undefined)?
                  '--'
                  :
                  (sel_value.Range_on.Range_set=='5')? nll_undefined(fomatMoney((sel_title_setvalue.quota_value.cont1*1).toFixed(1)))+'元':
                  (sel_value.Range_on.Range_set=='4')?
                  nll_undefined((sel_title_setvalue.quota_value.cont1*100).toFixed(2))+'%' :
                  (sel_value.Range_on.Range_set=='2')?
                  nll_undefined(fomatMoney(((sel_title_setvalue.quota_value.cont1/10000)/10000).toFixed(2)))+'亿':
                  nll_undefined(fomatMoney((sel_title_setvalue.quota_value.cont1/10000).toFixed(1)))+'万'
                  
                }}
              </span>

              <span :style="sum_zhibiao.body">
                <i
                  style="width: 30%; display: inline-block; font-style: normal"
                  >{{ sel_title.chanzhi_wenzi.reach_rate }}</i
                >
                <i style="font-style: normal;"
                
                > 
                  {{(sel_title_setvalue.quota_value.cont2==undefined||sel_title_setvalue.quota_value.cont2==0)? '--':
                  (sel_value.Range_on.Range_set=='5')? nll_undefined(fomatMoney((sel_title_setvalue.quota_value.cont2*1).toFixed(1)))+'元':

                  (sel_value.Range_on.Range_set=='2')? 
                  nll_undefined((sel_title_setvalue.quota_value.cont2/10000/10000).toFixed(2))+'亿':
                  (sel_value.Range_on.Range_set=='1')?
                  nll_undefined((sel_title_setvalue.quota_value.cont2/10000).toFixed(1))+'万': 
                  (sel_value.Range_on.Range_set=='4')?
                  nll_undefined((sel_title_setvalue.quota_value.cont2*100).toFixed(1))+'%': 
                  nll_undefined((sel_title_setvalue.quota_value.cont2/10000).toFixed(1))+'万'}} 
        
                  </i>
              </span>
              <span class="tongbi_css" :style="sum_zhibiao.body">
                <i
                  style="
                  
                    width: 30%;
                    display: inline-block;
                    font-style: normal;
                  "
                  >
                  {{ sel_title.chanzhi_wenzi.ago_rate }}
                  </i
                >
                <!-- :class="calcSignClass(data['overview-ka_reach_yoy_rate'])"  rate-up-->
                <!--  sel_value.target.all_muri_value == 1?
                        Number(
                           sel_title_setvalue.quota_value.cont3
                         ) > 0
                         ? 'rate-up'
                         : 'rate-down'
                      : -->
                <i 
                style="font-style: normal;padding-left: 3px;"

                  :class="

                      (sel_value.Range_on.Range_set=='3')||(sel_value.Range_on.Range_set=='2')||(sel_value.Range_on.Range_set=='4')?

                      (sel_value.Range_on.Range_set=='3')||(sel_value.Range_on.Range_set=='4')?
                      Number(
                            sel_title_setvalue.quota_value.cont3
                          ) > sel_title_setvalue.quota_value.cont2
                        ? 'rate-up_salesR'
                        : 'rate-down_salesR'
                      :
                        Number(
                            sel_title_setvalue.quota_value.cont3
                          ) > 0
                        ? 'rate-up_salesR'
                        : 'rate-down_salesR'
                      :
                        Number(
                            sel_title_setvalue.quota_value.cont3
                          ) > 0
                        ? 'rate-up'
                        : 'rate-down'
                  "
                >
                  {{
                    (sel_value.Range_on.Range_set=='3')?
                    nll_undefined((sel_title_setvalue.quota_value.cont3/10000).toFixed(1))+'万'
                    :
                    nll_undefined((sel_title_setvalue.quota_value.cont3*100).toFixed(1))+'%'
                  
                  }}</i
                >
              </span>
            </div>

            <div
              @click="
                Single_choice('all_muri_value', ['_this.data_screen_quota()','_this.initChart()','_this.echarts_clear=true'], 2, '_this.sel_value.target')
              "
              class="Productmarket_labqie_con2"
              :style="
                sel_value.target.all_muri_value == 2
                  ? click_css_hxzb_y
                  : click_css_hxzb_n
              "
            >
              <span :class="sel_value.target.all_muri_value == 2? 'title_change':''" :style="sum_zhibiao.title">{{
                sel_title.chanzhi_wenzi.title_muban
              }}</span>
              <span :style="sum_zhibiao.zhognxin"> 
                {{
                  (sel_value.Range_on.Range_set=='5')? nll_undefined(fomatMoney((sel_title_setvalue.quota_value.cont4*1).toFixed(1)))+'元':

                  (sel_value.Range_on.Range_set=='4')?
                  nll_undefined((sel_title_setvalue.quota_value.cont4*100).toFixed(2))+'%':
                  (sel_value.Range_on.Range_set=='2')?
                  nll_undefined(fomatMoney(((sel_title_setvalue.quota_value.cont4/10000)/10000).toFixed(2)))+'亿':
                  nll_undefined(fomatMoney((sel_title_setvalue.quota_value.cont4/10000).toFixed(1)))+'万'
                  }} </span>

              <span :style="sum_zhibiao.body">
                <i
                  style="width: 30%; display: inline-block; font-style: normal"
                  >{{ sel_title.chanzhi_wenzi.reach_rate }}</i
                >
                <i style="font-style: normal"> {{(sel_title_setvalue.quota_value.cont5==0)? '--':
                  (sel_value.Range_on.Range_set=='5')? nll_undefined(fomatMoney((sel_title_setvalue.quota_value.cont5*1).toFixed(1)))+'元':

                  (sel_value.Range_on.Range_set=='2')? 
                  nll_undefined((sel_title_setvalue.quota_value.cont5/10000/10000).toFixed(2))+'亿':
                  nll_undefined((sel_title_setvalue.quota_value.cont5/10000).toFixed(1))+'万'}} </i>
              </span>
              <span class="tongbi_css" :style="sum_zhibiao.body">
                <i
                  style="
                  
                    width: 30%;
                    display: inline-block;
                    font-style: normal;
                  "
                  >{{ sel_title.chanzhi_wenzi.ago_rate }}</i
                >

                <!--  sel_value.target.all_muri_value == 2
                      ? Number(
                          sel_title_setvalue.quota_value.cont6
                        ) > 0
                        ? 'rate-up-sel'
                        : 'rate-down-sel'
                      :  -->

                <i
                style="font-style: normal;"
                :style="(sel_value.Range_on.Range_set=='4'&&sel_title_setvalue.quota_value.cont6==0)?{'padding-left': '0px'}:{'padding-left': '3px'}"
                  :class="

                      (sel_value.Range_on.Range_set=='3')||(sel_value.Range_on.Range_set=='2')||(sel_value.Range_on.Range_set=='4')? 

                      (sel_value.Range_on.Range_set=='4'&&sel_title_setvalue.quota_value.cont6==0)?
                      ''
                      :
                      (sel_value.Range_on.Range_set=='3')?
                      Number(
                            sel_title_setvalue.quota_value.cont6
                          ) > sel_title_setvalue.quota_value.cont5
                        ? 'rate-up_salesR'
                        : 'rate-down_salesR'
                      :

                         Number(
                            sel_title_setvalue.quota_value.cont6
                          ) > 0
                        ? 'rate-up_salesR'
                        : 'rate-down_salesR'
                      :
                        Number(
                            sel_title_setvalue.quota_value.cont6
                          ) > 0
                        ? 'rate-up'
                        : 'rate-down'
                  "
                >
                  {{
                    (sel_value.Range_on.Range_set=='3')?
                    nll_undefined((sel_title_setvalue.quota_value.cont6/10000).toFixed(1))+'万'
                    :
                    (sel_value.Range_on.Range_set=='4'&&sel_title_setvalue.quota_value.cont6==0)?
                    '--'
                    :
                    nll_undefined((sel_title_setvalue.quota_value.cont6*100).toFixed(1))+'%'
                  }}</i
                >
              </span>
            </div>

            <div
              @click="
                Single_choice('all_muri_value', ['_this.data_screen_quota()','_this.initChart()','_this.echarts_clear=true'], 3, '_this.sel_value.target')
              "
              class="Productmarket_labqie_con3"
              :style="
                sel_value.target.all_muri_value == 3
                  ? Object.assign({}, click_css_hxzb_y, { 'margin-right': '0%' })
                  : Object.assign({}, click_css_hxzb_n, { 'margin-right': '0%' })
              "
            >
              <span :class="sel_value.target.all_muri_value == 3? 'title_change':''" :style="sum_zhibiao.title">{{
                sel_title.chanzhi_wenzi.title_ruanti
              }}</span>
              <span :style="sum_zhibiao.zhognxin"> 
                {{
                (sel_value.Range_on.Range_set=='5')? nll_undefined(fomatMoney((sel_title_setvalue.quota_value.cont7*1).toFixed(1)))+'元':
                (sel_value.Range_on.Range_set=='4')?
                nll_undefined((sel_title_setvalue.quota_value.cont7*100).toFixed(2))+'%':
                (sel_value.Range_on.Range_set=='2')?
                nll_undefined(fomatMoney(((sel_title_setvalue.quota_value.cont7/10000)/10000).toFixed(2)))+'亿':
                nll_undefined(fomatMoney((sel_title_setvalue.quota_value.cont7/10000).toFixed(1)))+'万'
                }} </span>

              <span :style="sum_zhibiao.body">
                <i
                  style="width: 30%; display: inline-block; font-style: normal"
                  >{{ sel_title.chanzhi_wenzi.reach_rate }}</i
                >
                <i style="font-style: normal"> {{(sel_title_setvalue.quota_value.cont8==0)? '--':
                  (sel_value.Range_on.Range_set=='5')? nll_undefined(fomatMoney((sel_title_setvalue.quota_value.cont8*1).toFixed(1)))+'元':
                  (sel_value.Range_on.Range_set=='2')? 
                  nll_undefined((sel_title_setvalue.quota_value.cont8/10000/10000).toFixed(2))+'亿':
                  nll_undefined((sel_title_setvalue.quota_value.cont8/10000).toFixed(1))+'万'}} </i>
              </span>
              <span class="tongbi_css" :style="sum_zhibiao.body">
                <i
                  style="
                    width: 30%;
                    display: inline-block;
                    font-style: normal;
                  "
                  >{{ sel_title.chanzhi_wenzi.ago_rate }}</i
                >


                <!--  sel_value.target.all_muri_value == 3
                      ? Number(
                          sel_title_setvalue.quota_value.cont9
                        ) > 0
                        ? 'rate-up-sel'
                        : 'rate-down-sel'
                      :  -->

                <i
                style="font-style: normal;"
                :style="(sel_value.Range_on.Range_set=='4'&&sel_title_setvalue.quota_value.cont9==0)?{'padding-left': '0px'}:{'padding-left': '3px'}"
                  :class="

                      (sel_value.Range_on.Range_set=='3')||(sel_value.Range_on.Range_set=='2')||(sel_value.Range_on.Range_set=='4')? 

                      (sel_value.Range_on.Range_set=='4'&&sel_title_setvalue.quota_value.cont9==0)?
                      ''
                      :
                      (sel_value.Range_on.Range_set=='3')?
                      Number(
                            sel_title_setvalue.quota_value.cont9
                          ) > sel_title_setvalue.quota_value.cont8
                        ? 'rate-up_salesR'
                        : 'rate-down_salesR'
                      :
                        Number(
                          sel_title_setvalue.quota_value.cont9
                          ) > 0
                        ? 'rate-up_salesR'
                        : 'rate-down_salesR'
                      :
                        Number(
                          sel_title_setvalue.quota_value.cont9
                          ) > 0
                        ? 'rate-up'
                        : 'rate-down'
                  "
                  >{{
                    (sel_value.Range_on.Range_set=='3')?
                    nll_undefined((sel_title_setvalue.quota_value.cont9/10000).toFixed(1))+'万'
                    :
                    (sel_value.Range_on.Range_set=='4'&&sel_title_setvalue.quota_value.cont9==0)?
                    ' --'
                    :
                    nll_undefined((sel_title_setvalue.quota_value.cont9*100).toFixed(1))+'%'
                    
                    }}</i
                >
              </span>
            </div>

            <div style="clear: both; padding-bottom: 0px"></div>
          </div>
        </section>

        <!-- 2020-10-20新加的开始 -->
        <van-notice-bar
          wrapable
          style="padding: 5px"
          :scrollable="false"
          color="rgba(245, 245, 245, 1)"
          background="rgba(245, 245, 245, 1)"
          text=""
        />
        <!-- 2020-10-20新加的结束 -->

        <!-- 底部canvas开始 -->
        <div
          class="canvas_bottom"
          ref="canvas_w_h"
          style="
            padding-top: 10px;
            background: #ffffff;
            margin-left: 10px;
            margin-right: 10px;
            border-radius: 4px;
            padding-bottom: 10px;
          "
        >
          <!-- 切换优化开始 -->
          <!-- <van-row
            gutter=""
            type="flex"
            :style="
              sel_value.all_muri_value == 3 && sel_value.Range_set == 3
                ? canvas_qiehuan.display_cssn
                : canvas_qiehuan.display_cssb
            "
          >
            <van-col
              span="4"
              :style="
                sel_value.canvas_on.canvas_yes
                  ? Object.assign(
                      {},
                      canvas_qiehuan.yes_css,
                      canvas_qiehuan.left_css
                    )
                  : Object.assign(
                      {},
                      canvas_qiehuan.no_css,
                      canvas_qiehuan.left_css
                    )
              "
            >

              <div
                @click="
                  Single_choice(
                    'canvas_yes',
                    '',
                    true,
                    '_this.sel_value.canvas_on'
                  )
                "
                style="padding: 2px; text-align: center; font-size: 12px"
              >
                时间分布
              </div>
            </van-col>
            <van-col
              span="4"
              :style="
                sel_value.canvas_on.canvas_no
                  ? Object.assign(
                      {},
                      canvas_qiehuan.yes_css,
                      canvas_qiehuan.right_css
                    )
                  : Object.assign(
                      {},
                      canvas_qiehuan.no_css,
                      canvas_qiehuan.right_css
                    )
              "
            >
              <div
                @click="
                  Single_choice(
                    'canvas_no',
                    '',
                    true,
                    '_this.sel_value.canvas_on'
                  )
                "
                style="padding: 2px; text-align: center; font-size: 12px"
              >
                二级类目
              </div>
            </van-col>
          </van-row>
          <div style="clear: both"></div> -->
          <!-- 切换优化结束 class="px10 py10"-->

          <section
            :style="
              sel_value.canvas_on.canvas_yes ? echarts2_css_y : echarts2_css_n
            "
            style="padding-left: 10px;padding-right: 10px;"
          >

          

            <!-- 图例开始 -->
            <!-- <i style="font-style: normal;display: block;height:40px;"></i>  padding-left: 10px; padding-right: 10px;margin-top: 10px;-->

            <i style="font-style: normal;display: block;height:40px; margin-bottom: 0px;">
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
                    <span style="font-size: 12px; color: #FF3300;">{{ nll_undefined(barData.month) }}</span>
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
                    <span style="font-size: 12px; color: #FF3300;">{{ nll_undefined(barData.value) }}</span>
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
                    <span style="font-size: 12px; color: #FF3300;">{{ nll_undefined(barData.ago_value) }}</span>
                  </div> 
                </div>
                <!-- <div></div> -->

              </van-col>
            </van-row>
            </i>
            <!-- 图例结束 style="height: 50vw"-->





            <!-- <div ></div> :style="sel_value.canvas_yes?echarts2_css_y:echarts2_css_n"-->
            <div
              ref="chart"
              :style="canvas_css"
              @touchstart="canvas_qiehuan.canvas_toli_kg = true"
              @touchend="canvas_qiehuan.canvas_toli_kg = false"
            ></div>
          </section>

          <!-- <span
            ><van-notice-bar
              wrapable
              style="padding: 2px"
              :scrollable="false"
              color="rgba(245, 245, 245, 1)"
              background="rgba(245, 245, 245, 1)"
              text=""
          /></span> -->
        </div>






        <section
          :style="(sel_value.Range_on.Range_set=='2')? echarts2_css_y : echarts2_css_n"
        >
        <div
            style= "font-size: 12px; padding-top: 5px; padding-bottom: 5px; border-radius: 4px; ;margin-left: 10px;margin-right: 10px;margin-bottom: 0px;"
          >
            
            {{sel_value.target.all_muri_value == 1? '在途报检':'库龄分层'}}
          </div>
        </section>

        <div
          class="canvas_bottom"
          style="
            padding-top: 10px;
            background: #ffffff;
            margin-left: 10px;
            margin-right: 10px;
            border-radius: 4px;
            padding-bottom: 10px;
          "
          :style="
              (sel_value.Range_on.Range_set=='2')
                ? echarts2_css_y
                : echarts2_css_n
            "
        >
          <section class="px10 py10">


            <!-- 图例开始 -->
            <!-- <i style="font-style: normal;display: block;height:40px;"></i> -->
            <i style="font-style: normal;display: none;height:40px; margin-bottom: 0px;margin-top: 10px; padding-left: 10px; padding-right: 10px;">
              <van-row  type="flex" justify="center" :style="canvas_qiehuan.canvas_toli_kg2==true?canvas_qiehuan.canvas_toli_cssy:canvas_qiehuan.canvas_toli_cssn">
                <!-- <van-col span="6">span: 6</van-col> -->
                <van-col span="4">
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
                      <span style="font-size: 12px; color: #FF3300;">{{ barData2.month }}</span>
                    </div> 
                  </div>
                  <!-- <div></div> -->
                </van-col>
    
                <van-col span="5">
                  <div>
                    <div style="margin: 0 auto; width: 70px; height: 17px;">
                      <div style="height: 17px;display: block;float: left;margin-left: 4px;">
                        <div style="width: 100%; height: 8px;"></div>
                        <i style="width: 10px;height: 2px;background-color: #1678FF;display: block; margin-right: 6px;"></i>
                    
                      </div>
    
                      <div style="font-size: 12px;line-height: 19px;"><span>{{
                        sel_value.target.all_muri_value==1? 
                        '在途': sel_value.target.all_muri_value==2? '91-180': '库存'
                        }}</span></div>
                    </div>
                    <div style="text-align: center;">
                      <!-- <i style="width: 15px;height: 4px;display: block; margin-right: 6px;margin-top: 6px;float: left;"></i> -->
                      <span style="font-size: 12px; color: #FF3300;">{{ barData2.value1 }}</span>
                    </div> 
                  </div>
                  <!-- <div></div> -->
                </van-col>
    
                <van-col v-if="sel_value.target.all_muri_value==1 || sel_value.target.all_muri_value==2" span="5">
                  <div>
                    <div style="margin: 0 auto; width: 70px; height: 17px;">
                      <div style="height: 17px;display: block;float: left;margin-left: 0px;">
                        <div style="width: 100%; height: 8px;"></div>
                        <i style="width: 10px;height: 2px;background-color: #F5A028;display: block; margin-right: 6px;"></i>
                      </div>
                      <div style="font-size: 12px;line-height: 19px;"><span>{{
                        sel_value.target.all_muri_value==1? '报检':'181-360' 
                        }}</span></div>
    
                    </div>
                    <div style="text-align: center;">
                      <!-- <i style="width: 15px;height: 4px;display: block; margin-right: 6px;margin-top: 6px;float: left;"></i> -->
                      <span style="font-size: 12px; color: #FF3300;">{{ barData2.value2 }}</span>
                    </div> 
                  </div>
                  <!-- <div></div> -->
                </van-col>
    
                <van-col v-if="sel_value.target.all_muri_value==2" span="5">
                  <div>
                    <div style="margin: 0 auto; width: 70px; height: 17px;">
                      <div style="height: 17px;display: block;float: left;margin-left: 3px;">
                        <div style="width: 100%; height: 8px;"></div>
                        <i style="width: 10px;height: 2px;background-color: #48C728;display: block; margin-right: 6px;"></i>
                      </div>
                      <div style="font-size: 12px;line-height: 19px;"><span>361-720</span></div>
    
                    </div>
                    <div style="text-align: center;">
                      <!-- <i style="width: 15px;height: 4px;display: block; margin-right: 6px;margin-top: 6px;float: left;"></i> -->
                      <span style="font-size: 12px; color: #FF3300;">{{ barData2.value3 }}</span>
                    </div> 
                  </div>
                  <!-- <div></div> -->
                </van-col>
    
                <van-col v-if="sel_value.target.all_muri_value==2" span="5">
                  <div>
                    <div style="margin: 0 auto; width: 70px; height: 17px;">
                      <div style="height: 17px;display: block;float: left;margin-left: 5px;">
                        <div style="width: 100%; height: 8px;"></div>
                        <i style="width: 10px;height: 2px;background-color: #E8294F;display: block; margin-right: 6px;"></i>
                      </div>
                      <div style="font-size: 12px;line-height: 19px;"><span>720+</span></div>
    
                    </div>
                    <div style="text-align: center;">
                      <!-- <i style="width: 15px;height: 4px;display: block; margin-right: 6px;margin-top: 6px;float: left;"></i> -->
                      <span style="font-size: 12px; color: #FF3300;">{{ barData2.value4 }}</span>
                    </div> 
                  </div>
                  <!-- <div></div> -->
                </van-col>
    

    
    
    
              </van-row>
            </i>
            <!-- 图例结束 style="height: 50vw"-->




            <div ref="chart2" :style="canvas_css2" 
              @touchstart="canvas_qiehuan.canvas_toli_kg2 = true"
              @touchend="canvas_qiehuan.canvas_toli_kg2 = false"
              style="padding-bottom: 0px;"
            ></div>
          </section>
        </div>






        <section
          :style="(sel_value.Range_on.Range_set=='2'||sel_value.Range_on.Range_set=='5')? echarts2_css_n : echarts2_css_y"
        >
        <div
            style= "font-size: 12px; padding-top: 5px; padding-bottom: 5px; border-radius: 4px; ;margin-left: 10px;margin-right: 10px;margin-bottom: 0px;"
          >
            项目组达成
          </div>
        </section>

        <div
          class="canvas_bottom"
          style="
            padding-top: 10px;
            background: #ffffff;
            margin-left: 10px;
            margin-right: 10px;
            border-radius: 4px;
          "
        >
        
          <!-- 表格开始 -->

          <section class="px10 py10" :style="(sel_value.Range_on.Range_set=='2'||sel_value.Range_on.Range_set=='5')? echarts2_css_n : echarts2_css_y">
            <ul class="table_all">
              <li class="table_title">
                <ul>
                  <li>项目组</li>
                  <li>{{(sel_value.Range_on.Range_set=='1')?'本期':'实际'}}</li>
                  <li>{{(sel_value.Range_on.Range_set=='1')? '同期':'标杆'}}</li>
                  <li>{{(sel_value.Range_on.Range_set=='4')? '差额':(sel_value.Range_on.Range_set=='1')? '同比':'达成率'}}</li>
                  <!-- <li>同比</li> -->
                </ul>
              </li>

              
              <li
                class="table_content"
                v-for="(val, key) in sel_title_setvalue.quota_value.ProjectGroups"
                :key="key"
              >

                <ul>
                  <li>{{val.TEAM_SUPPLY}}</li>
                  <li>{{
                    (sel_value.Range_on.Range_set=='4')? 
                    ((val.PURE_NEW_PROD_AMT||0)*100).toFixed(2)+'%':
                    fomatMoney(((val.PURE_NEW_PROD_AMT||0)/10000).toFixed(1))+'万'
                    }}</li>
                  <li>{{
                    (sel_value.Range_on.Range_set=='4')? 
                    ((val.TGT_NEW_MTRL_ACT_PRICE||0)*100).toFixed(2)+'%':
                    (val.TGT_NEW_MTRL_ACT_PRICE==0&&sel_value.Range_on.Range_set=='3')?
                    '--'
                    :fomatMoney(((val.TGT_NEW_MTRL_ACT_PRICE||0)/10000).toFixed(1))+'万'
                    }}</li>


                  <li
                  :class="
                    (
                      (sel_value.Range_on.Range_set=='4')? 
                      Number(val.NEW_PROD_AMT_CPML_RTO||0)>=0?'rate-up_salesR':'rate-down_salesR'
                      :
                      (sel_value.Range_on.Range_set=='1')? 
                      Number(val.NEW_PROD_AMT_CPML_RTO||0)>=0?'rate-up_sales':'rate-down_sales'
                      :
                      Number(val.NEW_PROD_AMT_CPML_RTO||0)>=1?'rate-up_sales':'rate-down_sales')"
                  >

                    {{((val.NEW_PROD_AMT_CPML_RTO||0)*100).toFixed(2)+'%'}}
                  
                  </li>


                  <!-- <li
                  :class="

                    (sel_value.Range_on.Range_set=='3')||(sel_value.Range_on.Range_set=='4')? 
                       Number((val.NEW_PROD_AMT_YOY||0)) > 0
                        ? 'rate-up_salesR'
                        : 'rate-down_salesR'                   
                    :
                      Number((val.NEW_PROD_AMT_YOY||0)) > 0
                        ? 'rate-up_sales'
                        : 'rate-down_sales'
                    "
                    style=""
                  >
                    <i  style="font-style: normal;">
                      {{
                        ((val.NEW_PROD_AMT_YOY||0)*100)>999? 
                        (((val.NEW_PROD_AMT_YOY||0)*100)/10000).toFixed(2)+'w%':
                        ((val.NEW_PROD_AMT_YOY||0)*100).toFixed(1)+'%'
                      }}
                    </i>
                  </li> -->
                  

                </ul>
              </li>


              <li style="clear: both;width: 100%;"></li>

              
            </ul>


            <div style="clear: both;width: 100%;height: 10px;"></div>
          </section>
          <!-- 表格结束 -->


          <div style="clear: both"></div>
        </div>
        <!-- 底部canvas结束 -->





        

          <!-- 活动区间趋势开始——开始 -->
          <!-- <section
            :style="(sel_value.Range_on.Range_set=='5')? {'display': 'block'}:{'display': 'none'}"
            style="padding-top: 5px; padding-bottom: 5px; border-radius: 4px; ;margin-left: 10px;margin-right: 10px;margin-bottom: 0px;"
          >
            <div
                class="section-title test_addd"
                style="padding-left: 0px; padding-bottom: 0px"
              >
                活动区间趋势
              </div>
          </section> -->

          <section
            :style="(sel_value.Range_on.Range_set=='5')? {'display': 'block'}:{'display': 'none'}"
            >
            <div
                style= "font-size: 12px; padding-top: 5px; padding-bottom: 5px; border-radius: 4px; ;margin-left: 10px;margin-right: 10px;margin-bottom: 0px;"
              >
                活动区间趋势
              </div>
          </section>



          <section 
          :style="(sel_value.Range_on.Range_set=='5')? {'display': 'block'}:{'display': 'none'}"
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
                  <div style="text-align: right; font-size: 12px;color: #CCCCCC;padding: 4px;padding-right: 0px;">单位：元</div>
                </van-col>
              </van-row>
              <div style="clear: both"></div>
              <!-- 切换优化结束 -->


              <!--  v-if="shop_switch.shop_value_data=='2'" -->
            <div style="padding-left: 10px;padding-right: 10px;padding-top: 10px;"
              :style="(shop_switch.shop_value_data=='2')? {'display': 'block'}:{'display': 'none'}">

              <div ref="chart3" style=" height: 200px;"
              :style="{'width':(canvas_css.width.replace('px', '')*1)+'px'}"
              ></div>

              <div :style="(shop_switch.shop_value_data=='1')? {'display': 'block'}:{'display': 'none'}" >
                <van-empty   description="当前没数据" /></div>
              
            </div>
          </section>
          <!-- 活动区间趋势结束——结束  -->



          <!-- 城市等级变化开始 -->

          <section
            :style="(sel_value.Range_on.Range_set=='5')? {'display': 'block'}:{'display': 'none'}"
            >
            <div
                style= "font-size: 12px; padding-top: 5px; padding-bottom: 5px; border-radius: 4px; ;margin-left: 10px;margin-right: 10px;margin-bottom: 0px;"
              >
                城市等级当月变化
              </div>
          </section>


          <section
            :style="(sel_value.Range_on.Range_set=='5')? {'display': 'block'}:{'display': 'none'}"
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
                    <li style="width: 33.33333%;">客单价(元)</li>
                    <li style="width: 33.33333%;">同比增幅</li>
                    <!-- <li style="width: 33.33333%;">占比</li> -->
                  </ul>
                </li>

                
                <li
                  class="table_content"
                  v-for="(val, key) in sel_title_setvalue.quota_value.city_value"
                  :key="key"
                >
                  <ul>

                    <li style="width: 33.33333%;">{{ nll_undefined(val.GRADE) }}</li>
                    <li style="width: 33.33333%;">{{ nll_undefined(fomatMoney((val.PCT_COMP).toFixed(1))+""||0) }}</li>
                    <li style="width: 33.33333%;"
                      :class="Number(val.PCT_COMP_RATE_PREV)>0? 'rate-up':'rate-down'"
                    >
                      <i style="font-style: normal;">
                        {{ nll_undefined(((val.PCT_COMP_RATE_PREV||0)*100).toFixed(1))+'%'}}
                      </i>
                      
                    </li>
      
                  </ul>
                </li>

      
              
                <li style="clear: both"></li>
            </ul>
            <!-- 具体表格结束 -->

          </section>

          <!-- 城市等级变化结束 -->





        <div style="width: 100%; height: 50px">
          <!-- <p
            style="
              text-align: center;
              margin: 0px;
              font-size: 14px;
              color: #cccccc;
              padding-top: 10px;
            "
          >
            ———— 已经见底了 ————
          </p> -->
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
  thousands,
  generatePromise,
  Information_log,
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
  Icon,
} from "vant";

export default {
  name: "ProductSupply_con",
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
    [Icon.name]:Icon,
    BottomCss:bottom_css
  },
  data() {
    return {

      activeNames_tips:['1'],

      isLoading: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      show: false,

      question_show: false,

      //新加的开始
      barData: {
        value: 0,
        ago_value: 0,
        month: 0,
      },

      barData2: {
        value1: 0,
        value2: 0,
        value3:0,
        value4:0,
        month: 0,
      },

      canvas_qiehuan: {
        canvas_toli_cssy: {
          "padding-top": "0px",
          "background-color": "aliceblue",
          "padding-bottom": "0px",
          // "margin-top": "10px",
        },
        canvas_toli_cssn: {
          "padding-top": "0px",
          "background-color": "#ffffff",
          "padding-bottom": "0px",
          // "margin-top": "10px",
        },
        canvas_toli_kg: false,

        canvas_toli_kg2: false,

        display_cssb: {
          display: "block",
          "padding-left": "10px",
        },
        display_cssn: {
          display: "none",
          "padding-left": "10px",
          "padding-top": "10px",
        },
        yes_css: {
          background: "rgb(89, 178, 178)",

          color: "#ffffff",
        },
        no_css: {
          background: "#E6E6E6",
        },
        left_css: {
          "border-top-left-radius": "4px",
          "border-bottom-left-radius": "4px",
        },
        right_css: {
          "border-top-right-radius": "4px",
          "border-bottom-right-radius": "4px",
        },
      },
      //新加的接受

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

      canvas_css: {
        width: "",
        // height: "250px",
        height: "200px",
      },
      canvas_css2: {
        width: "",
        // height: "252px",
        height: "230px",
      },

      click_css_set: { type: "info", color: "rgba(89, 178, 178, 1)" },
      click_css_no: { type: "default", color: "" },
      click_css_no_grey: { type: "default", color: "#CCCCCC" },
      click_css_hxzb_y: {
        width: "32%",
        float: "left",
        // color: "#FFFFFF",
        color: "#000000",
        // "border-top": "2px solid rgba(89, 178, 178, 1)",
        // "background-color": "#1678ff",
        // "background-color": "#1196EE",
        // "background-color": "#159B80",
        "border": "1px solid rgb(35, 176, 168)",

        "padding-bottom": "5px",
        "border-radius": "4px",
        "margin-right": "1.5%",
      },

      click_css_hxzb_n: {
        width: "32%",
        float: "left",
        // "border-top": "2px solid #dddddd",
        "background-color": "#F7F7F7",
        "border-radius": "4px",
        "padding-bottom": "5px",
        "margin-right": "1.5%",
        "border": "1px solid #F7F7F7",
      },

      sum_zhibiao: {
        title: {
          width: "100%",
          // "font-weight": "bold",
          "font-size": "12px",
          display: "block",
          "padding-left": "3px",
          "padding-top": "5px",
        },
        zhognxin: {
          width: "100%",
          "font-size": "14px",
          display: "block",
          "padding-left": "3px",
          "padding-top": "2px",
          height: "21px",
          "line-height": "20px"
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
        erji_text_wenzi: "二级类目产值",
      },

      echarts2_css_y: {
        "padding-top": "0px",
        "padding-bottom": "0px",
        display: "block",
        // width: '300px',
        // height:'188px'
      },
      echarts2_css_n: {
        "padding-top": "0px",
        "padding-bottom": "0px",
        display: "none",
        // width: '300px',
        // height:'188px'
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
          pinzhi: false,
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



      sel_title_setvalue: {
        // chanzhi_wenzi: {
        //   title_all: "实时业绩",
        //   title_content: {
        //     content1: "",
        //     content2: "",
        //     content3: "",
        //     content4: "",
        //     content5: "",
        //     content6: "",
        //   },
        // },

        quota_value: {
          cont1: 0,
          cont2: 0,
          cont3: 0,
          cont4: 0,
          cont5: 0,
          cont6: 0,
          cont7: 0,
          cont8: 0,
          cont9: 0,
          ProjectGroups:[],  
          city_value:[],  
          // shop_source_value:[],
          // goods_top10_value:[],
        }, //六大指标的

      },

      // 关于店铺的切换样式开始
      shop_switch:{
        shop_value:{
          value_set:""
        },

        shop_value_data:"",
        shop_css:{
          set_on:{
            "border-radius": "4px",
            // "background": "rgb(22, 120, 255)",
            // "background": "#159B80",
            "background": "#23B0A8",
          
            "color": "rgb(255, 255, 255)",
            // "padding": "5px",
          },
          set_off:{
            "border-radius": "4px",
            // "background": "rgb(230, 230, 230)",
            "background": "rgb(247, 247, 247)",
            
            // "color": "rgb(255, 255, 255)",
            // "padding": "5px",
          }

        },


      },
      // 关于店铺的切换样式结束


      data_load_time:"",


      data:{
        // 核心指标
        "pds_kpi-kpi_fields": "",
        // 售后==品质
        "pds_afs-diff_afs_bad_rto": "",
        "pds_afs-tgt_afs_bad_rto": "",
        "pds_afs-afs_bad_rto_yoy": "",
        "pds_afs-factory_bad_rto": "",
        "pds_afs-afs_bad_rto": "",
        "pds_afs-lgs_bad_rto": "",
        "pds_afs-pds_afs_tot": "",

        "pds_afs-mons_afs_rto": "",
        "pds_afs-spl_afs_rto": "",


        //库存
        "pds_inv-spl_inv_amt": "",
        "pds_inv-rem_inv_lvl": "",
        "pds_inv-intrns_amt": "",
        "pds_inv-tot_inv_amt": "",
        "pds_inv-tot_inv_amt_yoy": "",
        "pds_inv-max_tot_inv_amt": "",
        "pds_inv-diff_tot_inv_amt": "",
        "pds_inv-linsy_inv_amt": "",
        "pds_inv-mons_inv_amt": "",

        // 新品
        "pds_new_prod-new_prod_amt_yoy": "",
        "pds_new_prod-tgt_act_price": "",
        "pds_new_prod-pure_new_prod_amt": "",
        "pds_new_prod-lvlup_act_price": "",
        "pds_new_prod-pure_new_act_price": "",
        "pds_new_prod-new_prod_amt_cpml_rto": "",
        "pds_new_prod-new_prod_tot_amt": "",
        "pds_new_prod-new_prod_amt_days": "",
        "pds_new_prod-spl_new_prod": "",

        // 新加的 新品改未sku
        "pds_dlvr-sku_avg_amt": "",
        "pds_dlvr-sku_avg_amt_mons": "",
        "pds_dlvr-sku_avg_amt_spl": "",
        // 新加的 新品改未sku

        "FS_YY_KD-PCT_CITY_M":"",
        "FS_YY_KD-PCT_SHOP_ACT_M":"",
        "FS_YY_KD-PCT_CANAL_M":"",

        


        //欠货
        "pds_shrt-shrt_days": "",
        "pds_shrt-shrt_spl": "",
        
      },
      data_loay:false,
      echarts_clear:false


    };
  },

  computed: {
    ...mapState("user", ["permissionList"]), //大概的意思是获取权限
  },

  created() {
    this.canvas_css.width = window.innerWidth - 20-20 + "px";
    this.canvas_css2.width = window.innerWidth - 20-20 + "px";

    console.log(this.canvas_css2.width);


    this.$EventBus.$emit("data_loay_set", {
      data_loay_seton: false,
    });

    const [p1, resolve1] = generatePromise();
    const [p2, resolve2]= generatePromise();
    // const [p3, resolve3]= generatePromise();
    // const [p4, resolve4]= generatePromise();
    // this.p1 = p1;
    this.p1= Promise.all([p1,p2]);
    const apiMap = {
      // 市场运营_客单价
      "SQL-FS_YY_KD-PCT_CITY_M":{ resultProp: "PCT_CITY_M" },
      "SQL-pds_kpi-kpi_fields": { resultProp: "kpi_fields" },
      // "SQL-FS_YY_KD-PCT_SHOP_ACT_M":{ resultProp: "PCT_SHOP_ACT_M" },
      // "SQL-FS_YY_KD-PCT_CANAL_M":{ resultProp: "PCT_CANAL_M" },
      "SQL-FS_YY_KD-PCT_SHOP_ACT_M":{ type: Array, resolve2: resolve2 },
      "SQL-FS_YY_KD-PCT_CANAL_M":{ type: Array, resolve: resolve1 },
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
                this.$EventBus.$emit("Swiper_content_fsupply", {
                  data_loay: true,
                });
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



    // console.log(resolve1);

    // console.log(decimal2Percent);
    console.log(calcSignClass);
  },

  mounted() {
    // 新加的开始
    // this.Single_canvas("1");
    this.Single_choice("canvas_yes", "", true, "_this.sel_value.canvas_on");
    // 新加的结束

    this.$EventBus.$on("prosupply_choice_f", (Range_value_set) => {

      this.sel_value.Range_on.Range_set = Range_value_set.Range_value_set;
      // this.change_text(Range_value_set.Range_value_set);
      let set_value = "";

      console.log("运行到子组件")
      console.log(Range_value_set.Range_value_set);

      switch (Range_value_set.Range_value_set) {

        case "5":
          // 客单价
          set_value = "kedanjia";
          this.Single_choice(set_value, ['_this.change_text(\''+Range_value_set.Range_value_set+'\')','_this.data_screen_quota()','_this.initChart()'], true, '_this.sel_value.theme');
          this.Single_choice('value_set',['_this.initChart3()'],1,'_this.shop_switch.shop_value')
          Information_log('产品供应-客单价','产品供应-客单价:  '+'数据加载完成');
          this.echarts_clear=true;
          break;
   
      }

      // console.log("父类传值过来的！！！！")
    });

    this.sel_value.Range_on.Range_set = '5';
    this.Single_choice('cpcy', ['_this.change_text(\''+'5'+'\')'], true, '_this.sel_value.theme');
    this.Single_choice('value_set',['_this.initChart3()'],1,'_this.shop_switch.shop_value')
    this.data_screen_quota();



    this.initChart();
    // this.initChart2();
    this.initChart3();


    // Information_log('产品供应-SKU均值','产品供应-SKU均值:  '+'数据加载完成');
    // this.data_load_time=(this.data["pds_kpi-kpi_fields"][0].LOAD_TIME).substring(0,11);

    this.p1.then(() => {
      try{
        this.data_load_time=(typeof(this.data["pds_kpi-kpi_fields"])!='undefined'&&typeof(this.data["pds_kpi-kpi_fields"][0])!='undefined')?  
          // (this.data["pds_kpi-kpi_fields"][0].LOAD_TIME).substring(0,11):0; 
          (this.data["pds_kpi-kpi_fields"][0].LOAD_TIME).substring(0,4)+'.'
          +(this.data["pds_kpi-kpi_fields"][0].LOAD_TIME).substring(5,7)+'.'
          +(this.data["pds_kpi-kpi_fields"][0].LOAD_TIME).substring(8,10)
          :0;       
          
      }catch(error){ 
        console.log("========错误捕捉信息==========")
        // console.log(error)
        console.error(error);
        // this.info_error+=1;
        Information_log('产品供应-USK均值','运行到产品供应-更新时间:  '+error.toString());
      } 
    
    });


  },

  methods: {


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
      let apiMap3 = {
        // 市场运营_客单价
        "SQL-FS_YY_KD-PCT_CITY_M":{ resultProp: "PCT_CITY_M" },
        "SQL-pds_kpi-kpi_fields": { resultProp: "kpi_fields" },
        "SQL-FS_YY_KD-PCT_SHOP_ACT_M":{ resultProp: "PCT_SHOP_ACT_M" },
        "SQL-FS_YY_KD-PCT_CANAL_M":{ resultProp: "PCT_CANAL_M" },
      };
      this.ajax_data(apiMap3); 

      this.p1.then(() => {
        this.isLoading = false;
        this.data_screen_quota();
        this.initChart();
        this.initChart3();
      });
    },

    showPopup_sm(){
      this.question_show=true;
    },

    showPopup_close(){
      this.activeNames_tips=[];
    },



    change_text(value) {
      switch (value) {
        case "1":
          // this.sel_title.chanzhi_wenzi.title_all = "新品总业绩";
          this.sel_title.chanzhi_wenzi.title_all = "汇总";
          // this.sel_title.chanzhi_wenzi.title_muban = "纯新";
          this.sel_title.chanzhi_wenzi.title_muban = "非停产";
          // this.sel_title.chanzhi_wenzi.title_ruanti = "旧品升级";
           this.sel_title.chanzhi_wenzi.title_ruanti = "停产";
          this.sel_title.chanzhi_wenzi.target = "标杆";
          // this.sel_title.chanzhi_wenzi.reach_rate = "达成";
          this.sel_title.chanzhi_wenzi.reach_rate = "同期";
          this.sel_title.chanzhi_wenzi.ago_rate = "同比";
          break;
        case "2":        
          this.sel_title.chanzhi_wenzi.title_all = "总库存";
          this.sel_title.chanzhi_wenzi.title_muban = "林氏仓库存";
          this.sel_title.chanzhi_wenzi.title_ruanti = "供方仓库存";
          this.sel_title.chanzhi_wenzi.target = "峰值";
          // this.sel_title.chanzhi_wenzi.reach_rate = "差额";
          this.sel_title.chanzhi_wenzi.reach_rate = "库容";
          this.sel_title.chanzhi_wenzi.ago_rate = "同比";
          break;
        case "3":            
          // this.sel_title.chanzhi_wenzi.title_all = "订单欠货";
          // this.sel_title.chanzhi_wenzi.title_muban = "商品欠货";
          // this.sel_title.chanzhi_wenzi.title_ruanti = "日均商品欠货";
          this.sel_title.chanzhi_wenzi.title_all = "日均订单欠货";
          this.sel_title.chanzhi_wenzi.title_muban = "日均商品欠货";
          this.sel_title.chanzhi_wenzi.title_ruanti = "商品欠货";

          this.sel_title.chanzhi_wenzi.target = "标杆";
          // this.sel_title.chanzhi_wenzi.reach_rate = "差额";
          this.sel_title.chanzhi_wenzi.reach_rate = "标杆";
          this.sel_title.chanzhi_wenzi.ago_rate = "差额";
          break;

        case "4":            
          this.sel_title.chanzhi_wenzi.title_all = "售后不良率";
          this.sel_title.chanzhi_wenzi.title_muban = "工厂不良率";
          this.sel_title.chanzhi_wenzi.title_ruanti = "物流三包不良率";
          this.sel_title.chanzhi_wenzi.target = "标杆";
          // this.sel_title.chanzhi_wenzi.reach_rate = "差额";
          this.sel_title.chanzhi_wenzi.reach_rate = "标杆";
          this.sel_title.chanzhi_wenzi.ago_rate = "差额";
          break;

        case "5":            
          this.sel_title.chanzhi_wenzi.title_all = "集团";
          this.sel_title.chanzhi_wenzi.title_muban = "线上";
          this.sel_title.chanzhi_wenzi.title_ruanti = "线下";
          this.sel_title.chanzhi_wenzi.target = "标杆";
          // this.sel_title.chanzhi_wenzi.reach_rate = "差额";
          // this.sel_title.chanzhi_wenzi.reach_rate = "标杆";
          this.sel_title.chanzhi_wenzi.reach_rate = "同期";
          this.sel_title.chanzhi_wenzi.ago_rate = "同比";
          break;


      }

      this.Single_choice('day_1', '', true, '_this.sel_value.day_set');
      this.Single_choice('all_muri_value', '', 1, '_this.sel_value.target')


    },

    data_screen_quota(){

      console.log("======产供！ 数据配对======");
      this.p1.then(() => {



        let data ="";
        // console.log(data);  this.data_screen(this.data)
        let data_project="";
        // let year_now = new Date();
        // year_now = year_now.getFullYear();

        
        this.sel_title_setvalue.quota_value.cont1=0;
        this.sel_title_setvalue.quota_value.cont2=0;
        this.sel_title_setvalue.quota_value.cont3=0;
        this.sel_title_setvalue.quota_value.cont4=0;
        this.sel_title_setvalue.quota_value.cont5=0;
        this.sel_title_setvalue.quota_value.cont6=0;
        this.sel_title_setvalue.quota_value.cont7=0;
        this.sel_title_setvalue.quota_value.cont8=0;
        this.sel_title_setvalue.quota_value.cont9=0;

        // 关于时间T+1的设置开始
        let date_kdj=new Date();
        date_kdj=date_kdj.getTime()-(24*60*60*1000);
        date_kdj=new Date(date_kdj);
        // 关于时间T+1的设置结束



        if(this.sel_value.Range_on.Range_set=='1'){

          try{

            // console.log(this.sel_value.Range_on.Range_set);
            // data=this.data["pds_new_prod-new_prod_tot_amt"][0];

            data=this.data["pds_dlvr-sku_avg_amt"][0];

            console.log("============主题1=================")
            // console.log(data);


            // this.sel_title_setvalue.quota_value.cont1=data.PURE_NEW_PROD_AMT;
            this.sel_title_setvalue.quota_value.cont1=data.SKU_AVG_AMT;
            // this.sel_title_setvalue.quota_value.cont1=undefined;
            // console.log(data.PURE_NEW_PROD_AMT_aa)
            // this.sel_title_setvalue.quota_value.cont2=(data.PURE_NEW_PROD_AMT/data.TGT_NEW_MTRL_ACT_PRICE)||0;
            this.sel_title_setvalue.quota_value.cont2=data.SKU_AVG_AMT_AGO||0;
            // this.sel_title_setvalue.quota_value.cont3=data.NEW_PROD_AMT_YOY;
            this.sel_title_setvalue.quota_value.cont3=data.SKU_AVG_AMT_YOY||0;
            


            // this.sel_title_setvalue.quota_value.cont4=data.PURE_NEW_ACT_PRICE;
            this.sel_title_setvalue.quota_value.cont4=data.UNSTOP_SKU_AVG_AMT;
            this.sel_title_setvalue.quota_value.cont5=data.UNSTOP_SKU_AVG_AMT_AGO||0;
            // this.sel_title_setvalue.quota_value.cont6=data.PURE_NEW_ACT_PRICE_YOY;
            this.sel_title_setvalue.quota_value.cont6=data.UNSTOP_SKU_AVG_AMT_YOY||0;



            // this.sel_title_setvalue.quota_value.cont7=data.LVLUP_ACT_PRICE;
            this.sel_title_setvalue.quota_value.cont7=data.STOP_SKU_AVG_AMT||0;
            this.sel_title_setvalue.quota_value.cont8=data.STOP_SKU_AVG_AMT_AGO||0;
            // this.sel_title_setvalue.quota_value.cont9=data.LVLUP_ACT_PRICE_YOY;
            this.sel_title_setvalue.quota_value.cont9=data.STOP_SKU_AVG_AMT_YOY||0;



  
            // data_project=this.data["pds_new_prod-spl_new_prod"]
            data_project=this.data["pds_dlvr-sku_avg_amt_spl"] 

            // console.log(data_project);

            if(this.sel_value.target.all_muri_value==1){
              Object.keys(data_project).forEach((key_index_value) => { 
                data_project[key_index_value].PURE_NEW_PROD_AMT=data_project[key_index_value].SKU_AVG_AMT;
                data_project[key_index_value].TGT_NEW_MTRL_ACT_PRICE=data_project[key_index_value].SKU_AVG_AMT_AGO;
                data_project[key_index_value].NEW_PROD_AMT_CPML_RTO=data_project[key_index_value].SKU_AVG_AMT_YOY;
              });
            }else if(this.sel_value.target.all_muri_value==2){
              Object.keys(data_project).forEach((key_index_value) => { 
                data_project[key_index_value].PURE_NEW_PROD_AMT=data_project[key_index_value].UNSTOP_SKU_AVG_AMT;
                data_project[key_index_value].TGT_NEW_MTRL_ACT_PRICE=data_project[key_index_value].UNSTOP_SKU_AVG_AMT_AGO;
                data_project[key_index_value].NEW_PROD_AMT_CPML_RTO=data_project[key_index_value].UNSTOP_SKU_AVG_AMT_YOY;
              });
            }else if(this.sel_value.target.all_muri_value==3){
              Object.keys(data_project).forEach((key_index_value) => { 
                data_project[key_index_value].PURE_NEW_PROD_AMT=data_project[key_index_value].STOP_SKU_AVG_AMT;
                data_project[key_index_value].TGT_NEW_MTRL_ACT_PRICE=data_project[key_index_value].STOP_SKU_AVG_AMT_AGO;
                data_project[key_index_value].NEW_PROD_AMT_CPML_RTO=data_project[key_index_value].STOP_SKU_AVG_AMT_YOY;
              });
            }



            data_project = data_project.sort((a, b) => {
              let value_sort = "";
              let a_time = a["PURE_NEW_PROD_AMT"];
              let b_time = b["PURE_NEW_PROD_AMT"];
              value_sort =  Number(b_time) - Number(a_time);
    
              return value_sort;
            });
            this.sel_title_setvalue.quota_value.ProjectGroups=data_project;

            // console.log(data_project);

          }catch(error){ 
            console.log("========错误捕捉信息==========")
            // console.log(error)
            console.error(error);
            // this.info_error+=1;
            Information_log('产品供应-SUK均值','产品供应-SUK均值-核心指标:  '+error.toString());
          } 


        }else if(this.sel_value.Range_on.Range_set=='2'){

          try{

            // console.log("数据处理！！！！");
            // console.log(this.data);
            data=this.data["pds_kpi-kpi_fields"][0];

            this.sel_title_setvalue.quota_value.cont1=data.TOT_INV_AMT;
            // this.sel_title_setvalue.quota_value.cont2=data.TOT_INV_AMT_DIFF;
            this.sel_title_setvalue.quota_value.cont2=data.MAX_TOT_INV_AMT;
            this.sel_title_setvalue.quota_value.cont3=data.TOT_INV_AMT_YOY;

            this.sel_title_setvalue.quota_value.cont4=data.LINSY_INV_AMT;
            // this.sel_title_setvalue.quota_value.cont5=data.LINSY_INV_AMT_DIFF;
            this.sel_title_setvalue.quota_value.cont5=data.MAX_LINSY_INV_AMT;
            this.sel_title_setvalue.quota_value.cont6=data.LINSY_INV_AMT_YOY;

            this.sel_title_setvalue.quota_value.cont7=data.SPL_INV_AMT;
            // this.sel_title_setvalue.quota_value.cont8=data.SPL_INV_AMT_DIFF;
            this.sel_title_setvalue.quota_value.cont8=data.MAX_SPL_INV_AMT;
            this.sel_title_setvalue.quota_value.cont9=data.SPL_INV_AMT_YOY;
            // console.log(this.sel_title_setvalue.quota_value.cont1);
            
          }catch(error){ 
            console.log("========错误捕捉信息==========")
            // console.log(error)
            console.error(error);
            // this.info_error+=1;
            Information_log('产品供应-库存','产品供应-库存-核心指标:  '+error.toString());
          } 


        }else if(this.sel_value.Range_on.Range_set=='3'){

          try{

            data=this.data["pds_kpi-kpi_fields"][0];

            // 日均订单欠货
            // this.sel_title_setvalue.quota_value.cont1=data.SHRT_ODR_AMT;
            // // this.sel_title_setvalue.quota_value.cont2=data.SHRT_ODR_AMT_DIFF;  data.TGT_ODR_AMT
            // this.sel_title_setvalue.quota_value.cont2=0;
            // // this.sel_title_setvalue.quota_value.cont3=data.SHRT_ODR_AMT_YOY;
            // this.sel_title_setvalue.quota_value.cont3=data.SHRT_ODR_AMT_DIFF;

            this.sel_title_setvalue.quota_value.cont1=data.SHRT_MAVG_ODR_AMT;
            this.sel_title_setvalue.quota_value.cont2=data.TGT_AVG_EXORDER_AMT;
            this.sel_title_setvalue.quota_value.cont3=data.SHRT_MAVG_ODR_AMT_DIFF;

            // 日均商品欠货
            this.sel_title_setvalue.quota_value.cont4=data.SHRT_MAVG_ACT_AMT;
            // this.sel_title_setvalue.quota_value.cont8=data.SHRT_MAVG_ACT_AMT_DIFF;
            this.sel_title_setvalue.quota_value.cont5=data.SHRT_MAVG_ACT_AMT-data.SHRT_MAVG_ACT_AMT_DIFF;
            // this.sel_title_setvalue.quota_value.cont9=data.SHRT_MAVG_ACT_AMT_YOY;
            this.sel_title_setvalue.quota_value.cont6=data.SHRT_MAVG_ACT_AMT_DIFF;

            
            // 商品欠货
            this.sel_title_setvalue.quota_value.cont7=data.SHRT_ACT_AMT;
            // this.sel_title_setvalue.quota_value.cont5=data.SHRT_ACT_AMT_DIFF;  data.TGT_ACT_AMT
            this.sel_title_setvalue.quota_value.cont8=0;
            // this.sel_title_setvalue.quota_value.cont6=data.SHRT_ACT_AMT_YOY;
            this.sel_title_setvalue.quota_value.cont9=data.SHRT_ACT_AMT_DIFF;

            // console.log(this.sel_value.Range_on.Range_set);
            // console.log(this.sel_title_setvalue.quota_value.cont1);
            data_project=this.data["pds_shrt-shrt_spl"];

            Object.keys(data_project).forEach((key_index_value) => {
              data_project[key_index_value].PURE_NEW_PROD_AMT=data_project[key_index_value].PROD_SHRT_MAVG_PUR_AMT;
              data_project[key_index_value].TGT_NEW_MTRL_ACT_PRICE=data_project[key_index_value].PROD_SHRT_PUR_AMT_TGT;
              data_project[key_index_value].NEW_PROD_AMT_CPML_RTO=data_project[key_index_value].PROD_SHRT_MAVG_PUR_CMPL_RTO;
              data_project[key_index_value].NEW_PROD_AMT_YOY=data_project[key_index_value].PROD_SHRT_MAVG_PUR_AMT_YOY;

            });
            data_project = data_project.sort((a, b) => {
              let value_sort = "";
              let a_time = a["PURE_NEW_PROD_AMT"];
              let b_time = b["PURE_NEW_PROD_AMT"];
              value_sort =  Number(b_time) - Number(a_time);
    
              return value_sort;
            });
            this.sel_title_setvalue.quota_value.ProjectGroups=data_project;

          }catch(error){ 
            console.log("========错误捕捉信息==========")
            // console.log(error)
            console.error(error);
            // this.info_error+=1;
            Information_log('产品供应-欠货','产品供应-欠货-核心指标:  '+error.toString());
          } 


        }else if(this.sel_value.Range_on.Range_set=='4'){

          try{

            data=this.data["pds_afs-pds_afs_tot"][0];
            this.sel_title_setvalue.quota_value.cont1=data.AFS_RTO;
            // this.sel_title_setvalue.quota_value.cont2=data.AFS_RTO_DIFF;
            this.sel_title_setvalue.quota_value.cont2=data.WG_TGT;
            // this.sel_title_setvalue.quota_value.cont3=data.AFS_RTO_YOY;
            this.sel_title_setvalue.quota_value.cont3=data.AFS_RTO_DIFF;

            this.sel_title_setvalue.quota_value.cont4=data.FAC_AFS_RTO;
            this.sel_title_setvalue.quota_value.cont5=0;
            // this.sel_title_setvalue.quota_value.cont6=data.FAC_AFS_RTO_YOY;
            this.sel_title_setvalue.quota_value.cont6=0;

            this.sel_title_setvalue.quota_value.cont7=data.LGS_AFS_RTO;
            this.sel_title_setvalue.quota_value.cont8=0;
            // this.sel_title_setvalue.quota_value.cont9=data.LGS_AFS_RTO_YOY;
            this.sel_title_setvalue.quota_value.cont9=0;

            // console.log(data);
            data_project=this.data["pds_afs-spl_afs_rto"];
            // let data_project_new=[];

            Object.keys(data_project).forEach((key_index_value) => {
              data_project[key_index_value].PURE_NEW_PROD_AMT=data_project[key_index_value].AFS_RTO;
              data_project[key_index_value].TGT_NEW_MTRL_ACT_PRICE= data_project[key_index_value].WG_TGT;
              data_project[key_index_value].NEW_PROD_AMT_CPML_RTO=data_project[key_index_value].AFS_RTO_DIFF;
              data_project[key_index_value].NEW_PROD_AMT_YOY=data_project[key_index_value].AFS_RTO_YOY;

              // if(data_project[key_index_value].MDATE.substring(0,7)==(year_now+'-10')){
              //   data_project_new.push(data_project[key_index_value]); 
              // }

            });

            data_project = data_project.sort((a, b) => {
              let value_sort = "";
              let a_time = a["PURE_NEW_PROD_AMT"];
              let b_time = b["PURE_NEW_PROD_AMT"];
              value_sort =  Number(b_time) - Number(a_time);
    
              return value_sort;
            });
            this.sel_title_setvalue.quota_value.ProjectGroups=data_project;

          }catch(error){ 
            console.log("========错误捕捉信息==========")
            // console.log(error)
            console.error(error);
            // this.info_error+=1;
            Information_log('产品供应-品质','产品供应-品质-核心指标:  '+error.toString());
          } 



        }else if(this.sel_value.Range_on.Range_set=='5'){

          // console.log("======运行到客单价！！！！======");

          try{

            this.set_time=date_kdj.getFullYear()+'-'+(((date_kdj.getMonth()+1)>9)?(date_kdj.getMonth()+1):'0'+(date_kdj.getMonth()+1))+'-01';
            // console.log(this.set_time);
            // console.log(date_kdj.getFullYear()+'-'+(date_kdj.getMonth()+1)+'-'+date_kdj.getDate());
            
            data=this.data;

            // console.log(data["FS_YY_KD-PCT_CANAL_M"]);
            
            Object.keys(data["FS_YY_KD-PCT_CANAL_M"]).forEach((key_value) => {


              if(data["FS_YY_KD-PCT_CANAL_M"][key_value].MDATE.substring(0, 10)==this.set_time){

                this.sel_title_setvalue.quota_value.cont1=((data["FS_YY_KD-PCT_CANAL_M"][key_value].COMPANY_PCT||0)).toFixed(2)+'';
                this.sel_title_setvalue.quota_value.cont2=((data["FS_YY_KD-PCT_CANAL_M"][key_value].COMPANY_PCT_PREV||0)).toFixed(2)+'';
                this.sel_title_setvalue.quota_value.cont3=((data["FS_YY_KD-PCT_CANAL_M"][key_value].COMPANY_GROWTH_RATE_PREV||0));

                this.sel_title_setvalue.quota_value.cont4=((data["FS_YY_KD-PCT_CANAL_M"][key_value].ON_LINE_PCT||0)).toFixed(2)+'';
                this.sel_title_setvalue.quota_value.cont5=((data["FS_YY_KD-PCT_CANAL_M"][key_value].ON_LINE_PCT_PREV||0)).toFixed(2)+'';
                this.sel_title_setvalue.quota_value.cont6=((data["FS_YY_KD-PCT_CANAL_M"][key_value].ON_LINE_GROWTH_RATE_PREV||0));

                this.sel_title_setvalue.quota_value.cont7=((data["FS_YY_KD-PCT_CANAL_M"][key_value].OFF_LINE_PCT||0)).toFixed(2)+'';
                this.sel_title_setvalue.quota_value.cont8=((data["FS_YY_KD-PCT_CANAL_M"][key_value].OFF_LINE_PCT_PREV||0)).toFixed(2)+'';
                this.sel_title_setvalue.quota_value.cont9=((data["FS_YY_KD-PCT_CANAL_M"][key_value].OFF_LINE_GROWTH_RATE_PREV||0));

              }

            });


            data["FS_YY_KD-PCT_CITY_M"].sort((a, b) => {
              let a_time = "";
              let b_time = "";
              a_time = a["GRADE_ASC"];
              b_time = b["GRADE_ASC"];
              
              return a_time - b_time;
            });

            this.sel_title_setvalue.quota_value.city_value=[];
            Object.keys(data["FS_YY_KD-PCT_CITY_M"]).forEach((key_value_city) => {

              if(data["FS_YY_KD-PCT_CITY_M"][key_value_city].TDATE.substring(0, 7)==this.set_time.substring(0,7)){

                this.sel_title_setvalue.quota_value.city_value.push(data["FS_YY_KD-PCT_CITY_M"][key_value_city]);

              }

            });

            
          }catch(error){ 
            console.log("========错误捕捉信息==========")
            // console.log(error)
            console.error(error);
            // this.info_error+=1;
            Information_log('产品供应-客单价','产品供应-客单价-核心指标:  '+error.toString());
          } 



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
          theme_value_name = "pds_new_prod";
        } else if (this.sel_value.Range_on.Range_set == "2") {
          theme_value_name = "pds_inv";
        } else if (this.sel_value.Range_on.Range_set == "3") {
          theme_value_name = "pds_shrt";
        } else if(this.sel_value.Range_on.Range_set == "4") {
          theme_value_name = "pds_afs";
        }
      }



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



    showPopup() {
      this.show = true;
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
    },

    time_cancel() {
      this.show = false;
    },



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

    initChart() {
      this.chartIns = echarts.init(this.$refs["chart"]);


        // 关于时间T+1的设置开始
        // let date_kdj=new Date();
        // date_kdj=date_kdj.getTime()-(24*60*60*1000);
        // date_kdj=new Date(date_kdj);
        // 关于时间T+1的设置结束

      let _time_now=new Date();
      // _time_now=_time_now.getTime()-(24*60*60*1000);
      if(_time_now.getHours()<9){
        console.log("T+2");
        _time_now=_time_now.getTime()-(24*60*60*1000*(2));
      }else{
        console.log("T+1");
        _time_now=_time_now.getTime()-(24*60*60*1000);
      }  
      _time_now=new Date(_time_now);

      let year_now = _time_now;
      year_now = year_now.getFullYear();


      let _this=this;

      this.p1.then(() => {

        try{
          
          if(this.echarts_clear==true){
            this.chartIns.clear();
            this.echarts_clear=false;
          }


          // console.log("asdad");
          let hour_data = [];
          let sale_amt = [];
          let ago_amt = [];
          let user_data = [];
          let year_date=[];

          if(this.sel_value.Range_on.Range_set == "1"){


            // user_data = this.data["pds_new_prod-new_prod_amt_days"];

            user_data = this.data["pds_dlvr-sku_avg_amt_mons"];

            // console.log("==============SKU均值=======================");
            // console.log(user_data);
            // console.log(user_data[0].MDATE.substring(0,4));

            


            user_data = user_data.sort((a, b) => {
              let value_sort = "";
              let a_time = new Date(a["MDATE"]).getTime(new Date(a["MDATE"]));
              let b_time = new Date(b["MDATE"]).getTime(new Date(b["MDATE"]));
              value_sort = Number(a_time) - Number(b_time);
    
              return value_sort;
            });

            Object.keys(user_data).forEach((key_value_chart) => {

              if(this.sel_value.target.all_muri_value==1&&user_data[key_value_chart].MDATE.substring(0,4)==(year_now-1)+''){
                hour_data.push((user_data[key_value_chart].MDATE.substring(5, 7)*1+'月'));
                ago_amt.push((user_data[key_value_chart].SKU_AVG_AMT/10000).toFixed(1)*1);
              }else if(this.sel_value.target.all_muri_value==2&&user_data[key_value_chart].MDATE.substring(0,4)==(year_now-1)+''){
                hour_data.push((user_data[key_value_chart].MDATE.substring(5, 7)*1+'月'));
                ago_amt.push((user_data[key_value_chart].UNSTOP_SKU_AVG_AMT/10000).toFixed(1)*1);
              }else if(this.sel_value.target.all_muri_value==3&&user_data[key_value_chart].MDATE.substring(0,4)==(year_now-1)+''){
                hour_data.push((user_data[key_value_chart].MDATE.substring(5, 7)*1+'月'));
                ago_amt.push((user_data[key_value_chart].STOP_SKU_AVG_AMT/10000).toFixed(1)*1);
              }

              if(this.sel_value.target.all_muri_value==1&&user_data[key_value_chart].MDATE.substring(0,4)==year_now){
                sale_amt.push((user_data[key_value_chart].SKU_AVG_AMT/10000).toFixed(1)*1);
                // ago_amt.push((user_data[key_value_chart].SKU_AVG_AMT_AGO/10000).toFixed(2)*1);
              }else if(this.sel_value.target.all_muri_value==2&&user_data[key_value_chart].MDATE.substring(0,4)==year_now){
                
                sale_amt.push((user_data[key_value_chart].UNSTOP_SKU_AVG_AMT/10000).toFixed(1)*1);
                // ago_amt.push((user_data[key_value_chart].UNSTOP_SKU_AVG_AMT_AGO/10000).toFixed(2)*1);
                // hour_data.push((user_data[key_value_chart].MDATE.substring(5, 7)*1+'月'));

              }else if(this.sel_value.target.all_muri_value==3&&user_data[key_value_chart].MDATE.substring(0,4)==year_now){
                
                sale_amt.push((user_data[key_value_chart].STOP_SKU_AVG_AMT/10000).toFixed(1)*1);
                // ago_amt.push((user_data[key_value_chart].STOP_SKU_AVG_AMT_AGO/10000).toFixed(2)*1);
                // hour_data.push((user_data[key_value_chart].TDATE.substring(5, 7)*1+'月'));

              }

            });

            // console.log(hour_data);
            // console.log(sale_amt);
            // console.log(ago_amt);



          }else if(this.sel_value.Range_on.Range_set == "2"){
            user_data = this.data["pds_inv-mons_inv_amt"];

            user_data = user_data.sort((a, b) => {
              let value_sort = "";
              let a_time = new Date(a["MDATE"]).getTime(new Date(a["MDATE"]));
              let b_time = new Date(b["MDATE"]).getTime(new Date(b["MDATE"]));
              value_sort = Number(a_time) - Number(b_time);
              
              return value_sort;
            });

            Object.keys(user_data).forEach((key_value_chart) => {
              if(this.sel_value.target.all_muri_value==1){

                if(user_data[key_value_chart].MDATE.substring(0,4)*1==year_now){
                  sale_amt.push((user_data[key_value_chart].TOT_INV_AMT/10000/10000).toFixed(2)*1);
                }else if(user_data[key_value_chart].MDATE.substring(0,4)*1==(year_now-1)){
                  ago_amt.push((user_data[key_value_chart].TOT_INV_AMT/10000/10000).toFixed(2)*1);
                  hour_data.push((user_data[key_value_chart].MDATE.substring(5, 7)*1+'月'));
                }

              }else if(this.sel_value.target.all_muri_value==2){

                if(user_data[key_value_chart].MDATE.substring(0,4)*1==year_now){
                  sale_amt.push((user_data[key_value_chart].LINSY_INV_AMT/10000/10000).toFixed(2)*1);
                }else if(user_data[key_value_chart].MDATE.substring(0,4)*1==(year_now-1)){
                  ago_amt.push((user_data[key_value_chart].LINSY_INV_AMT/10000/10000).toFixed(2)*1);
                  hour_data.push((user_data[key_value_chart].MDATE.substring(5, 7)*1+'月'));
                }
                
              }else if(this.sel_value.target.all_muri_value==3){

                if(user_data[key_value_chart].MDATE.substring(0,4)*1==year_now){
                  sale_amt.push((user_data[key_value_chart].SPL_INV_AMT/10000/10000).toFixed(2)*1);
                }else if(user_data[key_value_chart].MDATE.substring(0,4)*1==(year_now-1)){
                  ago_amt.push((user_data[key_value_chart].SPL_INV_AMT/10000/10000).toFixed(2)*1);
                  hour_data.push((user_data[key_value_chart].MDATE.substring(5, 7)*1+'月'));
                }

              }
              
            });


          }else if(this.sel_value.Range_on.Range_set == "3"){


            user_data = this.data["pds_shrt-shrt_days"];
            user_data = user_data.sort((a, b) => {
              let value_sort = "";
              let a_time = new Date(a["TDATE"]).getTime(new Date(a["TDATE"]));
              let b_time = new Date(b["TDATE"]).getTime(new Date(b["TDATE"]));
              value_sort = Number(a_time) - Number(b_time);
    
              return value_sort;
            });

            Object.keys(user_data).forEach((key_value_chart) => {

              // 日均订单欠货
              if(this.sel_value.target.all_muri_value==1){

                sale_amt.push((user_data[key_value_chart].ODRS_SHRT_MAVG_AMT/10000).toFixed(1)*1);
                ago_amt.push((user_data[key_value_chart].ODRS_SHRT_MAVG_AMT_AGO/10000).toFixed(1)*1);
                hour_data.push((user_data[key_value_chart].TDATE.substring(5, 10)));
                year_date.push((user_data[key_value_chart].TDATE.substring(0, 4)));

              }else if(this.sel_value.target.all_muri_value==2){

                // 日均商品欠货
                sale_amt.push((user_data[key_value_chart].PROD_SHRT_MAVG_ACT_AMT/10000).toFixed(1)*1);
                ago_amt.push((user_data[key_value_chart].PROD_SHRT_MAVG_ACT_AMT_AGO/10000).toFixed(1)*1);
                hour_data.push((user_data[key_value_chart].TDATE.substring(5, 10)));
                year_date.push((user_data[key_value_chart].TDATE.substring(0, 4)));
              
              }else if(this.sel_value.target.all_muri_value==3){

                // 商品欠货
                sale_amt.push((user_data[key_value_chart].PROD_SHRT_ACT_AMT/10000).toFixed(1)*1);
                ago_amt.push((user_data[key_value_chart].PROD_SHRT_ACT_AMT_AGO/10000).toFixed(1)*1);
                hour_data.push((user_data[key_value_chart].TDATE.substring(5, 10)));
                year_date.push((user_data[key_value_chart].TDATE.substring(0, 4)));

              }

            });





          }else if(this.sel_value.Range_on.Range_set == "4"){
            user_data = this.data["pds_afs-mons_afs_rto"];
            user_data = user_data.sort((a, b) => {
              let value_sort = "";
              let a_time = new Date(a["MDATE"]).getTime(new Date(a["MDATE"]));
              let b_time = new Date(b["MDATE"]).getTime(new Date(b["MDATE"]));
              value_sort = Number(a_time) - Number(b_time);
    
              return value_sort;
            });


            // console.log("运行到品质这里！！！！");
            // console.log(user_data);
            // 做M+1处理
            let _time_now_M=new Date();
            year_now=_time_now_M.getFullYear();
            if(_time_now_M.getMonth()==0){
              year_now=year_now-1;
            }else{
              year_now=year_now-1;
            }
            // 做M+1处理

            Object.keys(user_data).forEach((key_value_chart) => {
              if(this.sel_value.target.all_muri_value==1){

                if(user_data[key_value_chart].MDATE.substring(0,4)*1==year_now){
                  sale_amt.push((user_data[key_value_chart].AFS_RTO*100).toFixed(1)*1);
                }else if(user_data[key_value_chart].MDATE.substring(0,4)*1==(year_now-1)){
                  ago_amt.push((user_data[key_value_chart].AFS_RTO*100).toFixed(1)*1);
                  hour_data.push((user_data[key_value_chart].MDATE.substring(5, 7)*1+'月'));
                }

              }else if(this.sel_value.target.all_muri_value==2){

                if(user_data[key_value_chart].MDATE.substring(0,4)*1==year_now){
                  sale_amt.push((user_data[key_value_chart].FAC_AFS_RTO*100).toFixed(1)*1);
                }else if(user_data[key_value_chart].MDATE.substring(0,4)*1==(year_now-1)){
                  ago_amt.push((user_data[key_value_chart].FAC_AFS_RTO*100).toFixed(1)*1);
                  hour_data.push((user_data[key_value_chart].MDATE.substring(5, 7)*1+'月'));
                }
                
              }else if(this.sel_value.target.all_muri_value==3){

                if(user_data[key_value_chart].MDATE.substring(0,4)*1==year_now){
                  sale_amt.push((user_data[key_value_chart].LGS_AFS_RTO*100).toFixed(1)*1);
                }else if(user_data[key_value_chart].MDATE.substring(0,4)*1==(year_now-1)){
                  ago_amt.push((user_data[key_value_chart].LGS_AFS_RTO*100).toFixed(1)*1);
                  hour_data.push((user_data[key_value_chart].MDATE.substring(5, 7)*1+'月'));
                }

              }
              
            });


      
          }else if(this.sel_value.Range_on.Range_set == "5"){

          
            user_data=this.data['FS_YY_KD-PCT_CANAL_M'];
            user_data.sort((a, b) => {
              let a_time = "";
              let b_time = "";
              a_time = new Date(a["MDATE"].substring(0,10)).getTime(new Date(a["MDATE"].substring(0,10)));
              b_time = new Date(b["MDATE"].substring(0,10)).getTime(new Date(b["MDATE"].substring(0,10)));
              
              return a_time - b_time;
            });


            // console.log("=========同期的！！！========");
            // console.log((year_now-1));





            switch (this.sel_value.target.all_muri_value){
              case 1:
                Object.keys(user_data).forEach((key_value_chart) => {
                  if(user_data[key_value_chart].MDATE.substring(0,4)==(year_now-1)+''){
                    hour_data.push((user_data[key_value_chart].MDATE.substring(5,7))*1+'月');
                    // ago_amt.push(((user_data[key_value_chart].COMPANY_PCT_PREV||0)).toFixed(1)*1);
                    ago_amt.push(((user_data[key_value_chart].COMPANY_PCT||0)).toFixed(1)*1);
                  }

                  if(user_data[key_value_chart].MDATE.substring(0,4)==(year_now)+''){
                    sale_amt.push(((user_data[key_value_chart].COMPANY_PCT||0)).toFixed(1)*1);
                  }

                });

                // console.log("集团");
                break;
              case 2:
                // console.log("线上");
                Object.keys(user_data).forEach((key_value_chart) => {

                  if(user_data[key_value_chart].MDATE.substring(0,4)==(year_now-1)+''){
                    hour_data.push((user_data[key_value_chart].MDATE.substring(5,7))*1+'月');
                    // ago_amt.push(((user_data[key_value_chart].ON_LINE_PCT_PREV||0)).toFixed(1)*1);   
                    ago_amt.push(((user_data[key_value_chart].ON_LINE_PCT||0)).toFixed(1)*1);       
                                              
                  }
                  if(user_data[key_value_chart].MDATE.substring(0,4)==(year_now)+''){
                    sale_amt.push(((user_data[key_value_chart].ON_LINE_PCT||0)).toFixed(1)*1);                    
                  }

                });

                break;
              case 3:
                Object.keys(user_data).forEach((key_value_chart) => {

                  if(user_data[key_value_chart].MDATE.substring(0,4)==(year_now-1)+''){
                    hour_data.push((user_data[key_value_chart].MDATE.substring(5,7))*1+'月');
                    // ago_amt.push(((user_data[key_value_chart].OFF_LINE_PCT_PREV||0)).toFixed(1)*1);
                    ago_amt.push(((user_data[key_value_chart].OFF_LINE_PCT||0)).toFixed(1)*1);
                  }
                  if(user_data[key_value_chart].MDATE.substring(0,4)==(year_now)+''){
                    sale_amt.push(((user_data[key_value_chart].OFF_LINE_PCT||0)).toFixed(1)*1);                  
                  }
  
                });
                // console.log("线下");
                break;
            }


            // console.log("===客单价===");
            // console.log(user_data);
            // console.log(hour_data);







          }


          // console.log("=====趋势图=====");
          // console.log(this.sel_value.target.all_muri_value);
          // console.log(this.data);
          // console.log(user_data);
          // console.log(year_now);

          // console.log(hour_data) ;
          // console.log(hour_data[11].replace(/[^0-9]/ig,""));
          // console.log(sale_amt);
          // console.log(ago_amt);
          // console.log(this.unique(year_date));



          // 新加的默认值开始
          // console.log(this.sel_value.Range_on.Range_set);

          


          this.barData.value=0;
          this.barData.ago_value=0;
          if(this.sel_value.Range_on.Range_set == "1"){

            // this.barData.month=(_time_now.getMonth()+1)+'-'+(_time_now.getDate());
            // (_time_now.getMonth()+1)+'月'
            
            this.barData.month=(year_now)+'-'+(((_time_now.getMonth()+1)>9)?(_time_now.getMonth()+1):'0'+(_time_now.getMonth()+1));
            Object.keys(hour_data).forEach((key_mv) => {
              // if(hour_data[key_mv]==((_time_now.getMonth()+1)+'-'+(_time_now.getDate()))){  
              if(hour_data[key_mv]==((_time_now.getMonth()+1)+'月')){
                this.barData.value=this.fomatMoney(sale_amt[key_mv])+'万'
                this.barData.ago_value=this.fomatMoney(ago_amt[key_mv])+'万'
              }
            });  

            // console.log("===============qweqeqe!!!!!!=========运行到11111========================")
            // console.log(((_time_now.getMonth()+1)+'-'+(_time_now.getDate())));

            if(this.barData.value==0&&this.barData.ago_value==0){
              this.barData.month=hour_data[hour_data.length-1];
              this.barData.value=(ago_amt[sale_amt.length-1]==undefined)?0:this.fomatMoney(sale_amt[sale_amt.length-1])+'万'
              this.barData.ago_value=(ago_amt[sale_amt.length-1]==undefined)?0:this.fomatMoney(ago_amt[sale_amt.length-1])+'万'
            }

          }else if(this.sel_value.Range_on.Range_set == "2"){

            // this.barData.month=(_time_now.getMonth()+1)+'月';
            this.barData.month=(year_now)+'-'+(((_time_now.getMonth()+1)>9)?(_time_now.getMonth()+1):'0'+(_time_now.getMonth()+1));
            Object.keys(hour_data).forEach((key_mv) => {
              if(hour_data[key_mv]==((_time_now.getMonth()+1)+'月')){
                this.barData.value=this.fomatMoney(sale_amt[key_mv])+'亿'
                this.barData.ago_value=this.fomatMoney(ago_amt[key_mv])+'亿'
              }
            });  

            if(this.barData.value==0&&this.barData.ago_value==0){
              this.barData.month=hour_data[hour_data.length-1];
              this.barData.value=this.fomatMoney(sale_amt[sale_amt.length-1])+'亿'
              this.barData.ago_value=this.fomatMoney(ago_amt[sale_amt.length-1])+'亿'
            }

          }else if(this.sel_value.Range_on.Range_set == "3"){

            this.barData.month=year_now+'-'+(_time_now.getMonth()+1)+'-'+(_time_now.getDate()*1);
            
            Object.keys(hour_data).forEach((key_mv) => {
              if(hour_data[key_mv]==((_time_now.getMonth()+1)+'-'+(_time_now.getDate()*1))){
                this.barData.value=this.fomatMoney(sale_amt[key_mv])+'万'
                this.barData.ago_value=this.fomatMoney(ago_amt[key_mv])+'万'
              }
            });  

            if(this.barData.value==0&&this.barData.ago_value==0){
              this.barData.month=year_now+'-'+hour_data[hour_data.length-1];
              this.barData.value=this.fomatMoney(sale_amt[sale_amt.length-1])+'万'
              this.barData.ago_value=this.fomatMoney(ago_amt[sale_amt.length-1])+'万'
            }

          }else if(this.sel_value.Range_on.Range_set == "4"){

            // this.barData.month=(_time_now.getMonth()+1)+'月';
            // 做M+1处理
            let _time_now_M=new Date();
            year_now=_time_now_M.getFullYear();
            if(_time_now_M.getMonth()==0){
              year_now=year_now-1;
              _time_now='12';
            }else{
              year_now=year_now-1;
              _time_now=((_time_now.getMonth()+1)>9)?(_time_now.getMonth()+1):'0'+(_time_now.getMonth()+1)
            }
            // 做M+1处理
            this.barData.month=(year_now)+'-'+(_time_now);

            Object.keys(hour_data).forEach((key_mv) => {
              if(hour_data[key_mv]==((_time_now)+'月')){
                this.barData.value=this.fomatMoney(sale_amt[key_mv])+'%'
                this.barData.ago_value=this.fomatMoney(ago_amt[key_mv])+'%'
              }
            });  

            if(this.barData.value==0&&this.barData.ago_value==0){
              this.barData.month=hour_data[hour_data.length-1];
              this.barData.value=this.fomatMoney(sale_amt[sale_amt.length-1])+'%'
              this.barData.ago_value=this.fomatMoney(ago_amt[sale_amt.length-1])+'%'
            }          

          }else if(this.sel_value.Range_on.Range_set == "5"){

            // this.barData.month=(_time_now.getMonth()+1)+'月';
            this.barData.month=(year_now)+'.'+(((_time_now.getMonth()+1)>9)?(_time_now.getMonth()+1):'0'+(_time_now.getMonth()+1));

            Object.keys(hour_data).forEach((key_mv) => {
              if(hour_data[key_mv]==((_time_now.getMonth()+1)+'月')){
                this.barData.value=this.fomatMoney(sale_amt[key_mv].toFixed(1))+'元'
                this.barData.ago_value=this.fomatMoney(ago_amt[key_mv].toFixed(1))+'元'
              }
            });  

            if(this.barData.value==0&&this.barData.ago_value==0){
              // this.barData.month=hour_data[hour_data.length-1];
              this.barData.month=(year_now)+'.'+(hour_data[hour_data.length-1]).replace(/[^0-9]/ig,"");

              this.barData.value=this.fomatMoney(sale_amt[sale_amt.length-1].toFixed(1))+'元'
              this.barData.ago_value=this.fomatMoney(ago_amt[sale_amt.length-1].toFixed(1))+'元'
            }

          }

          // console.log((_time_now.getMonth()+1)+'-'+(_time_now.getDate()));

          // console.log("1211=====");
          // console.log((_time_now.getMonth()+1));
          // console.log(_time_now.getDate());

          // 新加的默认值结束



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

                  if(_this.sel_value.Range_on.Range_set=='1'){

                    _this.barData.value =(params[1]==undefined)? '--':_this.fomatMoney((params[1].value).toFixed(1))+'万';
                    _this.barData.ago_value =(params[0]==undefined)? '--': _this.fomatMoney((params[0].value).toFixed(1))+'万';
                    _this.barData.month =(params[0]==undefined)? 0: year_now+'-'+((params[0].axisValue).replace(/[^0-9]/ig,"")>9?(params[0].axisValue).replace(/[^0-9]/ig,""):'0'+(params[0].axisValue).replace(/[^0-9]/ig,""));

                  }else if(_this.sel_value.Range_on.Range_set=='2'){

                    _this.barData.value =(params[1]==undefined)? '--':_this.fomatMoney((params[1].value).toFixed(2))+'亿';
                    _this.barData.ago_value =(params[0]==undefined)? '--': _this.fomatMoney((params[0].value).toFixed(2))+'亿';
                    // _this.barData.month =(params[0]==undefined)? 0: params[0].axisValue;
                    _this.barData.month =(params[0]==undefined)? 0: year_now+'-'+((params[0].axisValue).replace(/[^0-9]/ig,"")>9?(params[0].axisValue).replace(/[^0-9]/ig,""):'0'+(params[0].axisValue).replace(/[^0-9]/ig,""));

                  }else if(_this.sel_value.Range_on.Range_set=='3'){

                    _this.barData.value =(params[1]==undefined)? '--':_this.fomatMoney((params[1].value).toFixed(1))+'万';
                    _this.barData.ago_value =(params[0]==undefined)? '--': _this.fomatMoney((params[0].value).toFixed(1))+'万';
                    _this.barData.month =(params[0]==undefined)? 0: (_this.unique(year_date)).length==2&&(params[0].axisValue.substring(0,2)=='12')? (year_now-1)+'-'+params[0].axisValue:year_now+'-'+params[0].axisValue;

                    

                  }else if(_this.sel_value.Range_on.Range_set=='4'){

                    _this.barData.value =(params[1]==undefined)? '--':_this.fomatMoney((params[1].value).toFixed(1))+'%';
                    _this.barData.ago_value =(params[0]==undefined)? '--': _this.fomatMoney((params[0].value).toFixed(1))+'%';
                    // _this.barData.month =(params[0]==undefined)? 0: params[0].axisValue;
                    _this.barData.month =(params[0]==undefined)? 0: year_now+'-'+((params[0].axisValue).replace(/[^0-9]/ig,"")>9?(params[0].axisValue).replace(/[^0-9]/ig,""):'0'+(params[0].axisValue).replace(/[^0-9]/ig,""));

                  }else if(_this.sel_value.Range_on.Range_set=='5'){

                    _this.barData.value =(params[1]==undefined)? '--':_this.fomatMoney((params[1].value).toFixed(1))+'元';
                    _this.barData.ago_value =(params[0]==undefined)? '--': _this.fomatMoney((params[0].value).toFixed(1))+'元';
                    // _this.barData.month =(params[0]==undefined)? 0: params[0].axisValue;
                    _this.barData.month =(params[0]==undefined)? 0: year_now+'.'+((params[0].axisValue).replace(/[^0-9]/ig,"")>9?(params[0].axisValue).replace(/[^0-9]/ig,""):'0'+(params[0].axisValue).replace(/[^0-9]/ig,""));


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
                  data: ago_amt,
                  type: "line",
                  areaStyle: {},
                },

                {
                  name: "当期",
                  showSymbol: (sale_amt.length==1)? true:false,
                  smooth: false, //true 为平滑曲线，false为直线
                  // symbol: 'circle',     //设定为实心点
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
          Information_log('产品供应-客单','产品供应-客单-折线图:  '+error.toString());
        }



      });




    },

    initChart2() {
      this.chartIns2 = echarts.init(this.$refs["chart2"]);

      let hour_data = [];
      // let sale_amt = [];
      // let ago_amt = [];
      let user_data = [];
          
      let legend_data=[];
      let series_data=[];
      let year_now = new Date();
      year_now = year_now.getFullYear();

      let _this=this;

      this.p1.then(() => {

        try{

          if(this.sel_value.target.all_muri_value==1){

            let zai_tu_amt=[];
            let bao_jian_amt=[];

            user_data=this.data["pds_inv-intrns_amt"]
            user_data = user_data.sort((a, b) => {
              let value_sort = "";
              let a_time = new Date(a["MDATE"]).getTime(new Date(a["MDATE"]));
              let b_time = new Date(b["MDATE"]).getTime(new Date(b["MDATE"]));
              value_sort = Number(a_time) - Number(b_time);
              return value_sort;
            });
            Object.keys(user_data).forEach((key_value_chart2) => {
              zai_tu_amt.push(((user_data[key_value_chart2].INTRNS_AMT)/10000).toFixed(2)*1);
              bao_jian_amt.push(((user_data[key_value_chart2].WAIT_INSP_AMT)/10000).toFixed(2)*1);
              hour_data.push(user_data[key_value_chart2].MDATE.substring(0,7));
            });

            legend_data=[];
            legend_data=["在途","报检"];
            series_data=[];
            series_data=[
              {
                name: "在途",
                type: "bar",
                stack: "总库存",
                label: {
                  show: false,
                },
                itemStyle: {
                  // color: "#0938F7",
                  color: "#1678FF",
                },
                data: zai_tu_amt,
                barWidth:'60%',
              },  
              {
                name: "报检",
                type: "bar",
                stack: "总库存",
                label: {
                  normal: {       // 重写未完成label，通过计算属性重新给formatter赋值，返回
                      show: true,   // 计算的总数
                      position: 'top',
                      formatter: function (params) {
                          return ((params.value + zai_tu_amt[params.dataIndex])/10000).toFixed(2)+'亿'
                      },
                      textStyle: { color: '#6F6F6F' }
                  }

                },
                itemStyle: {
                  color: "#F5A028",
                },
                data: bao_jian_amt,
                barWidth:'60%',
              },   
            ];




            console.log(zai_tu_amt);
            console.log(bao_jian_amt);


          }else if(this.sel_value.target.all_muri_value==2){

            legend_data=[];
            legend_data=["91-180","181-360","361-720","720+"];
            let data_91=[];
            let data_181=[];
            let data_361=[];
            let data_720=[];

            user_data=this.data["pds_inv-rem_inv_lvl"]
            user_data = user_data.sort((a, b) => {
              let value_sort = "";
              let a_time = new Date(a["MDATE"]).getTime(new Date(a["MDATE"]));
              let b_time = new Date(b["MDATE"]).getTime(new Date(b["MDATE"]));
              value_sort = Number(a_time) - Number(b_time);
              return value_sort;
            });
            Object.keys(user_data).forEach((key_value_chart2) => {
              
              if(user_data[key_value_chart2].INV_AGE_LVL=='91-180'){
                data_91.push((user_data[key_value_chart2].LINSY_INV_AMT/10000).toFixed(2)*1);
                hour_data.push(user_data[key_value_chart2].MDATE.substring(0,7));
              }else if(user_data[key_value_chart2].INV_AGE_LVL=='181-360'){
                data_181.push((user_data[key_value_chart2].LINSY_INV_AMT/10000).toFixed(2)*1);
              }else if(user_data[key_value_chart2].INV_AGE_LVL=='361-720'){
                data_361.push(((user_data[key_value_chart2].LINSY_INV_AMT)/10000).toFixed(2)*1);
              }else if(user_data[key_value_chart2].INV_AGE_LVL=='720+'){
                data_720.push((user_data[key_value_chart2].LINSY_INV_AMT/10000).toFixed(2)*1);
              }

            });
            series_data=[];
            series_data=[
              {
                name: "91-180",
                type: "bar",
                stack: "林氏仓库",
                label: {
                  show: false,
                },
                itemStyle: {
                  // color: "#0938F7",
                  color: "#1678FF",
                },
                data: data_91,
                barWidth:'60%',
              },  
              {
                name: "181-360",
                type: "bar",
                stack: "林氏仓库",
                label: {
                  show: false,
                },
                itemStyle: {
                  color: "#FFAD33",
                },
                data: data_181,
                barWidth:'60%',
              }, 
              {
                name: "361-720",
                type: "bar",
                stack: "林氏仓库",
                label: {
                  show: false,
                },
                itemStyle: {
                  color: "#F0F031",
                },
                data: data_361,
                barWidth:'60%',
              }, 
              {
                name: "720+",
                type: "bar",
                stack: "林氏仓库",
                label: {
                  // show: false,
                  normal: {       // 重写未完成label，通过计算属性重新给formatter赋值，返回
                      show: true,   // 计算的总数
                      position: 'top',
                      formatter: function (params) {
                          return ((params.value + data_361[params.dataIndex]+data_181[params.dataIndex]+data_91[params.dataIndex])/10000).toFixed(2)+'亿'
                      },
                      textStyle: { color: '#6F6F6F' }
                  }


                },
                itemStyle: {
                  color: "#20CE43",
                },
                data: data_720,
                barWidth:'60%',
              },   
              
            ]
            // console.log(data_91)
            // console.log(data_181)
            // console.log(data_361)
            // console.log(data_720)
            // console.log(hour_data);



          }else if(this.sel_value.target.all_muri_value==3){

            // let gongfang_all=[];

          
            
            legend_data=[];
            legend_data=["91-180","181-360","361-720","720+"];
            let data_91=[];
            let data_181=[];
            let data_361=[];
            let data_720=[];



            // console.log("==============库存的============")
            // console.log(this.data["pds_inv-rem_inv_lvl"]);


            // user_data=this.data["pds_inv-mons_inv_amt"]
            user_data=this.data["pds_inv-rem_inv_lvl"];

            user_data = user_data.sort((a, b) => {
              let value_sort = "";
              let a_time = new Date(a["MDATE"]).getTime(new Date(a["MDATE"]));
              let b_time = new Date(b["MDATE"]).getTime(new Date(b["MDATE"]));
              value_sort = Number(a_time) - Number(b_time);
              return value_sort;
            });

            // console.log("============供厂的===============================");
            // console.log(user_data);

            Object.keys(user_data).forEach((key_value_chart2) => {
              
              // if(user_data[key_value_chart2].MDATE.substring(0,4)*1==year_now){}
                // gongfang_all.push((user_data[key_value_chart2].REM_INV_VALUE/10000).toFixed(2)*1)
                if(user_data[key_value_chart2].INV_AGE_LVL=='91-180'){
                  data_91.push((user_data[key_value_chart2].SPL_INV_AMT/10000).toFixed(2)*1);
                  // hour_data.push((user_data[key_value_chart2].MDATE.substring(5, 7)*1+'月'));
                  hour_data.push(user_data[key_value_chart2].MDATE.substring(0,7));
                }else if(user_data[key_value_chart2].INV_AGE_LVL=='181-360'){
                  data_181.push((user_data[key_value_chart2].SPL_INV_AMT/10000).toFixed(2)*1);
                }else if(user_data[key_value_chart2].INV_AGE_LVL=='361-720'){
                  data_361.push(((user_data[key_value_chart2].SPL_INV_AMT)/10000).toFixed(2)*1);
                }else if(user_data[key_value_chart2].INV_AGE_LVL=='720+'){
                  data_720.push((user_data[key_value_chart2].SPL_INV_AMT/10000).toFixed(2)*1);
                }
    
            });

            // console.log(data_91)
            // console.log(data_181)
            // console.log(data_361)
            // console.log(data_720)
            // console.log(hour_data);


            series_data=[];   
            series_data=[
              {
                name: "91-180",
                type: "bar",
                stack: "供方仓库存",
                label: {
                  show: false,
                },
                itemStyle: {
                  // color: "#0938F7",
                  color: "#1678FF",
                },
                data: data_91,
                barWidth:'60%',
              },  
              {
                name: "181-360",
                type: "bar",
                stack: "供方仓库存",
                label: {
                  show: false,
                },
                itemStyle: {
                  color: "#FFAD33",
                },
                data: data_181,
                barWidth:'60%',
              }, 
              {
                name: "361-720",
                type: "bar",
                stack: "供方仓库存",
                label: {
                  show: false,
                },
                itemStyle: {
                  color: "#F0F031",
                },
                data: data_361,
                barWidth:'60%',
              }, 
              {
                name: "720+",
                type: "bar",
                stack: "供方仓库存",
                label: {
                  // show: false,
                  normal: {       // 重写未完成label，通过计算属性重新给formatter赋值，返回
                      show: true,   // 计算的总数
                      position: 'top',
                      formatter: function (params) {
                          return ((params.value + data_361[params.dataIndex]+data_181[params.dataIndex]+data_91[params.dataIndex])).toFixed(1)+'万'
                      },
                      textStyle: { color: '#6F6F6F' }
                  }


                },
                itemStyle: {
                  color: "#20CE43",
                },
                data: data_720,
                barWidth:'60%',
              },   
              
            ]

            

            console.log(hour_data);

            console.log(year_now);


            // REM_INV_VALUE

            console.log(3);

          }
          

          console.log("======在途的！！======");

          this.chartIns2.setOption({
            // tooltip: {
            //   trigger: "axis",
            //   axisPointer: {
            //     // 坐标轴指示器，坐标轴触发有效
            //     type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
            //   },
            // },

            tooltip: {
              trigger: "axis",
              // axisPointer: {
              //   type: "cross",
              //   label: {
              //     color: "#000000",
              //     backgroundColor: "aliceblue",
              //   },
              // },
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              },

              formatter:function (params) {

                let user_data_params='';

                if(_this.sel_value.target.all_muri_value==1){
                  // _this.barData2.value1=params[0].value;
                  // _this.barData2.value2=params[1].value;
                  // _this.barData2.month =(params[0]==undefined)? 0: params[0].axisValue; 
                  user_data_params="月份："+params[0].axisValue+'<br/> 在途：'+params[1].marker+(thousands(params[1].value))+'万<br/> 报检：'+params[0].marker+thousands(params[0].value)+'万';

                }else if(_this.sel_value.target.all_muri_value==2){
                  // _this.barData2.value1=params[0].value;
                  // _this.barData2.value2=params[1].value;
                  // _this.barData2.value3=params[2].value;
                  // _this.barData2.value4=params[3].value;
                  // _this.barData2.month =(params[0]==undefined)? 0: params[0].axisValue; 

                  user_data_params="月份："+params[0].axisValue+
                  '<br/> 91-180：'+params[0].marker+thousands(params[0].value)+
                  '万<br/> 181-360：'+params[1].marker+thousands(params[1].value)+
                  '万<br/> 361-720：'+params[2].marker+thousands(params[2].value)+
                  '万<br/> 720+：'+params[3].marker+thousands(params[3].value)+'万';

                }else if(_this.sel_value.target.all_muri_value==3){
                  // _this.barData2.value1=params[0].value;
                  // _this.barData2.month =(params[0]==undefined)? 0: params[0].axisValue;

                  // user_data_params="月份："+params[0].axisValue+'<br/> 库存：'+params[0].marker+params[0].value+'万';
                  user_data_params="月份："+params[0].axisValue+
                  '<br/> 91-180：'+params[0].marker+(params[0].value)+
                  '万<br/> 181-360：'+params[1].marker+(params[1].value)+
                  '万<br/> 361-720：'+params[2].marker+(params[2].value)+
                  '万<br/> 720+：'+params[3].marker+(params[3].value)+'万';

                }

                return user_data_params;

              }

            },

            legend: {

              show: true,
              // top:"top",
              // right: "3%",
              top: "0%",
              // bottom: "2%",
              data: legend_data,
              textStyle: {
                fontSize: 12,
              },
              itemHeight: 4,
              itemWidth: 12,
              icon: "pie",
            },

            grid: {
              left: "2%",
              right: "4%",
              bottom: "0%",
              top: "16%",
              containLabel: true,
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

            series: series_data,


          },true);



        }catch(error){ 
          console.log("========错误捕捉信息==========")
          // console.log(error)
          console.error(error);
          // this.info_error+=1;
          Information_log('产品供应','产品供应-在途报检图:  '+error.toString());
        }



      });


    },





    initChart3() {


      this.chartIns3 = echarts.init(this.$refs["chart3"]);

      let hour_data = [];
      let sale_amt = [];
      // let ago_amt = [];
      let user_data = [];

      this.p1.then(() => {

        try{

          if(this.echarts_clear==true){
            this.chartIns3.clear();
            this.echarts_clear=false;
          }

          
          let data = this.data;

          if(this.sel_value.Range_on.Range_set=='1'){
            console.log(user_data);

          }else if(this.sel_value.Range_on.Range_set=='2'){
            console.log(user_data);

          }else if(this.sel_value.Range_on.Range_set=='5'){

            user_data=data["FS_YY_KD-PCT_SHOP_ACT_M"];

            // console.log("======================");
            // console.log(user_data);

            user_data.sort((a, b) => {
              let a_time = "";
              let b_time = "";
              // a_time = a["CUST_PRC_A"];
              // b_time = b["CUST_PRC_A"];
              a_time = a["START_DATE_ASC"];
              b_time = b["START_DATE_ASC"];
              
              return a_time-b_time ;
            });

            // console.log("===============客单价！！！================");
            // console.log(user_data);
            // console.log(user_data[0].MDATE.substring(0, 7));

      

            switch (this.shop_switch.shop_value.value_set){
              case 1:


                  Object.keys(user_data).forEach((key_value_chart3) => {
                    // console.log(user_data[key_value_chart3].MDATE.substring(0, 7));
                    if(user_data[key_value_chart3].MDATE.substring(0, 7)==(this.set_time.substring(0,4)+"-"+this.set_time.substring(5,7))&&user_data[key_value_chart3].SHOP_CODE=='B'){
                      // console.log("对应的月份");

                      let [prefix_n, interfaceName_n] = user_data[key_value_chart3].ACT_NAME.split("-"); //把上面的拆分出来
                      if(interfaceName_n==undefined){
                        interfaceName_n=prefix_n;
                      }
                      sale_amt.push((user_data[key_value_chart3].CUST_PRC_A).toFixed(1));
                      // hour_data.push(user_data[key_value_chart3].ACT_NAME);
                      hour_data.push(interfaceName_n);
                    }
                  });            
                break;
              case 2:
                  Object.keys(user_data).forEach((key_value_chart3) => {

                    // if(user_data[key_value_chart3].MDATE.substring(0, 7)=='2020-11'&&user_data[key_value_chart3].SHOP_CODE=='D'){
                    //   console.log(user_data[key_value_chart3].MDATE.substring(0, 7));
                    //   console.log((this.set_time.substring(0,4)+"-"+this.set_time.substring(5,7)));

                    // }

                    if(user_data[key_value_chart3].MDATE.substring(0, 7)==(this.set_time.substring(0,4)+"-"+this.set_time.substring(5,7))&&user_data[key_value_chart3].SHOP_CODE=='D'){
                      // console.log("对应的月份）——D店");
                      sale_amt.push((user_data[key_value_chart3].CUST_PRC_A).toFixed(1));
                      hour_data.push(user_data[key_value_chart3].ACT_NAME);
                    }
                  });   
                break;
              case 3:
                  Object.keys(user_data).forEach((key_value_chart3) => {
                    if(user_data[key_value_chart3].MDATE.substring(0, 7)==(this.set_time.substring(0,4)+"-"+this.set_time.substring(5,7))&&user_data[key_value_chart3].SHOP_CODE=='JDLS'){
                      // console.log("对应的月份");
                      sale_amt.push((user_data[key_value_chart3].CUST_PRC_A).toFixed(1));
                      hour_data.push(user_data[key_value_chart3].ACT_NAME);
                    }
                  });  
                break;

            }

            // console.log("=======客单的！！！！！！！！=========");
            // console.log(sale_amt);

            if(sale_amt==''){
              this.shop_switch.shop_value_data='1';
            }else{
              this.shop_switch.shop_value_data='2';
            }

          }


          console.log("================")
          console.log("活动区间")
          console.log(user_data);
          // console.log(this.shop_switch.shop_value.value_set);
          // console.log(user_data)
          // console.log(sale_amt);
          console.log(hour_data)

          // console.log("==========客单价的！！！！============");
          // console.log(this.shop_switch.shop_value.value_set);
          // console.log(user_data.length);
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

              // trigger: "axis",
              // axisPointer: {
              //   type: "cross",
              //   label: {
              //     color: "#000000",
              //     backgroundColor: "aliceblue",
              //   },
              // },

              trigger: "axis",
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'

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
                barWidth:sale_amt.length>4? '60%':'30%',
                data: sale_amt,
                type: "bar",
                areaStyle: {},
                
              },
            ],
          });

        }catch(error){ 
          console.log("========错误捕捉信息==========")
          // console.log(error)
          console.error(error);
          // this.info_error+=1;
          Information_log('产品供应','产品供应-活动区间趋势图:  '+error.toString());
        }

      
      });

    },

    nll_undefined(setvalue){
      // setvalue=setvalue==undefined?'--':setvalue;
      // return setvalue;
      setvalue=setvalue.toString();
      setvalue=setvalue.indexOf("undefined")==-1?setvalue:'--';
      return setvalue;
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

                    // console.log("================asdadadad!!!!!!!!!adsa=====================");
                    // console.log(key_var+"              "+('resolve'+apiMap[key]['num']));
                    // console.log(num_api_pd+"              "+(num_api));
                    // console.log(apiMap);

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
    this.$EventBus.$off("prosupply_choice_f");
  },



};
</script>

<style scoped lang="scss">
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

.table_all {
  padding-top: 10px;
  padding: 10px;
  background-color: rgb(247, 247, 247);
  border-radius: 6px;
  text-align: center;
  // margin-bottom: 10px;
  padding-bottom: 0px;
}
.table_all ul li {
  height: 30px;
  padding-bottom: 10px;
}
.table_all .table_title ul li {
  float: left;
  // width: 20%;
  width: 25%;
  font-size: 12px;
  color: #999999;
}

.table_all .table_content ul li {
  float: left;
  // width: 20%;
  width: 25%;
  font-size: 12px;
  // color: #999999;
}






/deep/ .table_all .table_content ul li.rate-up_salesR:after {
  right: -2px;
}

/deep/ .table_all .table_content ul li.rate-down_salesR:after {
  right: -2px;
}


/deep/ .tongbi_css i.rate-up_salesR:after{

  right: -10px;

}

/deep/ .tongbi_css i.rate-down_salesR:after{

  right: -10px;

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

.table_all_top10 .table_title ul li {
  float: left;
  width: 25%;
  font-size: 12px;
  color: #999999;
}

.table_all_top10 .table_content ul li {
  float: left;
  width: 20%;
  font-size: 12px;
  // color: #999999;
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





/deep/ .table_all .table_content ul li.rate-up_sales:after {
  right: -1px;
}

/deep/ .table_all .table_content ul li.rate-down_sales:after {
  right: -1px;
}

/deep/ .table_content ul li.rate-up:before {
  right: 0px;
}

/deep/ .table_content ul li.rate-down:before {
  right: 0px;
}

</style>
