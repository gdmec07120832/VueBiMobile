<template>

  <div style="background: rgb(245, 245, 245);"
       :style="iphone_pd=='2'?{'height':(windowHeight_set+40)+'px',backgroundImage:`url(${orgBackground})`}:{backgroundImage:`url(${orgBackground})`}">

    <!-- <div @click="test_router()"> 测试返回</div>  -->


    <!-- 遮罩层开始   @click.stop-->
    <van-overlay v-if="isFirstLogin_set==true&&sessionwelcome_set==true" :show="zhe_zhao_show">
      <!-- style="display: none;" :style="[{ opacity: opacity_css.opacity3 }]"-->
      <div class="wrapper_over">
        <transition
            v-on:before-enter="beforeEnter4"
            v-on:enter="enter4"
            v-bind:css="false"
        >
          <div class="block_over" v-if="opacity_css.opacity3==1">
            <div class="block_over_bg">
              <div class="block_over_content">
                <!-- <div>
                  <div style="float: right;margin-top: 5px;margin-right: 5px;font-size: 16px;" @click="zhe_zhao_show = false">
                    <van-icon name="cross" />
                  </div>
                  <div style="clear: both;"></div>
                </div> -->
                <div class="block_over_bulb"></div>
                <div class="block_over_css">
                  <!-- 信息与数字化中心 仓储及财务 在紧急-->
                  <p style="color:#23B0A8;padding-top: 6px;">致林氏小伙伴的一封信：</p>
                  <p style="padding-top: 5px; line-height: 19px;text-align: justify;text-justify: distribute-all-lines;">
                    <span><i>，</i>“数据是林氏的水电煤”， 林氏木业致力于打造长盛的数据生态，用数据感知、预见未来。</span></p>
                  <!-- <p><span><i >，</i>数据灯塔移动端将遵循“核心、简洁、直观”的产品原则，以经营指标为基础，逐步构建聚焦“渠道、产品、仓储、财务”等模块的分析内容。</span></p>
                  <p><span><i ></i>本次上线内容覆盖渠道和产品两个模块，其它模块正陆续开发中。</span></p> -->
                  <p style="line-height: 19px;text-align: justify;text-justify: distribute-all-lines;"><span><i>，</i>数据灯塔移动端第一期属于初创版本，遵循“核心、简洁、直观”的产品设计理念，以经营指标为基础，构建聚焦“渠道、产品、仓储、财务”的价值链路，力图让经营更透明和高效，后续将会随着使用场景的深入，不断丰富产品的功能和内容。</span>
                  </p>
                  <p style="line-height: 19px;text-align: justify;text-justify: distribute-all-lines;"><span><i>，</i>欢迎各位试用，提出宝贵的建议~</span>
                  </p>

                  <p style="float: right;color:#23B0A8;font-weight: bold;margin-top: 0px;">——信息与数字化中心</p>
                </div>
              </div>
              <div class="block_over_bottom">
                <div class="block_over_bom" @click="zhe_zhao_show = false">
                  <div class="block_over_bom_cont">
                    <span>我知道了</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

    </van-overlay>
    <!-- 遮罩层结束 -->


    <!-- 通知遮罩层开始 -->
    <van-overlay :show="announce_show"
                 :style="(sessionannounce_set==true&&sessionannounce_time==true)?{'display': 'block'}:{'display': 'none'}">
      <div class="wrapper_over">

        <transition
            v-on:before-enter="beforeEnter4"
            v-on:enter="enter4"
            v-bind:css="false"
        >
          <div @click="announce_show = false" v-if="opacity_css.opacity3==1"
               style="width: 80%;border-radius: 10px;overflow: hidden;">
            <div style="background: #ffffff;">
              <div style="">
                <img :src="images_set.images_Maintenance_notice" style="width: 100%;border-radius: 20px;"/>
              </div>

            </div>
          </div>
        </transition>

      </div>
    </van-overlay>
    <!-- 通知遮罩层结束 -->


    <van-overlay :custom-style="{background: 'transparent'}" :show="markedMap['guide_slides__v001']"
                 v-if="markedMap['guide_slides__v001']">
      <div style="width: 100vw; height: 100vh">
        <GuideSlides :show.sync="markedMap['guide_slides__v001']"/>
      </div>
    </van-overlay>

    <!-- 添加了加载项开始 -->
    <div v-if="sessionwelcome_set==true&&data_loay==false"
         style="position: fixed; width: 100%;height: 2000px;z-index: 888;">
      <div
          style=" position: fixed;top:150px;padding: 5px;border: 0px solid #e6e6e6;border-radius: 60px;background-color: #F7F7F7;box-shadow: 1px 1px 10px rgb(145, 145, 145);z-index: 9;"
          :style="{left: (bgwidth_css.width-36)/2 + 'px'}"
      >
        <van-loading size="24px" color="#1989fa" style="" vertical></van-loading>
      </div>
    </div>
    <!-- 添加了加载项结束 -->


    <div v-if="sessionwelcome_set==false" class="welcome_module" style="background-color: #ffffff;">
      <div style="min-height: 100vh">
        <!-- <div>
        <div ><img :src="images_set.images_set_bg" :onload="welcome_img_fun()" id="images" ref="welcome_img" style="display: block;" /></div>
        <div style="margin-top: 20px;" :style="xian_yin_css? {'display': 'block'}:{'display': 'none'}"><p style="text-align: center;padding: 0px;margin: 0px;color: #5E5E5E;">欢迎进入林氏的数字世界</p></div>
      </div> -->


        <!-- bgwidth_css.height*0.27   bgwidth_css.height*0.22-->
        <div>
          <div :style="{'height':(bgwidth_css.height*0.20)+'px'}" style="width: 100%;"></div>

          <!--   -->

          <transition
              v-on:before-enter="beforeEnter"
              v-on:enter="enter"

              v-on:after-enter="afterEnter"

              v-on:leave="leave"
              v-bind:css="false"
          >
            <!-- -->
            <div v-if="welcome_show.title_logo" style="display: block;  margin: 0 auto;"><img
                :src="images_set.images_set_bg_new"/></div>
          </transition>


          <!-- :style="[{ opacity: opacity_css.opacity }]" v-on:after-enter="afterEnter2"  class="linshi_css" width: 16%;-->
          <transition
              v-on:before-enter="beforeEnter2"
              v-on:enter="enter2"
              v-bind:css="false"
          >
            <div v-if="welcome_show.title_cont" style="display: block;  margin: 0 auto;">
              <img :src="images_set.images_set_bg_new"/>
            </div>
          </transition>


          <div style="width: 100%;height:15px;"></div>
          <!--  id="animat"width: 25%;-->
          <transition
              v-on:before-enter="beforeEnter3"
              v-on:enter="enter3"
              v-on:after-enter="afterEnter3"
              v-bind:css="false"
          >
            <div v-if="welcome_show.title_cont" style="display: block;  margin: 0 auto;"><img
                :src="images_set.images_set_con_new"/></div>
          </transition>

          <div style="width: 100%;height:25px;"></div>
          <transition>
            <!-- width: 20%;  -->
            <div class="linshi_css" ref="linshi_ms" style="width: 29px;margin: 0 auto;"
                 :style="[{ opacity: opacity_css.opacity2 }]">
              <!-- <div style="width: 29px;float: left;"><p style="padding: 0px;margin: 0px;font-size: 22px;color: #BBBBBB;margin-left: 15.2%;">数据将成为</p></div>
            <div style="width: 29px;float: right;"><p style="padding: 0px;margin: 0px;font-size: 22px;color: #BBBBBB;">林氏水电煤</p></div> -->
              <div style="width: 29px;"><p
                  style="padding: 0px;margin: 0px;font-size: 24px;color: #BBBBBB;text-align: center;">
                {{ welcome_characters }}</p></div>
            </div>
          </transition>


          <transition>
            <div class="linshi_css"
                 style="text-align: center;font-size: 12px;color: rgb(187, 187, 187);position: absolute;width: 100%;"
                 :style="{'bottom':(bgwidth_css.height*0.08)+'px','opacity': opacity_css.opacity2}"
            >
              <p>Beta V1.0</p>
              <p>@2021 LINSY,All Rights Reserved</p>
            </div>
          </transition>


          <!-- <div class="text">
          {{ text }}
        </div> bottom: 30px;-->


        </div>

      </div>
    </div>


    <div ref="container_all" :style="sessionwelcome_set==true?{'display':'inline'}:{'display':'none'}">


      <div class="entry-img" ref="entryImg" style="padding-top: 60px;display: none;"></div>

      <section class="nav-wrapper">

        <!-- 头部的布局开始 style="position: -webkit-sticky; position: sticky;top: 0;z-index: 99;"-->
        <section :style="Bottom_nav_css.show_title? Bottom_nav_css.title_all_css_n:Bottom_nav_css.title_all_css_y_all"
                 style="height: 60px;">

          <div :style="Bottom_nav_css.show_title? Bottom_nav_css.title_all_css_n:Bottom_nav_css.title_all_css_y"
               class="title_all_css">

            <van-row style="padding-left: 10px; padding-right: 15px;margin-top: 10px;">
              <van-col span="4">
                <div style="width: 40px;height: 40px;">
                  <van-image round width="40px" height="40px" fit="cover" :src="logo_img"/>
                </div>

              </van-col>

              <van-col span="20" style="margin-top: -1px;">
                <div style="color: #ffffff;font-size: 14px;">林氏木业-数据灯塔</div>
                <div style="color: #ffffff;font-size: 14px;line-height: 30px;">让数据成为林氏的水和电</div>

              </van-col>

            </van-row>

          </div>

        </section>
        <!-- 头部的布局结束 -->


        <!-- 头部切换开始 -->
        <!-- <van-sticky :container="container_set" :offset-top="0"></van-sticky> -->
        <div
            :style="Bottom_nav_css.show_index==true? Bottom_nav_css.title_all_css_y_all:Bottom_nav_css.title_all_css_n "
            style="background-color: #ffffff;border-bottom: 1px solid #EEEEEE;">

          <div :style="Bottom_nav_css.show_secon==true? {'display': 'inline-block'}:{'display': 'none'} "
               class="title_all_css_erji">

            <!-- 切换优化开始 -->
            <van-row
                gutter=""
                type="flex"
                justify="center"
                style="padding-top: 16px"
            >
              <van-col
                  :span="(chanpin_zhuti_qie_css.chanpin_wenzi.title_right=='11'||(CelJurisdiction.CelLeft==true&&secondadmin==false))?10:7"
                  v-if="CelJurisdiction.CelLeft==true"
                  @click="
                  Single_choice(
                    'chanpin_pd',
                    ['_this.router_change(\''+'navpd_left'+'\')'],
                    '1',
                    '_this.chanpin_zhuti_qie'
                  )
                "
                  :style="
                  (chanpin_zhuti_qie_css.chanpin_wenzi.title_right=='11'||(CelJurisdiction.CelLeft==true&&secondadmin==false))?
                  Object.assign({}, chanpin_zhuti_qie_css.chanpin_y,{'border-radius': '8px','border-radius': '8px'}):
                  chanpin_zhuti_qie.chanpin_pd == '1'
                    ? Object.assign({}, chanpin_zhuti_qie_css.chanpin_y, {
                        'border-right': '0px',
                        'border-top-left-radius': '8px','border-bottom-left-radius': '8px'
                      })
                    : Object.assign({}, chanpin_zhuti_qie_css.chanpin_n, {
                        'border-right': '0px',
                        'border-top-left-radius': '8px','border-bottom-left-radius': '8px'
                      })
                "

              >
                <div
                    style="
                    padding: 2px;
                    text-align: center;
                    font-size: 16px;
                    padding-bottom: 4px;
                    padding-top: 3px;
                  "
                >
                  <!-- 品牌市场 -->
                  {{ chanpin_zhuti_qie_css.chanpin_wenzi.title_left }}
                </div>
              </van-col>

              <!-- ||() -->
              <van-col
                  :span="(CelJurisdiction.CelRight==true&&secondadmin==false)?10:7"
                  v-if="chanpin_zhuti_qie_css.chanpin_wenzi.title_right!='11'&&CelJurisdiction.CelRight==true"
                  @click="
                  Single_choice(
                    'chanpin_pd',
                    ['_this.router_change(\''+'navpd_right'+'\')'],
                    '2',
                    '_this.chanpin_zhuti_qie'
                  )
                "
                  :style="
                  ((CelJurisdiction.CelRight==true&&secondadmin==false))?
                  Object.assign({}, chanpin_zhuti_qie_css.chanpin_y,{'border-radius': '8px','border-radius': '8px'}):
                  chanpin_zhuti_qie.chanpin_pd == '2'
                    ? Object.assign({}, chanpin_zhuti_qie_css.chanpin_y, {
                        'border-left': '0px',
                        'border-top-right-radius': '8px','border-bottom-right-radius': '8px'
                      })
                    : Object.assign({}, chanpin_zhuti_qie_css.chanpin_n, {
                        'border-left': '0px',
                        'border-top-right-radius': '8px','border-bottom-right-radius': '8px'
                      })
                "
              >
                <div
                    style="
                    padding: 2px;
                    text-align: center;
                    font-size: 16px;
                    padding-bottom: 4px;
                    padding-top: 3px;
                  "
                >
                  <!-- 产品中心 -->
                  {{ chanpin_zhuti_qie_css.chanpin_wenzi.title_right }}
                </div>
              </van-col>
            </van-row>
            <div style="clear: both"></div>
            <!-- 切换优化结束 class="px10 py10"-->
          </div>

          <!-- 二级目录开始 nav-wrapper-->
          <section
              class="px10 py10 "
              style="padding-top: 5px; padding-bottom: 13px;width: 100%;"
              :style="show == true ? nvl_css.nvl_cssn : nvl_css.nvl_cssb"
          >

            <div class="Productmarket_title" style="">
              <van-row type="flex" justify="center">
                <van-col
                    :span="(chanpin_zhuti_qie_css.chanpin_wenzi.nva_pd_num=='5')?'5':(chanpin_zhuti_qie_css.chanpin_wenzi.nva_pd_num=='4')?'6':'7'"
                    v-if="ThirdCode[0]==true||Thirdadmin==true"
                    @click="Range_Single_choice('cpcy','_this.sel_value.Range_on',true,'_this.sel_value.theme','1')">
                  <div
                      class="select_title_css"
                      :class="{ active: sel_value.theme.cpcy === true }"
                  >
                    <!-- 产值概览 -->
                    {{ chanpin_zhuti_qie_css.chanpin_wenzi.title_level1 + '' }}
                  </div>
                </van-col>

                <van-col
                    :span="(chanpin_zhuti_qie_css.chanpin_wenzi.nva_pd_num=='5')?'5':(chanpin_zhuti_qie_css.chanpin_wenzi.nva_pd_num=='4')?'6':'7'"
                    v-if="ThirdCode[1]==true||Thirdadmin==true"

                    @click="Range_Single_choice('ouk','_this.sel_value.Range_on',true,'_this.sel_value.theme','2')">
                  <div
                      class="select_title_css"
                      :class="{ active: sel_value.theme.ouk === true }"
                  >
                    <!-- 欧康品质 -->
                    {{ chanpin_zhuti_qie_css.chanpin_wenzi.title_level2 + '' }}
                  </div>
                </van-col>


                <!-- v-if="$route.path!='/market-operation'||chanpin_zhuti_qie_css.chanpin_wenzi.nva_pd_num!='3'" -->

                <van-col

                    v-if="(ThirdCode[2]==true||Thirdadmin==true)&&chanpin_zhuti_qie_css.chanpin_wenzi.nva_pd_num_special==false"

                    :span="(chanpin_zhuti_qie_css.chanpin_wenzi.nva_pd_num=='5')?'5':(chanpin_zhuti_qie_css.chanpin_wenzi.nva_pd_num=='4')?'6':'7'"
                    @click="Range_Single_choice('muying','_this.sel_value.Range_on',true,'_this.sel_value.theme','3')"
                >
                  <div
                      class="select_title_css"
                      :class="{ active: sel_value.theme.muying === true }"
                  >
                    <!-- 母婴概览 -->
                    {{ chanpin_zhuti_qie_css.chanpin_wenzi.title_level3 + '' }}
                  </div>
                </van-col
                >

                <van-col
                    v-if="(chanpin_zhuti_qie_css.chanpin_wenzi.nva_pd_num=='5'||chanpin_zhuti_qie_css.chanpin_wenzi.nva_pd_num=='4')&&(ThirdCode[3]==true||Thirdadmin==true)"
                    :span="(chanpin_zhuti_qie_css.chanpin_wenzi.nva_pd_num=='5')?'5':(chanpin_zhuti_qie_css.chanpin_wenzi.nva_pd_num=='4')?'6':'7'"
                    @click="Range_Single_choice('pinzhi','_this.sel_value.Range_on',true,'_this.sel_value.theme','4')"
                >
                  <div
                      class="select_title_css"
                      :class="{ active: sel_value.theme.pinzhi === true }">
                    <!-- 品质概览 -->
                    {{ chanpin_zhuti_qie_css.chanpin_wenzi.title_level4 + '' }}
                  </div>
                </van-col
                >

                <van-col
                    v-if="chanpin_zhuti_qie_css.chanpin_wenzi.nva_pd_num=='5'&&(ThirdCode[4]==true||Thirdadmin==true)"
                    :span="(chanpin_zhuti_qie_css.chanpin_wenzi.nva_pd_num=='5')?'5':'7'"
                    @click="Range_Single_choice('kedanjia','_this.sel_value.Range_on',true,'_this.sel_value.theme','5')"
                >
                  <div
                      class="select_title_css"
                      :class="{ active: sel_value.theme.kedanjia === true }">
                    <!-- 品质概览 -->
                    {{ chanpin_zhuti_qie_css.chanpin_wenzi.title_level5 + '' }}
                  </div>
                </van-col
                >
              </van-row>
            </div>

          </section>
          <!-- 二级目录结束 -->
        </div>


        <!-- 头部切换结束 -->


      </section>


      <div>
        <swiper ref="mySwiper2" :options="swiperOptions2">
          <template v-for="item in tabs">

            <swiper-slide :key="item.label">
              <keep-alive>
                <div v-if="$route.path !== item.path" style="padding: 20px 0">
                  <van-skeleton title :row="10"/>
                </div>
                <router-view v-else/>

              </keep-alive>
            </swiper-slide>
          </template>
        </swiper>
      </div>
      <!-- 新的视图结束 -->


      <!-- 新的布局开始  :style="iphone_pd=='2'?{'margin-bottom':'34px'}:iphone_pd=='1'?{'margin-bottom':'0px'}:{'margin-bottom':'-34px'}"-->
      <div class="Bottom_nav footer  bottom_footer">
        <div style="height: 50px;width: 100%;">

          <ul class="Bottom_nav_ul">
            <li v-if="NavbarCode[0]==true" :style="{'width':((NavbarWidth==0)?20:(100/NavbarWidth))+'%'}"
                @click="Single_choice('shouye', ['_this.router_change('+0+')','_this.changeTab_new('+0+')','_this.Initialization_fun()'], true, '_this.Bottom_nav_pd')">

              <span v-if="Bottom_nav_pd.shouye==false" :class="Bottom_nav_pd.shouye? 'icon_css1_change ':'lanren1_newn'"
                    :style="{'width': 80/2.29+'px','height': 80/2.29+'px'}"></span>
              <p v-if="Bottom_nav_pd.shouye==false"
                 :style="Bottom_nav_pd.shouye? Bottom_nav_css.p_color_y:Bottom_nav_css.p_color_n"
                 style="padding-top: 0px;margin-top: -5px;">首页</p>
              <span v-if="Bottom_nav_pd.shouye==true"
                    :class="Bottom_nav_pd.shouye? Initialization_nav.val==true?'lanren1_new_init':'lanren1_new':'lanren1_newn'"
                    :style="{'width': 80/2+'px','height': 100/2+'px'}"></span>
            </li>
            <!-- this.CelJurisdiction.CelLeft=true; this.CelJurisdiction.CelRight=true;    this.changeTab_new(6); this.router_change_nav(6); -->
            <li v-if="NavbarCode[1]==true" :style="{'width':((NavbarWidth==0)?20:(100/NavbarWidth))+'%'}"
                @click="Single_choice('qudao', ['_this.router_change('+(FirstNavValue.QudaoNav)+')','_this.changeTab_new('+(FirstNavValue.QudaoNav)+')'], true, '_this.Bottom_nav_pd')">
              <!-- <i :class="Bottom_nav_pd.qudao? 'icon_css2_change':'icon_css2'"></i> -->
              <span :class="Bottom_nav_pd.qudao?'lanren2_new':'lanren2_newn'"
                    :style="{'width': 80/2.29+'px','height': 80/2.29+'px'}"></span>
              <p :style="Bottom_nav_pd.qudao? Bottom_nav_css.p_color_y:Bottom_nav_css.p_color_n"
                 style="padding-top: 0px;margin-top: -5px;">渠道</p>
            </li>
            <li v-if="NavbarCode[2]==true" :style="{'width':((NavbarWidth==0)?20:(100/NavbarWidth))+'%'}"
                @click="Single_choice('chanpin', ['_this.router_change('+(FirstNavValue.ChanpinVav)+')','_this.changeTab_new('+(FirstNavValue.ChanpinVav)+')'], true, '_this.Bottom_nav_pd')">
              <!-- <i :class="Bottom_nav_pd.chanpin? 'icon_css3_change':'icon_css3'"></i> -->
              <span :class="Bottom_nav_pd.chanpin?'lanren3_new':'lanren3_newn'"
                    :style="{'width': 80/2.29+'px','height': 80/2.29+'px'}"></span>
              <p :style="Bottom_nav_pd.chanpin? Bottom_nav_css.p_color_y:Bottom_nav_css.p_color_n"
                 style="padding-top: 0px;margin-top: -5px;">产品</p>
            </li>
            <li v-if="NavbarCode[3]==true" :style="{'width':((NavbarWidth==0)?20:(100/NavbarWidth))+'%'}"
                @click="Single_choice('cangchu', ['_this.router_change('+(FirstNavValue.CangchuNav)+')','_this.changeTab_new('+(FirstNavValue.CangchuNav)+')'], true, '_this.Bottom_nav_pd')">
              <!-- <i :class="Bottom_nav_pd.cangchu? 'icon_css4_change':'icon_css4'"></i> -->
              <span :class="Bottom_nav_pd.cangchu?'lanren4_new':'lanren4_newn'"
                    :style="{'width': 80/2.29+'px','height': 80/2.29+'px'}"></span>
              <p :style="Bottom_nav_pd.cangchu? Bottom_nav_css.p_color_y:Bottom_nav_css.p_color_n"
                 style="padding-top: 0px;margin-top: -5px;">仓储</p>
            </li>
            <li v-if="NavbarCode[4]==true" :style="{'width':((NavbarWidth==0)?20:(100/NavbarWidth))+'%'}"
                @click="Single_choice('caiwu', ['_this.router_change('+(FirstNavValue.CaiwuNav)+')','_this.changeTab_new('+(FirstNavValue.CaiwuNav)+')'], true, '_this.Bottom_nav_pd')">
              <!-- <i :class="Bottom_nav_pd.caiwu? 'icon_css5_change':'icon_css5'"></i> -->
              <span :class="Bottom_nav_pd.caiwu?'lanren5_new':'lanren5_newn'"
                    :style="{'width': 80/2.29+'px','height': 80/2.29+'px'}"></span>
              <p :style="Bottom_nav_pd.caiwu? Bottom_nav_css.p_color_y:Bottom_nav_css.p_color_n"
                 style="padding-top: 0px;margin-top: -5px;">财务</p>
            </li>

            <li style="clear: both;"></li>
          </ul>
        </div>


        <div class="btn-footer"></div>


      </div>

      <!-- 新的布局结束 -->


    </div>
  </div>

</template>

<script>


// 加上水印的     console.log(this.permissionRoleList);
import watermark from "@/utils/watermark";
import {mapState} from "vuex";


import {Row, Col, Button, ContactCard, Image, PullRefresh, Sticky, Loading, Overlay, Icon} from "vant";
import GuideSlides from "./GuideSlides/GuideSlides";

export default {
  name: "Layout",


  data() {
    return {

      opacity_css: {
        opacity: 0,
        opacity2: 0,
        opacity3: 0,

      },

      //welcome开始
      welcome_show: {
        title_logo: false,
        title_cont: false,
        characters: false,
      },
      welcome_characters: "数据感知未来",
      sessionStorage_set: "",

      sessionwelcome_set: false,

      sessionannounce_set: false,   //通过文本
      sessionannounce_time: false,  //通告维持时间

      bgwidth_css: {
        width: "",
        height: "",
      },
      images_set: {
        images_set_bg: require("@/assets/images/welcome/welcome_bg.png"),
        images_set_con: require("@/assets/images/welcome/welcome_wz.png"),

        images_set_bg_new: require("@/assets/images/welcome/welcome_bg_title_n.png"),
        images_set_con_new: require("@/assets/images/welcome/welcome_bg_cont.png"),

        images_Maintenance_notice: require("@/assets/images/welcome/Maintenance_notice.png")
      },
      xian_yin_css: false,
      //welcome结束


      currentTabIndex: 0,
      tabs: [
        {
          label: "概览",
          path: "/entry",
        },

        {
          label: "销售渠道",
          path: "/sales-channel",
        },


        {
          label: "产品中心",
          path: "/product-supply",
        },


        {
          label: "仓储物流",
          path: "/logistics",
        },

        {
          label: "财务管理",
          path: "/financial",
        },


        {
          label: "品牌市场",
          path: "/product-market",
        },


        {
          label: "市场运营",
          path: "/market-operation",
        },


        {
          label: "欢迎首页",
          path: "/welcome",
        },
      ],

      count: 0,
      isLoading: false,
      container_set: null,

      swiperOptions: {
        slidesPerView: 5,
        resistanceRatio: 0.7,
      },
      swiperOptions2: {
        slidesPerView: 1,
        noSwiping: true,
        noSwipingSelector: "canvas,i,div",
      },

      // 新加的开始
      nav_theme: {
        show: false,
        nav_all_show: false,
        show_index: null,
        title_css: {
          "padding-left": "10px",
          "padding-right": "10px",
          "padding-top": "10px",
          "padding-bottom": "10px",
          "border-bottom": "1px solid rgb(221, 221, 221)",
          display: "block",
        },
        title_cssn: {
          "padding-left": "10px",
          "padding-right": "10px",
          "padding-top": "10px",
          "padding-bottom": "10px",
          "border-bottom": "1px solid rgb(221, 221, 221)",
          display: "none",
        },
        title_css_all: {
          "border-bottom": "1px solid #ddd",
          display: "block",
        },
        title_css_all_no: {
          "border-bottom": "1px solid #ddd",
          display: "none",
        },
      },

      sel_value: {
        day_1: true,
        day_7: false,
        day_30: false,
        month: false,

        theme: {
          cpcy: true,
          ouk: false,
          muying: false,
          pinzhi: false,
          kedanjia: false,
        },
        Range_on: {
          Range_set: "",
        },

        all_muri_value: "",
        test_kaiguan: 1,
        test_kaiguan_last: 2,
      },

      click_css_set: {type: "info", color: "rgba(89, 178, 178, 1)"},
      click_css_no: {type: "default", color: ""},

      Bottom_nav_pd: {
        shouye: true,
        qudao: false,
        chanpin: false,
        cangchu: false,
        caiwu: false,
      },
      // 2021-08-04首页初始化值css
      Initialization_nav: {
        val: true,
      },
      // 2021-08-04首页初始化值css
      Bottom_nav_css: {
        p_color_y: {
          // color: '#4187F1'
          // color: '#004B5D'
          // color:'#159B80'
          color: '#03bacc'
        },
        p_color_n: {
          // color: '#999999'
          color: '#B5B3B3'
        },
        title_all_css_y: {
          display: 'inline-block'
        },
        title_all_css_y_all: {
          display: 'block'
        },
        title_all_css_n: {
          display: 'none'
        },
        show_title: true,
        show_index: true,
        show_secon: true,

      },
      logo_img: require("@/assets/images/logo.png"),

      // 新加的结束

      show: false,
      zhe_zhao_show: true,
      announce_show: true,

      nvl_css: {
        nvl_cssb: {
          // display: "block",
          display: "inline-block",
        },

        nvl_cssn: {
          display: "none",
        },
      },

      chanpin_zhuti_qie: {
        chanpin_pd: "1",
      },

      chanpin_zhuti_qie_css: {
        chanpin_y: {
          // background: "#E6E6E6",
          // color: "rgb(255, 255, 255)",
          background: "#ffffff",
          // color: "#1678FF",
          color: "#00586D",
          border: "0px solid #ffffff",
        },
        chanpin_n: {
          color: "rgb(255, 255, 255)",
          border: "1px solid #ffffff",
        },

        chanpin_wenzi: {
          title_left: "",
          title_right: "",
          title_level1: "",
          title_level2: "",
          title_level3: "",
          title_level4: "",
          title_level5: "",

          set_value_wz: "",
          nva_pd_num: "",
          nva_pd_num_special: false,

        },

        router_change_naset: {
          change_left: 0,
          change_right: 0
        }


      },

      iphone_pd: '1',

      data_loay: false,

      isFirstLogin_set: '',

      // 添加水印的
      orgBackground: '',

      // 权限角色变量
      Navbar: [],
      NavbarCode: [],
      NavbarWidth: 5,
      admin: false,
      secondadmin: false,
      CelJurisdiction: {
        CelLeft: false,
        CelRight: false
      },//渠道权限
      Thirdadmin: false,
      TirJurisdiction: {
        CelLeft: false,
        CelRight: false
      },//三级权限
      ThirdCode: [],//三级权限管控列表
      FirstNavValue: {
        QudaoNav: 1,
        ChanpinVav: 2,
        CangchuNav: 33,
        CaiwuNav: 44,
      },
      JumpToPageSign: false,
      JumpToPageInfo: {
        setval: 1,
        val: 1,
        name: ''
      },

      markedMap: {}
    };
  },

  components: {
    GuideSlides,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [ContactCard.name]: ContactCard,
    [Image.name]: Image,
    [PullRefresh.name]: PullRefresh,
    [Sticky.name]: Sticky,
    [Loading.name]: Loading,
    [Overlay.name]: Overlay,
    [Icon.name]: Icon
  },
  computed: {
    ...mapState("user", ["permissionList", "permissionRoleList", "AdminRole"]),
  },
  beforeMount() {
    if (sessionStorage.getItem("welcome") == null) {
      this.sessionStorage_set = "1";
    } else {
      this.sessionStorage_set = "2";
    }

  },

  created() {
    this.hasMarkedPromise = this.$axios.get('/api/admin/common/mark/hasMarked', {
      params: {markNo: 'guide_slides__v001'}
    }).then(({data: checked}) => {
      return checked
    })

    this.windowHeight_set = document.documentElement.clientHeight || document.body.clientHeight
    this.jurisdictionFun();
    // 二级导航栏的权限
  },


  watch: {
    $route: {
      handler(val) {
        let index = this.tabs.findIndex((item) => item.path === val.path);

        if (index !== null) {
          this.changeTab_new(index);
        }

        // console.log("=========11111"+"    "+index)
        // this.gundong(index);
        //目的是切换的时候默认是第一个值！
        console.log("====监测路由==  layout!!!====");
        if (this.isIPhoneX()) {
          if (val.path == '/product-market') {
            this.iphone_pd = '3';
          } else {
            this.iphone_pd = '2';
          }
        } else {
          this.iphone_pd = '1';
        }

        if (this.JumpToPageSign == false) {
          if (index == 0) {
            this.Single_choice('shouye', ['_this.router_change(' + 0 + ')'], true, '_this.Bottom_nav_pd');
          } else if (index == 1) {
            this.Single_choice('qudao', ['_this.router_change(' + 1 + ')'], true, '_this.Bottom_nav_pd');
          } else if (index == 2) {
            this.Single_choice('chanpin', ['_this.router_change(' + 2 + ')'], true, '_this.Bottom_nav_pd');
          } else if (index == 5) {
            this.Single_choice('chanpin', ['_this.router_change(' + 5 + ')'], true, '_this.Bottom_nav_pd');
          } else if (index == 6) {
            this.Single_choice('qudao', ['_this.router_change(' + 6 + ')'], true, '_this.Bottom_nav_pd');
          } else if (index == 3) {
            this.Single_choice('cangchu', ['_this.router_change(' + 3 + ')'], true, '_this.Bottom_nav_pd');
          } else if (index == 4) {
            this.Single_choice('caiwu', ['_this.router_change(' + 4 + ')'], true, '_this.Bottom_nav_pd');
          }
        } else {
          //加了首页跳转的逻辑
          this.JumpToPageSign = false;
          if (this.JumpToPageInfo.setval == 1 || this.JumpToPageInfo.setval == 6) {
            this.Single_choice('qudao', ['_this.JumpRouter(' + this.JumpToPageInfo.setval + ')', '_this.router_change_nav(' + this.JumpToPageInfo.setval + ')'], true, '_this.Bottom_nav_pd');
          } else if (this.JumpToPageInfo.setval == 2 || this.JumpToPageInfo.setval == 5) {
            this.Single_choice('chanpin', ['_this.JumpRouter(' + this.JumpToPageInfo.setval + ')', '_this.router_change_nav(' + this.JumpToPageInfo.setval + ')'], true, '_this.Bottom_nav_pd');
          } else if (this.JumpToPageInfo.setval == 3) {
            this.Single_choice('cangchu', ['_this.JumpRouter(' + this.JumpToPageInfo.setval + ')', '_this.router_change_nav(' + this.JumpToPageInfo.setval + ')'], true, '_this.Bottom_nav_pd');
          } else if (this.JumpToPageInfo.setval == 4) {
            this.Single_choice('caiwu', ['_this.JumpRouter(' + this.JumpToPageInfo.setval + ')', '_this.router_change_nav(' + this.JumpToPageInfo.setval + ')'], true, '_this.Bottom_nav_pd');
          }

          this.Range_Single_choice(this.JumpToPageInfo.name, '_this.sel_value.Range_on', true, '_this.sel_value.theme', this.JumpToPageInfo.val + '');

          // console.log(this.JumpToPageInfo.name);
          // console.log(this.JumpToPageInfo.val);
        }


        // this.EventBusOffFun();


      },
      immediate: false,


    },


  },


  mounted() {

    this.orgBackground = watermark(this.$store.state.app.getusername);

    var storage = window.localStorage;
    if ((new Date()).getDate() < 10 && ((new Date()).getMonth() + 1) == 5 && (((new Date()).getMonth() + 1) * 10000 + (new Date()).getDate() * 100 + (new Date()).getHours()) < 50902) {
      // 测试localStorage的值开始
      if (!window.localStorage) {
        console.log("浏览器不支持localStorage");
      } else {
        if (storage.getItem("announce_info") == null) {
          console.log("获取到空值！！！");
          storage.setItem("announce_info", JSON.stringify({
            userid: this.$store.state.app.getusername.split(" ")[1],
            time: ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate()
          }));
          this.sessionannounce_time = true;
        } else {

          let announce_info_set = storage.getItem("announce_info");
          announce_info_set = JSON.parse(announce_info_set);
          if (announce_info_set.time.split("-")[0] * 1 == ((new Date()).getMonth() + 1) && announce_info_set.time.split("-")[1] * 1 == (new Date()).getDate()) {
            this.sessionannounce_time = false;
          } else {
            storage.setItem("announce_info", JSON.stringify({
              userid: this.$store.state.app.getusername.split(" ")[1],
              time: ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate()
            }));
            this.sessionannounce_time = true;
          }
          // console.log("不是空值的！！！");
          // console.log(announce_info_set.time.split("-"));

        }
      }


    } else {
      this.sessionannounce_time = false;
      storage.removeItem("announce_info");//删除方法
    }


    this.isFirstLogin_set = this.$store.state.app.getLoginUserFirst;


    this.bgwidth_css.width = window.innerWidth;
    this.bgwidth_css.height = window.innerHeight;


    if (this.sessionStorage_set == "1") {
      console.log("欢迎！！");
      // this.opacity = 1;
      this.welcome_show.title_logo = true;
      this.sessionwelcome_set = false;
      sessionStorage.setItem("welcome", "1"); //添加
      this.welcome_fun();
    } else if (this.sessionStorage_set == "2") {
      setTimeout(() => {
        this.$EventBus.$emit("entry_f", {
          Loading: true,
        });
      }, 20)

      this.sessionwelcome_set = true;
      // this.$router.push({
      //   path: "/entry",
      // });
    }


    this.container_set = this.$refs.container_all;// 固定导航
    const entryImgHeight = this.$refs["entryImg"].clientHeight; //获取图片的高度
    this.$store.commit("app/setNavbarTopOffset", entryImgHeight); //参考的
    const currentPath = this.$route.path;
    const index = this.tabs.findIndex((item) => item.path === currentPath);

    // console.log("====有运行的！===");
    // console.log(index);


    if (this.isIPhoneX()) {

      // console.log("是的！！！！！！！！！！");
      // this.iphone_pd=true;
      if (this.$route.path == '/product-market') {
        this.iphone_pd = '3';
      } else {
        this.iphone_pd = '2';
      }

    } else {
      // console.log("否的！！！！！！！！！！！！！");
      this.iphone_pd = '1';
    }


    // 滚动的开始
    // this.gundong(index);
    // 滚动的结束


    // 最新导航栏布局代码开始
    if (index == 0) {
      this.Single_choice('shouye', ['_this.router_change(' + 0 + ')'], true, '_this.Bottom_nav_pd');
    } else if (index == 1) {
      this.Single_choice('qudao', ['_this.router_change(' + 1 + ')'], true, '_this.Bottom_nav_pd');
    } else if (index == 2) {
      this.Single_choice('chanpin', ['_this.router_change(' + 2 + ')'], true, '_this.Bottom_nav_pd');
    } else if (index == 5) {
      this.Single_choice('chanpin', ['_this.router_change(' + 5 + ')'], true, '_this.Bottom_nav_pd');
    } else if (index == 6) {
      this.Single_choice('qudao', ['_this.router_change(' + 6 + ')'], true, '_this.Bottom_nav_pd');
    } else if (index == 3) {
      this.Single_choice('cangchu', ['_this.router_change(' + 3 + ')'], true, '_this.Bottom_nav_pd');
    } else if (index == 4) {
      this.Single_choice('caiwu', ['_this.router_change(' + 4 + ')'], true, '_this.Bottom_nav_pd');
    }

    this.$EventBus.$on("Salechan_choice_ProMark_Callback", (Range_value_set) => {
      if (Range_value_set.Range_value_set == '1') {
        this.Single_choice('cpcy', '', true, '_this.sel_value.theme');
      } else if (Range_value_set.Range_value_set == '2') {
        this.Single_choice('ouk', '', true, '_this.sel_value.theme');
      } else if (Range_value_set.Range_value_set == '3') {
        this.Single_choice('muying', '', true, '_this.sel_value.theme');
      }

      (document.documentElement.scrollTop) = 0;
      (document.body.scrollTop) = 0;
      // let top= document.body.scrollTop;
      // console.log("asasasassqadsdfgsd121212121212121221111111111111111111111111")
      // console.log(top);

    });

    this.$EventBus.$on("Salechan_choice_sales_Callback", (Range_value_set) => {
      if (Range_value_set.Range_value_set == '1') {
        this.Single_choice('cpcy', '', true, '_this.sel_value.theme');
      } else if (Range_value_set.Range_value_set == '2') {
        this.Single_choice('ouk', '', true, '_this.sel_value.theme');
      } else if (Range_value_set.Range_value_set == '3') {
        this.Single_choice('muying', '', true, '_this.sel_value.theme');
      } else if (Range_value_set.Range_value_set == '4') {
        this.Single_choice('pinzhi', '', true, '_this.sel_value.theme');
      }

      (document.documentElement.scrollTop) = 0;
      (document.body.scrollTop) = 0;
    });


    this.$EventBus.$on("Salechan_choice_supply_Callback", (Range_value_set) => {
      if (Range_value_set.Range_value_set == '1') {
        this.Single_choice('cpcy', '', true, '_this.sel_value.theme');
      } else if (Range_value_set.Range_value_set == '2') {
        this.Single_choice('ouk', '', true, '_this.sel_value.theme');
      } else if (Range_value_set.Range_value_set == '3') {
        this.Single_choice('muying', '', true, '_this.sel_value.theme');
      } else if (Range_value_set.Range_value_set == '4') {
        this.Single_choice('pinzhi', '', true, '_this.sel_value.theme');
      } else if (Range_value_set.Range_value_set == '5') {
        this.Single_choice('kedanjia', '', true, '_this.sel_value.theme');
      }

      (document.documentElement.scrollTop) = 0;
      (document.body.scrollTop) = 0;
    });


    this.$EventBus.$on("Salechan_choice_logistics_Callback", (Range_value_set) => {
      if (Range_value_set.Range_value_set == '1') {
        this.Single_choice('cpcy', '', true, '_this.sel_value.theme');
      } else if (Range_value_set.Range_value_set == '2') {
        this.Single_choice('ouk', '', true, '_this.sel_value.theme');
      } else if (Range_value_set.Range_value_set == '3') {
        this.Single_choice('muying', '', true, '_this.sel_value.theme');
      }

      (document.documentElement.scrollTop) = 0;
      (document.body.scrollTop) = 0;
    });

    this.$EventBus.$on("Salechan_choice_financial_Callback", (Range_value_set) => {
      if (Range_value_set.Range_value_set == '1') {
        this.Single_choice('cpcy', '', true, '_this.sel_value.theme');
      } else if (Range_value_set.Range_value_set == '2') {
        this.Single_choice('ouk', '', true, '_this.sel_value.theme');
      } else if (Range_value_set.Range_value_set == '3') {
        this.Single_choice('muying', '', true, '_this.sel_value.theme');
      }

      (document.documentElement.scrollTop) = 0;
      (document.body.scrollTop) = 0;
    });


    this.$EventBus.$on("data_loay_set", (data_loay_seton) => {
      // console.log("======layout======");
      this.data_loay = data_loay_seton.data_loay_seton;
    });


    this.$EventBus.$on("JumpToPage_all", (val) => {
      // console.log("运行到跳转页面这里来了！！！！！");
      let PassCheck = false;
      let DrawValuecon = 0;
      let SetPermSion = val.permission.split("-");
      // 添加了权限控制逻辑开始
      Object.keys(SetPermSion).forEach((keyper) => {
        if (this.AdminRole == true) {
          PassCheck = true;
        } else {
          Object.keys(this.permissionRoleList).forEach((key) => {
            if ((this.permissionRoleList[key].name).indexOf("首页") < 0) {
              DrawValuecon = (this.permissionRoleList[key].name).split("-");
              // console.log(DrawValuecon);
              if (DrawValuecon.length == 1 && (DrawValuecon[0] == '全权限')) {
                console.log(DrawValuecon);
                PassCheck = true;
              } else if (DrawValuecon.length == 1 && (DrawValuecon[0]).indexOf(SetPermSion[keyper]) >= 0) {
                console.log("===================");
                console.log("权限一级开！");
                console.log(DrawValuecon[0]);
                PassCheck = true;
              } else if (DrawValuecon.length == 2 && (DrawValuecon[1]).indexOf(SetPermSion[keyper]) >= 0) {
                console.log("===================");
                console.log("权限二级开！");
                console.log(DrawValuecon[1]);
                PassCheck = true;
              } else if (DrawValuecon.length == 3 && (DrawValuecon[1]).indexOf(SetPermSion[1]) >= 0 && (DrawValuecon[2]).indexOf(SetPermSion[keyper]) >= 0) {
                console.log("===================");
                console.log("权限三级开！");
                console.log(DrawValuecon[2]);
                PassCheck = true;
              }
            }
          });
        }

      });
      // 添加了权限控制逻辑结束

      if (PassCheck == true) {
        this.JumpToPageSign = true;
        this.changeTab_new((val.setval));
        this.JumpToPageInfo.setval = val.setval;
        this.JumpToPageInfo.val = val.jumpval;
        this.JumpToPageInfo.name = val.jumpname;
      }
      console.log(val);
      // console.log(PassCheck);
    });

    this.$EventBus.$on("JumpToPage_tag", (val) => {
      // console.log("运行到跳转页面这里来了！！！！！");
      let PassCheck = false;
      let DrawValuecon = 0;
      let SetPermSion = val.permission.split("-");
      // 添加了权限控制逻辑开始
      Object.keys(SetPermSion).forEach((keyper) => {
        if (this.AdminRole == true) {
          PassCheck = true;
        } else {
          Object.keys(this.permissionRoleList).forEach((key) => {
            if ((this.permissionRoleList[key].name).indexOf("首页") < 0) {
              DrawValuecon = (this.permissionRoleList[key].name).split("-");
              // console.log(DrawValuecon);
              if (DrawValuecon.length == 1 && (DrawValuecon[0] == '全权限')) {
                console.log(DrawValuecon);
                PassCheck = true;
              } else if (DrawValuecon.length == 1 && (DrawValuecon[0]).indexOf(SetPermSion[keyper]) >= 0) {
                console.log("===================");
                console.log("权限一级开！");
                console.log(DrawValuecon[0]);
                PassCheck = true;
              } else if (DrawValuecon.length == 2 && (DrawValuecon[1]).indexOf(SetPermSion[keyper]) >= 0) {
                console.log("===================");
                console.log("权限二级开！");
                console.log(DrawValuecon[1]);
                PassCheck = true;
              } else if (DrawValuecon.length == 3 && (DrawValuecon[1]).indexOf(SetPermSion[1]) >= 0 && (DrawValuecon[2]).indexOf(SetPermSion[keyper]) >= 0) {
                console.log("===================");
                console.log("权限三级开！");
                console.log(DrawValuecon[2]);
                PassCheck = true;
              }
            }
          });
        }
      });
      // 添加了权限控制逻辑结束
      if (PassCheck == true) {
        this.JumpToPageSign = true;
        this.changeTab_new((val.setval));
        this.JumpToPageInfo.setval = val.setval;
        this.JumpToPageInfo.val = val.jumpval;
        this.JumpToPageInfo.name = val.jumpname;
      }
      console.log(val);
      // console.log(PassCheck);
    });


    // 最新导航栏布局代码结束


    // 以前的代码
    if (index !== 0) {
      // let start_set_index=0;
      // if(index==0){
      //   start_set_index=0;
      // }else if(index==4){
      //   start_set_index=1;
      // }else if(index==1){
      //   start_set_index=2;
      // }else if(index==5){
      //   start_set_index=3;
      // }else if(index==6){
      //   start_set_index=4;
      // }
      this.$refs['mySwiper2'].$swiper.slideTo(index)
      this.changeTab_new(index);
    }

    // console.log("===========layout============")
    // console.log(this.$refs['mySwiper2'].$swiper);

    this.$refs['mySwiper2'].$swiper.on('slideChangeTransitionEnd', (swiper) => {

      console.log("======改变后的！！！！=========");
      const index = (swiper.realIndex)
      console.log(index);
      this.changeTab_new_2(index)
      // let new_set_index=0;
      // if(index==0){
      //   new_set_index=0;
      // }else if(index==1){
      //   new_set_index=4;
      // }else if(index==2){
      //   new_set_index=1;
      // }else if(index==3){
      //   new_set_index=5;
      // }else if(index==4){
      //   new_set_index=6;
      // }
      this.$router.push({
        path: this.tabs[index].path
      })
    })

  },
  methods: {

    // 测试的跳转开始
    test_router() {
      console.log(window.history.length);
      alert(window.history.length);
      window.history.go(-1);

    },
    // 测试的跳转结束

    // 权限函数开始
    jurisdictionFun() {
      // console.log("==============运行到这里来 一级的！！==1==========");
      this.Navbar = ["首页", "渠道", "产品", "仓储", "财务",];
      this.NavbarCode = [false, false, false, false, false,];
      this.NavbarWidth = 0;
      let DrawValue = 0;
      let Navbararr = [];
      if (this.AdminRole == true) {
        this.admin = true;
      } else {
        Object.keys(this.permissionRoleList).forEach((keynav) => {
          if ((this.permissionRoleList[keynav].name).indexOf("全权限") >= 0) {
            this.admin = true;
          }
        });
      }


      if (this.admin == true) {
        // console.log("==============运行到这里来 一级的！！==2==========");
        Object.keys(this.Navbar).forEach((keybar) => {
          this.NavbarCode[keybar] = true;
          // this.NavbarWidth=this.NavbarWidth+1;
        });
      } else {
        Object.keys(this.permissionRoleList).forEach((key) => {
          DrawValue = (this.permissionRoleList[key].name).split("-");
          Object.keys(this.Navbar).forEach((keybar) => {
            if ((DrawValue[0]).indexOf(this.Navbar[keybar]) >= 0) {
              this.NavbarCode[keybar] = true;
            }
          });
        });
      }
      Object.keys(this.NavbarCode).forEach((keyon) => {
        if (this.NavbarCode[keyon] == true) {
          Navbararr.push(this.NavbarCode[keyon]);
          if (this.Navbar[keyon] == '首页') {
            this.SecondJurtionFun(0);
          } else if (this.Navbar[keyon] == '渠道') {
            this.SecondJurtionFun(1);
          } else if (this.Navbar[keyon] == '产品') {
            this.SecondJurtionFun(2);
          } else if (this.Navbar[keyon] == '仓储') {
            this.SecondJurtionFun(3);
          } else if (this.Navbar[keyon] == '财务') {
            this.SecondJurtionFun(4);
          }
        }
      });
      this.NavbarWidth = Navbararr.length;
    },


    SecondInfoFun(pdarr) {
      let DrawValueSecon = 0;
      this.secondadmin = false;
      this.CelJurisdiction.CelLeft = false;
      this.CelJurisdiction.CelRight = false;
      // let _this=this;
      if (this.AdminRole == true) {
        this.secondadmin = true;
        this.CelJurisdiction.CelLeft = true;
        this.CelJurisdiction.CelRight = true;
        this.FirstNavValue[pdarr.difval] = pdarr.difnum;
      } else {
        Object.keys(this.permissionRoleList).forEach((key) => {
          DrawValueSecon = (this.permissionRoleList[key].name).split("-");
          if ((DrawValueSecon[0]).indexOf(pdarr.first) >= 0 || (DrawValueSecon[0]).indexOf("全权限") >= 0) {
            if (DrawValueSecon.length == 1 || (DrawValueSecon[0]).indexOf("全权限") >= 0) {
              this.secondadmin = true;
              this.CelJurisdiction.CelLeft = true;
              this.CelJurisdiction.CelRight = true;
              this.FirstNavValue[pdarr.difval] = pdarr.difnum;
            } else if (DrawValueSecon.length != 1) {
              this.secondadmin = false;
              Object.keys(pdarr.second).forEach((seckey) => {
                if ((DrawValueSecon[1]).indexOf(pdarr.second[seckey].name) >= 0) {
                  if (pdarr.second[seckey].tpye == "Left") {
                    this.CelJurisdiction.CelLeft = true;
                  } else if (pdarr.second[seckey].tpye == "Right") {
                    this.CelJurisdiction.CelRight = true;
                  }
                  this.FirstNavValue[pdarr.difval] = pdarr.second[seckey].val;
                }
              });
              if (this.CelJurisdiction.CelLeft == true && this.CelJurisdiction.CelRight == true) {
                this.FirstNavValue[pdarr.difval] = pdarr.second[0].val;
              }
            }
          }
        });
      }
      if (this.CelJurisdiction.CelLeft == true && this.CelJurisdiction.CelRight == true) {
        this.secondadmin = true;
      } else {
        this.secondadmin = false;
      }
    },

    SecondJurtionFun(setval) {
      // console.log("==========运行到权限二级函数这里来！！！==============");

      if (setval == 1 || setval == 6) {
        // 渠道
        // console.log("渠道一级导航栏！！！");
        let set_array = {
          first: "渠道",
          second: [{name: "渠道业绩", val: 1, tpye: "Left"}, {name: "渠道运营", val: 6, tpye: "Right"}],
          difval: "QudaoNav",
          difnum: 1
        };
        this.SecondInfoFun(set_array);

      } else if (setval == 2 || setval == 5) {
        // 产品
        let set_array = {
          first: "产品",
          second: [{name: "产品中心", val: 2, tpye: "Left"}, {name: "品牌市场", val: 5, tpye: "Right"}],
          difval: "ChanpinVav",
          difnum: 2
        };
        this.SecondInfoFun(set_array);

      } else if (setval == 3) {
        // 仓储
        let set_array = {first: "仓储", second: [{name: "仓储物流", val: 3, tpye: "Left"}], difval: "CangchuNav", difnum: 3};
        this.SecondInfoFun(set_array);

      } else if (setval == 4) {
        // 财务
        let set_array = {first: "财务", second: [{name: "财务管理", val: 4, tpye: "Left"}], difval: "CaiwuNav", difnum: 4};
        this.SecondInfoFun(set_array);

      }

      this.ThirdJurtionFun(setval);

      // console.log(this.CelJurisdiction.CelLeft);
      // console.log(this.CelJurisdiction.CelRight);

    },

    ThirdJurtionFun(setval) {
      // console.log("==========运行到权限三级函数这里来！！！==============");
      this.ThirdCode = [false, false, false, false, false,];
      this.Thirdadmin = false;
      let DrawValueSecon = 0;
      let PermissionArr = [];
      if (setval == 1) {
        //渠道业绩
        // console.log("渠道业绩");
        if (this.AdminRole == true) {
          this.Thirdadmin = true;
          this.ThirdCode[0] = true;
          this.ThirdCode[1] = true;
          this.ThirdCode[2] = true;
          PermissionArr.push('业绩达成', '实时业绩', '订单状态');
        } else {
          Object.keys(this.permissionRoleList).forEach((key) => {
            DrawValueSecon = (this.permissionRoleList[key].name).split("-");
            if ((DrawValueSecon[0]).indexOf("渠道") >= 0 || (DrawValueSecon[0]).indexOf("全权限") >= 0) {
              // console.log(DrawValueSecon);
              if ((DrawValueSecon.length == 1 || ((DrawValueSecon[1]).indexOf("渠道业绩") >= 0 && DrawValueSecon.length == 2) || (DrawValueSecon[0]).indexOf("全权限") >= 0)) {
                this.Thirdadmin = true;
                this.ThirdCode[0] = true;
                this.ThirdCode[1] = true;
                this.ThirdCode[2] = true;
                PermissionArr.push('业绩达成', '实时业绩', '订单状态');
              } else if (DrawValueSecon.length >= 3 && (DrawValueSecon[1]).indexOf("渠道业绩") >= 0) {
                this.Thirdadmin = false;
                if ((DrawValueSecon[2]).indexOf("业绩达成") >= 0) {
                  this.ThirdCode[0] = true;
                  PermissionArr.push('业绩达成');
                } else if ((DrawValueSecon[2]).indexOf("实时业绩") >= 0) {
                  this.ThirdCode[1] = true;
                  PermissionArr.push('实时业绩');
                } else if ((DrawValueSecon[2]).indexOf("订单状态") >= 0) {
                  this.ThirdCode[2] = true;
                  PermissionArr.push('订单状态');
                }
              }
            }
          });
        }
        if (this.ThirdCode[0] == true && this.ThirdCode[1] == true && this.ThirdCode[2] == true) {
          this.Thirdadmin = true;
        } else {
          this.Thirdadmin = false;
        }
      } else if (setval == 6) {
        //渠道运营
        // console.log("渠道运营");
        if (this.AdminRole == true) {
          this.Thirdadmin = true;
          this.ThirdCode[0] = true;
          this.ThirdCode[1] = true;
          this.ThirdCode[2] = true;
          this.ThirdCode[3] = true;
          // PermissionArr.push('推广引流','流量分析','客单价','未发取消');
          PermissionArr.push('付费推广', '流量分析', '客单价', '未发取消');

        } else {
          Object.keys(this.permissionRoleList).forEach((key) => {
            DrawValueSecon = (this.permissionRoleList[key].name).split("-");
            // console.log(DrawValueSecon.length);
            if ((DrawValueSecon[0]).indexOf("渠道") >= 0 || (DrawValueSecon[0]).indexOf("全权限") >= 0) {
              if ((DrawValueSecon.length == 1 || ((DrawValueSecon[1]).indexOf("渠道运营") >= 0 && DrawValueSecon.length == 2) || (DrawValueSecon[0]).indexOf("全权限") >= 0)) {
                this.Thirdadmin = true;
                this.ThirdCode[0] = true;
                this.ThirdCode[1] = true;
                this.ThirdCode[2] = true;
                this.ThirdCode[3] = true;
                PermissionArr.push('付费推广', '流量分析', '客单价', '未发取消');
              } else if (DrawValueSecon.length >= 3 && (DrawValueSecon[1]).indexOf("渠道运营") >= 0) {
                this.Thirdadmin = false;
                if ((DrawValueSecon[2]).indexOf("付费推广") >= 0) {
                  this.ThirdCode[0] = true;
                  PermissionArr.push('付费推广');
                } else if ((DrawValueSecon[2]).indexOf("流量分析") >= 0) {
                  this.ThirdCode[1] = true;
                  PermissionArr.push('流量分析');
                } else if ((DrawValueSecon[2]).indexOf("客单价") >= 0) {
                  this.ThirdCode[2] = true;
                  PermissionArr.push('客单价');
                } else if ((DrawValueSecon[2]).indexOf("未发取消") >= 0) {
                  this.ThirdCode[3] = true;
                  PermissionArr.push('未发取消');
                }

              }
            }
          });
        }
        if (this.ThirdCode[0] == true && this.ThirdCode[1] == true && this.ThirdCode[2] == true && this.ThirdCode[3] == true) {
          this.Thirdadmin = true;
        } else {
          this.Thirdadmin = false;
        }
      } else if (setval == 2) {
        //产品中心
        if (this.AdminRole == true) {
          this.Thirdadmin = true;
          this.ThirdCode[0] = true;
          this.ThirdCode[1] = true;
          this.ThirdCode[2] = true;
          this.ThirdCode[3] = true;
          this.ThirdCode[4] = true;
          // PermissionArr.push('SKU均值','客单','欠货','品质','库存');
          PermissionArr.push('新品', 'SKU均值', '欠货', '品质', '库存');
        } else {
          Object.keys(this.permissionRoleList).forEach((key) => {
            DrawValueSecon = (this.permissionRoleList[key].name).split("-");
            if ((DrawValueSecon[0]).indexOf("产品") >= 0 || (DrawValueSecon[0]).indexOf("全权限") >= 0) {
              // console.log(DrawValueSecon);
              if ((DrawValueSecon.length == 1 || ((DrawValueSecon[1]).indexOf("产品中心") >= 0 && DrawValueSecon.length == 2) || (DrawValueSecon[0]).indexOf("全权限") >= 0)) {
                this.Thirdadmin = true;
                this.ThirdCode[0] = true;
                this.ThirdCode[1] = true;
                this.ThirdCode[2] = true;
                this.ThirdCode[3] = true;
                this.ThirdCode[4] = true;
                // PermissionArr.push('SKU均值','客单','欠货','品质','库存');
                PermissionArr.push('新品', 'SKU均值', '欠货', '品质', '库存');
              } else if (DrawValueSecon.length >= 3 && (DrawValueSecon[1]).indexOf("产品中心") >= 0) {
                this.Thirdadmin = false;
                if ((DrawValueSecon[2]).indexOf("新品") >= 0) {
                  this.ThirdCode[0] = true;
                  PermissionArr.push('新品');
                } else if ((DrawValueSecon[2]).indexOf("SKU均值") >= 0) {
                  this.ThirdCode[1] = true;
                  PermissionArr.push('SKU均值');
                } else if ((DrawValueSecon[2]).indexOf("欠货") >= 0) {
                  this.ThirdCode[2] = true;
                  PermissionArr.push('欠货');
                } else if ((DrawValueSecon[2]).indexOf("品质") >= 0) {
                  this.ThirdCode[3] = true;
                  PermissionArr.push('品质');
                } else if ((DrawValueSecon[2]).indexOf("库存") >= 0) {
                  this.ThirdCode[4] = true;
                  PermissionArr.push('库存');
                }
              }
            }
          });
        }
        if (this.ThirdCode[0] == true && this.ThirdCode[1] == true && this.ThirdCode[2] == true && this.ThirdCode[3] == true && this.ThirdCode[4] == true) {
          this.Thirdadmin = true;
        } else {
          this.Thirdadmin = false;
        }
      } else if (setval == 5) {
        //品牌市场
        if (this.AdminRole == true) {
          this.Thirdadmin = true;
          this.ThirdCode[0] = true;
          this.ThirdCode[1] = true;
          this.ThirdCode[2] = true;
          // PermissionArr.push('产值概览','欧康品质','母婴概览');
          PermissionArr.push('抖音快手', '欧康品质', '母婴概览');
        } else {
          Object.keys(this.permissionRoleList).forEach((key) => {
            DrawValueSecon = (this.permissionRoleList[key].name).split("-");
            if ((DrawValueSecon[0]).indexOf("产品") >= 0 || (DrawValueSecon[0]).indexOf("全权限") >= 0) {
              // console.log(DrawValueSecon);
              if ((DrawValueSecon.length == 1 || ((DrawValueSecon[1]).indexOf("品牌市场") >= 0 && DrawValueSecon.length == 2) || (DrawValueSecon[0]).indexOf("全权限") >= 0)) {
                this.Thirdadmin = true;
                this.ThirdCode[0] = true;
                this.ThirdCode[1] = true;
                this.ThirdCode[2] = true;
                // PermissionArr.push('产值概览','欧康品质','母婴概览');
                PermissionArr.push('抖音快手', '欧康品质', '母婴概览');
              } else if (DrawValueSecon.length >= 3 && (DrawValueSecon[1]).indexOf("品牌市场") >= 0) {
                this.Thirdadmin = false;
                if ((DrawValueSecon[2]).indexOf("抖音快手") >= 0) {
                  this.ThirdCode[0] = true;
                  PermissionArr.push('抖音快手');
                } else if ((DrawValueSecon[2]).indexOf("欧康品质") >= 0) {
                  this.ThirdCode[1] = true;
                  PermissionArr.push('欧康品质');
                } else if ((DrawValueSecon[2]).indexOf("母婴概览") >= 0) {
                  this.ThirdCode[2] = true;
                  PermissionArr.push('母婴概览');
                }
              }
            }
          });
        }
        if (this.ThirdCode[0] == true && this.ThirdCode[1] == true && this.ThirdCode[2] == true) {
          this.Thirdadmin = true;
        } else {
          this.Thirdadmin = false;
        }
      } else if (setval == 3) {
        //仓储物流
        if (this.AdminRole == true) {
          this.Thirdadmin = true;
          this.ThirdCode[0] = true;
          this.ThirdCode[1] = true;
          this.ThirdCode[2] = true;
          PermissionArr.push('仓库吞吐', '承运时效', '发运成本');
        } else {
          Object.keys(this.permissionRoleList).forEach((key) => {
            DrawValueSecon = (this.permissionRoleList[key].name).split("-");
            if ((DrawValueSecon[0]).indexOf("仓储") >= 0 || (DrawValueSecon[0]).indexOf("全权限") >= 0) {
              if ((DrawValueSecon.length == 1 || ((DrawValueSecon[1]).indexOf("仓储物流") >= 0 && DrawValueSecon.length == 2) || (DrawValueSecon[0]).indexOf("全权限") >= 0)) {
                this.Thirdadmin = true;
                this.ThirdCode[0] = true;
                this.ThirdCode[1] = true;
                this.ThirdCode[2] = true;
                PermissionArr.push('仓库吞吐', '承运时效', '发运成本');
              } else if (DrawValueSecon.length >= 3 && (DrawValueSecon[1]).indexOf("仓储物流") >= 0) {
                this.Thirdadmin = false;
                if ((DrawValueSecon[2]).indexOf("仓库吞吐") >= 0) {
                  this.ThirdCode[0] = true;
                  PermissionArr.push('仓库吞吐');
                } else if ((DrawValueSecon[2]).indexOf("承运时效") >= 0) {
                  this.ThirdCode[1] = true;
                  PermissionArr.push('承运时效');
                } else if ((DrawValueSecon[2]).indexOf("发运成本") >= 0) {
                  this.ThirdCode[2] = true;
                  PermissionArr.push('发运成本');
                }
              }
            }
          });
        }
        if (this.ThirdCode[0] == true && this.ThirdCode[1] == true && this.ThirdCode[2] == true) {
          this.Thirdadmin = true;
        } else {
          this.Thirdadmin = false;
        }
      } else if (setval == 4) {
        //财务管理
        if (this.AdminRole == true) {
          this.Thirdadmin = true;
          this.ThirdCode[0] = true;
          this.ThirdCode[1] = true;
          this.ThirdCode[2] = true;
          PermissionArr.push('采购毛利', '退款费用', 'KA达成');
        } else {
          Object.keys(this.permissionRoleList).forEach((key) => {
            DrawValueSecon = (this.permissionRoleList[key].name).split("-");
            if ((DrawValueSecon[0]).indexOf("财务") >= 0 || (DrawValueSecon[0]).indexOf("全权限") >= 0) {
              if ((DrawValueSecon.length == 1 || ((DrawValueSecon[1]).indexOf("财务管理") >= 0 && DrawValueSecon.length == 2) || (DrawValueSecon[0]).indexOf("全权限") >= 0)) {
                this.Thirdadmin = true;
                this.ThirdCode[0] = true;
                this.ThirdCode[1] = true;
                this.ThirdCode[2] = true;
                PermissionArr.push('采购毛利', '退款费用', 'KA达成');
              } else if (DrawValueSecon.length >= 3 && (DrawValueSecon[1]).indexOf("财务管理") >= 0) {
                this.Thirdadmin = false;
                if ((DrawValueSecon[2]).indexOf("采购毛利") >= 0) {
                  this.ThirdCode[0] = true;
                  PermissionArr.push('采购毛利');
                } else if ((DrawValueSecon[2]).indexOf("退款费用") >= 0) {
                  this.ThirdCode[1] = true;
                  PermissionArr.push('退款费用');
                } else if ((DrawValueSecon[2]).indexOf("KA达成") >= 0) {
                  this.ThirdCode[2] = true;
                  PermissionArr.push('KA达成');
                }
              }
            }
          });
        }
        if (this.ThirdCode[0] == true && this.ThirdCode[1] == true && this.ThirdCode[2] == true) {
          this.Thirdadmin = true;
        } else {
          this.Thirdadmin = false;
        }
      }


      this.$store.commit("app/setPermissionArrList", PermissionArr); //store储存角色
    },
    // 权限函数结束

    // welcome函数开始

    beforeEnter: function (el) {
      el.style.opacity = 1;
      el.style.width = '16%';
    },
    enter: function (el, done) {

      // console.log("运行上的！！！！");
      // this.$velocity(el, { opacity: 0, width: '90%' }, { duration: 600, easing: "swing"})
      // this.$velocity(el, { opacity: 1,width: '16%' }, { duration: 300, easing: "swing"})
      // this.$velocity(el, { opacity: 0,width: '16%' }, { complete: done })
      // console.log(done);
      done();

    },
    afterEnter: function (el) {
      el.style.opacity = 1;
      el.style.display = 'none';
      this.welcome_show.title_cont = true;
    },
    leave: function (el, done) {
      this.$velocity(el, {opacity: 1, width: '16%'}, {complete: done})
    },


    beforeEnter2: function (el) {
      el.style.opacity = 0;
      el.style.width = '21%';
    },
    enter2: function (el, done) {
      this.$velocity(el, {opacity: 1, width: '21%'}, {duration: 600, easing: "swing"})
      done();
    },
    // afterEnter2: function (el) {
    //   // this.opacity_css.opacity2=1;
    //   // console.log("运行再这里！！！！")
    //   console.log(el);
    // },


    // beforeEnter3: function (el) {
    //   console.log(el);
    // },
    beforeEnter3: function (el) {
      el.style.opacity = 0;
      el.style.width = '30%';
    },
    enter3: function (el, done) {
      this.$velocity(el, {opacity: 1, width: '30%'}, {duration: 600, easing: "swing"})
      done();
    },
    // enter3: function (el, done) {
    //   // this.$velocity(el, { opacity: 1, width: '16%' }, { duration: 600, easing: "swing"})
    //   console.log(el);
    //   done();
    // },
    afterEnter3: function (el) {
      this.opacity_css.opacity2 = 1;
      // this.linshi_ms_fun();
      console.log(el);
    },


    beforeEnter4: function (el) {
      el.style.opacity = 0;
      // el.style.width = '0px';
      // el.style.height = '0px';
    },
    enter4: function (el, done) {
      // , width: '280px',height: '369px'
      this.$velocity(el, {opacity: 1}, {duration: 600, easing: "swing"})
      done();
    },

    linshi_ms_fun() {

      // let characters_h=this.$refs['linshi_ms'].offsetHeight;

      let _this = this;
      _this.welcome_characters = '';
      let j = 0;
      let set_characters = "林氏的水电煤";
      // return false;
      // console.log(this.welcome_characters.substring(0,1));
      // console.log(this.welcome_characters.substring(1,2));
      // this.welcome_characters='';
      // this.$refs['linshi_ms'].style.height='50px';

      // _this.$refs['linshi_ms'].style.height=0+'px';
      // console.log(characters_h);

      this.$refs['linshi_ms'].style.overflow = 'hidden';

      let test = setInterval(() => {
        // if((characters_h-j)==0){
        if (j == 6) {

          clearInterval(test);

        } else {
          _this.welcome_characters += (set_characters.substring(j, j + 1));
          j++;
          // _this.$refs['linshi_ms'].style.height=(j)+'px';
        }
      }, 250);

      // console.log(this.$refs['linshi_ms'].style);

    },


    welcome_img_fun() {
      let _this = this;
      // console.log(this.$refs["welcome_img"]);
      let images_info = document.createElement("img");
      console.log(images_info.height);
      setTimeout(function name() {
        _this.xian_yin_css = true;
      }, 100);
    },
    welcome_fun() {
      let _this = this;

      let promise1 = new Promise(function (resolve) {

        setTimeout(function name() {
          resolve();
        }, 3300);
      });
      promise1.then(() => {
        _this.opacity_css.opacity3 = 1;
        this.hasMarkedPromise.then((checked) => {
          this.$set(this.markedMap, 'guide_slides__v001', !checked)
          return checked
        }).then((checked) => {
          if (checked) {
            _this.sessionwelcome_set = true;
            _this.sessionannounce_set = true;
            this.$EventBus.$emit("entry_f", {
              Loading: true,
            });
          } else {
            setTimeout(() => {
              _this.sessionwelcome_set = true;
              _this.sessionannounce_set = true;
            }, 2000)
          }
        }).finally(() => {
        })
      });
    },
    // welcome函数结束


    router_change(value) {


      // let _this=this;
      let DefaultValue = '';
      let DefaultName = '';


      if (value == 'navpd_left') {

        this.chanpin_zhuti_qie_css.router_change_naset.change_left = true;
        this.chanpin_zhuti_qie_css.router_change_naset.change_right = false;
        if (this.Bottom_nav_pd.qudao) {
          // console.log("渠道！");
          // 二级导航栏的权限开始  如果不加会导致页面权限错乱
          this.SecondJurtionFun(1);
          DefaultValue = (this.ThirdCode[0] == true) ? '1' :
              (this.ThirdCode[1] == true) ? '2' : (this.ThirdCode[2] == true) ? '3' :
                  (this.ThirdCode[3] == true) ? '4' : (this.ThirdCode[4] == true) ? '5' : '1';
          DefaultName = (this.ThirdCode[0] == true) ? 'cpcy' :
              (this.ThirdCode[1] == true) ? 'ouk' : (this.ThirdCode[2] == true) ? 'muying' :
                  (this.ThirdCode[3] == true) ? 'pinzhi' : (this.ThirdCode[4] == true) ? 'kedanjia' : 'cpcy';
          // 二级导航栏的权限结束

          this.changeTab_new(1);
          this.router_change_nav(1);
        } else if (this.Bottom_nav_pd.chanpin) {
          // console.log("产品");
          // this.$router.push({
          //   path: "/product-market",
          // });
          // 二级导航栏的权限开始  如果不加会导致页面权限错乱
          this.SecondJurtionFun(2);
          DefaultValue = (this.ThirdCode[0] == true) ? '1' :
              (this.ThirdCode[1] == true) ? '2' : (this.ThirdCode[2] == true) ? '3' :
                  (this.ThirdCode[3] == true) ? '4' : (this.ThirdCode[4] == true) ? '5' : '1';
          DefaultName = (this.ThirdCode[0] == true) ? 'cpcy' :
              (this.ThirdCode[1] == true) ? 'ouk' : (this.ThirdCode[2] == true) ? 'muying' :
                  (this.ThirdCode[3] == true) ? 'pinzhi' : (this.ThirdCode[4] == true) ? 'kedanjia' : 'cpcy';
          // 二级导航栏的权限结束
          this.changeTab_new(2);
          this.router_change_nav(2);

        } else if (this.Bottom_nav_pd.cangchu) {
          // console.log("仓储");
          // 二级导航栏的权限开始  如果不加会导致页面权限错乱
          this.SecondJurtionFun(3);
          DefaultValue = (this.ThirdCode[0] == true) ? '1' :
              (this.ThirdCode[1] == true) ? '2' : (this.ThirdCode[2] == true) ? '3' :
                  (this.ThirdCode[3] == true) ? '4' : (this.ThirdCode[4] == true) ? '5' : '1';
          DefaultName = (this.ThirdCode[0] == true) ? 'cpcy' :
              (this.ThirdCode[1] == true) ? 'ouk' : (this.ThirdCode[2] == true) ? 'muying' :
                  (this.ThirdCode[3] == true) ? 'pinzhi' : (this.ThirdCode[4] == true) ? 'kedanjia' : 'cpcy';
          // 二级导航栏的权限结束
          this.changeTab_new(3);
          this.router_change_nav(3);
        } else if (this.Bottom_nav_pd.caiwu) {
          // console.log("财务");
          // 二级导航栏的权限开始  如果不加会导致页面权限错乱
          this.SecondJurtionFun(4);
          DefaultValue = (this.ThirdCode[0] == true) ? '1' :
              (this.ThirdCode[1] == true) ? '2' : (this.ThirdCode[2] == true) ? '3' :
                  (this.ThirdCode[3] == true) ? '4' : (this.ThirdCode[4] == true) ? '5' : '1';
          DefaultName = (this.ThirdCode[0] == true) ? 'cpcy' :
              (this.ThirdCode[1] == true) ? 'ouk' : (this.ThirdCode[2] == true) ? 'muying' :
                  (this.ThirdCode[3] == true) ? 'pinzhi' : (this.ThirdCode[4] == true) ? 'kedanjia' : 'cpcy';
          // 二级导航栏的权限结束
          this.changeTab_new(4);
          this.router_change_nav(4);
        }

        this.Range_Single_choice(DefaultName, '_this.sel_value.Range_on', true, '_this.sel_value.theme', DefaultValue)

      } else if (value == 'navpd_right') {

        this.chanpin_zhuti_qie_css.router_change_naset.change_left = false;
        this.chanpin_zhuti_qie_css.router_change_naset.change_right = true;
        if (this.Bottom_nav_pd.qudao) {
          console.log("渠道运营！");
          // 二级导航栏的权限开始  如果不加会导致页面权限错乱
          this.SecondJurtionFun(6);
          DefaultValue = (this.ThirdCode[0] == true) ? '1' :
              (this.ThirdCode[1] == true) ? '2' : (this.ThirdCode[2] == true) ? '3' :
                  (this.ThirdCode[3] == true) ? '4' : (this.ThirdCode[4] == true) ? '5' : '1';
          DefaultName = (this.ThirdCode[0] == true) ? 'cpcy' :
              (this.ThirdCode[1] == true) ? 'ouk' : (this.ThirdCode[2] == true) ? 'muying' :
                  (this.ThirdCode[3] == true) ? 'pinzhi' : (this.ThirdCode[4] == true) ? 'kedanjia' : 'cpcy';
          // 二级导航栏的权限结束

          this.changeTab_new(6);
          this.router_change_nav(6);
        } else if (this.Bottom_nav_pd.chanpin) {
          console.log("产品中心");
          // this.$router.push({
          //   path: "/product-supply",
          // });
          // 二级导航栏的权限开始  如果不加会导致页面权限错乱
          this.SecondJurtionFun(5);
          DefaultValue = (this.ThirdCode[0] == true) ? '1' :
              (this.ThirdCode[1] == true) ? '2' : (this.ThirdCode[2] == true) ? '3' :
                  (this.ThirdCode[3] == true) ? '4' : (this.ThirdCode[4] == true) ? '5' : '1';
          DefaultName = (this.ThirdCode[0] == true) ? 'cpcy' :
              (this.ThirdCode[1] == true) ? 'ouk' : (this.ThirdCode[2] == true) ? 'muying' :
                  (this.ThirdCode[3] == true) ? 'pinzhi' : (this.ThirdCode[4] == true) ? 'kedanjia' : 'cpcy';
          // 二级导航栏的权限结束
          this.changeTab_new(5);
          this.router_change_nav(5);
        }
        this.Range_Single_choice(DefaultName, '_this.sel_value.Range_on', true, '_this.sel_value.theme', DefaultValue)


      } else {

        // 二级导航栏的权限开始  如果不加会导致页面权限错乱
        this.SecondJurtionFun(value);
        DefaultValue = (this.ThirdCode[0] == true) ? '1' :
            (this.ThirdCode[1] == true) ? '2' : (this.ThirdCode[2] == true) ? '3' :
                (this.ThirdCode[3] == true) ? '4' : (this.ThirdCode[4] == true) ? '5' : '1';
        DefaultName = (this.ThirdCode[0] == true) ? 'cpcy' :
            (this.ThirdCode[1] == true) ? 'ouk' : (this.ThirdCode[2] == true) ? 'muying' :
                (this.ThirdCode[3] == true) ? 'pinzhi' : (this.ThirdCode[4] == true) ? 'kedanjia' : 'cpcy';
        // 二级导航栏的权限结束


        if (value == 1 || value == 2 || value == 5 || value == 6 || value == 3 || value == 4) {
          this.Bottom_nav_css.show_title = true;
          this.Bottom_nav_css.show_index = true;
          this.Bottom_nav_css.show_secon = true;
          this.router_change_nav(value);
          this.Single_choice(DefaultName, '', true, '_this.sel_value.theme');
        } else if (value == 0) {
          this.Bottom_nav_css.show_title = true;
          this.Bottom_nav_css.show_index = false;
          this.Bottom_nav_css.show_secon = false;
        } else if (value == 33 || value == 44) {
          // ||value==3||value==4
          console.log("========导航栏的物流主题！！！！！==============");
          console.log(value);
          this.Bottom_nav_css.show_title = false;
          this.Bottom_nav_css.show_index = true;

          this.Bottom_nav_css.show_secon = false;

          this.router_change_nav(value);
        } else {
          this.Bottom_nav_css.show_title = false;
          this.Bottom_nav_css.show_index = true;
        }


        if (value == 5 || value == 6) {
          // 重置顶部切换栏的样式
          this.chanpin_zhuti_qie.chanpin_pd = '2';
        } else {
          this.chanpin_zhuti_qie.chanpin_pd = '1';
        }

        this.Range_Single_choice(DefaultName, '_this.sel_value.Range_on', true, '_this.sel_value.theme', DefaultValue);
        // this.Range_Single_choice('ouk','_this.sel_value.Range_on',true,'_this.sel_value.theme','2');

      }


    },
    // 跳转页的导航栏展示
    JumpRouter(value) {
      if (value == 'navpd_left') {
        this.chanpin_zhuti_qie_css.router_change_naset.change_left = true;
        this.chanpin_zhuti_qie_css.router_change_naset.change_right = false;
      } else if (value == 'navpd_right') {
        this.chanpin_zhuti_qie_css.router_change_naset.change_left = false;
        this.chanpin_zhuti_qie_css.router_change_naset.change_right = true;
      } else {
        if (value == 1 || value == 2 || value == 5 || value == 6 || value == 3 || value == 4) {
          this.Bottom_nav_css.show_title = true;
          this.Bottom_nav_css.show_index = true;
          this.Bottom_nav_css.show_secon = true;
        } else if (value == 0) {
          this.Bottom_nav_css.show_title = true;
          this.Bottom_nav_css.show_index = false;
          this.Bottom_nav_css.show_secon = false;
        } else if (value == 33 || value == 44) {
          // ||value==3||value==4
          this.Bottom_nav_css.show_title = false;
          this.Bottom_nav_css.show_index = true;
          this.Bottom_nav_css.show_secon = false;
        } else {
          this.Bottom_nav_css.show_title = false;
          this.Bottom_nav_css.show_index = true;
        }
        if (value == 5 || value == 6) {
          // 重置顶部切换栏的样式
          this.chanpin_zhuti_qie.chanpin_pd = '2';
        } else {
          this.chanpin_zhuti_qie.chanpin_pd = '1';
        }
      }
    },

    router_change_nav(value) {

      // console.log("=======文字的变化！！========");
      // console.log(value);
      // let set_value_wz="";


      if (value == 1) {
        this.chanpin_zhuti_qie_css.chanpin_wenzi.title_left = "渠道业绩";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.title_right = "渠道运营";

        // this.chanpin_zhuti_qie_css.chanpin_wenzi.title_level1="实时业绩";
        // this.chanpin_zhuti_qie_css.chanpin_wenzi.title_level2="业绩达成";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.title_level1 = "业绩达成";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.title_level2 = "实时业绩";

        this.chanpin_zhuti_qie_css.chanpin_wenzi.title_level3 = "订单状态";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.set_value_wz = "Salechan_choice_sales";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.nva_pd_num = "3";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.nva_pd_num_special = false;

      } else if (value == 5) {
        this.chanpin_zhuti_qie_css.chanpin_wenzi.title_left = "产品中心";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.title_right = "品牌市场";
        // this.chanpin_zhuti_qie_css.chanpin_wenzi.title_level1="产值概览";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.title_level1 = "抖音快手";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.title_level2 = "欧康品质";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.title_level3 = "母婴概览";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.set_value_wz = "Salechan_choice_ProMark";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.nva_pd_num = "3";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.nva_pd_num_special = false;

      } else if (value == 2) {
        this.chanpin_zhuti_qie_css.chanpin_wenzi.title_left = "产品中心";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.title_right = "品牌市场";
        // this.chanpin_zhuti_qie_css.chanpin_wenzi.title_level1="SKU均值";
        // this.chanpin_zhuti_qie_css.chanpin_wenzi.title_level2="客单";

        this.chanpin_zhuti_qie_css.chanpin_wenzi.title_level1 = "新品";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.title_level2 = "SKU均值";

        this.chanpin_zhuti_qie_css.chanpin_wenzi.title_level3 = "欠货";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.title_level4 = "品质";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.title_level5 = "库存";

        this.chanpin_zhuti_qie_css.chanpin_wenzi.set_value_wz = "Salechan_choice_suppy";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.nva_pd_num = "5";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.nva_pd_num_special = false;

      } else if (value == 6) {
        this.chanpin_zhuti_qie_css.chanpin_wenzi.title_left = "渠道业绩";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.title_right = "渠道运营";
        // 原来的
        // this.chanpin_zhuti_qie_css.chanpin_wenzi.title_level1="流量分析";
        // this.chanpin_zhuti_qie_css.chanpin_wenzi.title_level2="未发取消";

        // this.chanpin_zhuti_qie_css.chanpin_wenzi.title_level1="推广引流";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.title_level1 = "付费推广";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.title_level2 = "流量分析";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.title_level3 = "客单价";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.title_level4 = "未发取消";

        this.chanpin_zhuti_qie_css.chanpin_wenzi.set_value_wz = "Salechan_choice_marketop";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.nva_pd_num = "4";
        // this.chanpin_zhuti_qie_css.chanpin_wenzi.nva_pd_num_special=true;  //原来的
        this.chanpin_zhuti_qie_css.chanpin_wenzi.nva_pd_num_special = false;

      } else if (value == 3) {
        this.chanpin_zhuti_qie_css.chanpin_wenzi.title_left = "仓储物流";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.title_right = "11";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.title_level1 = "仓库吞吐";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.title_level2 = "承运时效";
        // this.chanpin_zhuti_qie_css.chanpin_wenzi.title_level3="物流三包成本";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.title_level3 = "发运成本";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.set_value_wz = "Salechan_choice_logistics";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.nva_pd_num = "3";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.nva_pd_num_special = false;

      } else if (value == 4) {
        this.chanpin_zhuti_qie_css.chanpin_wenzi.title_left = "财务管理";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.title_right = "11";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.title_level1 = "采购毛利";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.title_level2 = "退款费用";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.title_level3 = "KA达成";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.set_value_wz = "Salechan_choice_financial";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.nva_pd_num = "3";
        this.chanpin_zhuti_qie_css.chanpin_wenzi.nva_pd_num_special = false;

      }

      // console.log(this.chanpin_zhuti_qie_css.chanpin_wenzi.set_value_wz);
      this.SecondJurtionFun(value);

    },


    changeTab(index) {

      this.currentTabIndex = index;
      this.nav_theme.index = index;
      this.$refs["mySwiper"].$swiper.slideTo(index);
      this.$refs['mySwiper2'].$swiper.slideTo(index)
    },

    changeTab_new(index) {


      this.currentTabIndex = index;
      this.nav_theme.index = index;
      // this.$refs["mySwiper"].$swiper.slideTo(index);
      console.log("========变化的=========");
      console.log(index);
      // let set_on_index=0;
      // if(index==0){
      //   set_on_index=0;
      // }else if(index==4){
      //   set_on_index=1;
      // }else if(index==1){
      //   set_on_index=2;
      // }else if(index==5){
      //   set_on_index=3;
      // }else if(index==6){
      //   set_on_index=4;
      // }
      this.$refs['mySwiper2'].$swiper.slideTo(index)
    },

    changeTab_new_2(index) {

      this.currentTabIndex = index;
      this.nav_theme.index = index;
      // this.$refs["mySwiper"].$swiper.slideTo(index);


      this.$refs['mySwiper2'].$swiper.slideTo(index)
    },


    // 滚动判断开始
    gundong(index) {
      const entryImgHeight = this.$refs["entryImg"].clientHeight; //获取图片的高度

      this.nav_theme.index = index;
      let _this = this;

      if (this.nav_theme.index == 1) {
        window.onscroll = function () {
          // console.log("====111tests==");
          var scrollTop =
              document.documentElement.scrollTop || document.body.scrollTop;
          if (_this.nav_theme.index == 1 && scrollTop > entryImgHeight) {
            // _this.nav_theme.show = true;
            // _this.$EventBus.$emit("nav_theme_show", {
            //   show: true,
            // });
          } else {
            // _this.nav_theme.show = false;
            // _this.$EventBus.$emit("nav_theme_show", {
            //   show: false,
            // });
          }

          //变量scrollTop是滚动条滚动时，距离顶部的距离
          //var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
          //变量windowHeight是可视区的高度
          var windowHeight =
              document.documentElement.clientHeight || document.body.clientHeight;
          //变量scrollHeight是滚动条的总高度
          var scrollHeight =
              document.documentElement.scrollHeight || document.body.scrollHeight;
          //滚动条到底部的条件
          if (
              _this.nav_theme.index == 1 &&
              scrollTop + windowHeight == scrollHeight
          ) {
            //到了这个就可以进行业务逻辑加载后台数据了
            // _this.footerText = '我是有底线的';
            _this.nav_theme.nav_all_show = false;
          } else if (_this.nav_theme.index == 1 && scrollTop <= 0) {
            _this.nav_theme.nav_all_show = false;
          } else {
            _this.nav_theme.nav_all_show = false;
            // _this.$EventBus.$emit("test_value_hua",{
            //     test_value_hua:2
            // })
          }
        };
      }
    },

    // 滚动判断结束


    //最新主题切换开始
    Range_Single_choice(
        value,
        josn_value,
        target_value,
        for_value,
        number_value
    ) {
      var _this = this;
      _this.show; //意义不大 防止定义不调用出现的报错
      for_value = eval(for_value);
      // let pd_num=0;

      Object.keys(for_value).forEach((key) => {
        if (key == value) {
          for_value[key] = target_value;
        } else {
          for_value[key] = false;
        }
      });


      if (josn_value) {

        this.$EventBus.$emit(this.chanpin_zhuti_qie_css.chanpin_wenzi.set_value_wz, {
          Range_value_set: number_value
        });

        josn_value = eval(josn_value);
        Object.keys(josn_value).forEach((key_fun) => {
          josn_value[key_fun] = number_value;
        });
      }

    },


    // 最新主题切换结束


    // 切换单点开始
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
    // 切换单点结束

    // 改变初始化值开始
    Initialization_fun() {
      this.Initialization_nav.val = false;
    },
    // 改变初始化值结束


    // 判断是否iphonex开始
    isIPhoneX() {
      var u = navigator.userAgent;
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      var model_wh = [{height: 812, width: 375}, {height: 896, width: 414}, {height: 844, width: 390}, {
        height: 926,
        width: 428
      }, {height: 780, width: 360}];
      if (isIOS) {
        if ((screen.height == model_wh[0].height && screen.width == model_wh[0].width) ||
            (screen.height == model_wh[1].height && screen.width == model_wh[1].width) ||
            (screen.height == model_wh[2].height && screen.width == model_wh[2].width) ||
            (screen.height == model_wh[3].height && screen.width == model_wh[3].width) ||
            (screen.height == model_wh[4].height && screen.width == model_wh[4].width)
        ) {
          //是iphoneX
          // console.log("是iphoneX");
          return true;
        } else {
          //不是iphoneX
          // console.log("否");
          return false;
        }
      }

    },
    // 判断是否iphonex结束

    EventBusOffFun() {
      console.log("layout 生命周期结束！！");
      this.$EventBus.$off("data_loay_set");
      this.$EventBus.$off("Salechan_choice_supply_Callback");
      this.$EventBus.$off("Salechan_choice_sales_Callback");
      this.$EventBus.$off("Salechan_choice_ProMark_Callback");
      this.$EventBus.$off("Salechan_choice_logistics_Callback");
      this.$EventBus.$off("Salechan_choice_financial_Callback");
      this.$EventBus.$off("JumpToPage_all");
      this.$EventBus.$off("JumpToPage_tag");

    }

  },


  beforeDestroy() {
    this.$EventBus.$off("data_loay_set");
    this.$EventBus.$off("Salechan_choice_supply_Callback");
    this.$EventBus.$off("Salechan_choice_sales_Callback");
    this.$EventBus.$off("Salechan_choice_ProMark_Callback");

    this.$EventBus.$off("Salechan_choice_logistics_Callback");
    this.$EventBus.$off("Salechan_choice_financial_Callback");
    this.$EventBus.$off("JumpToPage_all");
    this.$EventBus.$off("JumpToPage_tag");

  },


};
</script>

<style lang="scss" scoped>

.bg_css {
  background: url("~@/assets/images/welcome/welcome_bg.png") no-repeat left top/cover;

  background-size: 100% auto;

  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  //   width: 100%;
  //   height: 100%;
}

.bg_css_con {
  background: url("~@/assets/images/welcome/welcome_wz.png") no-repeat left top/cover;

  background-size: 50% auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
}


.entry-img {
  width: 100%;
  padding-top: 23.5%;
  background: url("~@/assets/images/entry-img.jpg") no-repeat left top/cover;
}

.nav-wrapper {
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 99;
}

.tab-title {
  position: relative;
  font-size: 13px;
  text-align: center;
  line-height: 40px;

  &.active {
    font-size: 15px;
    // color: #00b38b;
    color: #03bacc;
    font-weight: bold;

    &:after {
      position: absolute;
      content: "";
      left: 50%;
      width: 30%;
      transform: translateX(-50%);
      height: 2px;
      // background-color: #00b38b;
      background-color: #03bacc;
      bottom: 5px;
    }
  }
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


.Productmarket_title .van-row .van-col--5 {
  width: 20%;
}


.Bottom_nav {
  width: 100%;
  // height: 50px;
  // height: 15vw;

  position: fixed;
  bottom: 0px;

  // height:constant(safe-area-inset-bottom);
  height: calc(50px)+constant(safe-area-inset-bottom);
  height: calc(50px)+env(safe-area-inset-bottom);


  background: #ffffff;
  z-index: 99;
  border-top: 1px solid #EEEEEE;

  // height:constant(safe-area-inset-bottom);
  // margin-bottom: constant(safe-area-inset-bottom);
  // padding-bottom: env(safe-area-inset-bottom);

}

.Bottom_nav_ul li {
  float: left;
  width: 20%;
  // padding-top: 5px;
  padding-top: 0px;

}

.Bottom_nav_ul li span {
  // background: url("~@/assets/images/icon/num9.png") no-repeat left top/cover;
  width: 18px;
  height: 18px;
  display: block;
  margin: 0 auto;
  overflow: hidden;
}

.Bottom_nav_ul li span i {
  // background: url("~@/assets/images/icon/num9.png") no-repeat left top/cover;
  width: 18px;
  height: 18px;
  display: block;

}

.Bottom_nav_ul li p {
  padding-top: 5px;
  margin: 0 auto;
  font-size: 12px;
  text-align: center;
  color: #999999;


}

.Bottom_nav_ul li span .icon_css1 {
  background: url("~@/assets/images/icon/num9.png") no-repeat left top/cover;

}

.Bottom_nav_ul li span .icon_css2 {
  background: url("~@/assets/images/icon/num12.png") no-repeat left top/cover;
}

.Bottom_nav_ul li span .icon_css3 {
  background: url("~@/assets/images/icon/num13.png") no-repeat left top/cover;
}

.Bottom_nav_ul li span .icon_css4 {
  background: url("~@/assets/images/icon/num11.png") no-repeat left top/cover;
}

.Bottom_nav_ul li span .icon_css5 {
  background: url("~@/assets/images/icon/num14.png") no-repeat left top/cover;
}


.Bottom_nav_ul li span .icon_css1_change {
  background: url("~@/assets/images/icon/num9_s.png") no-repeat left top/cover;
  content: '';
  display: block;

  transition: all 0.3s ease 0s;
  // margin-left: -21px;
  // filter: drop-shadow(21px 0 0 #4187F1); //需要修改的颜色值
}

.Bottom_nav_ul li span .icon_css2_change {
  background: url("~@/assets/images/icon/num12_s.png") no-repeat left top/cover;
  content: '';
  display: block;

  transition: all 0.3s ease 0s;
  // margin-left: -21px;
  // filter: drop-shadow(21px 0 0 #4187F1); //需要修改的颜色值
}

.Bottom_nav_ul li span .icon_css3_change {
  background: url("~@/assets/images/icon/num13_s.png") no-repeat left top/cover;
  content: '';
  display: block;

  transition: all 0.3s ease 0s;
  // margin-left: -21px;
  // filter: drop-shadow(21px 0 0 #4187F1); //需要修改的颜色值
}

.Bottom_nav_ul li span .icon_css4_change {
  background: url("~@/assets/images/icon/num11_s.png") no-repeat left top/cover;
  content: '';
  display: block;

  transition: all 0.3s ease 0s;
  // margin-left: -21px;
  // filter: drop-shadow(21px 0 0 #4187F1); //需要修改的颜色值
}

.Bottom_nav_ul li span .icon_css5_change {
  background: url("~@/assets/images/icon/num14_s.png") no-repeat left top/cover;
  content: '';
  display: block;

  transition: all 0.3s ease 0s;
  // margin-left: -21px;
  // filter: drop-shadow(21px 0 0 #4187F1); //需要修改的颜色值
}


.title_all_css {

  display: inline-block;
  width: 100%;
  height: 60px;
  // background-image: linear-gradient(#2AA5F8, #1678FF);
  // background-image: linear-gradient(#03bacc, #03bacc);
  background-image: linear-gradient(#23B0A8, #23B0A8);

  background-blend-mode: lighten;
  background-size: cover;

}

.title_all_css_erji {
  display: inline-block;
  width: 100%;
  height: 60px;
  // background-image: linear-gradient(#2aa5f8, #1678FF);
  // background-image: linear-gradient(#1678ff, #1678ff);
  // background-image: linear-gradient(#00586D, #00586D);
  // background-image: linear-gradient(#159B80, #159B80);
  // background-image: linear-gradient(#03bacc, #03bacc);
  background-image: linear-gradient(#23B0A8, #23B0A8);
  background-blend-mode: lighten;
  background-size: cover;
}

.select_title_css {
  position: relative;
  font-size: 14px;
  text-align: center;
  line-height: 25px;

  &.active {
    font-size: 14px;
    // color: #1678ff;
    // color: #159B80;
    // color: #03bacc;
    color: #23B0A8;
    font-weight: bold;

    &:after {
      position: absolute;
      content: "";
      left: 50%;
      width: 30%;
      transform: translateX(-50%);
      height: 2px;
      // background-color: #1678ff;
      // background-color: #159B80;
      // background-color: #03bacc;
      background-color: #23B0A8;
      bottom: -3px;
    }
  }
}


.linshi_css {
  // font-size: 33px;
  transition: opacity 5s ease;
}


#animat {
  // ease 播放一次
  // infinite 一直播放
  position: relative;
  animation: mymove 4s ease;
  -webkit-animation: mymove 4s ease; /*Safari and Chrome*/
  // animation-direction:alternate;/*轮流反向播放动画。*/
  animation-timing-function: ease-in-out; /*动画的速度曲线*/
  /* Safari 和 Chrome */
  // -webkit-animation:mymove 5s infinite;
  // -webkit-animation-direction:alternate;/*轮流反向播放动画。*/
  -webkit-animation-timing-function: ease-in-out; /*动画的速度曲线*/
}

@keyframes mymove {
  0% {
    transform: scale(0); /*开始为原始大小*/
  }
  25% {
    transform: scale(1); /*放大1.1倍*/
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1);
  }
}

@-webkit-keyframes mymove /*Safari and Chrome*/
{
  0% {
    transform: scale(0); /*开始为原始大小*/
  }
  25% {
    transform: scale(1); /*放大1.1倍*/
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1);
  }
}


/deep/ .van-overlay {
  z-index: 100;
}

.wrapper_over {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  transition: opacity 5s ease;
}

.block_over {

  background: url("~@/assets/images/welcome/bulb_bg.png") no-repeat left top/cover;


  font-size: 14px;
  width: 280px;
  height: 369px;

  // border-radius: 10px;
}

.block_over_bg {
  // background-color: #fff;
}

.block_over_content {
  // height: 279px;
  height: 334px;
  // background-color: #fff;
  width: 233px;
  border-radius: 10px;
  margin-left: 20px;
  margin-top: 25px;

  background-image: linear-gradient(#ffffff, #ffffff, #E6FFE5);
  background-blend-mode: lighten;
  background-size: cover;
}

.block_over_bottom {
  background: url("~@/assets/images/welcome/bulb_bottom.png") no-repeat left top/cover;
  // margin-top: 0px;
  margin-top: -80px;
  margin-left: -2px;

  width: 277px;
  height: 90px;
  // margin: 0 auto;
}

.block_over_bulb {
  background: url("~@/assets/images/welcome/bulb.png") no-repeat left top/cover;
  // width: 60px;
  // height: 60px;
  // float: right;
  // margin-top: -16px;
  // margin-right: -25px;

  width: 50px;
  height: 50px;
  float: right;
  margin-top: -19px;
  margin-right: -10px;


}

.block_over_css {
  padding-top: 0px;
  padding-bottom: 10px;

}

.block_over_css p {
  font-size: 12px;
  margin: 0 auto;
  color: #666666;
  line-height: 23px;
  padding-left: 10px;
  padding-right: 10px;
}

.block_over_css p span i {
  opacity: 0;
}

.block_over_bom {
  width: 100%;
  padding-top: 45px;
}

.block_over_bom_cont {
  width: 150px;
  text-align: center;
  background-image: linear-gradient(#ffffff, #8AE3DF);
  margin: 0 auto;
  padding: 8px;
  border-radius: 50px;
}

.block_over_bom_cont span {
  color: #23B0A8;

}


.lanren1, .lanren2, .lanren3, .lanren4, .lanren5 {
  // animation: shake 0.82s cubic-bezier(.36, .07, .19, .97) both;
  // -webkit-animation:shake 0.82s cubic-bezier(.36, .07, .19, .97) both; /*Safari and Chrome*/
  animation: shake 0.30s cubic-bezier(0.125, 0.075, 0.075, 0.075) both;
  -webkit-animation: shake 0.30s cubic-bezier(0.075, 0.075, 0.075, 0.075) both; /*Safari and Chrome*/
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {

  10%, 50%, 70% {
    transform: translate3d(-1px, 0, 0,);
  }
  20%, 60%, 80% {
    transform: translate3d(2px, 0, 0,);
  }
}

@-webkit-keyframes shake {

  10%, 50%, 70% {
    transform: translate3d(-1px, 0, 0,);
  }
  20%, 60%, 80% {
    transform: translate3d(2px, 0, 0,);
  }
}


.lanren1_newn {
  background: url("~@/assets/images/icon/icon1/icon1_index.png") no-repeat left top/cover;
}

.lanren1_new_init {
  background: url("~@/assets/images/icon/icon1/icon1_00023.png") no-repeat left top/cover;
}

.lanren1_new {
  background: url("~@/assets/images/icon/icon1/icon1_00023.png") no-repeat left top/cover;
  // animation: shakenew 1s steps(1,end) both infinite;
  // animation: shakenew 333ms steps(2) both infinite;
  animation: shakenew 0.5s steps(21) both;
}

@keyframes shakenew {
  0% {
    background: url("~@/assets/images/icon/icon1/icon1_00000.png") no-repeat left top/cover;
  }
  5% {
    background: url("~@/assets/images/icon/icon1/icon1_00001.png") no-repeat left top/cover;
  }
  10% {
    background: url("~@/assets/images/icon/icon1/icon1_00002.png") no-repeat left top/cover;
  }
  15% {
    background: url("~@/assets/images/icon/icon1/icon1_00003.png") no-repeat left top/cover;
  }
  20% {
    background: url("~@/assets/images/icon/icon1/icon1_00004.png") no-repeat left top/cover;
  }
  25% {
    background: url("~@/assets/images/icon/icon1/icon1_00005.png") no-repeat left top/cover;
  }
  30% {
    background: url("~@/assets/images/icon/icon1/icon1_00006.png") no-repeat left top/cover;
  }
  35% {
    background: url("~@/assets/images/icon/icon1/icon1_00007.png") no-repeat left top/cover;
  }
  40% {
    background: url("~@/assets/images/icon/icon1/icon1_00008.png") no-repeat left top/cover;
    background-position: 0px -3px;
  }
  45% {
    background: url("~@/assets/images/icon/icon1/icon1_00009.png") no-repeat left top/cover;
    background-position: 0px -3px;
  }
  50% {
    background: url("~@/assets/images/icon/icon1/icon1_00010.png") no-repeat left top/cover;
    background-position: 0px -3px;
  }
  55% {
    background: url("~@/assets/images/icon/icon1/icon1_00011.png") no-repeat left top/cover;
    background-position: 0px -3px;
  }
  60% {
    background: url("~@/assets/images/icon/icon1/icon1_00012.png") no-repeat left top/cover;
    background-position: 0px -3px;
  }
  65% {
    background: url("~@/assets/images/icon/icon1/icon1_00013.png") no-repeat left top/cover;
    background-position: 0px -3px;
  }
  70% {
    background: url("~@/assets/images/icon/icon1/icon1_00014.png") no-repeat left top/cover;
    background-position: 0px -3px;
  }
  75% {
    background: url("~@/assets/images/icon/icon1/icon1_00015.png") no-repeat left top/cover;
    background-position: 0px -3px;
  }
  80% {
    background: url("~@/assets/images/icon/icon1/icon1_00017.png") no-repeat left top/cover;
    background-position: 0px -3px;
  }
  85% {
    background: url("~@/assets/images/icon/icon1/icon1_00018.png") no-repeat left top/cover;
    background-position: 0px -3px;
  }
  90% {
    background: url("~@/assets/images/icon/icon1/icon1_00019.png") no-repeat left top/cover;
    background-position: 0px -3px;
  }
  95% {
    background: url("~@/assets/images/icon/icon1/icon1_00020.png") no-repeat left top/cover;
    background-position: 0px -3px;
  }
  100% {
    background: url("~@/assets/images/icon/icon1/icon1_00023.png") no-repeat left top/cover;
    background-position: 0px -3px;
  }
}


.lanren2_newn {
  background: url("~@/assets/images/icon/icon2/icon2_00000.png") no-repeat left top/cover;
}

.lanren2_new {
  background: url("~@/assets/images/icon/icon2/icon2_00023.png") no-repeat left top/cover;
  animation: shakenew2 0.5s steps(21) both;
}

@keyframes shakenew2 {
  0% {
    background: url("~@/assets/images/icon/icon2/icon2_00000.png") no-repeat left top/cover;
  }
  5% {
    background: url("~@/assets/images/icon/icon2/icon2_00001.png") no-repeat left top/cover;
  }
  10% {
    background: url("~@/assets/images/icon/icon2/icon2_00002.png") no-repeat left top/cover;
  }
  15% {
    background: url("~@/assets/images/icon/icon2/icon2_00003.png") no-repeat left top/cover;
  }
  20% {
    background: url("~@/assets/images/icon/icon2/icon2_00004.png") no-repeat left top/cover;
  }
  25% {
    background: url("~@/assets/images/icon/icon2/icon2_00005.png") no-repeat left top/cover;
  }
  30% {
    background: url("~@/assets/images/icon/icon2/icon2_00006.png") no-repeat left top/cover;
  }
  35% {
    background: url("~@/assets/images/icon/icon2/icon2_00007.png") no-repeat left top/cover;
  }
  40% {
    background: url("~@/assets/images/icon/icon2/icon2_00008.png") no-repeat left top/cover;
  }
  45% {
    background: url("~@/assets/images/icon/icon2/icon2_00009.png") no-repeat left top/cover;
  }
  50% {
    background: url("~@/assets/images/icon/icon2/icon2_00010.png") no-repeat left top/cover;
  }
  55% {
    background: url("~@/assets/images/icon/icon2/icon2_00011.png") no-repeat left top/cover;
  }
  60% {
    background: url("~@/assets/images/icon/icon2/icon2_00012.png") no-repeat left top/cover;
  }
  65% {
    background: url("~@/assets/images/icon/icon2/icon2_00013.png") no-repeat left top/cover;
  }
  70% {
    background: url("~@/assets/images/icon/icon2/icon2_00014.png") no-repeat left top/cover;
  }
  75% {
    background: url("~@/assets/images/icon/icon2/icon2_00015.png") no-repeat left top/cover;
  }
  80% {
    background: url("~@/assets/images/icon/icon2/icon2_00017.png") no-repeat left top/cover;
  }
  85% {
    background: url("~@/assets/images/icon/icon2/icon2_00018.png") no-repeat left top/cover;
  }
  90% {
    background: url("~@/assets/images/icon/icon2/icon2_00019.png") no-repeat left top/cover;
  }
  95% {
    background: url("~@/assets/images/icon/icon2/icon2_00020.png") no-repeat left top/cover;
  }
  100% {
    background: url("~@/assets/images/icon/icon2/icon2_00023.png") no-repeat left top/cover;
  }
}


.lanren3_newn {
  background: url("~@/assets/images/icon/icon3/icon3_00000.png") no-repeat left top/cover;
}

.lanren3_new {
  background: url("~@/assets/images/icon/icon3/icon3_00023.png") no-repeat left top/cover;
  animation: shakenew3 0.5s steps(21) both;
}

@keyframes shakenew3 {
  0% {
    background: url("~@/assets/images/icon/icon3/icon3_00000.png") no-repeat left top/cover;
  }
  5% {
    background: url("~@/assets/images/icon/icon3/icon3_00001.png") no-repeat left top/cover;
  }
  10% {
    background: url("~@/assets/images/icon/icon3/icon3_00002.png") no-repeat left top/cover;
  }
  15% {
    background: url("~@/assets/images/icon/icon3/icon3_00003.png") no-repeat left top/cover;
  }
  20% {
    background: url("~@/assets/images/icon/icon3/icon3_00004.png") no-repeat left top/cover;
  }
  25% {
    background: url("~@/assets/images/icon/icon3/icon3_00005.png") no-repeat left top/cover;
  }
  30% {
    background: url("~@/assets/images/icon/icon3/icon3_00006.png") no-repeat left top/cover;
  }
  35% {
    background: url("~@/assets/images/icon/icon3/icon3_00007.png") no-repeat left top/cover;
  }
  40% {
    background: url("~@/assets/images/icon/icon3/icon3_00008.png") no-repeat left top/cover;
  }
  45% {
    background: url("~@/assets/images/icon/icon3/icon3_00009.png") no-repeat left top/cover;
  }
  50% {
    background: url("~@/assets/images/icon/icon3/icon3_00010.png") no-repeat left top/cover;
  }
  55% {
    background: url("~@/assets/images/icon/icon3/icon3_00011.png") no-repeat left top/cover;
  }
  60% {
    background: url("~@/assets/images/icon/icon3/icon3_00012.png") no-repeat left top/cover;
  }
  65% {
    background: url("~@/assets/images/icon/icon3/icon3_00013.png") no-repeat left top/cover;
  }
  70% {
    background: url("~@/assets/images/icon/icon3/icon3_00014.png") no-repeat left top/cover;
  }
  75% {
    background: url("~@/assets/images/icon/icon3/icon3_00015.png") no-repeat left top/cover;
  }
  80% {
    background: url("~@/assets/images/icon/icon3/icon3_00017.png") no-repeat left top/cover;
  }
  85% {
    background: url("~@/assets/images/icon/icon3/icon3_00018.png") no-repeat left top/cover;
  }
  90% {
    background: url("~@/assets/images/icon/icon3/icon3_00019.png") no-repeat left top/cover;
  }
  95% {
    background: url("~@/assets/images/icon/icon3/icon3_00020.png") no-repeat left top/cover;
  }
  100% {
    background: url("~@/assets/images/icon/icon3/icon3_00023.png") no-repeat left top/cover;
  }
}

.lanren4_newn {
  background: url("~@/assets/images/icon/icon4/icon4_00000.png") no-repeat left top/cover;
}

.lanren4_new {
  background: url("~@/assets/images/icon/icon4/icon4_00023.png") no-repeat left top/cover;
  animation: shakenew4 0.5s steps(21) both;
}

@keyframes shakenew4 {
  0% {
    background: url("~@/assets/images/icon/icon4/icon4_00000.png") no-repeat left top/cover;
  }
  5% {
    background: url("~@/assets/images/icon/icon4/icon4_00001.png") no-repeat left top/cover;
  }
  10% {
    background: url("~@/assets/images/icon/icon4/icon4_00002.png") no-repeat left top/cover;
  }
  15% {
    background: url("~@/assets/images/icon/icon4/icon4_00003.png") no-repeat left top/cover;
  }
  20% {
    background: url("~@/assets/images/icon/icon4/icon4_00004.png") no-repeat left top/cover;
  }
  25% {
    background: url("~@/assets/images/icon/icon4/icon4_00005.png") no-repeat left top/cover;
  }
  30% {
    background: url("~@/assets/images/icon/icon4/icon4_00006.png") no-repeat left top/cover;
  }
  35% {
    background: url("~@/assets/images/icon/icon4/icon4_00007.png") no-repeat left top/cover;
  }
  40% {
    background: url("~@/assets/images/icon/icon4/icon4_00008.png") no-repeat left top/cover;
  }
  45% {
    background: url("~@/assets/images/icon/icon4/icon4_00009.png") no-repeat left top/cover;
  }
  50% {
    background: url("~@/assets/images/icon/icon4/icon4_00010.png") no-repeat left top/cover;
  }
  55% {
    background: url("~@/assets/images/icon/icon4/icon4_00011.png") no-repeat left top/cover;
  }
  60% {
    background: url("~@/assets/images/icon/icon4/icon4_00012.png") no-repeat left top/cover;
  }
  65% {
    background: url("~@/assets/images/icon/icon4/icon4_00013.png") no-repeat left top/cover;
  }
  70% {
    background: url("~@/assets/images/icon/icon4/icon4_00014.png") no-repeat left top/cover;
  }
  75% {
    background: url("~@/assets/images/icon/icon4/icon4_00015.png") no-repeat left top/cover;
  }
  80% {
    background: url("~@/assets/images/icon/icon4/icon4_00017.png") no-repeat left top/cover;
  }
  85% {
    background: url("~@/assets/images/icon/icon4/icon4_00018.png") no-repeat left top/cover;
  }
  90% {
    background: url("~@/assets/images/icon/icon4/icon4_00019.png") no-repeat left top/cover;
  }
  95% {
    background: url("~@/assets/images/icon/icon4/icon4_00020.png") no-repeat left top/cover;
  }
  100% {
    background: url("~@/assets/images/icon/icon4/icon4_00023.png") no-repeat left top/cover;
  }
}

.lanren5_newn {
  background: url("~@/assets/images/icon/icon5/icon5_00000.png") no-repeat left top/cover;
}

.lanren5_new {
  background: url("~@/assets/images/icon/icon5/icon5_00023.png") no-repeat left top/cover;
  animation: shakenew5 0.5s steps(21) both;
}

@keyframes shakenew5 {
  0% {
    background: url("~@/assets/images/icon/icon5/icon5_00000.png") no-repeat left top/cover;
  }
  5% {
    background: url("~@/assets/images/icon/icon5/icon5_00001.png") no-repeat left top/cover;
  }
  10% {
    background: url("~@/assets/images/icon/icon5/icon5_00002.png") no-repeat left top/cover;
  }
  15% {
    background: url("~@/assets/images/icon/icon5/icon5_00003.png") no-repeat left top/cover;
  }
  20% {
    background: url("~@/assets/images/icon/icon5/icon5_00004.png") no-repeat left top/cover;
  }
  25% {
    background: url("~@/assets/images/icon/icon5/icon5_00005.png") no-repeat left top/cover;
  }
  30% {
    background: url("~@/assets/images/icon/icon5/icon5_00006.png") no-repeat left top/cover;
  }
  35% {
    background: url("~@/assets/images/icon/icon5/icon5_00007.png") no-repeat left top/cover;
  }
  40% {
    background: url("~@/assets/images/icon/icon5/icon5_00008.png") no-repeat left top/cover;
  }
  45% {
    background: url("~@/assets/images/icon/icon5/icon5_00009.png") no-repeat left top/cover;
  }
  50% {
    background: url("~@/assets/images/icon/icon5/icon5_00010.png") no-repeat left top/cover;
  }
  55% {
    background: url("~@/assets/images/icon/icon5/icon5_00011.png") no-repeat left top/cover;
  }
  60% {
    background: url("~@/assets/images/icon/icon5/icon5_00012.png") no-repeat left top/cover;
  }
  65% {
    background: url("~@/assets/images/icon/icon5/icon5_00013.png") no-repeat left top/cover;
  }
  70% {
    background: url("~@/assets/images/icon/icon5/icon5_00014.png") no-repeat left top/cover;
  }
  75% {
    background: url("~@/assets/images/icon/icon5/icon5_00015.png") no-repeat left top/cover;
  }
  80% {
    background: url("~@/assets/images/icon/icon5/icon5_00017.png") no-repeat left top/cover;
  }
  85% {
    background: url("~@/assets/images/icon/icon5/icon5_00018.png") no-repeat left top/cover;
  }
  90% {
    background: url("~@/assets/images/icon/icon5/icon5_00019.png") no-repeat left top/cover;
  }
  95% {
    background: url("~@/assets/images/icon/icon5/icon5_00020.png") no-repeat left top/cover;
  }
  100% {
    background: url("~@/assets/images/icon/icon5/icon5_00023.png") no-repeat left top/cover;
  }
}

</style>
