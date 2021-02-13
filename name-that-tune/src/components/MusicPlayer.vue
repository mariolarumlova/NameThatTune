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
    randomStartTime: Boolean,
    playTimeSec: String
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    getVideoUrl: function() {
      let url = `https://www.youtube.com/embed/${this.videoDetails.id}?autoplay=1&rel=0&disablekb=1`;
      let startTimeSec = 0;
      if (this.randomStartTime) {
        startTimeSec = this.getStartTimeSec(
          this.videoDetails.duration,
          this.playTimeSec || 30
        );
      }
      url += `&start=${startTimeSec}`;
      if (this.playTimeSec) {
        const endTime = parseInt(startTimeSec) + parseInt(this.playTimeSec);
        url += endTime ? `&end=${endTime}` : "";
      }
      console.log(url);
      return url;
    },
    getStartTimeSec: function(trackDuration, answerTime) {
      const maxStartTime = trackDuration - answerTime;
      return this.getRandomIntInclusive(maxStartTime > 0 ? maxStartTime : 0);
    },
    getRandomIntInclusive: function(max) {
      max = Math.floor(max);
      return Math.floor(Math.random() * (max + 1));
    }
  }
};
</script>
