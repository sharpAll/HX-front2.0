<template>
  <div>
    <h2 class="u-ttb2">轨迹电平模型</h2>
    <div class="u-line">
      <span class="linea"></span>
      <span class="lineb"></span>
    </div>
    <dl>
      <dt>样例</dt>
      <div class="gis-map" id="map">
        <canvas
          id="level-lengend"
          height="160"
          width="36"
          style="position: absolute;bottom: 10px;left: 10px;z-index: 999;"
        ></canvas>
      </div>
      <dt>核心代码</dt>
      <dd>
        <pre>
          <code class="javascript hljs">
    drawPolyLine(lineArr, dpvArr) {
      for (var i = 0; i &lt; lineArr.length; i++) {
        L.circle(lineArr[i], {
          radius: 50,
          stroke: false,
          fillOpacity: 1,
          fillColor: this.elecPointColor(dpvArr[i])
        }).addTo(this.overLayers.routelevels);
        this.map.addLayer(this.overLayers.routelevels);
      }
    }
          </code>
        </pre>
      </dd>
    </dl>
  </div>
</template>

<script>
import hljs from "highlight.js";
import L from "leaflet";
import config from "@/utils/leafletConfig.js";
import "leaflet/dist/leaflet.css";
export default {
  data() {
    return {
      map: null,
      baseLayers: {
        geoq: null,
        amap: null
      },
      overLayers: {
        routelevels: null
      },
      routeArray: [[39.8, 98.27]],
      dpvArray: [],
      routeColor: [
        "#0001fd",
        "#00649a",
        "#00bf3f",
        "#3bc300",
        "#807e00",
        "#c23c00",
        "#fd0100"
      ]
    };
  },
  mounted() {
    document.querySelectorAll("pre code").forEach(block => {
      hljs.highlightBlock(block);
    });
    this.initMap();
    this.createLegend(36, 160);
  },
  components: {},

  methods: {
    initMap() {
      this.map = L.map("map", {
        minZoom: 1,
        maxZoom: 18,
        center: { lat: 39.8, lng: 98.27 },
        zoom: 13,
        zoomControl: false,
        attributionControl: false
      });
      this.baseLayers.geoq = L.tileLayer(config.geoqUrl);
      this.baseLayers.amap = L.tileLayer(config.amapUrl);
      this.map.addLayer(this.baseLayers.geoq);
      this.createPolyLine();
    },
    createPolyLine() {
      for (var i = 0; i < 1000; i++) {
        var n = this.routeArray.length - 1;
        var temp = [];
        temp.push(this.routeArray[n][0] + 0.001);
        temp.push(this.routeArray[n][1] + 0.001);
        this.routeArray.push(temp);
      }
      for (var j = 0; j <= 1000; j++) {
        this.dpvArray.push(Math.random() * 120 - 20);
      }
      this.overLayers.routelevels = L.layerGroup();
      this.drawPolyLine(this.routeArray, this.dpvArray);
    },
    drawPolyLine(lineArr, dpvArr) {
      for (var i = 0; i < lineArr.length; i++) {
        L.circle(lineArr[i], {
          radius: 50,
          stroke: false,
          fillOpacity: 1,
          fillColor: this.elecPointColor(dpvArr[i])
        }).addTo(this.overLayers.routelevels);
        this.map.addLayer(this.overLayers.routelevels);
      }
    },
    createLegend(w, h) {
      var can = document.getElementById("level-lengend");
      var ctx = can.getContext("2d");
      var lengendGradient = ctx.createLinearGradient(0, 0, 0, h);
      lengendGradient.addColorStop(0, "#fd0100");
      lengendGradient.addColorStop(0.16, "#c23c00");
      lengendGradient.addColorStop(0.32, "#807e00");
      lengendGradient.addColorStop(0.48, "#3bc300");
      lengendGradient.addColorStop(0.64, "#00bf3f");
      lengendGradient.addColorStop(0.8, "#00649a");
      lengendGradient.addColorStop(1, "#0001fd");
      ctx.fillStyle = lengendGradient;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#202020";
      ctx.font = "13px 雅黑";
      ctx.textAlign = "center";
      for (var i = 0; i < 7; i++) {
        ctx.fillText(i * 20 - 20, w / 2, h - (i * h) / 7 - h / 20);
      }
    },
    elecPointColor(n) {
      if (n < 0) {
        return this.getGradientColor(
          this.routeColor[0],
          this.routeColor[1],
          n - -20
        );
      } else if (n < 20) {
        return this.getGradientColor(
          this.routeColor[1],
          this.routeColor[2],
          n - 0
        );
      } else if (n < 40) {
        return this.getGradientColor(
          this.routeColor[2],
          this.routeColor[3],
          n - 20
        );
      } else if (n < 60) {
        return this.getGradientColor(
          this.routeColor[3],
          this.routeColor[4],
          n - 40
        );
      } else if (n < 80) {
        return this.getGradientColor(
          this.routeColor[4],
          this.routeColor[5],
          n - 60
        );
      } else {
        return this.getGradientColor(
          this.routeColor[5],
          this.routeColor[6],
          n - 80
        );
      }
    },
    getGradientColor(startColor, endColor, offset) {
      var sColor = this.hexToRgb(startColor),
        eColor = this.hexToRgb(endColor);
      //计算R\G\B每一步的差值
      var rStep = (eColor[0] - sColor[0]) / 20;
      var gStep = (eColor[1] - sColor[1]) / 20;
      var bStep = (eColor[2] - sColor[2]) / 20;
      return this.rgbToHex(
        parseInt(rStep * offset + sColor[0]),
        parseInt(gStep * offset + sColor[1]),
        parseInt(bStep * offset + sColor[2])
      );
    },
    rgbToHex(r, g, b) {
      var hex = ((r << 16) | (g << 8) | b).toString(16);
      return "#" + new Array(Math.abs(hex.length - 7)).join("0") + hex;
    },
    hexToRgb(hex) {
      var rgb = [];
      for (var i = 1; i < 7; i += 2) {
        rgb.push(parseInt("0x" + hex.slice(i, i + 2)));
      }
      return rgb;
    }
  }
};
</script>

<style scoped></style>
