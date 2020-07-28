import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/components/Layout.vue";

import Leaflet from "@/views/leaflet";
import LeafletCircles from "@/views/leaflet/circles.vue";
import LeafletPicpoints from "@/views/leaflet/picpoints.vue";
import LeafletTemplateinfo from "@/views/leaflet/templateinfo.vue";
import LeafletRoutelevel from "@/views/leaflet/routelevel.vue";
import LeafletRouteline from "@/views/leaflet/routeline.vue";
import LeafletFiringline from "@/views/leaflet/firingline.vue";
import LeafletZoom from "@/views/leaflet/zoom.vue";
import LeafletHeatmap from "@/views/leaflet/heatmap.vue";
import LeafletDraw from "@/views/leaflet/draw.vue";

import WirelessFscan from "@/views/wireless/fscan.vue";
import WirelessSingle from "@/views/wireless/single.vue";

import Wireless from "@/views/wireless";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "layout",
    component: Layout,
    redirect: "/leaflet",
    children: [
      {
        path: "/leaflet",
        component: Leaflet,
        name: "/leaflet",
        redirect: "/leaflet/circles",
        children: [
          {
            path: "/leaflet/circles",
            component: LeafletCircles,
            name: "/leaflet/circles",
            meta: { title: "地理与固定纬度" }
          },
          {
            path: "/leaflet/picpoints",
            component: LeafletPicpoints,
            name: "/leaflet/picpoints",
            meta: { title: "添加标记属性" }
          },
          {
            path: "/leaflet/templateinfo",
            component: LeafletTemplateinfo,
            name: "/leaflet/templateinfo",
            meta: { title: "悬浮与弹出信息框" }
          },
          {
            path: "/leaflet/routelevel",
            component: LeafletRoutelevel,
            name: "/leaflet/routelevel",
            meta: { title: "轨迹电平模型" }
          },
          {
            path: "/leaflet/routeline",
            component: LeafletRouteline,
            name: "/leaflet/routeline",
            meta: { title: "路测轨迹模型" }
          },
          {
            path: "/leaflet/firingline",
            component: LeafletFiringline,
            name: "/leaflet/firingline",
            meta: { title: "射向线模型" }
          },
          {
            path: "/leaflet/zoom",
            component: LeafletZoom,
            name: "/leaflet/zoom",
            meta: { title: "监听图层变化" }
          },
          {
            path: "/leaflet/heatmap",
            component: LeafletHeatmap,
            name: "/leaflet/heatmap",
            meta: { title: "热力图" }
          },
          {
            path: "/leaflet/draw",
            component: LeafletDraw,
            name: "/leaflet/draw",
            meta: { title: "图形绘制" }
          }
        ]
      },
      {
        path: "/wireless",
        component: Wireless,
        name: "/wireless",
        redirect: "/wireless/fscan",
        children: [
          {
            path: "/wireless/fscan",
            component: WirelessFscan,
            name: "/wireless/fscan",
            meta: { title: "频率电平图" }
          },
          {
            path: "/wireless/single",
            component: WirelessSingle,
            name: "/wireless/single",
            meta: { title: "单频电平图" }
          }
        ]
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
