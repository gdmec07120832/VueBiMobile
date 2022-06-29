<template>
  <!-- <div style="min-height: 100vh">
    <div style="text-align: center">
      <in-progress style="width: 100px; height: 100px" />
      <div style="color: #ccc">开发中</div>
    </div>
  </div> -->

  <div class="Productmarket_all">
    <!-- 滑屏开始 -->
    <van-pull-refresh v-model="isLoading" :head-height="0" :pull-distance="0" @refresh="onRefresh">
      <div>
        <!-- <van-notice-bar
          wrapable
          :scrollable="false"
          color="#999999"
          background="rgba(245, 245, 245, 1)"
          :text="'更新时间：' + '20-10-22'"
        /> -->

        <section
          style="
            padding-top: 5px;
            padding-bottom: 5px;
            border-radius: 4px;
            margin-left: 10px;
            margin-right: 10px;
            margin-bottom: 0px;
          "
        >
          <!-- <div
            class="section-title"
            style="padding-left: 0px; padding-bottom: 0px; color: #999999"
          >
            {{ "更新时间：" + this.data_load_time }}
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
                  <p style="margin-bottom: 20px;margin-top: 5px;">预计每天8:45更新昨日数据</p> 

                <p style="font-weight: bold;">
                  <i style="width: 5px;height: 16px;background-color: #23B0A8;display: block;float: left;margin-right: 5px;margin-top: 3px;border-radius: 4px;"></i>
                  <span style="color: #000000;">逻辑说明</span></p>

                <!-- <p>本页面数据为全渠道中心考核口径，目标及业绩数据范围包括线上、线下、海外；</p>
                <p>注：不包括母婴、快手、定制、拎包</p> -->

                <van-collapse v-model="activeNames_tips" accordion>
                  <van-collapse-item title="采购毛利率" name="1">
                    <p>采购毛利率=采购毛利额/主营业务收入*100%</p>
                    <p>①采购毛利额=主营业务收入-商品发货锁定成本</p>
                    <p>②主营业务收入=发货收入-退款小计</p>
                    <p>③商品发货锁定成本：基于运营考核需求，每月锁定一版物料的成本</p>
                    <p>④退款小计：包含售后退款、未前置优惠退款、服务折让、销售折让</p>
                    
                  </van-collapse-item>

                  <!-- <van-collapse-item title="出库体积" name="2">
                    统计时间方位内出库释放出的仓位数的体积汇总，包含标准成品业务、定制、海外经销、海外、异地调拨等业务类型数据
                  </van-collapse-item>
                  <van-collapse-item title="库位率" name="3">
                    库存率=（可用库位数-空库位数）/可用库位数*100%
                  </van-collapse-item>
                  <van-collapse-item title="周转率" name="4">
                    <p>当月：年化周转率(金额)=累计发出/((期初含压货+期末含压货)/2)*当年总天数/当前天数；</p>
                    <p>历史：年化周转率(金额)=累计发出/((期初含压货+期末含压货)/2)*12/当前月份</p>
                    <p>本指标只有月数据，暂无日数据</p>
                  </van-collapse-item> -->

                </van-collapse>


              </div>
            </van-popup>


        </section>
        <!-- 开头结束 background-color: #ffffff;class="px10 py10"-->




        <section
          style="
            padding-top: 10px;
            padding-bottom: 10px;
            border-radius: 4px;
            background: #ffffff;
            margin-left: 10px;
            margin-right: 10px;
          "
          :style="(sel_value.Range_on.Range_set!='3')? {'display': 'inline-table'}:{'display': 'none'}"
        >
          <div
            class="Productmarket_labqie"
            :style="hexinzhibiao"
            style="
              border-bottom: 0px solid #dddddd;
              margin-left: 5px;
              margin-right: 5px;
              
            "
          >


            <!-- 2021-02-24时间新加的样式开始 -->
            <van-row type="flex" justify="center" style="padding-bottom: 10px;">
              
              <van-col
                span="11" 
                @click="Single_choice('day_1',['_this.data_Financial()','_this.initChart()','_this.echarts_clear=true'],true,'_this.sel_value.day_set')"

                style="border-radius: 4px;"
                :style="
                  sel_value.day_set.day_1 
                    ? whole_css.zffhyjkj
                    : whole_css.zffhyjkj_n
                "
              >
                昨天</van-col
              >
              <van-col
                span="11" offset="2"
                @click="Single_choice('month',['_this.data_Financial()','_this.initChart()','_this.echarts_clear=true'],true,'_this.sel_value.day_set')"

                style="border-radius: 4px;"
                :style="
                  sel_value.day_set.month
                    ? whole_css.zffhyjkj
                    : whole_css.zffhyjkj_n
                "
              >
                本月</van-col
              >

            </van-row>
            <!-- 2021-02-24时间新加的样式结束 -->




            <div
              @click="
                Single_choice(
                  'all_muri_value',
                  ['_this.initChart()','_this.echarts_clear=true'],
                  1,
                  '_this.sel_value.target'
                )
              "
              class="Productmarket_labqie_con1"
              :style="
                sel_value.target.all_muri_value == 1
                  ? Object.assign({}, click_css_hxzb_y, { 'margin-right': '0.5%' })
                  : Object.assign({}, click_css_hxzb_n, { 'margin-right': '0.5%' })
              "
            >
              <span
                :class="
                  sel_value.target.all_muri_value == 1 ? 'title_change' : ''
                "
                :style="sum_zhibiao.title"
                >集团</span
              >
              <span :style="sum_zhibiao.zhognxin">
                {{(this.sel_value.Range_on.Range_set=='2')?nll_undefined((sel_title.quota_value.cont1/10000).toFixed(1))+'万':nll_undefined((sel_title.quota_value.cont1*100).toFixed(1))+'%'}}
              </span>

              <span :style="sum_zhibiao.body">
                <i style="width: 35%; display: inline-block; font-style: normal"
                  >目标</i>
                <i style="font-style: normal;margin-left: 0px;" 
                > 
                  {{
                    nll_undefined((sel_title.quota_value.cont7*100).toFixed(1))+'%'  
                  }} 
                </i>
              </span>

              <span :style="sum_zhibiao.body">
                <i style="width: 35%; display: inline-block; font-style: normal"
                  >{{(this.sel_value.Range_on.Range_set=='2')?'占比':'达成'}}</i
                >
                <i style="font-style: normal" 
                  :style="Number(sel_title.quota_value.cont2) > 1?{color: '#ff4d4f'}:{color: '#008000'}"
                > 
                  {{
                    
                    (sel_title.quota_value.cont2*100)>1000?nll_undefined(((sel_title.quota_value.cont2*100)/10000).toFixed(1))+'w%':
                    (-1000)>(sel_title.quota_value.cont2*100)?nll_undefined(((sel_title.quota_value.cont2*100)/10000).toFixed(1))+'w%':
                    nll_undefined((sel_title.quota_value.cont2*100).toFixed(1))+'%'

                  }} 
                </i>
              </span>

            </div>

            <div
              @click="
                Single_choice(
                  'all_muri_value',
                  ['_this.initChart()','_this.echarts_clear=true'],
                  2,
                  '_this.sel_value.target'
                )
              "
              class="Productmarket_labqie_con2"
              :style="
                sel_value.target.all_muri_value == 2
                  ? Object.assign({}, click_css_hxzb_y, { 'margin-right': '0%', })
                  : Object.assign({}, click_css_hxzb_n, { 'margin-right': '0%', })
              "
            >
              <span
                :class="
                  sel_value.target.all_muri_value == 2 ? 'title_change' : ''
                "
                :style="sum_zhibiao.title"
                >线上</span
              >
              <span :style="sum_zhibiao.zhognxin">
                {{(this.sel_value.Range_on.Range_set=='2')?nll_undefined((sel_title.quota_value.cont3/10000).toFixed(1))+'万':nll_undefined((sel_title.quota_value.cont3*100).toFixed(1))+'%'}}
              </span>

              <span :style="sum_zhibiao.body">
                <i style="width: 35%; display: inline-block; font-style: normal"
                  >目标</i>
                <i style="font-style: normal;margin-left: 0px;" 
                > 
                  {{
                    nll_undefined((sel_title.quota_value.cont8*100).toFixed(1))+'%'  
                  }} 
                </i>
              </span>


              <span :style="sum_zhibiao.body">
                <i style="width: 35%; display: inline-block; font-style: normal"
                  >{{(this.sel_value.Range_on.Range_set=='2')?'占比':'达成'}}</i
                >

                <i style="font-style: normal"
                  :style="Number(sel_title.quota_value.cont4) > 1?{color: '#ff4d4f'}:{color: '#008000'}"
                >
                  {{
                    (sel_title.quota_value.cont4*100)>1000?nll_undefined(((sel_title.quota_value.cont4*100)/10000).toFixed(1))+'w%':
                    (-1000)>(sel_title.quota_value.cont4*100)?nll_undefined(((sel_title.quota_value.cont4*100)/10000).toFixed(1))+'w%':
                    nll_undefined((sel_title.quota_value.cont4*100).toFixed(1))+'%'
                  }}
                </i>
              </span>
            </div>

            <div
              @click="
                Single_choice(
                  'all_muri_value',
                  ['_this.initChart()','_this.echarts_clear=true'],
                  3,
                  '_this.sel_value.target'
                )
              "
              class="Productmarket_labqie_con3"
              :style="
                sel_value.target.all_muri_value == 3
                  ? Object.assign({}, click_css_hxzb_y, { 'margin-right': '0%','float': 'right' })
                  : Object.assign({}, click_css_hxzb_n, { 'margin-right': '0%','float': 'right' })
              "
            >
              <span
                :class="
                  sel_value.target.all_muri_value == 3 ? 'title_change' : ''
                "
                :style="sum_zhibiao.title"
                >线下</span
              >
              <span :style="sum_zhibiao.zhognxin">
                {{(this.sel_value.Range_on.Range_set=='2')?(sel_title.quota_value.cont5/10000).toFixed(1)+'万':(sel_title.quota_value.cont5*100).toFixed(1)+'%'}}
              </span>

              <span :style="sum_zhibiao.body">
                <i style="width: 35%; display: inline-block; font-style: normal"
                  >目标</i>
                <i style="font-style: normal;margin-left: 0px;" 
                > 
                  {{
                    (sel_title.quota_value.cont9*100).toFixed(1)+'%'  
                  }} 
                </i>
              </span>

              <span :style="sum_zhibiao.body">
                <i style="width: 35%; display: inline-block; font-style: normal"
                  >{{(this.sel_value.Range_on.Range_set=='2')?'占比':'达成'}}</i
                >

                <i style="font-style: normal"
                  :style="Number(sel_title.quota_value.cont6) > 1?{color: '#ff4d4f'}:{color: '#008000'}"
                >
                  {{
                    (sel_title.quota_value.cont6*100)>1000?((sel_title.quota_value.cont6*100)/10000).toFixed(1)+'w%':
                    (-1000)>(sel_title.quota_value.cont6*100)?((sel_title.quota_value.cont6*100)/10000).toFixed(1)+'w%':
                    (sel_title.quota_value.cont6*100).toFixed(1)+'%'
                  }}
                </i>
              </span>
            </div>

            <div style="clear: both; padding-bottom: 0px"></div>
          </div>
        </section>

        <!-- <div style="width: 100%; height: 10px;" :style="(sel_value.Range_on.Range_set!='3')? {'display': 'inline-table'}:{'display': 'none'}"></div> -->
        <!-- 核心指标结束 -->



        <!-- 财务KA开始 -->

        <section
          style="
            padding-top: 0px;
            padding-bottom: 16px;
            padding-bottom: 0px;
            background: #ffffff;
            border-radius: 4px;
            margin-left: 10px;
            margin-right: 10px;
          "
          :style="(sel_value.Range_on.Range_set=='3')? {'display': 'block'}:{'display': 'none'}"
        >
          <div class="target_info">
            <!-- <p
              style="
                padding: 0px;
                margin: 0px;
                padding-left: 10px;
                font-size: 12px;
              "
            >
              核心指标
            </p> -->

            <van-row class="target_info_body">
              <van-col span="12">
                <i class="target_info_text_i"><span>集团</span></i>
                <div
                  style="
                    border-right: 1px solid #eeeeee;
                    border-left: 0px solid #eeeeee;
                  "
                >
                  <span class="target_info_text_span">{{
                    (sel_title.quota_value.cont1/10000).toFixed(1)+'万'
                  }}</span>

                  <i class="target_info_text_iyoy">
                    <span
                      ><i>达成：</i>
                      <i
                        :class="
                          Number(sel_title.quota_value.cont2) > 0
                            ? 'rate-up'
                            : 'rate-down'
                        "
                        >{{
                          (sel_title.quota_value.cont2 * 100 || 0).toFixed(1) +
                          "%"
                        }}</i
                      >
                    </span></i
                  >


                </div>
              </van-col>

              <van-col span="12">
                <i class="target_info_text_i"><span>B店</span></i>
                <div>
                  <span class="target_info_text_span">{{
                    (sel_title.quota_value.cont4/10000).toFixed(1)+'万'
                  }}</span>
                  <i class="target_info_text_iyoy">
                    <span
                      ><i>环比：</i>
                      <i
                        :class="
                          Number(sel_title.quota_value.cont5) > 0
                            ? 'rate-up'
                            : 'rate-down'
                        "
                        >{{
                          (sel_title.quota_value.cont5 * 100 || 0).toFixed(1) +
                          "%"
                        }}</i
                      >
                    </span>
                  </i>



                </div>
              </van-col>
            </van-row>

            <van-row
              class="target_info_body"
              style="padding-top: 10px; padding-bottom: 13px"
            >
              <van-col span="12">
                <i class="target_info_text_i" style="padding-top: 0px;"> <span>D店</span></i>
                <div
                  style="
                    border-right: 1px solid #eeeeee;
                    border-left: 0px solid #eeeeee;
                  "
                >
                  <span class="target_info_text_span">{{
                    (sel_title.quota_value.cont7/10000).toFixed(1)+'万'
                  }}</span>
                  <i class="target_info_text_iyoy"
                    ><span
                      ><i>环比：</i>
                      <i
                        :class="
                          Number(sel_title.quota_value.cont8) > 0
                            ? 'rate-up'
                            : 'rate-down'
                        "
                        >{{
                          (sel_title.quota_value.cont8 * 100 || 0).toFixed(1) +
                          "%"
                        }}</i
                      ></span
                    ></i
                  >



                </div>
              </van-col>

              <van-col span="12">
                <i class="target_info_text_i" style="padding-top: 0px;"><span>火凤凰</span></i>
                <div>
                  <span class="target_info_text_span">{{
                    (sel_title.quota_value.cont10/10000).toFixed(1)+'万'
                  }}</span>
                  <i class="target_info_text_iyoy"
                    ><span
                      ><i>达成：</i>
                      <i
                        :class="
                        (sel_title.quota_value.cont11==0&&sel_value.Range_on.Range_set=='3')?
                        ''
                        :
                          Number(sel_title.quota_value.cont11) > 0
                            ? 'rate-up'
                            : 'rate-down'
                        "
                        >{{
                            (sel_title.quota_value.cont11==0&&sel_value.Range_on.Range_set=='3')? 
                            '--':(sel_title.quota_value.cont11 * 100 || 0).toFixed(1) +"%"
                        }}</i
                      >
                    </span></i
                  >


                </div>
              </van-col>
            </van-row>
          </div>
        </section>

        <!-- 财务KA结束 -->






        <!-- 交易成功日趋势开始 -->
        <section
          style="
            padding-top: 5px;
            padding-bottom: 5px;
            border-radius: 4px;
            margin-left: 10px;
            margin-right: 10px;
            margin-bottom: 0px;
          "
        >
          <div
            class="section-title"
            style="padding-left: 0px; padding-bottom: 0px; color: #000000"
          >
            {{(sel_value.Range_on.Range_set=='1')?(sel_value.day_set.day_1)?'采购毛利日趋势':'采购毛利月趋势'
            :(sel_value.Range_on.Range_set=='2')?'退款日趋势':'交易成功日趋势'}}
          </div>
        </section>

        <section
          style="
            padding-top: 10px;
            padding-bottom: 10px;
            background: #ffffff;
            border-radius: 4px;
            margin-left: 10px;
            margin-right: 10px;
            padding-left: 10px;
            padding-right: 10px;
          "
        >


              <!-- 图例开始 -->
              <!-- <i style="font-style: normal;display: block;height:40px;"></i>  padding-left: 10px; padding-right: 10px;margin-top: 10px;-->

              <i style="font-style: normal;display: block;height:40px; margin-bottom: 0px;">
              <van-row  type="flex" justify="center" :style="canvas_qiehuan.canvas_toli_kg==true?canvas_qiehuan.canvas_toli_cssy:canvas_qiehuan.canvas_toli_cssn">
                <!-- <van-col span="6">span: 6</van-col> -->
                <van-col span="8">
                  <div>
                    <div style="margin: 0 auto; width: 50px; height: 17px;">
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
    
                      <div style="font-size: 12px;"><span style="line-height: 18px;">当期</span></div>
                    </div>
                    <div style="text-align: center;">
                      <!-- <i style="width: 15px;height: 4px;display: block; margin-right: 6px;margin-top: 6px;float: left;"></i> -->
                      <span style="font-size: 12px; color: #FF3300;">{{ nll_undefined(barData.value) }}</span>
                    </div> 
                  </div>
                  <!-- <div></div> -->
                </van-col>

                <van-col span="8" v-if="sel_value.Range_on.Range_set=='111'">
                  <div>
                    <div style="margin: 0 auto; width: 50px; height: 17px;">
                      <div style="height: 17px;display: block;float: left;">
                        <div style="width: 100%; height: 8px;"></div>
                        <i style="width: 15px;height: 2px;background-color: #F5A028;display: block; margin-right: 6px;"></i>
                      </div>
                      <div style="font-size: 12px;"><span style="line-height: 18px;">同期</span></div>

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


          <div
            ref="chart" :style="canvas_css"
            style="padding-top: 10px;"
          ></div>
        </section>
        <!-- 交易成功日趋势结束 -->



        <!-- 火凤凰日趋势开始 -->
        <section
          style="
            padding-top: 5px;
            padding-bottom: 5px;
            border-radius: 4px;
            margin-left: 10px;
            margin-right: 10px;
            margin-bottom: 0px;
          "
          :style="(sel_value.Range_on.Range_set=='3')? {'display': 'block'}:{'display': 'none'}"
        >
          <div
            class="section-title"
            style="padding-left: 0px; padding-bottom: 0px; color: #000000"
          >
            火凤凰日趋势
          </div>
        </section>

        <section
          style="
            padding-top: 10px;
            padding-bottom: 10px;
            background: #ffffff;
            border-radius: 4px;
            margin-left: 10px;
            margin-right: 10px;
            padding-left: 10px;
            padding-right: 10px;
          "
          :style="(sel_value.Range_on.Range_set=='3')? {'display': 'block'}:{'display': 'none'}"
        >


          <div
            ref="chart4" :style="canvas_css"
            style="padding-top: 10px;"
          ></div>
        </section>
        <!-- 火凤凰日趋势结束 -->






        <!-- 交易成功月趋势开始 -->
        <section
          style="
            padding-top: 5px;
            padding-bottom: 5px;
            border-radius: 4px;
            margin-left: 10px;
            margin-right: 10px;
            margin-bottom: 0px;
          "
          :style="(sel_value.Range_on.Range_set=='3')? {'display': 'block'}:{'display': 'none'}"
        >
          <div
            class="section-title"
            style="padding-left: 0px; padding-bottom: 0px; color: #000000"
          >
            交易成功月趋势
          </div>
        </section>

        <section
          style="
            padding-top: 10px;
            padding-bottom: 10px;
            background: #ffffff;
            border-radius: 4px;
            margin-left: 10px;
            margin-right: 10px;
            padding-left: 10px;
            padding-right: 10px;
          "
          :style="(sel_value.Range_on.Range_set=='3')? {'display': 'block'}:{'display': 'none'}"
        >



          <div
            @touchstart="canvas_qiehuan.canvas_toli_kg = true"
            @touchend="canvas_qiehuan.canvas_toli_kg = false"
            ref="chart2" :style="canvas_css"
            style="padding-top: 0px;"
          ></div>
        </section>
        <!-- 交易成功月趋势结束 -->





        <!-- 渠道成本趋势开始 -->
        <section
          style="
            padding-top: 5px;
            padding-bottom: 5px;
            border-radius: 4px;
            margin-left: 10px;
            margin-right: 10px;
            margin-bottom: 0px;
            display: none;
          "
        >
          <div
            class="section-title"
            style="padding-left: 0px; padding-bottom: 0px; color: #000000"
          >
            出入库金额趋势
          </div>
        </section>

        <section
          style="
            padding-top: 6px;
            padding-bottom: 16px;
            padding-bottom: 0px;
            background: #ffffff;
            border-radius: 4px;
            margin-left: 10px;
            margin-right: 10px;
            display: none;
          "
        >
          <!-- <div
            class="section-title"
            style="padding-top: 10px; height: 20px; padding-bottom: 0px"
          >
            出入库金额趋势
          </div> -->

          <div
            ref="chart3"
            style="padding-top: 10px; width: 340px; height: 200px"
          ></div>
        </section>
        <!-- 渠道成本趋势结束 -->





        <!-- 退款类型详情开始 -->
        <section
          style="padding-top: 5px; padding-bottom: 5px; border-radius: 4px; ;margin-left: 10px;margin-right: 10px;margin-bottom: 0px;"
          :style="(sel_value.Range_on.Range_set=='1')? {'display': 'block'}:{'display': 'none'}"
        >
        <div
            class="section-title test_addd"
            style="padding-left: 0px; padding-bottom: 0px"
          >
            {{ (sel_value.day_set.month==true)? '近半年毛利明细':'最近7天毛利明细'}}
          </div>
        </section>

        <section
          style="padding-top: 10px; padding-bottom: 10px; border-radius: 4px; ;margin-left: 10px;margin-right: 10px;margin-bottom: 0px;background-color: #ffffff;"
          :style="(sel_value.Range_on.Range_set=='1')? {'display': 'block'}:{'display': 'none'}"
        >

          <!-- 具体表格开始 -->
          <ul
              id="table_all_new"
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
                  <li>日期</li>
                  <li>集团</li>
                  <li>线上</li>
                  <li>线下</li>
                  <!-- <li>未知</li> -->
                  <!-- <li>海外</li> -->
                </ul>
              </li>


              <li
                class="table_content"
                v-for="(val, key) in sel_title.detailed_table.detailed_value1"
                :key="key"  
              >
                <ul>

                  <li >{{ (val.dly_set_time)? (sel_value.day_set.month==true)?val.dly_set_time: val.dly_set_time.substring(5,10):'--' }}</li>
                  <li >{{ (val.group)?(val.group*100).toFixed(1)+'%':'--' }}</li>
                  <li >{{ (val.platform)?(val.platform*100).toFixed(1)+'%':'--' }}</li>
                  <li >{{ (val.directly)?(val.directly*100).toFixed(1)+'%':'--' }}</li>
                  <!-- <li >
                    <i style="font-style: normal;" >{{ (val.distribution)?(val.distribution*100).toFixed(1)+'%':'--' }}</i>
                  </li> -->

                  <!-- <li >
                    <i style="font-style: normal;" >{{ (val.overseas)?(val.overseas*100).toFixed(1)+'%':'--' }}</i>
                  </li> -->
    
                </ul>
              </li>


              
              <!-- <li
                class="table_content"
              >
                <ul>
                  <li >{{ 'asdasdas' }}</li>
                  <li >{{ '1235万' }}</li>
                  <li >{{ '88%' }}</li>
                  <li >{{ '34534万' }}</li>
                  <li >
                    <i style="font-style: normal;" >{{ '66%' }}</i>
                  </li>
                  <li >
                    <i style="font-style: normal;" >{{ '68%' }}</i>
                  </li>
                </ul>
              </li> -->




              <li style="clear: both"></li>
          </ul>
          <!-- 具体表格结束 -->
        </section>
        <!-- 退款类型详情结束 -->



        <!-- 退款类型详情开始 -->
        <section
          style="padding-top: 5px; padding-bottom: 5px; border-radius: 4px; ;margin-left: 10px;margin-right: 10px;margin-bottom: 0px;"
          :style="(sel_value.Range_on.Range_set=='1')? {'display': 'block'}:{'display': 'none'}"
        >
        <div
            class="section-title test_addd"
            style="padding-left: 0px; padding-bottom: 0px"
          >
            
            {{ (sel_value.day_set.month==true)? '近半年店铺毛利':'最近7天店铺毛利'}}
          </div>
        </section>

        <section
          style="padding-top: 10px; padding-bottom: 10px; border-radius: 4px; ;margin-left: 10px;margin-right: 10px;margin-bottom: 0px;background-color: #ffffff;"
          :style="(sel_value.Range_on.Range_set=='1')? {'display': 'block'}:{'display': 'none'}"
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
                  <li>日期</li>
                  <li>B店</li>
                  <li>D店</li>
                  <li>京东</li>
                  <li>苏宁</li>
                  <li>唯品</li>
                </ul>
              </li>


              <!--  +'万'  -->
              <li
                class="table_content"
                v-for="(val, key) in sel_title.detailed_table.detailed_value2"
                :key="key"  
              >
                <ul>

                  <li >{{ (val.dly_set_time)? (sel_value.day_set.month==true)?val.dly_set_time: val.dly_set_time.substring(5,10):'--' }}</li> 
                  <li >{{ (val.group)?(val.group*100).toFixed(1)+'%':'--' }}</li>
                  <li >{{ (val.platform)?(val.platform*100).toFixed(1)+'%':'--' }}</li>
                  <li >{{ (val.directly)?(val.directly*100).toFixed(1)+'%':'--' }}</li>
                  <li >{{ (val.directly)?(val.distribution*100).toFixed(1)+'%':'--' }}</li>
                  <li >{{ (val.directly)?(val.overseas*100).toFixed(1)+'%':'--' }}</li>  

                  <!-- <li >
                    <i style="font-style: normal;" >{{ (val.overseas)?val.overseas.toFixed(2):'--' }}</i>
                  </li> -->
    
                </ul>
              </li>


              <!-- <li
                class="table_content"
              >
                <ul>

                  <li >{{ 'asdasdas' }}</li>
                  <li >{{ '1235万' }}</li>
                  <li >{{ '88%' }}</li>
                  <li >{{ '34534万' }}</li>
                  <li >
                    <i style="font-style: normal;" >{{ '66%' }}</i>
                  </li>
    
                </ul>
              </li> -->



              <li style="clear: both"></li>
          </ul>
          <!-- 具体表格结束 -->
        </section>
        <!-- 退款类型详情结束 -->


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
import "echarts/lib/chart/gauge";
import "echarts/lib/chart/pie";
import "echarts/lib/component/legend";
import "echarts/lib/component/tooltip";

import { mapState } from "vuex";
import {
  decimal2Percent,
  calcSignClass,
  generatePromise,
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
  Icon,
} from "vant";

export default {
  name: "Financial_con",
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
    [Icon.name]:Icon,
    BottomCss:bottom_css
  },

  data() {
    return {
      isLoading: false,
      activeNames: "1",
      activeNames_tips:['1'],


      question_show: false,

      adasd: true,
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

        qudao_guanjan: {
          qudao_guanj_pd: "1",
        },
        ssyjqs: {
          ssyjqs_pd: "1",
        },
        yjdcqs: {
          yjdcqs_pd: "1",
          disabled1: true,
          disabled2: false,
          disabled3: false,
          disabled_value: "1",
        },
        ddqs: {
          ddqs_pd: "1",
        },
        zffhyjkj_set: {
          zffhyjkj_set_pd: "1",
        },
        swiper_num: 0,
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
          height: "21px",
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

      click_css_set: { type: "info", color: "rgba(89, 178, 178, 1)" },
      click_css_no: { type: "default", color: "" },
      click_css_no_grey: { type: "default", color: "#CCCCCC" },

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

          cont7: 0,
          cont8: 0,
          cont9: 0,
          cont10: 0,
          cont11: 0,
          cont12: 0,
        }, //六大指标的
        detailed_table:{
          detailed_value1:'',
          detailed_value2:'',
        },
        yjfl_value: {}, //业绩分类表
        ybb_value: {
          cont1: 0,
          cont2: 0,
          percentage: 0,
        }, //仪表盘的
        yjdcqs_tabel: {
          yjdcqs_total: "",
          yjdcqs_online_channel: "",
          yjdcqs_off_channel: "",
        }, //业绩达成趋势表
      },

      click_css_hxzb_y: {
        width: "33%",
        float: "left",
        // color:"#FFFFFF",
        color: "#000000",
        border: "1px solid #23B0A8",

        "padding-bottom": "5px",
        "border-radius": "4px",
        "margin-right": "1.5%",
        // "padding-left": "5px",
        "padding-left": "0px",
      },
      click_css_hxzb_n: {
        width: "33%",
        float: "left",

        color: "#000000",

        // "border-top": "2px solid #dddddd",
        "background-color": "#F7F7F7",
        "border-radius": "4px",
        "padding-bottom": "5px",
        "margin-right": "1.5%",
        // "padding-left": "5px",
        "padding-left": "0px",
        border: "1px solid #F7F7F7",
      },

      hexinzhibiao: {
        width: "",
      },

      whole_css: {
        yjdc_yjkj: {
          padding: "10px",
          "padding-top": "6px",
          display: "block",
        },
        yjdc_yjkj_n: {
          padding: "10px",
          "padding-top": "6px",
          display: "none",
        },

        qudao_guanjan: {
          background: "rgb(89, 178, 178)",

          color: "rgb(255, 255, 255)",
        },
        qudao_guanjan_n: {
          background: "rgb(230, 230, 230)",
        },
        border_left: {
          "border-top-left-radius": "4px",
          "border-bottom-left-radius": "4px",
        },
        border_right: {
          "border-top-right-radius": "4px",
          "border-bottom-right-radius": "4px",
        },
        border_left_right: {
          "border-left": "1px solid #f7f7f7",
          "border-right": "1px solid #f7f7f7",
        },
        zffhyjkj: {
          "padding-top": "5px",
          "padding-bottom": "5px",
          "text-align": "center",
          "background-color": "#59b2b2",
          color: "#ffffff",
          "font-size": "12px",
        },
        zffhyjkj_n: {
          "padding-top": "5px",
          "padding-bottom": "5px",
          "text-align": "center",
          "background-color": "#f7f7f7",
          color: "#000000",
          "font-size": "12px",
        },
      },
      chart_css: {
        dashboard: {
          "padding-top": "0px",
          display: "block",
        },
        dashboard_n: {
          "padding-top": "0px",
          display: "none",
        },
        yjfl_css: {
          "padding-top": "6px",
          "padding-bottom": "6px",
          background: "#ffffff",
          "border-radius": "4px",
          "margin-left": "10px",
          "margin-right": "10px",
          display: "block",
        },
        yjfl_css_n: {
          "padding-top": "6px",
          "padding-bottom": "6px",
          background: "#ffffff",
          "border-radius": "4px",
          "margin-left": "10px",
          "margin-right": "10px",
          display: "none",
        },
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

      barData: {
        value: 0,
        ago_value: 0,
        month: 0,
      },


      canvas_css: {
        width: "",
        height: "200px",
      },
      yjdc_css: {
        width: "100px",
        // "background-color": "#e6e6e6"
      },

      data_load_time:"",

      data: {

      // 采购毛利
      "FIN_GPR_MID-DLY_TRND_B_GPR": "",
      "FIN_GPR_MID-DLY_TRND_JD_GPR": "",
      "FIN_GPR_MID-DLY_TRND_JT_GPR": "",  

      "FIN_GPR_MID-MLY_TRND_B_GPR": "",
      "FIN_GPR_MID-MLY_TRND_JD_GPR": "",
      "FIN_GPR_MID-MLY_TRND_JT_GPR": "",

      "FIN_GPR_TOP-DLY_B_GPR": "",
      "FIN_GPR_TOP-DLY_JD_GPR": "",
      "FIN_GPR_TOP-DLY_JT_GPR": "",
      "FIN_GPR_MID-DLY_TRND_GPR": "",
      "FIN_GPR_BTM-DLY_WEEK_GPR": "",
      "FIN_GPR_TOP-MLY_B_GPR": "",
      "FIN_GPR_TOP-MLY_JD_GPR": "",
      "FIN_GPR_TOP-MLY_JT_GPR": "",
      "FIN_GPR_MID-MLY_TRND_GPR": "",
      "FIN_GPR_BTM-MLY_HALF_Y_GPR": "",


      // 退款费用
      // "FIN_RFND-OTHERS": "",
      // "FIN_RFND-DLVR_PRPRT": "",
      // "FIN_RFND-DLVR_TOT": "",
      // "FIN_RFND-DISCOUNT_AMT": "",
      // "FIN_RFND-ADVERT_DSCNT": "",
      // "FIN_RFND-DLY_PAY": "",
      // "FIN_RFND-STAGE_DSCNT": "",
      // "FIN_RFND-NPR_DSCNT": "",
      // "FIN_RFND-RFND_SUM": "",
      // "FIN_RFND-EXCTTN_DSCNT": "",
      // "FIN_RFND-CMPNST": "",
      // "FIN_RFND-XCHG": "",
      // "FIN_RFND-RTN": "",

      "FIN_RFND_BTM-DLY_MON_RFND": "",
      "FIN_RFND_TOP-DLY_B_RFND": "",
      "FIN_RFND_TOP-DLY_JD_RFND": "",
      "FIN_RFND_TOP-DLY_JT_RFND": "",
      "FIN_RFND_MID-DLY_TRND_RFND": "",
      "FIN_RFND_BTM-MLY_YEAR_RFND": "",
      "FIN_RFND_TOP-MLY_B_RFND": "",
      "FIN_RFND_TOP-MLY_JD_RFND": "",
      "FIN_RFND_TOP-MLY_JT_RFND": "",
      "FIN_RFND_MID-MLY_TRND_FRND": "",


      // 盈利
      "FIN_KA-B_REACH_RATE": "",
      "FIN_KA-D_REACH_RATE": "",
      "FIN_KA-HFH_REACH_RATE": "",
      "FIN_KA-HFH_DAY_TREND": "",
      "FIN_KA-ALL_REACH_RATE": "",
      
      "FIN_KA-MONTH_TREND": "",
      "FIN_KA-DAY_TREND": "",

      },
      echarts_clear:false,

    };
  },

  computed: {
    ...mapState("user", ["permissionList"]), //大概的意思是获取权限
  },

  created() {
    this.hexinzhibiao.width = window.innerWidth - 30 + "px";
    this.canvas_css.width = window.innerWidth - 20-20 + "px";

    this.$EventBus.$emit("data_loay_set", {
      data_loay_seton: false,
    });

    

    // const [p1, resolve1] = generatePromise();
    // // this.p1 = p1;
    // const [p2,resolve2]= generatePromise();
    // const [p3,resolve3]= generatePromise();
    // this.p1= Promise.all([p1,p2,p3]);




    const apiMap2 = {

      // 采购毛利        
      "SQL-FIN_GPR_MID-DLY_TRND_NL_GPR": { resultProp: "DLY_TRND_NL_GPR" },  //线上趋势  
      "SQL-FIN_GPR_MID-DLY_TRND_FL_GPR": { resultProp: "DLY_TRND_FL_GPR" },  //线下趋势
      "SQL-FIN_GPR_MID-DLY_TRND_JT_GPR": { resultProp: "DLY_TRND_JT_GPR" },   //集团趋势

      "SQL-FIN_GPR_MID-MLY_TRND_NL_GPR": { resultProp: "MLY_TRND_NL_GPR" },    //线上月趋势
      "SQL-FIN_GPR_MID-MLY_TRND_FL_GPR": { resultProp: "MLY_TRND_FL_GPR" },    //线下月趋势
      "SQL-FIN_GPR_MID-MLY_TRND_JT_GPR": { resultProp: "MLY_TRND_JT_GPR" },    //集团月趋势

      // "SQL-FIN_GPR_TOP-DLY_B_GPR": { resultProp: "DLY_B_GPR" },
      "SQL-FIN_GPR_TOP-DLY_NL_GPR": { resultProp: "DLY_NL_GPR" },  //线上毛利
      // "SQL-FIN_GPR_TOP-DLY_JD_GPR": { resultProp: "DLY_JD_GPR" },
      "SQL-FIN_GPR_TOP-DLY_FL_GPR": { resultProp: "DLY_FL_GPR" },  //线下毛利
      "SQL-FIN_GPR_TOP-DLY_JT_GPR": { resultProp: "DLY_JT_GPR" },  //集团日指标
      "SQL-FIN_GPR_BTM-DLY_WEEK_GPR": { resultProp: "DLY_WEEK_GPR" },   //7天明细

      "SQL-FIN_GPR_TOP-MLY_NL_GPR": { resultProp: "MLY_NL_GPR" },   //线上月指标
      "SQL-FIN_GPR_TOP-MLY_FL_GPR": { resultProp: "MLY_FL_GPR" },   //线下月指标
      "SQL-FIN_GPR_TOP-MLY_JT_GPR": { resultProp: "MLY_JT_GPR" },   //集团月指标

      "SQL-FIN_GPR_BTM-MLY_HALF_Y_GPR": { resultProp: "MLY_HALF_Y_GPR" },  //月半年明细

      "SQL-FIN_GPR-FIN_GPR_LAOD_TIME": { resultProp: "FIN_GPR_LAOD_TIME" },


      "SQL-FIN_GPR_BTM-DLY30_SP_GPR": { resultProp: "DLY30_SP_GPR" },
      "SQL-FIN_GPR_BTM-MLY6_SP_GPR": { resultProp: "MLY6_SP_GPR" },

    



    };


    this.ajax_data(apiMap2);



    // console.log(this.data)

    // console.log(generatePromise);

    console.log(decimal2Percent);
    console.log(calcSignClass);
  },

  mounted() {
    this.$EventBus.$on("Financial_choice_f", (Range_value_set) => {
      console.log("父类传值过来的！！！！财务1");
      console.log(Range_value_set);

      let set_value = "";
      this.sel_value.Range_on.Range_set = Range_value_set.Range_value_set;
      switch (Range_value_set.Range_value_set) {
        case "1":
          set_value = "cpcy";
          this.Single_choice(set_value,['_this.data_Financial()','_this.initChart()'],true,'_this.sel_value.theme');
          this.echarts_clear=true;
          break;

      }


    });


    console.log("============运行到财务！！！！============");
    // this.Single_choice('day_1','',true,'_this.sel_value.day_set');
    // console.log(this.sel_value.day_set.day_1);


    this.sel_value.Range_on.Range_set='1';

    this.Single_choice('all_muri_value','',1,'_this.sel_value.target');




    this.data_Financial();
    this.initChart();
    // this.initChart2();
    // this.initChart3();
    // this.initChart4();
    
  },

  methods: {

    onRefresh() {

      this.$EventBus.$emit("data_loay_set", {
        data_loay_seton: false,
      });
      let apiMap3 = {
        // 采购毛利        
        "SQL-FIN_GPR_MID-DLY_TRND_NL_GPR": { resultProp: "DLY_TRND_NL_GPR" },  //线上趋势  
        "SQL-FIN_GPR_MID-DLY_TRND_FL_GPR": { resultProp: "DLY_TRND_FL_GPR" },  //线下趋势
        "SQL-FIN_GPR_MID-DLY_TRND_JT_GPR": { resultProp: "DLY_TRND_JT_GPR" },   //集团趋势
        "SQL-FIN_GPR_MID-MLY_TRND_NL_GPR": { resultProp: "MLY_TRND_NL_GPR" },    //线上月趋势
        "SQL-FIN_GPR_MID-MLY_TRND_FL_GPR": { resultProp: "MLY_TRND_FL_GPR" },    //线下月趋势
        "SQL-FIN_GPR_MID-MLY_TRND_JT_GPR": { resultProp: "MLY_TRND_JT_GPR" },    //集团月趋势
        // "SQL-FIN_GPR_TOP-DLY_B_GPR": { resultProp: "DLY_B_GPR" },
        "SQL-FIN_GPR_TOP-DLY_NL_GPR": { resultProp: "DLY_NL_GPR" },  //线上毛利
        // "SQL-FIN_GPR_TOP-DLY_JD_GPR": { resultProp: "DLY_JD_GPR" },
        "SQL-FIN_GPR_TOP-DLY_FL_GPR": { resultProp: "DLY_FL_GPR" },  //线下毛利
        "SQL-FIN_GPR_TOP-DLY_JT_GPR": { resultProp: "DLY_JT_GPR" },  //集团日指标
        "SQL-FIN_GPR_BTM-DLY_WEEK_GPR": { resultProp: "DLY_WEEK_GPR" },   //7天明细
        "SQL-FIN_GPR_TOP-MLY_NL_GPR": { resultProp: "MLY_NL_GPR" },   //线上月指标
        "SQL-FIN_GPR_TOP-MLY_FL_GPR": { resultProp: "MLY_FL_GPR" },   //线下月指标
        "SQL-FIN_GPR_TOP-MLY_JT_GPR": { resultProp: "MLY_JT_GPR" },   //集团月指标
        "SQL-FIN_GPR_BTM-MLY_HALF_Y_GPR": { resultProp: "MLY_HALF_Y_GPR" },  //月半年明细
        "SQL-FIN_GPR-FIN_GPR_LAOD_TIME": { resultProp: "FIN_GPR_LAOD_TIME" },
        "SQL-FIN_GPR_BTM-DLY30_SP_GPR": { resultProp: "DLY30_SP_GPR" },
        "SQL-FIN_GPR_BTM-MLY6_SP_GPR": { resultProp: "MLY6_SP_GPR" },
      };
      this.ajax_data(apiMap3);

      this.p1.then(() => {
        this.isLoading = false;
        this.data_Financial();
        this.initChart();
      });

    },

    showPopup_sm(){
      this.question_show=true;
    },

    showPopup_close(){
      this.activeNames_tips=[];
    },

    data_Financial() {
      this.p1.then(() => {
        console.log("运行到数据填充栏========================");

        if(this.sel_value.Range_on.Range_set=='1'){
          // console.log(this.sel_value.Range_on.Range_set);

          
          // console.log(this.data["FIN_GPR_TOP-DLY_JT_GPR"]);
          //  console.log(this.data["FIN_GPR_TOP-DLY_JT_GPR"][0].SUM_GPR_LCK);


          // 做T+1处理开始
          // let year_now_time=new Date();
          let _time_now=new Date();
          _time_now=_time_now.getTime()-(24*60*60*1000);
          _time_now=new Date(_time_now);
          // 做T+1处理结束


          if(this.sel_value.day_set.day_1==true){
            //集团
            this.sel_title.quota_value.cont1= this.data["FIN_GPR_TOP-DLY_JT_GPR"][0].SUM_GPR_LCK||0;
            this.sel_title.quota_value.cont2= this.data["FIN_GPR_TOP-DLY_JT_GPR"][0].CPR||0;  
            this.sel_title.quota_value.cont7= this.data["FIN_GPR_TOP-DLY_JT_GPR"][0].GPR_TAR_LCK||0;  


            //B店   
            this.sel_title.quota_value.cont3= this.data["FIN_GPR_TOP-DLY_NL_GPR"][0].SUM_GPR_LCK||0;
            this.sel_title.quota_value.cont4= this.data["FIN_GPR_TOP-DLY_NL_GPR"][0].RATE||0; 
            this.sel_title.quota_value.cont8= this.data["FIN_GPR_TOP-DLY_NL_GPR"][0].SP_GPR_TAR_LCK||0; 
            //京东 
            this.sel_title.quota_value.cont5= this.data["FIN_GPR_TOP-DLY_FL_GPR"][0].SUM_GPR_LCK||0;
            this.sel_title.quota_value.cont6= this.data["FIN_GPR_TOP-DLY_FL_GPR"][0].RATE||0; 
            this.sel_title.quota_value.cont9= this.data["FIN_GPR_TOP-DLY_FL_GPR"][0].SP_GPR_TAR_LCK||0; 


            this.data["FIN_GPR_BTM-DLY_WEEK_GPR"].sort((a, b) => {
                let a_time = "";
                let b_time = "";
                a_time = new Date(a["YMD"]).getTime(new Date(a["YMD"]));
                b_time = new Date(b["YMD"]).getTime(new Date(b["YMD"]));
                return b_time - a_time;
            });

            this.sel_title.detailed_table.detailed_value1=this.Data_reassembly(
              'YMD',
              this.data["FIN_GPR_BTM-DLY_WEEK_GPR"],
              ['group','platform','directly','distribution','overseas'],
              ['集团','线上','线下','未知','海外经销'],
              'ONOFF_LINE_FLAG',
              'SUM_GPR_LCK');  



            Object.keys(this.sel_title.detailed_table.detailed_value1).forEach((key_value_time) => {
              this.sel_title.detailed_table.detailed_value1[key_value_time].dly_set_time=
              this.sel_title.detailed_table.detailed_value1[key_value_time].dly_set_time.split("-")[0]+'.'+
              this.sel_title.detailed_table.detailed_value1[key_value_time].dly_set_time.split("-")[1]+'.'+
              this.sel_title.detailed_table.detailed_value1[key_value_time].dly_set_time.split("-")[2]
            });


            //关键店铺毛利
            this.sel_title.detailed_table.detailed_value2=[];
            this.data["FIN_GPR_BTM-DLY30_SP_GPR"].sort((a, b) => {
                let a_time = "";
                let b_time = "";
                a_time = new Date(a["YMD"]).getTime(new Date(a["YMD"]));
                b_time = new Date(b["YMD"]).getTime(new Date(b["YMD"]));
                return b_time - a_time;
            });

            this.sel_title.detailed_table.detailed_value2=this.Data_reassembly(
              'YMD',
              this.data["FIN_GPR_BTM-DLY30_SP_GPR"],
              ['group','platform','directly','distribution','overseas'],
              ['B店','D店','京东','苏宁','唯品'],
              'SHOP_NAME',
              'SUM_GPR_LCK'); 

            Object.keys(this.sel_title.detailed_table.detailed_value2).forEach((key_value_time2) => {
              this.sel_title.detailed_table.detailed_value2[key_value_time2].dly_set_time=
              this.sel_title.detailed_table.detailed_value2[key_value_time2].dly_set_time.split("-")[0]+'.'+
              this.sel_title.detailed_table.detailed_value2[key_value_time2].dly_set_time.split("-")[1]+'.'+
              this.sel_title.detailed_table.detailed_value2[key_value_time2].dly_set_time.split("-")[2]
            });

            // console.log("===========店铺，毛利！！！============");
            // console.log(this.data["FIN_GPR_BTM-DLY30_SP_GPR"]);
            // console.log(this.sel_title.detailed_table.detailed_value2);








              


            // 做T+1处理开始
            this.set_time_range.start= _time_now.getFullYear() +"." +(_time_now.getMonth() + 1 >= 1 && _time_now.getMonth() + 1 <= 9? "0" + (_time_now.getMonth() + 1): _time_now.getMonth() + 1) +'.'+_time_now.getDate();
            // 做T+1处理结束

            // console.log(time_t1_on);




          }else if(this.sel_value.day_set.month==true){
            // FIN_GPR_TOP-MLY_JT_GPR
            //集团
            this.sel_title.quota_value.cont1= this.data["FIN_GPR_TOP-MLY_JT_GPR"][0].SUM_GPR_LCK||0;
            this.sel_title.quota_value.cont2= this.data["FIN_GPR_TOP-MLY_JT_GPR"][0].RATE||0; 
            this.sel_title.quota_value.cont7= this.data["FIN_GPR_TOP-MLY_JT_GPR"][0].SP_GPR_TAR_LCK||0;   

            //B店 
            this.sel_title.quota_value.cont3= this.data["FIN_GPR_TOP-MLY_NL_GPR"][0].SUM_GPR_LCK||0;
            this.sel_title.quota_value.cont4= this.data["FIN_GPR_TOP-MLY_NL_GPR"][0].RATE||0;
            this.sel_title.quota_value.cont8= this.data["FIN_GPR_TOP-MLY_NL_GPR"][0].SP_GPR_TAR_LCK||0;    
            //京东  
            this.sel_title.quota_value.cont5= this.data["FIN_GPR_TOP-MLY_FL_GPR"][0].SUM_GPR_LCK||0;
            this.sel_title.quota_value.cont6= this.data["FIN_GPR_TOP-MLY_FL_GPR"][0].RATE||0; 
            this.sel_title.quota_value.cont9= this.data["FIN_GPR_TOP-MLY_FL_GPR"][0].SP_GPR_TAR_LCK||0;   

            

            this.data["FIN_GPR_BTM-MLY_HALF_Y_GPR"].sort((a, b) => {
                let a_time = "";
                let b_time = "";
                a_time = new Date(a["YM"]).getTime(new Date(a["YM"]));
                b_time = new Date(b["YM"]).getTime(new Date(b["YM"]));
                return b_time - a_time;
            });
            // console.log(this.data["FIN_GPR_BTM-MLY_HALF_Y_GPR"]);

            this.sel_title.detailed_table.detailed_value1=this.Data_reassembly(
              'YM',
              this.data["FIN_GPR_BTM-MLY_HALF_Y_GPR"],
              ['group','platform','directly','distribution','overseas'],
              ['集团','线上','线下','未知','海外经销'],
              'ONOFF_LINE_FLAG',
              'SUM_GPR_LCK');

            Object.keys(this.sel_title.detailed_table.detailed_value1).forEach((key_value_time) => {
              this.sel_title.detailed_table.detailed_value1[key_value_time].dly_set_time=
              this.sel_title.detailed_table.detailed_value1[key_value_time].dly_set_time.split("-")[0]+'.'+
              this.sel_title.detailed_table.detailed_value1[key_value_time].dly_set_time.split("-")[1]

            });


            //关键店铺毛利
            this.sel_title.detailed_table.detailed_value2=[];
            this.data["FIN_GPR_BTM-MLY6_SP_GPR"].sort((a, b) => {
                let a_time = "";
                let b_time = "";
                a_time = new Date(a["YM"]).getTime(new Date(a["YM"]));
                b_time = new Date(b["YM"]).getTime(new Date(b["YM"]));
                return b_time - a_time;
            });

            this.sel_title.detailed_table.detailed_value2=this.Data_reassembly(
              'YM',
              this.data["FIN_GPR_BTM-MLY6_SP_GPR"],
              ['group','platform','directly','distribution','overseas'],
              ['B店','D店','京东','苏宁','唯品'],
              'SHOP_NAME',
              'SUM_GPR_LCK'); 

            Object.keys(this.sel_title.detailed_table.detailed_value2).forEach((key_value_time2) => {
              this.sel_title.detailed_table.detailed_value2[key_value_time2].dly_set_time=
              this.sel_title.detailed_table.detailed_value2[key_value_time2].dly_set_time.split("-")[0]+'.'+
              this.sel_title.detailed_table.detailed_value2[key_value_time2].dly_set_time.split("-")[1]
            });

            // console.log("===========店铺，毛利！！！============");
            // console.log(this.sel_title.detailed_table.detailed_value2);
            // console.log(this.data["FIN_GPR_BTM-MLY6_SP_GPR"]);


            // 做T+1处理开始
            this.set_time_range.start= _time_now.getFullYear() +"年" +(_time_now.getMonth() + 1 >= 1 && _time_now.getMonth() + 1 <= 9? "0" + (_time_now.getMonth() + 1): _time_now.getMonth() + 1)+'月';
            // 做T+1处理结束


          }



          this.data_load_time=(typeof(this.data["FIN_GPR-FIN_GPR_LAOD_TIME"])!='undefined'&&typeof(this.data["FIN_GPR-FIN_GPR_LAOD_TIME"][0])!='undefined')? 
            this.data["FIN_GPR-FIN_GPR_LAOD_TIME"][0].LOAD_TIME.substring(0,4)+'.'
            +this.data["FIN_GPR-FIN_GPR_LAOD_TIME"][0].LOAD_TIME.substring(5,7)+'.'
            +this.data["FIN_GPR-FIN_GPR_LAOD_TIME"][0].LOAD_TIME.substring(8,10)
            :0;


          

        }else if(this.sel_value.Range_on.Range_set=='2'){

          // FIN_RFND_TOP	DLY_B_RFND  B店
          // FIN_RFND_TOP	DLY_JD_RFND 京东店
          // FIN_RFND_TOP	DLY_JT_RFND 集团

          console.log("============退款费用===============");

          console.log(this.data["FIN_RFND_TOP-DLY_JT_RFND"]);
          // console.log(this.data["FIN_RFND_TOP-DLY_B_RFND"]);
          // console.log(this.data["FIN_RFND_TOP-DLY_JD_RFND"]);

          // console.log(this.data["FIN_RFND_TOP-MLY_JT_RFND"]);



          if(this.sel_value.day_set.day_1==true){
            // console.log(this.sel_value.Range_on.Range_set);

            //集团
            this.sel_title.quota_value.cont1= this.data["FIN_RFND_TOP-DLY_JT_RFND"][0].DTD_AMT||0;
            this.sel_title.quota_value.cont2= this.data["FIN_RFND_TOP-DLY_JT_RFND"][0].PRP_RATE||0;      
            //B店   
            this.sel_title.quota_value.cont3= this.data["FIN_RFND_TOP-DLY_B_RFND"][0].DTD_AMT||0;
            this.sel_title.quota_value.cont4= this.data["FIN_RFND_TOP-DLY_B_RFND"][0].PRP_RATE||0; 
            //京东 
            this.sel_title.quota_value.cont5= this.data["FIN_RFND_TOP-DLY_JD_RFND"][0].DTD_AMT||0;
            this.sel_title.quota_value.cont6= this.data["FIN_RFND_TOP-DLY_JD_RFND"][0].PRP_RATE||0; 

            
            // console.log(this.data["FIN_RFND_BTM-DLY_MON_RFND"]);
            this.data["FIN_RFND_BTM-DLY_MON_RFND"].sort((a, b) => {
                let a_time = "";
                let b_time = "";
                a_time = (a["MTD_AMT"]); 
                b_time = (b["MTD_AMT"]);
                return b_time-a_time; 
            });
            this.sel_title.detailed_table.detailed_value2=this.data["FIN_RFND_BTM-DLY_MON_RFND"];


          }else if(this.sel_value.day_set.month==true){
            // console.log(this.sel_value.Range_on.Range_set);


            //集团
            this.sel_title.quota_value.cont1= this.data["FIN_RFND_TOP-MLY_JT_RFND"][0].MTD_AMT||0;
            this.sel_title.quota_value.cont2= this.data["FIN_RFND_TOP-MLY_JT_RFND"][0].PRP_RATE||0;      
            //B店   
            this.sel_title.quota_value.cont3= this.data["FIN_RFND_TOP-MLY_B_RFND"][0].MTD_AMT||0;
            this.sel_title.quota_value.cont4= this.data["FIN_RFND_TOP-MLY_B_RFND"][0].PRP_RATE||0; 
            //京东 
            this.sel_title.quota_value.cont5= this.data["FIN_RFND_TOP-MLY_JD_RFND"][0].MTD_AMT||0;
            this.sel_title.quota_value.cont6= this.data["FIN_RFND_TOP-MLY_JD_RFND"][0].PRP_RATE||0;


            // console.log(this.data["FIN_RFND_BTM-MLY_YEAR_RFND"]);
            this.data["FIN_RFND_BTM-MLY_YEAR_RFND"].sort((a, b) => {
                let a_time = "";
                let b_time = "";
                a_time = (a["MTD_AMT"]); 
                b_time = (b["MTD_AMT"]);
                return a_time-b_time; 
            });

            this.sel_title.detailed_table.detailed_value2=this.data["FIN_RFND_BTM-MLY_YEAR_RFND"];

            


          }



        }else if(this.sel_value.Range_on.Range_set=='3'){

          console.log(this.sel_value.Range_on.Range_set);
          // "！！集团"
          this.sel_title.quota_value.cont1 =this.data["FIN_KA-ALL_REACH_RATE"][0].集团年交易||0;
          this.sel_title.quota_value.cont2 = this.data["FIN_KA-ALL_REACH_RATE"][0].达成||0;
          this.sel_title.quota_value.cont3 = 0.89;
          // "！！B点"
          this.sel_title.quota_value.cont4 = this.data["FIN_KA-B_REACH_RATE"][0].B店年交易||0;  
          this.sel_title.quota_value.cont5 = this.data["FIN_KA-B_REACH_RATE"][0].达成||0;  
          this.sel_title.quota_value.cont6 = 0.0568;

          // "！！D店"
          this.sel_title.quota_value.cont7 = this.data["FIN_KA-D_REACH_RATE"][0].D店年交易||0;  
          this.sel_title.quota_value.cont8 = this.data["FIN_KA-D_REACH_RATE"][0].达成||0;  
          this.sel_title.quota_value.cont9 = 0.568;

          // "！！火凤凰"
          this.sel_title.quota_value.cont10 = this.data["FIN_KA-HFH_REACH_RATE"][0].火凤凰年交易||0; 
          this.sel_title.quota_value.cont11 = this.data["FIN_KA-HFH_REACH_RATE"][0].达成||0;
          this.sel_title.quota_value.cont12 = 0.75;          

        }





        // console.log(this.sel_title.quota_value.cont1);
        // console.log(this.data["FIN_KA-DAY_TREND"]);

        // LC_PL-LC_PERIOD
        // LC_INV-STOCK_AMT
      });
    },

    //行转列开始
    Data_reassembly(field,data,data_column_en,data_column_cn,Input_name,Input_value){
      let dly_arr=[];
      let dly_arr_push=[];
      let dly_arr_push_assign={};
      let dly_time=[];
      let set_cn_value={};
      let name_length=false;

      Object.keys(data).forEach((key_value_dly) => {
        dly_time.push(data[key_value_dly][field]);
      });
      dly_time=this.unique(dly_time);

      if(data_column_en.length==data_column_cn.length){
        name_length=true;
      }else{
        name_length=false;
      }

      Object.keys(dly_time).forEach((key_value_time) => {
        dly_arr_push=[];
        dly_arr_push_assign=Object.assign({},dly_arr_push_assign,{dly_set_time:dly_time[key_value_time]});
        Object.keys(data).forEach((key_dly_data) => {
          if(dly_time[key_value_time]==data[key_dly_data][field]){

            Object.keys(data_column_cn).forEach((key_cn_value) => {
              if(data[key_dly_data][Input_name]==data_column_cn[key_cn_value]){
                if(name_length==true){
                  set_cn_value[data_column_en[key_cn_value]]=data[key_dly_data][Input_value];
                }else{
                  set_cn_value[data_column_cn[key_cn_value]]=data[key_dly_data][Input_value];
                }
                dly_arr_push.push(set_cn_value); 
                dly_arr_push_assign=Object.assign({},dly_arr_push_assign,dly_arr_push[key_cn_value]);
                
              }
            });

          }
        });

        dly_arr.push(dly_arr_push_assign);

      });

      // console.log(dly_arr);
      // console.log(set_cn_value);
      return dly_arr
    },
    //行转列结束



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





    initChart() {
      this.chartIns = echarts.init(this.$refs["chart"]);

      let _time_now=new Date();
      // let year_now = _time_now;
      // year_now = year_now.getFullYear();


      this.p1.then(() => {

        if(this.echarts_clear==true){
          this.chartIns.clear();
          this.echarts_clear=false;
        }     

        let hour_data = [];
        let sale_amt = [];  //出库金额
        let ago_amt = [];  //入库金额
        let _this=this;
        let user_data=[];
        let day_time_set=[];  //时间分割
        let day_time_on='';  //时间处理后的
        let year_add_time=[]; //增加年时间

        
        
        if(this.sel_value.Range_on.Range_set=='1'){
          // console.log("采购毛利");

          switch (this.sel_value.target.all_muri_value) {
            case 1:
              // console.log("集团！！");
              // console.log(this.data["FIN_GPR_MID-DLY_TRND_JT_GPR"]);
              user_data=(this.sel_value.day_set.day_1==true)?this.data["FIN_GPR_MID-DLY_TRND_JT_GPR"]:this.data["FIN_GPR_MID-MLY_TRND_JT_GPR"];
              break;
            case 2:
              // console.log("B店！！");
              // console.log(this.data["FIN_GPR_MID-DLY_TRND_B_GPR"]);
              user_data=(this.sel_value.day_set.day_1==true)?this.data["FIN_GPR_MID-DLY_TRND_NL_GPR"]:this.data["FIN_GPR_MID-MLY_TRND_NL_GPR"];
              break;
            case 3:
              // console.log("京东！！");
              // console.log(this.data["FIN_GPR_MID-DLY_TRND_JD_GPR"]);
              user_data=(this.sel_value.day_set.day_1==true)?this.data["FIN_GPR_MID-DLY_TRND_FL_GPR"]:this.data["FIN_GPR_MID-MLY_TRND_FL_GPR"];
              break;
            default:
              // console.log(this.data["FIN_GPR_MID-DLY_TRND_JT_GPR"]);
              user_data=(this.sel_value.day_set.day_1==true)?this.data["FIN_GPR_MID-DLY_TRND_JT_GPR"]:this.data["FIN_GPR_MID-MLY_TRND_JT_GPR"];
          }

          Object.keys(user_data).forEach((key_value_field) => {
            if(this.sel_value.day_set.month==true){
              user_data[key_value_field].MD=user_data[key_value_field].YM;
            }
          });

          // console.log("==========asdas    ada       asd            a===========");
          // console.log(user_data);


          
          user_data.sort((a, b) => {
              let a_time = "";
              let b_time = "";

              let time_set_sort_a='';
              let time_on_sort_a='';
              let time_set_sort_b='';
              let time_on_sort_b='';
              if(_this.sel_value.day_set.day_1==true){
                time_set_sort_a=a["MD"].split("-");
                time_on_sort_a= a["YYYY"]+'-'+(time_set_sort_a[0]<10?'0'+time_set_sort_a[0]:time_set_sort_a[0])+'-'+(time_set_sort_a[1]<10?'0'+time_set_sort_a[1]:time_set_sort_a[1]);
                time_set_sort_b=b["MD"].split("-");
                time_on_sort_b= b["YYYY"]+'-'+(time_set_sort_b[0]<10?'0'+time_set_sort_b[0]:time_set_sort_b[0])+'-'+(time_set_sort_b[1]<10?'0'+time_set_sort_b[1]:time_set_sort_b[1]);
              }
              a_time = new Date((_this.sel_value.day_set.day_1==true)?time_on_sort_a:a["YM"]).getTime(new Date((_this.sel_value.day_set.day_1==true)?time_on_sort_a:a["YM"]));
              b_time = new Date((_this.sel_value.day_set.day_1==true)?time_on_sort_b:b["YM"]).getTime(new Date((_this.sel_value.day_set.day_1==true)?time_on_sort_b:b["YM"]));
              return a_time - b_time;
          });

          Object.keys(user_data).forEach((key_value_on) => {
            // if(this.sel_value.day_set.day_1==true){user_data[key_value_on].MD=user_data[key_value_on].YM}
            day_time_set=user_data[key_value_on].MD.split("-");
            day_time_on=(day_time_set[0]<10?'0'+day_time_set[0]:day_time_set[0])+'.'+(day_time_set[1]<10?'0'+day_time_set[1]:day_time_set[1]);
            hour_data.push((this.sel_value.day_set.day_1==true)?day_time_on:(user_data[key_value_on].MD).substring(5,7)*1+'月');
            year_add_time.push(user_data[key_value_on].YYYY);  
            sale_amt.push(((user_data[key_value_on].SUM_GPR_LCK||0)*100).toFixed(1));
            // ago_amt.push(((user_data[key_value_on].AGO_SUM_GPR_LCK||0)*100).toFixed(1));
          });
          year_add_time=this.unique(year_add_time);


          


          
          


          // console.log(user_data);
          // console.log(hour_data);
          // console.log(sale_amt);
          // console.log(ago_amt);

        }else if(this.sel_value.Range_on.Range_set=='2'){
          // console.log("退款费用");

          // FIN_RFND_MID	DLY_TRND_RFND  日趋势
          // FIN_RFND_MID	MLY_TRND_FRND 月趋势
          // console.log(this.data["FIN_RFND_MID-DLY_TRND_RFND"]);  
          switch (this.sel_value.target.all_muri_value) {
            case 1:
              user_data=(this.sel_value.day_set.day_1==true)?this.data["FIN_RFND_MID-DLY_TRND_RFND"]:this.data["FIN_RFND_MID-MLY_TRND_FRND"];
              break;
            case 2:
              user_data=(this.sel_value.day_set.day_1==true)?this.data["FIN_RFND_MID-DLY_TRND_RFND_B"]:this.data["FIN_RFND_MID-MLY_TRND_FRND_B"];
              break;
            case 3:
              user_data=(this.sel_value.day_set.day_1==true)?this.data["FIN_RFND_MID-DLY_TRND_RFND_JD"]:this.data["FIN_RFND_MID-MLY_TRND_FRND_JD"];
              break;
            default:
              user_data=(this.sel_value.day_set.day_1==true)?this.data["FIN_RFND_MID-DLY_TRND_RFND"]:this.data["FIN_RFND_MID-MLY_TRND_FRND"];
          }

          user_data.sort((a, b) => {
              let a_time = "";
              let b_time = "";
              a_time =(this.sel_value.day_set.day_1==true)? new Date(a["TDATE"]).getTime(new Date(a["TDATE"])):a["YYYYMM"]*1;
              b_time =(this.sel_value.day_set.day_1==true)? new Date(b["TDATE"]).getTime(new Date(b["TDATE"])):b["YYYYMM"]*1;
              return a_time - b_time;
          }); 

          // console.log(user_data);
          
          Object.keys(user_data).forEach((key_value_on) => {
            // if(this.sel_value.day_set.day_1==true){user_data[key_value_on].MD=user_data[key_value_on].YM}
            hour_data.push(((this.sel_value.day_set.day_1==true)?user_data[key_value_on].MD:(user_data[key_value_on].YYYYMM).substring(0,4)+'-'+(user_data[key_value_on].YYYYMM).substring(4,6)));
            sale_amt.push(((user_data[key_value_on].PRP_RATE||0)*100).toFixed(2));
            ago_amt.push(((user_data[key_value_on].AGO_PRP_RATE||0)*100).toFixed(2));
          });



        }else if(this.sel_value.Range_on.Range_set=='3'){
          // console.log("KA达成");

          this.data["FIN_KA-DAY_TREND"].sort((a, b) => {
              let a_time = "";
              let b_time = "";

              a_time = new Date(a["YMD"].substring(0,10)).getTime(new Date(a["YMD"].substring(0,10)));
              b_time = new Date(b["YMD"].substring(0,10)).getTime(new Date(b["YMD"].substring(0,10)));

              return a_time - b_time;
          });

          Object.keys(this.data["FIN_KA-DAY_TREND"]).forEach((key_value2) => {

            hour_data.push(this.data["FIN_KA-DAY_TREND"][key_value2].YMD.substring(5,10));
            sale_amt.push(((this.data["FIN_KA-DAY_TREND"][key_value2].B店/10000)||0).toFixed(2));
            ago_amt.push(((this.data["FIN_KA-DAY_TREND"][key_value2].D店/10000)||0).toFixed(2));

          });          

        }

        // console.log("====================交易成功日趋势！！！=========================")
        // console.log(this.data["FIN_KA-DAY_TREND"]);
        // console.log(sale_amt);
        // console.log(hour_data);  year_add_time



        this.barData.value=0;
        this.barData.ago_value=0;

        if(this.sel_value.Range_on.Range_set=='1'){

          // this.barData.month=(_time_now.getMonth()+1)+'.'+(_time_now.getDate());
          // Object.keys(hour_data).forEach((key_mv) => {
          //   if(hour_data[key_mv]==((_time_now.getMonth()+1)+'-'+(_time_now.getDate()))){
          //     this.barData.value=sale_amt[key_mv]+'%'
          //     this.barData.ago_value=ago_amt[key_mv]+'%'
          //   }
          // }); 
          // if(this.barData.value==0&&this.barData.ago_value==0){
          //   this.barData.month=year_add_time+'.'+hour_data[hour_data.length-1];
          //   this.barData.value=sale_amt[sale_amt.length-1]+'%';
          //   this.barData.ago_value=ago_amt[ago_amt.length-1]+'%';
          // }

          if(this.barData.value==0&&this.barData.ago_value==0){
            if(this.sel_value.day_set.month==true){
              this.barData.month=year_add_time+'.'+
                (hour_data[hour_data.length-1].replace(/[^0-9]/ig,"")<10?'0'+hour_data[hour_data.length-1].replace(/[^0-9]/ig,""):
                hour_data[hour_data.length-1].replace(/[^0-9]/ig,""));
            }else{
              this.barData.month=year_add_time+'.'+hour_data[hour_data.length-1]
            }
            this.barData.value=sale_amt[sale_amt.length-1]+'%';
            this.barData.ago_value=ago_amt[ago_amt.length-1]+'%';
          }    

        }else if(this.sel_value.Range_on.Range_set=='2'){
          this.barData.month=(_time_now.getMonth()+1)+'-'+(_time_now.getDate());
          Object.keys(hour_data).forEach((key_mv) => {
            if(hour_data[key_mv]==((_time_now.getMonth()+1)+'-'+(_time_now.getDate()))){
              this.barData.value=sale_amt[key_mv]+'%'
              this.barData.ago_value=ago_amt[key_mv]+'%'
            }
          }); 
          if(this.barData.value==0&&this.barData.ago_value==0){
            this.barData.month=hour_data[hour_data.length-1];
            this.barData.value=sale_amt[sale_amt.length-1];
            this.barData.ago_value=ago_amt[ago_amt.length-1];
          }         
        }else if(this.sel_value.Range_on.Range_set=='3'){
          this.barData.month=(_time_now.getMonth()+1)+'-'+(_time_now.getDate());
          Object.keys(hour_data).forEach((key_mv) => {
            if(hour_data[key_mv]==((_time_now.getMonth()+1)+'-'+(_time_now.getDate()))){
              this.barData.value=sale_amt[key_mv]
              this.barData.ago_value=ago_amt[key_mv]
            }
          }); 
          if(this.barData.value==0&&this.barData.ago_value==0){
            this.barData.month=hour_data[hour_data.length-1];
            this.barData.value=sale_amt[sale_amt.length-1];
            this.barData.ago_value=ago_amt[ago_amt.length-1];
          }
        }



        Object.keys(hour_data).forEach((key_mv_ho) => {
          // console.log(key_mv_ho);
          // console.log(sale_amt[key_mv_ho]);
          if(sale_amt[key_mv_ho]*1==0){
            sale_amt[key_mv_ho]='0';
          }

          if(ago_amt[key_mv_ho]*1==0){
            ago_amt[key_mv_ho]='0';
          }
        });



        // console.log(sale_amt);
        // console.log(ago_amt);
        let ynew_data = sale_amt.concat(ago_amt);
        ynew_data=this.unique(ynew_data);
        ynew_data.sort((a,b)=>{
          return a-b;
        });

        // console.log(ynew_data);
        // console.log(hour_data);



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
              data: ["B店", "D店"],
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

                if(_this.sel_value.Range_on.Range_set!='3'){
                  // _this.barData.value =(params[1]==undefined)? 0:((params[1].value==0.01)?0:params[1].value)+'%';
                  // _this.barData.ago_value =(params[0]==undefined)? 0:((params[0].value==0.01)?0:params[0].value)+'%';
                  _this.barData.value =(params[0]==undefined)? 0:((params[0].value==0.01)?0:params[0].value)+'%';
                  if(_this.sel_value.day_set.day_1==true){
                    _this.barData.month =(params[0]==undefined)? 0: year_add_time+'.'+params[0].axisValue
                  }else{
                    _this.barData.month =(params[0]==undefined)? 0: year_add_time+'.'+
                    (params[0].axisValue.replace(/[^0-9]/ig,"")<10?'0'+params[0].axisValue.replace(/[^0-9]/ig,""):params[0].axisValue.replace(/[^0-9]/ig,""));
                  }
                  
                }else{
                  _this.barData.value =(params[1]==undefined)? 0:((params[1].value==0.01)?0:params[1].value);
                  _this.barData.ago_value =(params[0]==undefined)? 0: ((params[0].value==0.01)?0:params[0].value);
                  _this.barData.month =(params[0]==undefined)? 0: params[0].axisValue;
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
              // type: "value",
              // type: "log",
              type:(this.sel_value.Range_on.Range_set=='1')?"category":"value",

              boundaryGap:false,
              
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

                // formatter:function(value){
                //   console.log(value);
                //   // (value>100)?"超100%":
                //   // console.log(sale_amt);
                //   return (value==0.01)?0:value;

                // },


              },

              // data:ynew_data,
              data:(this.sel_value.Range_on.Range_set=='1')?ynew_data: null,
              
              // max:function(value){
              //   console.log(value);
              //   return 38;
              // },
              // min:function(value){
              //   return value.min;
              // }


              

            },

            series: [
              {
                name: "D店",
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
                name: "B店",
                showSymbol: false,
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





      });
    },


    
    initChart4() {
      this.chartIns4 = echarts.init(this.$refs["chart4"]);

      // let _time_now=new Date();
      // let year_now = _time_now;
      // year_now = year_now.getFullYear();


      this.p1.then(() => {

        let hour_data = [];
        let sale_amt = [];  //出库金额
        // let ago_amt = [];  //入库金额
        // let _this=this;


        // console.log("=============================")
        // console.log(this.data["FIN_KA-HFH_DAY_TREND"]);

        

        
        this.data["FIN_KA-HFH_DAY_TREND"].sort((a, b) => {
            let a_time = "";
            let b_time = "";

            a_time = new Date(a["YMD"].substring(0,10)).getTime(new Date(a["YMD"].substring(0,10)));
            b_time = new Date(b["YMD"].substring(0,10)).getTime(new Date(b["YMD"].substring(0,10)));

            return a_time - b_time;
        });



        Object.keys(this.data["FIN_KA-HFH_DAY_TREND"]).forEach((key_value2) => {

          hour_data.push(this.data["FIN_KA-HFH_DAY_TREND"][key_value2].YMD.substring(5,10));
          sale_amt.push(((this.data["FIN_KA-HFH_DAY_TREND"][key_value2].HFH_TRADE_T/10000)||0).toFixed(2));
          // ago_amt.push(((this.data["FIN_KA-DAY_TREND"][key_value2].D店/10000)||0).toFixed(2));

        });

        // this.barData.month=(_time_now.getMonth()+1)+'-'+(_time_now.getDate());
        // Object.keys(hour_data).forEach((key_mv) => {
        //   if(hour_data[key_mv]==((_time_now.getMonth()+1)+'-'+(_time_now.getDate()))){
        //     this.barData.value=sale_amt[key_mv]
        //     this.barData.ago_value=ago_amt[key_mv]
        //   }
        // });  



        this.chartIns4.setOption({


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
              data: ["火凤凰"],
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
                type: "cross",
                label: {
                  color: "#000000",
                  backgroundColor: "aliceblue",
                },
              },

              // formatter:function (params) {

              //   _this.barData.value =(params[1]==undefined)? 0:params[1].value;
              //   _this.barData.ago_value =(params[0]==undefined)? 0: params[0].value;
              //   _this.barData.month =(params[0]==undefined)? 0: params[0].axisValue;

              // }

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
                name: "火凤凰",
                showSymbol: false,
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



      });
    },





    initChart2() {
      this.chartIns2 = echarts.init(this.$refs["chart2"]);
      this.p1.then(() => {

        let hour_data = [];
        let sale_amt = [];
        let ago_amt = [];  
        // let _this=this;

        // let time_set_on='2020-11';//this.set_time=
        

        // console.log("==================================");
        // console.log(this.set_time.substring(0, 7));

        

        this.data["FIN_KA-MONTH_TREND"].sort((a, b) => {
          let a_time = "";
          let b_time = "";

          a_time = new Date(a["MDATE"].substring(0,10)).getTime(new Date(a["MDATE"].substring(0,10)));
          b_time = new Date(b["MDATE"].substring(0,10)).getTime(new Date(b["MDATE"].substring(0,10)));

          return a_time - b_time;
        });


        Object.keys(this.data["FIN_KA-MONTH_TREND"]).forEach((key_value) => {

            hour_data.push(this.data["FIN_KA-MONTH_TREND"][key_value].MDATE.substring(5,7)*1+'月');
            sale_amt.push(((this.data["FIN_KA-MONTH_TREND"][key_value].交易金额)/10000||0).toFixed(2));
            ago_amt.push(((this.data["FIN_KA-MONTH_TREND"][key_value].月目标)/10000||0).toFixed(2));

        });


        // console.log(hour_data);
        // console.log(sale_amt);
        // console.log(ago_amt);


        this.chartIns2.setOption({

          grid: {
            left: "1%",
            top: "6%",
            right: "1%",
            // bottom: "15%",
            bottom: "0%",
            containLabel: true,
          },

          tooltip: {

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
              name: "交易金额",
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

            {
              name: "月目标",
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



          ],
        });



      });
    },




    initChart3() {
      this.chartIns3 = echarts.init(this.$refs["chart3"]);
      this.p1.then(() => {
        this.chartIns3.setOption({
          grid: {
            left: "1%",
            top: "6%",
            right: "2%",
            bottom: "15%",
            containLabel: true,
          },

          legend: {
            show: true,
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
              type: "cross",
              label: {
                color: "#000000",
                backgroundColor: "aliceblue",
              },
            },
          },

          xAxis: {
            type: "category",
            boundaryGap: false,
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
          yAxis: {
            type: "value",
          },

          series: [
            {
              name: "同期",
              showSymbol: false,
              smooth: true, //true 为平滑曲线，false为直线
              itemStyle: {
                color: "#919191",

                normal: {
                  color: "#BBBBBB",
                  lineStyle: {
                    color: "#BBBBBB",
                    width: 2, //设置线条粗细
                  },
                  areaStyle: {
                    color: "rgba(102, 204, 225, 0.05)",
                  },
                },
              },
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: "line",
              areaStyle: {},
            },

            {
              name: "当期",
              showSymbol: false,
              smooth: true, //true 为平滑曲线，false为直线
              itemStyle: {
                color: "#0938F7",

                normal: {
                  color: "#66ccff",
                  lineStyle: {
                    color: "#66ccff",
                    width: 2, //设置线条粗细
                  },
                  areaStyle: {
                    color: "rgba(102, 204, 225, 0.05)",
                  },
                },
              },
              data: [
                820 / 2,
                932 / 2,
                901 / 2,
                934 / 2,
                1290 / 2,
                1330 / 2,
                1320 / 2,
              ],

              type: "line",
              areaStyle: {},
            },
          ],
        });
      });
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

    fomatMoney(num) {
      num = num + "";
      if (!num.includes(".")) {
        num += ".";
      }
      return num
        .replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
          return $1 + ",";
        })
        .replace(/\.$/, "");
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


  },

  //生命周期结束之前销毁
  beforeDestroy() {
    this.$EventBus.$off("Financial_choice_f");
  },
};
</script>

<style scoped lang="scss">
.section-title {
  font-size: 12px;
  // font-weight: bold;
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
}
.table_all ul li {
  height: 30px;
  padding-bottom: 10px;
}
.table_all .table_title ul li {
  float: left;
  // width: 20%;
  width: 16.6666%;
  font-size: 12px;
  color: #999999;
}

.table_all .table_content ul li {
  float: left;
  // width: 20%;
  width: 16.6666%;
  font-size: 12px;
  // color: #999999;
}

.target_info .target_info_body .target_info_text_span {
  // width: 100%;
  width: 65%;
  display: block;
  font-size: 16px;
  text-align: center;
  line-height: 30px;
  color: #000000;
  margin: 0 auto;
}

.target_info .target_info_body .target_info_text_span_san {
  // width: 100%;
  width: 70%;
  display: block;
  font-size: 16px;
  text-align: center;
  line-height: 30px;
  color: #000000;
  margin: 0 auto;
}
.target_info .target_info_body .target_info_text_i {
  width: 100%;
  display: block;
  font-style: normal;
  text-align: center;
  font-size: 12px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
}

.target_info .target_info_body .target_info_text_iyoy {
  width: 65%;
  display: block;
  font-style: normal;
  text-align: center;
  font-size: 12px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 0px;
  padding-bottom: 5px;
  margin: 0 auto;
  text-align: left;
}

.target_info .target_info_body .target_info_text_iyoy_san {
  width: 70%;
  display: block;
  font-style: normal;
  text-align: center;
  font-size: 12px;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  padding-bottom: 5px;
  margin: 0 auto;
  text-align: left;
}

.target_info .target_info_body .target_info_text_iyoy span i,
.target_info .target_info_body .target_info_text_iyoy_san span i {
  font-style: normal;
}

.target_info .target_info_body .target_info_text_i span {
  color: #919191;
  padding: 4px;
  border-radius: 50px;
  padding-left: 5px;
  padding-right: 5px;
  width: 100%;
  display: block;
  margin: 0 auto;
}





// .table_all {
//   padding-top: 10px;
// }
// .table_all ul li {
//   height: 30px;
//   padding-bottom: 10px;
// }
// .table_all .table_title ul li {
//   float: left;
//   width: 25%;
//   font-size: 12px;
//   color: #999999;
// }

// .table_all .table_content ul li {
//   float: left;
//   width: 25%;
//   font-size: 12px;
//   // color: #999999;
// }



.dashboard_title p {
  margin: 0px;
  text-align: center;
  line-height: 25px;
  font-size: 14px;
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
  // width: 16.6666666666666%;
  // width: 20%;
  width: 25%;
  font-size: 12px;
  color: #999999;
  // text-align: center;
}

#table_all_new .table_content ul li {
  float: left;
  // width: 16.6666666666666%;
  // width: 20%;
  width: 25%;
  font-size: 12px;
  // color: #999999;
}

#table_all_new .table_content ul {
  // margin-left: -30px;
}

// #table_content_css .van-cell {
//   padding: 0px;
// }

.test_class {
  height: 10px;
}

.qushiyeji_title .van-row {
  color: #6f6f6f;
  font-size: 12px;
}

.title_change {
  color: #23b0a8;
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
