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
import { getRandomIntInclusive } from "@/business/mathUtils";
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
      const youtubeId = this.videoDetails.currentPart
        ? this.videoDetails.currentPart.youtubeId
        : this.videoDetails.youtubeId || this.videoDetails.id;
      let url = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&disablekb=1`;
      let startTimeSec = this.videoDetails.currentPart
        ? this.videoDetails.currentPart.startTimeSec
        : this.videoDetails.startTimeSec || 0;
      if (this.randomStartTime) {
        startTimeSec = this.getStartTimeSec(
          startTimeSec,
          this.videoDetails.currentPart
            ? this.videoDetails.currentPart.endTimeSec
            : this.videoDetails.duration,
          this.playTimeSec || 30
        );
      }
      url += `&start=${startTimeSec}`;
      const endTime = this.playTimeSec
        ? parseInt(startTimeSec) + parseInt(this.playTimeSec)
        : this.videoDetails.currentPart
        ? this.videoDetails.currentPart.endTimeSec
        : this.videoDetails.endTimeSec || this.videoDetails.duration;
      url += endTime ? `&end=${endTime}` : "";
      console.log(url);
      return url;
    },
    getStartTimeSec: function(minStartTime, piecePartEndTime, answerTime) {
      const maxStartTime = piecePartEndTime - answerTime;
      return getRandomIntInclusive(
        minStartTime,
        maxStartTime > 0 ? maxStartTime : 0
      );
    }
  }
};
</script>
