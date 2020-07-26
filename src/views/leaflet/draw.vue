<template>
  <div>
    <h2 class="u-ttb2">图形绘制</h2>
    <div class="u-line">
      <span class="linea"></span>
      <span class="lineb"></span>
    </div>
    <dl>
      <dt>样例</dt>
      <div class="gis-map" id="map"></div>
      <dt>引用插件介绍</dt>
      <dd>
        <p>安装：npm i leaflet-draw</p>
        <p>引用:</p>
        <p>import "leaflet-draw/dist/leaflet.draw.css";</p>
        <p>import "leaflet-draw/dist/leaflet.draw.js";</p>
        <p>import localObj from "@/utils/leafletDrawLocal.js";</p>
      </dd>
      <dt>核心代码</dt>
      <dd>
        <pre>
          <code class="javascript hljs">
    drawInit() {
      L.drawLocal = localObj;
      this.draw.layer = new L.FeatureGroup();
      this.map.addLayer(this.draw.layer);
      this.draw.control = new L.Control.Draw({
        edit: {
          featureGroup: this.draw.layer
        },
        draw: {
          polygon: {
            showArea: true,
            showLength: true,
            metric: ["km", "m"]
          },
          rectangle: {
            showArea: true,
            metric: ["km", "m"]
          },
          marker: {
            icon: L.icon({
              iconUrl: require("../../assets/img/map/icon-lo.png"),
              iconSize: [22, 27],
              iconAnchor: [11, 27]
            })
          },
          circlemarker: false
        }
      });
      this.map.addControl(this.draw.control);

      this.map.on(L.Draw.Event.CREATED, event => {
        console.log(event);
        var layer = event.layer;
        this.draw.layer.addLayer(layer);
      });
      this.map.on(L.Draw.Event.DRAWSTOP, event => {
        console.log(event);
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
import config from "@/utils/leafletConfig.js";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw/dist/leaflet.draw.js";
import localObj from "@/utils/leafletDrawLocal.js";
export default {
  data() {
    return {
      map: null,
      baseLayers: {
        geoq: null,
        amap: null
      },
      draw: {
        layer: null,
        control: null
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
      this.drawInit();
    },
    drawInit() {
      L.drawLocal = localObj;
      this.draw.layer = new L.FeatureGroup();
      this.map.addLayer(this.draw.layer);
      this.draw.control = new L.Control.Draw({
        edit: {
          featureGroup: this.draw.layer
        },
        draw: {
          polyline: {
            shapeOptions: {
              weight: 2
            }
          },
          polygon: {
            showArea: true,
            showLength: true,
            metric: ["km", "m"],
            shapeOptions: {
              weight: 2
            }
          },
          rectangle: {
            showArea: true,
            metric: ["km", "m"],
            shapeOptions: {
              weight: 2
            }
          },
          circle: {
            shapeOptions: {
              weight: 2
            }
          },
          marker: {
            icon: L.icon({
              iconUrl: require("../../assets/img/map/icon-lo.png"),
              iconSize: [22, 27],
              iconAnchor: [11, 27]
            })
          },
          circlemarker: false
        }
      });
      this.map.addControl(this.draw.control);

      this.map.on(L.Draw.Event.CREATED, event => {
        console.log(event);
        var layer = event.layer;
        this.draw.layer.addLayer(layer);
      });
      this.map.on(L.Draw.Event.DRAWSTOP, event => {
        console.log(event);
      });
    }
  }
};
</script>

<style scoped lang="scss">
.m-article ul,
.m-article ol {
  padding-left: 0;
}
</style>
