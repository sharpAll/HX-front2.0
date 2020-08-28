<template>
  <div class="g-sd">
    <div id="menu" class="m-menu f-usn">
      <ul class="f-cb">
        <router-link active-class="crt" tag="li" to="/threejs/simple">
          <a>简单几何体</a>
        </router-link>
        <router-link active-class="crt" tag="li" to="/threejs/dae">
          <a>加载dae模型</a>
        </router-link>
        <router-link active-class="crt" tag="li" to="/threejs/click">
          <a>元素点击</a>
        </router-link>
        <router-link active-class="crt" tag="li" to="/threejs/hover">
          <a>元素悬浮</a>
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
