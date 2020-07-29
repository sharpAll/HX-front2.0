<template>
  <div class="g-sd">
    <div id="menu" class="m-menu f-usn">
      <ul class="f-cb">
        <router-link active-class="crt" tag="li" to="/wireless/fscan">
          <a>频率电平图</a>
        </router-link>
        <router-link active-class="crt" tag="li" to="/wireless/single">
          <a>单频电平图</a>
        </router-link>
        <router-link active-class="crt" tag="li" to="/wireless/falls">
          <a>瀑布图</a>
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
