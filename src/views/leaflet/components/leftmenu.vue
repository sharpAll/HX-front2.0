<template>
  <div class="g-sd">
    <div id="menu" class="m-menu f-usn">
      <ul class="f-cb">
        <router-link active-class="crt" tag="li" to="/leaflet/circles">
          <a>地理与固定纬度</a>
        </router-link>
        <router-link active-class="crt" tag="li" to="/leaflet/picpoints">
          <a>添加标记属性</a>
        </router-link>
        <router-link active-class="crt" tag="li" to="/leaflet/templateinfo">
          <a>悬浮与弹出信息框</a>
        </router-link>
        <router-link active-class="crt" tag="li" to="/leaflet/routelevel">
          <a>轨迹电平模型</a>
        </router-link>
        <router-link active-class="crt" tag="li" to="/leaflet/routeline">
          <a>路测轨迹模型</a>
        </router-link>
        <router-link active-class="crt" tag="li" to="/leaflet/firingline">
          <a>射向线模型</a>
        </router-link>
        <router-link active-class="crt" tag="li" to="/leaflet/zoom">
          <a>监听图层变化</a>
        </router-link>
        <router-link active-class="crt" tag="li" to="/leaflet/heatmap">
          <a>热力图</a>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},

  methods: {}
};
</script>

<style scoped></style>
