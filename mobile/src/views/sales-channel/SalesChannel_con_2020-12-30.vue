<template>
  <div class="Productmarket_all" style="background: rgb(245, 245, 245)">
    <!-- 滑屏开始 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <div>
      <!-- <van-notice-bar
      style="padding-left: 10px;padding-right: 10px;padding-top: 10px;padding-bottom: 10px;"
        wrapable
        :scrollable="false"
        color="#999999"
        background="rgba(245, 245, 245, 1)"
        :text="'更新时间：' + '2020-10-22'"
      /> -->


      

      <!-- 添加了加载项开始 -->
      <!-- <div v-if="data_loay==false" style="position: fixed; width: 100%;height: 2000px;z-index: 8;">
        <div  
          style=" position: fixed;left: 170px;top:100px;padding: 5px;border: 1px solid #e6e6e6;border-radius: 60px;background-color: #ffffff;box-shadow: 1px 1px 1px #919191;z-index: 9;">
          <van-loading  size="24px" color="#1989fa" style="" vertical></van-loading>
        </div>
      </div> -->
      <!-- 添加了加载项结束 -->
      

      <section
        style="padding-top: 5px; padding-bottom: 0px; border-radius: 4px; ;margin-left: 10px;margin-right: 10px;margin-bottom: 5px;"
      >
       <div class="" style="padding-left: 0px; padding-bottom: 0px;color: #999999;font-size: 12px;">
          {{'更新时间：' + data_load_time}}

        </div>
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

     
            </van-col>
          </van-row>

          <van-row class="target_info_body" style="padding-top: 15px">
            <van-col span="8">
              <i class="target_info_text_i">
                <span>{{
                  sel_title.chanzhi_wenzi.title_content.content4
                }}</span></i
              >             
              <span class="target_info_text_span">{{
                fomatMoney((sel_title.quota_value.cont4/10000).toFixed(1))+"万"||0
              }}</span>
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
            </van-col>
          </van-row>
        </div>

        <!-- 仪表盘开始 -->
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
            <!-- #0066ff -->
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
        </div>
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

      <!-- 业绩达成趋势开始 -->
      <!-- <van-notice-bar
        v-if="sel_value.theme.ouk == true"
        wrapable
        style="padding: 5px"
        :scrollable="false"
        color="rgba(245, 245, 245, 1)"
        background="rgba(245, 245, 245, 1)"
        text=""
      /> -->

      <p
        :style="sel_value.theme.ouk ?{display: 'block'}:{display: 'none'}"
        style="padding: 0px; margin: 0px; padding-left: 10px; font-size: 12px;padding-top: 5px;padding-bottom: 5px;"
      >
        业绩达成趋势
      </p>

      <div
        :style="sel_value.theme.ouk ? chart_css.yjfl_css : chart_css.yjfl_css_n"
      >
        <section>

          <!-- 切换优化开始 -->
          <van-row
            gutter=""
            type="flex"
            style="padding-left: 10px; padding-top: 0px; display: none;"
          >
            <van-col
              span="5"
              @click="
                Single_choice(
                  'yjdcqs_pd',
                  ['_this.data_screen_quota()'],
                  '1',
                  '_this.sel_value.yjdcqs'
                )
              "
              :style="
                sel_value.yjdcqs.yjdcqs_pd == '1'
                  ? whole_css.qudao_guanjan : whole_css.qudao_guanjan_n"
              style="margin-right: 1.5%; border-radius: 4px;"
            >
              <div style="padding: 4px; text-align: center; font-size: 12px">
                日累计
              </div>
            </van-col>

            <van-col
              span="5"
              @click="
                Single_choice(
                  'yjdcqs_pd',
                  ['_this.data_screen_quota()'],
                  '2',
                  '_this.sel_value.yjdcqs'
                )
              "
              :style="
                sel_value.yjdcqs.yjdcqs_pd == '2'
                  ? whole_css.qudao_guanjan : whole_css.qudao_guanjan_n"
              style="margin-right: 10px; border-radius: 4px;"
            >
              <div style="padding: 4px; text-align: center; font-size: 12px">
                月累计
              </div>
            </van-col>
          </van-row>
          <div style="clear: both"></div>
          <!-- 切换优化结束 -->


          <!-- 图例开始 -->
          <!-- <i style="font-style: normal;display: block;height:40px;"></i> -->

          <i style="font-style: normal;display: none;height:40px; margin-bottom: 0px;margin-top: 10px; padding-left: 10px; padding-right: 10px;">
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



          <!-- 业绩达成趋势列表开始 -->
          <van-collapse v-model="activeNames" :border="false" :accordion="true" id="aaaaa" style="text-align: center;" >
            <van-collapse-item
              name="2"
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
                    ><span style="margin-left: -0px">渠道类型</span></van-col
                  >
                  <van-col span="" :style="{ 'width':(yjdc_css.width*1+20)+'px'}">累计业绩(万)</van-col>
                  <van-col span="" :style="{ 'width':(yjdc_css.width*1)+'px'}">日累计</van-col>
                  <van-col span="" :style="{ 'width':(yjdc_css.width*1)+'px'}">月累计</van-col>
                  <van-col span="" :style="{ 'width':(yjdc_css.width*1-10)+'px'}"><span>同比</span></van-col>
                  <van-col span="" :style="{ 'width':(yjdc_css.width*1-10)+'px'}"><span>详情</span></van-col> 
                  <!-- <div
                    style="
                      float: right;
                      margin-right: -0px;
                      overflow: hidden;
                      margin-top: -24px;
                    "
                  >
                    详情
                  </div> -->
                </van-row>
              </template>
            </van-collapse-item>

            <van-collapse-item
              id="table_content_css"
              name="1"
              :disabled="sel_value.yjdcqs.disabled1"
              :border="false"
              :change="collapse_change('chart2')"
              title-class="qushiyeji_title"
              style="margin-top: -10px"
            >
              <template #title>
                <!-- <div>标题1</div>  -->
                <van-row class="yjdcqs_color">
                  <van-col span="" :style="{ 'width':(yjdc_css.width*1)+'px'}">{{
                    sel_title.yjdcqs_tabel.yjdcqs_total.CHANNEL
                  }}</van-col>
                  <van-col span="" :style="{ 'width':(yjdc_css.width*1+20)+'px'}">{{
                    fomatMoney((
                      (sel_title.yjdcqs_tabel.yjdcqs_total.SALE_AMT || 0) /
                      10000
                    ).toFixed(1)) + ""
                  }}</van-col>
                  <van-col span="" :style="{ 'width':(yjdc_css.width*1)+'px'}">{{
                    (
                      (sel_title.yjdcqs_tabel.yjdcqs_total.FINISH_RATE || 0) *
                      100
                    ).toFixed(1) + "%"
                  }}</van-col>


                  <van-col span="" :style="{ 'width':(yjdc_css.width*1)+'px'}">{{
                    ((sel_title.yjdcqs_tabel.mj_dcqs_total.FINISH_RATE||0)*100).toFixed(1)+'%'
                  }}</van-col>


                  <van-col :class="Number(sel_title.yjdcqs_tabel.yjdcqs_total.AGO_GROWTH_RATE ||0)>0? 'rate-up_sales':'rate-down_sales'" 
                    span="" :style="{ 'width':(yjdc_css.width*1-10)+'px'}">{{
                    ((sel_title.yjdcqs_tabel.yjdcqs_total.AGO_GROWTH_RATE ||0) * 100)>999?
                    (((sel_title.yjdcqs_tabel.yjdcqs_total.AGO_GROWTH_RATE ||0) * 100)/10000).toFixed(1) + "w%"
                    :((sel_title.yjdcqs_tabel.yjdcqs_total.AGO_GROWTH_RATE ||0) * 100).toFixed(1) + "%"
                    
                  }}</van-col>
                </van-row>
              </template>

              <!-- 图形开始  -->
              <!-- <div style="margin-top: -12px;margin-bottom: -12px;padding: 5px;border-radius: 4px;background: #f7f7f7;"></div> -->
                <div ref="chart2" @touchstart="canvas_qiehuan.canvas_toli_kg=true" @touchend="canvas_qiehuan.canvas_toli_kg=false"
                style="height: 154px;"
                :style="{'width':((canvas_css.width-20-20))+'px'}"
                ></div>
              
              
              <!-- 图形结束 -->
            </van-collapse-item>
            <div
              ref="chart2"
              style="width: 340px; height: 160px display: none;"
            ></div>
            <!-- 防止报错的 -->

            <van-collapse-item
              id="table_content_css2"
              name="3"
              :disabled="sel_value.yjdcqs.disabled2"
              :border="false"
              :change="collapse_change('chart3')"
              title-class="qushiyeji_title"
            >
              <template #title>
                <!-- <div>标题1</div>  -->
                <van-row class="yjdcqs_color">
                  <van-col span="" :style="{ 'width':(yjdc_css.width*1)+'px'}">{{
                    sel_title.yjdcqs_tabel.yjdcqs_online_channel.CHANNEL
                  }}</van-col>
                  <van-col span="" :style="{ 'width':(yjdc_css.width*1+20)+'px'}">{{
                    fomatMoney((
                      (sel_title.yjdcqs_tabel.yjdcqs_online_channel.SALE_AMT ||
                        0) / 10000
                    ).toFixed(1)) + ""
                  }}</van-col>
                  <van-col span="" :style="{ 'width':(yjdc_css.width*1)+'px'}">{{
                    (
                      (sel_title.yjdcqs_tabel.yjdcqs_online_channel
                        .FINISH_RATE || 0) * 100
                    ).toFixed(1) + "%"
                  }}</van-col>


                  <van-col span="" :style="{ 'width':(yjdc_css.width*1)+'px'}">{{
                    ((sel_title.yjdcqs_tabel.mj_dcqs_online_channel.FINISH_RATE||0)*100).toFixed(1)+'%'
                  }}</van-col>


                  <van-col :class="Number(sel_title.yjdcqs_tabel.yjdcqs_online_channel.AGO_GROWTH_RATE ||0)>0? 'rate-up_sales':'rate-down_sales'" 
                   span="" :style="{ 'width':(yjdc_css.width*1-10)+'px'}">{{

                    ((sel_title.yjdcqs_tabel.yjdcqs_online_channel.AGO_GROWTH_RATE ||0) * 100)>999?
                    (((sel_title.yjdcqs_tabel.yjdcqs_online_channel.AGO_GROWTH_RATE ||0) * 100)/10000).toFixed(1) + "w%"
                    :((sel_title.yjdcqs_tabel.yjdcqs_online_channel.AGO_GROWTH_RATE ||0) * 100).toFixed(1) + "%"
                    
                  }}</van-col>
                </van-row>
              </template>

              <!-- 图形开始  -->
              <!-- <div style="margin-top: -12px;margin-bottom: -12px;padding: 5px;border-radius: 4px;background: #f7f7f7;"></div> -->
                <div ref="chart3" @touchstart="canvas_qiehuan.canvas_toli_kg=true" @touchend="canvas_qiehuan.canvas_toli_kg=false"
                 style=" height: 154px;"
                 :style="{'width':((canvas_css.width-20-20))+'px'}"></div>
              
              <!-- 图形结束 -->
            </van-collapse-item>
            <div
              ref="chart3"
              style="width: 308px; height: 160px display: none;"
            ></div>
            <!-- 防止报错的 -->

            <van-collapse-item
              id="table_content_css3"
              name="4"
              :disabled="sel_value.yjdcqs.disabled3"
              :border="false"
              :change="collapse_change('chart4')"
              title-class="qushiyeji_title"
            >
              <template #title>
                <!-- <div>标题1</div> -->
                <van-row class="yjdcqs_color">
                  <van-col span="" :style="{ 'width':(yjdc_css.width*1)+'px'}">{{
                    sel_title.yjdcqs_tabel.yjdcqs_off_channel.CHANNEL
                  }}</van-col>
                  <van-col span="" :style="{ 'width':(yjdc_css.width*1+20)+'px'}">{{
                    fomatMoney((
                      (sel_title.yjdcqs_tabel.yjdcqs_off_channel.SALE_AMT ||
                        0) / 10000
                    ).toFixed(1)) + ""
                  }}</van-col>
                  <van-col span="" :style="{ 'width':(yjdc_css.width*1)+'px'}">{{
                    (
                      (sel_title.yjdcqs_tabel.yjdcqs_off_channel.FINISH_RATE ||
                        0) * 100
                    ).toFixed(1) + "%"
                  }}</van-col>


                  <van-col span="" :style="{ 'width':(yjdc_css.width*1)+'px'}">{{
                    ((sel_title.yjdcqs_tabel.mj_dcqs_off_channel.FINISH_RATE||0)*100).toFixed(1)+'%'
                  }}</van-col>



                  <van-col :class="Number(sel_title.yjdcqs_tabel.yjdcqs_off_channel.AGO_GROWTH_RATE ||0)>0? 'rate-up_sales':'rate-down_sales'" 
                  span="" :style="{ 'width':(yjdc_css.width*1-10)+'px'}">{{

                    ((sel_title.yjdcqs_tabel.yjdcqs_off_channel.AGO_GROWTH_RATE ||0) * 100)>999?
                    (((sel_title.yjdcqs_tabel.yjdcqs_off_channel.AGO_GROWTH_RATE ||0) * 100)/10000).toFixed(1) + "w%"
                    :((sel_title.yjdcqs_tabel.yjdcqs_off_channel.AGO_GROWTH_RATE ||0) * 100).toFixed(1) + "%"

                  }}</van-col>
                </van-row>
              </template>

              <!-- 图形开始  -->
              <!-- <div style="margin-top: -12px;margin-bottom: -12px;padding: 5px;border-radius: 4px;background: #f7f7f7;"></div> -->
                <div ref="chart4" @touchstart="canvas_qiehuan.canvas_toli_kg=true" @touchend="canvas_qiehuan.canvas_toli_kg=false"
                 style=" height: 154px;"
                 :style="{'width':((canvas_css.width-20-20))+'px'}"></div>
              
              <!-- 图形结束 -->
            </van-collapse-item>
            <div
              ref="chart4"
              style="width: 308px; height: 160px display: none;"
            ></div>
            <!-- 防止报错的 -->
          </van-collapse>
          <!-- 业绩达成趋势列表结束 -->
        </section>
      </div>

      <!-- 业绩达成趋势结束 -->

      <!-- 订单占比开始 -->
      <!-- <van-notice-bar
        v-if="sel_value.theme.muying == true"
        wrapable
        style="padding: 5px"
        :scrollable="false"
        color="rgba(245, 245, 245, 1)"
        background="rgba(245, 245, 245, 1)"
        text=""
      /> -->
    
      <p
        :style="sel_value.theme.muying ?{display: 'block'}:{display: 'none'}"
        style="padding: 0px; margin: 0px; padding-left: 10px; font-size: 12px;padding-top: 5px;padding-bottom: 5px;"
      >
        订单占比
      </p>

      <section>
        <div
          :style="
            sel_value.theme.muying ? chart_css.yjfl_css : chart_css.yjfl_css_n
          "
        >

          <div style="padding-left: 10px;padding-right: 10px;">
            <div ref="chart5" style=" height: 250px"
            :style="{'width':((canvas_css.width-20))+'px'}"></div>
          </div>
          
        </div>
      </section>
      <!-- 订单占比结束 -->



      <!-- 下面的暂时隐藏 -->
      <!-- 订单趋势开始 -->
      <van-notice-bar
        v-if="sel_value.theme.muying == true"
        wrapable
        style="padding: 5px;display: none;"
        :scrollable="false"
        color="rgba(245, 245, 245, 1)"
        background="rgba(245, 245, 245, 1)"
        text=""
      />

      <div
        :style="
          sel_value.theme.muying=='11' ? chart_css.yjfl_css : chart_css.yjfl_css_n
        "
      >
        <section>
          <p
            style="
              padding: 0px;
              margin: 0px;
              padding-left: 10px;
              font-size: 12px;
            "
          >
            订单趋势
          </p>

          <!-- 切换优化开始 -->
          <van-row
            gutter=""
            type="flex"
            style="padding-left: 10px; padding-top: 10px;padding-bottom: 0px;"
          >
            <van-col
              span="5"
              @click="Single_choice('ddqs_pd', ['_this.initChart4()'], '1', '_this.sel_value.ddqs')"
              :style="
                sel_value.ddqs.ddqs_pd == '1'
                  ? whole_css.qudao_guanjan : whole_css.qudao_guanjan_n"
              style="margin-right: 1.5%; border-radius: 4px;"
            >
              <div style="padding: 4px; text-align: center; font-size: 12px">
                全渠道
              </div>
            </van-col>
            <van-col
              span="5"
              @click="Single_choice('ddqs_pd', ['_this.initChart4()'], '2', '_this.sel_value.ddqs')"
              :style="
                sel_value.ddqs.ddqs_pd == '2'
                  ?  whole_css.qudao_guanjan :  whole_css.qudao_guanjan_n"
              style="margin-right: 1.5%; border-radius: 4px;"
            >
              <div style="padding: 4px; text-align: center; font-size: 12px">
                线上渠道
              </div>
            </van-col>

            <van-col
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
            </van-col>
          </van-row>
          <div style="clear: both"></div>
          <!-- 切换优化结束 -->


          <!-- 图例开始 -->
          <!-- <i style="font-style: normal;display: block;height:40px;"></i> -->

          <i style="font-style: normal;display: block;height:40px; margin-bottom: 0px;margin-top: 10px; padding-left: 10px; padding-right: 10px;">
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
            style="width: 320px; height: 200px;"></div>
          </div>

          
        </section>
      </div>

      <!-- 订单趋势结束 -->
    </div>

    </van-pull-refresh>


    <div style="width: 100%; height: 40px; background: rgba(245, 245, 245, 1);">
      <p style="text-align: center;margin: 0px;font-size: 14px;color: #CCCCCC;padding-top: 10px;">————  已经见底了  ————</p>
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

// import liquidfill from 'echarts-liquidfill'
import "echarts-liquidfill";



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
  Loading,
  
} from "vant";

export default {
  name: "SalesChannel_con",

  data() {
    return {
      activeNames: "0",
      isLoading: false,
      adasd: true,

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
        "fs_realtime-sales_amt_gap": "",
        "fs_realtime-sales_target": "",
        "fs_realtime-sales_amt": "",
        "fs_realtime-all_channel": "",
        "fs_realtime-crux_shop": "",
        "fs_realtime-ago_sales_amt": "",
        "fs_realtime-ago_sales_amt_rate": "",
        "fs_realtime-sales_amt_rate": "",
        "fs_realtime-channel_type": "",
        "fs_realtime-onlin_channel": "",
        "fs_realtime-off_channel": "",
        "fs_realtime-load_time": "",

        "fs_reach-tot_dlvred_gap": "",
        "fs_reach-tot_dlvred_gap_avg": "",
        "fs_reach-tot_dlvred_amt_d": "",
        "fs_reach-tot_dlvred_rate_d": "",
        "fs_reach-tot_dl_tgt_amt_d": "",
        "fs_reach-tot_dlvred_amt_m": "",
        "fs_reach-tot_dlvred_rate_m": "",
        "fs_reach-tot_dl_tgt_amt_m": "",
        "fs_reach-tot_sales_gap": "",
        "fs_reach-tot_sales_gap_avg": "",
        "fs_reach-tot_sales_amt_d": "",
        "fs_reach-tot_sales_amt_rate_d": "",
        "fs_reach-tot_tgt_amt_d": "",
        "fs_reach-tot_sales_amt_m": "",
        "fs_reach-tot_sales_amt_rate_m": "",
        "fs_reach-tot_tgt_amt_m": "",

        "fs_reach-dlvr_month_amt": "",
        "fs_reach-dlvr_month_amt_down": "",
        "fs_reach-pay_month_amt": "",
        "fs_reach-pay_month_amt_down": "",

        "fs_reach-pay_day_amt": "",
        "fs_reach-pay_day_amt_down": "",
        "fs_reach-dlvr_day_amt": "",
        "fs_reach-dlvr_day_amt_down": "",

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
  },

  computed: {
    ...mapState("user", ["permissionList"]), //大概的意思是获取权限
  },

  created() {
    this.canvas_css.width = window.innerWidth - 20 ;
    // this.yjdc_css.width = (window.innerWidth - 20 - 32 - 20) / 4 + "px";
    this.yjdc_css.width = (window.innerWidth - 20 - 20 -10) / 6 ;

    // console.log(this.yjdc_css.width);
    // console.log(this.canvas_css.width);
    // console.log( (window.innerWidth - 20 - 20-20-20));

    this.$EventBus.$emit("data_loay_set", {
      data_loay_seton: false,
    });



    const [p1, resolve1] = generatePromise();
    this.p1 = p1;

    // this.$store.commit('app/setProductMarket', 3)  //参考的
    // console.log("=====11===========")
    // // console.log(this.data_loay);
    // this.$EventBus.$on("Salechan_choice_f", (Range_value_set) => {
    //   console.log(" ==有传值过来！！！！！== ");
    //   console.log(Range_value_set.Range_value_set);
    //   this.test_set_value=Range_value_set.Range_value_set;

    // });
    // console.log("=======赋值的！！！=========")
    // console.log(this.test_set_value);

  
    // if(sessionStorage.getItem("saleschan") == null){

    

      const apiMap = {
        // 实时业绩
        "SQL-fs_realtime-sales_amt_gap": { resultProp: "sales_amt_gap" },
        "SQL-fs_realtime-sales_target": { resultProp: "sales_target" },
        "SQL-fs_realtime-sales_amt": { resultProp: "sales_amt" },
        "SQL-fs_realtime-all_channel": { resultProp: "all_channel" },
        "SQL-fs_realtime-crux_shop": { resultProp: "crux_shop" },
        "SQL-fs_realtime-ago_sales_amt": { resultProp: "ago_sales_amt" },
        "SQL-fs_realtime-ago_sales_amt_rate": {
          resultProp: "ago_sales_amt_rate",
        },
        "SQL-fs_realtime-sales_amt_rate": { resultProp: "sales_amt_rate" },
        "SQL-fs_realtime-channel_type": { resultProp: "channel_type" },
        "SQL-fs_realtime-onlin_channel": { resultProp: "onlin_channel" },
        "SQL-fs_realtime-off_channel": { resultProp: "off_channel" },

        "SQL-fs_realtime-load_time": { resultProp: "load_time" },
        // "SQL-fs_realtime-load_time": { type: Array, resolve: resolve1 },
        

        // 业绩达成 
        "SQL-fs_reach-tot_dlvred_gap": { resultProp: "tot_dlvred_gap" },
        "SQL-fs_reach-tot_dlvred_gap_avg": { resultProp: "tot_dlvred_gap_avg" },
        "SQL-fs_reach-tot_dlvred_amt_d": { resultProp: "tot_dlvred_amt_d" },
        "SQL-fs_reach-tot_dlvred_rate_d": { resultProp: "tot_dlvred_rate_d" },
        "SQL-fs_reach-tot_dl_tgt_amt_d": { resultProp: "tot_dl_tgt_amt_d" },
        "SQL-fs_reach-tot_dlvred_amt_m": { resultProp: "tot_dlvred_amt_m" },
        "SQL-fs_reach-tot_dlvred_rate_m": { resultProp: "tot_dlvred_rate_m" },
        "SQL-fs_reach-tot_dl_tgt_amt_m": { resultProp: "tot_dl_tgt_amt_m" },
        "SQL-fs_reach-tot_sales_gap": { resultProp: "tot_sales_gap" },
        "SQL-fs_reach-tot_sales_gap_avg": { resultProp: "tot_sales_gap_avg" },
        "SQL-fs_reach-tot_sales_amt_d": { resultProp: "tot_sales_amt_d" },
        "SQL-fs_reach-tot_sales_amt_rate_d": {
          resultProp: "tot_sales_amt_rate_d",
        },
        "SQL-fs_reach-tot_tgt_amt_d": { resultProp: "tot_tgt_amt_d" },
        "SQL-fs_reach-tot_sales_amt_m": { resultProp: "tot_sales_amt_m" },
        "SQL-fs_reach-tot_sales_amt_rate_m": {
          resultProp: "tot_sales_amt_rate_m",
        },
        "SQL-fs_reach-tot_tgt_amt_m": { resultProp: "tot_tgt_amt_m" },

        "SQL-fs_reach-dlvr_month_amt": { resultProp: "dlvr_month_amt" },
        "SQL-fs_reach-dlvr_month_amt_down": { resultProp: "dlvr_month_amt_down" },
        "SQL-fs_reach-pay_month_amt": { resultProp: "pay_month_amt" },
        "SQL-fs_reach-pay_month_amt_down": { resultProp: "pay_month_amt_down" },

        "SQL-fs_reach-pay_day_amt": { resultProp: "pay_day_amt" },
        "SQL-fs_reach-pay_day_amt_down": { resultProp: "pay_day_amt_down" },
        "SQL-fs_reach-dlvr_day_amt": { resultProp: "dlvr_day_amt" },
        "SQL-fs_reach-dlvr_day_amt_down": { resultProp: "dlvr_day_amt_down" },

        // 订单状态
        "SQL-order_status-order_status_all": { resultProp: "order_status_all" },
        "SQL-order_status-order_status_onlin": {resultProp: "order_status_onlin",},
        "SQL-order_status-order_status_off": { resultProp: "order_status_off" },
        "SQL-order_status-order_trend": { resultProp: "order_trend" },

        // "SQL-order_status-order_rate": { type: Array, resolve: resolve1 },
        "SQL-order_status-order_monitoring": { type: Array, resolve: resolve1 },
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
                  // this.data_loay=true;
                  console.log("加载完成！！！！！！！！！！！！！！！");
                  // console.log(this.data_loay);
                  this.$EventBus.$emit("data_loay_set", {
                    data_loay_seton: true,
                  });


                }
              });
          }
        }
      });





    // }

    






    // console.log("==================");
    // console.log(this.data);

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

    // const [p1, resolve1] = generatePromise();
    // this.p1 = p1;


    this.$EventBus.$on("Salechan_choice_f", (Range_value_set) => {
      // console.log("父类传值过来的！！！！");
      // console.log(Range_value_set.Range_value_set);
      // this.change_show(Range_value_set.Range_value_set);
      let set_value = "";
      // let apiMap={};

      this.sel_value.Range_on.Range_set = Range_value_set.Range_value_set;
      switch (Range_value_set.Range_value_set) {

        case "1":

          set_value = "cpcy";
          this.Single_choice(
            set_value,
            ["_this.change_show(" + Range_value_set.Range_value_set + ")","_this.initChart()"],
            true,
            "_this.sel_value.theme"
          );        
          break;
        case "2":

          set_value = "ouk";
          this.Single_choice(
            set_value,
            ["_this.change_show(" + Range_value_set.Range_value_set + ")"],
            true,
            "_this.sel_value.theme"
          );   
          
          break;
        case "3":

          set_value = "muying";
          this.Single_choice(
            set_value,
            ["_this.change_show(" + Range_value_set.Range_value_set + ")"],
            true,
            "_this.sel_value.theme"
          );   
          break;
        default:
          set_value = "cpcy";
          this.Single_choice(
            set_value,
            ["_this.change_show(" + Range_value_set.Range_value_set + ")","_this.initChart()"],
            true,
            "_this.sel_value.theme"
          );  


      }

          // this.Single_choice(
          //   set_value,
          //   ["_this.change_show(" + Range_value_set.Range_value_set + ")","_this.initChart()"],
          //   true,
          //   "_this.sel_value.theme"
          // );   

      // console.log(set_value);
      // this.change_show(Range_value_set.Range_value_set);

    });


    // this.Single_choice('qudao_guanj_pd','','1','_this.sel_value.qudao_guanjan');
    this.change_show("1");

    // this.data_screen("1");

    this.initChart();
    this.initChart_Dashboard();

    this.initChart3();
    this.initChart4();
    this.collapse_change("chart2");



    // this.test_fun();
  },

  methods: {

    onRefresh() {
      setTimeout(() => {
        // Toast('刷新成功');
        // 暂时还没用得上只是做个效果出来
        this.isLoading = false;
        this.count++;
      }, 1000);
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
      

      this.initChart_Dashboard();
      this.initChart4();
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

    data_screen_quota() {
      // console.log(this.sel_value.Range_on.Range_set);
      // let con_data="";
      // console.log(data);

      this.p1.then(() => {
        let data = this.data_screen(this.data);
        let value = this.sel_value.Range_on.Range_set;
        let set_height = "";

        this.data_load_time=(this.data["fs_realtime-load_time"][0].LOAD_TIME).substring(0,11);

        if (value == "1") {
          // console.log(data);
          // console.log(data["fs_realtime-sales_amt"][0]["SALES_AMT"]);

          this.sel_title.quota_value.cont1 = (
            data["fs_realtime-sales_target"][0]["SALES_TARGET"] || 0
          ).toFixed(0);
          this.sel_title.quota_value.cont2 = (
            data["fs_realtime-sales_amt"][0]["SALES_AMT"] || 0
          ).toFixed(0);
          this.sel_title.quota_value.cont3 =
            (
              (data["fs_realtime-sales_amt_rate"][0]["SALES_AMT_RATE"] || 0) *
              100
            ).toFixed(1) + "%";
          this.sel_title.quota_value.cont4 = (
            data["fs_realtime-sales_amt_gap"][0]["SALES_AMT_GAP"] || 0
          ).toFixed(0);
          this.sel_title.quota_value.cont5 = (
            data["fs_realtime-ago_sales_amt"][0]["AGO_SALES_AMT"] || 0
          ).toFixed(0);
          this.sel_title.quota_value.cont6 =
            (
              (data["fs_realtime-ago_sales_amt_rate"][0][
                "AGO_SALES_AMT_RATE"
              ] || 0) * 100
            ).toFixed(1) + "%";


          // console.log("==============业绩分类！！！！！！！！！！！==================");
          // console.log(this.sel_value.qudao_guanjan.qudao_guanj_pd);

          if (this.sel_value.qudao_guanjan.qudao_guanj_pd == "1") {

            Object.keys(data["fs_realtime-channel_type"]).forEach((key_order) => {
              if(data["fs_realtime-channel_type"][key_order].CHANNEL=="合计"){
                data["fs_realtime-channel_type"][key_order].ORDER_NUM=0;
              }else if(data["fs_realtime-channel_type"][key_order].CHANNEL=="线上渠道"){
                data["fs_realtime-channel_type"][key_order].ORDER_NUM=1;
              }else if(data["fs_realtime-channel_type"][key_order].CHANNEL=="线下渠道"){
                data["fs_realtime-channel_type"][key_order].ORDER_NUM=2;
              }
            });
            data["fs_realtime-channel_type"] = data["fs_realtime-channel_type"].sort((a, b) => {
              let value_sort = "";
              let a_time = a["ORDER_NUM"];
              let b_time = b["ORDER_NUM"];
              value_sort = Number(a_time) - Number(b_time);
              return value_sort;
            });
            
            this.sel_title.yjfl_value = data["fs_realtime-channel_type"];
            set_height = data["fs_realtime-channel_type"].length;


            this.$EventBus.$emit("Swiper_content_f", {
              height: 32 + 159 + 10 + (10+16+34+10) + 320+10 + 30 * set_height +50+40+20,
            });
          } else if (this.sel_value.qudao_guanjan.qudao_guanj_pd == "2") {

            Object.keys(data["fs_realtime-crux_shop"]).forEach((key_nei) => {
              // data["fs_realtime-crux_shop"][key_nei].AGO_GROWTH_RATE= 0;
              data["fs_realtime-crux_shop"][key_nei].CHANNEL =
                data["fs_realtime-crux_shop"][key_nei].SHOP_NAME;
              data["fs_realtime-crux_shop"][key_nei].FINISH_RATE =
                data["fs_realtime-crux_shop"][key_nei].SALE_RATE;
            });


            data["fs_realtime-crux_shop"].sort((a, b) => { 
              let value_sort = b["SALE_AMT"] - a["SALE_AMT"];
              return value_sort;
            });


            
            this.sel_title.yjfl_value = data["fs_realtime-crux_shop"];
            set_height = data["fs_realtime-crux_shop"].length;
            this.$EventBus.$emit("Swiper_content_f", {
              height: 32 + 159 + 10 + (10+16+34+10) + 320+10 + 30 * set_height +50+40+20,
            });

            // console.log("运行到关键店铺这里！！！！！！！！！！！！！！阿萨大大！！！！！！！！！！！");
            // console.log(32 + 159 + 10 + (10+16+34+10) + 320+10 + 30 * set_height +50+40+20);



          }


          // console.log(this.sel_title.yjfl_value[0]);
        } else if (value == "2") {
          if (this.sel_value.zffhyjkj_set.zffhyjkj_set_pd == "1") {
            this.sel_title.quota_value.cont1 =
              data["fs_reach-tot_tgt_amt_d"][0]["TOT_TGT_AMT_D"].toFixed(0) ||
              0;
            this.sel_title.quota_value.cont2 =
              data["fs_reach-tot_sales_amt_d"][0]["TOT_SALES_AMT_D"].toFixed(
                0
              ) || 0;
            this.sel_title.quota_value.cont3 =
              (
                data["fs_reach-tot_sales_amt_rate_d"][0][
                  "TOT_SALES_AMT_RATE_D"
                ] * 100
              ).toFixed(1) + "%" || 0;
            this.sel_title.quota_value.cont4 =
              data["fs_reach-tot_tgt_amt_m"][0]["TOT_TGT_AMT_M"].toFixed(0) ||
              0;
            this.sel_title.quota_value.cont5 =
              data["fs_reach-tot_sales_amt_m"][0]["TOT_SALES_AMT_M"].toFixed(
                0
              ) || 0;
            this.sel_title.quota_value.cont6 =
              (
                (data["fs_reach-tot_sales_amt_rate_m"][0][
                  "TOT_SALES_AMT_RATE_M"
                ]|| 0) * 100
              ).toFixed(1) + "%" ;

            this.sel_title.ybb_value.cont1 =
              data["fs_reach-tot_sales_gap"][0]["TOT_SALES_GAP"].toFixed(0) ||
              0;
            this.sel_title.ybb_value.cont2 =
              data["fs_reach-tot_sales_gap_avg"][0][
                "TOT_SALES_GAP_AVG"
              ].toFixed(0) || 0;
            this.sel_title.ybb_value.percentage =
              data["fs_reach-tot_sales_amt_rate_m"][0][
                "TOT_SALES_AMT_RATE_M"
              ] || 0;

            

            console.log("=====主题2的=====");
            if (this.sel_value.yjdcqs.yjdcqs_pd == "1") {

              console.log("支付的 运行到这里 日累计");
              console.log(this.data["fs_reach-pay_day_amt"]);

              // 日累计开始
              Object.keys(this.data["fs_reach-pay_day_amt"]).forEach(
                (key_yjqs) => {
                  this.data["fs_reach-pay_day_amt"][key_yjqs][
                    "SALE_AMT"
                  ] = this.data["fs_reach-pay_day_amt"][key_yjqs][
                    "MTD_PAY_AMT"
                  ];
                  if (
                    this.data["fs_reach-pay_day_amt"][key_yjqs]["CHANNEL"] ==
                    "合计"
                  ) {
                    this.sel_title.yjdcqs_tabel.yjdcqs_total = this.data[
                      "fs_reach-pay_day_amt"
                    ][key_yjqs];
                  } else if (
                    this.data["fs_reach-pay_day_amt"][key_yjqs]["CHANNEL"] ==
                    "线上渠道"
                  ) {
                    this.sel_title.yjdcqs_tabel.yjdcqs_online_channel = this.data[
                      "fs_reach-pay_day_amt"
                    ][key_yjqs];
                  } else if (
                    this.data["fs_reach-pay_day_amt"][key_yjqs]["CHANNEL"] ==
                    "线下渠道"
                  ) {
                    this.sel_title.yjdcqs_tabel.yjdcqs_off_channel = this.data[
                      "fs_reach-pay_day_amt"
                    ][key_yjqs];
                  }
                }
              );

     

              // 月累计开始
              Object.keys(this.data["fs_reach-pay_month_amt"]).forEach(
                (key_yjqs) => {
                  this.data["fs_reach-pay_month_amt"][key_yjqs][
                    "SALE_AMT"
                  ] = this.data["fs_reach-pay_month_amt"][key_yjqs][
                    "MTD_PAY_AMT"
                  ];

                  if (
                    this.data["fs_reach-pay_month_amt"][key_yjqs]["CHANNEL"] ==
                    "合计"
                  ) {
                    this.sel_title.yjdcqs_tabel.mj_dcqs_total = this.data[
                      "fs_reach-pay_month_amt"
                    ][key_yjqs];
                  } else if (
                    this.data["fs_reach-pay_month_amt"][key_yjqs]["CHANNEL"] ==
                    "线上渠道"
                  ) {
                    this.sel_title.yjdcqs_tabel.mj_dcqs_online_channel = this.data[
                      "fs_reach-pay_month_amt"
                    ][key_yjqs];
                  } else if (
                    this.data["fs_reach-pay_month_amt"][key_yjqs]["CHANNEL"] ==
                    "线下渠道"
                  ) {
                    this.sel_title.yjdcqs_tabel.mj_dcqs_off_channel = this.data[
                      "fs_reach-pay_month_amt"
                    ][key_yjqs];
                  }
                }
              );



            } else if (this.sel_value.yjdcqs.yjdcqs_pd == "2") {
              // console.log("支付的 运行到这里 月累计");
              Object.keys(this.data["fs_reach-pay_month_amt"]).forEach(
                (key_yjqs) => {
                  this.data["fs_reach-pay_month_amt"][key_yjqs][
                    "SALE_AMT"
                  ] = this.data["fs_reach-pay_month_amt"][key_yjqs][
                    "MTD_PAY_AMT"
                  ];

                  if (
                    this.data["fs_reach-pay_month_amt"][key_yjqs]["CHANNEL"] ==
                    "合计"
                  ) {
                    this.sel_title.yjdcqs_tabel.yjdcqs_total = this.data[
                      "fs_reach-pay_month_amt"
                    ][key_yjqs];
                  } else if (
                    this.data["fs_reach-pay_month_amt"][key_yjqs]["CHANNEL"] ==
                    "线上渠道"
                  ) {
                    this.sel_title.yjdcqs_tabel.yjdcqs_online_channel = this.data[
                      "fs_reach-pay_month_amt"
                    ][key_yjqs];
                  } else if (
                    this.data["fs_reach-pay_month_amt"][key_yjqs]["CHANNEL"] ==
                    "线下渠道"
                  ) {
                    this.sel_title.yjdcqs_tabel.yjdcqs_off_channel = this.data[
                      "fs_reach-pay_month_amt"
                    ][key_yjqs];
                  }
                }
              );
            }

            // console.log(data["fs_reach-pay_month_amt"]);
          } else if (this.sel_value.zffhyjkj_set.zffhyjkj_set_pd == "2") {
            this.sel_title.quota_value.cont1 =
              data["fs_reach-tot_dl_tgt_amt_d"][0]["TOT_DL_TGT_AMT_D"].toFixed(
                0
              ) || 0;
            this.sel_title.quota_value.cont2 =
              data["fs_reach-tot_dlvred_amt_d"][0]["TOT_DLVRED_AMT_D"].toFixed(
                0
              ) || 0;
            this.sel_title.quota_value.cont3 =
              (
                data["fs_reach-tot_dlvred_rate_d"][0]["TOT_DLVRED_RATE_D"] * 100
              ).toFixed(1) + "%" || 0;
            this.sel_title.quota_value.cont4 =
              data["fs_reach-tot_dl_tgt_amt_m"][0]["TOT_DL_TGT_AMT_M"].toFixed(
                0
              ) || 0;
            this.sel_title.quota_value.cont5 =
              data["fs_reach-tot_dlvred_amt_m"][0]["TOT_DLVRED_AMT_M"].toFixed(
                0
              ) || 0;
            this.sel_title.quota_value.cont6 =
              (
                (data["fs_reach-tot_dlvred_rate_m"][0]["TOT_DLVRED_RATE_M"] || 0 )* 100
              ).toFixed(1) + "%" ;

            this.sel_title.ybb_value.cont1 =
              data["fs_reach-tot_dlvred_gap"][0]["TOT_DLVRED_GAP"].toFixed(0) ||
              0;
            this.sel_title.ybb_value.cont2 =
              data["fs_reach-tot_dlvred_gap_avg"][0][
                "TOT_DLVRED_GAP_AVG"
              ].toFixed(0) || 0;
            this.sel_title.ybb_value.percentage =
              data["fs_reach-tot_dlvred_rate_m"][0]["TOT_DLVRED_RATE_M"] || 0;

            if (this.sel_value.yjdcqs.yjdcqs_pd == "1") {
              console.log("发货的 运行到这里 日累计");
              console.log("待更新！！！！");

              Object.keys(this.data["fs_reach-dlvr_day_amt"]).forEach(
                (key_yjqs) => {
                  this.data["fs_reach-dlvr_day_amt"][key_yjqs][
                    "SALE_AMT"
                  ] = this.data["fs_reach-dlvr_day_amt"][key_yjqs][
                    "MTD_DLVR_AMT"
                  ];

                  if (
                    this.data["fs_reach-dlvr_day_amt"][key_yjqs]["CHANNEL"] ==
                    "合计"
                  ) {
                    this.sel_title.yjdcqs_tabel.yjdcqs_total = this.data[
                      "fs_reach-dlvr_day_amt"
                    ][key_yjqs];
                  } else if (
                    this.data["fs_reach-dlvr_day_amt"][key_yjqs]["CHANNEL"] ==
                    "线上渠道"
                  ) {
                    this.sel_title.yjdcqs_tabel.yjdcqs_online_channel = this.data[
                      "fs_reach-dlvr_day_amt"
                    ][key_yjqs];
                  } else if (
                    this.data["fs_reach-dlvr_day_amt"][key_yjqs]["CHANNEL"] ==
                    "线下渠道"
                  ) {
                    this.sel_title.yjdcqs_tabel.yjdcqs_off_channel = this.data[
                      "fs_reach-dlvr_day_amt"
                    ][key_yjqs];
                  }
                }
              );
            } else if (this.sel_value.yjdcqs.yjdcqs_pd == "2") {
              console.log("发货的 运行到这里 月累计");
              Object.keys(this.data["fs_reach-dlvr_month_amt"]).forEach(
                (key_yjqs) => {
                  this.data["fs_reach-dlvr_month_amt"][key_yjqs][
                    "SALE_AMT"
                  ] = this.data["fs_reach-dlvr_month_amt"][key_yjqs][
                    "MTD_DLVR_AMT"
                  ];

                  if (
                    this.data["fs_reach-dlvr_month_amt"][key_yjqs]["CHANNEL"] ==
                    "合计"
                  ) {
                    this.sel_title.yjdcqs_tabel.yjdcqs_total = this.data[
                      "fs_reach-dlvr_month_amt"
                    ][key_yjqs];
                  } else if (
                    this.data["fs_reach-dlvr_month_amt"][key_yjqs]["CHANNEL"] ==
                    "线上渠道"
                  ) {
                    this.sel_title.yjdcqs_tabel.yjdcqs_online_channel = this.data[
                      "fs_reach-dlvr_month_amt"
                    ][key_yjqs];
                  } else if (
                    this.data["fs_reach-dlvr_month_amt"][key_yjqs]["CHANNEL"] ==
                    "线下渠道"
                  ) {
                    this.sel_title.yjdcqs_tabel.yjdcqs_off_channel = this.data[
                      "fs_reach-dlvr_month_amt"
                    ][key_yjqs];
                  }
                }
              );
            }
          }

          // set_height=data["fs_realtime-crux_shop"].length;
          this.$EventBus.$emit("Swiper_content_f", {
            height: 32 + 317 + 10 + 420 + 50+40-24+50-10,
          });

          // console.log(data);
          // console.log(this.data["fs_realtime-channel_type"]);
        } else if (value == "3") {
          this.sel_title.quota_value.cont1 = data[
            "order_status-order_status_all"
          ][0]["TOT_WAIT_CS_AUD_AMT"].toFixed(0);
          this.sel_title.quota_value.cont2 = data[
            "order_status-order_status_all"
          ][0]["TOT_WAIT_GOOGDS_AUD_AMT"].toFixed(0);
          this.sel_title.quota_value.cont3 = ((data[
            "order_status-order_status_all"
          ][0]["WAIT_FIN_AUD_AMT"]||0)/10000).toFixed(1)+'万';
          this.sel_title.quota_value.cont4 = data[
            "order_status-order_status_all"
          ][0]["TOT_WAIT_PRT_AUD_AMT"].toFixed(0);
          this.sel_title.quota_value.cont5 = data[
            "order_status-order_status_all"
          ][0]["WAIT_SEND_AMT"].toFixed(0);

          // 需要更新的！
          // this.sel_title.quota_value.cont6 = data["order_status-order_time"][0][
          //   "ORDER_TIME"
          // ].toFixed(1);
          this.sel_title.quota_value.cont6 = (data["order_status-order_monitoring"][0].ORDER_DISPOSE_TIME).toFixed(1);
          // console.log("================订单状态3！！！！！===========================");
          // console.log(data["order_status-order_monitoring"][0].ORDER_DISPOSE_TIME);


          if(this.isIPhoneX()){
            this.$EventBus.$emit("Swiper_content_f", {
              height: 32 + 317 + 10 + 90 + 20+40-24+90+(150),
            });
          }else{
            this.$EventBus.$emit("Swiper_content_f", {
              height: 32 + 317 + 10 + 90 + 20+40-24+90,
            });
          }
          

        }
      });

      // console.log("2222222222222222222222==========================");
      // console.log(JSON.stringify(data));
    },

    collapse_change(set_name) {
      if (this.sel_value.Range_on.Range_set == "2") {
        if (this.activeNames == "1") {
          this.sel_value.yjdcqs.disabled_value = "1";
          this.$EventBus.$emit("Swiper_content_f", {
            height: 32 + 317 + 10 + 420 + 50+40-24+50-10-40,
          });
        } else if (this.activeNames == "3") {
          this.sel_value.yjdcqs.disabled_value = "3";
          this.$EventBus.$emit("Swiper_content_f", {
            height: 32 + 317 + 10 + 420 + 50+40-24+50-10-40,
          });
        } else if (this.activeNames == "4") {
          this.sel_value.yjdcqs.disabled_value = "4";
          this.$EventBus.$emit("Swiper_content_f", {
            height: 32 + 317 + 10 + 420 + 50+40-24+50-10-40,
          });
        }else{

          this.$EventBus.$emit("Swiper_content_f", {
            height: 32 + 317 + 10 + 420 + 50+40-24+50-10-164-55,
          });

        }

        // if (
        //   this.activeNames == "1" ||
        //   this.activeNames == "3" ||
        //   this.activeNames == "4"
        // ) {
        //   // console.log("折叠打开着");
        //   // this.sel_value.yjdcqs.disabled_value = 184;
        //   this.$EventBus.$emit("Swiper_content_f", {
        //     height: 28 + 317 + 10 + 220 + 184,
        //   });
        // }
      }

      let _this = this;
      setTimeout(function name() {
        _this.initChart2(set_name, _this.activeNames);
      }, 10);
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


  // 蓝色仪表盘样式数据开始
  // var datas = {
  //     value: 4,
  //     title: "完成进度",
  //     type: 1,
  //     radiusType: 1
  // };

  // var fontColor = "#0066ff";
  // // var fontColor = "#1678ff"; 
  // // var fontColor = "#159B80";
  // // var fontColor = "#03bacc";

  // // var seriesName = "";
  // let noramlSize = 11;
  // let state = "";
  // let center = ["50%", "60%"];
  // let 
  // // wqradius,
  //     nqradius,
  //     kdradius;

  // // wqradius = "100%";
  // nqradius = "100%";
  // kdradius = "100%";

  // // let wqColor = "rgba(80, 152, 237,0.9)";
  // // let wqColor = "rgba(21,155,128,0.9)";
  //   // let wqColor = "rgba(3,186,204,0.9)";
  //   let wqColor = "rgba(0,102,255,0.9)";

  // // let nqColor = [
  // //     [datas.value / 5, "#1678ff"],
  // //     // [1, "#e6e6e6"]
  // //     [1, "#1678ff"]
  // // ]

  // // let nqColor = [
  // //   [datas.value / 5, "#159B80"],
  // //   [1, "#159B80"]
  // // ]

  // // let nqColor = [
  // //   [datas.value / 5, "#03bacc"],
  // //   [1, "#03bacc"]
  // // ]

  // let nqColor = [
  //   [datas.value / 5, "#0066ff"],
  //   [1, "#0066ff"]
  // ]
  // 蓝色仪表盘样式数据结束







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

          // series: [
          //   {
          //     name: "转速",
          //     type: "gauge",
          //     center: ["50%", "70%"], // 默认全局居中
          //     radius: "100%",
          //     min: 0,
          //     max: 100,
          //     startAngle: 180,
          //     endAngle: 0,
          //     splitNumber: 5,
          //     axisLine: {
          //       // 坐标轴线
          //       lineStyle: {
          //         // 属性lineStyle控制线条样式
          //         width: 4,
          //       },
          //     },
          //     axisTick: {
          //       // 坐标轴小标记
          //       length: 6, // 属性length控制线长
          //       lineStyle: {
          //         // 属性lineStyle控制线条样式
          //         color: "auto",
          //       },
          //     },
          //     splitLine: {
          //       // 分隔线
          //       length: 10, // 属性length控制线长
          //       lineStyle: {
          //         // 属性lineStyle（详见lineStyle）控制线条样式
          //         color: "auto",
          //       },
          //     },
          //     pointer: {
          //       width: 3,
          //     },
          //     title: {
          //       show: false,
          //       offsetCenter: [0, "50%"], // x, y，单位px
          //       fontSize: "12",
          //     },
          //     detail: {
          //       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          //       fontWeight: "bolder",
          //       textStyle: {
          //         fontSize: 14,
          //       },
          //       formatter: "{value}%", // 格式化函数或者字符串
          //       offsetCenter: [0, "25%"], // x, y，单位px



          //     },
          //     data: [
          //       {
          //         value: (this.sel_title.ybb_value.percentage * 100).toFixed(0),
          //         name: "完成率",
          //       },
          //     ],
          //   },

          // ],






      // 蓝色的仪表盘样式
      // series: [{
      //         name: "刻度文字",
      //         type: "gauge",
      //         radius: kdradius,
      //         center: center,
      //         startAngle: 180,
      //         endAngle: 0,
      //         z: 7,
      //         splitNumber: 5,
      //         min: 0,
      //         max: 100,
      //         axisTick: {
      //             show: true,
      //             lineStyle: {
      //                 color: "#ffffff",
      //                 width: 1
      //             },
      //             length: 5,
      //             splitNumber: 5
      //         },


      //         splitLine: {
      //           // 分隔线
      //           length: 10, // 属性length控制线长
      //           lineStyle: {
      //             // 属性lineStyle（详见lineStyle）控制线条样式
      //             color: "#ffffff",
      //             width:1
                  
      //           },
      //         },

      //         axisLine: {
      //             lineStyle: {
      //                 width: 25,
      //                 opacity: 0
      //             }
      //         },
      //         axisLabel: {
      //             fontSize: noramlSize,
      //             color: fontColor,
      //             formatter: function(v) {
      //                 var str = '';

      //                 // console.log(v);
                      
      //                 switch (v) {
      //                     case 0:
      //                         str = '0';
      //                         break;
      //                     case 20:
      //                         str = '20';
      //                         break;

      //                     case 40:
      //                         str = '40';
      //                         break;

      //                     case 60:
      //                         str = '60';
      //                         break;

      //                     case 80:
      //                         str = '80';
      //                         break;

      //                     case 100:
      //                         str = '100';
      //                         break;
      //                 }
      //                 return str;
      //             },
      //         },
      //         pointer: {
      //             show: false
      //         },
      //         detail: {
      //             show: false
      //         }
      //     },
      //     {
      //         name: "指针",
      //         type: "gauge",
      //         z: 9,
      //         radius: "100%",
      //         startAngle: 180,
      //         endAngle: 0,
      //         center: center,
      //         axisLine: {
      //             lineStyle: {
      //                 width: 0
      //             }
      //         },
      //         axisTick: {
      //             show: false
      //         },
      //         splitLine: {
      //             show: false
      //         },
      //         axisLabel: {
      //             show: false
      //         },
      //         min: 0,
      //         max: 100,
      //         pointer: {
      //             show: true,
      //             width: 4,
      //             length: "55%"
      //         },
      //         itemStyle: {
      //             normal: {
      //                 color: wqColor
      //             }
      //         },
      //         detail: {
      //             show: true,
      //             offsetCenter: ["0%", "40%"],
      //             formatter: function(v) {
      //                 var str = '';
      //                 // console.log(v);
      //                 str=v.toFixed(1)+'%';
      //                 state="完成率"

      //                 // return [
      //                 //     "{value|" + (str) + "}",
      //                 //     "{company|" + state + "}"
      //                 // ].join("\n");
      //                 return [
      //                     "{company|" + state + "}",
      //                     "{value|" + (str) + "}"
                          
      //                 ].join(" ");

      //             },
      //             rich: {
      //                 value: {
      //                     fontSize: 16,
      //                     lineHeight: 0,
      //                     // color: "#1e87f0",
      //                     // color: "#159B80",
      //                     // color: "#03bacc",
      //                     color: "#0066ff",
      //                     fontWeight: "700"
      //                 },
      //                 company: {
      //                     fontSize: 12,
      //                     lineHeight: 33,
      //                     // color: "#1e87f0"
      //                     // color: "#159B80"
      //                     // color: "#03bacc"
      //                     color: "#0066ff",
      //                 }
      //             }
      //         },
      //         data: [((this.sel_title.ybb_value.percentage*100)).toFixed(2)]
      //         // data: [
      //         //   {
      //         //     value: (this.sel_title.ybb_value.percentage * 100).toFixed(0),
      //         //     name: "完成率",
      //         //   },
      //         // ],

      //     },
      //     {
      //         name: "内层盘",
      //         type: "gauge",
      //         z: 6,
      //         radius: nqradius,
      //         startAngle: 180,
      //         endAngle: 0,
      //         center: center,
      //         axisLine: {
      //             lineStyle: {
      //                 color: nqColor,
      //                 width: 5,
      //                 opacity: 0.9
      //             }
      //         },
      //         splitNumber: 5,
      //         min: 0,
      //         max: 100,
      //         axisTick: {
      //             show: false
      //         },

      //         splitLine: {
      //           // 分隔线
      //           length: 10, // 属性length控制线长
      //           lineStyle: {
      //             // 属性lineStyle（详见lineStyle）控制线条样式
      //             color: "#ffffff",
      //             width:1
      //           },
      //         },

      //         axisLabel: {
      //             show: false
      //         },
      //         pointer: {
      //             show: false
      //         },

      //         detail: {
      //             show: 0
      //         }
      //     }
      // ]


      // 水球图样式
      // backgroundColor: '#ffffff',
      // series: [{
      //           type: 'liquidFill',
      //           radius: '75%',
      //           center: ['50%', '50%'],
      //           data: [0.5, 0.5, 0.5], // data个数代表波浪数
      //           backgroundStyle: {
      //               borderWidth: 1,
      //               color: 'rgb(247,247,247,0.5)'
      //           },
      //           label: {
      //               normal: {
      //                   formatter: (0.5 * 100).toFixed(1) + '%',
      //                   textStyle: {
      //                       fontSize: 20
      //                   }
      //               }
      //           },
      //           outline: {
      //               show: false,
      //           }
      //       },
      //       {
      //           "type": "pie",
      //           "center": ["50%", "50%"],
      //           "radius": ["80%", "82%"],
      //           "hoverAnimation": false,
      //           "data": [{
      //                   "name": "",
      //                   "value": 500,
      //                   labelLine: {
      //                       show: false
      //                   },
      //                   itemStyle: {
      //                       color: '#5886f0'
      //                   },
      //                   emphasis: {
      //                       labelLine: {
      //                           show: false
      //                       },
      //                       itemStyle: {
      //                           color: '#5886f0'
      //                       },
      //                   }
      //               },
      //               { //画中间的图标
      //                   "name": "",
      //                   "value": 3,
      //                   labelLine: {
      //                       show: false
      //                   },
      //                   itemStyle: {
      //                       color: '#ffffff',
      //                       "normal": {
      //                           "color": "#5886f0",
      //                           "borderColor": "#5886f0",
      //                           "borderWidth": 8,
      //                           // borderRadius: '100%'
      //                       },
      //                   },
      //                   label: {

      //                       borderRadius: '0%'
      //                   },
      //                   emphasis: {
      //                       labelLine: {
      //                           show: false
      //                       },
      //                       itemStyle: {
      //                           color: '#5886f0'
      //                       },
      //                   }

      //               },
      //               // { // 解决圆点过大后续部分显示明显的问题
      //               //     "name": "",
      //               //     "value": 3,
      //               //     labelLine: {
      //               //         show: false
      //               //     },
      //               //     itemStyle: {
      //               //         color: '#5886f0'
      //               //     },
      //               //     emphasis: {
      //               //         labelLine: {
      //               //             show: false
      //               //         },
      //               //         itemStyle: {
      //               //             color: '#5886f0'
      //               //         },
      //               //     }
      //               // },
      //               { //画剩余的刻度圆环
      //                   "name": "",
      //                   "value": 88,
      //                   itemStyle: {
      //                       color: '#050038'
      //                   },
      //                   "label": {
      //                       show: false
      //                   },
      //                   labelLine: {
      //                       show: false
      //                   },
      //                   emphasis: {
      //                       labelLine: {
      //                           show: false
      //                       },
      //                       itemStyle: {
      //                           color: 'rgba(255,255,255,0)'
      //                       },
      //                   }
      //               }
      //           ]
      //       }

      // ]



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




            // detail:{
            //       show: true,
            //       offsetCenter: ["0%", "40%"],
            //       formatter: function(v) {
            //           // var str = '';
            //           console.log(v);
            //           // str=v.toFixed(1)+'%';
            //           // state="完成率"
            //           return [
            //               "{company|" + 1111 + "}",
            //               "{value|" + (222) + "}"   
            //           ].join(" ");
            //       },
            //       rich: {
            //           value: {
            //               fontSize: 16,
            //               lineHeight: 0,
            //               // color: "#1e87f0",
            //               // color: "#159B80",
            //               // color: "#03bacc",
            //               color: "#0066ff",
            //               fontWeight: "700"
            //           },
            //           company: {
            //               fontSize: 12,
            //               lineHeight: 33,
            //               // color: "#1e87f0"
            //               // color: "#159B80"
            //               // color: "#03bacc"
            //               color: "#0066ff",
            //           }
            //       }
            // }






        }]




        });
      });
    },

    initChart2(set_name, set_value_name) {
      this.chartIns_ = echarts.init(this.$refs[set_name]);

      // let _this = this;
      let user_data = [];

      let user_time = [];
      let mtd_pay_amt = [];
      let mtd_ago_amt = [];

      // "fs_reach-pay_day_amt": "",
      // "fs_reach-pay_day_amt_down": "",
      // "fs_reach-dlvr_day_amt": "",
      // "fs_reach-dlvr_day_amt_down": "",

      this.p1.then(() => {
        if (
          this.sel_value.zffhyjkj_set.zffhyjkj_set_pd == "1" &&
          this.sel_value.yjdcqs.yjdcqs_pd == "1"
        ) {
          // 支付 日累计

          Object.keys(this.data["fs_reach-pay_day_amt_down"]).forEach(
            (key_pd_r) => {
              this.data["fs_reach-pay_day_amt_down"][key_pd_r][
                "USER_TIME"
              ] = this.data["fs_reach-pay_day_amt_down"][key_pd_r][
                "TDATE"
              ].substring(5, 10);

              if (
                set_value_name == "1" &&
                this.data["fs_reach-pay_day_amt_down"][key_pd_r]["CHANNEL"] ==
                  "合计"
              ) {
                user_data.push(
                  this.data["fs_reach-pay_day_amt_down"][key_pd_r]
                );
              } else if (
                set_value_name == "3" &&
                this.data["fs_reach-pay_day_amt_down"][key_pd_r]["CHANNEL"] ==
                  "线上渠道"
              ) {
                user_data.push(
                  this.data["fs_reach-pay_day_amt_down"][key_pd_r]
                );
              } else if (
                set_value_name == "4" &&
                this.data["fs_reach-pay_day_amt_down"][key_pd_r]["CHANNEL"] ==
                  "线下渠道"
              ) {
                user_data.push(
                  this.data["fs_reach-pay_day_amt_down"][key_pd_r]
                );
              }
            }
          );

          // console.log(this.data["fs_reach-pay_day_amt_down"]);

          // console.log(this.data["fs_reach-pay_month_amt_down"]);
        } else if (
          this.sel_value.zffhyjkj_set.zffhyjkj_set_pd == "1" &&
          this.sel_value.yjdcqs.yjdcqs_pd == "2"
        ) {
          // 支付 月累计

          Object.keys(this.data["fs_reach-pay_month_amt_down"]).forEach(
            (key_pd1) => {
              this.data["fs_reach-pay_month_amt_down"][key_pd1][
                "USER_TIME"
              ] = this.data["fs_reach-pay_month_amt_down"][key_pd1][
                "TDATE"
              ].substring(5, 10);

              if (
                set_value_name == "1" &&
                this.data["fs_reach-pay_month_amt_down"][key_pd1]["CHANNEL"] ==
                  "合计"
              ) {
                user_data.push(
                  this.data["fs_reach-pay_month_amt_down"][key_pd1]
                );
              } else if (
                set_value_name == "3" &&
                this.data["fs_reach-pay_month_amt_down"][key_pd1]["CHANNEL"] ==
                  "线上渠道"
              ) {
                user_data.push(
                  this.data["fs_reach-pay_month_amt_down"][key_pd1]
                );
              } else if (
                set_value_name == "4" &&
                this.data["fs_reach-pay_month_amt_down"][key_pd1]["CHANNEL"] ==
                  "线下渠道"
              ) {
                user_data.push(
                  this.data["fs_reach-pay_month_amt_down"][key_pd1]
                );
              }
            }
          );
        } else if (
          this.sel_value.zffhyjkj_set.zffhyjkj_set_pd == "2" &&
          this.sel_value.yjdcqs.yjdcqs_pd == "1"
        ) {
          // 发货 日累计
          Object.keys(this.data["fs_reach-dlvr_day_amt_down"]).forEach(
            (key_fhr) => {
              this.data["fs_reach-dlvr_day_amt_down"][key_fhr][
                "USER_TIME"
              ] = this.data["fs_reach-dlvr_day_amt_down"][key_fhr][
                "TDATE"
              ].substring(5, 10);

              this.data["fs_reach-dlvr_day_amt_down"][key_fhr][
                "MTD_PAY_AMT"
              ] = this.data["fs_reach-dlvr_day_amt_down"][key_fhr][
                "MTD_DLVR_AMT"
              ];

              if (
                set_value_name == "1" &&
                this.data["fs_reach-dlvr_day_amt_down"][key_fhr]["CHANNEL"] ==
                  "合计"
              ) {
                user_data.push(
                  this.data["fs_reach-dlvr_day_amt_down"][key_fhr]
                );
              } else if (
                set_value_name == "3" &&
                this.data["fs_reach-dlvr_day_amt_down"][key_fhr]["CHANNEL"] ==
                  "线上渠道"
              ) {
                user_data.push(
                  this.data["fs_reach-dlvr_day_amt_down"][key_fhr]
                );
              } else if (
                set_value_name == "4" &&
                this.data["fs_reach-dlvr_day_amt_down"][key_fhr]["CHANNEL"] ==
                  "线下渠道"
              ) {
                user_data.push(
                  this.data["fs_reach-dlvr_day_amt_down"][key_fhr]
                );
              }
            }
          );
        } else if (
          this.sel_value.zffhyjkj_set.zffhyjkj_set_pd == "2" &&
          this.sel_value.yjdcqs.yjdcqs_pd == "2"
        ) {
          // 发货 月累计

          Object.keys(this.data["fs_reach-dlvr_month_amt_down"]).forEach(
            (key_pd1) => {
              this.data["fs_reach-dlvr_month_amt_down"][key_pd1][
                "USER_TIME"
              ] = this.data["fs_reach-dlvr_month_amt_down"][key_pd1][
                "TDATE"
              ].substring(5, 10);

              this.data["fs_reach-dlvr_month_amt_down"][key_pd1][
                "MTD_PAY_AMT"
              ] = this.data["fs_reach-dlvr_month_amt_down"][key_pd1][
                "MTD_DLVR_AMT"
              ];

              if (
                set_value_name == "1" &&
                this.data["fs_reach-dlvr_month_amt_down"][key_pd1]["CHANNEL"] ==
                  "合计"
              ) {
                user_data.push(
                  this.data["fs_reach-dlvr_month_amt_down"][key_pd1]
                );
              } else if (
                set_value_name == "3" &&
                this.data["fs_reach-dlvr_month_amt_down"][key_pd1]["CHANNEL"] ==
                  "线上渠道"
              ) {
                user_data.push(
                  this.data["fs_reach-dlvr_month_amt_down"][key_pd1]
                );
              } else if (
                set_value_name == "4" &&
                this.data["fs_reach-dlvr_month_amt_down"][key_pd1]["CHANNEL"] ==
                  "线下渠道"
              ) {
                user_data.push(
                  this.data["fs_reach-dlvr_month_amt_down"][key_pd1]
                );
              }
            }
          );
        }

        // console.log(user_data); MTD_DLVR_AMT
        // console.log(this.data);
        // console.log(this.sel_value.zffhyjkj_set.zffhyjkj_set_pd+"         "+this.sel_value.yjdcqs.yjdcqs_pd);
        // console.log(set_value_name);

        user_data.sort((a, b) => {
          let a_time = "";
          let b_time = "";
          // if (this.sel_value.yjdcqs.yjdcqs_pd == "1") {
          //   a_time = Number(a["USER_TIME"]);
          //   b_time = Number(b["USER_TIME"]);
          // } else if (this.sel_value.yjdcqs.yjdcqs_pd == "2") {}
          a_time = new Date(a["USER_TIME"]).getTime(new Date(a["USER_TIME"]));
          b_time = new Date(b["USER_TIME"]).getTime(new Date(b["USER_TIME"]));
          
          return a_time - b_time;
        });

        Object.keys(user_data).forEach((key_user) => {
          user_time.push(user_data[key_user]["USER_TIME"]);
          mtd_pay_amt.push(
            (user_data[key_user]["MTD_PAY_AMT"] / 10000).toFixed(2) * 1
          );
          mtd_ago_amt.push(
            (user_data[key_user]["FINISH_RATE"] * 100).toFixed(2)
          );
        });


        //默认值开始 
        if(this.sel_value.Range_on.Range_set == "2"){

          this.barData.month=0;
          this.barData.value=0;
          this.barData.ago_value=0;
            
        }
        //默认值结束



        this.chartIns_.setOption({
          grid: {
            left: "0%",
            top: "5%",
            right: "1%",
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
            padding: [2, 5, 2, 5],
            axisPointer: {
              // type: "cross",
              type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
              label: {
                color: "#000000",
                backgroundColor: "aliceblue",
              },
            },

            // formatter:function (params) {
            //   // _this.barData.value = params[1].value;
            //   // _this.barData.ago_value = params[0].value;
            //   // _this.barData.month = params[1].axisValue;
            //   // console.log(params);
            //   return "月份："+params[1].axisValue+'<br/> 达成：'+params[1].marker+params[1].value+'<br/> 同比：'+params[0].marker+params[0].value;
            // }

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

            // {
            //   type: "value",
            //   name_value: "达成率",
            //   // interval: 24,
            //   min: 0,
            //   // max: 100,
            //   splitLine: {
            //     show: true,
            //     lineStyle: { type: "dotted", color: "#ccc" },
            //   },
            //   axisLine: {
            //     show: false,
            //   },
            //   axisTick: {
            //     show: false,
            //   },
            //   axisLabel: {
            //     interval: 5,
            //     textStyle: {
            //       color: "#ccc",
            //     },
            //     formatter: "{value} %",
            //   },
            // },
            
          ],

          series: [
            // {
            //   name: "达成率",
            //   showSymbol: false,
            //   smooth: true, //true 为平滑曲线，false为直线

            //   itemStyle: {
            //     color: "#919191",
            //     normal: {
            //       // color: "#BBBBBB",
            //       color: "#F5A028",
            //       lineStyle: {
            //         // color: "#BBBBBB",
            //         color: "#F5A028",
            //         width: 1, //设置线条粗细
            //       },
            //       areaStyle: {
            //         color: "rgba(255, 255, 255, 0.00)",
            //       },
            //     },
            //   },

            //   data: mtd_ago_amt,
            //   type: "line",
            //   yAxisIndex: 1, //这里要设置哪个y轴，默认是最左边的是0，然后1，2顺序来。
            //   areaStyle: {},
            // },

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

              data: mtd_pay_amt,

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

    initChart3() {
      this.chartIns5 = echarts.init(this.$refs["chart5"]);

      // let _this=this;

      this.p1.then(() => {
        // console.log("运行到占比这里！！！！！");
        // console.log(this.data["order_status-order_rate"]);
        // console.log(this.data);


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

          // console.log("====================================")
          // console.log(legendName[i]);
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

              // console.log(name);
              // console.log(tip_name_set);
              // console.log(tip_valeu_set);
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

            // formatter: function(name) {

            //   // console.log(name);
            //   // console.log(data)

            // // var data = _this.chartIns5.option.series[0].data;
            // // var total = 0;
            // // var tarValue;
            // // for (var i = 0; i < data.length; i++) {
            // //   total += data[i].value;
            // //   if (data[i].name == name) {
            // //     tarValue = data[i].value;
            // //   }
            // // }
            // // var v = tarValue;
            // // var p = Math.round(((tarValue / total) * 100));
            // // return `${name}  ${v}人(${p}%)`;

            // },

          },
          series: [
            {
              name: "订单占比",
              type: "pie",
              radius: "65%",
              center: ["29%", "52%"],
              selectedMode: "single",
              selectedOffset: 3,
              // data: [
              //   {
              //     value: 
              //     // (this.data["order_status-order_rate"][0].WAIT_CS_AUD_RATE *100).toFixed(2),
              //     (this.data["order_status-order_rate"][0].TOT_WAIT_CS_AUD_AMT),
              //     name: "待客审",
              //     itemStyle:{color:"rgb(22, 120, 255)"}
              //   },
              //   {
              //     value: 
              //     // (this.data["order_status-order_rate"][0].WAIT_GOOGDS_RATE *100).toFixed(2),
              //     (this.data["order_status-order_rate"][0].TOT_WAIT_GOOGDS_AUD_AMT),
              //     name: "待货审",
              //     itemStyle:{color:"rgb(245, 160, 40)"}
              //   },
              //   {
              //     value: 
              //     // (this.data["order_status-order_rate"][0].WAIT_FIN_AU_RATE *100).toFixed(2),
              //     (this.data["order_status-order_rate"][0].WAIT_FIN_AUD_AMT),
              //     name: "待财审",
              //     itemStyle:{color:"rgb(72, 199, 40)"}
              //   },
              //   {
              //     value: 
              //     // (this.data["order_status-order_rate"][0].WAIT_PRT_AUD_RATE *100).toFixed(2),
              //     (this.data["order_status-order_rate"][0].TOT_WAIT_PRT_AUD_AMT),
              //     name: "待打印",
              //     itemStyle:{color:"rgb(232, 41, 79)"}
              //   },
              //   {
              //     value: 
              //     // (this.data["order_status-order_rate"][0].WAIT_SEND_RATE * 100).toFixed(2),
              //     (this.data["order_status-order_rate"][0].WAIT_SEND_AMT),
              //     name: "待发货",
              //     itemStyle:{color:"rgb(78, 211, 211)"}
              //   },
              // ],
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

              // emphasis: {
              //   itemStyle: {
              //     shadowBlur: 10,
              //     shadowOffsetX: 0,
              //     shadowColor: "rgba(0, 0, 0, 0.5)",
              //   },
              // },
            },
          ],
        });
      });
    },

    initChart4() {

      this.chartIns6 = echarts.init(this.$refs["chart6"]);
      let user_data_dd=[];
      let user_time_dd=[];
      let user_dhs_dd=[]; //待货审
      let user_ddy_dd=[]; //待打印  
      let user_dcs_dd=[]; //待财审
      let user_dks_dd=[]; //待客审  
      let user_dfh_dd=[]; //待发货
      let _this=this;

      this.p1.then(() => {

        // console.log((this.data["order_status-order_trend"]));
        // console.log(JSON.stringify(this.data["order_status-order_trend"]));  

        Object.keys(this.data["order_status-order_trend"]).forEach((key_duidie) => {
          this.data["order_status-order_trend"][key_duidie]["USER_TIME"] = this.data["order_status-order_trend"][key_duidie]["TDATE"].substring(5, 10);

          if(this.sel_value.ddqs.ddqs_pd=='1'&& this.data["order_status-order_trend"][key_duidie]["CHNL_NAME"]=='全渠道'){
            user_data_dd.push(this.data["order_status-order_trend"][key_duidie]);
          }else if(this.sel_value.ddqs.ddqs_pd=='2'&& this.data["order_status-order_trend"][key_duidie]["CHNL_NAME"]=='线上渠道'){
            user_data_dd.push(this.data["order_status-order_trend"][key_duidie]);
          }else if(this.sel_value.ddqs.ddqs_pd=='3'&& this.data["order_status-order_trend"][key_duidie]["CHNL_NAME"]=='线下渠道'){ 
            user_data_dd.push(this.data["order_status-order_trend"][key_duidie]);
          }
        });

        

        user_data_dd.sort((a, b) => {
          let a_time = "";
          let b_time = "";

          a_time = new Date(a["USER_TIME"]).getTime(new Date(a["USER_TIME"]));
          b_time = new Date(b["USER_TIME"]).getTime(new Date(b["USER_TIME"]));
          
          return a_time - b_time;
        });

        
        Object.keys(user_data_dd).forEach((key_fenlei) => {
          user_time_dd.push(user_data_dd[key_fenlei]["USER_TIME"]);
          user_dhs_dd.push((user_data_dd[key_fenlei]["TOT_WAIT_GOOGDS_AUD_AMT"]/10000).toFixed(2)); //待货审
          user_ddy_dd.push((user_data_dd[key_fenlei]["TOT_WAIT_PRT_AUD_AMT"]/10000).toFixed(2)); //待打印  
          user_dcs_dd.push((user_data_dd[key_fenlei]["WAIT_FIN_AUD_AMT"]/10000).toFixed(2)); //待财审
          user_dks_dd.push((user_data_dd[key_fenlei]["TOT_WAIT_CS_AUD_AMT"]/10000).toFixed(2)); //待客审  
          user_dfh_dd.push((user_data_dd[key_fenlei]["WAIT_SEND_AMT"]/10000).toFixed(2)); //待发货
        });

  
        this.chartIns6.setOption({
          title: {
            text: "折线图堆叠",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                // backgroundColor: "#6a7985",
                color:"#000000",
                backgroundColor: "aliceblue",
              },
            },

            formatter: function (params) {

              // console.log(params);
              _this.barData_stack.month = params[0].name;
              _this.barData_stack.stack1 = params[0].value;
              _this.barData_stack.stack2 = params[1].value;
              _this.barData_stack.stack3 = params[2].value;
              _this.barData_stack.stack4 = params[3].value;
              _this.barData_stack.stack5 = params[4].value;

            },

          },
          legend: {
            show:false,
            bottom: "bottom",
            data: ["待客审", "待货审", "待财审", "待打审", "待发审"],
            textStyle: {
              fontSize: 12,
            },
            itemHeight: 2,
            itemWidth: 10,
            icon: "rect",
          },
          grid: {
            left: "0%",
            right: "5%",
            bottom: "0%",
            top: "5%",
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: user_time_dd,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "待客审",
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
                    width: 1, //设置线条粗细
                  },
                  areaStyle: {
                    color: "rgba(255, 255, 255, 0.00)",
                  },
                },
              },

              data: user_dks_dd,
            },
            {
              name: "待货审",
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
                    width: 1, //设置线条粗细
                  },
                  areaStyle: {
                    color: "rgba(255, 255, 255, 0.00)",
                  },
                },
              },

              data: user_dhs_dd,
            },
            {
              name: "待财审",
              type: "line",
              // stack: "总量",
              showSymbol: false,
              smooth: false, //true 为平滑曲线，false为直线 
              itemStyle: {
                color: "#919191",
                normal: {
                  // color: "#BBBBBB",
                  color: "rgb(72, 199, 40)",
                  lineStyle: {
                    // color: "#BBBBBB",
                    color: "rgb(72, 199, 40)",
                    width: 1, //设置线条粗细
                  },
                  areaStyle: {
                    color: "rgba(255, 255, 255, 0.00)",
                  },
                },
              },

              data: user_dcs_dd,
            },
            {
              name: "待打审",
              type: "line",
              // stack: "总量",
              showSymbol: false,
              smooth: false, //true 为平滑曲线，false为直线 
              itemStyle: {
                color: "#919191",
                normal: {
                  // color: "#BBBBBB",
                  color: "rgb(232, 41, 79)",
                  lineStyle: {
                    // color: "#BBBBBB",
                    color: "rgb(232, 41, 79)",
                    width: 1, //设置线条粗细
                  },
                  areaStyle: {
                    color: "rgba(255, 255, 255, 0.00)",
                  },
                },
              },

              data: user_ddy_dd,
            },
            {
              name: "待发审",
              type: "line",
              // stack: "总量",
              showSymbol: false,
              smooth: false, //true 为平滑曲线，false为直线 
              itemStyle: {
                color: "#919191",
                normal: {
                  // color: "#BBBBBB",
                  color: "rgb(78, 211, 211)",
                  lineStyle: {
                    // color: "#BBBBBB",
                    color: "rgb(78, 211, 211)",
                    width: 1, //设置线条粗细
                  },
                  areaStyle: {
                    color: "rgba(255, 255, 255, 0.00)",
                  },
                },
              },

              data: user_dfh_dd,
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

  padding-left: 10px;
  padding-right: 10px;
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


// .van-icon{
// }

// .van-collapse-item__title--disabled .van-cell__right-icon{
//   color: #000000;
// }




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


// style="background-color: #000000;"
</style>

