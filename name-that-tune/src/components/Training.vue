<template>
  <div>
    <v-container v-if="playlistItems" fill-height fluid>
      <v-row align="center" justify="space-around">
        <v-col align="center" justify="space-around">
          <div class="text-h4 pa-4">
            Training mode
          </div>
          <div v-if="piece" class="text-body-1 pa-4">
            <MusicPlayer :videoDetails="piece" />
            Notes:
            <br />
            {{ message }}
            <div class="halfwidth-wrapper">
              <v-textarea
                clearable
                solo
                v-model="message"
                placeholder="Add multiple lines"
              ></v-textarea>
            </div>
          </div>
          <PieceChooser
            v-else
            :playlistItems="playlistItems"
            @pieceChosen="piece = $event"
          />
        </v-col>
      </v-row>
    </v-container>
    <PlaylistChooser v-else @playlistChosen="playlistItems = $event" />
  </div>
</template>

<script>
import PlaylistChooser from "@/components/YTPlaylistChooser";
import MusicPlayer from "@/components/TrainingMusicPlayer";
import PieceChooser from "@/components/YTPieceChooser";
export default {
  props: {
    playlistItems: Array,
    piece: Object
  },
  components: {
    MusicPlayer,
    PlaylistChooser,
    PieceChooser
  },
  data() {
    return {
      message: ""
    };
  }
};
</script>
