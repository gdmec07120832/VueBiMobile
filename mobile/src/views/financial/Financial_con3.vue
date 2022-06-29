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



        <!-- <section
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
            {{ "更新时间：" + data_load_time }}
          </div>
        </section> -->


        <section
          style="padding-top: 5px; padding-bottom: 0px; border-radius: 4px; ;margin-left: 10px;margin-right: 10px;margin-bottom: 5px;"
        >
          <div class="" style="padding-left: 0px; padding-bottom: 0px;color: #999999;font-size: 12px;display: flex;justify-content: space-between;">
            <span>{{'更新时间：' + data_load_time}}</span>
            <span @click="showPopup"><i style="font-style: normal;color:#4395ff;padding-right: 4px;">口径说明</i>
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
                  <p style="margin-bottom: 20px;margin-top: 5px;">预计每天10:20更新昨日数据</p> 

                <p style="font-weight: bold;">
                    <i style="width: 5px;height: 16px;background-color: #23B0A8;display: block;float: left;margin-right: 5px;margin-top: 3px;border-radius: 4px;"></i>
                    <span style="color: #000000;">口径范围</span></p>
                  <p style="margin-bottom: 20px;margin-top: 5px;">集团为满足KA统计的所有交易成功订单。其中，线上为交易成功的纯线上店铺（B店、D店）订单及网拍订单；线下为交易成功且有核销的火凤凰订单</p>


                <p style="font-weight: bold;">
                  <i style="width: 5px;height: 16px;background-color: #23B0A8;display: block;float: left;margin-right: 5px;margin-top: 3px;border-radius: 4px;"></i>
                  <span style="color: #000000;">逻辑说明</span></p>


              <!-- <p style="font-weight: bold;">
                <i style="width: 5px;height: 16px;background-color: #23B0A8;display: block;float: left;margin-right: 5px;margin-top: 3px;border-radius: 4px;"></i>
                <span style="color: #000000;">KA模块</span></p> -->

              <!-- <p>①、因需要业务部门填报，估10点更新昨天数据；</p>
              <p>②、因KA协议未定，暂按20年同增30%的目标，计算逻辑与20年一致；</p> -->


                <van-collapse v-model="activeNames_tips" accordion>
                  <van-collapse-item title="交易成功金额" name="1">
                    <p>交易成功金额：B2C订单在交易成功后的金额(对应冲减客户通过淘宝后台发起的相关退款及其它特殊订单)</p>
                    <p>①剔除售中退款：客户通过淘宝后台发起退款申请，交易成功前的退款(含未发取消、多付等)；</p>
                    <p>②剔除售后退款：客户通过淘宝后台发起退款申请，交易成功后的退款；</p>
                    <p>③剔除交易成功超5万的订单；</p>
                    <p>④剔除村淘订单；</p>
                  </van-collapse-item>

                  <!-- <van-collapse-item title="火凤凰交易成功金额" name="2">
                    <p>火凤凰交易成功金额：已核销火凤凰订单且淘宝交易状态为交易成功金额</p>
                    <p>①统计时间=交易成功时间；</p>
                    <p>②剔除交易成功超5万的订单；</p>
                  </van-collapse-item> -->

                  <!-- <van-collapse-item title="占比同比" name="3">
                    占比同比=（本期占发货比-同期占发货比）/同期占发货比
                  </van-collapse-item>
                  <van-collapse-item title="同比增额" name="4">
                    同比增额=本期退款小计-同期退款小计
                  </van-collapse-item> -->
                </van-collapse>


            </div>
          </van-popup>
        </section>


        <!-- 开头结束 background-color: #ffffff;class="px10 py10" -->

        <section
          style="
            padding-top: 10px;
            padding-bottom: 5px;
            background: #ffffff;
            border-radius: 4px;
            margin-left: 10px;
            margin-right: 10px;
          "
          :style="(sel_value.Range_on.Range_set!='3')? {'display': 'block'}:{'display': 'none'}"
        >


          <div class="Productmarket_day">
            <van-row type="flex" justify="center">
              
              <van-col span="5"
              @click="Single_choice('day_1',['_this.data_Financial()','_this.initChart()','_this.echarts_clear=true','this.echarts2_clear=true','this.echarts3_clear=true'],true,'_this.sel_value.day_set')"
                style="margin-right: 10px;"
                ><van-button plain
                  :style="sel_value.day_set.day_1 ? {'background-color': 'rgb(255, 255, 255)'}:{'background-color': 'rgb(247, 247, 247)'}"
                  :type="sel_value.day_set.day_1 ? click_css_set.type : click_css_no.type"
                  class="but_set_select"
                  :color="
                    sel_value.day_set.day_1 ? click_css_set.color : click_css_no.color
                  "
                  >天</van-button
                ></van-col
              >



              <van-col span="5"
              @click="Single_choice('month',['_this.data_Financial()','_this.initChart()','_this.echarts_clear=true','this.echarts2_clear=true','this.echarts3_clear=true'],true,'_this.sel_value.day_set')"
                style="margin-left: 10px;"
                ><van-button plain
                  :style="sel_value.day_set.month ? {'background-color': 'rgb(255, 255, 255)'}:{'background-color': 'rgb(247, 247, 247)'}"
                  :type="sel_value.day_set.month? click_css_set.type: click_css_no.type"
                  class="but_no_select"
                  :color="sel_value.day_set.month? click_css_set.color: click_css_no.color "
                  >月</van-button
                ></van-col
              >

              <!-- <van-col span="5"
                ><van-button
                  :type="sel_value.month ? click_css_set.type : click_css_no.type"
                  class="but_no_select"
                  :color="
                    sel_value.month ? click_css_set.color : click_css_no.color
                  "
                  >月</van-button
                ></van-col
              > -->

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
              >（时间范围：2021-01-01~2021-01-28）</span
            >
          </div>
        </section>


        <!-- 核心指标开始 --> 
        <section
          style="
            padding-top: 5px;
            padding-bottom: 5px;
            border-radius: 4px;
            margin-left: 10px;
            margin-right: 10px;
            margin-bottom: 0px;
          "
          :style="(sel_value.Range_on.Range_set!='3')? {'display': 'inline-table'}:{'display': 'none'}"
        >
          <div
            class="section-title"
            style="padding-left: 0px; padding-bottom: 0px; color: #000000"
          >
            核心指标
          </div>
        </section>

        <section
          style="
            padding-top: 10px;
            padding-bottom: 10px;
            border-radius: 4px;
            background: #ffffff;
            margin-left: 10px;
            margin-right: 10px;
          "
          :style="(sel_value.Range_on.Range_set!='33')? {'display': 'inline-table'}:{'display': 'none'}"
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
                @click="Single_choice('day_1',['_this.data_Financial()','_this.initChart()','_this.initChart2()','_this.echarts_clear=true','this.echarts2_clear=true','this.echarts3_clear=true'],true,'_this.sel_value.day_set')"

                style="border-radius: 4px;"
                :style="
                  sel_value.day_set.day_1 
                    ? whole_css.zffhyjkj
                    : whole_css.zffhyjkj_n
                "
              >
                本年</van-col
              >
              <van-col
                span="11" offset="2"
                @click="Single_choice('month',['_this.data_Financial()','_this.initChart()','_this.initChart2()','_this.echarts_clear=true','this.echarts2_clear=true','this.echarts3_clear=true'],true,'_this.sel_value.day_set')"

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





            <!-- 增加翻页开始 -->

            <div class="wrapper">
              <swiper  ref="mySwiper_entry" :options="swiperOptions">
                <template>
                  <swiper-slide >

                    <div
                      @click="
                        Single_choice(
                          'all_muri_value',
                          ['_this.initChart()','_this.initChart2()','_this.echarts_clear=true','this.echarts2_clear=true','this.echarts3_clear=true'],
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
                        {{
                          sel_value.day_set.day_1 ?fomatMoney(((sel_title.quota_value.cont1/10000/10000)||0).toFixed(2))+'亿':fomatMoney((sel_title.quota_value.cont1/10000).toFixed(1))+'万'
                        }}
                      </span>


                      <span :style="sum_zhibiao.body">
                        <i style="width: 30%; display: inline-block; font-style: normal"
                          >目标</i>
                        <i style="font-style: normal;margin-left: 0px;" 
                        > 
                          {{
                            sel_value.day_set.day_1 ?fomatMoney(((sel_title.quota_value.cont3/10000/10000)||0).toFixed(2))+'亿':fomatMoney(((sel_title.quota_value.cont3/10000)||0).toFixed(1))+'万'
                          }} 
                        </i>
                      </span>



                      <span :style="sum_zhibiao.body">
                        <i style="width: 30%; display: inline-block; font-style: normal"
                          >{{(this.sel_value.Range_on.Range_set=='2')?'占比':'达成'}}</i
                        >
                        <i style="font-style: normal"
                          :style="Number(sel_title.quota_value.cont2) > 1?{color: '#ff4d4f'}:{color: '#008000'}"
                        > 
                          {{(sel_title.quota_value.cont2 * 100 || 0).toFixed(1) +"%"}} 
                        </i>
                      </span>
                    </div>

                    <div
                      @click="
                        Single_choice(
                          'all_muri_value',
                          ['_this.initChart()','_this.initChart2()','_this.echarts_clear=true','this.echarts2_clear=true','this.echarts3_clear=true'],
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
                        {{
                          sel_value.day_set.day_1 ?fomatMoney(((sel_title.quota_value.cont4/10000/10000)||0).toFixed(2))+'亿':fomatMoney((sel_title.quota_value.cont4/10000).toFixed(1))+'万'
                        }}
                      </span>


                      <span :style="sum_zhibiao.body">
                        <i style="width: 30%; display: inline-block; font-style: normal"
                          >目标</i>
                        <i style="font-style: normal;margin-left: 0px;" 
                        > 
                          {{
                            sel_value.day_set.day_1 ?fomatMoney(((sel_title.quota_value.cont6/10000/10000)||0).toFixed(2))+'亿':fomatMoney(((sel_title.quota_value.cont6/10000)||0).toFixed(1))+'万'
                          }} 
                        </i>
                      </span>


                      <span :style="sum_zhibiao.body">
                        <i style="width: 30%; display: inline-block; font-style: normal"
                          >{{(this.sel_value.Range_on.Range_set=='2')?'占比':'达成'}}</i
                        >

                        <i style="font-style: normal"
                          :style="Number(sel_title.quota_value.cont5) > 1?{color: '#ff4d4f'}:{color: '#008000'}"
                        >
                          {{(sel_title.quota_value.cont5*100).toFixed(1)+'%'}}
                        </i>
                      </span>
                    </div>

                    <div
                      @click="
                        Single_choice(
                          'all_muri_value',
                          ['_this.initChart()','_this.initChart2()','_this.echarts_clear=true','this.echarts2_clear=true','this.echarts3_clear=true'],
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
                        {{
                          sel_value.day_set.day_1 ?fomatMoney(((sel_title.quota_value.cont7/10000/10000)||0).toFixed(2))+'亿':fomatMoney((sel_title.quota_value.cont7/10000).toFixed(1))+'万'
                        }}
                      </span>


                      <span :style="sum_zhibiao.body">
                        <i style="width: 30%; display: inline-block; font-style: normal"
                          >目标</i>
                        <i style="font-style: normal;margin-left: 0px;" 
                        > 
                          {{
                            sel_value.day_set.day_1 ?fomatMoney(((sel_title.quota_value.cont9/10000/10000)||0).toFixed(2))+'亿':fomatMoney(((sel_title.quota_value.cont9/10000)||0).toFixed(1))+'万'
                          }} 
                        </i>
                      </span>

                      <span :style="sum_zhibiao.body">
                        <i style="width: 30%; display: inline-block; font-style: normal"
                          >{{(this.sel_value.Range_on.Range_set=='2')?'占比':'达成'}}</i
                        >

                        <i style="font-style: normal"
                          :style="Number(sel_title.quota_value.cont8) > 1?{color: '#ff4d4f'}:{color: '#008000'}"
                        >
                          {{(sel_title.quota_value.cont8*100).toFixed(1)+'%'}}
                        </i>
                      </span>
                    </div>

                  </swiper-slide> 



                  <!-- <swiper-slide >
                    <div
                      @click="
                        Single_choice(
                          'all_muri_value',
                          ['_this.initChart()','_this.initChart2()'],
                          4,
                          '_this.sel_value.target'
                        )
                      "
                      class="Productmarket_labqie_con4"
                      :style="
                        sel_value.target.all_muri_value == 4
                          ? Object.assign({}, click_css_hxzb_y, { 'margin-right': '0%' })
                          : Object.assign({}, click_css_hxzb_n, { 'margin-right': '0%' })
                      "
                    >
                      <span
                        :class="
                          sel_value.target.all_muri_value == 4 ? 'title_change' : ''
                        "
                        :style="sum_zhibiao.title"
                        >火凤凰</span
                      >
                      <span :style="sum_zhibiao.zhognxin">
                        {{fomatMoney((sel_title.quota_value.cont10/10000).toFixed(1))+'万'}}
                      </span>


                      <span :style="sum_zhibiao.body">
                        <i style="width: 30%; display: inline-block; font-style: normal"
                          >目标</i>
                        <i style="font-style: normal;margin-left: 0px;" 
                        > 
                          {{
                            sel_title.quota_value.cont12=='no'?'--':
                            sel_value.day_set.day_1 ?fomatMoney(((sel_title.quota_value.cont12/10000/10000)||0).toFixed(2))+'亿':fomatMoney(((sel_title.quota_value.cont12/10000)||0).toFixed(1))+'万'
                          }} 
                        </i>
                      </span>


                      <span :style="sum_zhibiao.body">
                        <i style="width: 30%; display: inline-block; font-style: normal"
                          >{{(this.sel_value.Range_on.Range_set=='2')?'占比':'达成'}}</i
                        >

                        <i style="font-style: normal"
                          :style="Number(sel_title.quota_value.cont11) > 1?{color: '#ff4d4f'}:{color: '#008000'}"
                        >
                          {{sel_title.quota_value.cont11=='no'? '--':(sel_title.quota_value.cont11*100).toFixed(1)+'%'}}
                        </i>
                      </span>
                    </div>
                  </swiper-slide>  -->

                    <!-- <div class="swiper-pagination_new swiper-pagination-bullets_new" slot="pagination">
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
                    </div> -->
                    <!--分页器。slot="pagination"如果放置在swiper-container外面，需要自定义样式。-->

                </template>

              </swiper>

            </div>
            <!-- 增加翻页结束 -->
            





            <div style="clear: both; padding-bottom: 0px"></div>
          </div>
        </section>

        <!-- <div style="width: 100%; height: 10px;" :style="(sel_value.Range_on.Range_set!='3')? {'display': 'inline-table'}:{'display': 'none'}"></div> -->
        <!-- 核心指标结束 -->







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
          :style="(sel_value.Range_on.Range_set=='3'&&sel_value.day_set.month==true)? {'display': 'block'}:{'display': 'none'}"
        >
          <div
            class="section-title"
            style="padding-left: 0px; padding-bottom: 0px; color: #000000"
          >
            {{(sel_value.Range_on.Range_set=='1')?'采购毛利日趋势':(sel_value.Range_on.Range_set=='2')?'退款日趋势':'交易成功日趋势'}}
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
          :style="(sel_value.Range_on.Range_set=='3'&&sel_value.day_set.month==true)? {'display': 'block'}:{'display': 'none'}"
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
                    <div 
                      style="margin: 0 auto;  height: 17px;"
                      :style="{'width':(sel_value.target.all_muri_value==4? '60px':'50px')}"
                    >
                      <div style="height: 17px;display: block;float: left;">
                        <div style="width: 100%; height: 8px;"></div>
                        <i style="width: 15px;height: 2px;background-color: #1678FF;display: block; margin-right: 6px;"></i>
                    
                      </div>
    
                      <div style="font-size: 12px;">
                        <span style="line-height: 18px;">
                          {{sel_value.target.all_muri_value==1? '集团':
                            sel_value.target.all_muri_value==2? '线上':
                            sel_value.target.all_muri_value==3? '线下':
                            sel_value.target.all_muri_value==4? '火凤凰':''
                          }}
                        </span>
                      </div>

                    </div>
                    <div style="text-align: center;">
                      <!-- <i style="width: 15px;height: 4px;display: block; margin-right: 6px;margin-top: 6px;float: left;"></i> -->
                      <span style="font-size: 12px; color: #FF3300;">{{ nll_undefined(barData.value) }}</span>
                    </div> 
                  </div>
                  <!-- <div></div> -->
                </van-col>


                <van-col span="8" style="display: none;">
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


          <div
            ref="chart" :style="canvas_css"
            style="padding-top: 10px;"
          ></div>
        </section>
        <!-- 交易成功日趋势结束 -->



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
          :style="(sel_value.Range_on.Range_set=='3'&&sel_value.day_set.day_1==true)? {'display': 'block'}:{'display': 'none'}"
        >
          <div
            class="section-title"
            style="padding-left: 0px; padding-bottom: 0px; color: #000000"
          >
            KA月度趋势
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
          :style="(sel_value.Range_on.Range_set=='3'&&sel_value.day_set.day_1==true)? {'display': 'block'}:{'display': 'none'}"
        >



          <div
            @touchstart="canvas_qiehuan.canvas_toli_kg = true"
            @touchend="canvas_qiehuan.canvas_toli_kg = false"
            ref="chart2" :style="canvas_css"
            style="padding-top: 0px;"
          ></div>
        </section>
        <!-- 交易成功月趋势结束 -->





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
          :style="(sel_value.Range_on.Range_set=='33')? {'display': 'block'}:{'display': 'none'}"
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
          :style="(sel_value.Range_on.Range_set=='33')? {'display': 'block'}:{'display': 'none'}"
        >


          <div
            ref="chart4" :style="canvas_css"
            style="padding-top: 10px;"
          ></div>
        </section>
        <!-- 火凤凰日趋势结束 -->








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
                  <li>平台</li>
                  <li>直营</li>
                  <li>采购</li>
                  <li>海外</li>
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
                  <li >
                    <i style="font-style: normal;" >{{ (val.distribution)?(val.distribution*100).toFixed(1)+'%':'--' }}</i>
                  </li>

                  <li >
                    <i style="font-style: normal;" >{{ (val.overseas)?(val.overseas*100).toFixed(1)+'%':'--' }}</i>
                  </li>
    
                </ul>
              </li>


              



              <li style="clear: both"></li>
          </ul>
          <!-- 具体表格结束 -->
        </section>
        <!-- 退款类型详情结束 -->



        <!-- 模块指标开始 -->

        <section
          style="padding-top: 5px; padding-bottom: 5px; border-radius: 4px; ;margin-left: 10px;margin-right: 10px;margin-bottom: 0px;"
        >
        <div
            class="section-title test_addd"
            style="padding-left: 0px; padding-bottom: 0px"
          >
            {{'KA结构趋势'}}
          </div>
        </section>


        <section
          style="padding-top: 10px; padding-bottom: 10px; border-radius: 4px; ;margin-left: 10px;margin-right: 10px;margin-bottom: 0px;background-color: #ffffff;"
        >
          <div  style="padding-left: 10px;padding-right: 10px;">
            <van-collapse v-model="activeNames" :border="false" :accordion="true" style="text-align: center;" id='mokuai_id'>
                  <van-collapse-item
                    name='22'
                    :border="false"
                    :is-link="false"
                    title-class="mokuai_title"
                    disabled
                  >
                    <template #title>
                      <!-- <div>标题1</div>  -->
                      <van-row class="yjdcqs_color">
                        <van-col span="" :style="{ 'width':((yjdc_css.width*1-10-20)/6)+'px'}">
                          KA科目
                        </van-col>

                        <van-col span="" :style="{ 'width':((yjdc_css.width*1-10-20)/6)+'px'}">
                          交易成功
                        </van-col>

                        <van-col span="" :style="{ 'width':((yjdc_css.width*1-10-20)/6)+'px'}">
                          {{(sel_value.day_set.day_1==true)?'月累计':'月目标'}}
                        </van-col>

                        <van-col span="" :style="{ 'width':((yjdc_css.width*1-10-20)/6)+'px'}">
                          {{(sel_value.day_set.day_1==true)?'年累计':'月累计'}}
                        </van-col>

                        <van-col span="" :style="{ 'width':((yjdc_css.width*1-10-20)/6)+'px'}">
                          {{(sel_value.day_set.day_1==true)?'月累同比':'同比'}}
                        </van-col>

                        <van-col span="" :style="{ 'width':((yjdc_css.width*1-10-20)/6)+'px'}">
                          详情
                        </van-col>
                      </van-row>
                    </template>
                  </van-collapse-item>


                  <van-collapse-item
                    v-for="(val, key) in sel_title.module_value_set"
                    
                    :key="key"
                    :name="(key)"
                    :border="false"
                    :change="((key)==0)?'':collapse_change('chart_del'+(key),(key))"
                    :disabled="((key)==0)?true:false"
                    :is-link="((key)==0)?false:true"                  
                    title-class="mokuai_cont"
                  >
                    <template #title>
                      <!-- <div>标题1</div>  -->
                      <van-row class="yjdcqs_color">
                        <van-col span="" :style="{ 'width':((yjdc_css.width*1-10-20)/6)+'px'}">
                          {{val.TYPE}}
                        </van-col>
                        <van-col span="" :style="{ 'width':((yjdc_css.width*1-10-20)/6)+'px'}">
                          {{((val.交易金额/10000/10000)||0).toFixed(2)+'亿'}}
                        </van-col>
                        <van-col span="" :style="{ 'width':((yjdc_css.width*1-10-20)/6)+'px'}">
                          {{((sel_value.day_set.day_1==true)?(((val.月累计)*100).toFixed(1)+'%'):(((val.目标/10000/10000)).toFixed(2)+'亿'))}}
                        </van-col>
                        <van-col span="" :style="{ 'width':((yjdc_css.width*1-10-20)/6)+'px'}">
                          {{((sel_value.day_set.day_1==true)?((val.年累计)*100).toFixed(1):((val.月累计)*100).toFixed(1))+'%'}}
                        </van-col>
                        <van-col :class="(val.同比>0)?'rate-up':'rate-down'" span="" :style="{ 'width':((yjdc_css.width*1-10-20)/6)+'px'}">
                          <span>{{((val.同比)*100).toFixed(1)+'%'}}</span>
                        </van-col>
                        <van-col v-if="(key)==0" span="" :style="{ 'width':((yjdc_css.width*1-10-20)/6)+'px'}">
                          --
                        </van-col>
                      </van-row>
                    </template>
                    <!-- 图形开始  @touchstart="canvas_qiehuan.canvas_toli_kg=true" @touchend="canvas_qiehuan.canvas_toli_kg=false"-->
                      <div :ref="'chart_del'+(key)" 
                      style="height: 154px;"
                      :style="{'width':(yjdc_css.width*1-32-20)+'px'}"
                      ></div>
                    <!-- 图形结束 -->
                  </van-collapse-item>
            </van-collapse>    

          </div>
        </section>
        <!-- 模块指标结束 -->
  


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
      activeNames_tips:['1'],

      question_show: false,
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

      },
      swiper_pag:0,

      activeNames: "222",

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

        // 模块明细指标
        module_value_set:[],

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
          // "background-color": "#E6E6E6",
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
      
      iphone_pd:false,
      echarts_clear:false,
      echarts2_clear:false,
      echarts3_clear:false,
    };
  },

  computed: {
    ...mapState("user", ["permissionList"]), //大概的意思是获取权限
  },

  created() {
    this.hexinzhibiao.width = window.innerWidth - 30 + "px";
    this.canvas_css.width = window.innerWidth - 20-20 + "px";
    this.yjdc_css.width = (window.innerWidth - 20);

    this.$EventBus.$emit("data_loay_set", {
      data_loay_seton: false,
    });

    




    const apiMap2 = {


      // 盈利
      "SQL-FIN_KA-Y_REACH_RATE": { resultProp: "Y_REACH_RATE" },
      "SQL-FIN_KA-DAY_TREND": { resultProp: "DAY_TREND" },

      "SQL-FIN_KA-MONTH_TREND": { resultProp: "MONTH_TREND" },
      "SQL-FIN_KA-M_REACH_RATE": { resultProp: "M_REACH_RATE" },
      // "SQL-FIN_KA-HFH_REACH_RATE": { resultProp: "HFH_REACH_RATE" },  // 没用到的了
      // "SQL-FIN_KA-HFH_DAY_TREND": { resultProp: "HFH_DAY_TREND" },    // 没用到的了
      // "SQL-FIN_KA-ALL_REACH_RATE": { resultProp: "ALL_REACH_RATE" },  // 没用到的了
      "SQL-FIN_GPR-FIN_GPR_LAOD_TIME": { resultProp: "FIN_GPR_LAOD_TIME" },

    };


    this.ajax_data(apiMap2);





    // console.log(generatePromise);

    console.log(decimal2Percent);
    console.log(calcSignClass);
  },

  mounted() {
    this.$EventBus.$on("Financial_choice_f", (Range_value_set) => {
      // console.log("父类传值过来的！！！！财务1");
      // console.log(Range_value_set);

      let set_value = "";
      this.sel_value.Range_on.Range_set = Range_value_set.Range_value_set;
      switch (Range_value_set.Range_value_set) {
        // case "1":
        //   set_value = "cpcy";
        //   break;
        // case "2":
        //   set_value = "ouk";
        //   break;
        case "3":
          set_value = "muying";
          this.echarts_clear=true;
          this.echarts2_clear=true;      
          this.echarts3_clear=true;   
          this.Single_choice(set_value,['_this.data_Financial()','_this.initChart()'],true,'_this.sel_value.theme');
          this.initChart2();
          Object.keys(this.sel_title.module_value_set).forEach((key_del) => {
            if(this.activeNames==(key_del*1+1)){
              this.collapse_change('chart_del'+(key_del*1+1),(key_del*1+1));
            }
          });          

          break;

        // default:
        //   set_value = "cpcy";
      }

    });


    console.log("============运行到财务！！！！============");
    // this.Single_choice('day_1','',true,'_this.sel_value.day_set');
    // console.log(this.sel_value.day_set.day_1);


    if(this.isIPhoneX()){
      this.iphone_pd=true;
    }else{
      this.iphone_pd=false;
    }


    // 滑动的开始
    this.$refs['mySwiper_entry'].$swiper.on("slideChangeTransitionEnd", (swiper) => {
      const index = swiper.realIndex;
      console.log("这里是首页啊！！！！！  " + (index));
      this.swiper_pag=index;

    });
    this.chenSwiper(0);
    // 滑动的结束



    this.sel_value.Range_on.Range_set='3';
    this.Single_choice('all_muri_value','',1,'_this.sel_value.target');



    this.data_Financial();
    // this.initChart();
    this.initChart2();
    // this.initChart3();
    // this.initChart4();
    
  },

  methods: {

    onRefresh() {

      this.$EventBus.$emit("data_loay_set", {
        data_loay_seton: false,
      });
      let apiMap3 = {
        // 盈利
        "SQL-FIN_KA-Y_REACH_RATE": { resultProp: "Y_REACH_RATE" },
        "SQL-FIN_KA-DAY_TREND": { resultProp: "DAY_TREND" },
        "SQL-FIN_KA-MONTH_TREND": { resultProp: "MONTH_TREND" },
        "SQL-FIN_KA-M_REACH_RATE": { resultProp: "M_REACH_RATE" },
        // "SQL-FIN_KA-HFH_REACH_RATE": { resultProp: "HFH_REACH_RATE" },  // 没用到的了
        // "SQL-FIN_KA-HFH_DAY_TREND": { resultProp: "HFH_DAY_TREND" },    // 没用到的了
        // "SQL-FIN_KA-ALL_REACH_RATE": { resultProp: "ALL_REACH_RATE" },  // 没用到的了
        "SQL-FIN_GPR-FIN_GPR_LAOD_TIME": { resultProp: "FIN_GPR_LAOD_TIME" },
      };
      this.ajax_data(apiMap3);

      this.p1.then(() => {
        this.isLoading = false;
        this.data_Financial();
        this.initChart();
        this.initChart2();
      });

    },

    showPopup(){
      this.question_show=true;

    },

    showPopup_close(){
      this.activeNames_tips=[];
    },


    data_Financial() {
      this.p1.then(() => {
        // console.log("运行到数据填充栏========================");

        if(this.sel_value.Range_on.Range_set=='1'){
          // console.log(this.sel_value.Range_on.Range_set);

          
          console.log(this.data["FIN_GPR_TOP-DLY_JT_GPR"]);
          //  console.log(this.data["FIN_GPR_TOP-DLY_JT_GPR"][0].SUM_GPR_LCK);
          if(this.sel_value.day_set.day_1==true){
            //集团
            this.sel_title.quota_value.cont1= this.data["FIN_GPR_TOP-DLY_JT_GPR"][0].SUM_GPR_LCK||0;
            this.sel_title.quota_value.cont2= this.data["FIN_GPR_TOP-DLY_JT_GPR"][0].CPR||0;     
            //B店   
            this.sel_title.quota_value.cont3= this.data["FIN_GPR_TOP-DLY_B_GPR"][0].SUM_GPR_LCK||0;
            this.sel_title.quota_value.cont4= this.data["FIN_GPR_TOP-DLY_B_GPR"][0].RATE||0; 
            //京东 
            this.sel_title.quota_value.cont5= this.data["FIN_GPR_TOP-DLY_JD_GPR"][0].SUM_GPR_LCK||0;
            this.sel_title.quota_value.cont6= this.data["FIN_GPR_TOP-DLY_JD_GPR"][0].RATE||0; 

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
              ['集团','平台','直营','采购经销','海外经销'],
              'CHANNEL',
              'SUM_GPR_LCK');

          }else if(this.sel_value.day_set.month==true){
            // FIN_GPR_TOP-MLY_JT_GPR
            //集团
            this.sel_title.quota_value.cont1= this.data["FIN_GPR_TOP-MLY_JT_GPR"][0].SUM_GPR_LCK||0;
            this.sel_title.quota_value.cont2= 0;
            //B店 
            this.sel_title.quota_value.cont3= this.data["FIN_GPR_TOP-MLY_B_GPR"][0].SUM_GPR_LCK||0;
            this.sel_title.quota_value.cont4= 0;   
            //京东  
            this.sel_title.quota_value.cont5= this.data["FIN_GPR_TOP-MLY_JD_GPR"][0].SUM_GPR_LCK||0;
            this.sel_title.quota_value.cont6= 0; 

            

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
              ['集团','平台','直营','采购经销','海外经销'],
              'CHANNEL',
              'SUM_GPR_LCK');

              console.log(this.sel_title.detailed_table.detailed_value1);


          }




        }else if(this.sel_value.Range_on.Range_set=='2'){

          // FIN_RFND_TOP	DLY_B_RFND  B店
          // FIN_RFND_TOP	DLY_JD_RFND 京东店
          // FIN_RFND_TOP	DLY_JT_RFND 集团

          // console.log("============退款费用===============");
          // console.log(this.data["FIN_RFND_TOP-DLY_JT_RFND"]);
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


          // 做T+1处理开始
          // let year_now_time=new Date();
          let _time_now=new Date();
          _time_now=_time_now.getTime()-(24*60*60*1000);
          _time_now=new Date(_time_now);
          let time_t1_on= _time_now.getFullYear() +"-" +
          (_time_now.getMonth() + 1 >= 1 && _time_now.getMonth() + 1 <= 9? "0" + (_time_now.getMonth() + 1): _time_now.getMonth() + 1) +"-"+
          (_time_now.getDate()<=9?"0"+_time_now.getDate():_time_now.getDate());
          // 做T+1处理结束



          // console.log("=================33333333333333333=======================");
          // console.log(this.data["FIN_KA-ALL_REACH_RATE"][0].达成);
          // console.log(this.data);
          // console.log(this.sel_value.day_set.day_1+'          '+this.sel_value.day_set.month);
          // console.log(this.sel_title.module_value_set);          
          // console.log(this.sel_value.Range_on.Range_set);
          // console.log(this.data["FIN_KA-MONTH_TREND"]);
          // console.log(time_t1_on.substring(0,7));

          this.sel_title.module_value_set=[];
          if(this.sel_value.day_set.day_1==true){

            Object.keys(this.data["FIN_KA-Y_REACH_RATE"]).forEach((type_value) => {
              if(this.data["FIN_KA-Y_REACH_RATE"][type_value].TYPE=='集团'){
                // "！！集团"
                this.sel_title.quota_value.cont1 =this.data["FIN_KA-Y_REACH_RATE"][type_value].交易金额||0;
                this.sel_title.quota_value.cont2 =((this.data["FIN_KA-Y_REACH_RATE"][type_value].年累计==null)? 0:this.data["FIN_KA-Y_REACH_RATE"][type_value].年累计)||0;
                this.sel_title.quota_value.cont3 = this.data["FIN_KA-Y_REACH_RATE"][type_value].目标||0;
                this.sel_title.module_value_set.push(this.data["FIN_KA-Y_REACH_RATE"][type_value]);
                
              }else if(this.data["FIN_KA-Y_REACH_RATE"][type_value].TYPE=='线上'){
                // "！！B点  线上"
                this.sel_title.quota_value.cont4 = this.data["FIN_KA-Y_REACH_RATE"][type_value].交易金额||0;  
                this.sel_title.quota_value.cont5 =((this.data["FIN_KA-Y_REACH_RATE"][type_value].年累计==null)? 0:this.data["FIN_KA-Y_REACH_RATE"][type_value].年累计)||0;
                this.sel_title.quota_value.cont6 = this.data["FIN_KA-Y_REACH_RATE"][type_value].目标||0;  
              }else if(this.data["FIN_KA-Y_REACH_RATE"][type_value].TYPE=='火凤凰'){
                // "！！D店 线下=火凤凰"
                this.sel_title.quota_value.cont7 = this.data["FIN_KA-Y_REACH_RATE"][type_value].交易金额||0;  
                this.sel_title.quota_value.cont8 =((this.data["FIN_KA-Y_REACH_RATE"][type_value].年累计==null)? 0:this.data["FIN_KA-Y_REACH_RATE"][type_value].年累计)||0;
                this.sel_title.quota_value.cont9 = this.data["FIN_KA-Y_REACH_RATE"][type_value].目标||0;
                this.sel_title.module_value_set.push(this.data["FIN_KA-Y_REACH_RATE"][type_value]);

              }else{
                this.sel_title.module_value_set.push(this.data["FIN_KA-Y_REACH_RATE"][type_value]);
              }

              // else if(this.data["FIN_KA-Y_REACH_RATE"][type_value].TYPE=='火凤凰'){
              //   // "！！火凤凰"
              //   this.sel_title.quota_value.cont10 = this.data["FIN_KA-Y_REACH_RATE"][type_value].AMT||0; 
              //   this.sel_title.quota_value.cont11 =((this.data["FIN_KA-Y_REACH_RATE"][type_value].达成==null)? 0:this.data["FIN_KA-Y_REACH_RATE"][type_value].达成)||0;
              //   this.sel_title.quota_value.cont12 = this.data["FIN_KA-Y_REACH_RATE"][type_value].TARGET||0;                 
              // }

            });

            // 模块指标数据！！
            this.sel_title.module_value_set.sort((a, b) => {
                let a_time = "";
                let b_time = "";
                a_time =a["AMT"];
                b_time =b["AMT"];
                return b_time - a_time;
            }); 
            // console.log(this.sel_title.module_value_set);


            
          }else if(this.sel_value.day_set.month==true){


            console.log(this.data["FIN_KA-M_REACH_RATE"]);
            console.log(time_t1_on);
            Object.keys(this.data["FIN_KA-M_REACH_RATE"]).forEach((type_value) => {
              if(this.data["FIN_KA-M_REACH_RATE"][type_value].TYPE=='集团'){
                // "！！集团"
                this.sel_title.quota_value.cont1 =this.data["FIN_KA-M_REACH_RATE"][type_value].交易金额||0;
                this.sel_title.quota_value.cont2 =((this.data["FIN_KA-M_REACH_RATE"][type_value].月累计==null)? 0:this.data["FIN_KA-M_REACH_RATE"][type_value].月累计)||0;
                this.sel_title.quota_value.cont3 = this.data["FIN_KA-M_REACH_RATE"][type_value].目标||0;
                this.sel_title.module_value_set.push(this.data["FIN_KA-M_REACH_RATE"][type_value]);
                
              }else if(this.data["FIN_KA-M_REACH_RATE"][type_value].TYPE=='线上'){
                // "！！B点  线上"
                this.sel_title.quota_value.cont4 = this.data["FIN_KA-M_REACH_RATE"][type_value].交易金额||0;  
                this.sel_title.quota_value.cont5 =((this.data["FIN_KA-M_REACH_RATE"][type_value].月累计==null)? 0:this.data["FIN_KA-M_REACH_RATE"][type_value].月累计)||0;
                this.sel_title.quota_value.cont6 = this.data["FIN_KA-M_REACH_RATE"][type_value].目标||0;  
              }else if(this.data["FIN_KA-M_REACH_RATE"][type_value].TYPE=='火凤凰'){
                // "！！D店 线下=火凤凰"
                this.sel_title.quota_value.cont7 = this.data["FIN_KA-M_REACH_RATE"][type_value].交易金额||0;  
                this.sel_title.quota_value.cont8 =((this.data["FIN_KA-M_REACH_RATE"][type_value].月累计==null)? 0:this.data["FIN_KA-M_REACH_RATE"][type_value].月累计)||0;
                this.sel_title.quota_value.cont9 = this.data["FIN_KA-M_REACH_RATE"][type_value].目标||0;
                this.sel_title.module_value_set.push(this.data["FIN_KA-M_REACH_RATE"][type_value]);

              }else{
                this.sel_title.module_value_set.push(this.data["FIN_KA-M_REACH_RATE"][type_value]);
              }

            });




          }


   
          

          this.data_load_time=(typeof(this.data["FIN_GPR-FIN_GPR_LAOD_TIME"])!='undefined'&&typeof(this.data["FIN_GPR-FIN_GPR_LAOD_TIME"][0])!='undefined')? 
            this.data["FIN_GPR-FIN_GPR_LAOD_TIME"][0].LOAD_TIME.substring(0,4)+'.'
            +this.data["FIN_GPR-FIN_GPR_LAOD_TIME"][0].LOAD_TIME.substring(5,7)+'.'
            +this.data["FIN_GPR-FIN_GPR_LAOD_TIME"][0].LOAD_TIME.substring(8,10)
            :0;


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
              user_data=(this.sel_value.day_set.day_1==true)?this.data["FIN_GPR_MID-DLY_TRND_B_GPR"]:this.data["FIN_GPR_MID-MLY_TRND_B_GPR"];
              break;
            case 3:
              // console.log("京东！！");
              // console.log(this.data["FIN_GPR_MID-DLY_TRND_JD_GPR"]);
              user_data=(this.sel_value.day_set.day_1==true)?this.data["FIN_GPR_MID-DLY_TRND_JD_GPR"]:this.data["FIN_GPR_MID-MLY_TRND_JD_GPR"];
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

          
          user_data.sort((a, b) => {
              let a_time = "";
              let b_time = "";
              a_time = new Date((_this.sel_value.day_set.day_1==true)?a["MD"]:a["YM"]).getTime(new Date((_this.sel_value.day_set.day_1==true)?a["MD"]:a["YM"]));
              b_time = new Date((_this.sel_value.day_set.day_1==true)?b["MD"]:b["YM"]).getTime(new Date((_this.sel_value.day_set.day_1==true)?b["MD"]:b["YM"]));
              return a_time - b_time;
          });

          Object.keys(user_data).forEach((key_value_on) => {
            // if(this.sel_value.day_set.day_1==true){user_data[key_value_on].MD=user_data[key_value_on].YM}
            hour_data.push((this.sel_value.day_set.day_1==true)?user_data[key_value_on].MD:(user_data[key_value_on].MD).substring(5,7)+'月');
            sale_amt.push(((user_data[key_value_on].SUM_GPR_LCK||0)*100).toFixed(2));
            ago_amt.push(((user_data[key_value_on].AGO_SUM_GPR_LCK||0)*100).toFixed(2));
          });


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


          // Object.keys(this.data["FIN_KA-DAY_TREND"]).forEach((key_value2) => {
          //   hour_data.push(this.data["FIN_KA-DAY_TREND"][key_value2].YMD.substring(5,10));
          //   sale_amt.push(((this.data["FIN_KA-DAY_TREND"][key_value2].B店/10000)||0).toFixed(2));
          //   ago_amt.push(((this.data["FIN_KA-DAY_TREND"][key_value2].D店/10000)||0).toFixed(2));
          // });   

          // console.log("=========测试的ka达成！！！=======");
          // console.log(this.sel_value.target.all_muri_value);
          // console.log(this.data["FIN_KA-DAY_TREND"]);  YMD

          if(this.sel_value.target.all_muri_value==1){

            Object.keys(this.data["FIN_KA-DAY_TREND"]).forEach((key_value2) => {
              hour_data.push(this.data["FIN_KA-DAY_TREND"][key_value2].YMD.substring(5,7)+"."+this.data["FIN_KA-DAY_TREND"][key_value2].YMD.substring(8,10));
              year_add_time.push(this.data["FIN_KA-DAY_TREND"][key_value2].YMD.substring(0,4));
              sale_amt.push(((this.data["FIN_KA-DAY_TREND"][key_value2].集团交易金额/10000)||0).toFixed(1));
              // ago_amt.push(((this.data["FIN_KA-DAY_TREND"][key_value2].D店/10000)||0).toFixed(2));
            });   

          }else if(this.sel_value.target.all_muri_value==2){

            Object.keys(this.data["FIN_KA-DAY_TREND"]).forEach((key_value2) => {
              // hour_data.push(this.data["FIN_KA-DAY_TREND"][key_value2].YMD.substring(5,10));
              hour_data.push(this.data["FIN_KA-DAY_TREND"][key_value2].YMD.substring(5,7)+"."+this.data["FIN_KA-DAY_TREND"][key_value2].YMD.substring(8,10));
              year_add_time.push(this.data["FIN_KA-DAY_TREND"][key_value2].YMD.substring(0,4));
              sale_amt.push(((this.data["FIN_KA-DAY_TREND"][key_value2].线上交易金额/10000)||0).toFixed(1));
              // ago_amt.push(((this.data["FIN_KA-DAY_TREND"][key_value2].D店/10000)||0).toFixed(2));
            });            

          }else if(this.sel_value.target.all_muri_value==3){

            Object.keys(this.data["FIN_KA-DAY_TREND"]).forEach((key_value2) => {
              // hour_data.push(this.data["FIN_KA-DAY_TREND"][key_value2].YMD.substring(5,10));
              hour_data.push(this.data["FIN_KA-DAY_TREND"][key_value2].YMD.substring(5,7)+"."+this.data["FIN_KA-DAY_TREND"][key_value2].YMD.substring(8,10));
              year_add_time.push(this.data["FIN_KA-DAY_TREND"][key_value2].YMD.substring(0,4));
              sale_amt.push(((this.data["FIN_KA-DAY_TREND"][key_value2].火凤凰交易金额/10000)||0).toFixed(1));
              // ago_amt.push(((this.data["FIN_KA-DAY_TREND"][key_value2].D店/10000)||0).toFixed(2));
            }); 

          }else if(this.sel_value.target.all_muri_value==4){

            Object.keys(this.data["FIN_KA-DAY_TREND"]).forEach((key_value2) => {
              // hour_data.push(this.data["FIN_KA-DAY_TREND"][key_value2].YMD.substring(5,10));
              hour_data.push(this.data["FIN_KA-DAY_TREND"][key_value2].YMD.substring(5,7)+"."+this.data["FIN_KA-DAY_TREND"][key_value2].YMD.substring(8,10));
              year_add_time.push(this.data["FIN_KA-DAY_TREND"][key_value2].YMD.substring(0,4));
              sale_amt.push(((this.data["FIN_KA-DAY_TREND"][key_value2].火凤凰/10000)||0).toFixed(1));
              // ago_amt.push(((this.data["FIN_KA-DAY_TREND"][key_value2].D店/10000)||0).toFixed(2));
            }); 

          }
          year_add_time=this.unique(year_add_time);
          
        }

        console.log("====================交易成功日趋势！！！=========================")
        console.log(this.data["FIN_KA-DAY_TREND"][0].YMD.substring(5,7)+"."+this.data["FIN_KA-DAY_TREND"][0].YMD.substring(8,10));
        // console.log(sale_amt);
        // console.log(hour_data);



        this.barData.value=0;
        this.barData.ago_value=0;

        if(this.sel_value.Range_on.Range_set=='1'){
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

          // this.barData.month=(_time_now.getMonth()+1)+'-'+(_time_now.getDate());
          // Object.keys(hour_data).forEach((key_mv) => {
          //   if(hour_data[key_mv]==((_time_now.getMonth()+1)+'-'+(_time_now.getDate()))){
          //     this.barData.value=sale_amt[key_mv]
          //     this.barData.ago_value=ago_amt[key_mv]
          //   }
          // }); 

          if(this.barData.value==0&&this.barData.ago_value==0){
            this.barData.month=year_add_time+'.'+hour_data[hour_data.length-1];
            this.barData.value=sale_amt[sale_amt.length-1]+'万';
            this.barData.ago_value=ago_amt[ago_amt.length-1]+'万';
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

            animation:true,    //设置是否开启动画
            //动画加载时长为3秒
            animationDuration: 1000,

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
                  _this.barData.value =(params[1]==undefined)? 0:((params[1].value==0.01)?0:params[1].value)+'%';
                  _this.barData.ago_value =(params[0]==undefined)? 0:((params[0].value==0.01)?0:params[0].value)+'%';
                  // _this.barData.month =(params[0]==undefined)? 0: params[0].axisValue;
                }else{
                  // _this.barData.value =(params[1]==undefined)? 0:((params[1].value==0.01)?0:params[1].value);
                  // _this.barData.ago_value =(params[0]==undefined)? 0: ((params[0].value==0.01)?0:params[0].value);
                  _this.barData.value =(params[0]==undefined)? 0:((params[0].value==0.01)?0:params[0].value)+'万';
                  // _this.barData.month =(params[0]==undefined)? 0: params[0].axisValue;
                }

                _this.barData.month =(params[0]==undefined)? 0: year_add_time+'.'+params[0].axisValue;

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

        // if(this.echarts2_clear==true){
        //   this.chartIns2.clear();
        //   this.echarts2_clear=false;
        // }
        this.chartIns2.clear();

        let hour_data = [];
        let sale_amt = [];
        let ago_amt = [];  
        let _this=this;

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

        // console.log("=======asdasda222222222222========");
        // console.log(this.data["FIN_KA-MONTH_TREND"]);



        if(this.sel_value.target.all_muri_value==1){
          Object.keys(this.data["FIN_KA-MONTH_TREND"]).forEach((key_value) => {
              hour_data.push(this.data["FIN_KA-MONTH_TREND"][key_value].MDATE.substring(5,7)*1+'月');

              // sale_amt.push(((this.data["FIN_KA-MONTH_TREND"][key_value].集团交易金额)/10000||0).toFixed(1));
              sale_amt.push(
                {'value':((this.data["FIN_KA-MONTH_TREND"][key_value].集团交易金额)/10000/10000||0).toFixed(2),
                 'itemStyle':{'color':(((this.data["FIN_KA-MONTH_TREND"][key_value].集团交易金额/10000/10000||0).toFixed(2)*1)>=((this.data["FIN_KA-MONTH_TREND"][key_value].集团月目标/10000/10000||0).toFixed(2)*1))?'#FF2219':'#00B050'}
                }
              );
              ago_amt.push(((this.data["FIN_KA-MONTH_TREND"][key_value].集团月目标)/10000/10000||0).toFixed(2));
          });

        }else if(this.sel_value.target.all_muri_value==2){
          Object.keys(this.data["FIN_KA-MONTH_TREND"]).forEach((key_value) => {
              hour_data.push(this.data["FIN_KA-MONTH_TREND"][key_value].MDATE.substring(5,7)*1+'月');
              // sale_amt.push(((this.data["FIN_KA-MONTH_TREND"][key_value].B店交易金额)/10000||0).toFixed(1));
              // console.log(((this.data["FIN_KA-MONTH_TREND"][key_value].线上交易金额||0).toFixed(2))); 
              // console.log(((this.data["FIN_KA-MONTH_TREND"][key_value].线上月目标||0).toFixed(2)));             
              sale_amt.push(
                {'value':((this.data["FIN_KA-MONTH_TREND"][key_value].线上交易金额)/10000/10000||0).toFixed(2),
                 'itemStyle':{'color':(((this.data["FIN_KA-MONTH_TREND"][key_value].线上交易金额/10000/10000||0).toFixed(2)*1)>=((this.data["FIN_KA-MONTH_TREND"][key_value].线上月目标/10000/10000||0).toFixed(2)*1))?'#FF2219':'#00B050'}
                }
              );
              ago_amt.push(((this.data["FIN_KA-MONTH_TREND"][key_value].线上月目标)/10000/10000||0).toFixed(2));
          });

        }else if(this.sel_value.target.all_muri_value==3){
          Object.keys(this.data["FIN_KA-MONTH_TREND"]).forEach((key_value) => {
              hour_data.push(this.data["FIN_KA-MONTH_TREND"][key_value].MDATE.substring(5,7)*1+'月');
              // sale_amt.push(((this.data["FIN_KA-MONTH_TREND"][key_value].D店交易金额)/10000||0).toFixed(1));
              sale_amt.push(
                {'value':((this.data["FIN_KA-MONTH_TREND"][key_value].火凤凰交易金额)/10000/10000||0).toFixed(2),
                 'itemStyle':{'color':(((this.data["FIN_KA-MONTH_TREND"][key_value].火凤凰交易金额/10000/10000||0).toFixed(2)*1)>=((this.data["FIN_KA-MONTH_TREND"][key_value].火凤凰月目标/10000/10000||0).toFixed(2)*1))?'#FF2219':'#00B050'}
                }
              );
              ago_amt.push(((this.data["FIN_KA-MONTH_TREND"][key_value].火凤凰月目标)/10000/10000||0).toFixed(2));
          });

        }else if(this.sel_value.target.all_muri_value==4){
          Object.keys(this.data["FIN_KA-MONTH_TREND"]).forEach((key_value) => {
              hour_data.push(this.data["FIN_KA-MONTH_TREND"][key_value].MDATE.substring(5,7)*1+'月');
              sale_amt.push(((this.data["FIN_KA-MONTH_TREND"][key_value].火凤凰交易金额)/10000||0).toFixed(2));
              // ago_amt.push(((this.data["FIN_KA-MONTH_TREND"][key_value].D店月目标)/10000||0).toFixed(2));
          });

        }





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

            animation:true,    //设置是否开启动画
            //动画加载时长为3秒
            animationDuration: 1000,

            formatter:function (params) {
              // console.log(params);
              // console.log(params[0].value+"  "+params[0].name);
              let month_set_on= params[0].axisValue;

              let set_value='';
              let value1='';
              let value2='';

              if(_this.sel_value.target.all_muri_value==4){
                value1=(params[0].value==0)?'--':params[0].value;
                // value2=params[1].value;     
                set_value=month_set_on+'<br/>'+params[0].marker+'金额：'+value1+'万'
              }else{

                let rate_u=0;
                rate_u=(params[0].value==0||params[1].value==undefined)?'--':((params[0].value/params[1].value)*100).toFixed(1);           
                value1=(params[0].value==0)?'--':params[0].value;
                value2=(params[1].value==0)?'--':params[1].value;     
                set_value=month_set_on+'<br/>'+'金额：'+((value1=='--')?'--':(params[0].marker+value1+'亿'))+'<br/>'+
                  '目标：'+((value2=='--')?'--':(params[1].marker+value2+'亿'))+
                  '<br/>'+'达成：'+((rate_u=='--')?'--':(rate_u+'%'));
              }

     
              return set_value
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



    collapse_change(set_name,set_num) {

      if(this.activeNames==set_num&&set_name!=undefined){

        let _this = this;
        setTimeout(function name() {
          _this.initChart_mod(set_name, _this.activeNames);
        }, 10);        

      }

    },

    initChart_mod(set_name, set_value_name) {

      // console.log("========财务展开函数这里！！！！！！！==========");
      // console.log(set_name);
      // console.log(this.$refs);
      // console.log(set_value_name);


      this.chartIns_ = echarts.init(this.$refs[set_name][0]);

      let _this = this;
      let user_data = [];

      let user_time = [];
      let mtd_pay_amt = [];
      let mtd_ago_amt = [];


      this.p1.then(() => {

        // if(this.echarts3_clear==true){
        //   this.chartIns_.clear(); 
        //   this.echarts3_clear=false;         
        // } 
        this.chartIns_.clear();

        if(this.sel_value.day_set.day_1==true){ 	

          user_data=this.data["FIN_KA-MONTH_TREND"];
          user_data.sort((a, b) => {
            let a_time = "";
            let b_time = "";
            a_time = new Date(a["MDATE"].substring(0,10)).getTime(new Date(a["MDATE"].substring(0,10)));
            b_time = new Date(b["MDATE"].substring(0,10)).getTime(new Date(b["MDATE"].substring(0,10)));
            return a_time - b_time;
          });          
          Object.keys(user_data).forEach((key_pd1) => {
            user_time.push(user_data[key_pd1].MDATE.substring(5,7)*1+'月');

            if(set_value_name==0){
              mtd_pay_amt.push(
                  {'value':((user_data[key_pd1].集团交易金额)/10000/10000||0).toFixed(2),
                  'itemStyle':{'color':((user_data[key_pd1].集团交易金额)>(user_data[key_pd1].集团月目标))?'#FF2219':'#00B050'}
                  }
              );
              mtd_ago_amt.push((user_data[key_pd1].集团月目标/10000/10000).toFixed(2));
            }else if(set_value_name==1){
              mtd_pay_amt.push(
                  {'value':((user_data[key_pd1].火凤凰交易金额)/10000/10000||0).toFixed(2),
                  'itemStyle':{'color':((user_data[key_pd1].火凤凰交易金额)>(user_data[key_pd1].火凤凰月目标))?'#FF2219':'#00B050'}
                  }
              );
              mtd_ago_amt.push((user_data[key_pd1].火凤凰月目标/10000/10000).toFixed(2));
            }else if(set_value_name==2){
              mtd_pay_amt.push(
                  {'value':((user_data[key_pd1].纯B店交易金额)/10000/10000||0).toFixed(2),
                  'itemStyle':{'color':((user_data[key_pd1].纯B店交易金额)>(user_data[key_pd1].纯B店月目标))?'#FF2219':'#00B050'}
                  }
              );
              mtd_ago_amt.push((user_data[key_pd1].纯B店月目标/10000/10000).toFixed(2));
            }else if(set_value_name==3){
              mtd_pay_amt.push(
                  {'value':((user_data[key_pd1].纯D店交易金额)/10000/10000||0).toFixed(2),
                  'itemStyle':{'color':((user_data[key_pd1].纯D店交易金额)>(user_data[key_pd1].纯D店月目标))?'#FF2219':'#00B050'}
                  }
              );
              mtd_ago_amt.push((user_data[key_pd1].纯D店月目标/10000/10000).toFixed(2));
            }else if(set_value_name==4){
              mtd_pay_amt.push(
                  {'value':((user_data[key_pd1].网拍交易金额)/10000/10000||0).toFixed(2),
                  'itemStyle':{'color':((user_data[key_pd1].网拍交易金额)>(user_data[key_pd1].网拍月目标))?'#FF2219':'#00B050'}
                  }
              );
              mtd_ago_amt.push((user_data[key_pd1].网拍月目标/10000/10000).toFixed(2));
            }
            
          });

          
        }else if(this.sel_value.day_set.month==true){

          // console.log("===asda e we w we ===");
          user_data=this.data["FIN_KA-DAY_TREND"];

          user_data.sort((a, b) => {
            let a_time = "";
            let b_time = "";
            a_time = new Date(a["YMD"].substring(0,10)).getTime(new Date(a["YMD"].substring(0,10)));
            b_time = new Date(b["YMD"].substring(0,10)).getTime(new Date(b["YMD"].substring(0,10)));
            return a_time - b_time;
          });  
          // console.log(user_data);

          Object.keys(user_data).forEach((key_day) => {
            user_time.push(user_data[key_day].YMD.substring(5,7)+"."+user_data[key_day].YMD.substring(8,10));

            if(set_value_name==0){
              mtd_pay_amt.push(
                  {'value':((user_data[key_day].集团交易金额)/10000||0).toFixed(1)}
              );
            }else if(set_value_name==1){
              mtd_pay_amt.push(
                  {'value':((user_data[key_day].火凤凰交易金额)/10000||0).toFixed(1)}
              );
            }else if(set_value_name==2){
              mtd_pay_amt.push(
                  {'value':((user_data[key_day].纯B店交易金额)/10000||0).toFixed(1)}
              );
            }else if(set_value_name==3){
              mtd_pay_amt.push(
                  {'value':((user_data[key_day].纯D店交易金额)/10000||0).toFixed(1)}
              );
            }else if(set_value_name==4){
              mtd_pay_amt.push(
                  {'value':((user_data[key_day].网拍交易金额)/10000||0).toFixed(1)}
              );
            }


          });

          // console.log(user_time);

        }


        //默认值开始 
        if(this.sel_value.Range_on.Range_set == "2"){
          this.barData.month=0;
          this.barData.value=0;
          this.barData.ago_value=0;  
        }
        //默认值结束
        // Object.keys(user_time).forEach((key_user) => {
        //   user_time[key_user]=(user_time[key_user]).substring(0,2)*1+'.'+(user_time[key_user]).substring(3,5)*1
        // });



        this.chartIns_.setOption({
          grid: {
            left: "0%",
            top: "5%",
            right: "0%",
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
          animation:true,    //设置是否开启动画
          //动画加载时长为3秒
          animationDuration: 1000,

          tooltip: {
            trigger: "axis",
            padding: [2, 5, 2, 5],
            axisPointer: {
              // type: "cross",
              type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
              label: {
                color: "#000000",
                backgroundColor: "aliceblue",
              },
            },

            textStyle:{
              align:'left'
            },

            formatter:function (params) {
              // _this.barData.value = params[1].value;
              // _this.barData.ago_value = params[0].value;
              // _this.barData.month = params[1].axisValue;
              // console.log(params);
              let udata=0;

              if(_this.sel_value.day_set.day_1==true){
                let rate_u=0;
                rate_u=(params[1].value==0||params[1].value==undefined)?'--':((params[0].value/params[1].value)*100).toFixed(1);

                udata="日期："+params[0].axisValue+'<br/> 金额：'+((params[0].value==0)?'-- ':(params[0].marker+params[0].value+'亿'))+
                  '<br/> 目标：'+((params[1].value==0)?'--':(params[1].marker+params[1].value+'亿'))+
                  '<br/> 达成：'+((rate_u==0||rate_u=='--')?'--':(rate_u+'%'));
              }else{
                udata="日期："+params[0].axisValue+'<br/> 金额：'+((params[0].value==0)?'-- ':(params[0].marker+params[0].value+'万'));
              }


              return udata;
            }

          },

          xAxis: {
            type: "category",
            // boundaryGap: false,
            data: user_time,

            axisLine: {
              lineStyle: {
                color: "#ccc",
              },
            },
            axisLabel: {
              // interval: 'auto',
            },

            axisTick: {
              alignWithLabel: true
            }

          },


          yAxis: [
            {
              type: "value",
              name: "业绩",
              // interval: 10000,
              show: true,
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

          ],

          series: [


            {
              name: "业绩",
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

              barWidth:mtd_pay_amt.length>4? '60%':'30%',
              data: mtd_pay_amt,

              type: (this.sel_value.day_set.month==true)?"line":"bar",
              // type: "line",
              areaStyle: {},
            },


            {
              name: "目标",
              showSymbol: false,
              smooth: false, //true 为平滑曲线，false为直线

              itemStyle: {
                color: "#0938F7",

                normal: {
                  // color: "#66ccff",
                  color: "#F5A028",
                  lineStyle: {
                    color: "#F5A028",
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

              data: mtd_ago_amt,

              // type: "bar",
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

    chenSwiper(value){
      this.$refs['mySwiper_entry'].$swiper.slideTo(value,0,false)
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
  width: 16.6666666666666%;
  font-size: 12px;
  color: #999999;
  // text-align: center;
}

#table_all_new .table_content ul li {
  float: left;
  width: 16.6666666666666%;
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
  bottom: 0px;
  margin-top: 5px;

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





/deep/ #mokuai_id div .van-cell,/deep/ #mokuai_cont_id div .van-cell{
  // background: #0066ff;
  padding-left: 5px;
  padding-right: 5px;
  //   padding: 0px;
  border-radius: 4px;
  background: rgb(247, 247, 247);
  // background: #000000;

} 

/deep/ #mokuai_id div .van-collapse-item__wrapper .van-collapse-item__content{
  background: rgb(247, 247, 247);
}

.mokuai_title .van-row,.mokuai_cont .van-row {
  // color: #6f6f6f;
  color: #999999;
  font-size: 12px;
}

.mokuai_cont .van-row {
  color: #000;
}


/deep/ #mokuai_id div .van-cell .van-cell__right-icon{
  margin-right: 18px;
}

/deep/ .yjdcqs_color div.rate-up:before{
  right: -10px;
  top: 4px;
}

/deep/ .yjdcqs_color div.rate-down:before{
  right: -10px;
  top: 8px;
}

</style>
