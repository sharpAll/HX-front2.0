<template>
  <div>
    <h2 class="u-ttb2">公务用图表</h2>
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
      var data = {
        PERCENT: [],
        MAXDP: [],
        MINDP: [],
        AVGDP: []
      };
      for (var i = 49; i &lt;= 84; i = i + 0.025) {
        var fre = Number(i.toFixed(3));
        var item_1 = [fre, 50];
        var item_2 = [fre, 20];
        var item_3 = [fre, 10];
        var item_4 = [fre, 15];
        data.PERCENT.push(item_1);
        data.MAXDP.push(item_2);
        data.MINDP.push(item_3);
        data.AVGDP.push(item_4);
      }
      this.chart = WirelessCharts.standardLineChart(49, 84, data);
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
      var data = {
        PERCENT: [],
        MAXDP: [],
        MINDP: [],
        AVGDP: []
      };
      for (var i = 49; i <= 84; i = i + 0.025) {
        var fre = Number(i.toFixed(3));
        var item_1 = [fre, 50];
        var item_2 = [fre, 20];
        var item_3 = [fre, 10];
        var item_4 = [fre, 15];
        data.PERCENT.push(item_1);
        data.MAXDP.push(item_2);
        data.MINDP.push(item_3);
        data.AVGDP.push(item_4);
      }
      this.chart = WirelessCharts.standardLineChart(49, 84, data);
    }
  }
};
</script>

<style scoped></style>
