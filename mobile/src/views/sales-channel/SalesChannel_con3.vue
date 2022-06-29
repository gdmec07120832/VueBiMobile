<template>
  <div class="Productmarket_all" >

    <van-popup
      get-container="body"
      v-model="show"
      position="bottom"
      :style="{ height: '50%', overflow: 'hidden' }"
    >

      <!-- @change="onChange" -->
      <van-picker
        title="选择年月"
        show-toolbar
        :columns="TrendMonth"
        :default-index="TMonthIndex"
        @confirm="onConfirm"
        @cancel="onCancel"

      />

    </van-popup>


    <!-- 滑屏开始 style="background: rgb(245, 245, 245)"-->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">

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
      <!-- <van-notice-bar
      style="padding-left: 10px;padding-right: 10px;padding-top: 10px;padding-bottom: 10px;"
        wrapable
        :scrollable="false"
        color="#999999"
        background="rgba(245, 245, 245, 1)"
        :text="'更新时间：' + '2020-10-22'"
      /> -->


      
      <!-- 添加了加载项结束 -->
      

      <section
        style="padding-top: 5px; padding-bottom: 0px; border-radius: 4px; ;margin-left: 10px;margin-right: 10px;margin-bottom: 5px;"
      >
        <div class="" style="padding-left: 0px; padding-bottom: 0px;color: #999999;font-size: 12px;display: flex;justify-content: space-between;">
          {{'更新时间：' + data_load_time}}
          <span @click="showPopup"><i style="font-style: normal;color:#4395ff;padding-right: 4px;">口径说明</i>
            <i style="float: right;margin-top: 0px;"><van-icon name="question-o" color="rgb(153, 153, 153)" size="14" /></i>
          </span>
        </div>



        <van-popup v-model="question_show" @close='showPopup_close' class="popup_css" get-container="body">
          <div class="kjsm_bg">
            <p style="margin: 0 auto;">口径说明</p>
          </div> 
          <div style="text-align: left;font-size: 14px;padding-left: 20px;
            padding-right: 20px;padding-bottom: 20px;line-height: 23px; color:#555555;">

            <p style="font-weight: bold;">
                <i style="width: 5px;height: 16px;background-color: #23B0A8;display: block;float: left;margin-right: 5px;margin-top: 3px;border-radius: 4px;"></i>
                <span style="color: #000000;">更新频率</span></p>
              <!-- <p style="margin-bottom: 20px;margin-top: 5px;">30分钟更新一次</p> -->

              <p style="margin-bottom: 0px;margin-top: 5px;">①拆单率：T+1(数据截止到昨天)</p>
              <p style="margin-bottom: 0px;margin-top: 5px;">②期货分布：T+1(数据截止到昨天)</p>
              <p style="margin-bottom: 20px;margin-top: 5px;">③其它指标均30分钟更新一次</p>

              
            <p style="font-weight: bold;">
              <i style="width: 5px;height: 16px;background-color: #23B0A8;display: block;float: left;margin-right: 5px;margin-top: 3px;border-radius: 4px;"></i>
              <span style="color: #000000;">逻辑说明</span></p>

            <!-- <p>订单处理时效从客单--清货阶段，过程平均总耗时</p> -->


            <van-collapse v-model="activeNames_tips" accordion>
              <van-collapse-item title="订单处理耗时" name="1">
                订单处理时效从客审--清货阶段，过程平均总耗时
              </van-collapse-item>
              <van-collapse-item title="订单整体耗时" name="2">
                订单处理时效从支付--签收阶段，过程平均总耗时
              </van-collapse-item>
              <van-collapse-item title="发货及时率" name="3">
                及时发货金额（承诺发货时间-发货时间≥0 ）/发货业绩
              </van-collapse-item>

              <van-collapse-item title="拆单率" name="4">
                <p>①剔除采购经销（不剔除网拍订单），剔除全为赠品的批次单</p>
                <p>②合并单只有单个批次单不是拆单</p>
                <p>③合并单各个批次单的发货时间相同，不是影响成本拆单</p>
                <p>④客户原因、仓库原因以及发运原因导致拆单的，不是影响成本拆单</p>
              </van-collapse-item>
            </van-collapse>


          </div>
        </van-popup>



      </section>

      <!-- <p
          style="
            padding: 0px;
            margin: 0px;
            padding-left: 10px;
            font-size: 12px;
            padding-top: 5px;padding-bottom: 5px;
          "
        >
          {{ sel_title.chanzhi_wenzi.title_all }}
      </p> -->



      <!-- 2021-02-27添加了两个重要指标 承诺-->

      <section
        style="
          padding-top: 0px;
          padding-bottom: 16px;
          padding-bottom: 10px;
          background: #ffffff;
          border-radius: 4px;
          margin-left: 10px;
          margin-right: 10px;
          margin-bottom: -4px;
        "
      >
          <!-- 2021-02-24时间新加的样式开始 -->
          <van-row type="flex" justify="center" style="padding-top: 10px;padding-left: 10px;padding-right: 10px;">


            <van-col
              span="11" 
              @click="Single_choice('ztfb',['_this.InitChartState()','_this.initChart4()','_this.DeliveryDistChart()'],true,'_this.sel_value.qhzt_fb')"

              style="border-radius: 4px;"
              :style="
                sel_value.qhzt_fb.ztfb
                  ? whole_css.zffhyjkj
                  : whole_css.zffhyjkj_n
              "
            >
              订单状态分布</van-col
            >       

            
            <van-col
              span="11" offset="2"
              @click="Single_choice('hqfb',['_this.InitChartState()','_this.initChart4()','_this.DeliveryDistChart()'],true,'_this.sel_value.qhzt_fb')"

              style="border-radius: 4px;"
              :style="
                sel_value.qhzt_fb.hqfb 
                  ? whole_css.zffhyjkj
                  : whole_css.zffhyjkj_n
              "
            >
              货审期货分布</van-col
            >



          </van-row>
          <!-- 2021-02-24时间新加的样式结束 -->      
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
          margin-bottom: 0px;
          height: 138px;
        "
        :style="sel_value.qhzt_fb.hqfb?{'display': 'block'}:{'display': 'none'}"
      >

        <div class="target_info stress_value"> 
          <div class="stress_body" style="padding-bottom: 0px;">
            <p class="stress_p">承诺本月发货</p>
            <!-- <span></span>  <br/>待货审金额-->
            <p class="stress_t" style="padding-top: 4px;">
            {{
              fomatMoney((sel_title.quota_value.cont7/10000).toFixed(1)*1)+"万"||0
            }}</p>
            <p style="margin: 0 auto;padding-top: 0px;">
              <span>占比：</span>
              <span>{{((sel_title.quota_value.cont10*100).toFixed(1))+"%"||0}}</span>
            </p>
          </div>

          <div class="stress_body" style="padding-bottom: 0px;">
            <p class="stress_p">承诺次月发货</p>
            <!-- <span></span>  <br/>待货审金额-->
            <p class="stress_t" style="margin-top: 4px;border-right: 1px solid #eeeeee;border-left: 1px solid #eeeeee;">
              {{
                fomatMoney((sel_title.quota_value.cont8/10000).toFixed(1)*1)+"万"||0
              }}
              
            </p>
            <p style="margin: 0 auto;padding-top: 0px;">
              <span>占比：</span>
              <span>{{((sel_title.quota_value.cont11*100).toFixed(1))+"%"||0}}</span>
            </p>
          </div>

          <div class="stress_body" style="padding-bottom: 0px;">
            <p class="stress_p">其它承诺发货</p>
            <!-- <span></span>  <br/><span style="color:#ffffff;">.</span>-->
            <p class="stress_t" style="padding-top: 4px;">
              {{
                fomatMoney((sel_title.quota_value.cont9/10000).toFixed(1)*1)+"万"||0
              }}
              
            </p>
            <p style="margin: 0 auto;padding-top: 0px;">
              <span>占比：</span>
              <span>{{((sel_title.quota_value.cont12*100).toFixed(1))+"%"||0}}</span>
            </p>
          </div>

          <div style="clear: both;"></div>
        </div>  




        <div class="target_info stress_value" style="padding-top: 5px;"> 
          
          <div class="stress_body" style="padding-top: 8px;">
            <p class="stress_p">订单整体耗时</p>
            <!-- <span></span>  <br/>待货审金额-->
            <p class="stress_t" style="margin-top: 4px;">
              {{
                (sel_title.quota_value.cont14||0).toFixed(1)+'天'
              }}
              
            </p>
            <!-- <p style="margin: 0 auto;padding-top: 10px;">
              <span>占比：</span>
              <span>{{((sel_title.quota_value.cont11*100).toFixed(1))+"%"||0}}</span>
            </p> -->
          </div>          
          
          
          <div class="stress_body" style="padding-top: 8px;">
            <p class="stress_p">发货及时率</p>
            <!-- <span></span>  <br/>待货审金额-->
            <p class="stress_t" style="padding-top: 4px;border-right: 1px solid #eeeeee;border-left: 1px solid #eeeeee;">
            {{
              fomatMoney((sel_title.quota_value.cont13*100).toFixed(1))+"%"||0
            }}</p>
            <!-- <p style="margin: 0 auto;padding-top: 10px;">
              <span>占比：</span>
              <span>{{((sel_title.quota_value.cont10*100).toFixed(1))+"%"||0}}</span>
            </p> -->
          </div>


          <div class="stress_body" style="padding-top: 8px;">
            <p class="stress_p">拆单率</p>
            <!-- <span></span>  <br/><span style="color:#ffffff;">.</span>-->
            <p class="stress_t" style="padding-top: 4px;">
              {{
                fomatMoney((sel_title.quota_value.cont15*100).toFixed(1))+"%"||0
              }}
              
            </p>
            <!-- <p style="margin: 0 auto;padding-top: 10px;">
              <span>占比：</span>
              <span>{{((sel_title.quota_value.cont12*100).toFixed(1))+"%"||0}}</span>
            </p> -->
          </div>

          <div style="clear: both;"></div>
        </div>  





      </section>
      <!-- 2021-02-27添加了两个重要指标 style="float: left;" style="float: right;" -->



      <section
        style="
          padding-top: 0px;
          padding-bottom: 16px;
          padding-bottom: 0px;
          background: #ffffff;
          border-radius: 4px;
          margin-left: 10px;
          margin-right: 10px;
          height: 162px;
        "
        :style="sel_value.qhzt_fb.ztfb?{display: 'block'}:{display: 'none'}"
      >
      
        <van-row 
          :style="
            sel_value.theme.ouk ? whole_css.yjdc_yjkj : whole_css.yjdc_yjkj_n
          "
          
        >
          <van-col
            span="11" 
            @click="
              Single_choice(
                'zffhyjkj_set_pd',
                ['_this.data_screen_quota()', '_this.initChart_Dashboard()'],
                '1',
                '_this.sel_value.zffhyjkj_set'
              )
            "
            style="border-radius: 4px;"
            :style="
              sel_value.zffhyjkj_set.zffhyjkj_set_pd == '1'
                ? whole_css.zffhyjkj
                : whole_css.zffhyjkj_n
            "
          >
            支付口径</van-col
          >
          <van-col
            span="11" offset="2"
            @click="
              Single_choice(
                'zffhyjkj_set_pd',
                ['_this.data_screen_quota()', '_this.initChart_Dashboard()'],
                '2',
                '_this.sel_value.zffhyjkj_set'
              )
            "
            style="border-radius: 4px;"
            :style="
              sel_value.zffhyjkj_set.zffhyjkj_set_pd == '2'
                ? whole_css.zffhyjkj
                : whole_css.zffhyjkj_n
            "
          >
            发货口径</van-col
          >
        </van-row>


        <div class="target_info">
          <van-row class="target_info_body" style="padding-left: 0px;padding-right: 0px;padding-top: 3px;">

            <van-col span="8">
              <i class="target_info_text_i">
                <span>{{
                  sel_title.chanzhi_wenzi.title_content.content1
                }}</span></i
              >
              <span class="target_info_text_span">{{
                ((sel_title.quota_value.cont1/10000).toFixed(1)*1).toLocaleString()+"万"||0
              }}</span>
              <!-- <span>占比：</span> -->
              <p class="TagRatio">占比：<span>{{sel_title.quota_value.cont16+'%'}}</span></p>
            </van-col>


            <van-col
              span="8"
              style=""
            >

              <i class="target_info_text_i"
                ><span>{{
                  sel_title.chanzhi_wenzi.title_content.content2
                }}</span></i
              >
              <span class="target_info_text_span" style="border-right: 1px solid #eeeeee;border-left: 1px solid #eeeeee;">{{
                ((sel_title.quota_value.cont2/10000).toFixed(1)*1).toLocaleString()+"万"||0
              }}</span>
              <p class="TagRatio">占比：<span>{{sel_title.quota_value.cont17+'%'}}</span></p>

            </van-col>

            <van-col span="8">

              <i class="target_info_text_i"
                ><span>{{
                  sel_title.chanzhi_wenzi.title_content.content3
                }}</span></i
              >
              <span class="target_info_text_span" 
              :style="sel_value.Range_on.Range_set=='3'?  {'color':'#000000'}
              :Number((sel_title.quota_value.cont3.toString()).replace('%', ''))>=100? {'color':'red'}:{'color':'#008000'}">{{
                sel_value.Range_on.Range_set=='3'? fomatMoney(sel_title.quota_value.cont3):sel_title.quota_value.cont3
              }}</span>
              <p class="TagRatio">占比：<span>{{sel_title.quota_value.cont18+'%'}}</span></p>

            </van-col>
          </van-row>

          <van-row class="target_info_body" style="padding-top: 0px">
            <van-col span="8">
              <i class="target_info_text_i">
                <span>{{
                  sel_title.chanzhi_wenzi.title_content.content4
                }}</span></i
              >             
              <span class="target_info_text_span">{{
                fomatMoney((sel_title.quota_value.cont4/10000).toFixed(1))+"万"||0
              }}</span>
              <p class="TagRatio">占比：<span>{{sel_title.quota_value.cont19+'%'}}</span></p>
            </van-col>
            <van-col
              span="8"
              style=""
            >
              <i class="target_info_text_i"
                ><span>{{
                  sel_title.chanzhi_wenzi.title_content.content5
                }}</span></i
              >
              <span class="target_info_text_span" style="border-right: 1px solid #eeeeee;border-left: 1px solid #eeeeee;">{{
                ((sel_title.quota_value.cont5/10000).toFixed(1)*1).toLocaleString()+"万"||0
              }}</span>
              <p class="TagRatio">占比：<span>{{sel_title.quota_value.cont20+'%'}}</span></p>
            </van-col>

            <van-col span="8">
              <i class="target_info_text_i"
                ><span>{{
                  sel_title.chanzhi_wenzi.title_content.content6
                }}</span></i
              >              
              <span class="target_info_text_span" 
              :style="sel_value.Range_on.Range_set=='3'?  {'color':'#000000'}
              :sel_value.Range_on.Range_set=='2'? Number((sel_title.quota_value.cont6.toString()).replace('%', ''))>=100? {'color':'red'}:{'color':'#008000'}
              :Number((sel_title.quota_value.cont6.toString()).replace('%', ''))>0? {'color':'red'}:{'color':'#008000'}">{{
                (sel_value.Range_on.Range_set=='3')? fomatMoney(sel_title.quota_value.cont6.toString())+'天':fomatMoney(sel_title.quota_value.cont6.toString())
              }}</span>
              <!-- <p class="TagRatio">占比：<span>{{sel_title.quota_value.cont21+'%'}}</span></p> -->
            </van-col>
          </van-row>
        </div>


        <!-- 仪表盘开始
        <div
          
          :style="
            sel_value.theme.ouk ? chart_css.dashboard : chart_css.dashboard_n
          "
        >
          <div
            ref="chart_dashboard"
            style="height: 130px; float: left"
            :style="{'width':(canvas_css.width*0.5)+'px'}"
          ></div>
          <div style="height: 130px; float: left"
               :style="{'width':(canvas_css.width*0.5)+'px'}"
          >
            <div class="dashboard_title" style="margin-top: 15px">
              <p style="font-size: 12px;color: #6f6f6f;">剩余业绩金额</p>
              <p style="color: #000000;font-size: 16px; ">
                {{ fomatMoney((sel_title.ybb_value.cont1/10000).toFixed(1))+'万' }}
              </p>
            </div>

            <div class="dashboard_title">
              <p style="font-size: 12px;color: #6f6f6f;">剩余日均目标</p>
              <p style="color: #000000;font-size: 16px; ">
                {{ fomatMoney((sel_title.ybb_value.cont2/10000).toFixed(1))+'万' }}
              </p>
            </div>
          </div>
        </div> -->
        <!-- 仪表盘结束 -->
        <div
          v-if="sel_value.theme.ouk == false"
          style="clear: both; height: 10px"
        ></div>
        <div v-else style="clear: both"></div>
      </section>


      <!-- <van-notice-bar
        v-if="sel_value.theme.cpcy == true"
        wrapable
        style="padding: 5px"
        :scrollable="false"
        color="rgba(245, 245, 245, 1)"
        background="rgba(245, 245, 245, 1)"
        text=""
      /> -->

      <p
        :style="sel_value.theme.cpcy ?{display: 'block'}:{display: 'none'}"
        style="padding: 0px; margin: 0px; padding-left: 10px; font-size: 12px;padding-top: 5px;padding-bottom: 5px;"
      >
          业绩分类
      </p>
      <section
        :style="
          sel_value.theme.cpcy ? chart_css.yjfl_css : chart_css.yjfl_css_n
        "
      >
        <!-- 切换优化开始 -->
        <van-row
          gutter=""
          type="flex"
          style="padding-left: 10px; padding-top: 0px"
        >
          <van-col
            span="5"
            @click="
              Single_choice(
                'qudao_guanj_pd',
                ['_this.data_screen_quota()'],
                '1',
                '_this.sel_value.qudao_guanjan'
              )
            "
            :style="
              sel_value.qudao_guanjan.qudao_guanj_pd == '1'
                ? whole_css.qudao_guanjan: whole_css.qudao_guanjan_n"
            style="margin-right: 1.5%; border-radius: 4px;"
          >
          
            <div style="padding: 4px; text-align: center; font-size: 12px">
              渠道类型
            </div>
          </van-col>
          <van-col
            span="5"
            @click="
              Single_choice(
                'qudao_guanj_pd',
                ['_this.data_screen_quota()'],
                '2',
                '_this.sel_value.qudao_guanjan'
              )
            "
            :style="
              sel_value.qudao_guanjan.qudao_guanj_pd == '2'
                ? whole_css.qudao_guanjan: whole_css.qudao_guanjan_n"
            style="margin-right: 10px; border-radius: 4px;"
          >
            <!--  -->
            <div style="padding: 4px; text-align: center; font-size: 12px">
              关键店铺
            </div>
          </van-col>
        </van-row>
        <div style="clear: both"></div>
        <!-- 切换优化结束 -->

        <!-- 具体表格开始 -->
        <ul
          class="table_all"
          style="
            margin-top: 10px;
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
              <li>渠道类型</li>
              <li>今日业绩</li>
              <li>达成率</li>
              <li>同比</li>
            </ul>
          </li>

          <li
            class="table_content"
            v-for="(val, key) in sel_title.yjfl_value"
            :key="key"
          >
            <ul>
               <!-- ((sel_title.quota_value.cont5/10000).toFixed(2)*1).toLocaleString()+"万"||0 -->
              <li>{{ val.CHANNEL }}</li>
              <li>{{ fomatMoney((val.SALE_AMT/10000).toFixed(1))+"万"||0.0 }}</li>
              <!-- <li>""</li> -->
              <li>{{ (val.FINISH_RATE * 100).toFixed(1) + "%" }}</li>

              <li :class="Number((val.AGO_GROWTH_RATE + '').replace('%', '')) > 0
                    ? 'rate-up_sales'
                    : 'rate-down_sales'">
                <!-- <i style="font-style: normal;" > {{ ((val.AGO_GROWTH_RATE * 100)).toFixed(1) + "%" }}</i> -->
                <i style="font-style: normal;" > {{ (val.AGO_GROWTH_RATE * 100)>999? ((val.AGO_GROWTH_RATE * 100)/10000).toFixed(2)+'w%':(val.AGO_GROWTH_RATE * 100).toFixed(1)+'%' }}</i>
              </li>
              <!-- <li>""</li> -->
            </ul>
          </li>

          <li style="clear: both"></li>
        </ul>

        <!-- 具体表格结束 -->
      </section>

      <!-- 实时业绩趋势开始 -->
      <!-- <van-notice-bar
        v-if="sel_value.theme.cpcy == true"
        wrapable
        style="padding: 5px"
        :scrollable="false"
        color="rgba(245, 245, 245, 1)"
        background="rgba(245, 245, 245, 1)"
        text=""
      /> -->
      <p
        :style="sel_value.theme.cpcy ?{display: 'block'}:{display: 'none'}"
        style="padding: 0px; margin: 0px; padding-left: 10px; font-size: 12px;padding-top: 5px;padding-bottom: 5px;"
      >
        业绩趋势
      </p>
      <!--  -->
      <section>
        <div
          :style="
            sel_value.theme.cpcy ? chart_css.yjfl_css : chart_css.yjfl_css_n
          "
        >


          <!-- 切换优化开始 -->
          <van-row
            gutter=""
            type="flex"
            style="padding-left: 10px; padding-top: 0px"
          >
            <van-col
              span="5"
              @click="
                Single_choice(
                  'ssyjqs_pd',
                  ['_this.initChart()'],
                  '1',
                  '_this.sel_value.ssyjqs'
                )
              "
              :style="
                sel_value.ssyjqs.ssyjqs_pd == '1'
                  ?  whole_css.qudao_guanjan: whole_css.qudao_guanjan_n"
              style="margin-right: 1.5%; border-radius: 4px;"
            >
              <div style="padding: 4px; text-align: center; font-size: 12px">
                全渠道
              </div>
            </van-col>
            <van-col
              span="5"
              @click="
                Single_choice(
                  'ssyjqs_pd',
                  ['_this.initChart()'],
                  '2',
                  '_this.sel_value.ssyjqs'
                )
              "
              :style="
                sel_value.ssyjqs.ssyjqs_pd == '2'
                  ? whole_css.qudao_guanjan : whole_css.qudao_guanjan_n"
              style="margin-right: 1.5%; border-radius: 4px;"
            >
              <div style="padding: 4px; text-align: center; font-size: 12px">
                线上渠道
              </div>
            </van-col>

            <van-col
              span="5"
              @click="
                Single_choice(
                  'ssyjqs_pd',
                  ['_this.initChart()'],
                  '3',
                  '_this.sel_value.ssyjqs'
                )
              "
              :style="
                sel_value.ssyjqs.ssyjqs_pd == '3'
                  ? whole_css.qudao_guanjan: whole_css.qudao_guanjan_n"
              style="margin-right: 1.5%; border-radius: 4px;"
            >
              <div style="padding: 4px; text-align: center; font-size: 12px">
                线下渠道
              </div>
            </van-col>

            <van-col span="7">
              <div style="text-align: right; font-size: 12px;color: #CCCCCC;padding: 4px;padding-right: 0px;">单位：万</div>
            </van-col>
          </van-row>
          <div style="clear: both"></div>
          <!-- 切换优化结束 -->

          
          <!-- 图例开始 -->
          <!-- <i style="font-style: normal;display: block;height:40px;"></i> -->

          <i style="font-style: normal;display: block;height:40px; margin-bottom: 0px;margin-top: 10px; padding-left: 10px; padding-right: 10px;">
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


          <!-- 图形开始  -->
          <div style="padding-left: 10px; padding-right: 10px;">
            <div ref="chart" style="padding-top: 10px; height: 200px;" 
            :style="{'width':((canvas_css.width-20))+'px'}"
            @touchstart="canvas_qiehuan.canvas_toli_kg=true" @touchend="canvas_qiehuan.canvas_toli_kg=false"></div>
          </div>

          <!-- 图形结束 @touchstart="canvas_qiehuan.canvas_toli_kg = true"  @touchend="canvas_qiehuan.canvas_toli_kg = false"-->
        </div>
      </section>
      <!-- 实时业绩趋势结束 -->




      <!-- 订单占比开始 -->
      <p
        :style="sel_value.qhzt_fb.ztfb ?{display: 'block'}:{display: 'none'}"
        style="padding: 0px; margin: 0px; padding-left: 10px; font-size: 12px;padding-top: 5px;padding-bottom: 5px;"
      >
        <!-- 订单占比 -->
        状态分布
      </p>
      <section :style="sel_value.qhzt_fb.ztfb?{display: 'block'}:{display: 'none'}">
        <div
          :style="
            sel_value.theme.muying ? chart_css.yjfl_css : chart_css.yjfl_css_n
          "
        >
          <!-- <div style="padding-left: 10px;padding-right: 10px;">
            <div ref="chart5" style=" height: 250px"
            :style="{'width':((canvas_css.width-20))+'px'}"></div>
          </div> -->

          <div style="padding-left: 10px;padding-right: 10px;">
            <div ref="chart55" style=" height: 250px"
            :style="{'width':((canvas_css.width-20))+'px'}"></div>
          </div>
        </div>
      </section>
      <!-- 订单占比结束 -->

      <!-- 承诺发货业绩分布开始 -->
      <p
        :style="sel_value.qhzt_fb.hqfb ?{display: 'block'}:{display: 'none'}"
        style="padding: 0px; margin: 0px; padding-left: 10px; font-size: 12px;padding-top: 5px;padding-bottom: 5px;"
      >
        承诺发货业绩分布
      </p>
      <section :style="sel_value.qhzt_fb.hqfb?{display: 'block'}:{display: 'none'}">
        <div
          :style="
            sel_value.theme.muying ? chart_css.yjfl_css : chart_css.yjfl_css_n
          "
        >
          <div style="padding-left: 10px;padding-right: 10px;">
            <div ref="ChartDeli" style=" height: 250px"
            :style="{'width':((canvas_css.width-20))+'px'}"></div>
          </div>
        </div>
      </section>
      <!-- 承诺发货业绩分布结束 -->




      <!-- 期货分布开始 :style="sel_value.theme.ouk ? chart_css.yjfl_css : chart_css.yjfl_css_n"-->
      <!-- :style="sel_value.theme.muying ?{display: 'block'}:{display: 'none'}" -->
      <p
        :style="sel_value.qhzt_fb.hqfb?{'display': 'block'}:{'display': 'none'}"
        style="padding: 0px; margin: 0px; padding-left: 10px; font-size: 12px;padding-top: 5px;padding-bottom: 5px;"
      >
        期货分布
      </p>

      <!-- :style="chart_css.yjfl_css" -->
      <div
        :style="sel_value.qhzt_fb.hqfb?{'display': 'block'}:{'display': 'none'}"
        class="qhfb_css"
      >
          <!-- 渠道选择开始 -->

            <!-- 切换优化开始 -->
            <van-row
              gutter=""
              type="flex"
              style="padding-left: 10px; padding-top: 0px;padding-bottom: 10px;"
            >


              <van-col
                span="5"
                @click="Single_choice('val',['_this.FutSprList()'],'全司','_this.sel_value.ChanFutures')"
                :style="
                  sel_value.ChanFutures.val == '全司'
                    ? whole_css.qudao_guanjan: whole_css.qudao_guanjan_n"
                style="margin-right: 1.5%; border-radius: 4px;"
              >
                <div style="padding: 4px; text-align: center; font-size: 12px">
                  全司
                </div>
              </van-col>
              <van-col
                span="5"
                @click="Single_choice('val',['_this.FutSprList()'],'线上','_this.sel_value.ChanFutures')"
                :style="
                  sel_value.ChanFutures.val == '线上'
                    ? whole_css.qudao_guanjan: whole_css.qudao_guanjan_n"
                style="margin-right: 1.5%; border-radius: 4px;"
              >
                <div style="padding: 4px; text-align: center; font-size: 12px">
                  线上
                </div>
              </van-col>

              <van-col
                span="5"
                @click="Single_choice('val',['_this.FutSprList()'],'线下','_this.sel_value.ChanFutures')"
                :style="
                  sel_value.ChanFutures.val == '线下'
                    ? whole_css.qudao_guanjan: whole_css.qudao_guanjan_n"
                style="margin-right: 10px; border-radius: 4px;"
              >
                <div style="padding: 4px; text-align: center; font-size: 12px">
                  线下
                </div>
              </van-col>

            </van-row>
            <div style="clear: both"></div>
            <!-- 切换优化结束 -->


          <!-- 渠道选择结束 -->


          <!-- 业绩达成趋势列表开始 -->
          <van-collapse v-model="activeNames" :border="false" :accordion="true" id="aaaaa" style="text-align: center;" >
            <van-collapse-item
              name="21"
              disabled
              :border="false"
              :is-link="false"
              title-class="qushiyeji_title"
              ref="checkbox"
            >
              <template #title>
                <!-- <div>标题1</div> -->
                <van-row>
                  <van-col span="" :style="{ 'width':(yjdc_css.width*1)+'px'}"
                    ><span style="margin-left: -0px">时间区间</span></van-col
                  >
                  <van-col span="" :style="{ 'width':(yjdc_css.width*1+10)+'px'}">待货审业绩</van-col>
                  <van-col span="" :style="{ 'width':(yjdc_css.width*1)+'px'}">金额占比</van-col>
                  <van-col span="" :style="{ 'width':(yjdc_css.width*1+10)+'px'}">订单匹配率</van-col>
                  <!-- <van-col span="" :style="{ 'width':(yjdc_css.width*1-10)+'px'}"><span>同比</span></van-col> -->
                  <van-col span="" :style="{ 'width':(yjdc_css.width*1-20)+'px'}"><span>详情</span></van-col> 

                </van-row>
              </template>
            </van-collapse-item>


            <!-- 汇总开始 -->
            <!-- <van-collapse-item
              name="22"
              disabled
              :border="false"
              :is-link="false"
              title-class="qushiyeji_title_con"
              ref="checkbox"
              style="margin-top: -10px"
            >
              <template #title>
                <van-row>
                  <van-col span="" :style="{ 'width':(yjdc_css.width*1)+'px'}"
                    ><span style="margin-left: -0px">{{sel_title.yjdcqs_tabel.del_date_total.DURATION}}</span></van-col
                  >
                  <van-col span="" :style="{ 'width':(yjdc_css.width*1+10)+'px'}">
                    {{((sel_title.yjdcqs_tabel.del_date_total.PTD_WAIT_DUR_AMT/10000)||0).toFixed(1)+'万'}}
                  </van-col>
                  <van-col span="" :style="{ 'width':(yjdc_css.width*1)+'px'}">
                    {{((sel_title.yjdcqs_tabel.del_date_total.PTD_WAIT_DUR_RATE*100)||0).toFixed(1)+'%'}}
                  </van-col>
                  <van-col span="" :style="{ 'width':(yjdc_css.width*1+10)+'px'}">
                    {{((sel_title.yjdcqs_tabel.del_date_total.PTD_ORDER_MATCHT_RATE*100)||0).toFixed(1)+'%'}}
                  </van-col>
                  <van-col span="" :style="{ 'width':(yjdc_css.width*1-20)+'px'}"><span style="color: #969799;">--</span></van-col> 
                </van-row>
              </template>
            </van-collapse-item> -->
            <!-- 汇总结束 -->


            <!-- this.sel_title.yjdcqs_tabel.del_date :disabled="sel_value.yjdcqs.disabled1"-->

            <!-- 期货值开始 -->
            
            <van-collapse-item
              v-for="(val, key) in sel_title.yjdcqs_tabel.del_date"
              :key="key"
              :disabled="(key==0)?true:false"
              :is-link="(key==0)?false:true"
              :name="(key+1)"
              :border="false"
              :change="collapse_change('chart_del'+(key+1),(key+1))"
              title-class="qushiyeji_title_con"
              style="margin-top: -10px"
            >
              <template #title>
                <!-- <div>标题1</div>  -->
                <van-row class="yjdcqs_color">
                  <van-col span="" :style="{ 'width':(yjdc_css.width*1)+'px'}">
                    {{val.DURATION}}
                  </van-col>

                  <van-col span="" :style="{ 'width':(yjdc_css.width*1+10)+'px'}">
                    {{((val.PTD_WAIT_DUR_AMT/10000)||0).toFixed(1)+'万'}}
                  </van-col>

                  <van-col span="" :style="{ 'width':(yjdc_css.width*1)+'px'}">
                    {{((val.PTD_WAIT_DUR_RATE*100)||0).toFixed(1)+'%'}}
                  </van-col>

                  <van-col span="" :style="{ 'width':(yjdc_css.width*1+10)+'px'}">
                    {{((val.PTD_ORDER_MATCHT_RATE*100)||0).toFixed(1)+'%'}}
                  </van-col>

                </van-row>
              </template>

              <!-- 图形开始  -->

                <!-- 图例开始 -->
                <!-- <i style="font-style: normal;display: block;height:40px; margin-bottom: 0px;margin-top: 0px; padding-left: 10px; padding-right: 10px;">
                <van-row  type="flex" justify="center" :style="canvas_qiehuan.canvas_toli_kg==true?canvas_qiehuan.canvas_toli_cssy:canvas_qiehuan.canvas_toli_cssn">
                  <van-col span="8">
                    <div>
                      <div style="margin: 0 auto; width: 53px; height: 17px;">
                        <span>
                          <i style="font-style: normal;font-size: 12px; width: 10px;height: 2px;display: block; margin-left: 4px;margin-top: 4px;float: left;">T</i>
                          <i style="font-style: normal;margin-right: 2px;">-</i>
                        </span>
                        <span style="font-size: 12px;">时间</span>
                      </div>
                      <div style="text-align: center;">
                        <span style="font-size: 12px; color: #FF3300;">{{ barData.month }}</span>
                      </div> 
                    </div>
                  </van-col>
                  <van-col span="8">
                    <div>
                      <div style="margin: 0 auto; width: 75px; height: 17px;">
                        <div style="height: 17px;display: block;float: left;">
                          <div style="width: 100%; height: 8px;"></div>
                          <i style="width: 15px;height: 2px;background-color: #1678FF;display: block; margin-right: 6px;"></i>
                        </div>
                        <div style="font-size: 12px;"><span>金额占比</span></div>
                      </div>
                      <div style="text-align: center;">
                        <span style="font-size: 12px; color: #FF3300;">{{ barData.value.toFixed(1)+'%' }}</span>
                      </div> 
                    </div>
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
                        <span style="font-size: 12px; color: #FF3300;">{{ 3 }}</span>
                      </div> 
                    </div>
                  </van-col>
                </van-row>
                </i> -->
                <!-- 图例结束 style="height: 50vw"-->


              <!-- <div style="margin-top: -12px;margin-bottom: -12px;padding: 5px;border-radius: 4px;background: #f7f7f7;"></div> -->
                <div :ref="'chart_del'+(key+1)" @touchstart="canvas_qiehuan.canvas_toli_kg=true" @touchend="canvas_qiehuan.canvas_toli_kg=false"
                style="height: 154px;"
                :style="{'width':((canvas_css.width-20-20))+'px'}"
                ></div>
              <!-- 图形结束 -->
            </van-collapse-item>
            <!-- 期货值结束 -->





          </van-collapse>
          <!-- 业绩达成趋势列表结束 -->

      </div>


      <!-- 期货分布结束 -->






      <!-- 下面的暂时隐藏 -->
      <!-- 订单趋势开始 -->
      <!-- <van-notice-bar
        v-if="sel_value.theme.muying == true"
        wrapable
        style="padding: 5px;display: none;"
        :scrollable="false"
        color="rgba(245, 245, 245, 1)"
        background="rgba(245, 245, 245, 1)"
        text=""
      /> -->
      <!-- sel_value.theme.muying=='11' ? : chart_css.yjfl_css_n -->

      <p 
        :style="sel_value.qhzt_fb.ztfb ?{display: 'block'}:{display: 'none'}"
        style="padding: 0px; margin: 0px; padding-left: 10px; font-size: 12px;padding-top: 5px;padding-bottom: 5px;"
      >
        <!-- 耗时分布 -->
        耗时对比
      </p>

      <div class="Productmarket_day" :style="sel_value.qhzt_fb.ztfb ?{display: 'block'}:{display: 'none'}"
        style="padding-top: 10px;padding-bottom: 10px;background: #ffffff;border-radius: 4px;margin-left: 10px;margin-right: 10px;">
        <section>
          <!-- <p style="padding: 0px;margin: 0px;padding-left: 10px;font-size: 12px;">
            订单趋势
          </p>-->

          <!-- 切换优化开始 -->
          <van-row
            gutter=""
            type="flex"
            style="padding-left: 0px; padding-top: 0px;padding-bottom: 10px;"
            justify="center"
            class="YearMonthCss"
          >

            <!-- <van-col
              span="3"
              @click="Single_choice('ddqs_pd', ['_this.initChart4()','_this.UserYear=null'], '1', '_this.sel_value.ddqs')"
              :style="{'color': sel_value.ddqs.ddqs_pd == '1'?'#23B0A8':'#999999'}"
              style="border-radius: 4px;"
            >
              <div style="padding: 4px; text-align: center; font-size: 14px;font-weight: bold;">
                本月
              </div>
            </van-col> -->

              <!-- :type="sel_value.day_1 ? click_css_set.type : click_css_no.type" :color="sel_value.day_1 ? click_css_set.color : click_css_no.color"
                @click="Single_choice('ddqs_pd', ['_this.initChart4()','_this.UserYear=null'], '1', '_this.sel_value.ddqs')"-->

              <van-col>
                <van-button plain class="but_set_select" 
                  
                  @click="Single_choice('ddqs_pd', ['_this.initChart4()',], '1', '_this.sel_value.ddqs')"
                  :color="(sel_value.ddqs.ddqs_pd == '1')?'#23B0A8':''">{{'本月'}}</van-button>
              </van-col>

              <van-col span="2"></van-col>

              <!-- @click="Single_choice('ddqs_pd', ['_this.initChart4()','_this.UserYear=null'], '2', '_this.sel_value.ddqs')" -->

              <van-col>
                <van-button plain class="but_set_select" 
                  @click="Single_choice('ddqs_pd', ['_this.initChart4()',], '2', '_this.sel_value.ddqs')"
                  :color="(sel_value.ddqs.ddqs_pd == '2')?'#23B0A8':''">{{'本年'}}</van-button>
              </van-col>

              <van-col span="2"></van-col>

              <van-col class="yearmonthview">
                <van-button plain class="but_set_select" 
                  @click="TMShowPopup('month')"
                  :color="(sel_value.ddqs.ddqs_pd == '3')?'#23B0A8':''">
                    {{(viewmonth&&sel_value.ddqs.ddqs_pd == '3')?((viewmonth).substring(2,4)+'年'+(viewmonth).substring(5,7)+'月'):'月'}}
                </van-button>
              </van-col>

            <!-- <van-col>
              <div style="background: rgb(35, 176, 168);width: 2px;height: 12px;margin-top: 8px;">
              </div>
            </van-col> -->




            <!-- <van-col
              :span="(UserYear)?'6':'3'"
              @click="Single_choice('ddqs_pd', [''], '2', '_this.sel_value.ddqs')"
              :style="{'color':sel_value.ddqs.ddqs_pd == '2'?'#23B0A8':'#999999'}"
              style="border-radius: 4px;"
            >
              <div style="padding: 4px; text-align: center; font-size: 14px;font-weight: bold;padding-right: 0px;">
                <van-popover
                  v-model="showPopover"
                  placement="bottom-start"
                  trigger="click"
                  :actions="actions"
                  @select="YearSelect"
                >
                  <template #reference>
                    年度{{(UserYear)?('('+UserYear+')'):''}}
                  </template>
                </van-popover>
              </div>
            </van-col> -->
            
            <!-- <van-col v-if="UserYear">
              <div style="padding: 4px;text-align: center;font-size: 14px;font-weight: bold;padding-left: 0px;"
                :style="{'color':sel_value.ddqs.ddqs_pd == '2'?'#23B0A8':'#999999'}"
              >
                {{(UserYear)?('('+UserYear+')'):''}}
              </div>
            </van-col> -->


            
            <!-- <van-col
              span="5"
              @click="Single_choice('ddqs_pd', ['_this.initChart4()'], '3', '_this.sel_value.ddqs')"
              :style="
                sel_value.ddqs.ddqs_pd == '3'
                  ?  whole_css.qudao_guanjan : whole_css.qudao_guanjan_n"
              style="margin-right: 1.5%; border-radius: 4px;"
            >
              <div style="padding: 4px; text-align: center; font-size: 12px">
                线下渠道
              </div>
            </van-col>
            <van-col span="7">
              <div style="text-align: right; font-size: 12px;color: #CCCCCC;padding: 4px;padding-right: 0px;">单位：万</div>
            </van-col> -->

          </van-row>
          <div style="clear: both"></div>
          <!-- 切换优化结束 -->


          <!-- 图例开始 -->
          <!-- <i style="font-style: normal;display: block;height:40px;"></i> -->

          <i style="font-style: normal;display: none;height:40px; margin-bottom: 0px;margin-top: 10px; padding-left: 10px; padding-right: 10px;">
            <van-row  type="flex" justify="center" :style="canvas_qiehuan.canvas_toli_kg==true?canvas_qiehuan.canvas_toli_cssy:canvas_qiehuan.canvas_toli_cssn">
              <!-- <van-col span="6">span: 6</van-col> -->
              <van-col span="4">
                <div>
                  <div style="margin: 0 auto; width: 50px; height: 17px;">
                    <span>
                      <i style="font-style: normal;font-size: 12px; width: 15px;height: 2px;display: block; margin-left: 4px;margin-right: 4px;margin-top: 4px;float: left;">T&nbsp;-</i>
                  
                    </span>
  
                    <span style="font-size: 12px;">时间</span>
                  </div>
                  <div style="text-align: center;">
                    <!-- <i style="width: 15px;height: 4px;display: block; margin-right: 6px;margin-top: 6px;float: left;"></i> -->
                    <span style="font-size: 12px; color: #FF3300;">{{ barData_stack.month }}</span>
                  </div> 
                </div>
                <!-- <div></div> -->
              </van-col>
  
              <van-col span="4">
                <div>
                  <div style="margin: 0 auto; width: 50px; height: 17px;">
                    <div style="height: 17px;display: block;float: left;margin-left: 5px;">
                      <div style="width: 100%; height: 8px;"></div>
                      <i style="width: 10px;height: 2px;background-color: #1678FF;display: block; margin-right: 6px;"></i>
                  
                    </div>
  
                    <div style="font-size: 12px;"><span>待客</span></div>
                  </div>
                  <div style="text-align: center;">
                    <!-- <i style="width: 15px;height: 4px;display: block; margin-right: 6px;margin-top: 6px;float: left;"></i> -->
                    <span style="font-size: 12px; color: #FF3300;">{{ barData_stack.stack1 }}</span>
                  </div> 
                </div>
                <!-- <div></div> -->
              </van-col>
  
              <van-col span="4">
                <div>
                  <div style="margin: 0 auto; width: 50px; height: 17px;">
                    <div style="height: 17px;display: block;float: left;margin-left: 5px;">
                      <div style="width: 100%; height: 8px;"></div>
                      <i style="width: 10px;height: 2px;background-color: #F5A028;display: block; margin-right: 6px;"></i>
                    </div>
                    <div style="font-size: 12px;"><span>待货</span></div>
  
                  </div>
                  <div style="text-align: center;">
                    <!-- <i style="width: 15px;height: 4px;display: block; margin-right: 6px;margin-top: 6px;float: left;"></i> -->
                    <span style="font-size: 12px; color: #FF3300;">{{ barData_stack.stack2 }}</span>
                  </div> 
                </div>
                <!-- <div></div> -->
              </van-col>
  
              <van-col span="4">
                <div>
                  <div style="margin: 0 auto; width: 50px; height: 17px;">
                    <div style="height: 17px;display: block;float: left;margin-left: 5px;">
                      <div style="width: 100%; height: 8px;"></div>
                      <i style="width: 10px;height: 2px;background-color: #48C728;display: block; margin-right: 6px;"></i>
                    </div>
                    <div style="font-size: 12px;"><span>待财</span></div>
  
                  </div>
                  <div style="text-align: center;">
                    <!-- <i style="width: 15px;height: 4px;display: block; margin-right: 6px;margin-top: 6px;float: left;"></i> -->
                    <span style="font-size: 12px; color: #FF3300;">{{ barData_stack.stack3 }}</span>
                  </div> 
                </div>
                <!-- <div></div> -->
              </van-col>
  
              <van-col span="4">
                <div>
                  <div style="margin: 0 auto; width: 50px; height: 17px;">
                    <div style="height: 17px;display: block;float: left;margin-left: 5px;">
                      <div style="width: 100%; height: 8px;"></div>
                      <i style="width: 10px;height: 2px;background-color: #E8294F;display: block; margin-right: 6px;"></i>
                    </div>
                    <div style="font-size: 12px;"><span>待打</span></div>
  
                  </div>
                  <div style="text-align: center;">
                    <!-- <i style="width: 15px;height: 4px;display: block; margin-right: 6px;margin-top: 6px;float: left;"></i> -->
                    <span style="font-size: 12px; color: #FF3300;">{{ barData_stack.stack4 }}</span>
                  </div> 
                </div>
                <!-- <div></div> -->
              </van-col>
  
              <van-col span="4">
                <div>
                  <div style="margin: 0 auto; width: 50px; height: 17px;">
                    <div style="height: 17px;display: block;float: left;margin-left: 5px;">
                      <div style="width: 100%; height: 8px;"></div>
                      <i style="width: 10px;height: 2px;background-color: #4ED3D3;display: block; margin-right: 6px;"></i>
                    </div>
                    <div style="font-size: 12px;"><span>待发</span></div>
  
                  </div>
                  <div style="text-align: center;">
                    <!-- <i style="width: 15px;height: 4px;display: block; margin-right: 6px;margin-top: 6px;float: left;"></i> -->
                    <span style="font-size: 12px; color: #FF3300;">{{ barData_stack.stack5 }}</span>
                  </div> 
                </div>
                <!-- <div></div> -->
              </van-col>
  
  
  
            </van-row>
          </i>
          <!-- 图例结束 style="height: 50vw"-->

          <div style="padding-left: 10px;padding-right: 10px;">
            <div ref="chart6" @touchstart="canvas_qiehuan.canvas_toli_kg=true" @touchend="canvas_qiehuan.canvas_toli_kg=false"
              style="height: 250px;"
              :style="{'width':((canvas_css.width-20))+'px'}"
            ></div>
          </div>

          
        </section>
      </div>

      <!-- 订单趋势结束 -->


    </div>

    </van-pull-refresh>


    <div style="width: 100%; height: 50px; background: rgba(245, 245, 245, 1);">

      <BottomCss></BottomCss>

    </div>
    <!-- <div style="width: 100%; height: 50px; "></div> -->
    <div v-if="isIPhoneX()!=true" style="width: 100%; height: 50px; "></div>
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

// import liquidfill from 'echarts-liquidfill'
import "echarts-liquidfill";



import { mapState } from "vuex";
import {
  decimal2Percent,
  calcSignClass,
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
  Loading,
  Icon,
  Popover,
  Picker,
  
} from "vant";

export default {
  name: "SalesChannel_con",

  data() {
    return {

      TrendMonth:['2020年01月','2020年02月','2020年03月','2020年04月','2020年05月','2020年06月','2020年07月','2020年08月','2020年09月','2020年10月','2020年11月','2020年12月',],
      TMonthIndex:"",
      show: false,

      YearVal:[],
      UserYear:null,
      showPopover: false,
      actions: [{ text: '选项一' }, { text: '选项二' }, { text: '选项三' }],

      activeNames: "0",
      activeNames_tips:['1'],
      isLoading: false,
      adasd: true,

      sel_value: {
        day_set: {
          day_1: true,
          day_7: false,
          day_30: false,
          month: false,
        },

        qhzt_fb:{
          // hqfb:true,
          hqfb:false,
          ztfb:true,
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
          qudao_guanj_pd: "a",
        },
        ssyjqs: {
          ssyjqs_pd: "1",
        },
        yjdcqs: {
          yjdcqs_pd: "1",
          disabled1: false,
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
        ChanFutures:{
          val:"全司",
        }

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

          cont7: 0,
          cont8: 0,

          cont9: 0,
          cont10: 0,
          cont11: 0,
          cont12: 0,

          cont13: 0,
          cont14: 0,
          cont15: 0,

          cont16: 0,
          cont17: 0,
          cont18: 0,
          cont19: 0,
          cont20: 0,
          cont21: 0,

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
          // 月累计值
          mj_dcqs_total: "",
          mj_dcqs_online_channel: "",
          mj_dcqs_off_channel: "",
          // 期货分布值
          del_date:"",
          del_date_total:"",



        }, //业绩达成趋势表
      },

      //新加的开始
      barData: {
        value: 0,
        ago_value: 0,
        month:0,
      },

      barData_stack: {
        month:0,
        stack1:0,
        stack2:0,
        stack3:0,
        stack4:0,
        stack5:0,
      },

      canvas_qiehuan:{

        canvas_toli_cssy:{
          "padding-top": '0px',
          // "background-color": 'aliceblue' ,
          "padding-bottom": '0px',
          "margin-top": '0px'
        },
        canvas_toli_cssn:{
          "padding-top": '0px',
          // "background-color": '#ffffff' ,
          "padding-bottom": '0px',
          "margin-top": '0px'
        },
        canvas_toli_kg:false,

      },

      whole_css: {
        yjdc_yjkj: {
          padding: "10px",
          "padding-top": "10px",
          display: "block",
          "padding-bottom": "0px"
        },
        yjdc_yjkj_n: {
          padding: "10px",
          "padding-top": "10px",
          display: "none",
          "padding-bottom": "0px"
        },

        qudao_guanjan: {
          // background: "rgb(22, 120, 255)",
          // background: "#004B5D",
          // background: "#159B80",
          // background: "#03bacc",
          background: "#23B0A8",

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
          // "background-color": "#59b2b2",
          // "background-color": "#1678ff",
          // "background-color": "#00586D",
          // "background-color": "#159B80",
          // "background-color": "#03bacc",
          "background-color": "#23B0A8",
          color: "#ffffff",
          "font-size": "12px",
        },
        zffhyjkj_n: {
          "padding-top": "5px",
          "padding-bottom": "5px",
          "text-align": "center",
          // "background-color": "#E6E6E6",
          "background-color": "rgb(247, 247, 247)",
          color: "#000000",
          "font-size": "12px",
        },
      },
      chart_css: {
        dashboard: {
          "padding-top": "10px",
          display: "block",
        },
        dashboard_n: {
          "padding-top": "10px",
          display: "none",
        },
        yjfl_css: {
          "padding-top": "10px",
          "padding-bottom": "10px",
          background: "#ffffff",
          "border-radius": "4px",
          "margin-left": "10px",
          "margin-right": "10px",
          display: "block",
        },
        yjfl_css_n: {
          "padding-top": "10px",
          "padding-bottom": "10px",
          background: "#ffffff",
          "border-radius": "4px",
          "margin-left": "10px",
          "margin-right": "10px",
          display: "none",
        },
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

        "fs_realtime-load_time": "",

        "order_status-order_status_all": "",
        "order_status-order_status_onlin": "",
        "order_status-order_status_off": "",
        "order_status-order_trend": "",
        // "order_status-order_rate": "",
        // "order_status-order_time": "",
        "order_status-order_monitoring": "", //暂时的

      },

      data_loay:false,

      test_set_value: "",
      question_show: false,
      echarts_clear:false,
      echarts2_clear:false,
      SetOnYearMonth:'month',
      set_time:
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1 >= 1 && new Date().getMonth() + 1 <= 9
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1) +
        "-01",
      viewyear:null,
      viewmonth:null


    };
  },

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
    [Loading.name]:Loading,
    [Icon.name]:Icon,
    [Popover.name]:Popover,
    [Picker.name]:Picker,
    BottomCss:bottom_css



  },

  computed: {
    ...mapState("user", ["permissionList"]), //大概的意思是获取权限
  },

  created() {
    this.canvas_css.width = window.innerWidth - 20 ;
    // this.yjdc_css.width = (window.innerWidth - 20 - 32 - 20) / 4 + "px";
    this.yjdc_css.width = (window.innerWidth - 20 - 20 -10) / 5 ;


    this.$EventBus.$emit("data_loay_set", {
      data_loay_seton: false,
    });


    // 新加的开始
    this.sel_value.Range_on.Range_set="3";
    // 新加的结束





      const apiMap2 = {
        // 订单状态
        "SQL-order_status-order_fut_dist_d": { resultProp:"order_fut_dist_d" },
        "SQL-order_status-order_fut_dist": { resultProp:"order_fut_dist" },
        "SQL-fs_realtime-load_time": { resultProp:"load_time" },
        "SQL-order_status-order_monitoring": { resultProp:"order_monitoring" },

        "SQL-order_status-order_status_disr": { resultProp:"order_status_disr" },

        "SQL-order_status-order_batch_split": { resultProp:"order_batch_split" },
        "SQL-order_status-order_timely_rate": { resultProp:"order_timely_rate" },

        "SQL-order_status-order_disp_d": { resultProp:"order_disp_d" },
        "SQL-order_status-order_disp_m": { resultProp:"order_disp_m" },


        
      };

      this.ajax_data(apiMap2);



    console.log("==========第三页========");
    console.log(this.data);

    console.log(decimal2Percent);
    console.log(calcSignClass);
  },

  watch: {
    "sel_value.yjdcqs.disabled_value": {
      handler(val) {
        this.sel_value.yjdcqs.disabled1 = false;
        this.sel_value.yjdcqs.disabled2 = false;
        this.sel_value.yjdcqs.disabled3 = false;
        if (val == "1") {
          this.sel_value.yjdcqs.disabled1 = false;
        } else if (val == "3") {
          this.sel_value.yjdcqs.disabled2 = false;
        } else if (val == "4") {
          this.sel_value.yjdcqs.disabled3 = false;
        }
        // console.log("监听")
        // console.log(val);
      },
    },

    "activeNames":{
      handler(val){
        if(val){
          this.echarts2_clear=true;
        }
      }
    }


    // "$store.state.app.ProductMarket.type": {
    //   handler(val) {
    //     if(val==13){
    //       this.data_loay=13;
    //       console.log(val);
    //     }
    //   },
    // },


  },

  mounted() {



    

    this.$EventBus.$on("Salechan_choice_f", (Range_value_set) => {
      if(Range_value_set.Range_value_set=='3'){
        this.change_show("3");
        this.data_load_time=(typeof(this.data["fs_realtime-load_time"])!='undefined'&&typeof(this.data["fs_realtime-load_time"][0])!='undefined')?  
        (this.data["fs_realtime-load_time"][0].LOAD_TIME).substring(0,4)+'.'
        +(this.data["fs_realtime-load_time"][0].LOAD_TIME).substring(5,7)+'.'
        +(this.data["fs_realtime-load_time"][0].LOAD_TIME).substring(8,10)+' '
        +(this.data["fs_realtime-load_time"][0].LOAD_TIME).substring(11,16)
        :0;

        this.echarts_clear=true;
        this.echarts2_clear=true;
        Object.keys(this.sel_title.yjdcqs_tabel.del_date).forEach((key_del) => {
          if(this.activeNames==(key_del*1+1)){
            this.collapse_change('chart_del'+(key_del*1+1),(key_del*1+1))
          }
        });
        this.InitChartState();
        this.initChart4();
        this.DeliveryDistChart();
        // this.initChart3();
        Information_log('渠道业绩-订单状态','返回到渠道业绩-订单状态页面:  ');
     
      }
    });







    // 第二页开始 ,"_this.initChart()"
    this.sel_value.Range_on.Range_set="3";
    this.Single_choice(
      "muying",
      ["_this.change_show(3)"],
      true,
      "_this.sel_value.theme"
    );   
    this.change_show("3");

    // this.initChart();

    // this.initChart_Dashboard();

    // this.initChart3();
    this.InitChartState();
    this.initChart4();

    this.DeliveryDistChart();
    // this.collapse_change("chart2");    
    // 第二页结束


    //货期分布数据处理
    this.FutSprList();



    // 最后才放更新时间
    // console.log(typeof(this.data["fs_realtime-load_time"][0]));
    this.p1.then(() => {
        try{

          this.data_load_time=(typeof(this.data["fs_realtime-load_time"])!='undefined'&&typeof(this.data["fs_realtime-load_time"][0])!='undefined')?  
            // (this.data["fs_realtime-load_time"][0].LOAD_TIME).substring(0,16):0;    
            (this.data["fs_realtime-load_time"][0].LOAD_TIME).substring(0,4)+'.'
            +(this.data["fs_realtime-load_time"][0].LOAD_TIME).substring(5,7)+'.'
            +(this.data["fs_realtime-load_time"][0].LOAD_TIME).substring(8,10)+' '
            +(this.data["fs_realtime-load_time"][0].LOAD_TIME).substring(11,16)
            :0;  

          let yeararr=[];
          Object.keys(this.data["order_status-order_disp_m"]).forEach((key_pd1) => {
            yeararr.push((this.data["order_status-order_disp_m"][key_pd1].MDATE).substring(0,4)+'年');
          });
          yeararr=this.unique(yeararr);
          this.YearVal=[];
          Object.keys(yeararr).forEach((key_y) => {
            this.YearVal.push({text:yeararr[key_y]});
          });
          this.actions=this.YearVal;


        }catch(error){ 
          console.log("========错误捕捉信息==========")
          // console.log(error)
          console.error(error);
          // this.info_error+=1;
          Information_log('渠道业绩-订单状态','运行到渠道业绩-订单状态更新时间:  '+error.toString());
        }   
  
    });

    Information_log('渠道业绩-订单状态','运行到渠道业绩-订单状态页面:  '+'数据加载完成');
      

  },

  methods: {

    YearSelect(action){
      console.log("==========选择商了！！！！=============");
      console.log(action);
      this.UserYear=action.text;
      this.initChart4();

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
      if(this.SetOnYearMonth=='month'){ 
        this.set_time = year_set+'-'+month_set+'-'+'01';
        this.Single_choice('ddqs_pd', ['_this.initChart4()',], '3', '_this.sel_value.ddqs');
        this.viewmonth=this.set_time;

      }else if(this.SetOnYearMonth=='year'){
        this.set_time = year_set;
        this.Single_choice('ddqs_pd', ['_this.initChart4()',], '2', '_this.sel_value.ddqs');
        this.viewyear=this.set_time;
      }
      // console.log(this.set_time);

    },
    onCancel() {
      console.log('取消');
      this.show = false;
    },
    onChange(picker, value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
    },
    TMShowPopup(type) {
      this.time_update_now(type);
      this.show = true;
    },


    time_update_now(type){

      // console.log("as============ad");
      // console.log(type);
      let year_now_time=new Date();
      let month = year_now_time.getMonth() + 1; //月
      year_now_time=year_now_time.getFullYear();

      let now_time_set=(year_now_time+'年'+(month<10?'0'+month:month)+'月');
      
      let year_month_arr=[];
      let year_on=[];

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
          // console.log(key);
          this.TMonthIndex=key*1
        }
      });

      if(type=='month'){
        this.TrendMonth=year_month_arr;
      }else if(type=='year'){
        year_on.push((now_time_set.substring(0,4)*1-1)+'年',now_time_set.substring(0,4)+'年');
        this.TrendMonth=year_on;
      }
      this.SetOnYearMonth=type;


    },


    onRefresh() {

      this.$EventBus.$emit("data_loay_set", {
        data_loay_seton: false,
      });
      // setTimeout(() => {
      //   // Toast('刷新成功');
      //   // 暂时还没用得上只是做个效果出来
      //   this.isLoading = false;
      //   this.count++;
      // }, 1000);

      const apiMap2 = {
        // 订单状态
        "SQL-order_status-order_fut_dist_d": { resultProp:"order_fut_dist_d" },
        "SQL-order_status-order_fut_dist": { resultProp:"order_fut_dist" },
        "SQL-fs_realtime-load_time": { resultProp:"load_time" },
        "SQL-order_status-order_monitoring": { resultProp:"order_monitoring" },
        "SQL-order_status-order_batch_split": { resultProp:"order_batch_split" },
        "SQL-order_status-order_timely_rate": { resultProp:"order_timely_rate" },
      };
      this.ajax_data(apiMap2);



      this.p1.then(() => {
        this.isLoading = false;
        this.change_show("3");
        // this.initChart3();
      });

    },

    showPopup(){
      this.question_show=true;
    },

    showPopup_close(){
      this.activeNames_tips=[];
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

    change_show(name_value) {
      // console.log("运行到这里！！");

      name_value = name_value + "";
      switch (name_value) {
        case "1":
          this.sel_title.chanzhi_wenzi.title_all = "实时业绩";
          this.sel_title.chanzhi_wenzi.title_content.content1 = "业绩目标";
          this.sel_title.chanzhi_wenzi.title_content.content2 = "今日业绩";
          this.sel_title.chanzhi_wenzi.title_content.content3 = "完成率";
          this.sel_title.chanzhi_wenzi.title_content.content4 = "业绩差值";
          this.sel_title.chanzhi_wenzi.title_content.content5 = "同期业绩";
          this.sel_title.chanzhi_wenzi.title_content.content6 = "同比增幅";

          break;
        case "2":
          this.sel_title.chanzhi_wenzi.title_all = "本月业绩达成";
          this.sel_title.chanzhi_wenzi.title_content.content1 =
            "日累业绩目标";
          this.sel_title.chanzhi_wenzi.title_content.content2 = "日累计业绩";
          this.sel_title.chanzhi_wenzi.title_content.content3 = "日累计完成率";
          this.sel_title.chanzhi_wenzi.title_content.content4 =
            "月累业绩目标";
          this.sel_title.chanzhi_wenzi.title_content.content5 = "月累计业绩";
          this.sel_title.chanzhi_wenzi.title_content.content6 = "月累计完成率";

          break;
        case "3":
          this.sel_title.chanzhi_wenzi.title_all = "订单状态";
          this.sel_title.chanzhi_wenzi.title_content.content1 = "待客审总金额";
          this.sel_title.chanzhi_wenzi.title_content.content2 = "待货审总金额";
          this.sel_title.chanzhi_wenzi.title_content.content3 = "待财审总金额";
          this.sel_title.chanzhi_wenzi.title_content.content4 = "待打印金额";
          this.sel_title.chanzhi_wenzi.title_content.content5 = "待发货金额";
          // this.sel_title.chanzhi_wenzi.title_content.content6 = "订单处理及时率";
          this.sel_title.chanzhi_wenzi.title_content.content6 = "订单处理耗时";
          

          break;
        default:
          this.sel_title.chanzhi_wenzi.title_all = "实时业绩";
          this.sel_title.chanzhi_wenzi.title_content.content1 = "业绩目标";
          this.sel_title.chanzhi_wenzi.title_content.content2 = "今日业绩";
          this.sel_title.chanzhi_wenzi.title_content.content3 = "完成率";
          this.sel_title.chanzhi_wenzi.title_content.content4 = "业绩差值";
          this.sel_title.chanzhi_wenzi.title_content.content5 = "同期业绩";
          this.sel_title.chanzhi_wenzi.title_content.content6 = "同比增幅";
      }

      this.Single_choice('qudao_guanj_pd','','1','_this.sel_value.qudao_guanjan');
      this.data_screen_quota();
      
      // this.initChart_Dashboard();
      // this.initChart4();
    },

    data_screen(set_data) {
      // console.log(set_theme_value);
      let theme_value_name = "";
      let theme_data = {};
      // let _this = this;

      if (this.sel_value.Range_on.Range_set == "1") {
        theme_value_name = "fs_realtime";
      } else if (this.sel_value.Range_on.Range_set == "2") {
        theme_value_name = "fs_reach";
      } else if (this.sel_value.Range_on.Range_set == "3") {
        theme_value_name = "order_status";
      } else {
        theme_value_name = "";
      }
      // console.log("==========");
      // console.log(theme_value_name);

      // console.log("运行到这里！！！！！！！！！！！！！！！！！！！！！");
      Object.keys(set_data).forEach((key) => {
        let [theme_value, theme_content] = key.split("-"); //把上面的拆分出来
        if (theme_value && theme_content) {
          if (theme_value == theme_value_name) {
            theme_data[`${theme_value}-${theme_content}`] = set_data[key];
          }
        }
      });

      // this.data_screen_quota(_this.sel_value.Range_on.Range_set, theme_data);
      // this.p1.then(() => {});

      return theme_data;
    },

    //2021-09-02 货审期货分布开始
    FutSprList(){

      this.p1.then(() => {
        try{
          let delivery_data=[];
          let user_date=this.data["order_status-order_fut_dist"];

          // this.sel_value.ChanFutures.val
          console.log("=========11111111111=========")
          // console.log(user_date);

          Object.keys(user_date).forEach((key_del) => {
            
            if(user_date[key_del].CHNL_NAME==this.sel_value.ChanFutures.val){
              if(user_date[key_del].DURATION=="到期一周"){
                user_date[key_del].NUM_DE=1;
                delivery_data.push(user_date[key_del]);
              }else if(user_date[key_del].DURATION=="到期一周+"){
                user_date[key_del].NUM_DE=2;
                delivery_data.push(user_date[key_del]);
              }else if(user_date[key_del].DURATION=="7天内"){
                user_date[key_del].NUM_DE=3;
                delivery_data.push(user_date[key_del]);
              }else if(user_date[key_del].DURATION=="8-14天"){
                user_date[key_del].NUM_DE=4;
                delivery_data.push(user_date[key_del]);
              }else if(user_date[key_del].DURATION=="15-21天"){
                user_date[key_del].NUM_DE=5;
                delivery_data.push(user_date[key_del]);
              }else if(user_date[key_del].DURATION=="22-28天"){
                user_date[key_del].NUM_DE=6;
                delivery_data.push(user_date[key_del]);
              }else if(user_date[key_del].DURATION=="4周+"){
                user_date[key_del].NUM_DE=7;
                delivery_data.push(user_date[key_del]);
              }else if(user_date[key_del].DURATION=="汇总"){
                user_date[key_del].NUM_DE=0;
                delivery_data.push(user_date[key_del]);
              }
            }

          });
          delivery_data.sort((a, b) => {
            return Number(a["NUM_DE"]) - Number(b["NUM_DE"]);
          });

          this.sel_title.yjdcqs_tabel.del_date=delivery_data;
          // console.log(delivery_data);



          this.sel_title.yjdcqs_tabel.del_date_total=this.data["order_status-order_fut_dist"][7];
          // console.log(this.sel_title.yjdcqs_tabel.del_date_total);

        }catch(error){ 
          console.log("========错误捕捉信息==========")
          console.error(error);
          Information_log('渠道业绩-订单状态','运行到渠道业绩-订单状态-货期分布:  '+error.toString());
        }   
        
      });

    },
    //2021-09-02 货审期货分布结束


    data_screen_quota() {
      // console.log(this.sel_value.Range_on.Range_set);
      // let con_data="";
      // console.log(data);

      this.p1.then(() => {

        try{
          
          let data = this.data_screen(this.data);

          // this.sel_title.quota_value.cont1 = data[
          //   "order_status-order_status_all"
          // ][0]["TOT_WAIT_CS_AUD_AMT"].toFixed(0);

          // this.sel_title.quota_value.cont2 = data[
          //   "order_status-order_status_all"
          // ][0]["TOT_WAIT_GOOGDS_AUD_AMT"].toFixed(0);

          // this.sel_title.quota_value.cont3 = ((data[
          //   "order_status-order_status_all"
          // ][0]["WAIT_FIN_AUD_AMT"]||0)/10000).toFixed(1)+'万';

          // this.sel_title.quota_value.cont4 = data[
          //   "order_status-order_status_all"
          // ][0]["TOT_WAIT_PRT_AUD_AMT"].toFixed(0);

          // this.sel_title.quota_value.cont5 = data[
          //   "order_status-order_status_all"
          // ][0]["WAIT_SEND_AMT"].toFixed(0);

          // console.log(data["order_status-order_monitoring"][0].WAIT_CS_AUD_AMT);
          

          this.sel_title.quota_value.cont1 =data[
            "order_status-order_monitoring"
          ][0]["WAIT_CS_AUD_AMT"].toFixed(0)||0;

          this.sel_title.quota_value.cont2 = data[
            "order_status-order_monitoring"
          ][0]["WAIT_GOOGDS_AUD_AMT"].toFixed(0)||0;

          this.sel_title.quota_value.cont3 = ((data[
            "order_status-order_monitoring"
          ][0]["WAIT_FIN_AUD_AMT"]||0)/10000).toFixed(1)+'万';

          this.sel_title.quota_value.cont4 = data[
            "order_status-order_monitoring"
          ][0]["WAIT_PRT_AUD_AMT"].toFixed(0)||0;

          this.sel_title.quota_value.cont5 = data[
            "order_status-order_monitoring"
          ][0]["WAIT_SEND_AMT"].toFixed(0)||0;

          this.sel_title.quota_value.cont6 = ((data["order_status-order_monitoring"][0].ORDER_DISPOSE_TIME).toFixed(1))||0;



          this.sel_title.quota_value.cont7 = ((data["order_status-order_monitoring"][0].TOT_AMT_THIS_MON).toFixed(10))||0;
          this.sel_title.quota_value.cont8 = ((data["order_status-order_monitoring"][0].TOT_AMT_NEXT_MON).toFixed(10))||0;
          this.sel_title.quota_value.cont9 = ((data["order_status-order_monitoring"][0].OTHER_AMT).toFixed(10))||0;
          this.sel_title.quota_value.cont10 = ((data["order_status-order_monitoring"][0].THIS_MON_AMT_RATE).toFixed(10))||0;
          this.sel_title.quota_value.cont11 = ((data["order_status-order_monitoring"][0].NEXT_MON_AMT_RATE).toFixed(10))||0;
          this.sel_title.quota_value.cont12 = ((data["order_status-order_monitoring"][0].OTHER_RATE).toFixed(10))||0;


          

          console.log("=======================asasasas=============");
          console.log(data["order_status-order_timely_rate"]);



          this.sel_title.quota_value.cont13 = ((data["order_status-order_timely_rate"][0].PTD_TIMELY_RATE||0))||0;
          this.sel_title.quota_value.cont14 = ((data["order_status-order_timely_rate"][0].PTD_ZFQS_CONSUMING||0))||0;
          this.sel_title.quota_value.cont15 = ((data["order_status-order_batch_split"][0].SPLIT_RATE||0))||0;

          this.sel_title.quota_value.cont16 = (((data["order_status-order_monitoring"][0].WAIT_CS_AUD_RATE||0))*100).toFixed(1);       //待客审占比
          this.sel_title.quota_value.cont17 = (((data["order_status-order_monitoring"][0].WAIT_GOOGDS_AUD_RATE||0))*100).toFixed(1);   //待货审占比
          this.sel_title.quota_value.cont18 = (((data["order_status-order_monitoring"][0].WAIT_FIN_AUD_RATE||0))*100).toFixed(1);      //待财审占比
          this.sel_title.quota_value.cont19 = (((data["order_status-order_monitoring"][0].WAIT_PRT_AUD_RATE||0))*100).toFixed(1);      //待打印占比
          this.sel_title.quota_value.cont20 = (((data["order_status-order_monitoring"][0].WAIT_SEND_RATE||0))*100).toFixed(1);         //待发货占比
          this.sel_title.quota_value.cont21 = 0;



        }catch(error){ 
          console.log("========错误捕捉信息==========")
          // console.log(error)
          console.error(error);
          // this.info_error+=1;
          Information_log('渠道业绩-订单状态','运行到渠道业绩-订单状态指标:  '+error.toString());
        }   



        
      });


    },




    initChart() {
      let _this = this;
      let hour_data = [];
      let sale_amt = [];
      let ago_amt = [];
      let choice_data = {};
      let _time_now=new Date();


      this.chartIns = echarts.init(this.$refs["chart"]);
      this.p1.then(() => {
        // console.log("运行上了！echarts asasas==========================");
        let data = _this.data_screen(this.data);
        // console.log(JSON.stringify(_this.data));

        switch (this.sel_value.ssyjqs.ssyjqs_pd) {
          case "1":
            // console.log(1);
            choice_data = data["fs_realtime-all_channel"];
            break;
          case "2":
            // console.log(2);
            choice_data = data["fs_realtime-onlin_channel"];
            break;
          case "3":
            // console.log(3);
            choice_data = data["fs_realtime-off_channel"];
            break;
        }

        // console.log("=============渠道业绩饼图===============");
        // console.log(data);
        // console.log(choice_data);

        choice_data.sort((a, b) => {
          return Number(a["PAY_HOURS"]) - Number(b["PAY_HOURS"]);
        });
        Object.keys(choice_data).forEach((key_all) => {
          hour_data.push(choice_data[key_all].PAY_HOURS*1);
          sale_amt.push(((choice_data[key_all].SALE_AMT/10000).toFixed(2)*1));
          ago_amt.push(((choice_data[key_all].AGO_AMT/10000).toFixed(2)*1));
        });


        hour_data=this.unique(hour_data);


        
        // 新加的默认值开始
 
        // console.log("========as11122=======");
        // console.log(_time_now.getHours());
        // console.log(hour_data);

        if(this.sel_value.Range_on.Range_set == "1"){

          this.barData.month=_time_now.getHours()+":00";
          Object.keys(hour_data).forEach((key_mv) => {
            if(hour_data[key_mv]==(_time_now.getHours())){
              this.barData.value=sale_amt[key_mv]
              this.barData.ago_value=ago_amt[key_mv]
            }
          });  

        }
        // console.log("a1111111111111")

        // 新加的默认值结束

          

        this.chartIns.setOption({
          grid: {
            left: "1%",
            top: "6%",
            right: "2%",
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
            // show: false,
            trigger: "axis",
            axisPointer: {
              // type: "cross",
              label: {
                color: "#000000",
                backgroundColor: "aliceblue",
              },
            },
            formatter:function (params) {

              _this.barData.value = params[1].value;
              _this.barData.ago_value = params[0].value;

              _this.barData.month = params[1].axisValue+":00";
 
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

    initChart_Dashboard() {
      this.chartIns_dashboard = echarts.init(this.$refs["chart_dashboard"]);


      // console.log("=======运行在仪表盘上！！==============");
      // console.log(this.$refs["chart_dashboard"])




      this.p1.then(() => {
        this.chartIns_dashboard.setOption({


          grid: {
            left: "10%",
            top: "0%",
            right: "0%",
            bottom: "15%",
            // bottom: "0%",
            containLabel: true,
          },

          tooltip: {
            show:false,
            formatter: "{a} <br/>{b} : {c}%",
          },
          toolbox: {
            feature: {
              restore: {},
              saveAsImage: {},
            },
          },






        backgroundColor: '#fff',
        series: [{
            type: 'liquidFill',
            radius: '90%',
            center: ['60%', '50%'],
            data: [this.sel_title.ybb_value.percentage, this.sel_title.ybb_value.percentage],
            backgroundStyle: {
                borderWidth: 1,
                // borderColor: '#459DBD',
                borderColor: 'rgba(35, 176, 168,0.5)',

                // borderColor: 'rgba(35, 176, 168,0.8)',
                // color: '#F7F7F7'
                color: 'rgba(238,238,238,0.5)'
                
            },
        
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                offset: 1,
                color: 'rgba(135, 241, 244, 0.7)'
                
            }, {
                offset: 0,
                // color: 'rgba(73, 126, 255, 0.36)'
                color: 'rgba(22,120,255, 0.36)'
            }]),
            itemStyle: {
                shadowBlur: 0,
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                        offset: 1,
                        // color: 'rgba(135, 241, 244, 0.7)'
                        // color: 'rgba(73, 192, 255, 0.7)'
                        color: 'rgba(22,120,255, 0.7)'
                    }, {
                        offset: 0,
                        // color: 'rgba(73, 192, 255, 0.7)'
                        color: 'rgba(135, 241, 244, 0.7)'

                    }]),
                    opacity: 1,
            },
            outline: {
                show: false
            },

            label: {
                fontSize: 12,
                formatter: function(v) {

                    return  '完成率\n '+(v.data * 100).toFixed(1)+"%";
                    // console.log(v);
                    // let aa="<p>12%</p>";
                    // return v.marker;

                  // return [
                  //     "{value|" + (111) + "}",
                  //     "{company|" + 222 + "}"
                  // ].join("\n");


                },
                align: 'center',
                color:'#919191',

            },




        }]




        });
      });
    },


    collapse_change(set_name,set_num) {


      if(this.activeNames==set_num){

        // console.log("========运行到选择函数这里！！！！！！！==========");
        // console.log(this.activeNames);
        // console.log(set_num);
        // console.log(set_name);
      
        let _this = this;
        setTimeout(function name() {
          _this.initChart2(set_name, _this.activeNames);
        }, 10);        

      }


    },

    initChart2(set_name, set_value_name) {

      console.log("========运行到选择函数这里！！！！！！！==========");
      // console.log(set_name);
      // console.log(this.$refs);


      this.chartIns_ = echarts.init(this.$refs[set_name][0]);

      // let _this = this;
      let user_data = [];

      let user_time = [];
      let mtd_pay_amt = [];
      let mtd_ago_amt = [];


      this.p1.then(() => {

        if(this.echarts2_clear==true){
          this.chartIns_.clear();
          this.echarts2_clear=false;         
        }
        // this.chartIns_.clear();

        Object.keys(this.data["order_status-order_fut_dist_d"]).forEach((key_pd1) => {

          if(this.data["order_status-order_fut_dist_d"][key_pd1].CHNL_NAME==this.sel_value.ChanFutures.val){
            if(set_value_name==2&&this.data["order_status-order_fut_dist_d"][key_pd1].DURATION=="到期一周"){
              user_data.push(this.data["order_status-order_fut_dist_d"][key_pd1]);
            }else if(set_value_name==3&&this.data["order_status-order_fut_dist_d"][key_pd1].DURATION=="到期一周+"){
              user_data.push(this.data["order_status-order_fut_dist_d"][key_pd1]);
            }else if(set_value_name==4&&this.data["order_status-order_fut_dist_d"][key_pd1].DURATION=="7天内"){
              user_data.push(this.data["order_status-order_fut_dist_d"][key_pd1]);
            }else if(set_value_name==5&&this.data["order_status-order_fut_dist_d"][key_pd1].DURATION=="8-14天"){
              user_data.push(this.data["order_status-order_fut_dist_d"][key_pd1]);
            }else if(set_value_name==6&&this.data["order_status-order_fut_dist_d"][key_pd1].DURATION=="15-21天"){
              user_data.push(this.data["order_status-order_fut_dist_d"][key_pd1]);
            }else if(set_value_name==7&&this.data["order_status-order_fut_dist_d"][key_pd1].DURATION=="22-28天"){
              user_data.push(this.data["order_status-order_fut_dist_d"][key_pd1]);
            }else if(set_value_name==8&&this.data["order_status-order_fut_dist_d"][key_pd1].DURATION=="4周+"){ 
              user_data.push(this.data["order_status-order_fut_dist_d"][key_pd1]);
            }            
          }

        });



        user_data.sort((a, b) => {
          let a_time = "";
          let b_time = "";
          // if (this.sel_value.yjdcqs.yjdcqs_pd == "1") {
          //   a_time = Number(a["USER_TIME"]);
          //   b_time = Number(b["USER_TIME"]);
          // } else if (this.sel_value.yjdcqs.yjdcqs_pd == "2") {}
          a_time = new Date(a["TDATE"].substring(0,10)).getTime(new Date(a["TDATE"].substring(0,10)));
          b_time = new Date(b["TDATE"].substring(0,10)).getTime(new Date(b["TDATE"].substring(0,10)));
          
          return a_time - b_time;
        });

        Object.keys(user_data).forEach((key_user) => {
          user_time.push(user_data[key_user]["TDATE"].substring(5,10));
          mtd_pay_amt.push(
            (user_data[key_user]["PTD_WAIT_DUR_RATE"] * 100)
          );
          mtd_ago_amt.push(
            (user_data[key_user]["FINISH_RATE"] * 100)
          );
        });

        // console.log(user_time);


        //默认值开始 
        if(this.sel_value.Range_on.Range_set == "2"){

          this.barData.month=0;
          this.barData.value=0;
          this.barData.ago_value=0;
            
        }
        //默认值结束


        Object.keys(user_time).forEach((key_user) => {
          user_time[key_user]=(user_time[key_user]).substring(0,2)*1+'.'+(user_time[key_user]).substring(3,5)*1
        });

        // console.log("===asdadad    sdf    ====================");
        // this.barData.month=user_time[user_time.length-1];
        // this.barData.value=mtd_pay_amt[mtd_pay_amt.length-1];
        // this.barData.ago_value=user_time[user_time.length-1];
        // console.log(user_time[user_time.length-1]);
        // console.log(this.barData.value);
        // console.log(this.barData.ago_value);
        // console.log(user_time);




        this.chartIns_.setOption({
          grid: {
            left: "0%",
            top: "5%",
            right: "1%",
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
              return "日期："+params[0].axisValue+'<br/> 金额占比：'+params[0].marker+params[0].value.toFixed(1)+'%';
            }

          },

          xAxis: {
            type: "category",
            boundaryGap: false,
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
              smooth: true, //true 为平滑曲线，false为直线

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

              data: mtd_pay_amt,

              // type: "bar",
              type: "line",
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

    InitChartState() {

      this.chartIns55 = echarts.init(this.$refs["chart55"]);
      this.p1.then(()=>{

        let Namearr=[];//渠道
        let HospRev=[];//待客审
        let PenGoodRev=[];//待货审
        let PenFinRev=[];//待财审  
        let ToBePrint=[];//待打印
        let ToBeShipp=[];//待发货
        let AllVal=0;  //总量
        let AllAmt=[]; //具体值
        let PitchOn=0; //选中的值
        let barWidthVal='40%';  //柱状图的宽度
        Object.keys(this.data["order_status-order_status_disr"]).forEach((key_on) => {
          if(this.data["order_status-order_status_disr"][key_on].CHNL_NAME=='全司'){
            this.data["order_status-order_status_disr"][key_on].RANK=1;
          }else if(this.data["order_status-order_status_disr"][key_on].CHNL_NAME=='线上'){
            this.data["order_status-order_status_disr"][key_on].RANK=2;
          }else if(this.data["order_status-order_status_disr"][key_on].CHNL_NAME=='线下'){
            this.data["order_status-order_status_disr"][key_on].RANK=3;
          }
        });
        this.data["order_status-order_status_disr"]=this.data["order_status-order_status_disr"].sort((a, b)=>{return a["RANK"]-b["RANK"];});

        Object.keys(this.data["order_status-order_status_disr"]).forEach((key_ons) => {
          Namearr.push(this.data["order_status-order_status_disr"][key_ons].CHNL_NAME);

          AllVal=((this.data["order_status-order_status_disr"][key_ons].WAIT_CS_AUD_AMT+
            this.data["order_status-order_status_disr"][key_ons].WAIT_GOOGDS_AUD_AMT+
            this.data["order_status-order_status_disr"][key_ons].WAIT_FIN_AUD_AMT+
            this.data["order_status-order_status_disr"][key_ons].WAIT_PRT_AUD_AMT+
            this.data["order_status-order_status_disr"][key_ons].WAIT_SEND_AMT))||0;

          HospRev.push((AllVal)?((this.data["order_status-order_status_disr"][key_ons].WAIT_CS_AUD_AMT)/AllVal)*100:0);
          PenGoodRev.push((AllVal)?((this.data["order_status-order_status_disr"][key_ons].WAIT_GOOGDS_AUD_AMT)/AllVal)*100:0);
          PenFinRev.push((AllVal)?((this.data["order_status-order_status_disr"][key_ons].WAIT_FIN_AUD_AMT)/AllVal)*100:0);
          ToBePrint.push((AllVal)?((this.data["order_status-order_status_disr"][key_ons].WAIT_PRT_AUD_AMT)/AllVal)*100:0);
          ToBeShipp.push((AllVal)?((this.data["order_status-order_status_disr"][key_ons].WAIT_SEND_AMT)/AllVal)*100:0);
          
          AllAmt.push({CHNL_NAME:this.data["order_status-order_status_disr"][key_ons].CHNL_NAME,
            WAIT_CS_AUD_AMT:((this.data["order_status-order_status_disr"][key_ons].WAIT_CS_AUD_AMT||0)/10000).toFixed(1),
            WAIT_GOOGDS_AUD_AMT:((this.data["order_status-order_status_disr"][key_ons].WAIT_GOOGDS_AUD_AMT||0)/10000).toFixed(1),
            WAIT_FIN_AUD_AMT:((this.data["order_status-order_status_disr"][key_ons].WAIT_FIN_AUD_AMT||0)/10000).toFixed(1),
            WAIT_PRT_AUD_AMT:((this.data["order_status-order_status_disr"][key_ons].WAIT_PRT_AUD_AMT||0)/10000).toFixed(1),
            WAIT_SEND_AMT:((this.data["order_status-order_status_disr"][key_ons].WAIT_SEND_AMT||0)/10000).toFixed(1),
          });

        });


        this.chartIns55.clear();
        this.chartIns55.setOption({

          title: {
              text: '状态分布'
          },
          tooltip: {
            trigger: 'axis',
            padding: [2, 5, 2, 5],
            // position:['50%','30%'],

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
              return[((x>180)?150:x),y];
            },
            axisPointer: {
                // type: 'cross',
                type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
                label: {
                    backgroundColor: '#6a7985'
                }
            },

            formatter:function (params) {
              let UserData=0;
              PitchOn=AllAmt.filter(_=>{return _.CHNL_NAME===params[0].name});
              UserData=params[0].name+'<br/>'+
                ((params[4])?(params[4].marker+params[4].seriesName+'：'+PitchOn[0].WAIT_CS_AUD_AMT+'万('+(params[4].value).toFixed(1)+'%)')+'<br/>':'')+
                ((params[3])?(params[3].marker+params[3].seriesName+'：'+PitchOn[0].WAIT_GOOGDS_AUD_AMT+'万('+(params[3].value).toFixed(1)+'%)')+'<br/>':'')+
                ((params[2])?(params[2].marker+params[2].seriesName+'：'+PitchOn[0].WAIT_FIN_AUD_AMT+'万('+(params[2].value).toFixed(1)+'%)')+'<br/>':'')+
                ((params[1])?(params[1].marker+params[1].seriesName+'：'+PitchOn[0].WAIT_PRT_AUD_AMT+'万('+(params[1].value).toFixed(1)+'%)')+'<br/>':'')+
                ((params[0])?(params[0].marker+params[0].seriesName+'：'+PitchOn[0].WAIT_SEND_AMT+'万('+(params[0].value).toFixed(1)+'%)')+'<br/>':'');
              return UserData;
            }

          },
          legend: {
              itemHeight: 4,
              itemWidth: 12,
              data: ['待客审', '待货审', '待财审','待打印','待发货']
          },
          toolbox: {
              feature: {
                  saveAsImage: {}
              }
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis: [
              {
                  type: 'category',
                  boundaryGap: true,  //柱子是否中间
                  data: Namearr,
                  axisLine: {
                    lineStyle: {
                      color: "#ccc",
                    },
                  },
              }
          ],
          yAxis: [
              {
                splitLine: {
                  show: false,
                  lineStyle: { type: "dotted", color: "#ccc" },
                },
                axisLine: {
                  show: false,
                  lineStyle: {
                    color: "#ccc",
                  },                  
                },
                axisTick: {
                  show: false,
                },
                type: 'value',
                max:100,
                axisLabel: {
                  formatter: "{value}%"
                }
              }
          ],
          series: [

              {
                name: '待发货',
                type: 'bar',
                stack: '总量',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                itemStyle: {
                  color: "#0938F7",
                  normal: {
                    // color: "#4ED3D3", 
                    color: "#6DC8EC",
                    lineStyle: {
                      // color: "#4ED3D3",
                      color: "#6DC8EC",
                      width: 2, //设置线条粗细
                    },
                  },
                },
                data: ToBeShipp,
                barWidth:barWidthVal,
              },

              {
                  name: '待打印',
                  type: 'bar',
                  stack: '总量',
                  areaStyle: {},
                  emphasis: {
                      focus: 'series'
                  },
                  itemStyle: {
                    color: "#0938F7",
                    normal: {
                      // color: "#E8294F",  
                      color: "#F6BD16",
                      lineStyle: {
                        // color: "#E8294F",
                        color: "#F6BD16",
                        width: 2, //设置线条粗细
                      },
                    },
                  },
                  data: ToBePrint,
                  barWidth:barWidthVal,
              },

              {
                  name: '待财审',
                  type: 'bar',
                  stack: '总量',
                  areaStyle: {},
                  emphasis: {
                      focus: 'series'
                  },
                  itemStyle: {
                    color: "#0938F7",
                    normal: {
                      // color: "#48C728",
                      color: "#5D7092",
                      lineStyle: {
                        // color: "#48C728",
                        color: "#5D7092",
                        width: 2, //设置线条粗细
                      },
                    },
                  },
                  data: PenFinRev,
                  barWidth:barWidthVal,
              },

              {
                  name: '待货审',
                  type: 'bar',
                  stack: '总量',
                  areaStyle: {},
                  emphasis: {
                      focus: 'series'
                  },
                  itemStyle: {
                    color: "#0938F7",
                    normal: {
                      // color: "#F5A028",
                      color: "#F7A35D",
                      lineStyle: {
                        // color: "#F5A028",
                        color: "#F7A35D",
                        width: 2, //设置线条粗细
                      },
                    },
                  },
                  data: PenGoodRev,
                  barWidth:barWidthVal,
              },

              {
                  name: '待客审',
                  type: 'bar',
                  stack: '总量',
                  areaStyle: {},
                  emphasis: {
                      focus: 'series'
                  },
                  itemStyle: {
                    color: "#0938F7",
                    normal: {
                      color: "#1678FF",
                      // color: "#699CFE",
                      lineStyle: {
                        color: "#1678FF",
                        // color: "#699CFE",
                        width: 2, //设置线条粗细
                      },
                    },
                  },
                  data: HospRev,
                  barWidth:barWidthVal,
              },

          ]

        });


      });

    },

    DeliveryDistChart(){

      this.chartInsDeli = echarts.init(this.$refs["ChartDeli"]);
      this.p1.then(()=>{
        let Namearr=[];//渠道
        let AmtThisMon=[];  //承诺本月发货
        let AmtNextMon=[];  //承诺次月发货
        let OtherAmt=[];    //其它承诺发货
        let AllVal=0;  //总量
        let AllAmt=[]; //具体值
        let PitchOn=0; //选中的值
        let barWidthVal='40%';  //柱状图的宽度
        Object.keys(this.data["order_status-order_status_disr"]).forEach((key_on) => {
          if(this.data["order_status-order_status_disr"][key_on].CHNL_NAME=='全司'){
            this.data["order_status-order_status_disr"][key_on].RANK=1;
          }else if(this.data["order_status-order_status_disr"][key_on].CHNL_NAME=='线上'){
            this.data["order_status-order_status_disr"][key_on].RANK=2;
          }else if(this.data["order_status-order_status_disr"][key_on].CHNL_NAME=='线下'){
            this.data["order_status-order_status_disr"][key_on].RANK=3;
          }
        });
        this.data["order_status-order_status_disr"]=this.data["order_status-order_status_disr"].sort((a, b)=>{return a["RANK"]-b["RANK"];});
   
        Object.keys(this.data["order_status-order_status_disr"]).forEach((key_ons) => {
          Namearr.push(this.data["order_status-order_status_disr"][key_ons].CHNL_NAME);
          AllVal=((this.data["order_status-order_status_disr"][key_ons].TOT_AMT_THIS_MON+
            this.data["order_status-order_status_disr"][key_ons].TOT_AMT_NEXT_MON+
            this.data["order_status-order_status_disr"][key_ons].OTHER_AMT))||0;
          AmtThisMon.push((AllVal)?((this.data["order_status-order_status_disr"][key_ons].TOT_AMT_THIS_MON)/AllVal)*100:0);
          AmtNextMon.push((AllVal)?((this.data["order_status-order_status_disr"][key_ons].TOT_AMT_NEXT_MON)/AllVal)*100:0);
          OtherAmt.push((AllVal)?((this.data["order_status-order_status_disr"][key_ons].OTHER_AMT)/AllVal)*100:0);
          AllAmt.push({CHNL_NAME:this.data["order_status-order_status_disr"][key_ons].CHNL_NAME,
            TOT_AMT_THIS_MON:((this.data["order_status-order_status_disr"][key_ons].TOT_AMT_THIS_MON||0)/10000).toFixed(1),
            TOT_AMT_NEXT_MON:((this.data["order_status-order_status_disr"][key_ons].TOT_AMT_NEXT_MON||0)/10000).toFixed(1),
            OTHER_AMT:((this.data["order_status-order_status_disr"][key_ons].OTHER_AMT||0)/10000).toFixed(1),
          });
        });


        this.chartInsDeli.clear();
        this.chartInsDeli.setOption({

          title: {
              text: '承诺发货业绩分布'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
                // type: 'cross',
                type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
                label: {
                    backgroundColor: '#6a7985'
                }
            },

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

            formatter:function (params) {
              let UserData=0;
              PitchOn=AllAmt.filter(_=>{return _.CHNL_NAME===params[0].name});
              UserData=params[0].name+'<br/>'+
                ((params[2])?(params[2].marker+params[2].seriesName+'：'+PitchOn[0].OTHER_AMT+'万('+(params[2].value).toFixed(1)+'%)')+'<br/>':'')+
                ((params[1])?(params[1].marker+params[1].seriesName+'：'+PitchOn[0].TOT_AMT_NEXT_MON+'万('+(params[1].value).toFixed(1)+'%)')+'<br/>':'')+
                ((params[0])?(params[0].marker+params[0].seriesName+'：'+PitchOn[0].TOT_AMT_THIS_MON+'万('+(params[0].value).toFixed(1)+'%)')+'<br/>':'');
              return UserData;
            }

          },
          legend: {
              itemHeight: 4,
              itemWidth: 12,
              data: ['本月发货', '次月发货', '其它发货',]
          },
          toolbox: {
              feature: {
                  saveAsImage: {}
              }
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis: [
              {
                  type: 'category',
                  boundaryGap: true,  //柱子是否中间
                  data: Namearr,
                  axisLine: {
                    lineStyle: {
                      color: "#ccc",
                    },
                  },
              }
          ],
          yAxis: [
              {
                splitLine: {
                  show: false,
                  lineStyle: { type: "dotted", color: "#ccc" },
                },
                axisLine: {
                  show: false,
                  lineStyle: {
                    color: "#ccc",
                  },                  
                },
                axisTick: {
                  show: false,
                },
                type: 'value',
                max:100,
                axisLabel: {
                  formatter: "{value}%"
                }
              }
          ],
          series: [

              {
                name: '本月发货',
                type: 'bar',
                stack: '总量',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                itemStyle: {
                  color: "#0938F7",
                  normal: {
                    // color: "#699CFE",  
                    color: "#1678FF",
                    lineStyle: {
                      // color: "#699CFE",
                      color: "#1678FF",
                      width: 2, //设置线条粗细
                    },
                  },
                },
                data: AmtThisMon,
                barWidth:barWidthVal,
              },

              {
                  name: '次月发货',
                  type: 'bar',
                  stack: '总量',
                  areaStyle: {},
                  emphasis: {
                      focus: 'series'
                  },
                  itemStyle: {
                    color: "#0938F7",
                    normal: {
                      color: "rgba(105,156,254,0.8)",
                      // color: "#F5A028",
                      lineStyle: {
                        color: "rgba(105,156,254,0.8)",
                        // color: "#F5A028",
                        width: 2, //设置线条粗细
                      },
                    },
                  },
                  data: AmtNextMon,
                  barWidth:barWidthVal,
              },

              {
                  name: '其它发货',
                  type: 'bar',
                  stack: '总量',
                  areaStyle: {},
                  emphasis: {
                      focus: 'series'
                  },
                  itemStyle: {
                    color: "#0938F7",
                    normal: {
                      color: "#F7A35D",
                      // color: "#48C728",
                      lineStyle: {
                        color: "#F7A35D",
                        // color: "#48C728",
                        width: 2, //设置线条粗细
                      },
                    },
                  },
                  data: OtherAmt,
                  barWidth:barWidthVal,
              },



          ]


        });       

      });



      

    },



    initChart3() {
      this.chartIns5 = echarts.init(this.$refs["chart5"]);

      this.p1.then(() => {

        try{

          if(this.echarts_clear==true){
            this.chartIns5.clear();
            this.echarts_clear=false;
          }

          let chartName= ["待客审", "待货审", "待财审", "待打印", "待发货"];

          // 算百分比的：
          let all_amt_value=(this.data["order_status-order_monitoring"][0].WAIT_CS_AUD_AMT)+
                          (this.data["order_status-order_monitoring"][0].WAIT_GOOGDS_AUD_AMT)+
                          (this.data["order_status-order_monitoring"][0].WAIT_FIN_AUD_AMT)+
                          (this.data["order_status-order_monitoring"][0].WAIT_PRT_AUD_AMT)+
                          (this.data["order_status-order_monitoring"][0].WAIT_SEND_AMT);

          let chartData= [(this.data["order_status-order_monitoring"][0].WAIT_CS_AUD_AMT),
                          (this.data["order_status-order_monitoring"][0].WAIT_GOOGDS_AUD_AMT),
                          (this.data["order_status-order_monitoring"][0].WAIT_FIN_AUD_AMT),
                          (this.data["order_status-order_monitoring"][0].WAIT_PRT_AUD_AMT),
                          (this.data["order_status-order_monitoring"][0].WAIT_SEND_AMT),
                        ]

          let chartColor=[{color:"rgb(22, 120, 255)"},
                          {color:"rgb(245, 160, 40)"},
                          {color:"rgb(72, 199, 40)"},
                          {color:"rgb(232, 41, 79)"},
                          {color:"rgb(78, 211, 211)"}]

          let data_value=[]
          let legendName=[]

          for (var i=0;i<chartData.length;i++){
            var c={
                value:chartData[i],
                // name:chartName[i]+' '+this.fomatMoney((chartData[i]/10000).toFixed(1)*1)+'万',
                name:chartName[i]+' '+this.fomatMoney((((chartData[i]/all_amt_value)||0)*100).toFixed(1)*1)+'%',
                itemStyle:chartColor[i]
            }
            data_value[i]=c;
            // legendName[i]=chartName[i]+' '+this.fomatMoney((chartData[i]/10000).toFixed(1)*1)+'万';
            legendName[i]=chartName[i]+' '+this.fomatMoney((((chartData[i]/all_amt_value)||0)*100).toFixed(1)*1)+'%';


          }


          this.chartIns5.setOption({
            title: {
              text: "订单占比饼图",
              // subtext: "纯属虚构",
              left: "center",
            },
            tooltip: {

              trigger: "item",
              // formatter: "{a} <br/>{b} : {c} ({d}%)",
              formatter: function(name){
      
                let [tip_name_set, tip_valeu_set] = name.name.split(" "); //把上面的拆分出来

                tip_valeu_set='';

                return tip_name_set+":"+tip_valeu_set+'('+name.percent+'%)';
              },
            },
            legend: {
              orient: "horizontal",
              // bottom: "bottom",
              top:"30%",
              right:"right",
              // data: ["待客审", "待货审", "待财审", "待打印", "待发货"],
              textStyle: {
                fontSize: 12,
              },
              itemHeight: 8,
              itemWidth: 8,
              icon: "circle",
              data:legendName,


            },
            series: [
              {
                name: "订单占比",
                type: "pie",
                radius: "65%",
                center: ["29%", "52%"],
                selectedMode: "single",
                selectedOffset: 3,


                data:data_value,
        
                /*在series中添加itemStyle即可直观显示饼型数值*/
                itemStyle:{
                  normal:{
                    label:{
                      show: false,
                      // formatter:'{b}:({d}%)'
                      formatter:function (params) {
                        // console.log(params);
                        return params.name+":"+"("+params.percent.toFixed(1)+"%)" +"\n"+"金额:"+(params.value/10000).toFixed(2)+"万"
                        
                      }
                    }
                  }
                },
                labelLine:{  
                  normal:{  
                      length:3
                  }  
                }, 

              },
            ],
          });


        }catch(error){ 
          console.log("========错误捕捉信息==========")
          // console.log(error)
          console.error(error);
          // this.info_error+=1;
          Information_log('渠道业绩-订单状态','运行到渠道业绩-订单状态饼图:  '+error.toString());
        }          



      });
    },

    initChart4() {

      this.chartIns6 = echarts.init(this.$refs["chart6"]);
      let user_data_dd=[];
      let user_time_dd=[];
      // let user_dhs_dd=[]; //待货审
      // let user_ddy_dd=[]; //待打印  
      // let user_dcs_dd=[]; //待财审
      // let user_dks_dd=[]; //待客审  
      // let user_dfh_dd=[]; //待发货
      let user_qs_dd=[]; //全司
      let user_xs_dd=[]; //线上 
      let user_xx_dd=[]; //线下
      let _this=this;

      let sent_time=0;  //传入的时间
      if(this.sel_value.ddqs.ddqs_pd=='1'||this.sel_value.ddqs.ddqs_pd=='2'){
        sent_time=new Date().getFullYear() +"-" +
          (new Date().getMonth() + 1 >= 1 && new Date().getMonth() + 1 <= 9? "0" + (new Date().getMonth() + 1): new Date().getMonth() + 1) +"-01"; 
      }else{
        sent_time=this.set_time;
      }


      
      let data_use = [];
      let promise=[]; //接口变量
      if(this.sel_value.ddqs.ddqs_pd=='1'||this.sel_value.ddqs.ddqs_pd=='3'){
        promise=this.$axios.post(`/api/admin/data/${'order_status'}/${'order_disp_d'}/get`, {TDATE:sent_time.substring(0,7)}).then(({ data }) => {
          data_use=data;
        });
      }    
      this.pChart= Promise.all([promise,this.p1]);

      this.pChart.then(() => {

        if(this.sel_value.ddqs.ddqs_pd=='1'||this.sel_value.ddqs.ddqs_pd=='3'){

          // user_data_dd=this.data["order_status-order_disp_d"];
          user_data_dd=data_use;

          user_data_dd.sort((a, b) => {
            let a_time = "";
            let b_time = "";
            a_time = new Date(a["TDATE"]).getTime(new Date(a["TDATE"]));
            b_time = new Date(b["TDATE"]).getTime(new Date(b["TDATE"]));
            return a_time - b_time;
          });

        }else if(this.sel_value.ddqs.ddqs_pd=='2'){

          user_data_dd=this.data["order_status-order_disp_m"];
          user_data_dd.sort((a, b) => {
            let a_time = "";
            let b_time = "";
            a_time = new Date(a["MDATE"]).getTime(new Date(a["MDATE"]));
            b_time = new Date(b["MDATE"]).getTime(new Date(b["MDATE"]));
            return a_time - b_time;
          });

        }
        // console.log("==============asdadas============");
        // console.log(this.set_time);
        // console.log(this.set_time.substring(0,7));
        // console.log(user_data_dd);


        Object.keys(user_data_dd).forEach((key_fenlei) => {
          user_time_dd.push((this.sel_value.ddqs.ddqs_pd=='1'||this.sel_value.ddqs.ddqs_pd=='3')?user_data_dd[key_fenlei]["TDATE"].substring(8,10)*1
            :user_data_dd[key_fenlei]["MDATE"].substring(5,7)*1+'月');

          if(this.sel_value.ddqs.ddqs_pd=='2'&&sent_time.substring(0,4)==(user_data_dd[key_fenlei]["MDATE"].substring(0,4))){
            if(user_data_dd[key_fenlei].CHNL_NAME=='全司'){
              user_qs_dd.push(user_data_dd[key_fenlei].PTD_ORDER_DISP_TIME);
            }else if(user_data_dd[key_fenlei].CHNL_NAME=='线上'){
              user_xs_dd.push(user_data_dd[key_fenlei].PTD_ORDER_DISP_TIME);
            }else if(user_data_dd[key_fenlei].CHNL_NAME=='线下'){
              user_xx_dd.push(user_data_dd[key_fenlei].PTD_ORDER_DISP_TIME);
            }
          }else if(this.sel_value.ddqs.ddqs_pd=='1'||this.sel_value.ddqs.ddqs_pd=='3'){
            if(user_data_dd[key_fenlei].CHNL_NAME=='全司'){
              user_qs_dd.push(user_data_dd[key_fenlei].PTD_ORDER_DISP_TIME);
            }else if(user_data_dd[key_fenlei].CHNL_NAME=='线上'){
              user_xs_dd.push(user_data_dd[key_fenlei].PTD_ORDER_DISP_TIME);
            }else if(user_data_dd[key_fenlei].CHNL_NAME=='线下'){
              user_xx_dd.push(user_data_dd[key_fenlei].PTD_ORDER_DISP_TIME);
            }            
          }  

        });
        user_time_dd=this.unique(user_time_dd);
        // console.log(this.UserYear);
        // console.log(user_time_dd);
        // console.log(user_qs_dd);
        // console.log(user_xs_dd);
        // console.log(user_xx_dd);

        this.chartIns6.clear();
        this.chartIns6.setOption({
          title: {
            text: "耗时分布",
          },
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
            },
            hideDelay: 3000,

            formatter: function (params) {
              let sentval=0;

              sentval=((_this.sel_value.ddqs.ddqs_pd=='1')?(''+params[0].name+'天'):(''+params[0].name))+'<br/>'
                +((params[0])?(params[0].marker+params[0].seriesName+'：'+(params[0].value).toFixed(1)):'')+'<br/>'
                +((params[1])?(params[1].marker+params[1].seriesName+'：'+(params[1].value).toFixed(1)):'')+'<br/>'
                +((params[2])?(params[2].marker+params[2].seriesName+'：'+(params[2].value).toFixed(2)):'')

              return sentval;

            },

          },
          legend: {
            // show:false,
            // bottom: "bottom",
            data: ["全司", "线上", "线下",],
            textStyle: {
              fontSize: 12,
            },
            itemHeight: 2,
            itemWidth: 10,
            icon: "rect",
          },
          grid: {
            left: "3%",
            right: "3%",
            bottom: "0%",
            top: "15%",
            containLabel: true,
          },

          // toolbox: {
          //   feature: {
          //     saveAsImage: {},
          //   },
          // },

          xAxis: [
            {
              type: 'category',
              boundaryGap: false,  //柱子是否中间
              data: user_time_dd,
              axisLine: {
                lineStyle: {
                  color: "#ccc",
                },
              },
            }
          ],

          yAxis: {
            
            splitLine: {
              show: true,
              lineStyle: { type: "dotted", color: "#ccc" },
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#ccc",
              },                  
            },
            axisTick: {
              show: false,
            },
            type: 'value',

          },

          series: [
            {
              name: "全司",
              type: "line",
              // stack: "总量",
              showSymbol: false,
              smooth: false, //true 为平滑曲线，false为直线  rgb(22, 120, 255)
              itemStyle: {
                color: "#919191",
                normal: {
                  // color: "#BBBBBB",
                  color: "rgb(22, 120, 255)",
                  lineStyle: {
                    // color: "#BBBBBB",
                    color: "rgb(22, 120, 255)",
                    width: 2, //设置线条粗细
                  },
                  areaStyle: {
                    color: "rgba(255, 255, 255, 0.00)",
                  },
                },
              },

              data: user_qs_dd,
            },
            {
              name: "线上",
              type: "line",
              // stack: "总量",
              showSymbol: false,
              smooth: false, //true 为平滑曲线，false为直线 
              itemStyle: {
                color: "#919191",
                normal: {
                  // color: "#BBBBBB",
                  color: "rgb(245, 160, 40)",
                  lineStyle: {
                    // color: "#BBBBBB",
                    color: "rgb(245, 160, 40)",
                    width: 2, //设置线条粗细
                  },
                  areaStyle: {
                    color: "rgba(255, 255, 255, 0.00)",
                  },
                },
              },

              data: user_xs_dd,
            },
            {
              name: "线下",
              type: "line",
              // stack: "总量",
              showSymbol: false,
              smooth: false, //true 为平滑曲线，false为直线 
              itemStyle: {
                color: "#919191",
                normal: {
                  // color: "#BBBBBB",
                  // color: "rgb(72, 199, 40)",
                  color:"#6DC8EC",
                  lineStyle: {
                    // color: "#BBBBBB",
                    // color: "rgb(72, 199, 40)",
                    color:"#6DC8EC",
                    width: 2, //设置线条粗细
                  },
                  areaStyle: {
                    color: "rgba(255, 255, 255, 0.00)",
                  },
                },
              },

              data: user_xx_dd,
            },



          ],
        });


      });
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

    // 判断是否iphonex开始
    isIPhoneX(){
        var u = navigator.userAgent;
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        var model_wh=[{height:812,width:375},{height:896,width:414}];
        if (isIOS) {        
            if ((screen.height == model_wh[0].height && screen.width == model_wh[0].width)||(screen.height == model_wh[1].height && screen.width == model_wh[1].width)){
                //是iphoneX
                console.log("是iphoneX");
                return true;
            }else{
                //不是iphoneX
                console.log("否");
                return false;
            } 
        }

    }
    // 判断是否iphonex结束

    


  },


  //生命周期结束之前销毁
  beforeDestroy () {
    this.$EventBus.$off("Salechan_choice_f");
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
  // width: 70px;
  width: 80px;
}

.but_set_select {
  color: rgba(89, 178, 178, 1);
}

/deep/ .yearmonthview .van-button--normal{
  padding: 0px;
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
  width: 100%;
  display: block;
  // font-size: 14px;
  font-size: 16px;
  text-align: center;
  // line-height: 30px;
  // color: #0066ff; 
  // color: #1678ff;
  // color: #00586D;
  // color: #159B80;
  // color: #03bacc;
  color: #000000; 
}
.target_info .target_info_body .target_info_text_i {
  width: 100%;
  display: block;
  font-style: normal;
  text-align: center;
  font-size: 12px;

  // padding-left: 10px;
  // padding-right: 10px;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 10px;

}

.target_info .target_info_body .target_info_text_i span {
  color: #919191;

  // background-color: rgb(247, 247, 247);
  // background-color: #e6e6e6;
  padding: 4px;
  // border: 1px solid #e6e6e6;
  border-radius: 50px;
  // padding-left: 15px;
  // padding-right: 15px;
  // width: 78px;
  padding-left: 5px;
  padding-right: 5px;
  // width: 90%;
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



.test_class {
  height: 10px;
}

.qushiyeji_title .van-row {
  // color: #6f6f6f;
  color: #999999;
  font-size: 12px;
}

.qushiyeji_title_con .van-row {
  color: #000000;
  font-size: 12px;
}



#aaaaa {
  padding-left: 10px;
  padding-right: 10px;
}

/deep/ #aaaaa div .van-cell{
  // background: #0066ff;
  padding-left: 5px;
  padding-right: 5px;
  //   padding: 0px;
  border-radius: 4px;
  background: rgb(247, 247, 247);
} 

/deep/ #aaaaa div .van-cell .van-cell__right-icon{

  // margin-right: 4px;
  // margin-right: 21px;
  margin-right: 11px;
  margin-left: 0px;

}

/deep/ #aaaaa div .van-collapse-item__wrapper .van-collapse-item__content{
  background: rgb(247, 247, 247);
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 0px;
  padding-bottom: 10px;

}


/deep/ .yjdcqs_color .rate-up_sales:after{
  // right: -12px;
  right: -11px;
  top: 3px;
} 

/deep/ .yjdcqs_color .rate-down_sales:after{
  // right: -12px;
  right: -11px;
  top: 9px;

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


.stress_value{
  font-size: 12px;
  display: flex;
  justify-content: flex-end;
  align-items: inherit;
}

.stress_value div.stress_body{
  width: 33.333333%;
  text-align: center;
  padding-top: 17px;
  padding-bottom: 10px;

}

.stress_value div.stress_body p.stress_p{
  color: #919191;
  margin: 0 auto;

}

.stress_value div.stress_body p.stress_t{
  margin: 0 auto;
  // margin-top: 10px;
  font-size: 16px;
  // font-weight: bold;
  // color: #23B0A8;
  // color: #3C3C3C;
  color: #000000;

}

.qhfb_css{
  padding-top: 10px;
  padding-bottom: 10px;
  background: #ffffff;
  border-radius: 4px;
  margin-left: 10px;
  margin-right: 10px;
}

.TagRatio{
  font-size: 12px;
  text-align: center;
  width: 100%;
  display: block;
  margin: 0px;
}

.YearMonthCss .van-col--6{
  width: 29%;

}

// style="background-color: #000000;"
</style>

