<template>
  <div>

    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">  
    <section
      class="px10 py10"
      style="
        padding-top: 0px;
        padding-bottom: 0px;
        padding-left: 15px;
        padding-right: 15px;
      "
    >
      <div class="section-title" style="padding-top: 5px;">实时业绩</div>
    </section>
    <div style="border-bottom: 1px solid #EEEEEE; height: 5px">
      <!-- 线来的 -->
    </div>
    <section
      class="px10 py10"
      style="
        padding-top: 0px;
        padding-bottom: 5px;
        padding-left: 15px;
        padding-right: 15px;
      "
    >
      <div style="min-height: 20vh">
        <div class="chart-desc">
          <span>{{
            "￥" + thousands(data["overview-realtime_perf"] / 10000) + "万"
          }}</span>
          <span style="color: #a2a2a2"
            >完成率<i style="color: #ff4d4f; font-style: normal">{{
              decimal2Percent(data["overview-realtime_perf_reach_rate"])
            }}</i></span
          >
          <span style="color: #a2a2a2"
            >同比<i
              style="font-style: normal"
              :class="calcSignClass(data['overview-realtime_perf_rate'])"
              >{{ decimal2Percent(data["overview-realtime_perf_rate"]) }}</i
            ></span
          >
        </div>
        <div ref="chart" style="height: 30vw" class="swiper-no-swiping"></div>
      </div>
    </section>

    <van-notice-bar
      wrapable
      style="padding: 5px"
      :scrollable="false"
      color="rgba(245, 245, 245, 1)"
      background="rgba(245, 245, 245, 1)"
      text=""
    />

    <section
      class="px10 py10"
      style="
        padding-top: 5px;
        padding-bottom: 0px;
        padding-left: 15px;
        padding-right: 15px;
      "
    >
      <div class="section-title">经营指标</div>
    </section>
    <div style="border-bottom: 1px solid #EEEEEE; height: 5px">
      <!-- 线来的 -->
    </div>
    <section
      class="px10 py10"
      style="padding-top: 5px; padding-left: 15px; padding-right: 15px"
    >
      <div class="wrapper">
        <div v-if="permissionList['SQL-overview-dev_amt']">
          <span class="name">
            <i
              style="
                width: 25px;
                height: 25px;
                background-color: #eeeeff;
                border-radius: 20px;
              "
            >
              <i
                style="margin-left: 5px; margin-top: 3px"
                class="icontitle_1"
              ></i>
            </i>
            <span style="line-height: 25px">发货业绩</span></span
          >
          <span class="amount"
            ><i></i>{{ ((data["overview-dev_amt"]/10000).toFixed(2)*1).toLocaleString()+"万" }}</span
          >
          <span style="color: #a2a2a2" class="change-rate">
            <span></span>同比<i
              style="font-style: normal"
              :class="calcSignClass(data['overview-dev_amt_rate'])"
              >{{ decimal2Percent(data["overview-dev_amt_rate"]) }}</i
            >
          </span>
        </div>

        <div v-if="permissionList['SQL-overview-cg_amt_rate']">
          <span class="name">
            <!-- <i class="icontitle_2"></i> -->
            <i
              style="
                width: 25px;
                height: 25px;
                background-color: #eeeeff;
                border-radius: 20px;
              "
            >
              <i
                style="margin-left: 4px; margin-top: 4px"
                class="icontitle_2"
              ></i>
            </i>
            <span style="line-height: 25px">采购毛利率</span>
          </span>
          <span class="amount"
            ><i></i>{{ decimal2Percent(data["overview-cg_amt_rate"]) }}</span
          >
          <span style="color: #a2a2a2" class="change-rate">
            <span></span>标杆<i
              style="font-style: normal"
              :class="calcSignClass(data['overview-cg_tar_rate'])"
              >{{ decimal2Percent(data["overview-cg_tar_rate"]) }}</i
            >
          </span>
        </div>

        <div v-if="permissionList['SQL-overview-cust_amt']">
          <span class="name">
            <!-- <i class="icontitle_3"></i> -->
            <i
              style="
                width: 25px;
                height: 25px;
                background-color: #eeeeff;
                border-radius: 20px;
              "
            >
              <i
                style="margin-left: 4px; margin-top: 3px"
                class="icontitle_3"
              ></i>
            </i>
            <span style="line-height: 25px">客单价</span>
          </span>
          <span class="amount"
            ><i></i>{{ thousands(data["overview-cust_amt"])+"元" }}</span
          >
          <span style="color: #a2a2a2" class="change-rate">
            <span></span>同比<i
              style="font-style: normal"
              :class="calcSignClass(data['overview-cust_amt_rate'])"
              >{{ decimal2Percent(data["overview-cust_amt_rate"]) }}</i
            >
          </span>
        </div>
        <div v-if="permissionList['SQL-overview-new_product_amt']">
          <span class="name">
            <!-- <i class="icontitle_4"></i> -->
            <i
              style="
                width: 25px;
                height: 25px;
                background-color: #eeeeff;
                border-radius: 20px;
              "
            >
              <i
                style="margin-left: 4px; margin-top: 4px"
                class="icontitle_4"
              ></i>
            </i>
            <span style="line-height: 25px">新品业绩</span>
          </span>
          <span class="amount"
            ><i></i>{{ thousands((data["overview-new_product_amt"]/10000).toFixed(0)*1)+"万" }}</span
          >
          <span style="color: #a2a2a2" class="change-rate">
            <span></span>同比<i
              style="font-style: normal"
              :class="calcSignClass(data['overview-new_product_amt_rate'])"
              >{{ decimal2Percent(data["overview-new_product_amt_rate"]) }}</i
            >
          </span>
        </div>
        <div v-if="permissionList['SQL-overview-short_amt']">
          <span class="name">
            <!-- <i class="icontitle_5"></i> -->
            <i
              style="
                width: 25px;
                height: 25px;
                background-color: #eeeeff;
                border-radius: 20px;
              "
            >
              <i
                style="margin-left: 4px; margin-top: 4px"
                class="icontitle_5"
              ></i>
            </i>
            <span style="line-height: 25px">订单欠货</span>
          </span>
          <span class="amount"
            ><i></i>{{ thousands((data["overview-short_amt"]/10000).toFixed(0)*1)+"万" }}</span
          >
          <span style="color: #a2a2a2" class="change-rate">
            <span></span>同比<i
              style="font-style: normal"
              :class="calcSignClass(data['overview-short_amt_rate'])"
              >{{ decimal2Percent(data["overview-short_amt_rate"]) }}</i
            >
          </span>
        </div>
        <div v-if="permissionList['SQL-overview-shbl_rate']">
          <span class="name">
            <!-- <i class="icontitle_6"></i> -->
            <i
              style="
                width: 25px;
                height: 25px;
                background-color: #eeeeff;
                border-radius: 20px;
              "
            >
              <i
                style="margin-left: 4px; margin-top: 5px"
                class="icontitle_6"
              ></i>
            </i>
            <span style="line-height: 25px">售后不良率</span>
          </span>
          <span class="amount"
            ><i></i>{{ decimal2Percent(data["overview-shbl_rate"]) }}</span
          >
          <span style="color: #a2a2a2" class="change-rate">
            <span></span>同比<i
              style="font-style: normal"
              :class="calcSignClass(data['overview-shbl_yoy_rate'])"
              >{{ decimal2Percent(data["overview-shbl_yoy_rate"]) }}</i
            >
          </span>
        </div>
        <div v-if="permissionList['SQL-overview-ka_reach_rate']">
          <span class="name">
            <!-- <i class="icontitle_7"></i> -->
            <i
              style="
                width: 25px;
                height: 25px;
                background-color: #eeeeff;
                border-radius: 20px;
              "
            >
              <i
                style="margin-left: 4px; margin-top: 4px"
                class="icontitle_7"
              ></i>
            </i>
            <span style="line-height: 25px">KA达成</span>
          </span>
          <span class="amount"
            ><i></i>{{ decimal2Percent(data["overview-ka_reach_rate"]) }}</span
          >
          <span style="color: #a2a2a2" class="change-rate">
            <span></span>同比<i
              style="font-style: normal"
              :class="calcSignClass(data['overview-ka_reach_yoy_rate'])"
              >{{ decimal2Percent(data["overview-ka_reach_yoy_rate"]) }}</i
            >
          </span>
        </div>
        <div v-if="permissionList['SQL-overview-visitors_cnt']">
          <span class="name">
            <!-- <i class="icontitle_8"></i> -->
            <i
              style="
                width: 25px;
                height: 25px;
                background-color: #eeeeff;
                border-radius: 20px;
              "
            >
              <i
                style="margin-left: 4px; margin-top: 4px"
                class="icontitle_8"
              ></i>
            </i>
            <span style="line-height: 25px">店铺访客</span>
          </span>
          <span class="amount"
            ><i></i>{{ thousands(data["overview-visitors_cnt"]) }}</span
          >
          <span style="color: #a2a2a2" class="change-rate">
            <span></span>同比<i
              style="font-style: normal"
              :class="calcSignClass(data['overview-visitors_cnt_rate'])"
              >{{ decimal2Percent(data["overview-visitors_cnt_rate"]) }}</i
            >
          </span>
        </div>
        <div v-if="permissionList['SQL-overview-cancel_amt']">
          <span class="name">
            <!-- <i class="icontitle_9"></i> -->
            <i
              style="
                width: 25px;
                height: 25px;
                background-color: #eeeeff;
                border-radius: 20px;
              "
            >
              <i
                style="margin-left: 4px; margin-top: 4px"
                class="icontitle_9"
              ></i>
            </i>
            <span style="line-height: 25px">未发取消</span>
          </span>
          <span class="amount"
            ><i></i>{{ thousands((data["overview-cancel_amt"]/10000).toFixed(0)*1)+"万" }}</span
          >
          <span style="color: #a2a2a2" class="change-rate">
            <span></span>同比<i
              style="font-style: normal"
              :class="calcSignClass(data['overview-cancel_amt_rate'])"
              >{{ decimal2Percent(data["overview-cancel_amt_rate"]) }}</i
            >
          </span>
        </div>
      </div>
    </section>


    <div style="width: 100%; height: 40px; background: rgba(245, 245, 245, 1);">
      <p style="text-align: center;margin: 0px;font-size: 14px;color: #CCCCCC;padding-top: 10px;">————  已经见底了  ————</p>
    </div>

    </van-pull-refresh>

    <div style="width: 100%; height: 50px"></div>
  </div>
</template>

<script>
/* eslint-disable */
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import { mapState } from "vuex";
import {
  decimal2Percent,
  thousands,
  calcSignClass,
  generatePromise,
} from "@/utils/helpers";

import { NoticeBar,PullRefresh } from "vant";

export default {
  name: "Entry",
  components: {
    [NoticeBar.name]: NoticeBar,
    [PullRefresh.name]:PullRefresh
  },

  data() {
    return {
      count: 0,
      isLoading: false,

      chartOption: {
        grid: {
          left: "1%",
          top: "6%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        tooltip: {
          padding: [2, 5, 2, 5],
          trigger: "item",
          // extraCssText:'height:40px',
          // showDelay: 200, 
          axisPointer: {
            // type : 'shadow',   
            lineStyle: {
              // color: '#ddd'
              color: "#1F9FFB",
            },
            type: "cross",
            label: {
              color: "#000000",
              // backgroundColor: "#1678FF",
              backgroundColor: "aliceblue",

            },
          },
          backgroundColor: "rgba(22,120,255,0.2)",
          borderWidth: "1", //边框宽度设置1
          borderColor: "#E6E6E6", //设置边框颜色
          textStyle: {
            color: "#3C3C3C", //设置文字颜色
            top: "0px",
          },
          // formatter: function (params) {
          //   // console.log(params[0]);

          //   // _this.user_value=params[0].value;
          //   return (
          //     "时间：" +
          //     params[0].name * 1 +
          //     "h" +
          //     "<br/>" +
          //     "销额：" +
          //     params[0].value +
          //     "w"
          //   );
          // },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: "#ccc",
              // color:'#1F9FFB'
            },
          },
          axisLabel: {
            // interval: 3
          },
        },
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: true,
              lineStyle: { type: "dotted", color: "#ccc" },
            },
            axisLabel: {
              textStyle: {
                color: "#ccc",
              },
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            type: "line",
            showSymbol: false,
            itemStyle: {
              normal: {
                // color: '#66ccff',
                color: "#1678FF",
                lineStyle: {
                  // color: '#66ccff'
                  color: "#1678FF",
                },
                areaStyle: {
                  // color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  //   {
                  //     offset: 0,
                  //     // color: 'rgba(102, 204, 255, 0.35)'
                  //     color: "rgba(22,120,255,0.35)",
                  //   },
                  //   {
                  //     offset: 1,
                  //     // color: 'rgba(102, 204, 255, 1)'
                  //     color: "rgba(22,120,255,1)",
                  //   },
                  // ]),
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
            data: [],
          },
        ],
      },
      user_value: 25072,
      chartIns: null,
      data: {
        "overview-ka_reach_rate": "",
        "overview-ka_reach_yoy_rate": "",
        "overview-dev_amt": "",
        "overview-dev_amt_rate": "",
        "overview-cg_amt_rate": "",
        "overview-cg_tar_rate": "",
        "overview-cust_amt": "",
        "overview-cust_amt_rate": "",
        "overview-new_product_amt": "",
        "overview-new_product_amt_rate": "",
        "overview-cancel_amt": "",
        "overview-cancel_amt_rate": "",
        "overview-visitors_cnt": "",
        "overview-visitors_cnt_rate": "",
        "overview-shbl_rate": "",
        "overview-shbl_yoy_rate": "",
        "overview-short_amt": "",
        "overview-short_amt_rate": "",
        "overview-realtime_perf": "",
        "overview-realtime_perf_rate": "",
        "overview-realtime_perf_reach_rate": "",
        "overview-realtime_perf_hours": "",
      },
    };
  },
  computed: {
    ...mapState("user", ["permissionList"]),
  },
  created() {
    const [p1, resolve1] = generatePromise();
    this.p1 = p1;
    const apiMap = {
      "SQL-overview-ka_reach_rate": { resultProp: "KA_REACH_RATE" },
      "SQL-overview-ka_reach_yoy_rate": { resultProp: "KA_REACH_YOY_RATE" },
      "SQL-overview-dev_amt_rate": { resultProp: "DEV_AMT_RATE" },
      "SQL-overview-dev_amt": { resultProp: "DEV_AMT" },
      "SQL-overview-cg_amt_rate": { resultProp: "CG_AMT_RATE" },
      "SQL-overview-cg_tar_rate": { resultProp: "CG_TAR_RATE" },
      "SQL-overview-cust_amt": { resultProp: "CUST_AMT" },
      "SQL-overview-cust_amt_rate": { resultProp: "CUST_AMT_RATE" },
      "SQL-overview-new_product_amt": { resultProp: "NEW_PRODUCT_AMT" },
      "SQL-overview-new_product_amt_rate": {
        resultProp: "NEW_PRODUCT_AMT_RATE",
      },
      "SQL-overview-cancel_amt": { resultProp: "CANCEL_AMT" },
      "SQL-overview-cancel_amt_rate": { resultProp: "CANCEL_AMT_RATE" },
      "SQL-overview-visitors_cnt": { resultProp: "VISITORS_CNT" },
      "SQL-overview-visitors_cnt_rate": { resultProp: "VISITORS_CNT_RATE" },
      "SQL-overview-shbl_rate": { resultProp: "SHBL_RATE" },
      "SQL-overview-shbl_yoy_rate": { resultProp: "SHBL_YOY_RATE" },
      "SQL-overview-short_amt": { resultProp: "SHORT_AMT" },
      "SQL-overview-short_amt_rate": { resultProp: "SHORT_AMT_RATE" },
      "SQL-overview-realtime_perf": { resultProp: "AMT" },
      "SQL-overview-realtime_perf_rate": { resultProp: "AGO_RATE" },
      "SQL-overview-realtime_perf_reach_rate": { resultProp: "AGO_RATE" },
      "SQL-overview-realtime_perf_hours": { type: Array, resolve: resolve1 },
    };
    Object.keys(apiMap).forEach((key) => {
      if (this.permissionList[key]) {
        const [, prefix, interfaceName] = key.split("-");
        if (prefix && interfaceName) {
          this.$axios
            .post(`/api/admin/data/${prefix}/${interfaceName}/get`, {})
            .then(({ data }) => {
              if (apiMap[key].type === Array) {
                this.data[`${prefix}-${interfaceName}`] = data || [];
              } else {
                this.data[`${prefix}-${interfaceName}`] = (data[0] || {})[
                  apiMap[key].resultProp
                ];
              }
              if (apiMap[key].resolve) {
                apiMap[key].resolve();
              }
            });
        }
      }
    });
  },
  mounted() {
    console.log("entry mounted", Date.now());
    this.initChart();
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

    initChart() {
      this.chartIns = echarts.init(this.$refs["chart"]);
      let _this = this;
      this.p1.then(() => {
        let data = this.data["overview-realtime_perf_hours"];
        data = data.sort((a, b) => {
          return Number(a["TDATE_HOURS"]) - Number(b["TDATE_HOURS"]);
        });
        this.chartOption.xAxis.data = data.map(
          (item) => item["TDATE_HOURS"] * 1
        );
        this.chartOption.series[0].data = data.map((item) =>
          Number((item["AMT"] / 10000).toFixed(0))
        );

        this.chartOption.tooltip.formatter = function (params) {

          // _this.user_value=params[0].value;

          // return (
          //   "时间：" +
          //   params[0].name * 1 +
          //   "h" +
          //   "<br/>" +
          //   "销额：" +
          //   params[0].value +
          //   "w"
          // );
        };

        this.chartOption.tooltip.axisPointer.label.formatter = function (params) {

          // console.log(params);
          // let test=0;

          if(params["axisDimension"] == "x"){
            // console.log(params["seriesData"][0]["value"])
            _this.user_value=params["seriesData"][0]["value"];
            // test=params["seriesData"][0]["value"];
          }else{
            _this.user_value=_this.user_value;
          }

          if (params["axisDimension"] == "x") {
            return params["value"];
          } else if (params["axisDimension"] == "y") {
            return _this.user_value;
          }
        };

        console.log(this.chartOption.series[0].data);
        this.chartIns.setOption(this.chartOption);
      });
    },
    decimal2Percent,
    calcSignClass,
    thousands,
  },
};
</script>

<style scoped lang="scss">
.section-title {
  font-size: 14px;
  // font-weight: bold;
}

.change-rate {
  font-size: 12px;
  color: #666;
}

.chart-desc {
  display: flex;
  justify-content: flex-start;
  align-items: baseline;

  > span {
    font-size: 12px;
    // padding: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-right: 15px;
  }

  > span:first-child {
    font-size: 18px;
    // font-weight: bold;
  }
}

.wrapper {
  display: flex;
  flex-wrap: wrap;
  font-size: 13px;

  > div {
    display: flex;
    flex-flow: column;
    width: 50%;
    padding: 2px 0 2px 30px;
    // padding: 5px 0 5px 15px;

    .name {
      color: #333;
    }

    .amount {
      // font-size: 15px;
      font-size: 12px;
      line-height: 20px;
      height: 20px;
      // font-weight: bold;
    }
  }
}

.wrapper div .name i {
  // width: 17px;
  // height: 17px;
  display: block;
  float: left;
  margin-right: 6px;
}

.wrapper div .amount i {
  // background: url("~@/assets/images/icon/num2.png") no-repeat left top/cover;
  width: 17px;
  height: 17px;
  display: block;
  float: left;
  margin-right: 12px;
}

.wrapper div .change-rate span {
  // background: url("~@/assets/images/icon/num2.png") no-repeat left top/cover;
  width: 17px;
  height: 17px;
  display: block;
  float: left;
  margin-right: 12px;
}

.wrapper div .name .icontitle_1 {
  background: url("~@/assets/images/icon/num2.png") no-repeat left top/cover;
  width: 15px;
  height: 20px;
}
.wrapper div .name .icontitle_2 {
  background: url("~@/assets/images/icon/num3.png") no-repeat left top/cover;
  width: 17px;
  height: 17px;
}
.wrapper div .name .icontitle_3 {
  background: url("~@/assets/images/icon/num8.png") no-repeat left top/cover;
  width: 17px;
  height: 17px;
}
.wrapper div .name .icontitle_4 {
  background: url("~@/assets/images/icon/num6.png") no-repeat left top/cover;
  width: 17px;
  height: 17px;
}
.wrapper div .name .icontitle_5 {
  background: url("~@/assets/images/icon/num5.png") no-repeat left top/cover;
  width: 17px;
  height: 17px;
}
.wrapper div .name .icontitle_6 {
  background: url("~@/assets/images/icon/num7.png") no-repeat left top/cover;
  width: 18px;
  height: 16px;
}
.wrapper div .name .icontitle_7 {
  background: url("~@/assets/images/icon/num4.png") no-repeat left top/cover;
  width: 17px;
  height: 17px;
}
.wrapper div .name .icontitle_8 {
  background: url("~@/assets/images/icon/num1.png") no-repeat left top/cover;
  width: 15px;
  height: 17px;
}
.wrapper div .name .icontitle_9 {
  background: url("~@/assets/images/icon/num15.png") no-repeat left top/cover;
  width: 17px;
  height: 16px;
}
</style>
