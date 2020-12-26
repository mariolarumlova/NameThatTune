<template>
  <div>
    <v-container v-if="playlistItems" fill-height fluid>
      <v-row align="center" justify="space-around">
        <v-col align="center" justify="space-around">
          <div class="text-h4 pa-4">
            Tournament mode
          </div>
          <div class="text-body-1 pa-4">
            Hello! You are in a tournament mode. This page is not fully
            implemented yet.
            <br />
            <MusicPlayer
              customStyle="display: none"
              :videoDetails="playlistItems[0]"
            />
            <v-btn @click.prevent="checkPiece()">Check</v-btn>
            <br />
            Result: {{ result }}
            <br />

            <div class="halfwidth-wrapper">
              <v-select
                :items="pieces"
                label="Choose the piece"
                solo
                v-model="selected"
              ></v-select>
              Selected: {{ selected }}
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
    playlistItems: Array,
    piece: Object
  },
  components: {
    MusicPlayer,
    PlaylistChooser
  },
  methods: {
    checkPiece: function() {
      this.result = this.selected.title === this.playlistItems[0].title;
    },
    setPlaylist: function(event) {
      this.playlistItems = event;
      this.pieces =
        event && event.length
          ? event.map(item => {
              return {
                text: item.title,
                value: item
              };
            })
          : [];
    }
  },
  data() {
    return {
      pieces: [],
      selected: "",
      selectedPart: "",
      result: ""
    };
  }
};
</script>
