<template>
  <v-container fill-height fluid>
    <v-card class="mx-auto" max-width="300" tile>
      <v-progress-circular v-if="loading"></v-progress-circular>
      {{ videoDetails }}
      <!-- add player here -->
    </v-card>
  </v-container>
</template>

<script>
/* eslint-disable no-undef */
export default {
  props: {
    videoDetails: Object
  },
  data() {
    return {
      loading: false
    };
  }
};
</script>
