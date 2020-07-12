<template>
  <div>
    <h2 class="u-ttb2">射向线模型</h2>
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
    drawPicPoints() {
      this.overLayers.picpoints = L.layerGroup();
      const pointIcon = L.icon({
        iconUrl: require("../../assets/img/map/icon-lo.png"),
        iconSize: [22, 27]
      });
      L.marker([39.8, 98.27], { icon: pointIcon, data: { id: 1 } }).addTo(
        this.overLayers.picpoints
      );
      L.marker([39.8, 98.57], { icon: pointIcon, data: { id: 2 } }).addTo(
        this.overLayers.picpoints
      );
      this.map.addLayer(this.overLayers.picpoints);
      this.overLayers.picpoints.eachLayer(layer => {
        layer.on("click", e => {
          alert("id:" + e.target.options.data.id);
        });
        layer.on("mouseover", e => {
          e.target.setIcon(
            L.icon({
              iconUrl: require("../../assets/img/map/icon-lo-h.png"),
              iconSize: [25, 31]
            })
          );
        });
        layer.on("mouseout", e => {
          e.target.setIcon(
            L.icon({
              iconUrl: require("../../assets/img/map/icon-lo.png"),
              iconSize: [22, 27]
            })
          );
        });
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
import "leaflet/dist/leaflet.css";
export default {
  data() {
    return {
      map: null,
      overLayers: {
        picpoints: null,
        firinglines: null
      },
      positions: [
        [39.8, 98.27],
        [39.8, 98.57]
      ],
      firingLen: 0.2
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
      const baseLayer = L.tileLayer(
        "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}"
      );
      this.map.addLayer(baseLayer);
      this.drawPicPoints();
      this.createFiringline();
    },
    drawPicPoints() {
      this.overLayers.picpoints = L.layerGroup();
      const pointIcon = L.icon({
        iconUrl: require("../../assets/img/map/icon-lo.png"),
        iconSize: [22, 27]
      });
      L.marker(this.positions[0], { icon: pointIcon, data: { id: 0 } }).addTo(
        this.overLayers.picpoints
      );
      L.marker(this.positions[1], { icon: pointIcon, data: { id: 1 } }).addTo(
        this.overLayers.picpoints
      );
      this.map.addLayer(this.overLayers.picpoints);
      this.overLayers.picpoints.eachLayer(layer => {
        layer.on("click", e => {
          alert("id:" + e.target.options.data.id);
        });
      });
    },
    createFiringline() {
      this.overLayers.firinglines = L.layerGroup();
      this.map.addLayer(this.overLayers.firinglines);
      setInterval(() => {
        var fId = parseInt((Math.random() * 10) % 2);
        var angle = parseInt(Math.random() * 360);
        this.drawFiringline(fId, angle);
      }, 200);
    },
    drawFiringline(fId, angle) {
      this.overLayers.firinglines.eachLayer(layer => {
        if (layer) {
          if (layer.options.data.id == fId) {
            this.overLayers.firinglines.removeLayer(layer);
          }
        }
      });
      var locArray = this.positions[fId];
      var locArray_1 = [];
      locArray_1.push(
        Number(locArray[0]) + Math.cos((angle * Math.PI) / 180) * this.firingLen
      );
      locArray_1.push(
        Number(locArray[1]) + Math.sin((angle * Math.PI) / 180) * this.firingLen
      );
      L.polyline([locArray, locArray_1], {
        color: "blue",
        data: { id: fId }
      }).addTo(this.overLayers.firinglines);
    }
  }
};
</script>

<style scoped></style>
