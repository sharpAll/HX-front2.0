<template>
  <div>
    <h2 class="u-ttb2">瀑布图</h2>
    <div class="u-line">
      <span class="linea"></span>
      <span class="lineb"></span>
    </div>
    <dl>
      <dt>样例</dt>
      <div id="fallbox" style="height: 300px">
        <canvas id="scale" style="display: block"></canvas>
        <canvas id="fallChart" style="display: block"></canvas>
      </div>
      <dt>核心代码</dt>
      <dd>
        <pre>
          <code class="javascript hljs">
    initChart() {
      this.chart = this.customFallBox(37, 807);
      window.onresize = ()=> {
        this.chart = this.customFallBox(37, 807);
      };
    },
    customFallBox(startFreq, endFreq) {
      let fallChartTemp;
      if (document.body.clientWidth &lt;= 1120) {
        WirelessCharts.falls.initScale(startFreq, endFreq, 10, 60);
        fallChartTemp = WirelessCharts.falls.initFallChart(10, 60);
      } else {
        const offset = ((document.body.clientWidth - 1120) / 64).toFixed(1);
        const left = 10 + offset * 1;
        const right = 60 + offset * 1;
        WirelessCharts.falls.initScale(startFreq, endFreq, left, right);
        fallChartTemp = WirelessCharts.falls.initFallChart(left, right);
      }
      return fallChartTemp;
    },
    connectSocket() {
      setInterval(()=> {
        var data = [];
        for (var i = 0; i &lt; 1000; i++) {
          var n = Math.random() * 100;
          data.push(n);
        }
        if (!this.fallInited) {
          this.chart = this.customFallBox(37, 807);
          window.onresize = ()=> {
            this.chart = this.customFallBox(37, 807);
          };
          this.fallInited = true;
        }
        if (undefined != data && null != data) {
          if (this.fallNum &lt; 4) {
            this.fallNum++;
          }
          if (this.fallNum > 3) {
            this.chart(data);
          }
        }
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
      chart: null,
      fallInited: false,
      fallNum: 0
    };
  },
  mounted() {
    document.querySelectorAll("pre code").forEach(block => {
      hljs.highlightBlock(block);
    });
    this.initChart();
    this.connectSocket();
  },
  components: {},

  methods: {
    initChart() {
      this.chart = this.customFallBox(37, 807);
      window.onresize = () => {
        this.chart = this.customFallBox(37, 807);
      };
    },
    customFallBox(startFreq, endFreq) {
      let fallChartTemp;
      if (document.body.clientWidth <= 1120) {
        WirelessCharts.falls.initScale(startFreq, endFreq, 10, 60);
        fallChartTemp = WirelessCharts.falls.initFallChart(10, 60);
      } else {
        const offset = ((document.body.clientWidth - 1120) / 64).toFixed(1);
        const left = 10 + offset * 1;
        const right = 60 + offset * 1;
        WirelessCharts.falls.initScale(startFreq, endFreq, left, right);
        fallChartTemp = WirelessCharts.falls.initFallChart(left, right);
      }
      return fallChartTemp;
    },
    connectSocket() {
      setInterval(() => {
        var data = [];
        for (var i = 0; i < 1000; i++) {
          var n = Math.random() * 100;
          data.push(n);
        }
        if (!this.fallInited) {
          this.chart = this.customFallBox(37, 807);
          window.onresize = () => {
            this.chart = this.customFallBox(37, 807);
          };
          this.fallInited = true;
        }
        if (undefined != data && null != data) {
          if (this.fallNum < 4) {
            this.fallNum++;
          }
          if (this.fallNum > 3) {
            this.chart(data);
          }
        }
      }, 1000);
    }
  }
};
</script>

<style scoped></style>
