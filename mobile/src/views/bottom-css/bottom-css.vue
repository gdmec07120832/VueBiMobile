<template>
<div>
  <van-row type="flex" justify="center">
    <van-col span="4">
      <span style="margin-top: 8.5px;display: block;border-bottom: 1px solid #CCCCCC;height: 10px;width: 56px;float: right;"></span>
    </van-col>
    <van-col span="7">
      <p style="text-align: center;margin: 0px;font-size: 14px;color: #CCCCCC;padding-top: 10px;line-height: 18px;">
        <span style="font-weight: bold;">·</span> 已经见底了 
        <span style="font-weight: bold;">·</span>  
      </p>   
    </van-col>
    <van-col span="4">
      <span style="margin-top: 8.5px;display: block;border-bottom: 1px solid #CCCCCC;height: 10px;width: 56px;"></span>
    </van-col>
  </van-row>
</div>


</template>

<script>
import { NoticeBar, PullRefresh, List, Cell,Loading,Icon,Row,Col } from "vant";

export default {
  name: "BottomCss",
  components: {
    [NoticeBar.name]: NoticeBar,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Cell.name]: Cell,
    [Loading.name]:Loading,
    [Icon.name]:Icon,
    [Row.name]:Row,
    [Col.name]:Col,
  },

};
</script>

<style scoped lang="scss">
</style>