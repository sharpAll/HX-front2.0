<template>
  <div>
    <h2 class="u-ttb2">地理纬度与固定像素</h2>
    <div class="u-line">
      <span class="linea"></span>
      <span class="lineb"></span>
    </div>
    <dl>
      <dt>样例</dt>
      <div class="gis-map" id="map"></div>
      <dt>核心代码</dt>
      <dd>
        <pre>
          <code class="javascript hljs">
      L.circle([39.8,98.27], {radius: 15000,stroke:false,fillOpacity:0.4,fillColor:"#979cfc"}).addTo(this.map);
      L.circleMarker([39.8,98.67], {radius: 100,stroke:false,fillOpacity:0.4,fillColor:"#97fcd5"}).addTo(this.map);
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
        circles: null
      }
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
        center: { lat: 39.8, lng: 98.27 },
        zoom: 10,
        zoomControl: false,
        attributionControl: false
      });
      this.baseLayers.geoq = L.tileLayer(config.geoqUrl);
      this.baseLayers.amap = L.tileLayer(config.amapUrl);
      this.map.addLayer(this.baseLayers.geoq);
      this.drawCircles();
    },
    drawCircles() {
      this.overLayers.circles = L.layerGroup();
      L.circle([39.8, 98.27], {
        radius: 15000,
        stroke: false,
        fillOpacity: 0.4,
        fillColor: "#979cfc"
      }).addTo(this.overLayers.circles);
      L.circleMarker([39.8, 98.67], {
        radius: 100,
        stroke: false,
        fillOpacity: 0.4,
        fillColor: "#97fcd5"
      }).addTo(this.overLayers.circles);
      this.map.addLayer(this.overLayers.circles);
    }
  }
};
</script>

<style scoped></style>
