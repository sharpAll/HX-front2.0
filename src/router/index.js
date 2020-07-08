import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/components/Layout.vue";

import Leaflet from "@/views/leaflet";
import LeafletCircles from "@/views/leaflet/circles.vue";
import LeafletPicpoints from "@/views/leaflet/picpoints.vue";

import Wireless from "@/views/wireless"
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
        children: [{
          path: "/leaflet/circles",
          component: LeafletCircles,
          name: "/leaflet/circles",
          meta: { title: "地理与固定纬度" }
        },{
          path: "/leaflet/picpoints",
          component: LeafletPicpoints,
          name: "/leaflet/picpoints",
          meta: { title: "添加标记属性" }
        }]
      },
      {
        path: "/wireless",
        component: Wireless,
        name: "/wireless",
      }
    ]
  },
];

const router = new VueRouter({
  routes
});

export default router;
