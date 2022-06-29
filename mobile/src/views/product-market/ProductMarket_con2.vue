
<template>
  <!-- style="background-color: #EEEEEE;" style="background: rgb(245, 245, 245);"-->
  <div class="Productmarket_all" >
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
      />
       -->

      <van-picker
        title="选择年月"
        show-toolbar
         :default-index="ym_default_index"
        :columns="test_time_date"
        @confirm="onConfirm"
        @cancel="onCancel"
        @change="onChange"
      />


    </van-popup>


   <!-- 下拉开始 -->
   <van-pull-refresh v-model="isLoading" :head-height="0" :pull-distance="0" @refresh="onRefresh">
      
    <!-- 开头开始 -->
    <section class="px10 py10 nav-wrapper" style="display: none">
      <div class="Productmarket_title" style="">
        <van-row type="flex" justify="center">
          <van-col span="7" @click="Range_Single_choice('1')"
            ><van-button
              round
              :type="sel_value.cpcy ? click_css_set.type : click_css_no.type"
              :color="sel_value.cpcy ? click_css_set.color : click_css_no.color"
              style="margin: 0 auto; display: block"
              >产值概览</van-button
            ></van-col
          >
          <van-col span="7" @click="Range_Single_choice('2')"
            ><van-button
              round
              :type="sel_value.ouk ? click_css_set.type : click_css_no.type"
              class="but_no_select"
              :color="sel_value.ouk ? click_css_set.color : click_css_no.color"
              style="margin: 0 auto; display: block"
              >欧康品质</van-button
            ></van-col
          >
          <van-col span="7" @click="Range_Single_choice('3')"
            ><van-button
              round
              :type="sel_value.muying ? click_css_set.type : click_css_no.type"
              class="but_no_select"
              :color="
                sel_value.muying ? click_css_set.color : click_css_no.color
              "
              style="margin: 0 auto; display: block"
              >母婴概览</van-button
            ></van-col
          >
        </van-row>
      </div>
    </section>

    <!-- 滑屏开始 -->

    <div>

      <!-- <van-notice-bar
        wrapable
        :scrollable="false"
        style=""
        color="#999999"
        background="rgba(245, 245, 245, 1)"
        :text="'更新时间：' + load_time"
      /> -->
      <!-- <div style="padding-left: 10px;font-size: 12px;color: #999999;line-height: 30px;"></div> -->
      <section
        style="padding-top: 5px; padding-bottom: 5px; border-radius: 4px; ;margin-left: 10px;margin-right: 10px;margin-bottom: 0px;"
      >
       <!-- <div class="section-title test_addd" style="padding-left: 0px; padding-bottom: 0px;color: #999999;">
          {{'更新时间：' + load_time.substring(0,11)}}
        </div> -->

          <div class="" style="padding-left: 0px; padding-bottom: 0px;color: #999999;font-size: 12px;display: flex;justify-content: space-between;">
            <span>{{'更新时间：' + load_time.substring(0,11)}}</span>
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
                <van-collapse-item title="售后率" name="1">
                  <p>上月+当月产生售后责任/上月发货商品数量（如：2月考核，即取1月发货商品数作为分母，取（1+2月售后数作为分子）；</p>
                  <p>①责任类型为工厂责任+原材料责任</p>
                  <p>②剔除采购经销（不剔除网拍订单）</p>
                  <p>③供应商=佛山市欧康家具有限公司</p>
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


      <!-- 开头结束 background-color: #ffffff;class="px10 py10"-->

      <section  style="padding-top: 10px; padding-bottom: 10px;background: #ffffff;border-radius: 4px;margin-left: 10px;margin-right: 10px;">
        <div class="Productmarket_day">
          <van-row type="flex" justify="center">
            <van-col
              v-if="sel_value.Range_set == 4"
              span="6"
              @click="Single_choice('1')"
              >
              <van-button plain
                :type="sel_value.day_1 ? click_css_set.type : click_css_no.type"
                class="but_set_select"
                :color="
                  sel_value.day_1 ? click_css_set.color : click_css_no.color
                "
                >1天</van-button
              ></van-col
            >

            <!-- ||sel_value.Range_set==1 ||sel_value.Range_set==1-->
            <van-col
              style="margin-right: 0px;"
              span="6"
              @click="Single_choice('2')"
              >
              <van-button plain
                :style="sel_value.day_7 ? {'background-color': 'rgb(255, 255, 255)'}:{'background-color': 'rgb(247, 247, 247)'}"
                :type="(sel_value.Range_set==3)? sel_value.day_7 ? click_css_set.type : click_css_no.type:click_css_no_grey.type"
                class="but_no_select"
                :color="(sel_value.Range_set==3)?
                  sel_value.day_7 ? click_css_set.color : click_css_no.color:click_css_no_grey.color
                "
                >近7天</van-button
              >

              <!-- 近7天 -->

              </van-col
            >

            <!-- ||sel_value.Range_set==1 ||sel_value.Range_set==1-->
            <van-col
              style="margin-right: 10px;margin-left: 10px;"
              span="6"
              @click="Single_choice('3')"
              >
              <van-button plain
                :style="sel_value.day_30 ? {'background-color': 'rgb(255, 255, 255)'}:{'background-color': 'rgb(247, 247, 247)'}"
                :type="(sel_value.Range_set==3)?
                  sel_value.day_30 ? click_css_set.type : click_css_no.type:click_css_no_grey.type
                "
                class="but_no_select"
                :color="(sel_value.Range_set==3)?
                  sel_value.day_30 ? click_css_set.color : click_css_no.color:click_css_no_grey.color
                "
                >近30天</van-button
              >
              <!-- 近30天 -->

              </van-col
            >
            <van-col style="margin-right: 0px;" span="6" @click="showPopup"
              >
              <van-button plain
                :style="sel_value.month ? {'background-color': 'rgb(255, 255, 255)'}:{'background-color': 'rgb(247, 247, 247)'}"
                :type="sel_value.month ? click_css_set.type : click_css_no.type"
                class="but_no_select"
                :color="
                  sel_value.month ? click_css_set.color : click_css_no.color
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
              sel_value.day_7 || sel_value.day_30
                ? set_time_range.start + "~" + set_time_range.end
                : set_time.substring(0, 4) +
                  "年" +
                  set_time.substring(5, 7) +
                  "月"
            }}）</span
          >
        </div>
      </section>


      <van-notice-bar
        wrapable
        style="padding: 0px"
        :scrollable="false"
        color="rgba(245, 245, 245, 1)"
        background="rgba(245, 245, 245, 1)"
        text=""
      />



      <section
        style="padding-top: 5px; padding-bottom: 5px; border-radius: 4px; ;margin-left: 10px;margin-right: 10px;margin-bottom: 0px;"
      >
       <div
          class="section-title test_addd"
          style="padding-left: 0px; padding-bottom: 0px"
        >
          核心指标
        </div>

      </section>



      <section
        style="padding-top: 10px; padding-bottom: 10px; border-radius: 4px;background: #ffffff;margin-left: 10px;margin-right: 10px;"
      >

        <div
          class="Productmarket_labqie"
          :style="hexinzhibiao"
          style="border-bottom: 0px solid #dddddd;margin-left: 10px; margin-right: 10px;"
        >

          <div
            @click="all_muban_ruanti('1')"
            class="Productmarket_labqie_con1"
            :style="
              sel_value.all_muri_value == 1
                ? click_css_hxzb_y
                : click_css_hxzb_n
            "
          >
            <span :style="sum_zhibiao.title">{{
              sel_title.chanzhi_wenzi.title_all
            }}</span>

            <span :style="sum_zhibiao.zhognxin">{{
              fomatMoney(set_target_data.all_valeu.value)||((sel_value.Range_set==2)?0+'%':0+'万')
            }}</span>

            

            <!-- <span :style="sum_zhibiao.body">
              <i
                style="
                  color: #999999;
                  width: 35%;
                  display: inline-block;
                  font-style: normal;
                "
                >{{ sel_title.chanzhi_wenzi.target }}</i
              >
              <i style="font-style: normal">{{
                set_target_data.all_valeu.target
              }}</i>
            </span> -->



            <span :style="sum_zhibiao.body">
              <i
                style="
                
                  width: 35%;
                  display: inline-block;
                  font-style: normal;
                "
                >{{ sel_title.chanzhi_wenzi.reach_rate }}</i
              >
              <i style="font-style: normal">{{
                (set_target_data.all_valeu.reach_rate||0+'%')
              }}</i>
            </span>
            <span class="change-rate" style="padding-bottom: 4px;" :style="sum_zhibiao.body">
              <i
                style="
                 
                  width: 35%;
                  display: inline-block;
                  font-style: normal;
                "
                >{{ sel_title.chanzhi_wenzi.ago_rate }}</i
              >
              <!-- :class="calcSignClass(data['overview-ka_reach_yoy_rate'])"  rate-up-->

              <!-- sel_value.all_muri_value == 1? 
                Number((set_target_data.all_valeu.ago_rate.replace('%', ''))||0)>0?'rate-up-sel':'rate-down-sel': -->

              <i style="font-style: normal;"
                :class="
                sel_value.Range_set==2? Number((set_target_data.all_valeu.ago_rate.replace('%', ''))||0)>0?'rate-up_salesR':'rate-down_salesR'
                :Number((set_target_data.all_valeu.ago_rate.replace('%', ''))||0)>0?'rate-up':'rate-down'"
              >
                {{ (Number(set_target_data.all_valeu.ago_rate.replace('%', ''))>1000? 
                (Number(set_target_data.all_valeu.ago_rate.replace('%', ''))/10000).toFixed(2)+"w%":fomatMoney(set_target_data.all_valeu.ago_rate))||0+'%' }}
              
              </i>
            </span>
          </div>

          <div
            @click="all_muban_ruanti('2')"
            class="Productmarket_labqie_con2"
            :style="
              sel_value.all_muri_value == 2
                ? click_css_hxzb_y
                : click_css_hxzb_n
            "
          >
            <span :style="sum_zhibiao.title">{{
              sel_title.chanzhi_wenzi.title_muban
            }}</span>
            <span :style="sum_zhibiao.zhognxin">{{
              fomatMoney(set_target_data.muban_valeu.value)||((sel_value.Range_set==2)?0+'%':0+'万')
            }}</span>

            <!-- <span :style="sum_zhibiao.body">
              <i
                style="
                  color: #999999;
                  width: 35%;
                  display: inline-block;
                  font-style: normal;
                "
                >{{ sel_title.chanzhi_wenzi.target }}</i
              >
              <i style="font-style: normal">{{
                set_target_data.muban_valeu.target
              }}</i>
            </span> -->

            <span :style="sum_zhibiao.body">
              <i
                style="
                
                  width: 35%;
                  display: inline-block;
                  font-style: normal;
                "
                >{{ sel_title.chanzhi_wenzi.reach_rate }}</i
              >
              <i style="font-style: normal">{{
                (set_target_data.muban_valeu.reach_rate)||0+'%'
              }}</i>
            </span>
            <span class="change-rate" style="padding-bottom: 4px;" :style="sum_zhibiao.body">
              <i
                style="
                 
                  width: 35%;
                  display: inline-block;
                  font-style: normal;
                "
                >{{ sel_title.chanzhi_wenzi.ago_rate }}</i
              >

              <!-- sel_value.all_muri_value == 2? 
                Number((set_target_data.muban_valeu.ago_rate.replace('%', ''))||0)>0?'rate-up-sel':'rate-down-sel': -->

              <i style="font-style: normal;"
                :class="
                sel_value.Range_set==2? Number((set_target_data.muban_valeu.ago_rate.replace('%', ''))||0)>0?'rate-up_salesR':'rate-down_salesR'
                :Number((set_target_data.muban_valeu.ago_rate.replace('%', ''))||0)>0?'rate-up':'rate-down'"
              >
                <!-- {{ set_target_data.muban_valeu.ago_rate }} -->

                {{ (Number(set_target_data.muban_valeu.ago_rate.replace('%', ''))>1000? 
                (Number(set_target_data.muban_valeu.ago_rate.replace('%', ''))/10000).toFixed(2)+"w%":set_target_data.muban_valeu.ago_rate)||0+'%' }}
                
              </i>
            </span>
          </div>

          <div
            @click="all_muban_ruanti('3')"
            class="Productmarket_labqie_con3"
            :style="
              sel_value.all_muri_value == 3
                ? Object.assign({},click_css_hxzb_y,{'margin-right':'0%'}) 
                : Object.assign({},click_css_hxzb_n,{'margin-right':'0%'}) 
            "
          >

            <span :style="sum_zhibiao.title">{{
              sel_title.chanzhi_wenzi.title_ruanti
            }}</span>
            <span :style="sum_zhibiao.zhognxin">{{
              fomatMoney(set_target_data.ruanti_valeu.value)||((sel_value.Range_set==2||sel_value.Range_set==3)?0+'%':0+'万')
            }}</span>

            <!-- <span :style="sum_zhibiao.body">
              <i
                style="
                  color: #999999;
                  width: 35%;
                  display: inline-block;
                  font-style: normal;
                "
                >{{ sel_title.chanzhi_wenzi.target }}</i
              >
              <i style="font-style: normal">{{
                set_target_data.ruanti_valeu.target
              }}</i>
            </span> -->

            <span :style="sum_zhibiao.body">
              <i
                style="
                  
                  width: 35%;
                  display: inline-block;
                  font-style: normal;
                "
                >{{ sel_title.chanzhi_wenzi.reach_rate }}</i
              >
              <i style="font-style: normal">{{
                set_target_data.ruanti_valeu.reach_rate||0+'%'
              }}</i>
            </span>
            <span class="change-rate" style="padding-bottom: 4px;" :style="sum_zhibiao.body">
              <i
                style="
                  
                  width: 35%;
                  display: inline-block;
                  font-style: normal;
                "
                >{{ sel_title.chanzhi_wenzi.ago_rate }}</i
              >

              <!-- sel_value.all_muri_value == 3? Number((set_target_data.ruanti_valeu.ago_rate.replace('%', ''))||0)>0?'rate-up-sel':'rate-down-sel' : -->

              <i style="font-style: normal;"
                :class="

                sel_value.Range_set==2? Number((set_target_data.ruanti_valeu.ago_rate.replace('%', ''))||0)>0?'rate-up_salesR':'rate-down_salesR'
                :Number((set_target_data.ruanti_valeu.ago_rate.replace('%', ''))||0)>0?'rate-up':'rate-down'"
              >
                <!-- {{ set_target_data.ruanti_valeu.ago_rate }} -->

                {{ (Number(set_target_data.ruanti_valeu.ago_rate.replace('%', ''))>1000? 
                (Number(set_target_data.ruanti_valeu.ago_rate.replace('%', ''))/10000).toFixed(2)+"w%":set_target_data.ruanti_valeu.ago_rate)||0+'%' }}
                
              </i>
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
      <div class="canvas_bottom" ref="canvas_w_h" style="padding-top: 10px;background: #ffffff;margin-left: 10px;margin-right: 10px;border-radius: 4px;padding-bottom: 10px;">
        <!-- 切换优化开始 -->
        <van-row gutter="" type="flex" :style="(sel_value.all_muri_value == 3 && sel_value.Range_set == 3)?canvas_qiehuan.display_cssn:canvas_qiehuan.display_cssb" >
          <van-col
            span="5"
            :style="
              sel_value.canvas_yes?canvas_qiehuan.yes_css:canvas_qiehuan.no_css"
            style="margin-right: 1.5%; border-radius: 4px;"
          >
            <div
              @click="Single_canvas('1')"
              style="padding: 4px; text-align: center; font-size: 12px"
            >
              时间分布
            </div>
          </van-col>

          <van-col
            span="5"
            :style="
              sel_value.canvas_no? canvas_qiehuan.yes_css:canvas_qiehuan.no_css"
            style="margin-right: 10px; border-radius: 4px;"
          >
            <div
              @click="Single_canvas('2')"
              style="padding: 4px; text-align: center; font-size: 12px"
            >
              二级类目
            </div>
          </van-col>

          <!-- <van-col span="12">
            <div style="text-align: right; font-size: 12px;color: #CCCCCC;padding: 4px;padding-right: 0px;">{{sel_value.Range_set==2? '单位：%':'单位：万'}}</div>
          </van-col> -->

        </van-row>
        <div style="clear: both;"></div>
        <!-- 切换优化结束 class="px10 py10"-->

        <section class="px10 py10" :style="sel_value.canvas_yes?echarts2_css_y:echarts2_css_n">

          <!-- 图例开始 -->
          <!-- <i style="font-style: normal;display: block;height:40px;"></i> -->

          <i style="font-style: normal;display: block;height:40px; margin-bottom: 10px;">
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
          <div ref="chart" :style="canvas_css" @touchstart="canvas_qiehuan.canvas_toli_kg=true" @touchend="canvas_qiehuan.canvas_toli_kg=false"></div> 
          

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

        <section
          class="px10 py10"
          :style="
            sel_value.canvas_no==false||(sel_value.all_muri_value == 3 && sel_value.Range_set == 3)
              ? echarts2_css_n
              : echarts2_css_y
          "
        >
          <div
            class="section-title"
            style="padding-top: 10px; height: 20px; padding-bottom: 0px"
          >
            {{ sum_zhibiao.erji_text_wenzi }}
          </div>
          <div ref="chart2" :style="canvas_css2"></div>
        </section>
        <van-empty description="没有数据喔" v-if="sel_value.canvas_no==true&&(sel_value.all_muri_value == 3 && sel_value.Range_set == 3)" />

        <div style="clear: both;width: 100%;"></div>
      </div>
      <!-- 底部canvas结束 -->

      <div style="width: 100%; height: 50px">
        <!-- <van-notice-bar
          wrapable
          :scrollable="false"
          color="rgb(245, 245, 245)"
          background="rgb(245, 245, 245)"
          text=""
        /> -->
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

    <!-- 滑屏结束 -->

    </van-pull-refresh>
    <!-- 下拉结束 -->
  </div>
</template>




<script>
// import InProgress from '@/assets/svg/in-progress.svg';
// import Layout_name from '@/components/Layout.vue';
// import  Swiper from "swiper";
import bottom_css from "@/views/bottom-css/bottom-css.vue";

import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";
import "echarts/lib/component/legend";

import "echarts/lib/component/tooltip";
import { mapState } from "vuex";

var Range = "";

import {
  decimal2Percent,
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
  // PullRefresh, 

  // GoodsAction,
  // GoodsActionIcon,
  // GoodsActionButton
} from "vant";

export default {
  name: "Productmarket_con",

  components: {
    //   InProgress,
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
    [Empty.name]:Empty,
    [Loading.name]:Loading,
    [Picker.name]:Picker,
    [Icon.name]:Icon,
    // [PullRefresh.name]:PullRefresh 

    // [GoodsAction.name]:GoodsAction,
    // [GoodsActionIcon.name]:GoodsActionIcon,
    // [GoodsActionButton.name]:GoodsActionButton
    // test_name:Layout_name
    BottomCss:bottom_css
  },

  data() {
    return {

      activeNames_tips:['1'],

      swiperOptions: {
        // direction: "vertical", // 垂直切换选项
        loop: true, // 循环模式选项
        initialSlide: 1,
      },

      // count: 0,
      // isLoading: false,

      test_time_date:['2020年01月','2020年02月','2020年03月','2020年04月','2020年05月','2020年06月','2020年07月','2020年08月','2020年09月','2020年10月','2020年11月','2020年12月',],
      ym_default_index:"",
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2021, 11, 1),
      currentDate: new Date(),
      show: false,

      question_show: false,

      // 判断是否选年月
      change_time_on:false,
      // 判断是否选年月

      //新加的开始
      barData: {
        value: 0,
        ago_value: 0,
        month:0,
      },

      canvas_qiehuan: {

        canvas_toli_cssy:{
          "padding-top": '0px',
          "background-color": 'aliceblue' ,
          "padding-bottom": '0px',
          "margin-top": '10px'
        },
        canvas_toli_cssn:{
          "padding-top": '0px',
          "background-color": '#ffffff' ,
          "padding-bottom": '0px',
          "margin-top": '10px'
        },
        canvas_toli_kg:false,

        display_cssb:{
          display:"block",
          'padding-left': '10px'
        }, 
        display_cssn:{
          display:"none",
          'padding-left': '10px',
          'padding-top': '10px'

        }, 
        yes_css: {
          // background: "rgb(89, 178, 178)",
          // background: "rgb(22, 120, 255)",
          // background: "#159B80",
          background: "#23B0A8",
          
          color: "#ffffff",
        },
        no_css: {
          // background: "#E6E6E6",
          // background: "#CCCCCC",
          background: "rgb(247, 247, 247)",
          
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
        (new Date().getMonth() + 0 >= 1 && new Date().getMonth() + 0 <= 9
          ? "0" + (new Date().getMonth() + 0)
          : new Date().getMonth() + 0) +
        "-01",

      set_time_range: {
        start: "",
        end: "",
      },

      count: 0,
      isLoading: false,

      load_time: "",

      canvas_css: {
        width:'',
        // height: "250px",
        height: "200px",
      },
      canvas_css2: {
        width:'',
        // height: "252px",
        height: "230px",
      },
      hexinzhibiao:{
        width:'',
      },

      // click_css_set: { type: "info", color: "#1678FF" #159B80 },
      click_css_set: { type: "info", color: "#23B0A8" },
      click_css_no: { type: "default", color: "" },
      click_css_no_grey: { type: "default", color: "#CCCCCC" },
      // click_css_no_grey: { type: "default", color: "rgb(204, 204, 204)" },
      
      click_css_hxzb_y: {
        width: "32%",
        float: "left",
        color:"#000000",
        // "border-top": "2px solid rgba(89, 178, 178, 1)",
        // "background-color": "#1678FF", 
        // "background-color": "#1196EE",
        // "background-color": "#159B80", 
        // "background-color": "#23B0A8", 

        "border": "1px solid rgb(35, 176, 168)",
        "padding-bottom": "5px",
        "border-radius": "4px",
        "margin-right": "1.5%",
        "padding-left": "5px"
        
      },
      click_css_hxzb_n: {
        width: "32%",
        float: "left",
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
          "height": "21px",
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
        day_1: true,
        day_7: false,
        day_30: false,
        month: false,
        cpcy: true,
        ouk: false,
        muying: false,
        Range_set: "1",
        all_muri_value: "",
        canvas_yes: false,
        canvas_no: false,
        
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

      data: {
        "cpcy_overview-all_ouk_cpcy_kpi": "",
        "cpcy_overview-banmu_ouk_cpcy_kpi": "",
        "cpcy_overview-ruanti_ouk_cpcy_kpi": "",
        "cpcy_overview-all_ouk_cpcy_sec_class": "",
        "cpcy_overview-banmu_ouk_cpcy_sec_class": "",
        "cpcy_overview-ruanti_ouk_cpcy_sec_class": "",

        "cpcy_overview-all_ouk_cpcy_kpi_30": "",
        "cpcy_overview-all_ouk_cpcy_sec_class_30": "",
        "cpcy_overview-banmu_ouk_cpcy_kpi_30": "",
        "cpcy_overview-banmu_ouk_cpcy_sec_class_30": "",
        "cpcy_overview-ruanti_ouk_cpcy_kpi_30": "",
        "cpcy_overview-ruanti_ouk_cpcy_sec_class_30": "",
  
        "cpcy_overview-all_ouk_cpcy_kpi_7": "",
        "cpcy_overview-all_ouk_cpcy_sec_class_7": "",
        "cpcy_overview-banmu_ouk_cpcy_kpi_7": "",
        "cpcy_overview-banmu_ouk_cpcy_sec_class_7": "",
        "cpcy_overview-ruanti_ouk_cpcy_kpi_7": "",
        "cpcy_overview-ruanti_ouk_cpcy_sec_class_7": "",

        "cpcy_overview-all_ouk_cpcy_kpi_dtl_30": "",
        "cpcy_overview-banmu_ouk_cpcy_kpi_dtl_30": "",
        "cpcy_overview-ruanti_ouk_cpcy_kpi_dtl_30": "",
        "cpcy_overview-all_ouk_cpcy_kpi_dtl_7": "",
        "cpcy_overview-banmu_ouk_cpcy_kpi_dtl_7": "",
        "cpcy_overview-ruanti_ouk_cpcy_kpi_dtl_7": "",



        "ouk_qc-all_ouk_qc_rate": "",
        "ouk_qc-banmu_ouk_qc_rate": "",
        "ouk_qc-ruanti_ouk_qc_rate": "",
        "ouk_qc-all_ouk_catgy_qc_rate": "",
        "ouk_qc-banmu_ouk_catgy_qc_rate": "",
        "ouk_qc-ruant_ouk_catgy_qc_rate": "",


        "muying_overview-dlvred_sum_30": "",
        "muying_overview-pay_dtl_30": "",
        "muying_overview-pay_sum_30": "",
        "muying_overview-grs_dtl_30": "",
        "muying_overview-grs_sum_30": "",
        "muying_overview-catgy_dlvred_30": "",
        "muying_overview-catgy_pay_30": "",
        "muying_overview-dlvred_dtl_30": "",

        "muying_overview-dlvred_dtl_7": "",
        "muying_overview-dlvred_sum_7": "",
        "muying_overview-pay_dtl_7": "",
        "muying_overview-pay_sum_7": "",
        "muying_overview-grs_dtl_7": "",
        "muying_overview-grs_sum_7": "",
        "muying_overview-catgy_dlvred_7": "",
        "muying_overview-catgy_pay_7": "",

        "muying_overview-dlvred_kpi": "",
        "muying_overview-pay_kpi": "",
        "muying_overview-grs_kpi": "",
        "muying_overview-catgy_dlvred_m": "",
        "muying_overview-catgy_pay_m": "",
      },
      data_test: {},
      data_sum: {},
      data_loay:false,
    };
  },
  computed: {
    ...mapState("user", ["permissionList"]), //大概的意思是获取权限

    swiper() {
      return this.$refs.mySwiperaa.$swiper;
    },
  },

  created() {

      // this.echarts2_css_y.width=window.innerWidth-20+'px';
      // this.echarts2_css_n.width=window.innerWidth-20+'px';
      this.canvas_css.width=window.innerWidth-40+'px';
      this.canvas_css2.width=window.innerWidth-40+'px';
      this.hexinzhibiao.width=window.innerWidth-40+'px';
      console.log(window.innerWidth);

      this.time_update_now();
      

      // 做T+1处理开始
      // let year_now_time=new Date();
      let _time_now=new Date();
      _time_now=_time_now.getTime()-(24*60*60*1000);
      _time_now=new Date(_time_now);
      let time_t1_on= _time_now.getFullYear() +"-" +(_time_now.getMonth() + 1 >= 1 && _time_now.getMonth() + 1 <= 9? ("0" + (_time_now.getMonth() + 1)): (_time_now.getMonth() + 1)) +"-01"
      // 做T+1处理结束

      // 做M+1处理开始
        let month_m1=(new Date()).setMonth((new Date().getMonth()-1))//一个月
        month_m1=new Date(month_m1);
        // let year_now_m1 = (new Date(month_m1)).getFullYear();
        let time_m1_on=month_m1.getFullYear() +"-" +(month_m1.getMonth() + 1 >= 1 && month_m1.getMonth() + 1 <= 9? "0" + (month_m1.getMonth() + 1): month_m1.getMonth() + 1) +"-01"
      // 做M+1处理结束
      this.set_time=(this.sel_value.Range_set==3||this.sel_value.Range_set==3)?time_m1_on:time_t1_on;


      // console.log("=========================asdadadasd============");
      // console.log(time_t1_on);
      // console.log(this.set_time);





      
    this.$EventBus.$emit("data_loay_set", {
      data_loay_seton: false,
    });





    // const [p1, resolve1] = generatePromise();
    // this.p1 = p1;

    // const apiMap = {

    //   "SQL-cpcy_overview-all_ouk_cpcy_kpi": { resultProp: "ALL_OUK_CPCY_KPI" },
    //   // "SQL-cpcy_overview-banmu_ouk_cpcy_kpi": {resultProp: "BANMU_OUK_CPCY_KPI",},
    //   // "SQL-cpcy_overview-ruanti_ouk_cpcy_kpi": {resultProp: "RUANTI_OUK_CPCY_KPI",},
    //   // "SQL-cpcy_overview-all_ouk_cpcy_sec_class": {resultProp: "ALL_OUK_CPCY_SEC_CLASS",},
    //   // "SQL-cpcy_overview-banmu_ouk_cpcy_sec_class": {resultProp: "BANMU_OUK_CPCY_SEC_CLASS",},
    //   // "SQL-cpcy_overview-ruanti_ouk_cpcy_sec_class": {resultProp: "RUANTI_OUK_CPCY_SEC_CLASS",},
    //   // "SQL-cpcy_overview-all_ouk_cpcy_kpi_30": {resultProp: "ALL_OUK_CPCY_KPI_30",},
    //   // "SQL-cpcy_overview-all_ouk_cpcy_sec_class_30": {resultProp: "ALL_OUK_CPCY_SEC_CLASS_30",},
    //   // "SQL-cpcy_overview-banmu_ouk_cpcy_kpi_30": {resultProp: "BANMU_OUK_CPCY_KPI_30",},
    //   // "SQL-cpcy_overview-banmu_ouk_cpcy_sec_class_30": {resultProp: "BANMU_OUK_CPCY_SEC_CLASS_30",},
    //   // "SQL-cpcy_overview-ruanti_ouk_cpcy_kpi_30": {resultProp: "RUANTI_OUK_CPCY_KPI_30",},
    //   // "SQL-cpcy_overview-ruanti_ouk_cpcy_sec_class_30": {resultProp: "RUANTI_OUK_CPCY_SEC_CLASS_30",},
    //   // "SQL-cpcy_overview-all_ouk_cpcy_kpi_7": {resultProp: "ALL_OUK_CPCY_KPI_7",},
    //   // "SQL-cpcy_overview-all_ouk_cpcy_sec_class_7": {resultProp: "ALL_OUK_CPCY_SEC_CLASS_7",},
    //   // "SQL-cpcy_overview-banmu_ouk_cpcy_kpi_7": {resultProp: "BANMU_OUK_CPCY_KPI_7",},
    //   // "SQL-cpcy_overview-banmu_ouk_cpcy_sec_class_7": {resultProp: "BANMU_OUK_CPCY_SEC_CLASS_7",},
    //   // "SQL-cpcy_overview-ruanti_ouk_cpcy_kpi_7": {resultProp: "RUANTI_OUK_CPCY_KPI_7",},
    //   // "SQL-cpcy_overview-ruanti_ouk_cpcy_sec_class_7": {resultProp: "RUANTI_OUK_CPCY_SEC_CLASS_7",},
    //   // "SQL-cpcy_overview-all_ouk_cpcy_kpi_dtl_30": {resultProp: "ALL_OUK_CPCY_KPI_DTL_30",},
    //   // "SQL-cpcy_overview-banmu_ouk_cpcy_kpi_dtl_30": {resultProp: "BANMU_OUK_CPCY_KPI_DTL_30",},
    //   // "SQL-cpcy_overview-ruanti_ouk_cpcy_kpi_dtl_30": {resultProp: "RUANTI_OUK_CPCY_KPI_DTL_30",},
    //   // "SQL-cpcy_overview-all_ouk_cpcy_kpi_dtl_7": {resultProp: "ALL_OUK_CPCY_KPI_DTL_7",},
    //   // "SQL-cpcy_overview-banmu_ouk_cpcy_kpi_dtl_7": {resultProp: "BANMU_OUK_CPCY_KPI_DTL_7",},
    //   // "SQL-cpcy_overview-ruanti_ouk_cpcy_kpi_dtl_7": {resultProp: "RUANTI_OUK_CPCY_KPI_DTL_7",},




    //   "SQL-ouk_qc-all_ouk_qc_rate": { resultProp: "ALL_OUK_QC_RATE" },
    //   "SQL-ouk_qc-banmu_ouk_qc_rate": { resultProp: "BANMU_OUK_QC_RATE" },
    //   "SQL-ouk_qc-ruanti_ouk_qc_rate": { resultProp: "RUANTI_OUK_QC_RATE" },
    //   "SQL-ouk_qc-all_ouk_catgy_qc_rate": { resultProp: "ALL_OUK_CATGY_QC_RATE",},
    //   "SQL-ouk_qc-banmu_ouk_catgy_qc_rate": { resultProp: "BANMU_OUK_CATGY_QC_RATE",},
    //   // "SQL-ouk_qc-ruant_ouk_catgy_qc_rate": { resultProp: "RUANT_OUK_CATGY_QC_RATE", },
    //   "SQL-ouk_qc-ruant_ouk_catgy_qc_rate": { type: Array, resolve: resolve1 },



    //   // "SQL-muying_overview-dlvred_sum_30": { resultProp: "DLVRED_SUM_30" },
    //   // "SQL-muying_overview-pay_dtl_30": { resultProp: "PAY_DTL_30" },
    //   // "SQL-muying_overview-pay_sum_30": { resultProp: "PAY_SUM_30" },
    //   // "SQL-muying_overview-grs_dtl_30": { resultProp: "GRS_DTL_30" },
    //   // "SQL-muying_overview-grs_sum_30": { resultProp: "GRS_SUM_30" },

    //   // "SQL-muying_overview-catgy_dlvred_30": { resultProp: "CATGY_DLVRED_30" },
    //   // "SQL-muying_overview-catgy_pay_30": { resultProp: "CATGY_PAY_30" },
    //   // "SQL-muying_overview-dlvred_dtl_30": { resultProp: "DLVRED_DTL_30" },

    //   // "SQL-muying_overview-dlvred_dtl_7": { resultProp: "DLVRED_DTL_7" },
    //   // "SQL-muying_overview-dlvred_sum_7": { resultProp: "DLVRED_SUM_7" },
    //   // "SQL-muying_overview-pay_dtl_7": { resultProp: "PAY_DTL_7" },
    //   // "SQL-muying_overview-pay_sum_7": { resultProp: "PAY_SUM_7" },
    //   // "SQL-muying_overview-grs_dtl_7": { resultProp: "GRS_DTL_7" },
    //   // "SQL-muying_overview-grs_sum_7": { resultProp: "GRS_SUM_7" },
    //   // "SQL-muying_overview-catgy_dlvred_7": { resultProp: "CATGY_DLVRED_7" },
    //   // "SQL-muying_overview-catgy_pay_7": { resultProp: "CATGY_PAY_7" },

    //   // "SQL-muying_overview-dlvred_kpi": { resultProp: "DLVRED_KPI" },
    //   // "SQL-muying_overview-pay_kpi": { resultProp: "PAY_KPI" },
    //   // "SQL-muying_overview-grs_kpi": { resultProp: "GRS_KPI" },
    //   // "SQL-muying_overview-catgy_dlvred_m": { resultProp: "CATGY_DLVRED_M" },
    //   // "SQL-muying_overview-catgy_pay_m": { type: Array, resolve: resolve1 },
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
    //             this.data_loay=true;
    //             console.log("加载完成！！！！！！！！！！！！！！！");
    //             // console.log(this.data_loay);
    //             this.$EventBus.$emit("data_loay_set", {
    //               data_loay_seton: true,
    //             });

    //           }
    //         });
    //     }
    //   }
    // });


    const apiMap2 = {
      "SQL-cpcy_overview-all_ouk_cpcy_kpi": { resultProp: "ALL_OUK_CPCY_KPI" },

      "SQL-ouk_qc-all_ouk_qc_rate": { resultProp: "ALL_OUK_QC_RATE" },
      "SQL-ouk_qc-banmu_ouk_qc_rate": { resultProp: "BANMU_OUK_QC_RATE" },
      "SQL-ouk_qc-ruanti_ouk_qc_rate": { resultProp: "RUANTI_OUK_QC_RATE" },
      "SQL-ouk_qc-all_ouk_catgy_qc_rate": { resultProp: "ALL_OUK_CATGY_QC_RATE",},
      "SQL-ouk_qc-banmu_ouk_catgy_qc_rate": { resultProp: "BANMU_OUK_CATGY_QC_RATE",},
      "SQL-ouk_qc-ruant_ouk_catgy_qc_rate": { resultProp: "RUANT_OUK_CATGY_QC_RATE", },
      // "SQL-ouk_qc-ruant_ouk_catgy_qc_rate": { type: Array, resolve: resolve1 },

    };


    this.ajax_data(apiMap2);






    console.log(decimal2Percent);
    console.log(calcSignClass);
  },


// 新加的开始
  watch:{

    "$store.state.app.ProductMarket.type": {
      handler(val) {
        // console.log(val);
        // console.log("运行到这里！！！");
        if(val*1==2){
          this.Range_Single_choice(val + "");
          this.$store.commit("app/setProductMarket", 0); //参考的   
        }
        
      },
    },

  },
  // 新加的结束

  mounted() {
    // 新加的开始
    this.Single_canvas("1");
    // 新加的结束


    // console.log(this.$refs);
  
    this.Range_Single_choice("2");

    if (Range == 1) {
      this.Single_choice("3");
    }

    // this.initChart();
    // this.initChart2();
    this.all_muban_ruanti("1");


    // 成功的结束
    // let _this = this;
    // this.$EventBus.$on("Range_Single_choice_f", (Range_value_set) => {
    //   // console.log("====222====");
    //   // console.log(Range_value_set);
    //   _this.Range_Single_choice(Range_value_set.Range_value_set + "");
    // });
    // 成功的开始

    // Information_log('产品市场','产品市场:  '+'数据加载完成');




  },
  methods: {

    time_update_now(){

      // console.log("as============ad");
      let year_now_time=new Date();
      // 做T+1处理开始
      // let _time_now=new Date();
      year_now_time=year_now_time.getTime()-(24*60*60*1000);
      year_now_time=new Date(year_now_time);

      let month_m1=(new Date()).setMonth((new Date().getMonth()-1))//一个月
      year_now_time=(this.sel_value.Range_set==1||this.sel_value.Range_set==2)? (new Date(month_m1)):year_now_time;

      // 做T+1处理结束

      // console.log(this.sel_value.Range_set);


      //   // 做M+1处理开始
      //   let month_m1=(new Date()).setMonth((new Date().getMonth()-1))//一个月
      //   month_m1=new Date(month_m1);
      //   // let year_now_m1 = (new Date(month_m1)).getFullYear();
      //   let time_m1_on=month_m1.getFullYear() +"-" +(month_m1.getMonth() + 1 >= 1 && month_m1.getMonth() + 1 <= 9? "0" + (month_m1.getMonth() + 1): month_m1.getMonth() + 1) +"-01"
      // // 做M+1处理结束
      // this.set_time=(this.sel_value.Range_set==1||this.sel_value.Range_set==2)?time_m1_on:time_t1_on;



      let month = year_now_time.getMonth() + 1; //月
      year_now_time=year_now_time.getFullYear();
      let now_time_set=(year_now_time+'年'+(month<10?'0'+month:month)+'月');
      
      let year_month_arr=[];

      // console.log(now_time_set);


      // year_now_time=year_now_time-1;
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

      // console.log(year_month_arr);
      
      // console.log(year_now_time);
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


      this.change_time_on=true;
      if (this.sel_value.all_muri_value == 3 && this.sel_value.Range_set == 3) {
        this.initChart();
        this.set_target_on();
        this.Single_choice("4");
      } else {
        this.initChart();
        this.initChart2();
        this.set_target_on();
        this.Single_choice("4");
      }

    },

    onChange(picker, value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
      // console.log("呵呵呵呵呵额呵呵呵呵")
    },
    onCancel() {
      console.log('取消');
      this.show = false;
    },


    showPopup() {
      this.show = true;
    },


    onRefresh() {
        // setTimeout(() => {
        //   // Toast('刷新成功');
        //   this.isLoading = false;
        //   this.count++;
        // }, 1000);
      this.$EventBus.$emit("data_loay_set", {
        data_loay_seton: false,
      });
      let apiMap3 = {
        "SQL-cpcy_overview-all_ouk_cpcy_kpi": { resultProp: "ALL_OUK_CPCY_KPI" },
        "SQL-ouk_qc-all_ouk_qc_rate": { resultProp: "ALL_OUK_QC_RATE" },
        "SQL-ouk_qc-banmu_ouk_qc_rate": { resultProp: "BANMU_OUK_QC_RATE" },
        "SQL-ouk_qc-ruanti_ouk_qc_rate": { resultProp: "RUANTI_OUK_QC_RATE" },
        "SQL-ouk_qc-all_ouk_catgy_qc_rate": { resultProp: "ALL_OUK_CATGY_QC_RATE",},
        "SQL-ouk_qc-banmu_ouk_catgy_qc_rate": { resultProp: "BANMU_OUK_CATGY_QC_RATE",},
        "SQL-ouk_qc-ruant_ouk_catgy_qc_rate": { resultProp: "RUANT_OUK_CATGY_QC_RATE", },

      };
      this.ajax_data(apiMap3);
      this.p1.then(() => {
        this.isLoading = false;
        // 新加的开始
        this.Single_canvas("1");
        // 新加的结束
        this.Range_Single_choice("2");
        this.all_muban_ruanti("1");
      });

    },


    showPopup_sm(){
      this.question_show=true;
    },    
    showPopup_close(){
      this.activeNames_tips=[];
    },

    formatter(type, val) {
      // console.log("=======事件日期格式！==========");
      // console.log(type);
      // console.log(val);

      if (type === "year") {
        return `${val}年`;
      }else if (type === "month") {
        return `${val}月`;
      }



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

      if (this.sel_value.all_muri_value == 3 && this.sel_value.Range_set == 3) {
        this.initChart();
        this.set_target_on();
        this.Single_choice("4");
      } else {
        this.initChart();
        this.initChart2();
        this.set_target_on();
        this.Single_choice("4");
      }
    },

    time_cancel() {
      this.show = false;
    },
    rTime(date) {
      date = new Date(date);
      let year = date.getFullYear(); //年
      let month = date.getMonth() + 1; //月
      let day = date.getDate(); //日
      let hour = date.getHours(); //时
      let minute = date.getMinutes(); //分
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
      return `${year}-${month}-${day} ${hour}:${minute}`;
    },

    Range_Single_choice(Range_value) {
      this.sel_value.cpcy = false;
      this.sel_value.ouk = false;
      this.sel_value.muying = false;

      switch (Range_value) {
        case "1":
          this.sel_value.cpcy = true;
          // console.log(this.data);
          Range = 1;
          this.sel_title.chanzhi_wenzi.title_all = "总产值";
          this.sel_title.chanzhi_wenzi.title_muban = "板木产值";
          this.sel_title.chanzhi_wenzi.title_ruanti = "软体产值";
          this.sel_title.chanzhi_wenzi.target = "目标";
          this.sel_title.chanzhi_wenzi.reach_rate = "达成";
          this.sel_title.chanzhi_wenzi.ago_rate = "同比";
          this.sum_zhibiao.erji_text_wenzi = "二级类目产值";

          this.sel_value.Range_set = Range;
          this.$store.commit("app/setProductMarket", 1); //参考的
          this.time_update_now();

          Information_log('产品市场-产值概览','产品市场-产值概览:  '+'数据加载完成');

          break;
        case "2":
          this.sel_value.ouk = true;
          Range = 2;
          this.sel_title.chanzhi_wenzi.title_all = "售后率";
          this.sel_title.chanzhi_wenzi.title_muban = "板木售后率";
          this.sel_title.chanzhi_wenzi.title_ruanti = "软体售后率";
          this.sel_title.chanzhi_wenzi.target = "标杆";
          // this.sel_title.chanzhi_wenzi.reach_rate = "差额";
          this.sel_title.chanzhi_wenzi.reach_rate = "标杆";
          this.sel_title.chanzhi_wenzi.ago_rate = "同比";
          this.sum_zhibiao.erji_text_wenzi = "考核分类不良率";

          this.sel_value.Range_set = Range;
          this.$store.commit("app/setProductMarket", 2); //参考的
          this.time_update_now();

          Information_log('产品市场-欧康产品','产品市场-欧康产品:  '+'数据加载完成');

          break;
        case "3":
          this.sel_value.muying = true;
          Range = 3;
          this.sel_title.chanzhi_wenzi.title_all = "支付业绩";
          this.sel_title.chanzhi_wenzi.title_muban = "发货业绩";
          this.sel_title.chanzhi_wenzi.title_ruanti = "毛利率";
          this.sel_title.chanzhi_wenzi.target = "目标";
          this.sel_title.chanzhi_wenzi.reach_rate = "达成";
          this.sel_title.chanzhi_wenzi.ago_rate = "同比";
          this.sum_zhibiao.erji_text_wenzi = "叶子类目TOP10";

          this.sel_value.Range_set = Range;
          this.$store.commit("app/setProductMarket", 3); //参考的
          this.time_update_now();

          Information_log('产品市场-母婴概览','产品市场-母婴概览:  '+'数据加载完成');

          break;
        default:
          Range = 1;
          this.$store.commit("app/setProductMarket", 1); //参考的
          this.sel_value.cpcy = true;
          this.time_update_now();
          Information_log('产品市场-产值概览','产品市场-产值概览:  '+'数据加载完成');
      }

      // this.Single_choice('1');
      this.initChart();
      this.initChart2();
      this.set_target_on();

      if(Range_value=="3"){
        this.Single_choice("2");
      }else if(Range_value=="1"){
        this.Single_choice("3");
      }else{
        this.Single_choice("4");
      }


      this.all_muban_ruanti("1");
    },

    Single_choice(value) {
      this.sel_value.day_1 = false;
      this.sel_value.day_7 = false;
      this.sel_value.day_30 = false;
      this.sel_value.month = false;

      switch (value) {
        case "1":
          this.sel_value.day_1 = true;
          // console.log(this.data);
          break;
        case "2":
          // ||this.sel_value.Range_set == 1
          if(this.sel_value.Range_set == 3){
            this.sel_value.day_7 = true;
            if (
              this.sel_value.all_muri_value == 3 &&
              this.sel_value.Range_set == 3
            ) {
              this.initChart();
              this.set_target_on();
            } else {
              this.initChart();
              this.initChart2();
              this.set_target_on();
            }
          }else{

            // console.log("==============运行到2主题这里来了！！！！！============")
            // console.log()

            this.sel_value.month = true;
          }

          break;
        case "3":
          // ||this.sel_value.Range_set == 1
          if(this.sel_value.Range_set == 3){
            this.sel_value.day_30 = true;
            if (
              this.sel_value.all_muri_value == 3 &&
              this.sel_value.Range_set == 3
            ) {
              this.initChart();
              this.set_target_on();
            } else {
              this.initChart();
              this.initChart2();
              this.set_target_on();
            }

          }else{
            this.sel_value.month = true;
          }

          break;
        case "4":
          this.sel_value.month = true;

            console.log("==============运行到2主题这里来了！！！！！============")
            // console.log()


          break;
        default:
          this.sel_value.day_1 = true;
      }
      // console.log(value);
      // console.log(this.sel_value);
      // console.log(this.data);
    },

    Single_canvas(value) {
      this.sel_value.canvas_yes = false;
      this.sel_value.canvas_no = false;

      switch (value) {
        case "1":
          this.sel_value.canvas_yes = true;
          break;
        case "2":
          this.sel_value.canvas_no = true;
          break;
      }

      // console.log("===================")
      // console.log(this.$refs.canvas_w_h.clientWidth) ;   


      this.initChart();
      this.initChart2();
    },

    all_muban_ruanti(send_value) {
      this.sel_value.all_muri_value = send_value;
      this.$EventBus.$emit("all_muban_ruanti_f", {
        send_value: send_value,
        Range_set: this.sel_value.Range_set,
      });

      // console.log("yunasdadad======");
      // console.log(this.sel_value.all_muri_value);
      if (this.sel_value.all_muri_value == 3 && this.sel_value.Range_set == 3) {
        this.initChart();
      } else {
        this.initChart();
        this.initChart2();
      }
    },

    data_handle(send_data) {
      // this.data_test={};

      // console.log(this.data);   
      // console.log(Range);

      let data_handle_set = {};
      let data_handle_set_one = {};
      let data_handle_set_two = {};

      Object.keys(send_data).forEach((key_set) => {
        // console.log(key_set);
        // console.log(this.data[key_set])

        if (
          Range == 1 &&
          (key_set == "cpcy_overview-all_ouk_cpcy_kpi" ||
            key_set == "cpcy_overview-banmu_ouk_cpcy_kpi" ||
            key_set == "cpcy_overview-ruanti_ouk_cpcy_kpi" ||
            key_set == "cpcy_overview-all_ouk_cpcy_sec_class" ||
            key_set == "cpcy_overview-banmu_ouk_cpcy_sec_class" ||
            key_set == "cpcy_overview-ruanti_ouk_cpcy_sec_class"||

            // 新加的 2020-11-07
            key_set == "cpcy_overview-all_ouk_cpcy_kpi_30"||
            key_set == "cpcy_overview-all_ouk_cpcy_sec_class_30"||
            key_set == "cpcy_overview-banmu_ouk_cpcy_kpi_30"||
            key_set == "cpcy_overview-banmu_ouk_cpcy_sec_class_30"||
            key_set == "cpcy_overview-ruanti_ouk_cpcy_kpi_30"||
            key_set == "cpcy_overview-ruanti_ouk_cpcy_sec_class_30"||

            key_set == "cpcy_overview-all_ouk_cpcy_kpi_7"||
            key_set == "cpcy_overview-all_ouk_cpcy_sec_class_7"||
            key_set == "cpcy_overview-banmu_ouk_cpcy_kpi_7"||
            key_set == "cpcy_overview-banmu_ouk_cpcy_sec_class_7"||
            key_set == "cpcy_overview-ruanti_ouk_cpcy_kpi_7"||
            key_set == "cpcy_overview-ruanti_ouk_cpcy_sec_class_7"||

            key_set == "cpcy_overview-all_ouk_cpcy_kpi_dtl_30"||
            key_set == "cpcy_overview-banmu_ouk_cpcy_kpi_dtl_30"||
            key_set == "cpcy_overview-ruanti_ouk_cpcy_kpi_dtl_30"||
            key_set == "cpcy_overview-all_ouk_cpcy_kpi_dtl_7"||
            key_set == "cpcy_overview-banmu_ouk_cpcy_kpi_dtl_7"||
            key_set == "cpcy_overview-ruanti_ouk_cpcy_kpi_dtl_7"
          )
          
        ) {

          Object.keys(send_data[key_set]).forEach((key_set_tim) => {

            if(
              key_set == "cpcy_overview-all_ouk_cpcy_kpi_dtl_30"||
              key_set == "cpcy_overview-banmu_ouk_cpcy_kpi_dtl_30"||
              key_set == "cpcy_overview-ruanti_ouk_cpcy_kpi_dtl_30"||
              key_set == "cpcy_overview-all_ouk_cpcy_kpi_dtl_7"||
              key_set == "cpcy_overview-banmu_ouk_cpcy_kpi_dtl_7"||
              key_set == "cpcy_overview-ruanti_ouk_cpcy_kpi_dtl_7"
            ){

              send_data[key_set][key_set_tim].TDATE = send_data[key_set][
                key_set_tim
              ].TDATE.substring(0, 10);
              send_data[key_set][key_set_tim].MDATE_SET =
                send_data[key_set][key_set_tim].TDATE.substring(5, 7) * 1 +
                "月";
              send_data[key_set][key_set_tim].YEAR_SET =
                send_data[key_set][key_set_tim].TDATE.substring(0, 4) * 1 +
                "年";

            }else if(
              key_set == "cpcy_overview-all_ouk_cpcy_kpi" ||
              key_set == "cpcy_overview-banmu_ouk_cpcy_kpi" ||
              key_set == "cpcy_overview-ruanti_ouk_cpcy_kpi" ||
              key_set == "cpcy_overview-all_ouk_cpcy_sec_class" ||
              key_set == "cpcy_overview-banmu_ouk_cpcy_sec_class" ||
              key_set == "cpcy_overview-ruanti_ouk_cpcy_sec_class"
            ){

              send_data[key_set][key_set_tim].MDATE = send_data[key_set][key_set_tim].MDATE.substring(0, 10);
              send_data[key_set][key_set_tim].MDATE_SET =
                send_data[key_set][key_set_tim].MDATE.substring(5, 7) * 1 + "月";
              send_data[key_set][key_set_tim].YEAR_SET =
                send_data[key_set][key_set_tim].MDATE.substring(0, 4) * 1 + "年";

            }

          });

          data_handle_set[key_set] = send_data[key_set];
        } else if (
          Range == 2 &&
          (key_set == "ouk_qc-all_ouk_qc_rate" ||
            key_set == "ouk_qc-banmu_ouk_qc_rate" ||
            key_set == "ouk_qc-ruanti_ouk_qc_rate" ||
            key_set == "ouk_qc-all_ouk_catgy_qc_rate" ||
            key_set == "ouk_qc-banmu_ouk_catgy_qc_rate" ||
            key_set == "ouk_qc-ruant_ouk_catgy_qc_rate")
        ) {
          Object.keys(send_data[key_set]).forEach((key_set_tim) => {
            // console.log((this.data[key_set][key_set_tim].MDATE).substring(0,10));
            // console.log((this.data[key_set][key_set_tim].MDATE).substring(5,7)*1+'月');
            send_data[key_set][key_set_tim].MDATE = send_data[key_set][
              key_set_tim
            ].MDATE.substring(0, 10);
            send_data[key_set][key_set_tim].MDATE_SET =
              send_data[key_set][key_set_tim].MDATE.substring(5, 7) * 1 + "月";
            send_data[key_set][key_set_tim].YEAR_SET =
              send_data[key_set][key_set_tim].MDATE.substring(0, 4) * 1 + "年";
          });
          data_handle_set[key_set] = send_data[key_set];
        } else if (
          Range == 3 &&
          (key_set == "muying_overview-dlvred_kpi" ||
            key_set == "muying_overview-pay_kpi" ||
            key_set == "muying_overview-grs_kpi" ||
            key_set == "muying_overview-catgy_dlvred_m" ||
            key_set == "muying_overview-catgy_pay_m" ||
            key_set == "muying_overview-catgy_pay_7" ||
            key_set == "muying_overview-catgy_dlvred_7" ||
            key_set == "muying_overview-grs_sum_7" ||
            key_set == "muying_overview-grs_dtl_7" ||
            key_set == "muying_overview-pay_sum_7" ||
            key_set == "muying_overview-pay_dtl_7" ||
            key_set == "muying_overview-dlvred_sum_7" ||
            key_set == "muying_overview-dlvred_dtl_7" ||
            key_set == "muying_overview-dlvred_dtl_30" ||
            key_set == "muying_overview-dlvred_sum_30" ||
            key_set == "muying_overview-pay_dtl_30" ||
            key_set == "muying_overview-pay_sum_30" ||
            key_set == "muying_overview-grs_dtl_30" ||
            key_set == "muying_overview-grs_sum_30" ||
            key_set == "muying_overview-catgy_dlvred_30" ||
            key_set == "muying_overview-catgy_pay_30")
        ) {
          Object.keys(send_data[key_set]).forEach((key_set_tim) => {
            // console.log((this.data[key_set][key_set_tim].MDATE).substring(0,10));
            // console.log((this.data[key_set][key_set_tim].MDATE).substring(5,7)*1+'月');
            if (
              key_set == "muying_overview-dlvred_dtl_30" ||
              key_set == "muying_overview-pay_dtl_30" ||
              key_set == "muying_overview-grs_dtl_30" ||
              key_set == "muying_overview-dlvred_dtl_7" ||
              key_set == "muying_overview-pay_dtl_7" ||
              key_set == "muying_overview-grs_dtl_7"
            ) {
              send_data[key_set][key_set_tim].TDATE = send_data[key_set][
                key_set_tim
              ].TDATE.substring(0, 10);
              send_data[key_set][key_set_tim].MDATE_SET =
                send_data[key_set][key_set_tim].TDATE.substring(5, 7) * 1 +
                "月";
              send_data[key_set][key_set_tim].YEAR_SET =
                send_data[key_set][key_set_tim].TDATE.substring(0, 4) * 1 +
                "年";
            } else if (
              key_set == "muying_overview-dlvred_kpi" ||
              key_set == "muying_overview-pay_kpi" ||
              key_set == "muying_overview-grs_kpi" ||
              key_set == "muying_overview-catgy_dlvred_m" ||
              key_set == "muying_overview-catgy_pay_m"
            ) {
              send_data[key_set][key_set_tim].MDATE = send_data[key_set][
                key_set_tim
              ].MDATE.substring(0, 10);
              send_data[key_set][key_set_tim].MDATE_SET =
                send_data[key_set][key_set_tim].MDATE.substring(5, 7) * 1 +
                "月";
              send_data[key_set][key_set_tim].YEAR_SET =
                send_data[key_set][key_set_tim].MDATE.substring(0, 4) * 1 +
                "年";
            }
          });
          data_handle_set[key_set] = send_data[key_set];
        }
      });

      //月份的开始 day_30
      Object.keys(data_handle_set).forEach((key_set_dan) => {
        // console.log(key_set_dan);
        if (this.sel_value.all_muri_value == 1) {
          if (
            this.sel_value.day_7 == true &&
            (key_set_dan == "muying_overview-pay_dtl_7"||
             key_set_dan == "cpcy_overview-all_ouk_cpcy_kpi_dtl_7"
            )
          ) {
            // console.log(" 7day");
            data_handle_set_one = data_handle_set[key_set_dan];
          } else if (
            this.sel_value.day_30 == true &&
            (key_set_dan == "muying_overview-pay_dtl_30"||
            key_set_dan == "cpcy_overview-all_ouk_cpcy_kpi_dtl_30")

          ) {
            // console.log(" 30day");
            data_handle_set_one = data_handle_set[key_set_dan];
          } else if (
            this.sel_value.day_7 == false &&
            this.sel_value.day_30 == false &&
            (key_set_dan == "cpcy_overview-all_ouk_cpcy_kpi" ||
              key_set_dan == "ouk_qc-all_ouk_qc_rate" ||
              key_set_dan == "muying_overview-pay_kpi")
          ) {
            // console.log(" month");
            data_handle_set_one = data_handle_set[key_set_dan];
          }
        } else if (this.sel_value.all_muri_value == 2) {
          if (
            this.sel_value.day_7 == true &&
            (key_set_dan == "muying_overview-dlvred_dtl_7"||
            key_set_dan == "cpcy_overview-banmu_ouk_cpcy_kpi_dtl_7")
          ) {
            data_handle_set_one = data_handle_set[key_set_dan];
          } else if (
            this.sel_value.day_30 == true &&
            (key_set_dan == "muying_overview-dlvred_dtl_30"||
            key_set_dan == "cpcy_overview-banmu_ouk_cpcy_kpi_dtl_30")
          ) {
            data_handle_set_one = data_handle_set[key_set_dan];
          } else if (
            this.sel_value.day_7 == false &&
            this.sel_value.day_30 == false &&
            (key_set_dan == "cpcy_overview-banmu_ouk_cpcy_kpi" ||
              key_set_dan == "ouk_qc-banmu_ouk_qc_rate" ||
              key_set_dan == "muying_overview-dlvred_kpi")
          ) {
            data_handle_set_one = data_handle_set[key_set_dan];
          }
        } else if (this.sel_value.all_muri_value == 3) {
          if (
            this.sel_value.day_7 == true &&
            (key_set_dan == "muying_overview-grs_dtl_7"||
            key_set_dan == "cpcy_overview-ruanti_ouk_cpcy_kpi_dtl_7")
          ) {
            data_handle_set_one = data_handle_set[key_set_dan];
          } else if (
            this.sel_value.day_30 == true &&
            (key_set_dan == "muying_overview-grs_dtl_30"||
            key_set_dan == "cpcy_overview-ruanti_ouk_cpcy_kpi_dtl_30")
          ) {
            data_handle_set_one = data_handle_set[key_set_dan];
          } else if (
            this.sel_value.day_7 == false &&
            this.sel_value.day_30 == false &&
            (key_set_dan == "cpcy_overview-ruanti_ouk_cpcy_kpi" ||
              key_set_dan == "ouk_qc-ruanti_ouk_qc_rate" ||
              key_set_dan == "muying_overview-grs_kpi")
          ) {
            data_handle_set_one = data_handle_set[key_set_dan];
          }
        }
      });
      //月份的结束

      //二级类目的开始
      Object.keys(data_handle_set).forEach((key_set_two) => {
        // console.log(key_set_dan);
        if (this.sel_value.all_muri_value == 1) {
          if (
            this.sel_value.day_7 == true &&
            (key_set_two == "muying_overview-catgy_pay_7"||
             key_set_two == "cpcy_overview-all_ouk_cpcy_sec_class_7")
          ) {
            data_handle_set_two = data_handle_set[key_set_two];
          } else if (
            this.sel_value.day_30 == true &&
            (key_set_two == "muying_overview-catgy_pay_30"||
            key_set_two == "cpcy_overview-all_ouk_cpcy_sec_class_30")
          ) {
            data_handle_set_two = data_handle_set[key_set_two];
          } else if (
            this.sel_value.day_7 == false &&
            this.sel_value.day_30 == false &&
            (key_set_two == "cpcy_overview-all_ouk_cpcy_sec_class" ||
              key_set_two == "ouk_qc-all_ouk_catgy_qc_rate" ||
              key_set_two == "muying_overview-catgy_pay_m")
          ) {
            data_handle_set_two = data_handle_set[key_set_two];
          }
        } else if (this.sel_value.all_muri_value == 2) {
          if (
            this.sel_value.day_7 == true &&
            (key_set_two == "muying_overview-catgy_dlvred_7"||
             key_set_two == "cpcy_overview-banmu_ouk_cpcy_sec_class_7")

          ) {
            data_handle_set_two = data_handle_set[key_set_two];
          } else if (
            this.sel_value.day_30 == true &&
            (key_set_two == "muying_overview-catgy_dlvred_30"||
            key_set_two == "cpcy_overview-banmu_ouk_cpcy_sec_class_30")
          ) {
            data_handle_set_two = data_handle_set[key_set_two];
          } else if (
            this.sel_value.day_7 == false &&
            this.sel_value.day_30 == false &&
            (key_set_two == "cpcy_overview-banmu_ouk_cpcy_sec_class" ||
              key_set_two == "ouk_qc-banmu_ouk_catgy_qc_rate" ||
              key_set_two == "muying_overview-catgy_dlvred_m")
          ) {
            data_handle_set_two = data_handle_set[key_set_two];
          }
        } else if (this.sel_value.all_muri_value == 3) {

          if(this.sel_value.day_7 == true&&key_set_two == "cpcy_overview-ruanti_ouk_cpcy_sec_class_7" ){
            data_handle_set_two = data_handle_set[key_set_two];

          }else if(this.sel_value.day_30 == true&&key_set_two == "cpcy_overview-ruanti_ouk_cpcy_sec_class_30"){
            data_handle_set_two = data_handle_set[key_set_two];

          }else if(this.sel_value.day_7 == false &&
                  this.sel_value.day_30 == false &&
          (key_set_two == "cpcy_overview-ruanti_ouk_cpcy_sec_class" ||key_set_two == "ouk_qc-ruant_ouk_catgy_qc_rate")){
            data_handle_set_two = data_handle_set[key_set_two];
          }

          
        }
      });
      //二级类目的结束

      return {
        data_handle_set_one_set: data_handle_set_one,
        data_handle_set_two_set: data_handle_set_two,
        data_handle_set_on: data_handle_set,
      };
    },

    set_target_on() {
      this.p1.then(() => {

        try{


          //   let asdada=this.data["cpcy_overview-all_ouk_cpcy_kpi"][0]["LOAD_TIME"];
          // this.load_time = this.rTime(
          //   this.data["cpcy_overview-all_ouk_cpcy_kpi"][0]["LOAD_TIME"]
          // );
          this.load_time = (this.rTime(this.data["cpcy_overview-all_ouk_cpcy_kpi"][0]["LOAD_TIME"])).substring(0,4)+'.'
          +(this.rTime(this.data["cpcy_overview-all_ouk_cpcy_kpi"][0]["LOAD_TIME"])).substring(5,7)+'.'
          +(this.rTime(this.data["cpcy_overview-all_ouk_cpcy_kpi"][0]["LOAD_TIME"])).substring(8,10);


          let data_use = this.data_handle(this.data);
          data_use = data_use.data_handle_set_on;


          let all_vue = false;
          let banmu_vue = false;
          let ruanti_vue = false;

          let data_use_allval = "";
          let data_use_banmu = "";
          let data_use_ruanti = "";

          switch (this.sel_value.Range_set) {
            case 1:
              if(this.sel_value.day_7 == false &&this.sel_value.day_30 == false){
                data_use_allval = data_use["cpcy_overview-all_ouk_cpcy_kpi"];
                data_use_banmu = data_use["cpcy_overview-banmu_ouk_cpcy_kpi"];
                data_use_ruanti = data_use["cpcy_overview-ruanti_ouk_cpcy_kpi"];
              }else if(this.sel_value.day_7 == true){

                data_use["cpcy_overview-all_ouk_cpcy_kpi_7"][0].AMT=data_use["cpcy_overview-all_ouk_cpcy_kpi_7"][0].VALUE;
                data_use_allval = data_use["cpcy_overview-all_ouk_cpcy_kpi_7"];
                data_use["cpcy_overview-banmu_ouk_cpcy_kpi_7"][0].AMT=data_use["cpcy_overview-banmu_ouk_cpcy_kpi_7"][0].VALUE;
                data_use_banmu = data_use["cpcy_overview-banmu_ouk_cpcy_kpi_7"];
                data_use["cpcy_overview-ruanti_ouk_cpcy_kpi_7"][0].AMT=data_use["cpcy_overview-ruanti_ouk_cpcy_kpi_7"][0].VALUE;
                data_use_ruanti = data_use["cpcy_overview-ruanti_ouk_cpcy_kpi_7"];

              }else if(this.sel_value.day_30 == true){

                data_use["cpcy_overview-all_ouk_cpcy_kpi_30"][0].AMT=data_use["cpcy_overview-all_ouk_cpcy_kpi_30"][0].VALUE;
                data_use_allval = data_use["cpcy_overview-all_ouk_cpcy_kpi_30"];
                data_use["cpcy_overview-banmu_ouk_cpcy_kpi_30"][0].AMT=data_use["cpcy_overview-banmu_ouk_cpcy_kpi_30"][0].VALUE;
                data_use_banmu = data_use["cpcy_overview-banmu_ouk_cpcy_kpi_30"];
                data_use["cpcy_overview-ruanti_ouk_cpcy_kpi_30"][0].AMT=data_use["cpcy_overview-ruanti_ouk_cpcy_kpi_30"][0].VALUE;
                data_use_ruanti = data_use["cpcy_overview-ruanti_ouk_cpcy_kpi_30"];


              }

              break;
            case 2:
              data_use_allval = data_use["ouk_qc-all_ouk_qc_rate"];
              data_use_banmu = data_use["ouk_qc-banmu_ouk_qc_rate"];
              data_use_ruanti = data_use["ouk_qc-ruanti_ouk_qc_rate"];
              break;
            case 3:
              if (
                this.sel_value.day_7 == false &&
                this.sel_value.day_30 == false
              ) {
                data_use_allval = data_use["muying_overview-pay_kpi"];
                data_use_banmu = data_use["muying_overview-dlvred_kpi"];
                data_use_ruanti = data_use["muying_overview-grs_kpi"];
              } else if (this.sel_value.day_7 == true) {
                data_use_allval = data_use["muying_overview-pay_sum_7"];
                data_use_banmu = data_use["muying_overview-dlvred_sum_7"];
                data_use_ruanti = data_use["muying_overview-grs_sum_7"];
              } else if (this.sel_value.day_30 == true) {
                data_use_allval = data_use["muying_overview-pay_sum_30"];
                data_use_banmu = data_use["muying_overview-dlvred_sum_30"];
                data_use_ruanti = data_use["muying_overview-grs_sum_30"];
              }

              break;
            // default :
          }
          // this.sel_value.day_7==false&&this.sel_value.day_30==false


          // console.log(data_use_ruanti);
          // console.log("======运行到核心指标这里！===========");
          // console.log(this.set_time);

          Object.keys(data_use_allval).forEach((key) => {
            if (
              this.sel_value.day_7 == false &&
              this.sel_value.day_30 == false &&
              data_use_allval[key].MDATE == this.set_time
            ) {
              // month_yong.push(data_use[key].SEC_CLASS);

              switch (this.sel_value.Range_set) {
                case 1:
                  this.set_target_data.all_valeu.ago_rate =
                    (data_use_allval[key].AGO_RATE * 100).toFixed(1) + "%";
                  this.set_target_data.all_valeu.reach_rate =
                    (data_use_allval[key].REACH_RATE * 100).toFixed(1) + "%";
                  this.set_target_data.all_valeu.target =
                    (data_use_allval[key].TARGET / 10000).toFixed(0) + "万";
                  this.set_target_data.all_valeu.value =
                    (data_use_allval[key].VALUE / 10000).toFixed(1) + "万";

    
                  break;
                case 2:
                  this.set_target_data.all_valeu.ago_rate =
                    (data_use_allval[key].AGO_RATE * 100).toFixed(1) + "%";
                  // this.set_target_data.all_valeu.reach_rate = data_use_allval[
                  //   key
                  // ].REACH_RATE.toFixed(1);
                  this.set_target_data.all_valeu.reach_rate = '- -'
                  this.set_target_data.all_valeu.target = data_use_allval[
                    key
                  ].TARGET.toFixed(0);
                  this.set_target_data.all_valeu.value =
                    (data_use_allval[key].RATE * 100).toFixed(2) + "%";
                  break;
                case 3:
                  this.set_target_data.all_valeu.ago_rate =
                    (data_use_allval[key].AGO_RATE * 100).toFixed(1) + "%"; //增幅
                  this.set_target_data.all_valeu.reach_rate =
                    (data_use_allval[key].REACH_RATE * 100).toFixed(1) + "%"; //达成率
                  this.set_target_data.all_valeu.target = data_use_allval[
                    key
                  ].TARGET.toFixed(0); //目标
                  this.set_target_data.all_valeu.value =
                    (data_use_allval[key].AMT / 10000).toFixed(1) + "万"; //值
                  break;
              }

              all_vue = true;



            } else if (
              this.sel_value.day_7 == true ||
              this.sel_value.day_30 == true
            ) {
              this.set_target_data.all_valeu.ago_rate =
                (data_use_allval[key].AGO_RATE * 100).toFixed(1) + "%"; //增幅
              this.set_target_data.all_valeu.reach_rate =((data_use_allval[key].REACH_RATE * 100))? ((data_use_allval[key].REACH_RATE * 100)).toFixed(1) + "%":'- -'; //达成率
              this.set_target_data.all_valeu.target = (data_use_allval[key].TARGET||0).toFixed(0); //目标
              this.set_target_data.all_valeu.value =
                (data_use_allval[key].AMT / 10000).toFixed(1) + "万"; //值
              all_vue = true;
            }
          });

          Object.keys(data_use_banmu).forEach((key) => {
            // console.log(data_use_banmu[key].MDATE);
            if (
              this.sel_value.day_7 == false &&
              this.sel_value.day_30 == false &&
              data_use_banmu[key].MDATE == this.set_time
            ) {
              // month_yong.push(data_use[key].SEC_CLASS);

              switch (this.sel_value.Range_set) {
                case 1:
                  this.set_target_data.muban_valeu.ago_rate =
                    (data_use_banmu[key].AGO_RATE * 100).toFixed(1) + "%";
                  this.set_target_data.muban_valeu.reach_rate =
                    (data_use_banmu[key].REACH_RATE * 100).toFixed(1) + "%";
                  this.set_target_data.muban_valeu.target =
                    (data_use_banmu[key].TARGET / 10000).toFixed(0) + "万";
                  this.set_target_data.muban_valeu.value =
                    (data_use_banmu[key].VALUE / 10000).toFixed(1) + "万";
                  break;
                case 2:
                  this.set_target_data.muban_valeu.ago_rate =
                    (data_use_banmu[key].AGO_RATE * 100).toFixed(1) + "%";
                  // this.set_target_data.muban_valeu.reach_rate = data_use_banmu[
                  //   key
                  // ].REACH_RATE.toFixed(1);
                  this.set_target_data.muban_valeu.reach_rate ='- -';
                  this.set_target_data.muban_valeu.target = data_use_banmu[
                    key
                  ].TARGET.toFixed(0);
                  this.set_target_data.muban_valeu.value =
                    (data_use_banmu[key].RATE * 100).toFixed(2) + "%";
                  break;
                case 3:
                  this.set_target_data.muban_valeu.ago_rate =
                    (data_use_banmu[key].AGO_RATE * 100).toFixed(1) + "%";
                  this.set_target_data.muban_valeu.reach_rate =
                    (data_use_banmu[key].REACH_RATE * 100).toFixed(1) + "%";
                  this.set_target_data.muban_valeu.target = data_use_banmu[
                    key
                  ].TARGET.toFixed(0);
                  this.set_target_data.muban_valeu.value =
                    (data_use_banmu[key].AMT / 10000).toFixed(1) + "万";
                  break;
              }

              banmu_vue = true;
            } else if (
              this.sel_value.day_7 == true ||
              this.sel_value.day_30 == true
            ) {
              this.set_target_data.muban_valeu.ago_rate =
                (data_use_banmu[key].AGO_RATE * 100).toFixed(1) + "%";
              this.set_target_data.muban_valeu.reach_rate =((data_use_banmu[key].REACH_RATE * 100))? ((data_use_banmu[key].REACH_RATE * 100)).toFixed(1) + "%":'- -';
              this.set_target_data.muban_valeu.target = (data_use_banmu[key].TARGET||0).toFixed(0);
              this.set_target_data.muban_valeu.value =
                (data_use_banmu[key].AMT / 10000).toFixed(1) + "万";
              banmu_vue = true;
            }
          });

          Object.keys(data_use_ruanti).forEach((key) => {
            if (
              this.sel_value.day_7 == false &&
              this.sel_value.day_30 == false &&
              data_use_ruanti[key].MDATE == this.set_time
            ) {
              // month_yong.push(data_use[key].SEC_CLASS);

              switch (this.sel_value.Range_set) {
                case 1:
                  this.set_target_data.ruanti_valeu.ago_rate =
                    (data_use_ruanti[key].AGO_RATE * 100).toFixed(1) + "%";
                  this.set_target_data.ruanti_valeu.reach_rate =
                    (data_use_ruanti[key].REACH_RATE * 100).toFixed(1) + "%";
                  this.set_target_data.ruanti_valeu.target =
                    (data_use_ruanti[key].TARGET / 10000).toFixed(0) + "万";
                  this.set_target_data.ruanti_valeu.value =
                    (data_use_ruanti[key].VALUE / 10000).toFixed(1) + "万";
                  break;
                case 2:
                  this.set_target_data.ruanti_valeu.ago_rate =
                    (data_use_ruanti[key].AGO_RATE * 100).toFixed(1) + "%";
                  // this.set_target_data.ruanti_valeu.reach_rate = data_use_ruanti[
                  //   key
                  // ].REACH_RATE.toFixed(1);

                  this.set_target_data.ruanti_valeu.reach_rate ='- -';

                  this.set_target_data.ruanti_valeu.target = data_use_ruanti[
                    key
                  ].TARGET.toFixed(0);
                  this.set_target_data.ruanti_valeu.value =
                    (data_use_ruanti[key].RATE * 100).toFixed(2) + "%";
                  break;
                case 3:
                  this.set_target_data.ruanti_valeu.ago_rate =
                    (data_use_ruanti[key].AGO_RATE * 100).toFixed(1) + "%";
                  this.set_target_data.ruanti_valeu.reach_rate =
                    (data_use_ruanti[key].REACH_RATE * 100).toFixed(1) + "%";
                  this.set_target_data.ruanti_valeu.target =
                    (data_use_ruanti[key].TARGET * 100).toFixed(1) + "%";
                  this.set_target_data.ruanti_valeu.value =
                    (data_use_ruanti[key].AMT * 100).toFixed(1) + "%";
                  break;
              }

              ruanti_vue = true;
            } else if (
              this.sel_value.day_7 == true ||
              this.sel_value.day_30 == true
            ) {
              this.set_target_data.ruanti_valeu.ago_rate =
                (data_use_ruanti[key].AGO_RATE * 100).toFixed(1) + "%";
              this.set_target_data.ruanti_valeu.reach_rate =((data_use_ruanti[key].REACH_RATE * 100))? (data_use_ruanti[key].REACH_RATE * 100).toFixed(1)+'%':'- -';
              this.set_target_data.ruanti_valeu.target =
                ((data_use_ruanti[key].TARGET * 100)||0).toFixed(1) + "%";

              this.set_target_data.ruanti_valeu.value =(this.sel_value.Range_set==3)? (data_use_ruanti[key].AMT * 100).toFixed(1) + "%":(data_use_ruanti[key].AMT / 10000).toFixed(1) + "万"; //值;
              ruanti_vue = true;
            }
          });

          if (!all_vue) {
            this.set_target_data.all_valeu.ago_rate = "";
            this.set_target_data.all_valeu.reach_rate = "";
            this.set_target_data.all_valeu.target = "";
            this.set_target_data.all_valeu.value = "";
          }
          if (!banmu_vue) {
            this.set_target_data.muban_valeu.ago_rate = "";
            this.set_target_data.muban_valeu.reach_rate = "";
            this.set_target_data.muban_valeu.target = "";
            this.set_target_data.muban_valeu.value = "";
          }
          if (!ruanti_vue) {
            this.set_target_data.ruanti_valeu.ago_rate = "";
            this.set_target_data.ruanti_valeu.reach_rate = "";
            this.set_target_data.ruanti_valeu.target = "";
            this.set_target_data.ruanti_valeu.value = "";
          }



        }catch(error){ 
          console.log("========错误捕捉信息==========")
          // console.log(error)
          console.error(error);
          // this.info_error+=1;
          Information_log('产品市场-'+((this.sel_value.Range_set=='1')?'产值概览':(this.sel_value.Range_set=='2')?'欧康产品':'母婴概览'),'产品市场-核心指标:  '+error.toString());
        }



      });
    },
    initChart() {
      // console.log(JSON.stringify(set_data));  这个才能看到真正的情况
      // this.$refs["chart"]
      this.chartIns = echarts.init(this.$refs["chart"]);
      // 新加的开始
      let _this = this;

      this.p1.then(() => {

        try{

          this.chartIns.clear();


          let data_use = this.data_handle(this.data);
          data_use = data_use.data_handle_set_one_set;

          // console.log("=================运行到折线图这里！！！========================")
          // console.log(data_use);

          let month_yong = [];
          let ago_value =
            this.sel_value.day_7 == false && this.sel_value.day_30 == false
              ? [null,null ,null ,null ,null ,null ,null ,null ,null ,null ,null ,null ]
              // ?[]
              : [];
          let value_use =
            this.sel_value.day_7 == false && this.sel_value.day_30 == false
              ? [null,null ,null ,null ,null ,null ,null ,null ,null ,null ,null ,null ]
              // ?[]
              : [];

          let month_year=[];    
          // let month_yong_a = [];
          // let month_yong_b = [];
          let year_now = new Date();
          // 做T+1处理开始
          // year_now=year_now.getTime()-(24*60*60*1000);
          if(year_now.getHours()<9){
            // console.log("T+2");
            year_now=year_now.getTime()-(24*60*60*1000*(2));
          }else{
            // console.log("T+1");
            year_now=year_now.getTime()-(24*60*60*1000);
          }  
          year_now=new Date(year_now);
          year_now=year_now.getFullYear();


          let _time_now=new Date();
          // _time_now=_time_now.getTime()-(24*60*60*1000);
          if(_time_now.getHours()<9){
            // console.log("T+2");
            _time_now=_time_now.getTime()-(24*60*60*1000*(2));
          }else{
            // console.log("T+1");
            _time_now=_time_now.getTime()-(24*60*60*1000);
          } 
          _time_now=new Date(_time_now);
          // 做T+1处理结束

          // 做M+1处理开始
          let month_m1=(new Date()).setMonth((new Date().getMonth()-1))//一个月
          let year_now_m1 = (new Date(month_m1)).getFullYear();
          // 做M+1处理结束
          let set_on_year=(this.change_time_on==true)?this.set_time.substring(0,4):(this.sel_value.Range_set==1||this.sel_value.Range_set==2)?year_now_m1:year_now;




          data_use = data_use.sort((a, b) => {
            let value_sort = "";
            if (this.sel_value.day_7 == false && this.sel_value.day_30 == false) {
              value_sort =
                Number(a["MDATE"].substring(5, 7)) -
                Number(b["MDATE"].substring(5, 7));
            } else if (
              this.sel_value.day_7 == true ||
              this.sel_value.day_30 == true
            ) {
              let a_time = new Date(a["TDATE"]).getTime(new Date(a["TDATE"]));
              let b_time = new Date(b["TDATE"]).getTime(new Date(b["TDATE"]));
              value_sort = Number(a_time) - Number(b_time);
            }

            return value_sort;
          });


          // console.log("=========折线图！！！============")
          // console.log(data_use);


          Object.keys(data_use).forEach((key) => {
            
            if (this.sel_value.day_7 == false && this.sel_value.day_30 == false) {

              if (data_use[key].YEAR_SET == set_on_year - 1 + "年") {
                month_yong.push(data_use[key].MDATE_SET);
                switch (this.sel_value.Range_set) {
                  case 1:
                    for (let i = 0; i < value_use.length; i++) {
                      if (
                        i ==
                        Number(data_use[key].MDATE_SET.replace("月", "")) - 1
                      ) {
                        ago_value.splice(
                          i,
                          1,
                          (data_use[key].VALUE / 10000).toFixed(2)
                        );
                      }
                    }
                    //   ago_value.push((data_use[key].VALUE/10000).toFixed(2));
                    break;
                  case 2:
                    for (let i = 0; i < value_use.length; i++) {
                      if (
                        i ==
                        Number(data_use[key].MDATE_SET.replace("月", "")) - 1
                      ) {
                        ago_value.splice(
                          i,
                          1,
                          (data_use[key].RATE * 100).toFixed(2)
                        );
                      }
                    }
                    //   ago_value.push((data_use[key].RATE * 100).toFixed(2));
                    break;
                  case 3:
                    for (let i = 0; i < value_use.length; i++) {
                      if (
                        i ==
                        Number(data_use[key].MDATE_SET.replace("月", "")) - 1
                      ) {
                        ago_value.splice(
                          i,
                          1,
                          this.sel_value.all_muri_value == 3
                            ? (data_use[key].AMT * 100).toFixed(2)
                            : (data_use[key].AMT / 10000).toFixed(2)
                        );
                      }
                    }
                    //   ago_value.push(data_use[key].AMT);
                    break;
                  //  default : AMT
                }
              } else if (
                data_use[key].YEAR_SET ==
                set_on_year + "年"
                // &&(data_use[key].MDATE < this.set_time ||
                //   data_use[key].MDATE == this.set_time)
              ) {
                month_yong.push(data_use[key].MDATE_SET);
                // month_yong.push(data_use[key].TDATE);
                month_year.push(data_use[key].MDATE.substring(0,4));
                // console.log(data_use);

                switch (this.sel_value.Range_set) {
                  case 1:
                    for (let i = 0; i < value_use.length; i++) {
                      if (
                        i ==
                        Number(data_use[key].MDATE_SET.replace("月", "")) - 1
                      ) {
                        value_use.splice(
                          i,
                          1,
                          (data_use[key].VALUE / 10000).toFixed(2)
                        );
                      }
                    }
                    //   value_use.push((data_use[key].VALUE/10000).toFixed(2));
                    break;
                  case 2:
                    for (let i = 0; i < value_use.length; i++) {
                      if (
                        i ==
                        Number(data_use[key].MDATE_SET.replace("月", "")) - 1
                      ) {
                        value_use.splice(
                          i,
                          1,
                          (data_use[key].RATE * 100).toFixed(2)
                        );
                      }
                    }
                    //   value_use.push((data_use[key].RATE * 100).toFixed(2));
                    break;
                  case 3:
                    for (let i = 0; i < value_use.length; i++) {
                      if (
                        i ==
                        Number(data_use[key].MDATE_SET.replace("月", "")) - 1
                      ) {
                        value_use.splice(
                          i,
                          1,
                          this.sel_value.all_muri_value == 3
                            ? (data_use[key].AMT * 100).toFixed(2)
                            : (data_use[key].AMT / 10000).toFixed(2)
                        );
                      }
                    }
                    //   value_use.push(data_use[key].AMT);
                    break;
                  // default :
                }
              }



            } else if (
              this.sel_value.day_7 == true ||
              this.sel_value.day_30 == true
            ) {

              if(this.sel_value.Range_set==1){

                if (data_use[key].YEAR_SET == year_now + "年") {
                  month_yong.push(data_use[key].TDATE.substring(5, 10));
                  value_use.push((data_use[key].VALUE / 10000).toFixed(2));
                  ago_value.push((data_use[key].AGO_VALUE / 10000).toFixed(2));  
                }
                month_year.push(data_use[key].TDATE.substring(0,4));


              }else{

                month_yong.push(data_use[key].TDATE.substring(5, 10));


                // if (data_use[key].YEAR_SET == year_now - 1 + "年") {} else if (data_use[key].YEAR_SET == year_now + "年") {}

                  ago_value.push(
                    this.sel_value.all_muri_value == 3
                      ? (data_use[key].AGO_AMT * 100).toFixed(2)
                      : (data_use[key].AGO_AMT / 10000).toFixed(2)
                  );
                
                  // month_yong.push(data_use[key].TDATE.substring(5, 10));
                  // month_yong.push(data_use[key].TDATE);
                  value_use.push(
                    this.sel_value.all_muri_value == 3
                      ? (data_use[key].AMT * 100).toFixed(2)
                      : (data_use[key].AMT / 10000).toFixed(2)
                  );

                  // ago_value.push(
                  //   this.sel_value.all_muri_value == 3
                  //     ? (data_use[key].AGO_AMT * 100).toFixed(2)
                  //     : (data_use[key].AGO_AMT / 10000).toFixed(2)
                  // );

                

                month_year.push(data_use[key].TDATE.substring(0,4));
              }



            }
          });


          //  防止数据不齐全的开始
          let value_use_on = [];
          let ago_value_on = [];

          month_yong = this.unique(month_yong);
          month_year=this.unique(month_year);

          // 添加时间范围开始
          this.set_time_range.start = month_yong[0];
          this.set_time_range.end = month_yong[month_yong.length - 1];
          // 添加时间范围结束

          for (let i = 0; i < value_use.length; i++) {
            for (let ii = 0; ii < month_yong.length; ii++) {
              if (i == Number(month_yong[ii].replace("月", "")) - 1) {
                value_use_on.push(value_use[i]);
                ago_value_on.push(ago_value[i]);
                // value_use.splice(i,0)
              }
            }
          }
          //  防止数据不齐全的结束

          // console.log(data_use);
          // console.log(value_use);
          // console.log(ago_value);
          // console.log(month_year);

          // 新加的默认值开始
          this.barData.value=0;
          this.barData.ago_value=0;
          let day_time_set=null;
          let month_time_set=null;
          if(this.sel_value.day_7 == false && this.sel_value.day_30 == false){

            // this.barData.month=this.set_time.substring(5, 7)+"月";

            let set_on_time_now=(this.sel_value.Range_set==1||this.sel_value.Range_set==3)?(new Date(month_m1)):_time_now;

            month_time_set=(((set_on_time_now.getMonth()+1)>9)?(set_on_time_now.getMonth()+1):'0'+(set_on_time_now.getMonth()+1));
            month_time_set=(this.change_time_on==true)?this.set_time.substring(5,7):month_time_set;
            this.barData.month=(set_on_year)+'.'+month_time_set;






            // this.barData.month=this.set_time.substring(0, 7);
            // console.log(this.barData.month);
            // console.log(this.set_time.substring(5, 7)+"月");
            // console.log("===================================")
            // console.log((new Date(month_m1)).getFullYear()+'-'+((new Date(month_m1)).getMonth()+1))
            // console.log(set_on_time_now.getMonth()+1);

            Object.keys(month_yong).forEach((key_mv) => {
              // if(month_yong[key_mv]==(this.set_time.substring(5, 7)*1+"月")){
              if(month_yong[key_mv]==(month_time_set*1+"月")){
                // this.barData.value=this.fomatMoney(value_use_on[key_mv]||0)+(this.sel_value.Range_set==2||this.sel_value.all_muri_value==3?'%':'万')
                // this.barData.ago_value=this.fomatMoney(ago_value_on[key_mv]||0)+(this.sel_value.Range_set==2||this.sel_value.all_muri_value==3?'%':'万')
                this.barData.value=(value_use_on[key_mv]==null)? '--':this.fomatMoney(value_use_on[key_mv])+(this.sel_value.Range_set==2||this.sel_value.all_muri_value==3?'%':'万')
                this.barData.ago_value=(ago_value_on[key_mv]==null)? '--':this.fomatMoney(ago_value_on[key_mv])+(this.sel_value.Range_set==2||this.sel_value.all_muri_value==3?'%':'万')
                
              }
            }); 

            if(this.barData.value===0&&this.barData.ago_value===0){

              this.barData.month=((month_year.length==2&& (month_yong[month_yong.length-1]).replace(/[^0-9]/ig,"")=='12')?set_on_year-1:set_on_year)+
              '.'+ ((month_yong[month_yong.length-1]).replace(/[^0-9]/ig,""));

              this.barData.value=this.fomatMoney(value_use_on[value_use_on.length-1]||0)+(this.sel_value.Range_set==2||this.sel_value.all_muri_value==3?'%':'万')
              this.barData.ago_value=this.fomatMoney(ago_value_on[ago_value_on.length-1]||0)+(this.sel_value.Range_set==2||this.sel_value.all_muri_value==3?'%':'万')
            }
            
            
          }else if(this.sel_value.day_7 == true){
            this.barData.month=year_now+'-'+(month_yong[month_yong.length-1]||0);
            this.barData.value=this.fomatMoney(value_use[value_use.length-1]||0)+(this.sel_value.Range_set==2||this.sel_value.all_muri_value==3?'%':'万');
            this.barData.ago_value=this.fomatMoney(ago_value[ago_value.length-1]||0)+(this.sel_value.Range_set==2||this.sel_value.all_muri_value==3?'%':'万');

          }else if(this.sel_value.day_30 == true){


            day_time_set=(((_time_now.getDate()*1)>9)?(_time_now.getDate()*1):'0'+(_time_now.getDate()*1));
            month_time_set=(((_time_now.getMonth()+1)>9)?(_time_now.getMonth()+1):'0'+(_time_now.getMonth()+1));
            this.barData.month=(year_now)+'-'+month_time_set+'-'+day_time_set;

            // console.log(value_use);
            // console.log(month_yong);
            // console.log((_time_now.getMonth()+1)+'-'+(_time_now.getDate()*1))
            let _time_now_set=(((_time_now.getMonth()+1)>9)?(_time_now.getMonth()+1):'0'+(_time_now.getMonth()+1))+'-'
            +(((_time_now.getDate()*1)>9)?(_time_now.getDate()*1):'0'+(_time_now.getDate()*1));

            Object.keys(month_yong).forEach((key_mv) => {
              if(month_yong[key_mv]==(_time_now_set)){
                this.barData.value=this.fomatMoney(value_use[key_mv]||'--')+(this.sel_value.Range_set==2||this.sel_value.all_muri_value==3?'%':'万');
                this.barData.ago_value=this.fomatMoney(ago_value[key_mv]||0)+(this.sel_value.Range_set==2||this.sel_value.all_muri_value==3?'%':'万');
              }
            });  

            if(this.barData.value==0&&this.barData.ago_value==0){
            this.barData.month=year_now+'-'+(month_yong[month_yong.length-1]||0);
            this.barData.value=this.fomatMoney(value_use[value_use.length-1]||0)+(this.sel_value.Range_set==2||this.sel_value.all_muri_value==3?'%':'万');
            this.barData.ago_value=this.fomatMoney(ago_value[ago_value.length-1]||0)+(this.sel_value.Range_set==2||this.sel_value.all_muri_value==3?'%':'万');
            }


          }
          // 新加的默认值结束


          // console.log("======zzxc===========zxczczc============zxczcz=======");
          // console.log(((this.sel_value.day_7 == false && this.sel_value.day_30 == false)?value_use_on:value_use).length);

          // 2021-01-11新开始
          let showSymbol_period=0;
          let showSymbol_ago=0;
          let data_pd_period=(this.sel_value.day_7 == false && this.sel_value.day_30 == false)? value_use_on: value_use;
          let data_pd_ago=(this.sel_value.day_7 == false && this.sel_value.day_30 == false)? ago_value_on: ago_value;
          
          Object.keys(data_pd_ago).forEach((key_mv_a) => {
            if(data_pd_ago[key_mv_a]!=null){
              showSymbol_ago+=1;
            }
          });

          Object.keys(data_pd_period).forEach((key_mv) => {
            if(data_pd_period[key_mv]!=null){
              showSymbol_period+=1;
            }
          });

          // console.log(data_pd_period);
          // console.log(data_pd_ago);

          // 2021-01-11新结束

            

          this.chartIns.setOption({
            grid: {
              left: "5%",
              top: "6%",
              right: "5%",
              bottom: "3%",
              containLabel: true,
            },
            legend: {
              show:false,
              data: ["同期", "当期"],
              right: "3%",
              top: "0%",
              bottom: "2%",
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
                  // backgroundColor: "#6a7985",
                  color:"#000000",
                  backgroundColor: "aliceblue",
                },
              // lineStyle: {
              //     width: 0
              // }
              },

              formatter: function (params) {
                // console.log(params); 

                if(_this.sel_value.day_7 == true || _this.sel_value.day_30 == true){
                  // _this.barData.value = params[0].value;
                  // _this.barData.ago_value = 0;
                  // _this.barData.month = params[0].axisValue;
                  _this.barData.value = (params[1]==undefined||params[1].value==undefined)?'--':
                    (_this.fomatMoney(params[1].value)+(_this.sel_value.Range_set==2||_this.sel_value.all_muri_value==3?'%':'万'));
                  _this.barData.ago_value = (params[0]==undefined||params[0].value==undefined)?'--':
                    (_this.fomatMoney(params[0].value)+(_this.sel_value.Range_set==2||_this.sel_value.all_muri_value==3?'%':'万'));
                  _this.barData.month =((month_year.length==2&&params[0].axisValue.substring(0,2)=='12')?year_now-1:year_now)+'.'+((params[0].axisValue==undefined)?0:params[0].axisValue);
                
                }else{

                  _this.barData.value = (params[1]==undefined||params[1].value==undefined)?'--':
                    (_this.fomatMoney(params[1].value)+(_this.sel_value.Range_set==2||_this.sel_value.all_muri_value==3?'%':'万'));
                  _this.barData.ago_value = (params[0]==undefined||params[0].value==undefined)?'--':
                    (_this.fomatMoney(params[0].value)+(_this.sel_value.Range_set==2||_this.sel_value.all_muri_value==3?'%':'万'));
                  _this.barData.month = ((params[0].axisValue==undefined)?'--':
                    set_on_year+'.'+((params[0].axisValue).replace(/[^0-9]/ig,"")>9?(params[0].axisValue).replace(/[^0-9]/ig,""):
                    '0'+(params[0].axisValue).replace(/[^0-9]/ig,"")));

                }


                
                // return (
                //   params[1].name +
                //   "<br/>" +
                //   params[1].marker +
                //   "当期: " +
                //   params[1].value +
                //   "<br/>" +
                //   params[0].marker +
                //   "同期: " +
                //   params[0].value
                // );
              },
            },
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: month_yong,

              axisLine: {
                lineStyle: {
                  color: "#ccc",
                },
              },
              axisLabel: {
                interval: 'auto',
              },
            },
            yAxis: {
              type: "value",
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
                formatter:
                  this.sel_value.Range_set == 2 ||
                  (this.sel_value.Range_set == 3 &&
                    this.sel_value.all_muri_value == 3)
                    ? "{value} %"
                    : "{value}",
              },
            },

            series: [
              {
                name: "同期",
                // showSymbol: false,
                showSymbol: (showSymbol_ago==1)? true:false,
                smooth: false, //true 为平滑曲线，false为直线
                // symbol: 'circle',     //设定为实心点
                // symbolSize: 2,   //设定实心点的大小
                itemStyle: {
                  color: "#919191",

                  normal: {
                    // color: "#BBBBBB",
                    color: "#F5A028",
                    lineStyle: {
                      // color: "#BBBBBB",
                      color: "#F5A028",
                      width: 1, //设置线条粗细
                    },
                    areaStyle: {
                      color: "rgba(255, 255, 255, 0.00)",
                      // new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                      //   {
                      //     offset: 0,
                      //     color: "rgba(187, 187, 187, 0.35)",
                      //   },
                      //   {
                      //     offset: 1,
                      //     color: "rgba(187, 187, 187, 1)",
                      //   },
                      // ]),
                    },
                  },
                },
                data:
                  this.sel_value.day_7 == false && this.sel_value.day_30 == false
                    ? ago_value_on
                    : ago_value,
                type: "line",
                areaStyle: {},
              },

              {
                name: "当期",
                // showSymbol: false,
                showSymbol: (showSymbol_period==1)? true:false,

                smooth: false, //true 为平滑曲线，false为直线
                // symbol: 'circle',     //设定为实心点
                // symbolSize: 2,   //设定实心点的大小
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

                data:
                  this.sel_value.day_7 == false && this.sel_value.day_30 == false
                    ? value_use_on
                    : value_use,
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
          Information_log('产品市场-'+((this.sel_value.Range_set=='1')?'产值概览':(this.sel_value.Range_set=='2')?'欧康产品':'母婴概览'),'产品市场-折线图:  '+error.toString());
        }


      });


    },

    initChart2() {
      this.chartIns2 = echarts.init(this.$refs["chart2"]);

      this.p1.then(() => {

        try{

          this.chartIns2.clear();


          let data_use = this.data_handle(this.data);
          data_use = data_use.data_handle_set_two_set;


          let month_yong = [];
          // let ago_value=[];
          let value_use = [];
          // let year_now=new Date();
          // year_now=year_now.getFullYear();
          // let bar_height="";

          data_use = data_use.sort((a, b) => {
            let value_sort = "";
            switch (this.sel_value.Range_set) {
              case 1:
                value_sort = Number(a["VALUE"]) - Number(b["VALUE"]);
                break;
              case 2:
                value_sort = Number(a["RATE"]) - Number(b["RATE"]);
                break;
              case 3:
                value_sort = Number(a["AMT"]) - Number(b["AMT"]);
                break;
            }
            return value_sort;
          });


          Object.keys(data_use).forEach((key) => {
            if (this.sel_value.day_7 == false && this.sel_value.day_30 == false) {
              if (data_use[key].MDATE == this.set_time) {
                switch (this.sel_value.Range_set) {
                  case 1:
                    month_yong.push(data_use[key].SEC_CLASS);
                    value_use.push((data_use[key].VALUE / 10000).toFixed(2));
                    break;
                  case 2:
                    month_yong.push(data_use[key].CLASS_CHECK_TWO);
                    value_use.push((data_use[key].RATE * 100).toFixed(2));
                    break;
                  case 3:
                    month_yong.push(data_use[key].CATEGORY_SALE);
                    value_use.push(
                      this.sel_value.all_muri_value == 3
                        ? (data_use[key].AMT * 100).toFixed(2)
                        : (data_use[key].AMT / 10000).toFixed(2)
                    );
                    break;
                }
              }
            } else if (
              this.sel_value.day_7 == true ||
              this.sel_value.day_30 == true
            ) {

              if(this.sel_value.Range_set==1){

                month_yong.push(data_use[key].SEC_CLASS);
                value_use.push((data_use[key].VALUE / 10000).toFixed(2));

              }else{
                month_yong.push(data_use[key].CATEGORY_SALE);
                value_use.push(
                  this.sel_value.all_muri_value == 3
                    ? (data_use[key].AMT * 100).toFixed(2)
                    : (data_use[key].AMT / 10000).toFixed(2)
                );
              }

            }
          });

          // if(this.sel_value.Range_set==3&&this.sel_value.all_muri_value==3){
          //     this.canvas_css.height=0+"vw"
          // }else{
          //    this.canvas_css.height=((20 * month_yong.length + 15 * month_yong.length)/3.75)+"vw"
          // }

          this.chartIns2.setOption({
            grid: {
              height:
                month_yong.length < 5
                  ? 20 * month_yong.length + 15 * month_yong.length
                  : "",
              left: "0%",
              top: "5%",
              right: "20%",
              bottom: "3%",
              containLabel: true,
            },

            animation:true,    //设置是否开启动画
            //动画加载时长为3秒
            animationDuration: 1000,

            tooltip: {
              show: false,
              trigger: "axis",
              axisPointer: {
                //   type: "cross",
                //   label: {
                //     backgroundColor: "#6a7985",
                //   },
              },
            },
            xAxis: {
              type: "value",
              show: false,
            },
            yAxis: {
              type: "category",

              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              data: month_yong,

              axisLabel: {
                textStyle: {
                  color: "#ccc",
                },
              },
            },
            series: [
              {
                data: value_use,
                type: "bar",
                barWidth: month_yong.length < 10 ? 20 : "", //柱图宽度
                showBackground: false,
                backgroundStyle: {
                  color: "rgba(220, 220, 220, 0.8)",
                },
                // color: "#66ccff",
                color: "#1678FF",
                label: {
                  normal: {
                    show: true,
                    position: "right",
                    color: "#000000",
                    formatter: function (params) {
                      return params.value+'%'
                    },
                  },
                },
              },
            ],
          });


        }catch(error){ 
          console.log("========错误捕捉信息==========")
          // console.log(error)
          console.error(error);
          // this.info_error+=1;
          Information_log('产品市场-'+((this.sel_value.Range_set=='1')?'产值概览':(this.sel_value.Range_set=='2')?'欧康产品':'母婴概览'),'产品市场-柱状图:  '+error.toString());
        }


      });
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

    nll_undefined(setvalue){
      // setvalue=setvalue==undefined?'--':setvalue;
      // return setvalue;
      setvalue=setvalue.toString();
      setvalue=setvalue.indexOf("undefined")==-1?setvalue:'--';
      return setvalue;
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
      num = num + '';
      if (!num.includes('.')) {
          num += '.'
      }
      return num.replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
          return $1 + ',';
      }).replace(/\.$/, '');

    },


  },
};
</script>

<style scoped lang="scss">
// @import "swiper/swiper-bundle.css";
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
}

.but_set_select {
  color: rgba(89, 178, 178, 1);
}



/deep/ .change-rate i.rate-up_salesR:after{

  right: -11px;

}

/deep/ .change-rate i.rate-down_salesR:after{

  right: -11px;

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

