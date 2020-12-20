<template>
  <v-container fill-height fluid>
    <v-progress-circular v-if="loading"></v-progress-circular>
    <v-card v-else class="mx-auto" tile>
      {{ playlistItems }}
    </v-card>
  </v-container>
</template>

<script>
/* eslint-disable no-undef */
export default {
  props: {
    playlistItems: Array
  },
  data() {
    return {
      loading: false,
      selectedItem: { title: "", icon: "" }
    };
  }
};
</script>
