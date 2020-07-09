<template>
  <div class="g-bd2">
    <div class="g-in">
      <left-menu></left-menu>
      <div class="g-mn">
        <div class="g-mnc">
          <div class="m-article">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeftMenu from "@/views/leaflet/components/leftmenu.vue";
export default {
  data() {
    return {};
  },

  components: { LeftMenu },

  methods: {}
};
</script>

<style scoped></style>
