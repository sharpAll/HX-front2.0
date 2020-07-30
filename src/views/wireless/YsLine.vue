<template>
  <div>
    <h2 class="u-ttb2">多y轴折线图</h2>
    <div class="u-line">
      <span class="linea"></span>
      <span class="lineb"></span>
    </div>
    <dl>
      <dt>样例</dt>
      <div id="chart" style="height: 400px"></div>
      <dt>核心代码</dt>
      <dd>
        <pre>
          <code class="javascript hljs">
    initChart() {
      this.chart = WirelessCharts.fscanChart();
      //新版highcharts会保留初始x轴坐标的范围
      this.chart.series[0].setData([]);
      setInterval(()=> {
        let dataList = [];
        for (let i = 88; i &lt;= 108; i = i + 0.025) {
          let item = [];
          item.push(Number(i.toFixed(3)));
          item.push(Number((Math.pow(Math.random(), 2) * 120 - 20).toFixed(3)));
          dataList.push(item);
        }
        this.chart.series[0].setData(dataList);
      }, 1000);
    }
          </code>
        </pre>
      </dd>
    </dl>
  </div>
</template>

<script>
import hljs from "highlight.js";
import WirelessCharts from "@/utils/wirelessCharts.js";
export default {
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    document.querySelectorAll("pre code").forEach(block => {
      hljs.highlightBlock(block);
    });
    this.initChart();
  },
  components: {},

  methods: {
    initChart() {
      var fre = [];
      var occuThreshold = [];
      var maxdp = [];
      var overOccuThreshold = [];
      for (var i = 49; i <= 84; i = i + 0.025) {
        fre.push(Number(i.toFixed(3)));
        occuThreshold.push(20);
        maxdp.push(40);
        overOccuThreshold.push(5);
      }
      this.chart = WirelessCharts.YsLine(
        "chart",
        fre,
        occuThreshold,
        maxdp,
        overOccuThreshold
      );
    }
  }
};
</script>

<style scoped></style>
