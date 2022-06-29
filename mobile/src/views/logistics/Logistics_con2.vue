<template>
  <!-- <div style="min-height: 100vh">
    <div style="text-align: center">
      <in-progress style="width: 100px; height: 100px" />
      <div style="color: #ccc">开发中</div>
    </div>
  </div> -->

  <div class="Productmarket_all">


    <van-popup
      get-container="body"
      v-model="show"
      position="bottom"
      :style="{ height: '50%', overflow: 'hidden' }"
    >


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
            {{ "更新时间：" + data_load_time }}
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



                <van-collapse v-model="activeNames" accordion>
                  <van-collapse-item title="日均总时效" name="1">
                    日均总时效=签收时间-发货时间得出时间差汇总/发货清单（发货通知单）上的“父单号”数量汇总
                    (集货订单,较早的发货时间,较晚的签收时间)
                  </van-collapse-item>
                  <van-collapse-item title="日均干线时效" name="2">
                    <p>日均干线时效：发货--到货的过程为干线，其每张单据的平均耗时</p>
                    <p>计算公式：（到货时间-发货时间）/发货通知单单据数量</p>
                  </van-collapse-item>
                  <van-collapse-item title="日均支装时效" name="3">
                    <p>日均支装时效：到货--安装的过程为支装，其完成的每张单据的平均耗时</p>
                    <p>计算公式=（安装时间-到货时间）/父单号数量</p>
                  </van-collapse-item>
                </van-collapse>

              </div>
            </van-popup>
          



        </section>
        <!-- 开头结束 background-color: #ffffff;class="px10 py10"-->

        <section
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
              <!-- <van-col span="5"
                ><van-button
                  :type="sel_value.day_1 ? click_css_set.type : click_css_no.type"
                  class="but_set_select"
                  :color="
                    sel_value.day_1 ? click_css_set.color : click_css_no.color
                  "
                  >1天</van-button
                ></van-col
              > -->

              <!--  -->
              <van-col style="margin-right: 0px;" span="6"
                ><van-button plain
                  @click="Single_choice('day_7',['_this.data_Logistics()','_this.initChart3()','_this.initChart4()','_this.echarts_clear=true'],true,'_this.sel_value.day_set')"
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
              <van-col style="margin-right: 10px;margin-left: 10px;"  span="6"
                ><van-button plain
                  @click="Single_choice('day_30',['_this.data_Logistics()','_this.initChart3()','_this.initChart4()','_this.echarts_clear=true'],true,'_this.sel_value.day_set')"
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

              <!-- @click="Single_choice('month','',true,'_this.sel_value.day_set')" -->
              <van-col style="margin-right: 0px;" span="6" @click="showPopup"
                ><van-button plain
                  
                  :type="sel_value.day_set.month ? click_css_set.type : click_css_no.type"
                  class="but_no_select"
                  :color="
                    sel_value.day_set.month ? click_css_set.color : click_css_no.color
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
              >（时间范围：{{(sel_value.day_set.day_7||sel_value.day_set.day_30)?
                (set_time_range.start+"~"+set_time_range.end)
                :(set_time.substring(0, 4) +"年" +set_time.substring(5, 7) +"月")
                }}）</span
            >
          </div>
        </section>


        <!-- 核心标题开始 -->
        <section
          style="padding-top: 5px; padding-bottom: 5px; border-radius: 4px; ;margin-left: 10px;margin-right: 10px;margin-bottom: 0px;"
        >
        <div
            class="section-title test_addd"
            style="padding-left: 0px; padding-bottom: 0px"
          >
            {{'核心指标'}}
          </div>
        </section>
        <!-- 核心标题结束 -->




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
          :style="(sel_value.Range_on.Range_set=='1')?{'display':'block'}:{'display':'none'}"
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
                <i class="target_info_text_i"><span>库位利用率</span></i>
                <div
                  style="
                    border-right: 1px solid #eeeeee;
                    border-left: 0px solid #eeeeee;
                  "
                >
                  <span class="target_info_text_span">{{
                    (sel_title.quota_value.cont1/10000).toFixed(1) + '万'
                  }}</span>

                  <i class="target_info_text_iyoy">
                    <span
                      ><i>同比：</i>
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

                  <i class="target_info_text_iyoy">
                    <span
                      ><i>利用率：</i>
                      <i>{{
                        (sel_title.quota_value.cont3 * 100 || 0).toFixed(1) + "%"
                      }}</i></span
                    ></i
                  >
                </div>
              </van-col>

              <van-col span="12">
                <i class="target_info_text_i"><span>周转率</span></i>
                <div>
                  <span class="target_info_text_span">{{
                    sel_title.quota_value.cont4.toFixed(1)
                  }}</span>
                  <i class="target_info_text_iyoy">
                    <span
                      ><i>同比：</i>
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
                  <i class="target_info_text_iyoy"
                    ><span
                      ><i>环比：</i>
                      <i>{{
                        (sel_title.quota_value.cont6 * 100 || 0).toFixed(1) + "%"
                      }}</i>
                    </span></i
                  >
                </div>
              </van-col>
            </van-row>

            <van-row
              class="target_info_body"
              style="padding-top: 10px; padding-bottom: 13px"
            >
              <van-col span="12">
                <i class="target_info_text_i"> <span>入库金额</span></i>
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
                      ><i>同比：</i>
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
                  <i class="target_info_text_iyoy"
                    ><span
                      ><i>环比：</i>
                      <i>{{
                        (sel_title.quota_value.cont9 * 100 || 0).toFixed(1) + "%"
                      }}</i>
                    </span></i
                  >
                </div>
              </van-col>

              <van-col span="12">
                <i class="target_info_text_i"><span>发货金额</span></i>
                <div>
                  <span class="target_info_text_span">{{
                    (sel_title.quota_value.cont10/10000).toFixed(1)+'万'
                  }}</span>
                  <i class="target_info_text_iyoy"
                    ><span
                      ><i>同比：</i>
                      <i
                        :class="
                          Number(sel_title.quota_value.cont11) > 0
                            ? 'rate-up'
                            : 'rate-down'
                        "
                        >{{
                          (sel_title.quota_value.cont11 * 100 || 0).toFixed(1) +
                          "%"
                        }}</i
                      >
                    </span></i
                  >
                  <i class="target_info_text_iyoy"
                    ><span
                      ><i>达成率：</i>
                      <i>{{
                        (sel_title.quota_value.cont12 * 100 || 0).toFixed(1) + "%"
                      }}</i>
                    </span></i
                  >
                </div>
              </van-col>
            </van-row>
          </div>
        </section>



        <!-- 核心指标开始 -->
        <!-- <div style="width: 100%; height: 10px;"></div> -->

        <section
          style="
            padding-top: 10px;
            padding-bottom: 10px;
            border-radius: 4px;
            background: #ffffff;
            margin-left: 10px;
            margin-right: 10px;  
          "
          :style="(sel_value.Range_on.Range_set=='2')?{'display':'block'}:{'display':'none'}"
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

            <!--   @click="
                Single_choice(
                  'all_muri_value',
                  ['_this.initChart()'],
                  1,
                  '_this.sel_value.target'
                )
              " -->

            <div
              @click="
                Single_choice('all_muri_value',['_this.data_Logistics()','_this.initChart3()','_this.initChart4()','_this.echarts_clear=true'], 1, '_this.sel_value.target')
              "
              class="Productmarket_labqie_con1"
              :style="
                sel_value.target.all_muri_value == 1
                  ? Object.assign({}, click_css_hxzb_y, { 'margin-right': '0.5%', })
                  : Object.assign({}, click_css_hxzb_n, { 'margin-right': '0.5%', })
              "
            >
              <span
                :class="
                  sel_value.target.all_muri_value == 1 ? 'title_change' : ''
                "
                :style="sum_zhibiao.title"
                >日均总时效</span
              >
              <span :style="sum_zhibiao.zhognxin">{{nll_undefined((sel_title.quota_value.cont1||0).toFixed(2))+'天'}}</span>

              <span :style="sum_zhibiao.body">
                <i style="width: 31%; display: inline-block; font-style: normal"
                  >环比</i
                >
                <i style="font-style: normal"
                :class="Number(sel_title.quota_value.cont2) > 0? 'rate-up': 'rate-down'"
                > 
                  {{nll_undefined(((sel_title.quota_value.cont2||0)*100).toFixed(1))+'%'}}
                </i>
              </span>
            </div>

            <!-- @click="Single_choice('all_muri_value',['_this.initChart()'],2,'_this.sel_value.target')" -->
            <div
              @click="
                Single_choice('all_muri_value',['_this.data_Logistics()','_this.initChart3()','_this.initChart4()','_this.echarts_clear=true'], 2, '_this.sel_value.target')
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
                >日均干线时效</span
              >
              <span :style="sum_zhibiao.zhognxin">{{nll_undefined((sel_title.quota_value.cont3||0).toFixed(2))+'天'}}</span>

              <span :style="sum_zhibiao.body">
                <i style="width: 31%; display: inline-block; font-style: normal"
                  >环比</i
                >
                <i style="font-style: normal"
                :class="Number(sel_title.quota_value.cont4) > 0? 'rate-up': 'rate-down'"
                >
                  {{nll_undefined(((sel_title.quota_value.cont4||0)*100).toFixed(1))+'%'}}
                </i>
              </span>
            </div>

              <!--@click="
                Single_choice(
                  'all_muri_value',
                  ['_this.initChart()'],
                  3,
                  '_this.sel_value.target'
                )
              " -->

            <div
              @click="
                Single_choice('all_muri_value',['_this.data_Logistics()','_this.initChart3()','_this.initChart4()','_this.echarts_clear=true'], 3, '_this.sel_value.target')
              "
              class="Productmarket_labqie_con3"
              :style="
                sel_value.target.all_muri_value == 3
                  ? Object.assign({}, click_css_hxzb_y, { 'margin-right': '0%','float':'right' })
                  : Object.assign({}, click_css_hxzb_n, { 'margin-right': '0%','float':'right'  })
              "
            >
              <span
                :class="
                  sel_value.target.all_muri_value == 3 ? 'title_change' : ''
                "
                :style="sum_zhibiao.title"
                >日均支装时效</span
              >
              <span :style="sum_zhibiao.zhognxin">{{nll_undefined((sel_title.quota_value.cont5||0).toFixed(2))+'天'}}</span>

              <span :style="sum_zhibiao.body">
                <i style="width: 31%; display: inline-block; font-style: normal"
                  >环比</i
                >

                <i style="font-style: normal"
                :class="Number(sel_title.quota_value.cont6) > 0? 'rate-up': 'rate-down'"
                >
                  {{nll_undefined(((sel_title.quota_value.cont6||0)*100).toFixed(1))+'%'}}
                </i>
              </span>
            </div>

            <div style="clear: both; padding-bottom: 0px"></div>
          </div>
        </section>


        <!-- <div style="width: 100%; height: 10px;"></div> -->
        <!-- 核心指标结束 -->

        <!-- 物流三包成本开始 -->
        <section
          style="
            padding-top: 10px;
            padding-bottom: 16px;
            padding-bottom: 13px;
            background: #ffffff;
            border-radius: 4px;
            margin-left: 10px;
            margin-right: 10px;
          "
          :style="(sel_value.Range_on.Range_set=='3')?{'display':'block'}:{'display':'none'}"
        >
          <div class="target_info">
            <van-row
              class="target_info_body"
              style="padding-left: 0px; padding-right: 0px; padding-top: 3px"
            >
              <van-col span="8">
                <i class="target_info_text_i" style="padding-top: 0px">
                  <span>总成本</span>
                </i>

                <!-- <span class="target_info_text_span">{{
                  ((sel_title.quota_value.cont1/10000).toFixed(1)*1).toLocaleString()+"万"||0
                }}</span> -->

                <div
                  style="
                    border-right: 1px solid #eeeeee;
                    border-left: 0px solid #eeeeee;
                  "
                >
                  <span class="target_info_text_span_san">{{
                    ((sel_title.quota_value.cont1/10000)||0).toFixed(1)+'万'
                  }}</span>

                  <i class="target_info_text_iyoy_san">
                    <span
                      >
                      <i>增额：</i>
                      <i>{{
                          ((sel_title.quota_value.cont2/10000)|| 0).toFixed(1) +'万'
                        }}</i
                      >
                    </span></i
                  >

                  <i class="target_info_text_iyoy_san">
                    <span
                      ><i>同比：</i>
                      <i
                      :class="Number(sel_title.quota_value.cont3) > 0? 'rate-up': 'rate-down'"
                      >{{
                        (Number(sel_title.quota_value.cont3)*100 > 1000)?
                        '>1000%':(sel_title.quota_value.cont3 * 100 || 0).toFixed(1) + "%"
                      }}</i></span
                    ></i
                  >
                </div>
              </van-col>

              <van-col span="8" style="">
                <i class="target_info_text_i" style="padding-top: 0px">
                  <span>物流成本</span>
                </i>

                <!-- <span class="target_info_text_span" style="border-right: 1px solid #eeeeee;border-left: 1px solid #eeeeee;">{{
                  ((sel_title.quota_value.cont2/10000).toFixed(1)*1).toLocaleString()+"万"||0
                }}</span> -->

                <div
                  style="
                    border-right: 1px solid #eeeeee;
                    border-left: 0px solid #eeeeee;
                  "
                >
                  <span class="target_info_text_span_san">{{
                    ((sel_title.quota_value.cont4/10000)||0).toFixed(1)+'万'
                  }}</span>

                  <i class="target_info_text_iyoy_san">
                    <span
                      ><i>增额：</i>
                      <i
                        >{{
                          (sel_title.quota_value.cont5 / 10000 || 0).toFixed(1) +
                          "万"
                        }}</i
                      >
                    </span></i
                  >

                  <i class="target_info_text_iyoy_san">
                    <span
                      ><i>同比：</i>
                      <i
                      :class="Number(sel_title.quota_value.cont6) > 0? 'rate-up': 'rate-down'"
                      >{{
                        (Number(sel_title.quota_value.cont6)*100 > 1000)?
                        '>1000%':(sel_title.quota_value.cont6 * 100 || 0).toFixed(1) + "%"
                      }}</i></span
                    ></i
                  >
                </div>
              </van-col>

              <van-col span="8">
                <i class="target_info_text_i" style="padding-top: 0px">
                  <span>三包成本</span>
                </i>

                <!-- <span class="target_info_text_span" 
                :style="sel_value.Range_on.Range_set=='3'?  {'color':'#000000'}
                :Number((sel_title.quota_value.cont3.toString()).replace('%', ''))>99? {'color':'red'}:{'color':'#008000'}">{{
                  sel_value.Range_on.Range_set=='3'? fomatMoney(sel_title.quota_value.cont3):sel_title.quota_value.cont3
                }}</span> -->

                <div
                  style="
                    border-right: 1px solid #eeeeee;
                    border-left: 0px solid #eeeeee;
                  "
                >
                  <span class="target_info_text_span_san">{{
                    ((sel_title.quota_value.cont7/10000)||0).toFixed(1)+'万'
                  }}</span>

                  <i class="target_info_text_iyoy_san">
                    <span
                      ><i>增额：</i>
                      <i>{{
                          (sel_title.quota_value.cont8 / 10000 || 0).toFixed(1) +
                          "万"
                        }}</i
                      >
                    </span></i
                  >

                  <i class="target_info_text_iyoy_san">
                    <span
                      ><i>同比：</i>
                      <i
                      :class="Number(sel_title.quota_value.cont9) > 0? 'rate-up': 'rate-down'"
                      >{{
                        (Number(sel_title.quota_value.cont9)*100 > 1000)?
                        '>1000%':(sel_title.quota_value.cont9 * 100 || 0).toFixed(1) + "%"
                      }}</i></span
                    ></i
                  >
                </div>
              </van-col>
            </van-row>
          </div>
        </section>
        <div style="width: 100%; height: 10px;display: none;"></div>
        <!-- 物流三包成本结束 -->



        <!-- 库存分布分析开始 -->
        <section
          style="
            padding-top: 5px;
            padding-bottom: 5px;
            border-radius: 4px;
            margin-left: 10px;
            margin-right: 10px;
            margin-bottom: 0px;
          "
          :style="(sel_value.Range_on.Range_set=='1')?{'display':'block'}:{'display':'none'}"
        >
          <div
            class="section-title"
            style="padding-left: 0px; padding-bottom: 0px; color: #000000"
          >
            库存分布分析
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
          :style="(sel_value.Range_on.Range_set=='1')?{'display':'block'}:{'display':'none'}"
        >
          <!-- <div
            class="section-title"
            style="padding-top: 10px; height: 20px; padding-bottom: 0px"
          >
            库存分布分析
          </div> -->

          <div
            ref="chart" :style="canvas_css"
            style="padding-top: 10px;"
          ></div>
        </section>
        <!-- 库存分布分析结束 -->

        <!-- 出入库金额趋势开始 -->
        <section
          style="
            padding-top: 5px;
            padding-bottom: 5px;
            border-radius: 4px;
            margin-left: 10px;
            margin-right: 10px;
            margin-bottom: 0px;
          "
          :style="(sel_value.Range_on.Range_set=='1')?{'display':'block'}:{'display':'none'}"
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
            padding-top: 10px;
            padding-bottom: 10px;
            background: #ffffff;
            border-radius: 4px;
            margin-left: 10px;
            margin-right: 10px;
            padding-left: 10px;
            padding-right: 10px;
          "
          :style="(sel_value.Range_on.Range_set=='1')?{'display':'block'}:{'display':'none'}"
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
                        <i style="font-style: normal;font-size: 12px; width: 15px;height: 2px;display: block; margin-left: 4px;margin-right: 4px;margin-top: 4px;float: left;">T&nbsp;-</i>
                    
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
    
                      <div style="font-size: 12px;"><span>入库</span></div>
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
                      <div style="font-size: 12px;"><span>出库</span></div>

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

          <div
            @touchstart="canvas_qiehuan.canvas_toli_kg = true"
            @touchend="canvas_qiehuan.canvas_toli_kg = false"
            ref="chart2" :style="canvas_css"
            style="padding-top: 0px;"
          ></div>
        </section>
        <!-- 出入库金额趋势结束 -->




        <!-- 总时效月趋开始 -->
        <section
          style="
            padding-top: 5px;
            padding-bottom: 5px;
            border-radius: 4px;
            margin-left: 10px;
            margin-right: 10px;
            margin-bottom: 0px;
          "
          :style="(sel_value.Range_on.Range_set=='2')?{'display':'block'}:{'display':'none'}"
        >
          <div
            class="section-title"
            style="padding-left: 0px; padding-bottom: 0px; color: #000000"
          >
            时效趋势
          </div>
        </section>

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
          :style="(sel_value.Range_on.Range_set=='2')?{'display':'block'}:{'display':'none'}"
        >


          <!-- 切换优化开始 -->
            <!-- {{sel_value.qudao_guanjan_setvalue.length}} -->
            <!-- 第一列开始 -->
            <div class="yjqs_clss" style="margin-bottom: 0px;height: 34px; display: none;">
              <div style="width: 100%;padding-top: 10px;"></div>
              <ul >
                <template>

                  <li @click="Single_choice('ssyjqs_pd',['_this.initChart4()','_this.qudao_guanjan_more_set(2)'],(1),'_this.sel_value.ssyjqs')"
                    :style="sel_value.ssyjqs.ssyjqs_pd == ((1)+'')
                    ? whole_css.qudao_guanjan: whole_css.qudao_guanjan_n"
                  >
                    总计
                  </li>

                  <li @click="Single_choice('ssyjqs_pd',['_this.initChart4()','_this.qudao_guanjan_more_set(1)'],(2),'_this.sel_value.ssyjqs')"
                    :style="sel_value.ssyjqs.ssyjqs_pd == ((2)+'')
                    ? whole_css.qudao_guanjan: whole_css.qudao_guanjan_n"
                  >
                    直发订单
                  </li>

                  <li @click="Single_choice('ssyjqs_pd',['_this.initChart4()','_this.qudao_guanjan_more_set(2)'],(3),'_this.sel_value.ssyjqs')"
                    :style="sel_value.ssyjqs.ssyjqs_pd == ((3)+'')
                    ? whole_css.qudao_guanjan: whole_css.qudao_guanjan_n"
                  >
                    集货订单
                  </li>

                </template>
                
              </ul>            
            </div>
            <!-- 第一列结束 -->


            <!-- 第二列开始 -->
            <div class="yjqs_clss2" style="display: none;" v-if="sel_value.qudao_guanjan_more==true">
              <ul >
                <template >
                
                  <li @click="Single_choice('ssyjqs_pd',['_this.initChart4()'],(4),'_this.sel_value.ssyjqs_floor')"
                    :style="sel_value.ssyjqs_floor.ssyjqs_pd == ((4)+'')
                    ? whole_css.qudao_guanjan: whole_css.qudao_guanjan_n"
                  >
                    佛山直发
                  </li>

                  <li @click="Single_choice('ssyjqs_pd',['_this.initChart4()'],(5),'_this.sel_value.ssyjqs_floor')"
                    :style="sel_value.ssyjqs_floor.ssyjqs_pd == ((5)+'')
                    ? whole_css.qudao_guanjan: whole_css.qudao_guanjan_n"
                  >
                    青岛直发
                  </li>
                  
                </template>
                
              </ul>            
            </div>
            <!-- 第二列结束 -->
            <!-- <div style="clear: both"></div> -->
          <!-- 切换优化结束 -->






            <!-- 图例开始 -->
            <!-- <i style="font-style: normal;display: block;height:40px;"></i> -->
            <i style="font-style: normal;display: block;height:40px; margin-bottom: 10px;padding-top: 10px; padding-left: 10px; padding-right: 10px;">
              <van-row  type="flex" justify="center" :style="canvas_qiehuan.canvas_toli_kg2==true?canvas_qiehuan.canvas_toli_cssy:canvas_qiehuan.canvas_toli_cssn">
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


                <van-col span="6" v-if="sel_value.target.all_muri_value==1">
                  <div>
                    <div style="margin: 0 auto; width: 50px; height: 17px;">
                      <div style="height: 17px;display: block;float: left;">
                        <div style="width: 100%; height: 8px;"></div>
                        <i style="width: 15px;height: 2px;background-color: #1678FF;display: block; margin-right: 6px;"></i>
                      </div>
                      <div style="font-size: 12px;"><span style="line-height: 18px;">时效</span></div>

                    </div>
                    <div style="text-align: center;">
                      <!-- <i style="width: 15px;height: 4px;display: block; margin-right: 6px;margin-top: 6px;float: left;"></i> -->
                      <span style="font-size: 12px; color: #FF3300;">{{ nll_undefined(barData_lin.value1) }}</span>
                    </div> 
                  </div>
                  <!-- <div></div> -->

                </van-col>



                <van-col span="6" v-if="sel_value.target.all_muri_value!=1">
                  <div>
                    <div style="margin: 0 auto; width: 75px; height: 17px;">
                      <div style="height: 17px;display: block;float: left;">
                        <div style="width: 100%; height: 8px;"></div>
                        <i style="width: 15px;height: 2px;background-color: #1678FF;display: block; margin-right: 6px;"></i>
                      </div>
                      <div style="font-size: 12px;"><span style="line-height: 18px;">佛山直发</span></div>

                    </div>
                    <div style="text-align: center;">
                      <!-- <i style="width: 15px;height: 4px;display: block; margin-right: 6px;margin-top: 6px;float: left;"></i> -->
                      <span style="font-size: 12px; color: #FF3300;">{{ nll_undefined(barData_lin.value2) }}</span>
                    </div> 
                  </div>
                  <!-- <div></div> -->

                </van-col>

                
                <van-col span="6" v-if="sel_value.target.all_muri_value!=1">
                  <div>
                    <div style="margin: 0 auto; width: 75px; height: 17px;">
                      <div style="height: 17px;display: block;float: left;">
                        <div style="width: 100%; height: 8px;"></div>
                        <i style="width: 15px;height: 2px;background-color: #F8A52A;display: block; margin-right: 6px;"></i>

                      </div>
    
                      <div style="font-size: 12px;"><span style="line-height: 18px;">青岛直发</span></div>
                    </div>
                    <div style="text-align: center;">
                      <!-- <i style="width: 15px;height: 4px;display: block; margin-right: 6px;margin-top: 6px;float: left;"></i> -->
                      <span style="font-size: 12px; color: #FF3300;">{{ nll_undefined(barData_lin.value3) }}</span>
                    </div> 
                  </div>
                  <!-- <div></div> -->
                </van-col>

                <van-col span="6" v-if="sel_value.target.all_muri_value!=1">
                  <div>
                    <div style="margin: 0 auto; width: 75px; height: 17px;">
                      <div style="height: 17px;display: block;float: left;">
                        <div style="width: 100%; height: 8px;"></div>
                        <i style="width: 15px;height: 2px;background-color: #657798;display: block; margin-right: 6px;"></i>

                      </div>
    
                      <div style="font-size: 12px;"><span style="line-height: 18px;">多仓发货</span></div>
                    </div>
                    <div style="text-align: center;">
                      <!-- <i style="width: 15px;height: 4px;display: block; margin-right: 6px;margin-top: 6px;float: left;"></i> -->
                      <span style="font-size: 12px; color: #FF3300;">{{ nll_undefined(barData_lin.value4) }}</span>
                    </div> 
                  </div>
                  <!-- <div></div> -->
                </van-col>


              </van-row>
            </i>
            <!-- 图例结束 style="height: 50vw"-->






          <div
            @touchstart="canvas_qiehuan.canvas_toli_kg2 = true"
            @touchend="canvas_qiehuan.canvas_toli_kg2 = false"
            ref="chart3" :style="canvas_css"
            style="padding-top: 0px; padding-bottom: 10px;margin: 0 auto;"
          ></div>
        </section>
        <!-- 总时效月趋结束 -->



        <!-- 发货仓库节点时效月趋开始 -->
        <section
          style="
            padding-top: 5px;
            padding-bottom: 5px;
            border-radius: 4px;
            margin-left: 10px;
            margin-right: 10px;
            margin-bottom: 0px;
          "
          :style="(sel_value.Range_on.Range_set=='2'||sel_value.Range_on.Range_set=='3')?{'display':'block'}:{'display':'none'}"
        >
          <div
            class="section-title"
            style="padding-left: 0px; padding-bottom: 0px; color: #000000"
          >
            {{ sel_value.Range_on.Range_set=='2'?'单量趋势':'渠道成本趋势'}}
          </div>
        </section>

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
          :style="(sel_value.Range_on.Range_set=='2'||sel_value.Range_on.Range_set=='3')?{'display':'block'}:{'display':'none'}"
        >






            <!-- 图例开始 -->
            <!-- <i style="font-style: normal;display: block;height:40px;"></i> -->
            <i style="font-style: normal;display: none; margin-bottom: 10px;padding-top: 10px; padding-left: 10px; padding-right: 10px;"
            :style="(sel_value.Range_on.Range_set=='2')?{'height':'90px'}:{'height':'40px'}">
              <van-row  type="flex" justify="center" :style="canvas_qiehuan.canvas_toli_kg3==true?canvas_qiehuan.canvas_toli_cssy:canvas_qiehuan.canvas_toli_cssn">
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
                      <span style="font-size: 12px; color: #FF3300;">{{ barData_lin2.month }}</span>
                    </div> 
                  </div>
                  <!-- <div></div> -->
                </van-col>


                <van-col span="6">
                  <div>
                    <div style="margin: 0 auto; width: 75px; height: 17px;">
                      <div style="height: 17px;display: block;float: left;">
                        <div style="width: 100%; height: 8px;"></div>
                        <i style="width: 15px;height: 2px;background-color: #1678FF;display: block; margin-right: 6px;"></i>
                      </div>
                      <div style="font-size: 12px;"><span>{{(sel_value.Range_on.Range_set=='2')?'总时效':'总成本'}}</span></div>

                      

                    </div>
                    <div style="text-align: center;">
                      <!-- <i style="width: 15px;height: 4px;display: block; margin-right: 6px;margin-top: 6px;float: left;"></i> -->
                      <span style="font-size: 12px; color: #FF3300;">{{ barData_lin2.value1 }}</span>
                    </div> 
                  </div>
                  <!-- <div></div> -->

                </van-col>



                <van-col span="6">
                  <div>
                    <div style="margin: 0 auto; width: 75px; height: 17px;">
                      <div style="height: 17px;display: block;float: left;">
                        <div style="width: 100%; height: 8px;"></div>
                        <i style="width: 15px;height: 2px;background-color: #08D631;display: block; margin-right: 6px;"></i>
                      </div>
                      <div style="font-size: 12px;"><span>{{(sel_value.Range_on.Range_set=='2')?'直达时效':'物流成本'}}</span></div>

                    </div>
                    <div style="text-align: center;">
                      <!-- <i style="width: 15px;height: 4px;display: block; margin-right: 6px;margin-top: 6px;float: left;"></i> -->
                      <span style="font-size: 12px; color: #FF3300;">{{ barData_lin2.value2 }}</span>
                    </div> 
                  </div>
                  <!-- <div></div> -->

                </van-col>

                
                <van-col span="6">
                  <div>
                    <div style="margin: 0 auto; width: 75px; height: 17px;">
                      <div style="height: 17px;display: block;float: left;">
                        <div style="width: 100%; height: 8px;"></div>
                        <i style="width: 15px;height: 2px;background-color: #F8A52A;display: block; margin-right: 6px;"></i>

                      </div>  
    
                      <div style="font-size: 12px;"><span>{{(sel_value.Range_on.Range_set=='2')?'转运时效':'三包成本'}}</span></div>
                    </div>
                    <div style="text-align: center;">
                      <!-- <i style="width: 15px;height: 4px;display: block; margin-right: 6px;margin-top: 6px;float: left;"></i> -->
                      <span style="font-size: 12px; color: #FF3300;">{{ barData_lin2.value3 }}</span>
                    </div> 
                  </div>
                  <!-- <div></div> -->
                </van-col>
              </van-row>

              <!-- 第二列图例 -->
              <van-row v-if="sel_value.Range_on.Range_set=='2'"  type="flex" justify="center" 
              :style="canvas_qiehuan.canvas_toli_kg3==true?
              Object.assign({},canvas_qiehuan.canvas_toli_cssy,{'padding-top':'10px'}) 
              :
              Object.assign({},canvas_qiehuan.canvas_toli_cssn,{'padding-top':'10px'})"
              
              >
                <!-- <van-col span="6">span: 6</van-col> -->



                <van-col span="6">
                  <div>
                    <div style="margin: 0 auto; width: 75px; height: 17px;">
                      <div style="height: 17px;display: block;float: left;">
                        <div style="width: 100%; height: 8px;"></div>
                        <i style="width: 15px;height: 2px;background-color: #0A0A8F;display: block; margin-right: 6px;"></i>
                      </div>
                      <div style="font-size: 12px;"><span>集货时效</span></div>

                    </div>
                    <div style="text-align: center;">
                      <!-- <i style="width: 15px;height: 4px;display: block; margin-right: 6px;margin-top: 6px;float: left;"></i> -->
                      <span style="font-size: 12px; color: #FF3300;">{{ barData_lin2.value4 }}</span>
                    </div> 
                  </div>
                  <!-- <div></div> -->

                </van-col>


                <van-col span="6">
                  <div>
                    <div style="margin: 0 auto; width: 75px; height: 17px;">
                      <div style="height: 17px;display: block;float: left;">
                        <div style="width: 100%; height: 8px;"></div>
                        <i style="width: 15px;height: 2px;background-color: #CF57ED;display: block; margin-right: 6px;"></i>
                      </div>
                      <div style="font-size: 12px;"><span>中转时效</span></div>

                    </div>
                    <div style="text-align: center;">
                      <!-- <i style="width: 15px;height: 4px;display: block; margin-right: 6px;margin-top: 6px;float: left;"></i> -->
                      <span style="font-size: 12px; color: #FF3300;">{{ barData_lin2.value5 }}</span>
                    </div> 
                  </div>
                  <!-- <div></div> -->

                </van-col>



                <van-col span="6">
                  <div>
                    <div style="margin: 0 auto; width: 75px; height: 17px;">
                      <div style="height: 17px;display: block;float: left;">
                        <div style="width: 100%; height: 8px;"></div>
                        <i style="width: 15px;height: 2px;background-color: #57CFED;display: block; margin-right: 6px;"></i>
                      </div>
                      <div style="font-size: 12px;"><span>预约时效</span></div>

                    </div>
                    <div style="text-align: center;">
                      <!-- <i style="width: 15px;height: 4px;display: block; margin-right: 6px;margin-top: 6px;float: left;"></i> -->
                      <span style="font-size: 12px; color: #FF3300;">{{ barData_lin2.value6 }}</span>
                    </div> 
                  </div>
                  <!-- <div></div> -->

                </van-col>

                
                <van-col span="6">
                  <div>
                    <div style="margin: 0 auto; width: 75px; height: 17px;">
                      <div style="height: 17px;display: block;float: left;">
                        <div style="width: 100%; height: 8px;"></div>
                        <i style="width: 15px;height: 2px;background-color: #F81919;display: block; margin-right: 6px;"></i>

                      </div>
    
                      <div style="font-size: 12px;"><span>支装时效</span></div>
                    </div>
                    <div style="text-align: center;">
                      <!-- <i style="width: 15px;height: 4px;display: block; margin-right: 6px;margin-top: 6px;float: left;"></i> -->
                      <span style="font-size: 12px; color: #FF3300;">{{ barData_lin2.value7 }}</span>
                    </div> 
                  </div>
                  <!-- <div></div> -->
                </van-col>
              </van-row>
            </i>
            <!-- 图例结束 style="height: 50vw"-->



          <div
            @touchstart="canvas_qiehuan.canvas_toli_kg3 = true"
            @touchend="canvas_qiehuan.canvas_toli_kg3 = false"
            ref="chart4" :style="canvas_css"
            style="padding-top: 20px; margin: 0 auto; padding-bottom: 10px;"
          ></div>
        </section>
        <!-- 发货仓库节点时效月趋结束 -->



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
  Picker,
  Icon,
} from "vant";

export default {
  name: "Logistics_con",
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
    [Picker.name]:Picker,
    [Icon.name]:Icon,
    BottomCss:bottom_css
  },

  data() {
    return {
      isLoading: false,

      test_time_date:['2020年01月','2020年02月','2020年03月','2020年04月','2020年05月','2020年06月','2020年07月','2020年08月','2020年09月','2020年10月','2020年11月','2020年12月',],
      ym_default_index:"",
      show: false,
      question_show: false,
      data_load_time:'',



      activeNames: ['1'],

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
          Range_set: "1",
        },

        target: {
          all_muri_value: "",
        },

        // 业绩分类联动数
        qudao_guanjan_setvalue:'',
        qudao_guanjan_more:false,

        qudao_guanjan: {
          qudao_guanj_pd: "1",
        },
        ssyjqs: {
          ssyjqs_pd: "1",
        },
        ssyjqs_floor: {
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

      click_css_set: { type: "info", color: "#23B0A8" },
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
        "padding-left": "5px",
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
        "padding-left": "5px",
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
          // background: "rgb(230, 230, 230)",
          background: "rgb(247, 247, 247)",
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
          "background-color": "#E6E6E6",
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
        canvas_toli_kg3: false,

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

      barData_lin:{
        month:0,
        value1:0,
        value2:0,
        value3:0,
        value4:0,
      },

      barData_lin2:{
        month:0,
        value1:0,
        value2:0,
        value3:0,
        value4:0,
        value5:0,
        value6:0,
        value7:0,
      },


      canvas_css: {
        width: "",
        height: "200px",
      },
      yjdc_css: {
        width: "100px",
        // "background-color": "#e6e6e6"
      },

      data: {
        // "LC_PL-THREE_COST": "",
        // "LC_INV-INSTOCK_AMT": "",
        // "LC_INV-OUTSTOCK_AMT": "",
        // "LC_INV-STOCKLOC_RATIO": "",
        // "LC_INV-IN_OUT_INV_AMT_M":"",
        // "LC_PL-TURNOVER_RATE": "",
        // "LC_INV-STOCK_AMT": "",
        // "LC_PL-LC_PERIOD_STOCK": "",
        // "LC_PL-LC_PERIOD": "",
        // "LC_PL-LOGISTICS_COST": "",
        // "LC_PL-DLVR_COST": "",

        "LC_PL-LC_PERIOD_STOCK":"",
        "LC_INV-INSTOCK_AMT":"",
        "LC_INV-IN_OUT_INV_AMT_M":"",
        "LC_INV-OUTSTOCK_AMT":"",
        "LC_INV-STOCKLOC_RATIO":"",
        "LC_INV-STOCK_AMT":"",
        "LC_PL-TURNOVER_RATE":"",
        "LC_PL-LC_PERIOD":"",
        "LC_PL-DLVR_COST":"",
        "LC_INV-STOCK_NAME_AMT":"",
        "LC_PL-DLVR_COST_CHNL":"",
        "LC_PL-PERIOD_STOCK":"",

      },
      echarts_clear:false,
      echarts2_clear:false,

    };
  },

  computed: {
    ...mapState("user", ["permissionList"]), //大概的意思是获取权限
  },

  created() {
    this.hexinzhibiao.width = window.innerWidth - 30 + "px";
    this.canvas_css.width = window.innerWidth - 20-20 + "px";

    this.time_update_now();

    this.$EventBus.$emit("data_loay_set", {
      data_loay_seton: false,
    });


    // const [p1, resolve1] = generatePromise();
    // this.p1 = p1;
    // const apiMap = {

    //   // LC_PL-LC_PERIOD
    //   //承运管理
    //   "SQL-LC_PL-LC_PERIOD":{resultProp:"LC_PERIOD"},
    //   "SQL-LC_PL-PERIOD_STOCK":{resultProp:"PERIOD_STOCK"},

    //   // 库存周转率
    //   "SQL-LC_PL-LC_PERIOD_STOCK":{resultProp:"LC_PERIOD_STOCK"},
    //   "SQL-LC_INV-INSTOCK_AMT":{resultProp:"INSTOCK_AMT"},
    //   "SQL-LC_INV-IN_OUT_INV_AMT_M":{resultProp:"IN_OUT_INV_AMT_M"},
    //   "SQL-LC_INV-OUTSTOCK_AMT":{resultProp:"OUTSTOCK_AMT"},
    //   "SQL-LC_INV-STOCKLOC_RATIO":{resultProp:"STOCKLOC_RATIO"},

    //   "SQL-LC_INV-STOCK_AMT":{resultProp:"STOCK_AMT"},
    //   "SQL-LC_PL-TURNOVER_RATE":{resultProp:"TURNOVER_RATE"},
    //   "SQL-LC_INV-STOCK_NAME_AMT":{resultProp:"STOCK_NAME_AMT"},
    //   "SQL-LC_PL-DLVR_COST":{resultProp:"DLVR_COST"},
    //   "SQL-LC_PL-DLVR_COST_CHNL":{type: Array, resolve: resolve1},

    // };

    // Object.keys(apiMap).forEach((key) => {
    //   if (this.permissionList[key]) {
    //     const [, prefix, interfaceName] = key.split("-"); //把上面的拆分出来

    //     if (prefix && interfaceName) {
    //       // console.log(prefix+"              "+interfaceName);
    //       this.$axios
    //         .post(`/api/admin/data/${prefix}/${interfaceName}/get`, {})
    //         .then(({ data }) => {
    //           if (apiMap[key].type === Array) {
    //             this.data[`${prefix}-${interfaceName}`] = data;
    //           } else {
    //             this.data[`${prefix}-${interfaceName}`] = data;
    //           }

    //           if (apiMap[key].resolve) {
    //             apiMap[key].resolve();
    //             this.$EventBus.$emit("data_loay_set", {
    //               data_loay_seton: true,
    //             });
    //           }
    //         });
    //     }
    //   }
    // });


    const apiMap2 = {

      //承运管理

      "SQL-LC_PL-LC_PERIOD_D":{resultProp:"LC_PERIOD_D"},
      "SQL-LC_PL-LC_PERIOD_TREND":{resultProp:"LC_PERIOD_TREND"},
      // "SQL-LC_PL-LC_PERIOD_STOCK":{resultProp:"LC_PERIOD_STOCK"},   //测试有没有用的
      "SQL-LC_PL-PERIOD_STOCK_D":{resultProp:"PERIOD_STOCK_D"}, 
      "SQL-LC_PL-LC_PERIOD_M":{resultProp:"LC_PERIOD_M"}, 
      "SQL-LC_PL-PERIOD_STOCK_M":{resultProp:"PERIOD_STOCK_M"}, 

    };

    this.ajax_data(apiMap2);


    // console.log(this.data);
    // console.log(generatePromise);

    console.log(decimal2Percent);
    console.log(calcSignClass);
  },

  mounted() {
    this.$EventBus.$on("Salechan_choice_f", (Range_value_set) => {
      // console.log("父类传值过来的！！！！物流1");
      // console.log(Range_value_set.Range_value_set);
      this.sel_value.Range_on.Range_set=Range_value_set.Range_value_set;
      
      // if(Range_value_set.Range_value_set=='1'){
      //   this.data_Logistics();
      // }else 
      
      if(Range_value_set.Range_value_set=='2'){
        this.data_Logistics();
        // 承运管理
        this.echarts_clear=true;
        this.echarts2_clear=true;
        this.initChart3();
        this.initChart4();
      }
      
      // else if(Range_value_set.Range_value_set=='3'){
      //   this.data_Logistics();
      //   this.initChart4();
      // }

    });

    console.log("============运行到物流！！！！============");

    this.sel_value.Range_on.Range_set="2";
    // this.initChart();
    // this.initChart2();
    this.Single_choice('day_7',['_this.data_Logistics()'],true,'_this.sel_value.day_set')

    this.Single_choice('all_muri_value','', 1, '_this.sel_value.target')

    // // 承运管理
    this.initChart3();
    this.initChart4();

    // 核心指标填充
    // this.data_Logistics();
  },

  methods: {

    onRefresh() {

      this.$EventBus.$emit("data_loay_set", {
        data_loay_seton: false,
      });
      let apiMap3 = {
        //承运管理
        "SQL-LC_PL-LC_PERIOD_D":{resultProp:"LC_PERIOD_D"},
        "SQL-LC_PL-LC_PERIOD_TREND":{resultProp:"LC_PERIOD_TREND"},
        // "SQL-LC_PL-LC_PERIOD_STOCK":{resultProp:"LC_PERIOD_STOCK"},  // 测试有没有用的
        "SQL-LC_PL-PERIOD_STOCK_D":{resultProp:"PERIOD_STOCK_D"}, 
        "SQL-LC_PL-LC_PERIOD_M":{resultProp:"LC_PERIOD_M"}, 
        "SQL-LC_PL-PERIOD_STOCK_M":{resultProp:"PERIOD_STOCK_M"}, 
      };
      this.ajax_data(apiMap3);

      this.p1.then(() => {
        this.isLoading = false;
        this.data_Logistics();
        this.initChart3();
        this.initChart4();
      });

    },



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
      this.Single_choice('month',['_this.data_Logistics()','_this.initChart3()','_this.initChart4()','_this.echarts_clear=true'],true,'_this.sel_value.day_set')

    },

    onChange(picker, value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
    },
    onCancel() {
      console.log('取消');
      this.show = false;
    },
    showPopup() {
      this.show = true;
    },
    showPopup_sm(){
      this.question_show=true;
    },

    showPopup_close(){
      this.activeNames=[];
    },





    qudao_guanjan_more_set(set_value){
      // if(this.sel_value.qudao_guanjan_more==false){
      //   this.sel_value.qudao_guanjan_more=true;
      // }else{
      //   this.sel_value.qudao_guanjan_more=false;
      //   this.Single_choice('ssyjqs_pd',['_this.initChart4()'],(1),'_this.sel_value.ssyjqs')
      // }
      if(set_value==1){
        this.sel_value.qudao_guanjan_more=true;
        this.Single_choice('ssyjqs_pd',['_this.initChart4()'],(4),'_this.sel_value.ssyjqs_floor')
      }else{
        this.sel_value.qudao_guanjan_more=false;
      }

      // console.log("==========asdadass==============");
      // console.log(set_value);

    },

    data_Logistics() {

          this.sel_title.quota_value.cont1 = 0;
          this.sel_title.quota_value.cont2 = 0;
          this.sel_title.quota_value.cont3 = 0; 
          this.sel_title.quota_value.cont4 = 0;
          this.sel_title.quota_value.cont5 = 0;
          this.sel_title.quota_value.cont6 = 0;
          this.sel_title.quota_value.cont7 = 0;
          this.sel_title.quota_value.cont8 = 0;
          this.sel_title.quota_value.cont9 = 0; 
          this.sel_title.quota_value.cont10 = 0;
          this.sel_title.quota_value.cont11 = 0;
          this.sel_title.quota_value.cont12 = 0;


        // 做T+1处理开始
        // let year_now_time=new Date();
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
        let time_t1_on= _time_now.getFullYear() +"" +
        (_time_now.getMonth() + 1 >= 1 && _time_now.getMonth() + 1 <= 9? "0" + (_time_now.getMonth() + 1): _time_now.getMonth() + 1) +""+
        (_time_now.getDate()<=9?"0"+_time_now.getDate():_time_now.getDate());
        // 做T+1处理结束
        // this.set_time=time_t1_on;
        this.data_load_time=time_t1_on.substring(0,4)+'.'+time_t1_on.substring(4,6)+'.'+time_t1_on.substring(6,8);

        // 做近7天和近30天的逻辑处理开始
        let _time_now_day=new Date();
        _time_now_day=_time_now_day.getTime()-(24*60*60*1000*((this.sel_value.day_set.day_7)?7:30));
        _time_now_day=new Date(_time_now_day);
        let time_t1_on_userday= _time_now_day.getFullYear() +"" +
        (_time_now_day.getMonth() + 1 >= 1 && _time_now_day.getMonth() + 1 <= 9? "0" + (_time_now_day.getMonth() + 1): _time_now_day.getMonth() + 1) +""+
        (_time_now_day.getDate()<=9?"0"+_time_now_day.getDate():_time_now_day.getDate());
        // 做近7天和近30天的逻辑处理结束

        this.set_time_range.start=time_t1_on_userday.substring(0,4)+'.'+time_t1_on_userday.substring(4,6)+'.'+time_t1_on_userday.substring(6,8);
        this.set_time_range.end=time_t1_on.substring(0,4)+'.'+time_t1_on.substring(4,6)+'.'+time_t1_on.substring(6,8);



      this.p1.then(() => {

        console.log("运行到数据填充栏========================");
        // console.log(this.sel_value.Range_on.Range_set);


        if(this.sel_value.Range_on.Range_set=='1'){


          let kcje_val=this.data_time_select(this.data["LC_INV-STOCK_AMT"],this.set_time,'','TMONTH');
          this.sel_title.quota_value.cont1 = kcje_val.TM_STOCK_AMT||0;
          this.sel_title.quota_value.cont2 = kcje_val.YOY_STOCK_AMT||0;
          this.sel_title.quota_value.cont3 = kcje_val.TM_STOCKLOC_USE_RATE||0; 

          // "！！周转率" 
          let zzl_val=this.data_time_select(this.data["LC_PL-TURNOVER_RATE"],this.set_time,'','TMONTH');
          // this.data["LC_PL-TURNOVER_RATE"][0].STOCK_AMT || 0;
          this.sel_title.quota_value.cont4 =zzl_val.TM_TURNOVER_RATE||0;
          this.sel_title.quota_value.cont5 = zzl_val.YOY_TURNOVER_RATE||0;
          this.sel_title.quota_value.cont6 = zzl_val.MOM_TURNOVER_RATE||0;

          Object.keys(this.data["LC_INV-IN_OUT_INV_AMT_M"]).forEach((key) => {
            if((this.data["LC_INV-IN_OUT_INV_AMT_M"][key].TMONTH).substring(0,7)==(this.set_time.substring(0, 7))){
              this.sel_title.quota_value.cont7 = this.data["LC_INV-IN_OUT_INV_AMT_M"][key].TM_INSTOCK_AMOUNT_SALE || 0;
              this.sel_title.quota_value.cont8 = this.data["LC_INV-IN_OUT_INV_AMT_M"][key].YOY_INSTOCK_AMOUNT_SALE || 0;
              this.sel_title.quota_value.cont9 = this.data["LC_INV-IN_OUT_INV_AMT_M"][key].MOM_INSTOCK_AMOUNT_SALE ||0;
              this.sel_title.quota_value.cont10 = this.data["LC_INV-IN_OUT_INV_AMT_M"][key].TM_SHIP_AMOUNT_SALE || 0;
              this.sel_title.quota_value.cont11 = this.data["LC_INV-IN_OUT_INV_AMT_M"][key].YOY_SHIP_AMOUNT_SALE || 0;
              this.sel_title.quota_value.cont12 = this.data["LC_INV-IN_OUT_INV_AMT_M"][key].SHIP_CMPLT_RT || 0;
            }
          });          

        }else if(this.sel_value.Range_on.Range_set=='2'){
          console.log("承运管理！！");

          console.log(this.data["LC_PL-LC_PERIOD_D"]);
          // console.log(this.set_time);
          console.log(time_t1_on);


                 

          if(this.sel_value.day_set.day_7==true){
            let cygl_val=this.data_time_select(this.data["LC_PL-LC_PERIOD_D"],time_t1_on,'','TDATE_WID',8);  
            this.sel_title.quota_value.cont1 = cygl_val.TP_AVG_PERIOD_7D||0;
            this.sel_title.quota_value.cont2 = cygl_val.POP_AVG_PERIOD_7D||0;
            this.sel_title.quota_value.cont3 = cygl_val.TP_AVG_MAINLINE_PERIOD_7D||0; 
            this.sel_title.quota_value.cont4 =cygl_val.POP_AVG_MAINLINE_PERIOD_7D||0;
            this.sel_title.quota_value.cont5 = cygl_val.TP_AVG_INSTALL_PERIOD_7D||0;
            this.sel_title.quota_value.cont6 = cygl_val.POP_AVG_INSTALL_PERIOD_7D||0;            

          }else if(this.sel_value.day_set.day_30==true){  
            let cygl_val=this.data_time_select(this.data["LC_PL-LC_PERIOD_D"],time_t1_on,'','TDATE_WID',8);  
            this.sel_title.quota_value.cont1 = cygl_val.TP_AVG_PERIOD_30D||0;
            this.sel_title.quota_value.cont2 = cygl_val.POP_AVG_PERIOD_30D||0;
            this.sel_title.quota_value.cont3 = cygl_val.TP_AVG_MAINLINE_PERIOD_30D||0; 
            this.sel_title.quota_value.cont4 =cygl_val.POP_AVG_MAINLINE_PERIOD_30D||0;
            this.sel_title.quota_value.cont5 = cygl_val.TP_AVG_INSTALL_PERIOD_30D||0;
            this.sel_title.quota_value.cont6 = cygl_val.POP_AVG_INSTALL_PERIOD_30D||0;  

          }else if(this.sel_value.day_set.month==true){

            
            let cygl_val=this.data_time_select(this.data["LC_PL-LC_PERIOD_M"],this.set_time,'','TMONTH',7);
            this.sel_title.quota_value.cont1 = cygl_val.TP_AVG_PERIOD||0;
            this.sel_title.quota_value.cont2 = cygl_val.POP_AVG_PERIOD||0;
            this.sel_title.quota_value.cont3 = cygl_val.TP_AVGAINLINE_PERIOD||0; 
            this.sel_title.quota_value.cont4 =cygl_val.POP_AVGAINLINE_PERIOD||0;
            this.sel_title.quota_value.cont5 = cygl_val.TP_AVG_INSTALL_PERIOD||0;
            this.sel_title.quota_value.cont6 = cygl_val.POP_AVG_INSTALL_PERIOD||0;  

            console.log(cygl_val);
            console.log(this.data["LC_PL-LC_PERIOD_M"]);



          }





          // console.log(cygl_val);

          this.sel_value.qudao_guanjan_setvalue=[];
          // this.sel_value.qudao_guanjan_setvalue=["总仓库","佛山仓库","青岛仓库","集货订单",];
          this.sel_value.qudao_guanjan_setvalue=["总计","直发订单","集货订单","佛山直发","青岛直发"];




        }else if(this.sel_value.Range_on.Range_set=='3'){
          console.log("物流三包成本！！");

          let wlsbcb=this.data_time_select(this.data["LC_PL-DLVR_COST"],this.set_time,'','TMONTH');

          this.sel_title.quota_value.cont1 = wlsbcb.TM_TOT_FEE||0;
          this.sel_title.quota_value.cont2 = wlsbcb.YOY_DIFF_TOT_FEE||0;
          this.sel_title.quota_value.cont3 = wlsbcb.YOY_TOT_FEE||0; 

          this.sel_title.quota_value.cont4 = wlsbcb.TM_LOGISTIC_DLVR_FEE||0;
          this.sel_title.quota_value.cont5 = wlsbcb.YOY_DIFF_LOGISTIC_DLVR_FEE||0;
          this.sel_title.quota_value.cont6 = wlsbcb.YOY_LOGISTIC_DLVR_FEE||0;

          this.sel_title.quota_value.cont7 = wlsbcb.TM_THREE_SERVICE_FEE||0;
          this.sel_title.quota_value.cont8 = wlsbcb.YOY_DIFF_THREE_SERVICE_FEE||0;
          this.sel_title.quota_value.cont9 = wlsbcb.YOY_THREE_SERVICE_FEE||0;

          // console.log(this.data["LC_PL-DLVR_COST"]);

          this.sel_value.qudao_guanjan_setvalue=[];
          this.sel_value.qudao_guanjan_setvalue=["集团","平台","直营","采购经销","返点经销","海外经销","林氏经销"];


        }



        // console.log(this.sel_title.quota_value.cont1);
        // console.log(this.data);
        // LC_PL-LC_PERIOD
        // LC_INV-STOCK_AMT
      });
    },


    data_time_select(data_seton_s,time_on,type,pd_time,sub_num,time_day){
      let set_on_data=[];
      sub_num=sub_num?sub_num:7;

      // console.log(time_day);
      // console.log(time_on);

      Object.keys(data_seton_s).forEach((key_value_on) => {  
        if(time_day!=undefined){
          if(data_seton_s[key_value_on][pd_time].substring(0,sub_num)>=time_day.substring(0,sub_num)&&
              data_seton_s[key_value_on][pd_time].substring(0,sub_num)<=time_on.substring(0,sub_num)){
            if(type=="push"){
              set_on_data.push(data_seton_s[key_value_on]);
            }else{
              set_on_data=data_seton_s[key_value_on];
            }
          }
        }else{
          if(data_seton_s[key_value_on][pd_time].substring(0,sub_num)==time_on.substring(0,sub_num)){
            if(type=="push"){
              set_on_data.push(data_seton_s[key_value_on]);
            }else{
              set_on_data=data_seton_s[key_value_on];
            }
          }
        }

      });

      return set_on_data;

    },



    initChart() {
      this.chartIns = echarts.init(this.$refs["chart"]);
      this.p1.then(() => {

        let hour_data = [];
        let sale_amt = [];
        let user_data = [];

        let time_set_on='2021-02';//this.set_time=
        

        // console.log("================库存分布分析！==================");
        // console.log(this.set_time.substring(0, 7));
        // console.log((this.data["LC_INV-STOCK_AMT"][0].TMONTH_WID).substring(0,4));
        // console.log((this.data["LC_INV-STOCK_AMT"][0].TMONTH_WID).substring(4,6));
        // console.log(time_set_on)
        // console.log(user_data);


        if(this.sel_value.Range_on.Range_set=='1'){
          // user_data=this.data["LC_INV-IN_OUT_INV_AMT_M"];
          user_data=this.data["LC_INV-STOCK_NAME_AMT"];

          Object.keys(user_data).forEach((key_value) => {
            if (user_data[key_value].TMONTH.substring(0,7) ==time_set_on.substring(0, 7)) {

              hour_data.push(user_data[key_value].STOCK_NAME);
              sale_amt.push(((user_data[key_value].STOCK_AMT)/10000||0).toFixed(1));

            }
          });


          user_data.sort((a, b) => {
            let a_time = "";
            let b_time = "";
            a_time = a["STOCK_AMT"];
            b_time = b["STOCK_AMT"];
            return b_time - a_time;
          });


        }else if(this.sel_value.Range_on.Range_set=='2'){
          console.log("承运管理！！！");


        }else if(this.sel_value.Range_on.Range_set=='3'){
          console.log("物流三包成本！！！");

        }

        // console.log(user_data);




        // Object.keys(this.data["LC_INV-STOCK_AMT"]).forEach((key_value) => {
        //   if (
        //     this.data["LC_INV-STOCK_AMT"][key_value].TMONTH_WID.substring(
        //       0,
        //       4
        //     ) +
        //       "-" +
        //       this.data["LC_INV-STOCK_AMT"][key_value].TMONTH_WID.substring(
        //         4,
        //         6
        //       ) ==
        //     time_set_on.substring(0, 7)
        //   ) {

        //     hour_data.push(this.data["LC_INV-STOCK_AMT"][key_value].STOCK_NAME);
        //     sale_amt.push(((this.data["LC_INV-STOCK_AMT"][key_value].STOCK_AMT)/10000||0).toFixed(2));

        //   }
        // });


        // console.log(hour_data);
        // console.log(sale_amt);


        this.chartIns.setOption({

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

            formatter:function (params) {

              // console.log(params);
              // console.log(params[0].value+"  "+params[0].name);

              return params[0].marker+params[0].name+'：'+params[0].value+'万'

            }



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
              name: "库存分布分析",
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



      });
    },

    initChart2() {
      this.chartIns2 = echarts.init(this.$refs["chart2"]);

      // let _time_now=new Date();

      let _time_now=new Date();
      _time_now=_time_now.getTime()-(24*60*60*1000);
      _time_now=new Date(_time_now);



      // let year_now = _time_now;
      // year_now = year_now.getFullYear();

      

      
      this.p1.then(() => {

        let hour_data = [];
        let sale_amt = [];  //入库金额
        let ago_amt = [];  //出库金额
        let user_data = [];
        let _this=this;

        if(this.sel_value.Range_on.Range_set=='1'){

          console.log("========库存周转=========")
          user_data=this.data["LC_INV-IN_OUT_INV_AMT_M"];

          user_data.sort((a, b) => {
              let a_time = "";
              let b_time = "";
              a_time = new Date(a["TMONTH"].substring(0,10)).getTime(new Date(a["TMONTH"].substring(0,10)));
              b_time = new Date(b["TMONTH"].substring(0,10)).getTime(new Date(b["TMONTH"].substring(0,10)));

              return a_time - b_time;
          });

          // console.log(user_data);



        }else if(this.sel_value.Range_on.Range_set=='2'){

          console.log("========承运管理=========")


        }else if(this.sel_value.Range_on.Range_set=='3'){

          console.log("=========物流三包成本=============")
          
        }

        // console.log(user_data);
        // console.log(_time_now.getDate());
        // console.log(_time_now.getFullYear());

        Object.keys(user_data).forEach((key_value2) => {

          if(user_data[key_value2].TMONTH_WID.substring(0,4)== (_time_now.getFullYear()+'')){

            hour_data.push(user_data[key_value2].TMONTH_WID.substring(4,6)*1+'月');
            sale_amt.push((user_data[key_value2].TM_INSTOCK_AMOUNT_SALE/10000).toFixed(1));
            ago_amt.push((user_data[key_value2].TM_SHIP_AMOUNT_SALE/10000).toFixed(1));

          }

        });

        // console.log(hour_data);




        // Object.keys(this.data["LC_INV-INSTOCK_AMT"]).forEach((key_value2) => {

        //   hour_data.push(this.data["LC_INV-INSTOCK_AMT"][key_value2].TDATE.substring(5,10));
        //   sale_amt.push(((this.data["LC_INV-INSTOCK_AMT"][key_value2].MON_INSTOCK_AMOUNT_SALE/10000)||0).toFixed(2));
        //   ago_amt.push(((this.data["LC_INV-INSTOCK_AMT"][key_value2].MON_SHIP_AMOUNT_SALE/10000)||0).toFixed(2));

        // });



        let month_on=(((_time_now.getMonth()+1)>9)?(_time_now.getMonth()+1):'0'+(_time_now.getMonth()+1));
        this.barData.month=(_time_now.getFullYear())+'-'+month_on;
        Object.keys(hour_data).forEach((key_mv) => {
          if(hour_data[key_mv]==((_time_now.getMonth()+1)+'月')){
            this.barData.value=sale_amt[key_mv]+'万'
            this.barData.ago_value=ago_amt[key_mv]+'万'
          }
        });  

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
              data: ["发货金额", "入库金额"],
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

              formatter:function (params) {

                _this.barData.value =(params[1]==undefined)? 0:params[1].value+'万';
                _this.barData.ago_value =(params[0]==undefined)? 0: params[0].value+'万';
                _this.barData.month =(params[0]==undefined)? 0: params[0].axisValue;

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
                name: "发货金额",
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
                name: "入库金额",
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



    initChart3() {
      this.chartIns3 = echarts.init(this.$refs["chart3"]);
      this.p1.then(() => {

          if(this.echarts_clear==true){
            this.chartIns3.clear();
            this.echarts_clear=false;
          }

          // let _time_now=new Date();
          // _time_now=_time_now.getTime()-(24*60*60*1000);
          // _time_now=new Date(_time_now);

          // sel_value.target.all_muri_value 


          // 做T+1处理开始
          // let year_now_time=new Date();
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
          let time_t1_on= _time_now.getFullYear() +"-" +
          (_time_now.getMonth() + 1 >= 1 && _time_now.getMonth() + 1 <= 9? "0" + (_time_now.getMonth() + 1): _time_now.getMonth() + 1) +"-"+
          (_time_now.getDate()<=9?"0"+_time_now.getDate():_time_now.getDate());
          // 做T+1处理结束
          // this.set_time=time_t1_on;
          let time_set_on=time_t1_on;//this.set_time=


          // 做近7天和近30天的逻辑处理开始
          let _time_now_day=new Date();
          _time_now_day=_time_now_day.getTime()-(24*60*60*1000*((this.sel_value.day_set.day_7)?7:30));
          _time_now_day=new Date(_time_now_day);
          let time_t1_on_userday= _time_now_day.getFullYear() +"-" +
          (_time_now_day.getMonth() + 1 >= 1 && _time_now_day.getMonth() + 1 <= 9? "0" + (_time_now_day.getMonth() + 1): _time_now_day.getMonth() + 1) +"-"+
          (_time_now_day.getDate()<=9?"0"+_time_now_day.getDate():_time_now_day.getDate());
          // 做近7天和近30天的逻辑处理结束



          let hour_data = [];
          let all_amt = [];   //总仓库
          let fs_amt = [];    //佛山仓库
          let qd_amt = [];    //青岛仓库
          let jh_amt = [];    //集货订单
          let user_data = [];
          let year_add_time=[]; //增加年时间
          let _this=this;


          if(this.sel_value.Range_on.Range_set=='1'){
            console.log("========库存周转initChart3()=========")

          }else if(this.sel_value.Range_on.Range_set=='2'){

            console.log("========承运管理initChart3()=========")
            // user_data=this.data["LC_PL-PERIOD_STOCK"];
            
            // console.log(time_set_on);
            // console.log(time_t1_on_userday);
            // console.log(this.data["LC_PL-LC_PERIOD_TREND"][0].TDATE.substring(0,10));
            // console.log(this.data["LC_PL-LC_PERIOD_TREND"][0].TDATE.substring(5,7));
            // console.log(this.data["LC_PL-LC_PERIOD_TREND"][0].TDATE.substring(8,10));


            if(this.sel_value.day_set.day_7==true||this.sel_value.day_set.day_30==true){

              if(this.sel_value.target.all_muri_value==1){
                user_data=this.data_time_select(this.data["LC_PL-LC_PERIOD_TREND"],time_set_on,'push','TDATE',10,time_t1_on_userday);
                user_data.sort((a, b) => {
                    let a_time = "";
                    let b_time = "";
                    a_time = new Date(a["TDATE"].substring(0,10)).getTime(new Date(a["TDATE"].substring(0,10)));
                    b_time = new Date(b["TDATE"].substring(0,10)).getTime(new Date(b["TDATE"].substring(0,10)));
                    return a_time - b_time;
                });
                // console.log(user_data);
                Object.keys(user_data).forEach((key_mv) => {
                  hour_data.push(user_data[key_mv].TDATE.substring(5,7)+'.'+user_data[key_mv].TDATE.substring(8,10));
                  year_add_time.push(user_data[key_mv].TDATE.substring(0,4));  
                  all_amt.push(user_data[key_mv].AVG_PERIOD.toFixed(2));
                });
              }else if(this.sel_value.target.all_muri_value==2){

                all_amt=[];
                user_data=this.data_time_select(this.data["LC_PL-PERIOD_STOCK_D"],time_set_on,'push','TDATE',10,time_t1_on_userday);
                user_data.sort((a, b) => {
                    let a_time = "";
                    let b_time = "";
                    a_time = new Date(a["TDATE"].substring(0,10)).getTime(new Date(a["TDATE"].substring(0,10)));
                    b_time = new Date(b["TDATE"].substring(0,10)).getTime(new Date(b["TDATE"].substring(0,10)));
                    return a_time - b_time;
                });

                Object.keys(user_data).forEach((key_mv) => {
                  hour_data.push(user_data[key_mv].TDATE.substring(5,7)+'.'+user_data[key_mv].TDATE.substring(8,10));
                  year_add_time.push(user_data[key_mv].TDATE.substring(0,4));
                  // all_amt.push(user_data[key_mv].TOT_PERIOD.toFixed(2));
                  if(user_data[key_mv].DELIVERYSTOCK_NAME=='佛山仓库'){
                    fs_amt.push(user_data[key_mv].AVG_MAINLINE_PERIOD.toFixed(2));
                  }else if(user_data[key_mv].DELIVERYSTOCK_NAME=='青岛仓库'){
                    qd_amt.push(user_data[key_mv].AVG_MAINLINE_PERIOD.toFixed(2));
                  }else if(user_data[key_mv].DELIVERYSTOCK_NAME=='集货订单'){
                    jh_amt.push(user_data[key_mv].AVG_MAINLINE_PERIOD.toFixed(2));
                  }

                });
                // console.log(this.data["LC_PL-PERIOD_STOCK_D"]);
                // console.log(user_data);

              }else if(this.sel_value.target.all_muri_value==3){

                all_amt=[];
                user_data=this.data_time_select(this.data["LC_PL-PERIOD_STOCK_D"],time_set_on,'push','TDATE',10,time_t1_on_userday);
                user_data.sort((a, b) => {
                    let a_time = "";
                    let b_time = "";
                    a_time = new Date(a["TDATE"].substring(0,10)).getTime(new Date(a["TDATE"].substring(0,10)));
                    b_time = new Date(b["TDATE"].substring(0,10)).getTime(new Date(b["TDATE"].substring(0,10)));
                    return a_time - b_time;
                });

                Object.keys(user_data).forEach((key_mv) => {
                  hour_data.push(user_data[key_mv].TDATE.substring(5,7)+'.'+user_data[key_mv].TDATE.substring(8,10));
                  year_add_time.push(user_data[key_mv].TDATE.substring(0,4));
                  // all_amt.push(user_data[key_mv].TOT_PERIOD.toFixed(2));
                  if(user_data[key_mv].DELIVERYSTOCK_NAME=='佛山仓库'){
                    fs_amt.push(user_data[key_mv].AVG_INSTALL_PERIOD.toFixed(2));
                  }else if(user_data[key_mv].DELIVERYSTOCK_NAME=='青岛仓库'){
                    qd_amt.push(user_data[key_mv].AVG_INSTALL_PERIOD.toFixed(2));
                  }else if(user_data[key_mv].DELIVERYSTOCK_NAME=='集货订单'){
                    jh_amt.push(user_data[key_mv].AVG_INSTALL_PERIOD.toFixed(2));
                  }

                });
                
              }

            }else{

              if(this.sel_value.target.all_muri_value==1){

                
                // console.log(this.data["LC_PL-LC_PERIOD_M"]);
                // console.log(this.data["LC_PL-PERIOD_STOCK_M"]);



                user_data=this.data_time_select(this.data["LC_PL-LC_PERIOD_M"],(this.set_time.substring(0,4)),'push','TMONTH_WID',4);
                user_data.sort((a, b) => {
                    let a_time = "";
                    let b_time = "";
                    a_time = new Date(a["TMONTH"].substring(0,10)).getTime(new Date(a["TMONTH"].substring(0,10)));
                    b_time = new Date(b["TMONTH"].substring(0,10)).getTime(new Date(b["TMONTH"].substring(0,10)));
                    return a_time - b_time;
                });
                Object.keys(user_data).forEach((key_mv) => {
                  hour_data.push(user_data[key_mv].TMONTH.substring(5,7)*1+'月');
                  year_add_time.push(user_data[key_mv].TMONTH.substring(0,4));
                  all_amt.push(user_data[key_mv].TP_AVG_PERIOD.toFixed(2));
                });

                // console.log(this.set_time+"    aasdadasdasdasdasd");
                // console.log(user_data);



              }else if(this.sel_value.target.all_muri_value==2){

                // console.log(this.data["LC_PL-LC_PERIOD_STOCK"]);
                // console.log(this.data["LC_PL-PERIOD_STOCK_M"]);

                // user_data=this.data_time_select(this.data["LC_PL-LC_PERIOD_STOCK"],(this.set_time.substring(0,4)),'push','TMONTH_WID',4); 
                user_data=this.data_time_select(this.data["LC_PL-PERIOD_STOCK_M"],(this.set_time.substring(0,4)),'push','TMONTH_WID',4); 

                user_data.sort((a, b) => {
                    let a_time = "";
                    let b_time = "";
                    a_time = new Date(a["TMONTH"].substring(0,10)).getTime(new Date(a["TMONTH"].substring(0,10)));
                    b_time = new Date(b["TMONTH"].substring(0,10)).getTime(new Date(b["TMONTH"].substring(0,10)));
                    return a_time - b_time;
                });

                // console.log(this.data["LC_PL-LC_PERIOD_STOCK"][0].TMONTH_WID.substring(4,6));
                Object.keys(user_data).forEach((key_mv) => {
                  hour_data.push(user_data[key_mv].TMONTH_WID.substring(4,6)*1+'月');
                  year_add_time.push(user_data[key_mv].TMONTH_WID.substring(0,4));
                  // all_amt.push(user_data[key_mv].TOT_PERIOD.toFixed(2));
                  if(user_data[key_mv].DELIVERYSTOCK_NAME=='佛山仓库'){
                    fs_amt.push((user_data[key_mv].AVG_MAINLINE_PERIOD||0).toFixed(2));
                  }else if(user_data[key_mv].DELIVERYSTOCK_NAME=='青岛仓库'){
                    qd_amt.push((user_data[key_mv].AVG_MAINLINE_PERIOD||0).toFixed(2));
                  }else if(user_data[key_mv].DELIVERYSTOCK_NAME=='集货订单'){
                    jh_amt.push((user_data[key_mv].AVG_MAINLINE_PERIOD||0).toFixed(2));
                  }
                });



              }else if(this.sel_value.target.all_muri_value==3){

                // console.log(this.data["LC_PL-LC_PERIOD_STOCK"]);
                // user_data=this.data_time_select(this.data["LC_PL-LC_PERIOD_STOCK"],(this.set_time.substring(0,4)),'push','TMONTH_WID',4);
                user_data=this.data_time_select(this.data["LC_PL-PERIOD_STOCK_M"],(this.set_time.substring(0,4)),'push','TMONTH_WID',4);

                user_data.sort((a, b) => {
                    let a_time = "";
                    let b_time = "";
                    a_time = new Date(a["TMONTH"].substring(0,10)).getTime(new Date(a["TMONTH"].substring(0,10)));
                    b_time = new Date(b["TMONTH"].substring(0,10)).getTime(new Date(b["TMONTH"].substring(0,10)));
                    return a_time - b_time;
                });

                Object.keys(user_data).forEach((key_mv) => {  
                  hour_data.push(user_data[key_mv].TMONTH_WID.substring(4,6)*1+'月');
                  year_add_time.push(user_data[key_mv].TMONTH_WID.substring(0,4));
                  // all_amt.push(user_data[key_mv].TOT_PERIOD.toFixed(2));
                  if(user_data[key_mv].DELIVERYSTOCK_NAME=='佛山仓库'){
                    fs_amt.push(user_data[key_mv].AVG_INSTALL_PERIOD.toFixed(2));
                  }else if(user_data[key_mv].DELIVERYSTOCK_NAME=='青岛仓库'){
                    qd_amt.push(user_data[key_mv].AVG_INSTALL_PERIOD.toFixed(2));
                  }else if(user_data[key_mv].DELIVERYSTOCK_NAME=='集货订单'){
                    jh_amt.push(user_data[key_mv].AVG_INSTALL_PERIOD.toFixed(2));
                  }
                });
                // console.log('3');

              }

              // console.log("月");

            }


            // LC_PL	


            hour_data=this.unique(hour_data);
            year_add_time=this.unique(year_add_time);

            // console.log(all_amt); 
            // console.log(fs_amt);
            // console.log(qd_amt); 
            // console.log(jh_amt);
            // console.log(hour_data);

   
          }else if(this.sel_value.Range_on.Range_set=='3'){
            console.log("=========物流三包成本initChart3()=============")

          }





          if(this.sel_value.day_set.day_7==true||this.sel_value.day_set.day_30==true){

            // this.barData_lin.month=hour_data[hour_data.length-1];
            this.barData_lin.month=((hour_data[hour_data.length-1].substring(0,2)=='12'&&year_add_time.length>1)?year_add_time[0]-1:year_add_time[0])+'.'+hour_data[hour_data.length-1];
            this.barData_lin.value1=all_amt[all_amt.length-1]+('天');
            this.barData_lin.value2=fs_amt[fs_amt.length-1]+('天');
            this.barData_lin.value3=qd_amt[qd_amt.length-1]+('天');
            this.barData_lin.value4=jh_amt[jh_amt.length-1]+('天');
            
          }else{

            let month_on=(((_time_now.getMonth()+1)>9)?(_time_now.getMonth()+1):'0'+(_time_now.getMonth()+1));

            this.barData_lin.month=(_time_now.getFullYear())+'.'+month_on;
            Object.keys(hour_data).forEach((key_mv) => {
              if(hour_data[key_mv]==((_time_now.getMonth()+1)+'月')){
                this.barData_lin.value1=all_amt[key_mv]+('天');
                this.barData_lin.value2=fs_amt[key_mv]+('天');
                this.barData_lin.value3=qd_amt[key_mv]+('天');
                this.barData_lin.value4=jh_amt[key_mv]+('天');
              }    
            });  

          }





        this.chartIns3.setOption({

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
              data: ["总仓库", "佛山仓库"],
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
                if(_this.sel_value.target.all_muri_value==1){
                  // _this.barData_lin.month =(params[0]==undefined)? '--': params[0].axisValue;
                  _this.barData_lin.value1 =(params[0]==undefined)? '--':params[0].value+'天';
                }else{

                  _this.barData_lin.value4 =(params[2]==undefined)? '--': params[2].value+'天';
                  _this.barData_lin.value3 =(params[1]==undefined)? '--': params[1].value+'天';
                  _this.barData_lin.value2 =(params[0]==undefined)? '--': params[0].value+'天';
                  // _this.barData_lin.month =(params[0]==undefined)? '--': params[0].axisValue;

                }

                if(_this.sel_value.day_set.month==true){
                  _this.barData_lin.month =(params[0]==undefined)? 0: year_add_time[0]+'.'+
                  (params[0].axisValue.replace(/[^0-9]/ig,"")<9?'0'+params[0].axisValue.replace(/[^0-9]/ig,""):params[0].axisValue.replace(/[^0-9]/ig,""));
                }else{
                  let year_set_on=((params[0].axisValue.replace(/[^0-9]/ig,"").substring(0,2)=='12'&&year_add_time.length>1)?year_add_time[0]-1:year_add_time[0])
                  _this.barData_lin.month =(params[0]==undefined)? 0: year_set_on+'.'+params[0].axisValue;
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
              name: "总仓库",
              showSymbol: false,
              smooth: false, //true 为平滑曲线，false为直线
              itemStyle: {
                color: "#0938F7",
                normal: {
                  color: "#1678FF",
                  lineStyle: {
                    color: "#1678FF",
                    width: 2, //设置线条粗细
                  },
                  areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                      {
                        offset: 0,
                        color: "rgba(22,120,255, 0)",
                      },
                      {
                        offset: 0.1,
                        color: "rgba(22,120,255, 0)",
                      },
                      {
                        offset: 0.6,
                        color: "rgba(22,120,255, 0.1)",
                      },
                      {
                        offset: 1,
                        color: "rgba(22,120,255, 0.1)",
                      },
                    ]),
                  },
                },
              },
              data: all_amt,
              type: "line",
              areaStyle: {},
            },
            
            {
              name: "佛山仓库",
              showSymbol: false,
              smooth: false, //true 为平滑曲线，false为直线
              itemStyle: {
                color: "#919191",
                normal: {
                  color: "#1678FF", 
                  lineStyle: {
                    // color: "#BBBBBB  08D631",
                    color: "#1678FF",
                    width: 1, //设置线条粗细
                  },
                  areaStyle: {
                    color: "rgba(255, 255, 255, 0.00)",
                  },
                },
              },
              data: fs_amt,
              type: "line",
              areaStyle: {},
            },

            {
              name: "青岛仓库",
              showSymbol: false,
              smooth: false, //true 为平滑曲线，false为直线
              itemStyle: {
                color: "#919191",
                normal: {
                  color: "#F8A52A",
                  lineStyle: {
                    // color: "#BBBBBB",
                    color: "#F8A52A",
                    width: 1, //设置线条粗细
                  },
                  areaStyle: {
                    color: "rgba(255, 255, 255, 0.00)",
                  },
                },
              },
              data: qd_amt,
              type: "line",
              areaStyle: {},
            },

            {
              name: "集货订单",
              showSymbol: false,
              smooth: false, //true 为平滑曲线，false为直线
              itemStyle: {
                color: "#919191",
                normal: {
                  color: "#657798",
                  lineStyle: {
                    // color: "#BBBBBB  0A0A8F",
                    color: "#657798",
                    width: 1, //设置线条粗细
                  },
                  areaStyle: {
                    color: "rgba(255, 255, 255, 0.00)",
                  },
                },
              },
              data: jh_amt,
              type: "line",
              areaStyle: {},
            },


          ],
        });
      });
    },



    initChart4() {
      this.chartIns4 = echarts.init(this.$refs["chart4"]);
      this.p1.then(() => {

          if(this.echarts2_clear==true){
            this.chartIns4.clear();
            this.echarts2_clear2=false;
          }
          // let _time_now=new Date();
          // _time_now=_time_now.getTime()-(24*60*60*1000);
          // _time_now=new Date(_time_now);
          // _time_now='2020';

          // 做T+1处理开始
          // let year_now_time=new Date();
          let _time_now=new Date();
          _time_now=_time_now.getTime()-(24*60*60*1000);
          _time_now=new Date(_time_now);
          let time_t1_on= _time_now.getFullYear() +"-" +
          (_time_now.getMonth() + 1 >= 1 && _time_now.getMonth() + 1 <= 9? "0" + (_time_now.getMonth() + 1): _time_now.getMonth() + 1) +"-"+
          (_time_now.getDate()<=9?"0"+_time_now.getDate():_time_now.getDate());
          // 做T+1处理结束
          // this.set_time=time_t1_on;
          let time_set_on=time_t1_on;//this.set_time=


          // 做近7天和近30天的逻辑处理开始
          let _time_now_day=new Date();
          _time_now_day=_time_now_day.getTime()-(24*60*60*1000*((this.sel_value.day_set.day_7)?7:30));
          _time_now_day=new Date(_time_now_day);
          let time_t1_on_userday= _time_now_day.getFullYear() +"-" +
          (_time_now_day.getMonth() + 1 >= 1 && _time_now_day.getMonth() + 1 <= 9? "0" + (_time_now_day.getMonth() + 1): _time_now_day.getMonth() + 1) +"-"+
          (_time_now_day.getDate()<=9?"0"+_time_now_day.getDate():_time_now_day.getDate());
          // 做近7天和近30天的逻辑处理结束




          // sel_value.target.all_muri_value  
          let user_data=[];
          let hour_data = [];
          let zd_amt=[];  //直达时效  3.总成本
          // let zy_amt=[];  //转运时效  3.物流成本
          // let jh_amt=[];  //集货时效  3.三包成本
          // let zz_amt=[];  //中转时效
          // let yy_amt=[];  //预约时效

          let zhiz_amt=[]; //签收数量
          let all_amt=[];  //发货数量
          // user_data=this.data["LC_PL-PERIOD_STOCK"];
          // console.log(user_data);
          let series_data=[];
          let _this=this;

          console.log("===========运行到发货仓库节点initChart4()=============");

          if(this.sel_value.Range_on.Range_set=='1'){
            console.log("运行到库存周转");

          }else if(this.sel_value.Range_on.Range_set=='2'){

            console.log("运行到承运管理");


            console.log(time_set_on);
            console.log(time_t1_on_userday);

            if(this.sel_value.day_set.day_7==true||this.sel_value.day_set.day_30==true){

              if(this.sel_value.target.all_muri_value==1){
                user_data=this.data_time_select(this.data["LC_PL-LC_PERIOD_TREND"],time_set_on,'push','TDATE',10,time_t1_on_userday);
                user_data.sort((a, b) => {
                    let a_time = "";
                    let b_time = "";
                    a_time = new Date(a["TDATE"].substring(0,10)).getTime(new Date(a["TDATE"].substring(0,10)));
                    b_time = new Date(b["TDATE"].substring(0,10)).getTime(new Date(b["TDATE"].substring(0,10)));
                    return a_time - b_time;
                });
                // console.log(user_data);
                Object.keys(user_data).forEach((key_mv) => {
                  hour_data.push(user_data[key_mv].TDATE.substring(5,7)+'.'+user_data[key_mv].TDATE.substring(8,10));
                  // all_amt.push(user_data[key_mv].SEND_QTY.toFixed(0));
                  all_amt.push(user_data[key_mv].SIGN_QTY.toFixed(0));
                  // zhiz_amt.push(user_data[key_mv].SIGN_QTY.toFixed(0));
                });
              }else if(this.sel_value.target.all_muri_value==2){

                all_amt=[];
                user_data=this.data_time_select(this.data["LC_PL-PERIOD_STOCK_D"],time_set_on,'push','TDATE',10,time_t1_on_userday);
                user_data.sort((a, b) => {
                    let a_time = "";
                    let b_time = "";
                    a_time = new Date(a["TDATE"].substring(0,10)).getTime(new Date(a["TDATE"].substring(0,10)));
                    b_time = new Date(b["TDATE"].substring(0,10)).getTime(new Date(b["TDATE"].substring(0,10)));
                    return a_time - b_time;
                });

                Object.keys(user_data).forEach((key_mv) => {
                  hour_data.push(user_data[key_mv].TDATE.substring(5,7)+'.'+user_data[key_mv].TDATE.substring(8,10));
                  // all_amt.push(user_data[key_mv].TOT_PERIOD.toFixed(2));
                  if(user_data[key_mv].DELIVERYSTOCK_NAME=='佛山仓库'){
                    all_amt.push(user_data[key_mv].SEND_QTY.toFixed(0));
                  }else if(user_data[key_mv].DELIVERYSTOCK_NAME=='青岛仓库'){
                    zhiz_amt.push(user_data[key_mv].SEND_QTY.toFixed(0));
                  }else if(user_data[key_mv].DELIVERYSTOCK_NAME=='集货订单'){
                    zd_amt.push(user_data[key_mv].SEND_QTY.toFixed(0));
                  }

                });
                // console.log(this.data["LC_PL-PERIOD_STOCK_D"]);
                // console.log(user_data);
                // console.log(hour_data);
                // console.log('2');

              }else if(this.sel_value.target.all_muri_value==3){

                all_amt=[];
                user_data=this.data_time_select(this.data["LC_PL-PERIOD_STOCK_D"],time_set_on,'push','TDATE',10,time_t1_on_userday);
                user_data.sort((a, b) => {
                    let a_time = "";
                    let b_time = "";
                    a_time = new Date(a["TDATE"].substring(0,10)).getTime(new Date(a["TDATE"].substring(0,10)));
                    b_time = new Date(b["TDATE"].substring(0,10)).getTime(new Date(b["TDATE"].substring(0,10)));
                    return a_time - b_time;
                });

                Object.keys(user_data).forEach((key_mv) => {
                  hour_data.push(user_data[key_mv].TDATE.substring(5,7)+'.'+user_data[key_mv].TDATE.substring(8,10));
                  // all_amt.push(user_data[key_mv].TOT_PERIOD.toFixed(2));
                  if(user_data[key_mv].DELIVERYSTOCK_NAME=='佛山仓库'){
                    all_amt.push(user_data[key_mv].SIGN_QTY.toFixed(0));
                  }else if(user_data[key_mv].DELIVERYSTOCK_NAME=='青岛仓库'){
                    zhiz_amt.push(user_data[key_mv].SIGN_QTY.toFixed(0));
                  }else if(user_data[key_mv].DELIVERYSTOCK_NAME=='集货订单'){
                    zd_amt.push(user_data[key_mv].SIGN_QTY.toFixed(0));
                  }

                });
                console.log('3');
                
              }

            }else{

              if(this.sel_value.target.all_muri_value==1){

                user_data=this.data_time_select(this.data["LC_PL-LC_PERIOD_M"],(this.set_time.substring(0,4)),'push','TMONTH_WID',4);
                user_data.sort((a, b) => {
                    let a_time = "";
                    let b_time = "";
                    a_time = new Date(a["TMONTH"].substring(0,10)).getTime(new Date(a["TMONTH"].substring(0,10)));
                    b_time = new Date(b["TMONTH"].substring(0,10)).getTime(new Date(b["TMONTH"].substring(0,10)));
                    return a_time - b_time;
                });
                Object.keys(user_data).forEach((key_mv) => {
                  hour_data.push(user_data[key_mv].TMONTH.substring(5,7)+'月');
                  // all_amt.push(user_data[key_mv].TP_SEND_QTY.toFixed(0));
                  all_amt.push(user_data[key_mv].TP_SIGN_QTY.toFixed(0));
                  // zhiz_amt.push(user_data[key_mv].TP_SIGN_QTY.toFixed(0));
                });

                // console.log(this.set_time+"    aasdadasdasdasdasd");
                // console.log(user_data);


              }else if(this.sel_value.target.all_muri_value==2){

                // console.log(this.data["LC_PL-LC_PERIOD_STOCK"]);
                // console.log(this.data["LC_PL-PERIOD_STOCK_M"]);
                all_amt=[0,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ];
                zhiz_amt=[0,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ];
                zd_amt=[0,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ];


                // user_data=this.data_time_select(this.data["LC_PL-LC_PERIOD_STOCK"],(this.set_time.substring(0,4)),'push','TMONTH_WID',4); 
                user_data=this.data_time_select(this.data["LC_PL-PERIOD_STOCK_M"],(this.set_time.substring(0,4)),'push','TMONTH_WID',4); 

                user_data.sort((a, b) => {
                    let a_time = "";
                    let b_time = "";
                    a_time = new Date(a["TMONTH"].substring(0,10)).getTime(new Date(a["TMONTH"].substring(0,10)));
                    b_time = new Date(b["TMONTH"].substring(0,10)).getTime(new Date(b["TMONTH"].substring(0,10)));
                    return a_time - b_time;
                });

                // console.log(this.data["LC_PL-LC_PERIOD_STOCK"][0].TMONTH_WID.substring(4,6));
                Object.keys(user_data).forEach((key_mv) => {
                  hour_data.push(user_data[key_mv].TMONTH_WID.substring(4,6)+'月');
                  // all_amt.push(user_data[key_mv].TOT_PERIOD.toFixed(2));
                  if(user_data[key_mv].TMONTH_WID.substring(0,4)==(this.set_time.substring(0,4))&&user_data[key_mv].DELIVERYSTOCK_NAME=='佛山仓库'){
                    // all_amt.push((user_data[key_mv].SEND_QTY||0).toFixed(0));
                    all_amt.splice(((user_data[key_mv].TMONTH_WID.substring(4,6)*1)-1),1,user_data[key_mv].SEND_QTY.toFixed(0));

                  }else if(user_data[key_mv].TMONTH_WID.substring(0,4)==(this.set_time.substring(0,4))&&user_data[key_mv].DELIVERYSTOCK_NAME=='青岛仓库'){
                    // zhiz_amt.push((user_data[key_mv].SEND_QTY||0).toFixed(0));
                    zhiz_amt.splice(((user_data[key_mv].TMONTH_WID.substring(4,6)*1)-1),1,user_data[key_mv].SEND_QTY.toFixed(0));

                  }else if(user_data[key_mv].TMONTH_WID.substring(0,4)==(this.set_time.substring(0,4))&&user_data[key_mv].DELIVERYSTOCK_NAME=='集货订单'){
                    // zd_amt.push((user_data[key_mv].SEND_QTY||0).toFixed(0));
                    zd_amt.splice(((user_data[key_mv].TMONTH_WID.substring(4,6)*1)-1),1,user_data[key_mv].SEND_QTY.toFixed(0));

                  }
                });



              }else if(this.sel_value.target.all_muri_value==3){

                all_amt=[0,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ];
                zhiz_amt=[0,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ];
                zd_amt=[0,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ];

                // let test_aaa=[];

                // console.log(this.data["LC_PL-LC_PERIOD_STOCK"]);
                // user_data=this.data_time_select(this.data["LC_PL-LC_PERIOD_STOCK"],(this.set_time.substring(0,4)),'push','TMONTH_WID',4);
                user_data=this.data_time_select(this.data["LC_PL-PERIOD_STOCK_M"],(this.set_time.substring(0,4)),'push','TMONTH_WID',4);

                user_data.sort((a, b) => {
                    let a_time = "";
                    let b_time = "";
                    a_time = new Date(a["TMONTH"].substring(0,10)).getTime(new Date(a["TMONTH"].substring(0,10)));
                    b_time = new Date(b["TMONTH"].substring(0,10)).getTime(new Date(b["TMONTH"].substring(0,10)));
                    return a_time - b_time;
                });

                Object.keys(user_data).forEach((key_mv) => {  
                  hour_data.push(user_data[key_mv].TMONTH_WID.substring(4,6)+'月');
                  // all_amt.push(user_data[key_mv].TOT_PERIOD.toFixed(2));
                  if(user_data[key_mv].TMONTH_WID.substring(0,4)==(this.set_time.substring(0,4))&&user_data[key_mv].DELIVERYSTOCK_NAME=='佛山仓库'){
                    // all_amt.push(user_data[key_mv].SIGN_QTY.toFixed(0));
                    all_amt.splice(((user_data[key_mv].TMONTH_WID.substring(4,6)*1)-1),1,user_data[key_mv].SIGN_QTY.toFixed(0));
                    // test_aaa.push(user_data[key_mv]);

                  }else if(user_data[key_mv].TMONTH_WID.substring(0,4)==(this.set_time.substring(0,4))&&user_data[key_mv].DELIVERYSTOCK_NAME=='青岛仓库'){
                    // zhiz_amt.push(user_data[key_mv].SIGN_QTY.toFixed(0));
                    zhiz_amt.splice(((user_data[key_mv].TMONTH_WID.substring(4,6)*1)-1),1,user_data[key_mv].SIGN_QTY.toFixed(0));

                  }else if(user_data[key_mv].TMONTH_WID.substring(0,4)==(this.set_time.substring(0,4))&&user_data[key_mv].DELIVERYSTOCK_NAME=='集货订单'){
                    // zd_amt.push(user_data[key_mv].SIGN_QTY.toFixed(0));
                    zd_amt.splice(((user_data[key_mv].TMONTH_WID.substring(4,6)*1)-1),1,user_data[key_mv].SIGN_QTY.toFixed(0));
                  }
                });

                console.log('3');

                // console.log(test_aaa);
                // console.log(zhiz_amt);
                // console.log(all_amt);
                // console.log(zd_amt);
                // console.log(hour_data);

              }

              // console.log("=======月======");

            }

            hour_data=this.unique(hour_data);
            // console.log(hour_data);



            series_data=[

                {
                  name: this.sel_value.target.all_muri_value!=1?'佛山直发':"已签收",
                  showSymbol: false,
                  smooth: false, //true 为平滑曲线，false为直线
                  stack: '单量趋势',
                  itemStyle: {
                    color: "#0938F7",
                    normal: {
                      color: "#1678FF",
                      lineStyle: {
                        color: "#1678FF",
                        width: 2, //设置线条粗细
                      },
                      areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                          {
                            offset: 0,
                            color: "rgba(22,120,255, 0)",
                          },
                          {
                            offset: 0.1,
                            color: "rgba(22,120,255, 0)",
                          },
                          {
                            offset: 0.6,
                            color: "rgba(22,120,255, 0.1)",
                          },
                          {
                            offset: 1,
                            color: "rgba(22,120,255, 0.1)",
                          },
                        ]),
                      },
                    },
                  },
                  barWidth:all_amt.length>4? '60%':'30%',
                  data: all_amt,
                  type: "bar",
                  areaStyle: {},
                },

                {
                  name: this.sel_value.target.all_muri_value!=1?'青岛直发':"",
                  showSymbol: false,
                  smooth: false, //true 为平滑曲线，false为直线
                  stack:'单量趋势',
                  itemStyle: {
                    color: "#919191",
                    normal: {
                      color: "#E78D08",
                      lineStyle: {
                        // color: "#BBBBBB",
                        color: "#E78D08",
                        width: 1, //设置线条粗细
                      },
                      areaStyle: {
                        color: "rgba(255, 255, 255, 0.00)",
                      },
                    },
                  },
                  barWidth:zhiz_amt.length>4? '60%':'30%',
                  data: zhiz_amt,
                  type: "bar",
                  areaStyle: {},
                },
  
                {
                  name: this.sel_value.target.all_muri_value!=1?'多仓发货':"发货单量",
                  showSymbol: false,
                  smooth: false, //true 为平滑曲线，false为直线
                  stack:'单量趋势',
                  itemStyle: {
                    color: "#919191",
                    normal: {
                      color: "#BBBBBB", 
                      lineStyle: {
                        // color: "#BBBBBB",
                        color: "#BBBBBB",
                        width: 1, //设置线条粗细
                      },
                      areaStyle: {
                        color: "rgba(255, 255, 255, 0.00)",
                      },
                    },
                  },
                  barWidth:zd_amt.length>4? '60%':'30%',
                  data: zd_amt,
                  type: "bar",
                  areaStyle: {},
                },




            ]

            

          }else if(this.sel_value.Range_on.Range_set=='3'){
            console.log("物流三包成本");
          }


          // console.log(hour_data);
          // console.log(zd_amt);
          // console.log(zy_amt);
          // console.log(jh_amt);


          // console.log(zz_amt);
          // console.log(yy_amt);
          // console.log(zhiz_amt);
          // console.log(all_amt);





        _this.chartIns4.setOption({


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
              data: ["总时效", "直达时效","转运时效","集货时效","中转时效","预约时效","支装时效"],
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

            // tooltip: {
            //   trigger: "axis",
            //   axisPointer: {
            //     type: "cross",
            //     label: {
            //       color: "#000000",
            //       backgroundColor: "aliceblue",
            //     },
            //   },
            //   formatter:function (params) {
            //     // _this.barData.value =(params[1]==undefined)? 0:params[1].value;
            //     // _this.barData.ago_value =(params[0]==undefined)? 0: params[0].value;
            //     if(_this.sel_value.Range_on.Range_set=='2'){
            //       _this.barData_lin2.value7 =(params[6]==undefined)? '--': params[6].value;
            //       _this.barData_lin2.value6 =(params[5]==undefined)? '--': params[5].value;
            //       _this.barData_lin2.value5 =(params[4]==undefined)? '--': params[4].value;
            //       _this.barData_lin2.value4 =(params[3]==undefined)? '--': params[3].value;
            //       _this.barData_lin2.value3 =(params[2]==undefined)? '--': params[2].value;
            //       _this.barData_lin2.value2 =(params[1]==undefined)? '--': params[1].value;
            //       _this.barData_lin2.value1 =(params[0]==undefined)? '--': params[0].value;
            //       _this.barData_lin2.month =(params[0]==undefined)? 0: params[0].axisValue;                  
            //     }else if(_this.sel_value.Range_on.Range_set=='3'){
            //       _this.barData_lin2.value3 =(params[2]==undefined)? '--': params[2].value;
            //       _this.barData_lin2.value2 =(params[1]==undefined)? '--': params[1].value;
            //       _this.barData_lin2.value1 =(params[0]==undefined)? '--': params[0].value;
            //       _this.barData_lin2.month =(params[0]==undefined)? 0: params[0].axisValue;   
            //     }
            //   }
            // },

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


    nll_undefined(setvalue){
      // setvalue=setvalue==undefined?'--':setvalue;
      // return setvalue;
      setvalue=setvalue.toString();
      setvalue=setvalue.indexOf("undefined")==-1?setvalue:'--';
      return setvalue;
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
  },

  //生命周期结束之前销毁
  beforeDestroy() {
    this.$EventBus.$off("Salechan_choice_f");
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
  width: 75px;
  display: block;
  margin: 0 auto;
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
  width: 20%;
  font-size: 12px;
  color: #999999;
}

.table_all .table_content ul li {
  float: left;
  width: 20%;
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
  width: 80%;
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

.table_all {
  padding-top: 10px;
}
.table_all ul li {
  height: 30px;
  padding-bottom: 10px;
}
.table_all .table_title ul li {
  float: left;
  width: 25%;
  font-size: 12px;
  color: #999999;
}

.table_all .table_content ul li {
  float: left;
  width: 25%;
  font-size: 12px;
  // color: #999999;
}

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







.yjqs_clss,.yjqs_clss2{
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 10px;
  // height: 24px;
}

.yjqs_clss ul,.yjqs_clss2 ul{
  
}

.yjqs_clss ul li,.yjqs_clss2 ul li{
  width: 19%;
  background: rgb(35, 176, 168);
  border-radius: 4px;
  height: 24px;
  float: left;
  margin-right: 1.25%;
  text-align: center;
  line-height: 25px;
  font-size: 12px;
}

.yjqs_clss2 ul li{
  margin-top: 10px;

}



.van-icon_d:before {
   
    position: relative;
    display: inline-block;
    font: normal normal normal 14px/1 vant-icon;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;

    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-transition: -webkit-transform .3s;
    transition: -webkit-transform .3s;
    transition: transform .3s;
    transition: transform .3s,-webkit-transform .3s;
}

.van-icon_u:before {
    
    position: relative;
    display: inline-block;
    font: normal normal normal 14px/1 vant-icon;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;

    -webkit-transform: rotate(-90deg);
    transform: rotate(-90deg);
    -webkit-transition: -webkit-transform .3s;
    transition: -webkit-transform .3s;
    transition: transform .3s;
    transition: transform .3s,-webkit-transform .3s;
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



// ::-webkit-scrollbar-thumb {//滚动条的设置
// background-color:#dddddd;
// background-clip:padding-box;
// min-height:28px;
// }

</style>
