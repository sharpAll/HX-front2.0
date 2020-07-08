import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "highlight.js/styles/arduino-light.css";
import "@/assets/style/common.css";
import "@/assets/style/index.css";
import "@/assets/style/map.css";
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
