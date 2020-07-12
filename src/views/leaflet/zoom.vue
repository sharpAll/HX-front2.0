<template>
  <div>
    <h2 class="u-ttb2">监听图层变化</h2>
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
    initZoom() {
      this.overLayers.citys = L.layerGroup();
      this.map.addLayer(this.overLayers.citys);
      this.cityLayerInit(this.map.getZoom());
      this.map.on("zoomend", e => {
        this.cityLayerInit(e.target._zoom);
      });
    },
    cityLayerInit(zoomIndex) {
      this.overLayers.citys.clearLayers();
      if (zoomIndex > 7) {
        for (const temp in this.STATION_AREA_DATA) {
          if (temp != "620000") {
            const myIcon = L.divIcon({
              html: this.STATION_AREA_DATA[temp].name,
              className: "city-div-icon",
              iconSize: 90
            });
            L.marker(this.STATION_AREA_DATA[temp].location, {
              icon: myIcon
            }).addTo(this.overLayers.citys);
          }
        }
      } else {
        const myIcon = L.divIcon({
          html: this.STATION_AREA_DATA["620000"].name,
          className: "city-div-icon",
          iconSize: 90
        });
        L.marker(this.STATION_AREA_DATA["620000"].location, {
          icon: myIcon
        }).addTo(this.overLayers.citys);
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
        citys: null
      },
      STATION_AREA_DATA: {
        "620000": {
          location: [36.03, 103.73],
          name: "甘肃省"
        },
        "620202": {
          location: [39.8, 98.27],
          name: "嘉峪关市"
        },
        "620900": {
          location: [39.71, 98.5],
          name: "酒泉市"
        }
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
      this.initZoom();
    },
    initZoom() {
      this.overLayers.citys = L.layerGroup();
      this.map.addLayer(this.overLayers.citys);
      this.cityLayerInit(this.map.getZoom());
      this.map.on("zoomend", e => {
        this.cityLayerInit(e.target._zoom);
      });
    },
    cityLayerInit(zoomIndex) {
      this.overLayers.citys.clearLayers();
      if (zoomIndex > 7) {
        for (const temp in this.STATION_AREA_DATA) {
          if (temp != "620000") {
            const myIcon = L.divIcon({
              html: this.STATION_AREA_DATA[temp].name,
              className: "city-div-icon",
              iconSize: 90
            });
            L.marker(this.STATION_AREA_DATA[temp].location, {
              icon: myIcon
            }).addTo(this.overLayers.citys);
          }
        }
      } else {
        const myIcon = L.divIcon({
          html: this.STATION_AREA_DATA["620000"].name,
          className: "city-div-icon",
          iconSize: 90
        });
        L.marker(this.STATION_AREA_DATA["620000"].location, {
          icon: myIcon
        }).addTo(this.overLayers.citys);
      }
    }
  }
};
</script>

<style lang="scss">
#map {
  .city-div-icon {
    color: #fff;
    font-size: 16px;
    background: rgba(151, 156, 252, 0.8);
    text-align: center;
    line-height: 90px;
    border-radius: 100%;
    &:hover {
      background: rgba(252, 149, 175, 0.8);
    }
  }
}
</style>
