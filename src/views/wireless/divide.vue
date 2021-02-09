<template>
  <div>
    <h2 class="u-ttb2">频率划分图</h2>
    <div class="u-line">
      <span class="linea"></span>
      <span class="lineb"></span>
    </div>
    <dl>
      <dt>样例</dt>
      <div class="chart-box">
        <div class="svg-box">
          <DivideSvg :checkedList="checkedList" @detail="fredetail"></DivideSvg>
        </div>
        <div class="table-box">
          <div class="table-title">划分图过滤</div>
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          >
          <el-scrollbar
            class="my-scrollbar"
            style="height: calc(100vh - 250px)"
          >
            <el-checkbox-group
              v-model="checkedList"
              @change="handleCheckedChange"
            >
              <el-checkbox
                v-for="(item, index) in list"
                :label="item"
                :key="index"
              >
                <div class="color" :style="{ background: item.color }"></div>
                {{ item.serviceName }}</el-checkbox
              >
            </el-checkbox-group>
          </el-scrollbar>
        </div>
      </div>
    </dl>
  </div>
</template>

<script>
import DivideSvg from "./components/svg.vue";
export default {
  data() {
    return {
      channelStatis: {},
      list: [],
      checkAll: true,
      checkedList: [],
      isIndeterminate: false
    };
  },
  mounted() {
    this.fetchData();
  },
  components: { DivideSvg },

  methods: {
    //获取划分图过滤数据
    fetchData() {
      let data = [
        { color: "#998877", serviceName: "水上移动" },
        { color: "#EA400D", serviceName: "水上无线电导航" },
        { color: "#B85A3E", serviceName: "气象辅助" },
        { color: "#9F08EA", serviceName: "无线电导航" },
        { color: "#E04213", serviceName: "固定" },
        { color: "#C5CF5D", serviceName: "标准频率和时间信号（20kHz）" },
        { color: "#0062FF", serviceName: "航空无线电导航" },
        { color: "#111111", serviceName: "水上无线电导航（无线电信标）" },
        { color: "#DF09F2", serviceName: "广播" },
        { color: "#3FE815", serviceName: "移动" },
        { color: "#3ADE11", serviceName: "无线电定位" },
        { color: "#FF0000", serviceName: "业余" },
        { color: "#5DCFBC", serviceName: "移动（航空移动除外）" },
        { color: "#A15DCF", serviceName: "移动（遇险和呼叫）" },
        { color: "#6268CB", serviceName: "标准频率和时间信号（2500kHz）" },
        { color: "#DC6969", serviceName: "标准频率和时间信号" },
        { color: "#5DC4CF", serviceName: "航空移动（R）" },
        { color: "#5D94CF", serviceName: "航空移动（OR）" },
        { color: "#5D72CF", serviceName: "移动（航空移动（R）除外）" },
        { color: "#CF5D5D", serviceName: "航空移动" },
        { color: "#CF5DC6", serviceName: "陆地移动" },
        { color: "#DC8869", serviceName: "标准频率和时间信号（5000kHz）" },
        { color: "#FF7B00", serviceName: "卫星业余" },
        { color: "#A1CF5D", serviceName: "标准频率和时间信号（10000kHz）" },
        { color: "#1E879C", serviceName: "射电天文" },
        { color: "#70CF5D", serviceName: "标准频率和时间信号（15000kHz）" },
        { color: "#5DCF7D", serviceName: "标准频率和时间信号（20000kHz）" },
        { color: "#5DCFBC", serviceName: "标准频率和时间信号（25000kHz）" },
        { color: "#FFD900", serviceName: "空间操作（卫星识别）" },
        { color: "#F9020A", serviceName: "空间研究" },
        { color: "#F90269", serviceName: "空间操作（空对地）" },
        { color: "#DBFC01", serviceName: "卫星气象（空对地）" },
        { color: "#8FFC01", serviceName: "卫星移动（空对地）" },
        { color: "#F90282", serviceName: "空间研究（空对地）" },
        { color: "#3CFC01", serviceName: "卫星移动（地对空）" },
        {
          color: "#CAFF94",
          serviceName: "水上移动（使用DSC的遇险和安全呼叫）"
        },
        { color: "#D71919", serviceName: "水上移动（遇险和呼叫）" },
        { color: "#01FC0E", serviceName: "卫星移动" },
        { color: "#01FCB1", serviceName: "卫星标准频率和时间信号（400.1MHz）" },
        { color: "#01FCF4", serviceName: "卫星地球探测（地对空）" },
        { color: "#01B9FC", serviceName: "卫星气象（地对空）" },
        { color: "#F902B3", serviceName: "空间研究（空对空）" },
        { color: "#0172FC", serviceName: "卫星无线电导航（空对地）（空对空）" },
        { color: "#0137FC", serviceName: "卫星地球探测（有源）" },
        { color: "#92FEF3", serviceName: "空间研究（有源）" },
        { color: "#0105FC", serviceName: "卫星无线电导航（地对空）" },
        { color: "#00FFC3", serviceName: "卫星地球探测（无源）" },
        { color: "#FF9794", serviceName: "空间研究（无源）" },
        { color: "#FFCB94", serviceName: "空间操作（地对空）" },
        { color: "#917EB5", serviceName: "卫星广播" },
        { color: "#5D01FC", serviceName: "卫星无线电测定（地对空）" },
        { color: "#FFEB94", serviceName: "空间操作（地对空）（空对空）" },
        { color: "#94FFE2", serviceName: "卫星地球探测（地对空）（空对空）" },
        { color: "#FDFF94", serviceName: "空间研究（地对空）（空对空）" },
        { color: "#DFFF94", serviceName: "空间研究（深空）（地对空）" },
        { color: "#94FBFF", serviceName: "空间操作（空对地）（空对空）" },
        { color: "#94DBFF", serviceName: "卫星地球探测（空对地）（空对空）" },
        { color: "#94B9FF", serviceName: "空间研究（空对地）（空对空）" },
        { color: "#94FFA4", serviceName: "空间研究（深空）（空对地）" },
        { color: "#B101FC", serviceName: "卫星无线电测定（空对地）" },
        { color: "#9499FF", serviceName: "卫星固定（空对地）" },
        { color: "#94FFC1", serviceName: "卫星固定（地对空）" },
        { color: "#745DCF", serviceName: "卫星航空移动（R）" },
        { color: "#3300FF", serviceName: "空间研究  5.447D" },
        { color: "#B57EB4", serviceName: "卫星固定（地对空）（空对地）" },
        { color: "#0062FF", serviceName: "空间研究（地对空）" },
        { color: "#A9FF94", serviceName: "卫星水上移动（空对地）" },
        { color: "#0004FF", serviceName: "卫星地球探测（空对地）" },
        { color: "#B57E97", serviceName: "卫星固定（空对地）（地对空）" },
        { color: "#B57EB4", serviceName: "卫星间" },
        { color: "#EF01FC", serviceName: "卫星无线电导航" },
        { color: "#A200FF", serviceName: "卫星地球探测" },
        { color: "#FFFFFF", serviceName: "（未划分）" }
      ];
      this.checkedList = data;
      this.list = data;
    },
    //全选
    handleCheckAllChange(val) {
      this.checkedList = val ? this.list : [];
      this.isIndeterminate = false;
    },
    handleCheckedChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.list.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.list.length;
    },
    fredetail(data) {
      alert(`start=${data.start} end=${data.end}`);
    }
  }
};
</script>

<style scoped lang="scss">
.chart-box {
  line-height: 28px;
  position: relative;
  height: 500px;
  display: flex;
  overflow: hidden;
  .svg-box {
    width: 100%;
    cursor: pointer;
    user-select: none;
  }
  .table-box {
    width: 250px;
    transition: left 0.12s ease-in;
    box-shadow: 2px 2px 12px 0px rgba(0, 45, 88, 0.1);
    border: 1px solid #ddd;
    background: #fff;
    padding: 10px;
    z-index: 888;
    .table-title {
      font-weight: bold;
      line-height: 30px;
      font-size: 14px;
    }
    .color {
      width: 20px;
      height: 15px;
      margin-right: 10px;
      border: 1px solid #000000;
      display: inline-block;
      vertical-align: text-bottom;
    }
    .el-checkbox {
      display: block;
      line-height: 20px;
      margin-right: 5px;
      .el-checkbox__input {
        position: relative;
        top: 2px;
      }
    }
  }
}
</style>
