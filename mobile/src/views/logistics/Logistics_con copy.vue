<template>
  <!-- <div style="min-height: 100vh">
    <div style="text-align: center">
      <in-progress style="width: 100px; height: 100px" />
      <div style="color: #ccc">开发中</div>
    </div>
  </div> -->

  <div class="Productmarket_all">
    <!-- 滑屏开始 -->
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
        <div
          class="section-title"
          style="padding-left: 0px; padding-bottom: 0px; color: #999999"
        >
          {{ "更新时间：" + "2021-01-28" }}
        </div>
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
          display: none;
        "
      >
        <div class="Productmarket_day">
          <van-row type="flex" justify="center">
            <van-col span="5"
              ><van-button
                :type="sel_value.day_1 ? click_css_set.type : click_css_no.type"
                class="but_set_select"
                :color="
                  sel_value.day_1 ? click_css_set.color : click_css_no.color
                "
                >1天</van-button
              ></van-col
            >

            <!--  -->
            <van-col span="5"
              ><van-button
                :type="
                  sel_value.Range_set == 3
                    ? sel_value.day_7
                      ? click_css_set.type
                      : click_css_no.type
                    : click_css_no_grey.type
                "
                class="but_no_select"
                :color="
                  sel_value.Range_set == 3
                    ? sel_value.day_7
                      ? click_css_set.color
                      : click_css_no.color
                    : click_css_no_grey.color
                "
                >近7天</van-button
              ></van-col
            >
            <van-col span="5"
              ><van-button
                :type="
                  sel_value.Range_set == 3
                    ? sel_value.day_30
                      ? click_css_set.type
                      : click_css_no.type
                    : click_css_no_grey.type
                "
                class="but_no_select"
                :color="
                  sel_value.Range_set == 3
                    ? sel_value.day_30
                      ? click_css_set.color
                      : click_css_no.color
                    : click_css_no_grey.color
                "
                >近30天</van-button
              ></van-col
            >
            <van-col span="5"
              ><van-button
                :type="sel_value.month ? click_css_set.type : click_css_no.type"
                class="but_no_select"
                :color="
                  sel_value.month ? click_css_set.color : click_css_no.color
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
            >（时间范围：）</span
          >
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
            margin-left: 10px;
            margin-right: 10px;
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

            class="Productmarket_labqie_con1"
            :style="
              sel_value.target.all_muri_value == 1
                ? click_css_hxzb_y
                : click_css_hxzb_n
            "
          >
            <span
              :class="
                sel_value.target.all_muri_value == 1 ? 'title_change' : ''
              "
              :style="sum_zhibiao.title"
              >总时效</span
            >
            <span :style="sum_zhibiao.zhognxin">{{(sel_title.quota_value.cont1||0).toFixed(2)+'天'}}</span>

            <span :style="sum_zhibiao.body">
              <i style="width: 31%; display: inline-block; font-style: normal"
                >环比</i
              >
              <i style="font-style: normal"
              :class="Number(sel_title.quota_value.cont2) > 0? 'rate-up': 'rate-down'"
              > 
                {{((sel_title.quota_value.cont2||0)*100).toFixed(1)+'%'}}
              </i>
            </span>
          </div>

<!-- @click="Single_choice('all_muri_value',['_this.initChart()'],2,'_this.sel_value.target')" -->
          <div
            class="Productmarket_labqie_con2"
            :style="
              sel_value.target.all_muri_value == 2
                ? click_css_hxzb_y
                : click_css_hxzb_n
            "
          >
            <span
              :class="
                sel_value.target.all_muri_value == 2 ? 'title_change' : ''
              "
              :style="sum_zhibiao.title"
              >干线时效</span
            >
            <span :style="sum_zhibiao.zhognxin">{{(sel_title.quota_value.cont3||0).toFixed(2)+'天'}}</span>

            <span :style="sum_zhibiao.body">
              <i style="width: 31%; display: inline-block; font-style: normal"
                >环比</i
              >
              <i style="font-style: normal"
              :class="Number(sel_title.quota_value.cont4) > 0? 'rate-up': 'rate-down'"
              >
                {{((sel_title.quota_value.cont4||0)*100).toFixed(1)+'%'}}
              </i>
            </span>
          </div>

<!--             @click="
              Single_choice(
                'all_muri_value',
                ['_this.initChart()'],
                3,
                '_this.sel_value.target'
              )
            " -->

          <div

            class="Productmarket_labqie_con3"
            :style="
              sel_value.target.all_muri_value == 3
                ? Object.assign({}, click_css_hxzb_y, { 'margin-right': '0%' })
                : Object.assign({}, click_css_hxzb_n, { 'margin-right': '0%' })
            "
          >
            <span
              :class="
                sel_value.target.all_muri_value == 3 ? 'title_change' : ''
              "
              :style="sum_zhibiao.title"
              >支装时效</span
            >
            <span :style="sum_zhibiao.zhognxin">{{(sel_title.quota_value.cont5||0).toFixed(2)+'天'}}</span>

            <span :style="sum_zhibiao.body">
              <i style="width: 31%; display: inline-block; font-style: normal"
                >环比</i
              >

              <i style="font-style: normal"
              :class="Number(sel_title.quota_value.cont6) > 0? 'rate-up': 'rate-down'"
              >
                {{((sel_title.quota_value.cont6||0)*100).toFixed(1)+'%'}}
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
          ref="chart"
          style="padding-top: 10px; width: 320px; height: 200px"
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
          ref="chart2"
          style="padding-top: 0px; width: 320px; height: 200px"
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
          总时效月趋
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
                    <span style="font-size: 12px; color: #FF3300;">{{ barData_lin.month }}</span>
                  </div> 
                </div>
                <!-- <div></div> -->
              </van-col>


              <van-col span="6">
                <div>
                  <div style="margin: 0 auto; width: 65px; height: 17px;">
                    <div style="height: 17px;display: block;float: left;">
                      <div style="width: 100%; height: 8px;"></div>
                      <i style="width: 15px;height: 2px;background-color: #1678FF;display: block; margin-right: 6px;"></i>
                    </div>
                    <div style="font-size: 12px;"><span>总仓库</span></div>

                  </div>
                  <div style="text-align: center;">
                    <!-- <i style="width: 15px;height: 4px;display: block; margin-right: 6px;margin-top: 6px;float: left;"></i> -->
                    <span style="font-size: 12px; color: #FF3300;">{{ barData_lin.value1 }}</span>
                  </div> 
                </div>
                <!-- <div></div> -->

              </van-col>



              <van-col span="6">
                <div>
                  <div style="margin: 0 auto; width: 65px; height: 17px;">
                    <div style="height: 17px;display: block;float: left;">
                      <div style="width: 100%; height: 8px;"></div>
                      <i style="width: 15px;height: 2px;background-color: #08D631;display: block; margin-right: 6px;"></i>
                    </div>
                    <div style="font-size: 12px;"><span>佛山仓</span></div>

                  </div>
                  <div style="text-align: center;">
                    <!-- <i style="width: 15px;height: 4px;display: block; margin-right: 6px;margin-top: 6px;float: left;"></i> -->
                    <span style="font-size: 12px; color: #FF3300;">{{ barData_lin.value2 }}</span>
                  </div> 
                </div>
                <!-- <div></div> -->

              </van-col>

              
              <van-col span="6">
                <div>
                  <div style="margin: 0 auto; width: 65px; height: 17px;">
                    <div style="height: 17px;display: block;float: left;">
                      <div style="width: 100%; height: 8px;"></div>
                      <i style="width: 15px;height: 2px;background-color: #F8A52A;display: block; margin-right: 6px;"></i>

                    </div>
  
                    <div style="font-size: 12px;"><span>青岛仓</span></div>
                  </div>
                  <div style="text-align: center;">
                    <!-- <i style="width: 15px;height: 4px;display: block; margin-right: 6px;margin-top: 6px;float: left;"></i> -->
                    <span style="font-size: 12px; color: #FF3300;">{{ barData_lin.value3 }}</span>
                  </div> 
                </div>
                <!-- <div></div> -->
              </van-col>

              <van-col span="6">
                <div>
                  <div style="margin: 0 auto; width: 65px; height: 17px;">
                    <div style="height: 17px;display: block;float: left;">
                      <div style="width: 100%; height: 8px;"></div>
                      <i style="width: 15px;height: 2px;background-color: #0A0A8F;display: block; margin-right: 6px;"></i>

                    </div>
  
                    <div style="font-size: 12px;"><span>集货单</span></div>
                  </div>
                  <div style="text-align: center;">
                    <!-- <i style="width: 15px;height: 4px;display: block; margin-right: 6px;margin-top: 6px;float: left;"></i> -->
                    <span style="font-size: 12px; color: #FF3300;">{{ barData_lin.value4 }}</span>
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
          ref="chart3"
          style="padding-top: 0px; width: 340px; height: 200px;padding-bottom: 10px;"
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
          {{ sel_value.Range_on.Range_set=='2'?'发货仓库节点时效月趋':'渠道成本趋势'}}
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


        <!-- 切换优化开始 -->
          <!-- {{sel_value.qudao_guanjan_setvalue.length}} -->
          <!-- 第一列开始 -->
          <div class="yjqs_clss" style="margin-bottom: 0px;">
            <div style="width: 100%;padding-top: 10px;"></div>
            <ul >
              <template v-for="(val, key) in sel_value.qudao_guanjan_setvalue" >
                <li :key="key" v-if="(key+1)%5!=0&&sel_value.qudao_guanjan_setvalue.length<=5" 
                  @click="
                    Single_choice(
                      'ssyjqs_pd',
                      ['_this.initChart4()'],
                      (key+1),
                      '_this.sel_value.ssyjqs'
                    )
                  "
                  :style="sel_value.ssyjqs.ssyjqs_pd == ((key+1)+'')
                  ? whole_css.qudao_guanjan: whole_css.qudao_guanjan_n"
                >
                  {{val}}
                </li>

                <li :key="key" v-if="(key+1)%5==0&&key!=0&&sel_value.qudao_guanjan_setvalue.length<=5" 
                  style="margin-right: 0%;"
                  @click="
                    Single_choice(
                      'ssyjqs_pd',
                      ['_this.initChart4()'],
                      (key+1),
                      '_this.sel_value.ssyjqs'
                    )
                  "
                  :style="sel_value.ssyjqs.ssyjqs_pd == ((key+1)+'')
                  ? whole_css.qudao_guanjan: whole_css.qudao_guanjan_n"
                >
                  {{val}}
                </li>



                <li :key="key" v-if="(key+1)<=4&&sel_value.qudao_guanjan_setvalue.length>5" 
                  @click="
                    Single_choice(
                      'ssyjqs_pd',
                      ['_this.initChart4()'],
                      (key+1),
                      '_this.sel_value.ssyjqs'
                    )
                  "
                  :style="sel_value.ssyjqs.ssyjqs_pd == ((key+1)+'')
                  ? whole_css.qudao_guanjan: whole_css.qudao_guanjan_n"
                >
                  {{val}}
                </li>

                <li :key="key" v-if="(key+1)==5&&sel_value.qudao_guanjan_setvalue.length>5"
                  @click="qudao_guanjan_more_set()"
                  style="margin-right: 0%;background: rgb(247, 247, 247);"
                >
                  <span style="float: left;margin-right: -5px;margin-left: 12px;">
                    {{ (sel_value.qudao_guanjan_more==false)?'更多':'收起'}}
                  </span>
                  <i style="line-height: 27px;" :class="(sel_value.qudao_guanjan_more==false)?'van-icon_d':'van-icon_u'" 
                  class=" van-icon-arrow van-cell__right-icon">
                    <!-- van-icon_d -->  
                  </i>
                </li>
              </template>
              
            </ul>            
          </div>
          <!-- 第一列结束 -->


          <!-- 第二列开始 -->
          <div class="yjqs_clss2" v-if="sel_value.qudao_guanjan_more==true">
            <ul >
              <template v-for="(val, key) in sel_value.qudao_guanjan_setvalue" >
                <li :key="key" v-if="(key+1-4)%5!=0&&(key+1)>4&&sel_value.qudao_guanjan_setvalue.length>5" 
                  @click="
                    Single_choice(
                      'ssyjqs_pd',
                      ['_this.initChart4()'],
                      (key+1),
                      '_this.sel_value.ssyjqs'
                    )
                  "
                  :style="sel_value.ssyjqs.ssyjqs_pd == ((key+1)+'')
                  ? whole_css.qudao_guanjan: whole_css.qudao_guanjan_n"
                >
                  {{val}}
                </li>

                <li :key="key" v-if="(key+1-4)%5==0&&(key-4)!=0&&(key+1)>4&&sel_value.qudao_guanjan_setvalue.length>5" 
                  style="margin-right: 0%;"
                  @click="
                    Single_choice(
                      'ssyjqs_pd',
                      ['_this.initChart4()'],
                      (key+1),
                      '_this.sel_value.ssyjqs'
                    )
                  "
                  :style="sel_value.ssyjqs.ssyjqs_pd == ((key+1)+'')
                  ? whole_css.qudao_guanjan: whole_css.qudao_guanjan_n"
                >
                  {{val}}
                </li>
              </template>
              
            </ul>            
          </div>
          <!-- 第二列结束 -->
          <div style="clear: both"></div>
        <!-- 切换优化结束 -->





          <!-- 图例开始 -->
          <!-- <i style="font-style: normal;display: block;height:40px;"></i> -->
          <i style="font-style: normal;display: block; margin-bottom: 10px;padding-top: 10px; padding-left: 10px; padding-right: 10px;"
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
          ref="chart4"
          style="padding-top: 0px; width: 340px; height: 200px;padding-bottom: 10px;"
        ></div>
      </section>
      <!-- 发货仓库节点时效月趋结束 -->



      <div style="width: 100%; height: 50px; ">
        <p style="text-align: center;margin: 0px;font-size: 14px;color: #CCCCCC;padding-top: 10px;">————  已经见底了  ————</p>
      </div>


    </div>
    <!-- 滑屏结束 -->
  </div>
</template>

<script>
// import InProgress from '@/assets/svg/in-progress.svg'

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
  },

  data() {
    return {
      activeNames: "1",

      adasd: true,
      set_time:
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1 >= 1 && new Date().getMonth() + 1 <= 9
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1) +
        "-01",

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
        width: "32%",
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
        width: "32%",
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
    };
  },

  computed: {
    ...mapState("user", ["permissionList"]), //大概的意思是获取权限
  },

  created() {
    this.hexinzhibiao.width = window.innerWidth - 40 + "px";

    const [p1, resolve1] = generatePromise();
    this.p1 = p1;

    const apiMap = {

      

      // LC_INV	STOCK_AMT
      // LC_PL	LC_PERIOD

      // LC_PL-LC_PERIOD
      //承运管理
      "SQL-LC_PL-LC_PERIOD":{resultProp:"LC_PERIOD"},
      "SQL-LC_PL-PERIOD_STOCK":{resultProp:"PERIOD_STOCK"},

      // 库存周转率
      "SQL-LC_PL-LC_PERIOD_STOCK":{resultProp:"LC_PERIOD_STOCK"},
      "SQL-LC_INV-INSTOCK_AMT":{resultProp:"INSTOCK_AMT"},
      "SQL-LC_INV-IN_OUT_INV_AMT_M":{resultProp:"IN_OUT_INV_AMT_M"},
      "SQL-LC_INV-OUTSTOCK_AMT":{resultProp:"OUTSTOCK_AMT"},
      "SQL-LC_INV-STOCKLOC_RATIO":{resultProp:"STOCKLOC_RATIO"},

      "SQL-LC_INV-STOCK_AMT":{resultProp:"STOCK_AMT"},
      "SQL-LC_PL-TURNOVER_RATE":{resultProp:"TURNOVER_RATE"},
      "SQL-LC_INV-STOCK_NAME_AMT":{resultProp:"STOCK_NAME_AMT"},
      "SQL-LC_PL-DLVR_COST":{resultProp:"DLVR_COST"},
      "SQL-LC_PL-DLVR_COST_CHNL":{type: Array, resolve: resolve1},



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
                this.$EventBus.$emit("data_loay_set", {
                  data_loay_seton: true,
                });
              }
            });
        }
      }
    });

    console.log(this.data);

    // console.log(generatePromise);

    console.log(decimal2Percent);
    console.log(calcSignClass);
  },

  mounted() {
    this.$EventBus.$on("Salechan_choice_f", (Range_value_set) => {
      // console.log("父类传值过来的！！！！物流1");
      // console.log(Range_value_set.Range_value_set);
      this.sel_value.Range_on.Range_set=Range_value_set.Range_value_set;
      
      if(Range_value_set.Range_value_set=='1'){
        this.data_Logistics();
      }else if(Range_value_set.Range_value_set=='2'){
        this.data_Logistics();
        // 承运管理
        this.initChart3();
        this.initChart4();

      }else if(Range_value_set.Range_value_set=='3'){
        this.data_Logistics();
        this.initChart4();

      }

    });

    console.log("============运行到物流！！！！============");

    this.sel_value.Range_on.Range_set="1";
    this.initChart();
    this.initChart2();

    // // 承运管理
    // this.initChart3();
    // this.initChart4();

    // 核心指标填充
    this.data_Logistics();
  },

  methods: {

    qudao_guanjan_more_set(){
      if(this.sel_value.qudao_guanjan_more==false){
        this.sel_value.qudao_guanjan_more=true;
      }else{
        this.sel_value.qudao_guanjan_more=false;
        this.Single_choice('ssyjqs_pd',['_this.initChart4()'],(1),'_this.sel_value.ssyjqs')
      }

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

      this.p1.then(() => {

        console.log("运行到数据填充栏========================");
        // console.log(this.sel_value.Range_on.Range_set);


        if(this.sel_value.Range_on.Range_set=='1'){

          // this.sel_title.quota_value.cont1=(this.data["LC_INV-STOCK_AMT"][0].STOCK_AMT||0);
          // this.sel_title.quota_value.cont2=(this.data["LC_INV-STOCK_AMT"][0].STOCK_AMT||0);
          // this.sel_title.quota_value.cont3=(this.data["LC_INV-STOCK_AMT"][0].STOCK_AMT||0);
          let kcje_val=this.data_time_select(this.data["LC_INV-STOCK_AMT"],this.set_time,'','TMONTH');
          this.sel_title.quota_value.cont1 = kcje_val.TM_STOCK_AMT||0;
          this.sel_title.quota_value.cont2 = kcje_val.YOY_STOCK_AMT||0;
          this.sel_title.quota_value.cont3 = kcje_val.TM_STOCKLOC_USE_RATE||0; 
          // console.log(this.data["LC_INV-STOCK_AMT"]);


          // "！！周转率" 
          let zzl_val=this.data_time_select(this.data["LC_PL-TURNOVER_RATE"],this.set_time,'','TMONTH');
          // this.data["LC_PL-TURNOVER_RATE"][0].STOCK_AMT || 0;
          this.sel_title.quota_value.cont4 =zzl_val.TM_TURNOVER_RATE||0;
          this.sel_title.quota_value.cont5 = zzl_val.YOY_TURNOVER_RATE||0;
          this.sel_title.quota_value.cont6 = zzl_val.MOM_TURNOVER_RATE||0;


          // "！！入库金额"
          // this.sel_title.quota_value.cont7 =
          // this.data["LC_INV-INSTOCK_AMT"][0].DAY_INSTOCK_AMOUNT_SALE || 0;
          // this.sel_title.quota_value.cont8 = 0.066;
          // this.sel_title.quota_value.cont9 = 0.568;
          Object.keys(this.data["LC_INV-IN_OUT_INV_AMT_M"]).forEach((key) => {
            if((this.data["LC_INV-IN_OUT_INV_AMT_M"][key].TMONTH).substring(0,7)==(this.set_time.substring(0, 7))){
              this.sel_title.quota_value.cont7 = this.data["LC_INV-IN_OUT_INV_AMT_M"][key].TM_INSTOCK_AMOUNT_SALE || 0;
              this.sel_title.quota_value.cont8 = this.data["LC_INV-IN_OUT_INV_AMT_M"][key].YOY_INSTOCK_AMOUNT_SALE || 0;
              this.sel_title.quota_value.cont9 = this.data["LC_INV-IN_OUT_INV_AMT_M"][key].MOM_INSTOCK_AMOUNT_SALE ||0;

              // "！！发货金额"
              this.sel_title.quota_value.cont10 = this.data["LC_INV-IN_OUT_INV_AMT_M"][key].TM_SHIP_AMOUNT_SALE || 0;
              this.sel_title.quota_value.cont11 = this.data["LC_INV-IN_OUT_INV_AMT_M"][key].YOY_SHIP_AMOUNT_SALE || 0;
              this.sel_title.quota_value.cont12 = this.data["LC_INV-IN_OUT_INV_AMT_M"][key].SHIP_CMPLT_RT || 0;

            }
          });          

        }else if(this.sel_value.Range_on.Range_set=='2'){
          console.log("承运管理！！");

          // console.log(this.data["LC_PL-LC_PERIOD"]);
          // console.log(this.set_time);

          let cygl_val=this.data_time_select(this.data["LC_PL-LC_PERIOD"],this.set_time,'','TMONTH');

          this.sel_title.quota_value.cont1 = cygl_val.AVG_PERIOD||0;
          this.sel_title.quota_value.cont2 = cygl_val.MOM_AVG_PERIOD||0;

          this.sel_title.quota_value.cont3 = cygl_val.AVG_MAINLINE_PERIOD||0; 
          this.sel_title.quota_value.cont4 =cygl_val.MOM_AVG_MAINLINE_PERIOD||0;

          this.sel_title.quota_value.cont5 = cygl_val.AVG_LINEINSTALL_PERIOD||0;
          this.sel_title.quota_value.cont6 = cygl_val.MOM_AVG_LINEINSTALL_PERIOD||0;

          // console.log(cygl_val);

          this.sel_value.qudao_guanjan_setvalue=[];
          this.sel_value.qudao_guanjan_setvalue=["总仓库","佛山仓库","青岛仓库","集货订单",];




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

    data_time_select(data_seton_s,time_on,type,pd_time){
      let set_on_data=[];

      Object.keys(data_seton_s).forEach((key_value_on) => {  
        if(data_seton_s[key_value_on][pd_time].substring(0,7)==time_on.substring(0,7)){
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

          let _time_now=new Date();
          _time_now=_time_now.getTime()-(24*60*60*1000);
          _time_now=new Date(_time_now);

          // sel_value.target.all_muri_value 

          let hour_data = [];
          let all_amt = [];   //总仓库
          let fs_amt = [];    //佛山仓库
          let qd_amt = [];    //青岛仓库
          let jh_amt = [];    //集货订单
          let user_data = [];
          let _this=this;


          if(this.sel_value.Range_on.Range_set=='1'){
            console.log("========库存周转initChart3()=========")

          }else if(this.sel_value.Range_on.Range_set=='2'){
            console.log("========承运管理initChart3()=========")

            user_data=this.data["LC_PL-PERIOD_STOCK"];
            
            user_data.sort((a, b) => {
                let a_time = "";
                let b_time = "";
                a_time = new Date(a["TMONTH"].substring(0,10)).getTime(new Date(a["TMONTH"].substring(0,10)));
                b_time = new Date(b["TMONTH"].substring(0,10)).getTime(new Date(b["TMONTH"].substring(0,10)));

                return a_time - b_time;
            });


            // console.log(user_data);
            // TMONTH_WID
            // _time_now.getFullYear()+''  暂时写死
            _time_now='2020';
            // console.log(_time_now);
            // console.log(user_data[key_mv].TMONTH_WID.substring(0,4));

            Object.keys(user_data).forEach((key_mv) => {
              if(user_data[key_mv].TMONTH_WID.substring(0,4)==(_time_now)){

                hour_data.push(user_data[key_mv].TMONTH_WID.substring(4,6)*1+'月');
                if(user_data[key_mv].DELIVERYSTOCK_NAME=='总仓库'){
                  all_amt.push(((user_data[key_mv].AVG_TOT_PERIOD)||0).toFixed(2));
                }else if(user_data[key_mv].DELIVERYSTOCK_NAME=='佛山仓库'){
                  fs_amt.push(((user_data[key_mv].AVG_TOT_PERIOD)||0).toFixed(2));
                }else if(user_data[key_mv].DELIVERYSTOCK_NAME=='青岛仓库'){
                  qd_amt.push(((user_data[key_mv].AVG_TOT_PERIOD)||0).toFixed(2));
                }else if(user_data[key_mv].DELIVERYSTOCK_NAME=='集货订单'){
                  jh_amt.push(((user_data[key_mv].AVG_TOT_PERIOD)||0).toFixed(2));
                }

              }

            });
            hour_data=this.unique(hour_data);

            // console.log(all_amt); 
            // console.log(fs_amt);
            // console.log(qd_amt); 
            // console.log(jh_amt);
            // console.log(hour_data);

   
          }else if(this.sel_value.Range_on.Range_set=='3'){
            console.log("=========物流三包成本initChart3()=============")

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
                type: "cross",
                label: {
                  color: "#000000",
                  backgroundColor: "aliceblue",
                },
              },

              formatter:function (params) {

                // console.log(params);
                _this.barData_lin.value4 =(params[3]==undefined)? '--': params[3].value;
                _this.barData_lin.value3 =(params[2]==undefined)? '--': params[2].value;
                _this.barData_lin.value2 =(params[1]==undefined)? '--': params[1].value;
                _this.barData_lin.value1 =(params[0]==undefined)? '--':params[0].value;
                _this.barData_lin.month =(params[0]==undefined)? '--': params[0].axisValue;

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
                  color: "#08D631", 
                  lineStyle: {
                    // color: "#BBBBBB",
                    color: "#08D631",
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
                  color: "#0A0A8F",
                  lineStyle: {
                    // color: "#BBBBBB",
                    color: "#0A0A8F",
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


          let _time_now=new Date();
          _time_now=_time_now.getTime()-(24*60*60*1000);
          _time_now=new Date(_time_now);

          _time_now='2020';

          // sel_value.target.all_muri_value  
          let user_data=[];
          let hour_data = [];
          let zd_amt=[];  //直达时效  3.总成本
          let zy_amt=[];  //转运时效  3.物流成本
          let jh_amt=[];  //集货时效  3.三包成本
          let zz_amt=[];  //中转时效
          let yy_amt=[];  //预约时效
          let zhiz_amt=[]; //支装时效
          let all_amt=[];  //总时效
          // user_data=this.data["LC_PL-PERIOD_STOCK"];
          // console.log(user_data);
          let series_data=[];
          let _this=this;

          console.log("===========运行到发货仓库节点initChart4()=============");

          if(this.sel_value.Range_on.Range_set=='1'){
            console.log("运行到库存周转");

          }else if(this.sel_value.Range_on.Range_set=='2'){

            console.log("运行到承运管理");

            user_data=this.data["LC_PL-PERIOD_STOCK"];  
            user_data.sort((a, b) => {
                let a_time = "";
                let b_time = "";
                a_time = new Date(a["TMONTH"].substring(0,10)).getTime(new Date(a["TMONTH"].substring(0,10)));
                b_time = new Date(b["TMONTH"].substring(0,10)).getTime(new Date(b["TMONTH"].substring(0,10)));

                return a_time - b_time;
            });

            if(this.sel_value.ssyjqs.ssyjqs_pd=='1'){
              console.log("总仓库");
              Object.keys(user_data).forEach((key_mv1) => {
                if(user_data[key_mv1].TMONTH_WID.substring(0,4)==(_time_now)&&user_data[key_mv1].DELIVERYSTOCK_NAME=='总仓库'){

                  hour_data.push(user_data[key_mv1].TMONTH_WID.substring(4,6)*1+'月');
                  zd_amt.push((user_data[key_mv1].AVG_DIRECT_PERIOD||0).toFixed(2));
                  zy_amt.push((user_data[key_mv1].AVG_TRANS_PERIOD||0).toFixed(2));
                  jh_amt.push((user_data[key_mv1].AVG_GATHER_PERIOD||0).toFixed(2));
                  zz_amt.push((user_data[key_mv1].AVG_MID_PERIOD||0).toFixed(2));
                  yy_amt.push((user_data[key_mv1].AVG_APPOINT_PERIOD||0).toFixed(2));
                  zhiz_amt.push((user_data[key_mv1].AVG_INSTALL_PERIOD||0).toFixed(2));
                  all_amt.push((user_data[key_mv1].AVG_TOT_PERIOD||0).toFixed(2));

                }

              });


            }else if(this.sel_value.ssyjqs.ssyjqs_pd=='2'){
              console.log("佛山仓库");
              Object.keys(user_data).forEach((key_mv1) => {
                if(user_data[key_mv1].TMONTH_WID.substring(0,4)==(_time_now)&&user_data[key_mv1].DELIVERYSTOCK_NAME=='佛山仓库'){

                  hour_data.push(user_data[key_mv1].TMONTH_WID.substring(4,6)*1+'月');
                  zd_amt.push((user_data[key_mv1].AVG_DIRECT_PERIOD||0).toFixed(2));
                  zy_amt.push((user_data[key_mv1].AVG_TRANS_PERIOD||0).toFixed(2));
                  jh_amt.push((user_data[key_mv1].AVG_GATHER_PERIOD||0).toFixed(2));
                  zz_amt.push((user_data[key_mv1].AVG_MID_PERIOD||0).toFixed(2));
                  yy_amt.push((user_data[key_mv1].AVG_APPOINT_PERIOD||0).toFixed(2));
                  zhiz_amt.push((user_data[key_mv1].AVG_INSTALL_PERIOD||0).toFixed(2));
                  all_amt.push((user_data[key_mv1].AVG_TOT_PERIOD||0).toFixed(2));

                }

              });


            }else if(this.sel_value.ssyjqs.ssyjqs_pd=='3'){
              console.log("青岛仓库");
              Object.keys(user_data).forEach((key_mv1) => {
                if(user_data[key_mv1].TMONTH_WID.substring(0,4)==(_time_now)&&user_data[key_mv1].DELIVERYSTOCK_NAME=='青岛仓库'){

                  hour_data.push(user_data[key_mv1].TMONTH_WID.substring(4,6)*1+'月');
                  zd_amt.push((user_data[key_mv1].AVG_DIRECT_PERIOD||0).toFixed(2));
                  zy_amt.push((user_data[key_mv1].AVG_TRANS_PERIOD||0).toFixed(2));
                  jh_amt.push((user_data[key_mv1].AVG_GATHER_PERIOD||0).toFixed(2));
                  zz_amt.push((user_data[key_mv1].AVG_MID_PERIOD||0).toFixed(2));
                  yy_amt.push((user_data[key_mv1].AVG_APPOINT_PERIOD||0).toFixed(2));
                  zhiz_amt.push((user_data[key_mv1].AVG_INSTALL_PERIOD||0).toFixed(2));
                  all_amt.push((user_data[key_mv1].AVG_TOT_PERIOD||0).toFixed(2));

                }

              });

            }else if(this.sel_value.ssyjqs.ssyjqs_pd=='4'){
              console.log("集货仓库");
              Object.keys(user_data).forEach((key_mv1) => {
                if(user_data[key_mv1].TMONTH_WID.substring(0,4)==(_time_now)&&user_data[key_mv1].DELIVERYSTOCK_NAME=='集货仓库'){

                  hour_data.push(user_data[key_mv1].TMONTH_WID.substring(4,6)*1+'月');
                  zd_amt.push((user_data[key_mv1].AVG_DIRECT_PERIOD||0).toFixed(2));
                  zy_amt.push((user_data[key_mv1].AVG_TRANS_PERIOD||0).toFixed(2));
                  jh_amt.push((user_data[key_mv1].AVG_GATHER_PERIOD||0).toFixed(2));
                  zz_amt.push((user_data[key_mv1].AVG_MID_PERIOD||0).toFixed(2));
                  yy_amt.push((user_data[key_mv1].AVG_APPOINT_PERIOD||0).toFixed(2));
                  zhiz_amt.push((user_data[key_mv1].AVG_INSTALL_PERIOD||0).toFixed(2));
                  all_amt.push((user_data[key_mv1].AVG_TOT_PERIOD||0).toFixed(2));

                }

              });

            }


            series_data=[

                {
                  name: "总时效",
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
                  name: "直达时效",
                  showSymbol: false,
                  smooth: false, //true 为平滑曲线，false为直线
                  itemStyle: {
                    color: "#919191",
                    normal: {
                      color: "#08D631", 
                      lineStyle: {
                        // color: "#BBBBBB",
                        color: "#08D631",
                        width: 1, //设置线条粗细
                      },
                      areaStyle: {
                        color: "rgba(255, 255, 255, 0.00)",
                      },
                    },
                  },
                  data: zd_amt,
                  type: "line",
                  areaStyle: {},
                },

                {
                  name: "转运时效",
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
                  data: zy_amt,
                  type: "line",
                  areaStyle: {},
                },

                {
                  name: "集货时效",
                  showSymbol: false,
                  smooth: false, //true 为平滑曲线，false为直线
                  itemStyle: {
                    color: "#919191",
                    normal: {
                      color: "#0A0A8F",
                      lineStyle: {
                        // color: "#BBBBBB",
                        color: "#0A0A8F",
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

                {
                  name: "中转时效",
                  showSymbol: false,
                  smooth: false, //true 为平滑曲线，false为直线
                  itemStyle: {
                    color: "#919191",
                    normal: {
                      color: "#CF57ED",
                      lineStyle: {
                        // color: "#BBBBBB",
                        color: "#CF57ED",
                        width: 1, //设置线条粗细
                      },
                      areaStyle: {
                        color: "rgba(255, 255, 255, 0.00)",
                      },
                    },
                  },
                  data: zz_amt,
                  type: "line",
                  areaStyle: {},
                },

                {
                  name: "预约时效",
                  showSymbol: false,
                  smooth: false, //true 为平滑曲线，false为直线
                  itemStyle: {
                    color: "#919191",
                    normal: {
                      color: "#57CFED",
                      lineStyle: {
                        // color: "#BBBBBB",
                        color: "#57CFED",
                        width: 1, //设置线条粗细
                      },
                      areaStyle: {
                        color: "rgba(255, 255, 255, 0.00)",
                      },
                    },
                  },
                  data: yy_amt,
                  type: "line",
                  areaStyle: {},
                },

                {
                  name: "支装时效",
                  showSymbol: false,
                  smooth: false, //true 为平滑曲线，false为直线
                  itemStyle: {
                    color: "#919191",
                    normal: {
                      color: "#F81919",
                      lineStyle: {
                        // color: "#BBBBBB",
                        color: "#F81919",
                        width: 1, //设置线条粗细
                      },
                      areaStyle: {
                        color: "rgba(255, 255, 255, 0.00)",
                      },
                    },
                  },
                  data: zhiz_amt,
                  type: "line",
                  areaStyle: {},
                },

            ]

            





          }else if(this.sel_value.Range_on.Range_set=='3'){
            console.log("物流三包成本");

            user_data=this.data["LC_PL-DLVR_COST_CHNL"];

            user_data.sort((a, b) => {
                let a_time = "";
                let b_time = "";
                a_time = new Date(a["TMONTH"].substring(0,10)).getTime(new Date(a["TMONTH"].substring(0,10)));
                b_time = new Date(b["TMONTH"].substring(0,10)).getTime(new Date(b["TMONTH"].substring(0,10)));

                return a_time - b_time;
            });


            if(this.sel_value.ssyjqs.ssyjqs_pd=='1'){
              console.log("集团");
              Object.keys(user_data).forEach((key_mv2) => {
                
                if(user_data[key_mv2].TMONTH_WID.substring(0,4)==(_time_now)&&user_data[key_mv2].CHANNEL_NAME=='集团'){

                    hour_data.push(user_data[key_mv2].TMONTH_WID.substring(4,6)*1+'月');
                    zd_amt.push(((user_data[key_mv2].TOT_FEE/10000)||0).toFixed(1));
                    zy_amt.push(((user_data[key_mv2].LOGISTIC_DLVR_FEE/10000)||0).toFixed(1));
                    jh_amt.push(((user_data[key_mv2].THREE_SERVICE_FEE/10000)||0).toFixed(1));

                }

              });


            }else if(this.sel_value.ssyjqs.ssyjqs_pd=='2'){
              console.log("平台");
              Object.keys(user_data).forEach((key_mv2) => {
                
                if(user_data[key_mv2].TMONTH_WID.substring(0,4)==(_time_now)&&user_data[key_mv2].CHANNEL_NAME=='平台'){

                    hour_data.push(user_data[key_mv2].TMONTH_WID.substring(4,6)*1+'月');
                    zd_amt.push(((user_data[key_mv2].TOT_FEE/10000)||0).toFixed(1));
                    zy_amt.push(((user_data[key_mv2].LOGISTIC_DLVR_FEE/10000)||0).toFixed(1));
                    jh_amt.push(((user_data[key_mv2].THREE_SERVICE_FEE/10000)||0).toFixed(1));
                    
                }

              });


            }else if(this.sel_value.ssyjqs.ssyjqs_pd=='3'){
              console.log("直营");
              Object.keys(user_data).forEach((key_mv2) => {
                
                if(user_data[key_mv2].TMONTH_WID.substring(0,4)==(_time_now)&&user_data[key_mv2].CHANNEL_NAME=='直营'){

                    hour_data.push(user_data[key_mv2].TMONTH_WID.substring(4,6)*1+'月');
                    zd_amt.push(((user_data[key_mv2].TOT_FEE/10000)||0).toFixed(1));
                    zy_amt.push(((user_data[key_mv2].LOGISTIC_DLVR_FEE/10000)||0).toFixed(1));
                    jh_amt.push(((user_data[key_mv2].THREE_SERVICE_FEE/10000)||0).toFixed(1));
                    
                }

              });

            }else if(this.sel_value.ssyjqs.ssyjqs_pd=='4'){
              console.log("采购经销");
              Object.keys(user_data).forEach((key_mv2) => {
                
                if(user_data[key_mv2].TMONTH_WID.substring(0,4)==(_time_now)&&user_data[key_mv2].CHANNEL_NAME=='采购经销'){

                    hour_data.push(user_data[key_mv2].TMONTH_WID.substring(4,6)*1+'月');
                    zd_amt.push(((user_data[key_mv2].TOT_FEE/10000)||0).toFixed(1));
                    zy_amt.push(((user_data[key_mv2].LOGISTIC_DLVR_FEE/10000)||0).toFixed(1));
                    jh_amt.push(((user_data[key_mv2].THREE_SERVICE_FEE/10000)||0).toFixed(1));
                    
                }

              });

            }else if(this.sel_value.ssyjqs.ssyjqs_pd=='5'){
              console.log("返点经销");
              Object.keys(user_data).forEach((key_mv2) => {
                
                if(user_data[key_mv2].TMONTH_WID.substring(0,4)==(_time_now)&&user_data[key_mv2].CHANNEL_NAME=='返点经销'){

                    hour_data.push(user_data[key_mv2].TMONTH_WID.substring(4,6)*1+'月');
                    zd_amt.push(((user_data[key_mv2].TOT_FEE/10000)||0).toFixed(1));
                    zy_amt.push(((user_data[key_mv2].LOGISTIC_DLVR_FEE/10000)||0).toFixed(1));
                    jh_amt.push(((user_data[key_mv2].THREE_SERVICE_FEE/10000)||0).toFixed(1));
                    
                }

              });

            }else if(this.sel_value.ssyjqs.ssyjqs_pd=='6'){
              console.log("海外经销");
              Object.keys(user_data).forEach((key_mv2) => {
                
                if(user_data[key_mv2].TMONTH_WID.substring(0,4)==(_time_now)&&user_data[key_mv2].CHANNEL_NAME=='海外经销'){

                    hour_data.push(user_data[key_mv2].TMONTH_WID.substring(4,6)*1+'月');
                    zd_amt.push(((user_data[key_mv2].TOT_FEE/10000)||0).toFixed(1));
                    zy_amt.push(((user_data[key_mv2].LOGISTIC_DLVR_FEE/10000)||0).toFixed(1));
                    jh_amt.push(((user_data[key_mv2].THREE_SERVICE_FEE/10000)||0).toFixed(1));
                    
                }

              });

            }else if(this.sel_value.ssyjqs.ssyjqs_pd=='7'){
              console.log("林氏经销");
              Object.keys(user_data).forEach((key_mv2) => {
                
                if(user_data[key_mv2].TMONTH_WID.substring(0,4)==(_time_now)&&user_data[key_mv2].CHANNEL_NAME=='林氏经销摆场'){

                    hour_data.push(user_data[key_mv2].TMONTH_WID.substring(4,6)*1+'月');
                    zd_amt.push(((user_data[key_mv2].TOT_FEE/10000)||0).toFixed(1));
                    zy_amt.push(((user_data[key_mv2].LOGISTIC_DLVR_FEE/10000)||0).toFixed(1));
                    jh_amt.push(((user_data[key_mv2].THREE_SERVICE_FEE/10000)||0).toFixed(1));
                    
                }

              });

            }



            console.log(user_data);

            series_data=[
                {
                  name: "总成本",
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
                  data: zd_amt,
                  type: "line",
                  areaStyle: {},
                },
                {
                  name: "物流成本",
                  showSymbol: false,
                  smooth: false, //true 为平滑曲线，false为直线
                  itemStyle: {
                    color: "#919191",
                    normal: {
                      color: "#08D631", 
                      lineStyle: {
                        // color: "#BBBBBB",
                        color: "#08D631",
                        width: 1, //设置线条粗细
                      },
                      areaStyle: {
                        color: "rgba(255, 255, 255, 0.00)",
                      },
                    },
                  },
                  data: zy_amt,
                  type: "line",
                  areaStyle: {},
                },
                {
                  name: "三包成本",
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
                  data: jh_amt,
                  type: "line",
                  areaStyle: {},
                },


            ];

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

                // _this.barData.value =(params[1]==undefined)? 0:params[1].value;
                // _this.barData.ago_value =(params[0]==undefined)? 0: params[0].value;
                if(_this.sel_value.Range_on.Range_set=='2'){
                  _this.barData_lin2.value7 =(params[6]==undefined)? '--': params[6].value;
                  _this.barData_lin2.value6 =(params[5]==undefined)? '--': params[5].value;
                  _this.barData_lin2.value5 =(params[4]==undefined)? '--': params[4].value;
                  _this.barData_lin2.value4 =(params[3]==undefined)? '--': params[3].value;
                  _this.barData_lin2.value3 =(params[2]==undefined)? '--': params[2].value;
                  _this.barData_lin2.value2 =(params[1]==undefined)? '--': params[1].value;
                  _this.barData_lin2.value1 =(params[0]==undefined)? '--': params[0].value;
                  _this.barData_lin2.month =(params[0]==undefined)? 0: params[0].axisValue;                  
                }else if(_this.sel_value.Range_on.Range_set=='3'){
                  _this.barData_lin2.value3 =(params[2]==undefined)? '--': params[2].value;
                  _this.barData_lin2.value2 =(params[1]==undefined)? '--': params[1].value;
                  _this.barData_lin2.value1 =(params[0]==undefined)? '--': params[0].value;
                  _this.barData_lin2.month =(params[0]==undefined)? 0: params[0].axisValue;   
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



</style>
