<template>
  <div>
    <h2 class="u-ttb2">热力图</h2>
    <div class="u-line">
      <span class="linea"></span>
      <span class="lineb"></span>
    </div>
    <dl>
      <dt>样例</dt>
      <div class="gis-map" id="map"></div>
      <dt>引用插件介绍</dt>
      <dd>
        <p>安装：npm i leaflet.heat</p>
        <p>引用：import "leaflet.heat/dist/leaflet-heat.js"; (leaflet:1.6)</p>
      </dd>
      <dt>核心代码</dt>
      <dd>
        <pre>
          <code class="javascript hljs">
    initHeatmap() {
      //最大点num:98
      axios.get("https://lxqjss.github.io/data/heatJson2.json").then(res => {
        const src = res.data.heatData;
        src.forEach(item => {
          this.heatData.push([
            Number(item.lat),
            Number(item.lng),
            Number(item.num)
          ]);
        });
        this.heatLayer=L.heatLayer(this.heatData, {
          minOpacity:0.1,
          maxZoom:this.map.getZoom(),
          max: 100
        }).addTo(this.map);
      });
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
import "leaflet.heat/dist/leaflet-heat.js";
import config from "@/utils/leafletConfig.js";
import "leaflet/dist/leaflet.css";
import axios from "axios";
export default {
  data() {
    return {
      map: null,
      baseLayers: {
        geoq: null,
        amap: null
      },
      heatLayer: null,
      heatData: []
    };
  },
  mounted() {
    document.querySelectorAll("pre code").forEach(block => {
      hljs.highlightBlock(block);
    });
    this.initMap();
  },
  components: {},

  methods: {
    initMap() {
      this.map = L.map("map", {
        minZoom: 1,
        maxZoom: 18,
        center: { lat: 28.45, lng: 119.92 },
        zoom: 9,
        zoomControl: false,
        attributionControl: false
      });
      this.baseLayers.geoq = L.tileLayer(config.geoqUrl);
      this.baseLayers.amap = L.tileLayer(config.amapUrl);
      this.map.addLayer(this.baseLayers.geoq);
      this.initHeatmap();
    },
    initHeatmap() {
      //最大点num:98
      axios.get("https://lxqjss.github.io/data/heatJson2.json").then(res => {
        const src = res.data.heatData;
        src.forEach(item => {
          this.heatData.push([
            Number(item.lat),
            Number(item.lng),
            Number(item.num)
          ]);
        });
        this.heatLayer = L.heatLayer(this.heatData, {
          minOpacity: 0.1,
          maxZoom: this.map.getZoom(),
          max: 100
        }).addTo(this.map);
      });
    }
  }
};
</script>

<style scoped></style>
