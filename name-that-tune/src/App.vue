<template>
  <div id="app">
    <BaseContainer />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import BaseContainer from "./components/BaseContainer.vue";

export default Vue.extend({
  name: "App",

  components: {
    BaseContainer
  },

  data: () => ({
    //
  })
});
</script>
