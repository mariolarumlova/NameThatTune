<template>
  <div>
    <v-container v-if="playlistItems" fill-height fluid>
      <v-row align="center" justify="space-around">
        <v-col align="center" justify="space-around">
          <div class="text-h4 pa-4">
            Tournament mode
          </div>
          <div v-if="!tournamentComplete" class="text-body-1 pa-4">
            <MusicPlayer
              :key="index"
              customStyle="display: none"
              :videoDetails="currentPiece"
              startTimeSec="10"
              playTimeSec="60"
            />
            <v-btn @click.prevent="checkPiece()">Check</v-btn>
            <br />
            Result: {{ result }} <br />
            Index: {{ index }} <br />
            Tournament complete: {{ tournamentComplete }} <br />

            <div class="halfwidth-wrapper">
              <v-select
                :items="pieces"
                label="Choose the piece"
                solo
                v-model="selected"
              ></v-select>
              <div v-if="selected.multipart">
                <v-select
                  :items="selected.parts"
                  label="Choose the part"
                  solo
                  v-model="selectedPart"
                ></v-select>
                Selected: {{ selectedPart }}
              </div>
            </div>
          </div>
          <div v-else class="text-body-1 pa-4">
            Tournament complete. Your score is {{ correctAnswersNo }} out of {{ playlistItems.length }}
          </div>
        </v-col>
      </v-row>
    </v-container>
    <PlaylistChooser v-else @playlistChosen="setPlaylist($event)" />
  </div>
</template>

<script>
import PlaylistChooser from "@/components/YTPlaylistChooser";
import MusicPlayer from "@/components/MusicPlayer";
export default {
  props: {
    piece: Object
  },
  components: {
    MusicPlayer,
    PlaylistChooser
  },
  methods: {
    checkPiece: function() {
      this.result = this.selected.title === this.currentPiece.title;
      this.correctAnswersNo = this.result
        ? this.correctAnswersNo + 1
        : this.correctAnswersNo;
      this.index += 1;
      if (this.index < this.playlistItems.length) {
        this.currentPiece = this.playlistItems[this.index];
      } else {
        this.tournamentComplete = true;
      }
    },
    setPlaylist: function(event) {
      this.pieces =
        event && event.length
          ? event.map(item => {
              return {
                text: item.title,
                value: item
              };
            })
          : [];
      this.playlistItems = this.shuffle(event);
      this.index = 0;
      this.currentPiece = this.playlistItems[this.index];
      this.tournamentComplete = false;
      this.correctAnswersNo = 0;
    },
    shuffle: function(inputArray) {
      const array = JSON.parse(JSON.stringify(inputArray));
      let m = array.length;
      let t, i;
      while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }
      return array;
    }
  },
  data() {
    return {
      pieces: [],
      playlistItems: null,
      selected: "",
      selectedPart: "",
      result: "",
      index: 0,
      currentPiece: {},
      tournamentComplete: false,
      correctAnswersNo: 0
    };
  }
};
</script>
