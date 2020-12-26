<template>
  <v-container fill-height fluid>
    <div class="mx-auto text-h4 pa-4">
      <v-progress-circular v-if="loading"></v-progress-circular>
      {{ videoDetails.title }}
      <br />
      <iframe
        allow="autoplay"
        id="ytplayer"
        type="text/html"
        width="640"
        height="360"
        :src="videoUrl"
        frameborder="0"
      />
    </div>
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
      loading: false,
      videoUrl: `http://www.youtube.com/embed/${this.videoDetails.id}?autoplay=1&rel=0&start=10`
    };
  }
};
</script>
