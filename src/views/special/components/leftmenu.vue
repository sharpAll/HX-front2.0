<template>
  <div class="g-sd">
    <div id="menu" class="m-menu f-usn">
      <ul class="f-cb">
        <router-link active-class="crt" tag="li" to="/special/bigtable">
          <a>大数据表格</a>
        </router-link>
        <router-link active-class="crt" tag="li" to="/special/print">
          <a>分页打印</a>
        </router-link>
        <router-link active-class="crt" tag="li" to="/special/validator">
          <a>字段校验</a>
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
