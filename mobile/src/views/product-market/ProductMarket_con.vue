
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
                <p style="margin-bottom: 5px;margin-top: 5px;">T+1（数据截止到昨天）</p> 
              <p style="font-weight: bold;">
                  <i style="width: 5px;height: 16px;background-color: #23B0A8;display: block;float: left;margin-right: 5px;margin-top: 3px;border-radius: 4px;"></i>
                  <span style="color: #000000;">时间范围</span></p>
                <p style="margin-bottom: 10px;margin-top: 5px;">当月（当月1号-昨天）</p>

              <p style="font-weight: bold;">
                <i style="width: 5px;height: 16px;background-color: #23B0A8;display: block;float: left;margin-right: 5px;margin-top: 3px;border-radius: 4px;"></i>
                <span style="color: #000000;">逻辑说明</span></p>


              <van-collapse v-model="activeNames_tips" accordion>
                <van-collapse-item title="支付业绩" name="1">
                  <p>统计时间为支付时间的业绩</p>
                </van-collapse-item>
                <van-collapse-item title="发货业绩" name="2">
                  <p>统计时间为发货时间的业绩</p> 
                </van-collapse-item>
              </van-collapse>

            </div>
          </van-popup>


      </section>


      <!-- 开头结束 background-color: #ffffff;class="px10 py10"-->

      <section  style="display: none;padding-top: 10px; padding-bottom: 10px;background: #ffffff;border-radius: 4px;margin-left: 10px;margin-right: 10px;">
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
        style="display: none;padding-top: 5px; padding-bottom: 5px; border-radius: 4px; ;margin-left: 10px;margin-right: 10px;margin-bottom: 0px;"
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


        <!-- 2021-02-24时间新加的样式开始 -->
        <van-row type="flex" justify="center" style="padding-bottom: 10px;margin-left: 10px;margin-right: 10px;">
          <van-col
            span="11" 
            style="border-radius: 4px;"
            @click="Single_choice_qie('target', ['_this.set_target_on()','_this.DYKSListData()','_this.initChart()'], 1, '_this.DeliverPay')"
            :style="(DeliverPay.target==1)?whole_css.zffhyjkj:whole_css.zffhyjkj_n"
          >
            支付口径</van-col
          >
          <van-col
            span="11" offset="2"
            style="border-radius: 4px;"
            @click="Single_choice_qie('target', ['_this.set_target_on()','_this.DYKSListData()','_this.initChart()'], 2, '_this.DeliverPay')"
            :style="(DeliverPay.target==2)?whole_css.zffhyjkj:whole_css.zffhyjkj_n"
          >
            发货口径</van-col
          >
        </van-row>
        <!-- 2021-02-24时间新加的样式结束 -->

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
            <span :class="sel_value.all_muri_value == 1 ? 'title_change' : ''" :style="sum_zhibiao.title">{{
              sel_title.chanzhi_wenzi.title_all
            }}</span>

            <span :style="sum_zhibiao.zhognxin">{{
              ((set_target_data.all_valeu.reach_rate||0)/10000).toFixed(1)+'万'
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
                ((set_target_data.all_valeu.target||0)/10000).toFixed(0)+'万'
              }}</i>
            </span>
            <span class="change-rate" style="padding-bottom: 4px;" :style="sum_zhibiao.body">
              <i
                style="
                 
                  width: 35%;
                  display: inline-block;
                  font-style: normal;
                "
                >{{ (sel_title.chanzhi_wenzi.ago_rate) }}</i
              >
              <!-- :class="calcSignClass(data['overview-ka_reach_yoy_rate'])"  rate-up-->

              <!-- sel_value.all_muri_value == 1? 
                Number((set_target_data.all_valeu.ago_rate.replace('%', ''))||0)>0?'rate-up-sel':'rate-down-sel': -->

              <i style="font-style: normal;display: inline-block;"
                :style="{'color':(Number(set_target_data.all_valeu.ago_rate)>1)?'#ff4d4f':'#008000'}"
              >
                {{ (fomatMoney((set_target_data.all_valeu.ago_rate*100||0).toFixed(1)))+'%' }}
              
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
            <span :class="sel_value.all_muri_value == 2 ? 'title_change' : ''" :style="sum_zhibiao.title">{{
              sel_title.chanzhi_wenzi.title_muban
            }}</span>

            <span :style="sum_zhibiao.zhognxin">{{
              ((set_target_data.muban_valeu.reach_rate||0)/10000).toFixed(1)+'万'
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
                ((set_target_data.muban_valeu.target||0)/10000).toFixed(0)+'万'
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

              <i style="font-style: normal;display: inline-block;"
                :style="{'color':(Number(set_target_data.muban_valeu.ago_rate)>1)?'#ff4d4f':'#008000'}"
              >
                <!-- {{ set_target_data.muban_valeu.ago_rate }} -->

                {{ (set_target_data.muban_valeu.ago_rate*100||0).toFixed(1)+'%' }}
                
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

            <span :class="sel_value.all_muri_value == 3 ? 'title_change' : ''" :style="sum_zhibiao.title">{{
              sel_title.chanzhi_wenzi.title_ruanti
            }}   
              <!-- <i style="float: right;margin-right: 10px;"><van-icon name="question-o" color="rgb(153, 153, 153)" @click="Toast_fun()" size="14" /></i>  -->
            </span>

            <span :style="sum_zhibiao.zhognxin">{{
              ((set_target_data.ruanti_valeu.reach_rate||0)/10000).toFixed(1)+'万'
            }}</span>



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
                ((set_target_data.ruanti_valeu.target||0)/10000).toFixed(0)+'万'
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

              <i style="font-style: normal;display: inline-block;"
                :style="{'color':(Number(set_target_data.ruanti_valeu.ago_rate)>1)?'#ff4d4f':'#008000'}"
              >
                {{ (set_target_data.ruanti_valeu.ago_rate*100||0).toFixed(1)+'%' }}
                
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

            <!-- <van-col span="6">
              <div>
                <div style="margin: 0 auto; width: 50px; height: 17px;">
                  <div style="height: 17px;display: block;float: left;">
                    <div style="width: 100%; height: 8px;"></div>
                    <i style="width: 15px;height: 2px;background-color: #1678FF;display: block; margin-right: 6px;"></i>
                  </div>
                  <div style="font-size: 12px;"><span>目标</span></div>
                </div>
                <div style="text-align: center;">
                  <span style="font-size: 12px; color: #FF3300;">{{ nll_undefined(barData.value) }}</span>
                </div> 
              </div>
            </van-col> -->

            <van-col span="8">
              <div>
                <div style="margin: 0 auto; width: 50px; height: 17px;">
                  <div style="height: 17px;display: block;float: left;">
                    <div style="width: 100%; height: 8px;"></div>
                    <i style="width: 15px;height: 2px;background-color: #1678FF;display: block; margin-right: 6px;"></i>
                  </div>
                  <div style="font-size: 12px;"><span>业绩</span></div>
                </div>
                <div style="text-align: center;">
                  <!-- <i style="width: 15px;height: 4px;display: block; margin-right: 6px;margin-top: 6px;float: left;"></i> -->
                  <span style="font-size: 12px; color: #FF3300;">{{ nll_undefined(barData.ago_value) }}</span>
                </div> 
              </div>
              <!-- <div></div> -->
            </van-col>

            <van-col span="8">
              <div>
                <div style="margin: 0 auto; width: 60px; height: 17px;">
                  <div style="height: 17px;display: block;float: left;">
                    <div style="width: 100%; height: 8px;"></div>
                    <i style="width: 15px;height: 2px;background-color:#F5A028 ;display: block; margin-right: 6px;"></i>
                  </div>
                  <div style="font-size: 12px;"><span>完成率</span></div>  
                </div>
                <div style="text-align: center;">
                  <!-- <i style="width: 15px;height: 4px;display: block; margin-right: 6px;margin-top: 6px;float: left;"></i> -->
                  <span style="font-size: 12px; color: #FF3300;">{{ nll_undefined(barData.rate) }}</span>
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


        <section
          class="px10 py10"
          :style="
            (sel_value.canvas_no==false)||sel_value.pd_data_null==true||(sel_value.all_muri_value == 3 && sel_value.Range_set == 3)
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
        
        <van-empty description="期间暂无数据发生" v-if="sel_value.canvas_no==true&&sel_value.pd_data_null==true" />

        <div style="clear: both;width: 100%;"></div>
      </div>
      <!-- 底部canvas结束 -->


      <!-- 渠道细分开始 -->
      <section
        style="padding-top: 5px; padding-bottom: 5px; border-radius: 4px; ;margin-left: 10px;margin-right: 10px;margin-bottom: 0px;"
      >
       <div
          class="section-title test_addd"
          style="padding-left: 0px; padding-bottom: 0px"
        >
          渠道细分
        </div>

      </section>
      <div class="DYKS_list" ref="canvas_w_h" style="padding-top: 10px;background: #ffffff;margin-left: 10px;margin-right: 10px;border-radius: 4px;padding-bottom: 10px;">

        <van-collapse v-model="activeNames" :border="false" :accordion="true" id="aaaaa" style="text-align: center;" >

          <van-collapse-item
            name="21"
            :disabled="true"
            :border="false"
            :is-link="false"
            title-class="qushiyeji_title"
            ref="checkbox"
          >
            <template #title>
              <van-row>
                <van-col span="" :style="{ 'width':(yjdc_css.width*1+10)+'px'}"
                  ><span style="margin-left: -0px">渠道</span></van-col
                >
                <van-col span="" :style="{ 'width':(yjdc_css.width*1)+'px'}">目标</van-col>
                <van-col span="" :style="{ 'width':(yjdc_css.width*1)+'px'}">业绩</van-col>
                <van-col span="" :style="{ 'width':(yjdc_css.width*1)+'px'}">占比</van-col>
                <van-col span="" :style="{ 'width':(yjdc_css.width*1)+'px'}"><span>完成率</span></van-col> 
                <van-col span="" :style="{ 'width':(yjdc_css.width*1-10)+'px'}"><span>详情</span></van-col> 
              </van-row>
            </template>

          </van-collapse-item>


          <van-collapse-item
            v-for="(val, key) in user_tablist"
            :key="key"
            :disabled="false"
            :is-link="true"
            :name="(key+1)"
            :border="false"
            :change="collapse_change('chart_del'+(key+1),(key+1),val.CHANNEL_TYPE)"
            title-class="qushiyeji_title_con"
            style="margin-top: -10px"
          >
            <template #title>
              <!-- <div>标题1</div>  -->
              <van-row class="yjdcqs_color">
                <van-col span="" :style="{ 'width':(yjdc_css.width*1+10)+'px'}">
                  {{val.CHANNEL_TYPE}}
                </van-col>
                <van-col span="" :style="{ 'width':(yjdc_css.width*1)+'px'}">
                  {{((val.TARGET||0)/10000).toFixed(1)+'万'}}
                </van-col>
                <van-col span="" :style="{ 'width':(yjdc_css.width*1)+'px'}">
                  {{((val.AMT||0)/10000).toFixed(1)+'万'}}
                </van-col>
                <van-col span="" :style="{ 'width':(yjdc_css.width*1)+'px'}">
                  {{((val.RATIO||0)*100).toFixed(1)+'%'}} 
                </van-col>
                <van-col span="" :style="{ 'width':(yjdc_css.width*1)+'px'}">
                  {{((val.RATE||0)*100).toFixed(1)+'%'}} 
                </van-col>
              </van-row>
            </template>
              <div :ref="'chart_del'+(key+1)"
              style="height: 154px;"
              :style="{'width':((canvas_css.width-20-20))+'px'}"
              ></div>
            <!-- 图形结束 -->
          </van-collapse-item>

        </van-collapse>
      </div>
      <!-- 渠道细分结束 -->




      <div style="width: 100%; height: 50px">

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

// import moment from 'moment';

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

      user_tablist:null,
      activeNames: "0",
      yjdc_css: {
        width: "100px",
      },
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
        rate:0,
        
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
        "padding-left": "0px"
        
      },
      click_css_hxzb_n: {
        width: "32%",
        float: "left",
        // "border-top": "2px solid #dddddd",
        "background-color": "#F7F7F7",
        "border-radius": "4px",
        "padding-bottom": "5px",
        "margin-right": "1.5%",
        "padding-left": "0px",
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
        all_muri_value: "1",
        canvas_yes: false,
        canvas_no: false,
        pd_data_null:false,
      },
      
      DeliverPay:{
        target:1
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

      whole_css: {
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

      data: {
        "cpcy_overview-all_ouk_cpcy_kpi": "",
        "cpcy_overview-banmu_ouk_cpcy_kpi": "",
        "cpcy_overview-ruanti_ouk_cpcy_kpi": "",
        "cpcy_overview-all_ouk_cpcy_sec_class": "",
        "cpcy_overview-banmu_ouk_cpcy_sec_class": "",
        "cpcy_overview-ruanti_ouk_cpcy_sec_class": "",
      },

      data_test: {},
      data_sum: {},
      data_loay:false,
      echarts_clear:false,
      echarts2_clear:false,
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
      this.yjdc_css.width = (window.innerWidth - 20 - 20-10) / 6 ;
      // console.log(window.innerWidth);

      this.time_update_now();
      

      // 做T+1处理开始
      // let year_now_time=new Date();
      let _time_now=new Date();
      _time_now=_time_now.getTime()-(24*60*60*1000);
      _time_now=new Date(_time_now);
      let time_t1_on= _time_now.getFullYear() +"-" +(_time_now.getMonth() + 1 >= 1 && _time_now.getMonth() + 1 <= 9? "0" + (_time_now.getMonth() + 1): _time_now.getMonth() + 1) +"-01"
      // 做T+1处理结束

      // 做M+1处理开始

        let month_m1=0;
        if((((new Date()).getMonth()+1)-1)==2){
          if((new Date()).getDate()<6){
            month_m1=(new Date()).getFullYear()+'-01-01'; //一个月
          }else{
            month_m1=(new Date()).getFullYear()+'-02-01'; //一个月
          }
        }else{
          if((new Date()).getDate()<6){
            month_m1=(new Date()).setMonth((new Date().getMonth()-2))//一个月
          }else{
            month_m1=(new Date()).setMonth((new Date().getMonth()-1))//一个月
          }
          
        }
        // 暂时的
        // let month_m1=(new Date()).setMonth((new Date().getMonth()-2))//一个月
        month_m1=new Date(month_m1);
        // let year_now_m1 = (new Date(month_m1)).getFullYear();
        let time_m1_on=month_m1.getFullYear() +"-" +(month_m1.getMonth() + 1 >= 1 && month_m1.getMonth() + 1 <= 9? "0" + (month_m1.getMonth() + 1): month_m1.getMonth() + 1) +"-01"
      // 做M+1处理结束
      this.set_time=(this.sel_value.Range_set==1||this.sel_value.Range_set==2)?time_m1_on:time_t1_on;





      
    this.$EventBus.$emit("data_loay_set", {
      data_loay_seton: false,
    });




    const apiMap3 = {

      // 产值概览   
      "SQL-cpcy_overview-all_ouk_cpcy_kpi": { resultProp: "ALL_OUK_CPCY_KPI" },

      // "SQL-cpcy_overview-banmu_ouk_cpcy_kpi": {resultProp: "BANMU_OUK_CPCY_KPI",},
      // "SQL-cpcy_overview-ruanti_ouk_cpcy_kpi": {resultProp: "RUANTI_OUK_CPCY_KPI",},
      // "SQL-cpcy_overview-all_ouk_cpcy_sec_class": {resultProp: "ALL_OUK_CPCY_SEC_CLASS",},
      // "SQL-cpcy_overview-banmu_ouk_cpcy_sec_class": {resultProp: "BANMU_OUK_CPCY_SEC_CLASS",},
      // "SQL-cpcy_overview-ruanti_ouk_cpcy_sec_class": {resultProp: "RUANTI_OUK_CPCY_SEC_CLASS",},

      "SQL-mly-tm_shop_sum": {resultProp: "tm_shop_sum"},
      "SQL-mly-months_chnl_amt": {resultProp: "months_chnl_amt"},
      "SQL-mly-months_amt_trend": {resultProp: "months_amt_trend"},
    }

    this.ajax_data(apiMap3);

    console.log(this.data);





    console.log(decimal2Percent);
    console.log(calcSignClass);
  },


// 新加的开始
  watch:{

    "$store.state.app.ProductMarket.type": {
      handler(val) {
        // console.log(val);
        // console.log("运行到这里！！！");
        if(val*1==1){
          this.Range_Single_choice(val + "");
          this.echarts_clear=true;
          console.log("adadsadasdasd有变化的");
          this.$store.commit("app/setProductMarket", 0); //参考的          
        }
        
      },
    },
    "activeNames":{
      handler(val){
        if(val){
          this.echarts2_clear=true;
        }
      }
    }

  },
  // 新加的结束

  mounted() {
    // 新加的开始
    this.Single_canvas("1");
    // 新加的结束
    this.all_muban_ruanti("1");


    // console.log(this.$refs);
  
    this.Range_Single_choice("1");

    if (Range == 1) {
      this.Single_choice("3");
    }


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

    Toast_fun(){
      Toast.setDefaultOptions({ duration: 2000 });
      Toast('由于软体已外包，故暂无软体产值相关相关数据');
    },

    time_update_now(){

      // console.log("as============ad");
      let year_now_time=new Date();
      // 做T+1处理开始
      // let _time_now=new Date();
      year_now_time=year_now_time.getTime()-(24*60*60*1000);
      year_now_time=new Date(year_now_time);

      console.log("==========asdadasdasda=========");
      console.log(new Date().getDate());


      let month_m1=0;
      if((((new Date()).getMonth()+1)-1)==2){
        if((new Date()).getDate()<6){
          month_m1=(new Date()).getFullYear()+'-01-01'; //一个月  
        }else{
          month_m1=(new Date()).getFullYear()+'-02-01'; //一个月          
        }

      }else{
        if((new Date()).getDate()<6){
          month_m1=(new Date()).setMonth((new Date().getMonth()-2))//一个月 
        }else{
          month_m1=(new Date()).setMonth((new Date().getMonth()-1))//一个月          
        }

      }
      // 暂时的
      // let month_m1=(new Date()).setMonth((new Date().getMonth()-2))//一个月
      year_now_time=(this.sel_value.Range_set==1||this.sel_value.Range_set==2)? (new Date(month_m1)):year_now_time;

      // 做T+1处理结束

      // console.log("======adasdasd   qqqqqqqqqqqqqqqqqqqqqqqqqqqqq===============")
      // console.log(month_m1);


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
      const apiMap3 = {
        // 产值概览
        "SQL-cpcy_overview-all_ouk_cpcy_kpi": { resultProp: "ALL_OUK_CPCY_KPI" },

        // "SQL-cpcy_overview-banmu_ouk_cpcy_kpi": {resultProp: "BANMU_OUK_CPCY_KPI",},
        // "SQL-cpcy_overview-ruanti_ouk_cpcy_kpi": {resultProp: "RUANTI_OUK_CPCY_KPI",},
        // "SQL-cpcy_overview-all_ouk_cpcy_sec_class": {resultProp: "ALL_OUK_CPCY_SEC_CLASS",},
        // "SQL-cpcy_overview-banmu_ouk_cpcy_sec_class": {resultProp: "BANMU_OUK_CPCY_SEC_CLASS",},
        // "SQL-cpcy_overview-ruanti_ouk_cpcy_sec_class": {resultProp: "RUANTI_OUK_CPCY_SEC_CLASS",},
        "SQL-mly-tm_shop_sum": {resultProp: "tm_shop_sum"},
        "SQL-mly-months_chnl_amt": {resultProp: "months_chnl_amt"},
        "SQL-mly-months_amt_trend": {resultProp: "months_amt_trend"},
  
      }
      this.ajax_data(apiMap3);

      this.p1.then(() => {
        this.isLoading = false;
        this.Range_Single_choice("1");
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
          this.sel_title.chanzhi_wenzi.title_all = "抖音&快手";
          this.sel_title.chanzhi_wenzi.title_muban = "抖音";
          this.sel_title.chanzhi_wenzi.title_ruanti = "快手";
          this.sel_title.chanzhi_wenzi.target = "目标";
          this.sel_title.chanzhi_wenzi.reach_rate = "目标";
          this.sel_title.chanzhi_wenzi.ago_rate = "达成";
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
    },

    all_muban_ruanti(send_value) {
      this.sel_value.all_muri_value = send_value;
      this.$EventBus.$emit("all_muban_ruanti_f", {
        send_value: send_value,
        Range_set: this.sel_value.Range_set,
      });

      this.initChart();
      // 2021-09-17添加了抖音快手的列表开始
      this.DYKSListData();
      // 2021-09-17添加了抖音快手的列表结束

    },



    DYKSListData(){

      // 关于渠道细分的取数开始  
      let data_tablist= [];
      let promiselist=[]; //接口变量
      if(this.sel_value.all_muri_value==1){  
        promiselist=this.$axios.post(`/api/admin/data/${'mly'}/${'months_chnl_amt'}/get`, {}).then(({ data }) => {
          data_tablist=data;
        });
      }else if(this.sel_value.all_muri_value==2){
        promiselist=this.$axios.post(`/api/admin/data/${'mly'}/${'months_chnl_amt'}/get`, {SHOP_NAME:'林氏木业抖音小店'}).then(({ data }) => {
          data_tablist=data;
        });        
      }else if(this.sel_value.all_muri_value==3){
        promiselist=this.$axios.post(`/api/admin/data/${'mly'}/${'months_chnl_amt'}/get`, {SHOP_NAME:'林氏木业快手小店'}).then(({ data }) => {
          data_tablist=data;
        });  
      }
      this.pChartlist= Promise.all([promiselist,]);  
      

      this.pChartlist.then(() => {
        this.user_tablist=[];
        if(this.DeliverPay.target==1){
          Object.keys(data_tablist).forEach((key) => {
            this.user_tablist.push({CHANNEL_TYPE:data_tablist[key].CHANNEL_TYPE,
              TARGET:data_tablist[key].TGT_CHNL_PAY_AMT,AMT:data_tablist[key].SALE_AMT,
              RATIO:data_tablist[key].CHNL_SALE_AMT_RTO,RATE:data_tablist[key].SALE_AMT_CMPL_RTO});
          });
        }else if(this.DeliverPay.target==2){
          Object.keys(data_tablist).forEach((key) => {
            this.user_tablist.push({CHANNEL_TYPE:data_tablist[key].CHANNEL_TYPE,
              TARGET:data_tablist[key].TGT_CHNL_DLVRED_AMT,AMT:data_tablist[key].DLVR_AMT,
              RATIO:data_tablist[key].CHNL_DLVR_AMT_RTO,RATE:data_tablist[key].DLVR_AMT_CMPL_RTO});
          });
        }
        this.user_tablist=this.user_tablist.sort((a,b)=>{return Number(b["AMT"]) - Number(a["AMT"]);});


      });
      // 关于渠道细分的取数结束 


    },

    set_target_on() {

      this.p1.then(() => {

        try{


          this.load_time = (this.rTime(this.data["cpcy_overview-all_ouk_cpcy_kpi"][0]["LOAD_TIME"])).substring(0,4)+'.'
          +(this.rTime(this.data["cpcy_overview-all_ouk_cpcy_kpi"][0]["LOAD_TIME"])).substring(5,7)+'.'
          +(this.rTime(this.data["cpcy_overview-all_ouk_cpcy_kpi"][0]["LOAD_TIME"])).substring(8,10);


          // console.log("=============运行到汇总指标这里来了！！！！！！=====================");
          // console.log(this.DeliverPay);
          // console.log(this.data);

          if(this.sel_value.Range_set=='1'){
            if(this.DeliverPay.target==1){
              console.log('运行到支付口径');

              this.set_target_data.all_valeu.ago_rate = this.data["mly-tm_shop_sum"][0].SALE_AMT_CMPL_RTO;     //*  
              this.set_target_data.all_valeu.reach_rate = this.data["mly-tm_shop_sum"][0].SALE_AMT;   //*   
              this.set_target_data.all_valeu.target = this.data["mly-tm_shop_sum"][0].TGT_CHNL_PAY_AMT;    
              this.set_target_data.all_valeu.value = "4";
              this.set_target_data.muban_valeu.ago_rate = this.data["mly-tm_shop_sum"][0].DY_SALE_AMT_CMPL_RTO;     //*
              this.set_target_data.muban_valeu.reach_rate = this.data["mly-tm_shop_sum"][0].DY_SALE_AMT;   //*  
              this.set_target_data.muban_valeu.target = this.data["mly-tm_shop_sum"][0].DY_TGT_CHNL_PAY_AMT;    
              this.set_target_data.muban_valeu.value = "8";
              this.set_target_data.ruanti_valeu.ago_rate = this.data["mly-tm_shop_sum"][0].KS_SALE_AMT_CMPL_RTO;     //*   
              this.set_target_data.ruanti_valeu.reach_rate = this.data["mly-tm_shop_sum"][0].KS_SALE_AMT;  //*    
              this.set_target_data.ruanti_valeu.target = this.data["mly-tm_shop_sum"][0].KS_TGT_CHNL_PAY_AMT;    
              this.set_target_data.ruanti_valeu.value = "12"; 

            }else if(this.DeliverPay.target==2){
              console.log('运行到发货口径');

              this.set_target_data.all_valeu.ago_rate = this.data["mly-tm_shop_sum"][0].DLVR_AMT_CMPL_RTO;     //*  
              this.set_target_data.all_valeu.reach_rate = this.data["mly-tm_shop_sum"][0].DLVR_AMT;   //*   
              this.set_target_data.all_valeu.target = this.data["mly-tm_shop_sum"][0].TGT_CHNL_DLVRED_AMT;   
              this.set_target_data.all_valeu.value = "4";
              this.set_target_data.muban_valeu.ago_rate = this.data["mly-tm_shop_sum"][0].DY_DLVR_AMT_CMPL_RTO;     //*
              this.set_target_data.muban_valeu.reach_rate = this.data["mly-tm_shop_sum"][0].DY_DLVR_AMT;   //*  
              this.set_target_data.muban_valeu.target = this.data["mly-tm_shop_sum"][0].DY_TGT_CHNL_DLVRED_AMT;  
              this.set_target_data.muban_valeu.value = "8";
              this.set_target_data.ruanti_valeu.ago_rate = this.data["mly-tm_shop_sum"][0].KS_DLVR_AMT_CMPL_RTO;     //*   
              this.set_target_data.ruanti_valeu.reach_rate = this.data["mly-tm_shop_sum"][0].KS_DLVR_AMT;  //*    
              this.set_target_data.ruanti_valeu.target = this.data["mly-tm_shop_sum"][0].KS_TGT_CHNL_DLVRED_AMT;   
              this.set_target_data.ruanti_valeu.value = "12";   

            }            
          }

          

        }catch(error){ 
          console.log("========错误捕捉信息==========")
          // console.log(error)
          console.error(error);
          // this.info_error+=1;
          Information_log('品牌市场-'+((this.sel_value.Range_set=='1')?'抖音快手':(this.sel_value.Range_set=='2')?'欧康产品':'母婴概览'),'品牌市场-核心指标:  '+error.toString());
        }



      });
    },
    initChart() {
      // console.log(JSON.stringify(set_data));  这个才能看到真正的情况
      // this.$refs["chart"]
      this.chartIns = echarts.init(this.$refs["chart"]);
      // 新加的开始
      let _this = this;

      // console.log("运行到趋势图这里来了！！！！");
      // console.log(this.sel_value.all_muri_value);

      let data_use = [];
      let promise=[]; //接口变量
      if(this.sel_value.all_muri_value==1){
        promise=this.$axios.post(`/api/admin/data/${'mly'}/${'months_amt_trend'}/get`, {}).then(({ data }) => {
          data_use=data;
        });
      }else if(this.sel_value.all_muri_value==2){
        promise=this.$axios.post(`/api/admin/data/${'mly'}/${'months_amt_trend'}/get`, {SHOP_NAME:'林氏木业抖音小店'}).then(({ data }) => {
          data_use=data;
        });        
      }else if(this.sel_value.all_muri_value==3){
        promise=this.$axios.post(`/api/admin/data/${'mly'}/${'months_amt_trend'}/get`, {SHOP_NAME:'林氏木业快手小店'}).then(({ data }) => {
          data_use=data;
        }); 
      }
      this.pChart= Promise.all([promise,]);




      this.pChart.then(() => {

        try{

          this.chartIns.clear();


          let month_yong = [];
          let ago_value = []; //销售目标
          let value_use =[];  //销售业绩
          let value_rate =[]; //销售达成率

          let month_year=[];    
          // let month_yong_a = [];
          // let month_yong_b = [];
          let year_now = new Date();
          // 做T+1处理开始
          // year_now=year_now.getTime()-(24*60*60*1000);
          year_now=year_now.getTime()-(24*60*60*1000);
          year_now=new Date(year_now);
          year_now=year_now.getFullYear();


          let _time_now=new Date();
          _time_now=_time_now.getTime()-(24*60*60*1000);
          _time_now=new Date(_time_now);
          // 做T+1处理结束

          // 做M+1处理开始
          let month_m1=0;
          if((new Date()).getDate()<6){
            month_m1=(new Date()).setMonth((new Date().getMonth()-2))//一个月
          }else{
            month_m1=(new Date()).setMonth((new Date().getMonth()-1))//一个月
          }
          
          // 暂时的
          // let month_m1=(new Date()).setMonth((new Date().getMonth()-2))//一个月


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

          // console.log(data_use);

          if(this.DeliverPay.target==1){
            Object.keys(data_use).forEach((key) => {
              month_year.push(data_use[key].MDATE.substring(0,4));
              month_yong.push(((data_use[key].MDATE).substring(5,7)||0)*1+'月');
              value_use.push((data_use[key].TGT_CHNL_PAY_AMT||0)/10000);                
              ago_value.push((data_use[key].SALE_AMT||0)/10000); 
              value_rate.push((data_use[key].SALE_AMT_CMPL_RTO||0)*100); 
            });            
          }else if(this.DeliverPay.target==2){
            Object.keys(data_use).forEach((key) => {
              month_year.push(data_use[key].MDATE.substring(0,4));
              month_yong.push(((data_use[key].MDATE).substring(5,7)||0)*1+'月');
              value_use.push((data_use[key].TGT_CHNL_DLVRED_AMT||0)/10000);                
              ago_value.push((data_use[key].DLVR_AMT||0)/10000); 
              value_rate.push((data_use[key].DLVR_AMT_CMPL_RTO||0)*100); 
            });  
          }
          // console.log(month_yong);
          // console.log(ago_value);
          // console.log(value_use);
          // console.log(value_rate);
          // console.log(this.sel_value);





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
          // let day_time_set=null;
          let month_time_set=null;
          if(this.sel_value.day_7 == false && this.sel_value.day_30 == false){

            // this.barData.month=this.set_time.substring(5, 7)+"月";

            // let month_m1_test=(new Date()).setMonth((new Date().getMonth()+4))//一个月

            if((((new Date()).getMonth()+1)-1)==2){
              //M+1是2月的时候
              if((new Date()).getDate()<6){
                month_time_set='01';
              }else{
                month_time_set='02';
              }
              this.barData.month=(set_on_year)+'.'+month_time_set;
            }else{

              let set_on_time_now=_time_now;
              month_time_set=(((set_on_time_now.getMonth()+1)>9)?(set_on_time_now.getMonth()+1):'0'+(set_on_time_now.getMonth()+1));
              month_time_set=(this.change_time_on==true)?this.set_time.substring(5,7):month_time_set;
              this.barData.month=(set_on_year)+'.'+month_time_set;

            }

            // console.log("===============1111111111111111111   asdasd      adasdada===================");
            // console.log(month_time_set);
            // console.log(((new Date()).getMonth()+1)-1);
            // console.log(set_on_time_now.getMonth());



            Object.keys(month_yong).forEach((key_mv) => {
              // if(month_yong[key_mv]==(this.set_time.substring(5, 7)*1+"月")){
              if(month_yong[key_mv]==(month_time_set*1+"月")){
                this.barData.value=(value_use_on[key_mv]==null)? '--':this.fomatMoney((value_use_on[key_mv]*1).toFixed(1))+(this.sel_value.Range_set==2?'%':'万')
                this.barData.ago_value=(ago_value_on[key_mv]==null)? '--':this.fomatMoney((ago_value_on[key_mv]*1).toFixed(1))+(this.sel_value.Range_set==2?'%':'万')
                this.barData.rate=(value_rate[key_mv]==null)? '--':this.fomatMoney((value_rate[key_mv]*1).toFixed(1))+('%')
                
              }
            }); 

            if(this.barData.value===0&&this.barData.ago_value===0){

              this.barData.month=((month_year.length==2&& (month_yong[month_yong.length-1]).replace(/[^0-9]/ig,"")=='12')?set_on_year-1:set_on_year)+
              '.'+ ((month_yong[month_yong.length-1]).replace(/[^0-9]/ig,""));

              this.barData.value=this.fomatMoney(((value_use_on[value_use_on.length-1]*1)||0).toFixed(1))+(this.sel_value.Range_set==2||this.sel_value.all_muri_value==3?'%':'万')
              this.barData.ago_value=this.fomatMoney(((ago_value_on[ago_value_on.length-1]*1)||0).toFixed(1))+(this.sel_value.Range_set==2||this.sel_value.all_muri_value==3?'%':'万')
              this.barData.rate=this.fomatMoney(((value_rate[value_rate.length-1]*1)||0).toFixed(1))+('%')
                
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


          //关于双坐标轴
          let yLetMax=(Math.max(...ago_value_on)).toFixed(0);
          while (yLetMax%5!=0){yLetMax++;}  
          let yRightMax=(Math.max(...value_rate)).toFixed(0); 
          while (yRightMax%5!=0){yRightMax++;}


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
                type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
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

                if(_this.sel_value.day_7 == true || _this.sel_value.day_30 == true){
                  // _this.barData.value = params[0].value;
                  // _this.barData.ago_value = 0;
                  // _this.barData.month = params[0].axisValue;
                  _this.barData.value = (params[1]==undefined||params[1].value==undefined)?'--':
                    (_this.fomatMoney(params[1].value)+(_this.sel_value.Range_set==2?'%':'万'));
                  _this.barData.ago_value = (params[0]==undefined||params[0].value==undefined)?'--':
                    (_this.fomatMoney(params[0].value)+(_this.sel_value.Range_set==2?'%':'万'));
                  _this.barData.month =((month_year.length==2&&params[0].axisValue.substring(0,2)=='12')?year_now-1:year_now)+'-'+((params[0].axisValue==undefined)?0:params[0].axisValue);
                
                }else{

                  // _this.barData.value = (params[1]==undefined||params[1].value==undefined)?'--':
                  //   (_this.fomatMoney((params[1].value*1).toFixed(1))+(_this.sel_value.Range_set==2?'%':'万'));
                  // _this.barData.ago_value = (params[0]==undefined||params[0].value==undefined)?'--':
                  //   (_this.fomatMoney((params[0].value*1).toFixed(1))+(_this.sel_value.Range_set==2?'%':'万'));
                  // _this.barData.rate = (params[2]==undefined||params[2].value==undefined)?'--':
                  //   (_this.fomatMoney((params[2].value*1).toFixed(1))+('%'));    
                  _this.barData.month = ((params[0].axisValue==undefined)?'--':
                    set_on_year+'.'+((params[0].axisValue).replace(/[^0-9]/ig,"")>9?(params[0].axisValue).replace(/[^0-9]/ig,""):
                    '0'+(params[0].axisValue).replace(/[^0-9]/ig,"")));
                  
                  _this.barData.ago_value = (params[0]==undefined||params[0].value==undefined)?'--':
                    (_this.fomatMoney((params[0].value*1).toFixed(1))+(_this.sel_value.Range_set==2?'%':'万'));
                  _this.barData.rate = (params[1]==undefined||params[1].value==undefined)?'--':
                    (_this.fomatMoney((params[1].value*1).toFixed(1))+('%')); 

                }

              },
            },
            xAxis: {
              type: "category",
              // boundaryGap: false,
              boundaryGap: true,  //柱子是否中间
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
            yAxis: [
              {
                max:yLetMax,
                min:0,
                splitNumber:5,
                interval:((yLetMax-0)/5),
                type: "value",
                name:'业绩/发货量',
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
              {
                max:yRightMax,
                min:0,
                splitNumber:5,
                interval:((yRightMax-0)/5),
                type: "value",
                name:'达成率',
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
                  formatter:"{value} %",
                },                
              },

            ],

            series: [
              {
                name: "业绩",
                // showSymbol: false,
                showSymbol: (showSymbol_ago==1)? true:false,
                smooth: false, //true 为平滑曲线，false为直线
                // symbol: 'circle',     //设定为实心点
                // symbolSize: 2,   //设定实心点的大小
                itemStyle: {
                  color: "#919191",

                  normal: {
                    // color: "#F5A028",
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
                // data:
                //   this.sel_value.day_7 == false && this.sel_value.day_30 == false
                //     ? ago_value_on
                //     : ago_value,
                data:ago_value_on,
                // type: "line",
                type: "bar",
                barWidth:'50%',
                areaStyle: {},
              },

              // {
              //   name: "当期",
              //   // showSymbol: false,
              //   showSymbol: (showSymbol_period==1)? true:false,
              //   smooth: false, //true 为平滑曲线，false为直线
              //   // symbol: 'circle',     //设定为实心点
              //   // symbolSize: 2,   //设定实心点的大小
              //   itemStyle: {
              //     color: "#0938F7",
              //     normal: {
              //       color: "#1678FF",
              //       lineStyle: {
              //         color: "#1678FF",
              //         width: 2, //设置线条粗细
              //       },
              //       areaStyle: {
              //         color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              //             {
              //               offset: 0,
              //               color: "rgba(22,120,255, 0)",
              //             },
              //             {
              //               offset: 0.1,
              //               color: "rgba(22,120,255, 0)",
              //             },
              //             {
              //               offset: 0.6,
              //               color: "rgba(22,120,255, 0.1)",
              //             },
              //             {
              //               offset: 1,
              //               color: "rgba(22,120,255, 0.1)",
              //             },
              //         ]),
              //       },
              //     },
              //   },
              //   data:
              //     this.sel_value.day_7 == false && this.sel_value.day_30 == false
              //       ? value_use_on
              //       : value_use,
              //   type: "bar",
              //   areaStyle: {},
              // },


              {
                name: "达成率",
                // showSymbol: false,
                showSymbol: (showSymbol_period==1)? true:false,
                yAxisIndex:1,

                smooth: false, //true 为平滑曲线，false为直线
                // symbol: 'circle',     //设定为实心点
                // symbolSize: 2,   //设定实心点的大小
                itemStyle: {
                  color: "#0938F7",

                  normal: {
                    // color: "#66ccff",
                    color: "#F5A028",
                    // color: "rgba(105,156,254,0.8)",
                    lineStyle: {
                      color: "#F5A028",
                      // color: "rgba(105,156,254,0.8)",

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
                data:value_rate,
                type: "line",
                // type: "bar",
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


    collapse_change(set_name,set_num,type_name) {

      if(this.activeNames==set_num){

        let _this = this;
        setTimeout(function name() {
          _this.DYKSChartList(set_name,type_name);
        }, 10);        

      }


    },


    DYKSChartList(set_name,type_name) {

      // console.log("========运行到选择函数这里！！！！！！！==========");
      // console.log(set_name);
      // console.log(this.$refs);

      let data_tablist= [];
      let promiselist=[]; //接口变量
      if(this.sel_value.all_muri_value==1){  
        promiselist=this.$axios.post(`/api/admin/data/${'mly'}/${'months_chnl_amt_trend'}/get`, {CHANNEL_TYPE:type_name}).then(({ data }) => {
          data_tablist=data;
        });
      }else if(this.sel_value.all_muri_value==2){
        promiselist=this.$axios.post(`/api/admin/data/${'mly'}/${'months_chnl_amt_trend'}/get`, {CHANNEL_TYPE:type_name,SHOP_NAME:'林氏木业抖音小店'}).then(({ data }) => {
          data_tablist=data;
        });        
      }else if(this.sel_value.all_muri_value==3){
        promiselist=this.$axios.post(`/api/admin/data/${'mly'}/${'months_chnl_amt_trend'}/get`, {CHANNEL_TYPE:type_name,SHOP_NAME:'林氏木业快手小店'}).then(({ data }) => {
          data_tablist=data;
        });  
      }
      this.DYKSChartLiO= Promise.all([promiselist,]); 


      // let _this = this;
      let user_data = [];

      let user_time = [];
      let mtd_pay_amt = [];
      let mtd_ago_amt = [];
      let value_rate = [];

      

      this.DYKSChartLiO.then(() => {

        this.chartIns_ = echarts.init(this.$refs[set_name][0]);
        if(this.echarts2_clear==true){
          this.chartIns_.clear();
          this.echarts2_clear=false;         
        }
        // this.chartIns_.clear();


        // console.log(type_name);
        // console.log(data_tablist);
        user_data=data_tablist;


        user_data.sort((a, b) => {
          let a_time = "";
          let b_time = "";
          // if (this.sel_value.yjdcqs.yjdcqs_pd == "1") {
          //   a_time = Number(a["USER_TIME"]);
          //   b_time = Number(b["USER_TIME"]);
          // } else if (this.sel_value.yjdcqs.yjdcqs_pd == "2") {}
          a_time = new Date(a["MDATE"].substring(0,10)).getTime(new Date(a["MDATE"].substring(0,10)));
          b_time = new Date(b["MDATE"].substring(0,10)).getTime(new Date(b["MDATE"].substring(0,10)));
          
          return a_time - b_time;
        });

        // console.log(user_data);



        if(this.DeliverPay.target==1){
          Object.keys(user_data).forEach((key_user) => {
            user_time.push(user_data[key_user]["MDATE"].substring(5,7)*1+'月');
            mtd_pay_amt.push(
              ((user_data[key_user]["TGT_CHNL_PAY_AMT"]||0)/10000)
            );  //目标业绩
            mtd_ago_amt.push(
              ((user_data[key_user]["SALE_AMT"]||0)/10000)
            );  //累计业绩
            value_rate.push(
              ((user_data[key_user]["SALE_AMT_CMPL_RTO"]||0)*100)
            ); //完成率
          });
        }else if(this.DeliverPay.target==2){
          Object.keys(user_data).forEach((key_user) => {
            user_time.push(user_data[key_user]["MDATE"].substring(5,7)*1+'月');
            mtd_pay_amt.push(
              ((user_data[key_user]["TGT_CHNL_DLVRED_AMT"]||0)/10000)
            );  //目标业绩
            mtd_ago_amt.push(
              ((user_data[key_user]["DLVR_AMT"]||0)/10000)
            );  //累计业绩
            value_rate.push(
              ((user_data[key_user]["DLVR_AMT_CMPL_RTO"]||0)*100)
            ); //完成率
          });
        }



        // Object.keys(user_time).forEach((key_user) => {
        //   user_time[key_user]=(user_time[key_user]).substring(0,2)*1+'.'+(user_time[key_user]).substring(3,5)*1
        // });

        //关于双坐标轴
        let yLetMax=(Math.max(...mtd_ago_amt)).toFixed(0); 
        while (yLetMax%5!=0){yLetMax++;}  
        let yRightMax=(Math.max(...value_rate)).toFixed(0);
        while (yRightMax%5!=0){yRightMax++;}  
        // console.log(yLetMax.sort((a,b)=>{return b-a}));
        // console.log(yRightMax.sort((a,b)=>{return b-a}));


        this.chartIns_.setOption({
          grid: {
            left: "2%",
            top: "5%",
            right: "2%",
            bottom: "0%",
            containLabel: true,
          },
          
          animation:true,    //设置是否开启动画
          //动画加载时长为3秒
          animationDuration: 1000,          

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
            padding: [2, 5, 2, 5],

            position:function(point, params, dom, rect, size){
              // 提示框位置
              let x=0;  //x坐标位置
              let y=0;  //y坐标位置
              // 当前鼠标位置
              let pointX=point[0];
              let pointY=point[1];
              // 外层div大小
              // let viewWidth = size.viewSize[0];
              // let viewHeight = size.viewSize[1];
              // 提示框大小
              let boxWidth = size.contentSize[0];
              let boxHeight = size.contentSize[1];
              // boxWidth > pointX 说明鼠标左边放不下提示框
              if (boxWidth > pointX) {
                x = pointX + 10;
              }else {
                // 左边放的下
                x = pointX - boxWidth-10;
                // x = pointX -30;
              }
              // boxHeight > pointY 说明鼠标上边放不下提示框
              if (boxHeight > pointY) {
                y = 5;
              }else{
                // 上边放得下
                y = pointY - boxHeight;
              }
              return[((x>150)?100:x),y];
            },

            axisPointer: {
              // type: "cross",
              type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
              label: {
                color: "#000000",
                backgroundColor: "aliceblue",
              },
            },
            hideDelay: 3000,

            textStyle:{
              align:'left'
            },

            formatter:function (params) {
              // _this.barData.value = params[0].value;
              // _this.barData.ago_value = params[0].value;
              // _this.barData.month = params[0].axisValue;
              // console.log(params);
              // return "日期："+params[0].axisValue+'<br/> 目标：'+params[0].marker+params[0].value.toFixed(1)+'万'+
              //   '<br/> 业绩：'+params[1].marker+params[1].value.toFixed(1)+'万'+
              //   '<br/> 完成率：'+params[2].marker+params[2].value.toFixed(1)+'%';

              return "日期："+params[0].axisValue+
                '<br/> 业绩：'+params[0].marker+params[0].value.toFixed(1)+'万'+
                '<br/> 完成率：'+params[1].marker+params[1].value.toFixed(1)+'%';
            }

          },

          xAxis: {
            type: "category",
            // boundaryGap: false,
            boundaryGap: true,  //柱子是否中间
            data: user_time,

            axisLine: {
              lineStyle: {
                color: "#ccc",
              },
            },
            axisLabel: {
              interval: 'auto',
            },

          },
          yAxis: [
            {
              // mtd_ago_amt
              type: "value",
              max:yLetMax,
              min:0,
              splitNumber:5,
              interval:((yLetMax-0)/5),
              name: "业绩",
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

            {
              // value_rate
              type: "value",
              max:yRightMax,
              min:0,
              splitNumber:5,
              interval:((yRightMax-0)/5),
              name:'达成率',
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
                formatter:"{value} %",
              },                
            },

          ],

          series: [

            // {
            //   name: "目标",
            //   showSymbol: false,
            //   smooth: true, //true 为平滑曲线，false为直线
            //   itemStyle: {
            //     color: "#0938F7",
            //     normal: {
            //       color: "#1678FF",
            //       lineStyle: {
            //         color: "#1678FF",
            //         width: 2, //设置线条粗细
            //       },
            //       areaStyle: {
            //         color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            //           {
            //             offset: 0,
            //             color: "rgba(6,69,165, 0.01)",
            //           },
            //           {
            //             offset: 1,
            //             color: "rgba(6,69,165, 0.05)",
            //           },
            //         ]),
            //       },
            //     },
            //   },
            //   data: mtd_pay_amt,
            //   type: "bar",
            //   // type: "line",
            //   areaStyle: {},
            // },

            {
              name: "业绩",
              showSymbol: false,
              smooth: true, //true 为平滑曲线，false为直线
              itemStyle: {
                color: "#0938F7",
                normal: {
                  // color: "#F5A028",
                  color: "#1678FF",
                  lineStyle: {
                    // color: "#F5A028",
                    color: "#1678FF",
                    width: 2, //设置线条粗细
                  },
                  areaStyle: {
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
              type: "bar",
              barWidth:'50%',
              // type: "line",
              areaStyle: {},
            },

            {
              name: "完成率",
              yAxisIndex:1,
              showSymbol: false,
              smooth: true, //true 为平滑曲线，false为直线
              itemStyle: {
                color: "#0938F7",
                normal: {
                  color: "#F5A028",
                  // color: "rgba(105,156,254,0.8)",
                  lineStyle: {
                    color: "#F5A028",
                    // color: "rgba(105,156,254,0.8)",
                    width: 2, //设置线条粗细
                  },
                  areaStyle: {
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
              data: value_rate,
              // type: "bar",
              type: "line",
              areaStyle: {},
            },


          ],
        });
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


    Single_choice_qie(value, josn_value, target_value, for_value) {
      var _this = this;
      _this.show; //意义不大 防止定义不调用出现的报错
      for_value = eval(for_value);

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

.title_change {
  color: #23b0a8;
}


#aaaaa {
  padding-left: 10px;
  padding-right: 10px;
  font-size: 12px;
}

/deep/ #aaaaa div .van-cell{
  // background: #0066ff;
  padding-left: 5px;
  padding-right: 5px;
  //   padding: 0px;
  border-radius: 4px;
  background: rgb(247, 247, 247);
  font-size: 12px;
} 

/deep/ #aaaaa div .van-cell .van-cell__right-icon{

  margin-right: 13px;
  margin-left: 0px;

}

/deep/ #aaaaa div .van-collapse-item__wrapper .van-collapse-item__content{
  background: rgb(247, 247, 247);
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 0px;
  padding-bottom: 10px;

}
</style>

