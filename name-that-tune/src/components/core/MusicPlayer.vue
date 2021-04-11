<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="space-around">
      <v-col align="center" justify="space-around">
        <div class="mx-auto text-h4 pa-4" :style="customStyle">
          <v-progress-circular v-if="loading"></v-progress-circular>
          {{ videoDetails.title }}
          <br />
          <youtube
            :video-id="getVideoUrl()"
            :player-vars="playerVars"
            ref="youtube"
            @playing="playing"
            :fitParent="true"
          ></youtube>
        </div>
        <v-btn
          @click="playVideo"
          color="orange darken-3"
          :disabled="buttonDisabled"
          v-if="buttonVisible"
        >
          <v-icon color="white">mdi-play-circle-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>
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
    playTimeSec: String,
    buttonVisible: Boolean
  },
  data() {
    return {
      loading: false,
      buttonDisabled: false
    };
  },
  computed: {
    playerVars() {
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
      const endTime = this.playTimeSec
        ? parseInt(startTimeSec) + parseInt(this.playTimeSec)
        : this.videoDetails.currentPart
        ? this.videoDetails.currentPart.endTimeSec
        : this.videoDetails.endTimeSec || this.videoDetails.duration;
      return {
        start: startTimeSec,
        end: endTime
      };
    },
    player() {
      return this.$refs.youtube.player;
    }
  },
  methods: {
    playVideo() {
      this.player.playVideo();
      this.buttonDisabled = true;
    },
    playing() {
      // TODO: Add countdown
    },
    getVideoUrl: function() {
      const youtubeId = this.videoDetails.currentPart
        ? this.videoDetails.currentPart.youtubeId
        : this.videoDetails.youtubeId || this.videoDetails.id;
      return youtubeId;
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
