<template>
  <div>
    <h2 class="u-ttb2">悬浮与弹出信息框</h2>
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
        //以tooltip形式添加
        L.marker([39.8, 98.27], { icon: pointIcon, data: { id: 1 } })
        .bindTooltip(`&lt;span style='color:red'&gt;my tooltip text:${this.txtContent}&lt;/span&gt;`,{
          direction:"bottom",
          offset:[0,18]
        })
        .openTooltip()
        .addTo(this.overLayers.picpoints);
        //以popup形式添加
        L.marker([39.8, 98.57], { icon: pointIcon, data: { id: 2 } })
        .bindPopup(`<span style='color:blue'>my popup:${this.popContent}</span>`)
        .openPopup()
        .addTo(this.overLayers.picpoints);
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
        picpoints: null
      },
      txtContent: "this is tooltip",
      popContent: "this is popup"
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
    },
    drawPicPoints() {
      this.overLayers.picpoints = L.layerGroup();
      const pointIcon = L.icon({
        iconUrl: require("../../assets/img/map/icon-lo.png"),
        iconSize: [22, 27]
      });
      L.marker([39.8, 98.27], { icon: pointIcon, data: { id: 1 } })
        .bindTooltip(
          `<span style='color:red'>my tooltip text:${this.txtContent}</span>`,
          {
            direction: "bottom",
            offset: [0, 18]
          }
        )
        .openTooltip()
        .addTo(this.overLayers.picpoints);
      L.marker([39.8, 98.57], { icon: pointIcon, data: { id: 2 } })
        .bindPopup(
          `<span style='color:blue'>my popup:${this.popContent}</span>`
        )
        .openPopup()
        .addTo(this.overLayers.picpoints);

      this.map.addLayer(this.overLayers.picpoints);
      this.overLayers.picpoints.eachLayer(layer => {
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
  }
};
</script>

<style scoped></style>
