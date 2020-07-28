<template>
  <div>
    <h2 class="u-ttb2">单频电平图</h2>
    <div class="u-line">
      <span class="linea"></span>
      <span class="lineb"></span>
    </div>
    <dl>
      <dt>样例</dt>
      <div id="chart" style="height: 200px"></div>
      <dt>核心代码</dt>
      <dd>
        <pre>
          <code class="javascript hljs">
    initChart() {
      this.chart = WirelessCharts.singleChart("chart");
      setInterval(() => {
        let dpArray = this.chart.series[0].yData;
        dpArray.shift();
        dpArray.push(Number((Math.pow(Math.random(), 2) * 120 - 20).toFixed(3)));
        this.chart.series[0].setData(dpArray, true);
      }, 500);
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
      this.chart = WirelessCharts.singleChart("chart");
      setInterval(() => {
        let dpArray = this.chart.series[0].yData;
        dpArray.shift();
        dpArray.push(
          Number((Math.pow(Math.random(), 2) * 120 - 20).toFixed(3))
        );
        this.chart.series[0].setData(dpArray, true);
      }, 500);
    }
  }
};
</script>

<style scoped></style>
