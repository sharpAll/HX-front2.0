<template>
  <div>
    <h2 class="u-ttb2">路测轨迹模型</h2>
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
    createPolyLine() {
      this.overLayers.routeLayer = L.layerGroup();
      this.overLayers.carLayer = L.layerGroup();
      this.map.addLayer(this.overLayers.routeLayer);
      this.map.addLayer(this.overLayers.carLayer);
      const pointIcon = L.icon({
        iconUrl: require("../../assets/img/map/carPoint.png"),
        iconSize: [26, 14]
      });
      this.map.setZoom(14);
      this.updatePolyLine(this.routeArray, pointIcon);
      setInterval(() => {
        var n = this.routeArray.length - 1;
        var temp = [];
        temp.push(this.routeArray[n][0] + 0.001);
        temp.push(this.routeArray[n][1] + 0.001);
        this.routeArray.push(temp);
        this.updatePolyLine(this.routeArray, pointIcon);
      }, 1000);
    }

    updatePolyLine(lineArr, pointIcon) {
      this.overLayers.routeLayer.clearLayers();
      this.overLayers.carLayer.clearLayers();
      var last = lineArr[lineArr.length - 1];
      this.map.panTo(last);
      L.polyline(lineArr, { color: "blue" }).addTo(this.overLayers.routeLayer);
      L.marker(last, { icon: pointIcon }).addTo(this.overLayers.carLayer);
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
        routeLayer: null,
        carLayer: null
      },
      routeArray: [[39.8, 98.27]]
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
      this.createPolyLine();
    },
    createPolyLine() {
      this.overLayers.routeLayer = L.layerGroup();
      this.overLayers.carLayer = L.layerGroup();
      this.map.addLayer(this.overLayers.routeLayer);
      this.map.addLayer(this.overLayers.carLayer);
      const pointIcon = L.icon({
        iconUrl: require("../../assets/img/map/carPoint.png"),
        iconSize: [26, 14]
      });
      this.map.setZoom(14);
      this.updatePolyLine(this.routeArray, pointIcon);
      setInterval(() => {
        var n = this.routeArray.length - 1;
        var temp = [];
        temp.push(this.routeArray[n][0] + 0.001);
        temp.push(this.routeArray[n][1] + 0.001);
        this.routeArray.push(temp);
        this.updatePolyLine(this.routeArray, pointIcon);
      }, 1000);
    },
    updatePolyLine(lineArr, pointIcon) {
      this.overLayers.routeLayer.clearLayers();
      this.overLayers.carLayer.clearLayers();
      var last = lineArr[lineArr.length - 1];
      this.map.panTo(last);
      L.polyline(lineArr, { color: "blue" }).addTo(this.overLayers.routeLayer);
      L.marker(last, { icon: pointIcon }).addTo(this.overLayers.carLayer);
    }
  }
};
</script>

<style scoped></style>
