<template>
  <div class="g-nv f-usn">
    <div class="g-in">
      <ul class="m-nav" id="nav">
        <router-link to="/leaflet" class="first" active-class="crt" tag="li"
          ><a>leaflet</a><i></i
        ></router-link>
        <router-link to="/wireless" active-class="crt" tag="li"
          ><a>wireless</a><i></i
        ></router-link>
        <router-link to="/special" active-class="crt" tag="li"
          ><a>special</a><i></i
        ></router-link>
        <router-link to="/threejs" active-class="crt" tag="li"
          ><a>threejs</a><i></i
        ></router-link>
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

<style scoped lang="scss"></style>
