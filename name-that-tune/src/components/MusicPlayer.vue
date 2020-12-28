<template>
  <v-container fill-height fluid>
    <div class="mx-auto text-h4 pa-4" :style="customStyle">
      <v-progress-circular v-if="loading"></v-progress-circular>
      {{ videoDetails.title }}
      <br />
      <iframe
        allow="autoplay"
        id="ytplayer"
        type="text/html"
        width="640"
        height="360"
        :src="getVideoUrl()"
        frameborder="0"
      />
    </div>
  </v-container>
</template>

<script>
/* eslint-disable no-undef */
export default {
  props: {
    videoDetails: Object,
    customStyle: String,
    startTimeSec: Number,
    playTimeSec: Number
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    getVideoUrl: function() {
      let url = `http://www.youtube.com/embed/${this.videoDetails.id}?autoplay=1&rel=0&disablekb=1`;
      url += this.startTimeSec ? `&start=${this.startTimeSec}` : "";
      const endTime = parseInt(this.startTimeSec) + parseInt(this.playTimeSec);
      url += endTime ? `&end=${endTime}` : "";
      return url;
    }
  }
};
</script>
