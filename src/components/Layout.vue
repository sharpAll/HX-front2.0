<template>
  <div>
    <!-- 头部区域 -->
    <app-header></app-header>
    <!-- 右侧主区域 -->
    <app-main></app-main>
  </div>
</template>

<script>
import AppHeader from "./AppHeader";
import AppMain from "./AppMain";
export default {
  data() {
    return {};
  },

  components: { AppHeader, AppMain },

  methods: {}
};
</script>

<style scoped lang="scss"></style>
