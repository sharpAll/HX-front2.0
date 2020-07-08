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