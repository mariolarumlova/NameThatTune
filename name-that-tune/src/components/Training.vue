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
            <PieceDetails :piece="piece" />
            <v-btn class="ma-8" @click.prevent="clearPiece()">Save</v-btn>
            <v-btn class="ma-8" @click.prevent="clearPiece()"
              >Back to playlist</v-btn
            >
          </div>
          <div v-else>
            <PieceChooser
              :playlistItems="playlistItems"
              @pieceChosen="setPiece($event)"
            />
            <v-btn class="ma-8" @click.prevent="clearPlaylist()"
              >Back to playlists</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
    <PlaylistChooser v-else @playlistChosen="playlistItems = $event.items" />
  </div>
</template>

<script>
import PlaylistChooser from "@/components/PlaylistChooserYoutube";
import MusicPlayer from "@/components/MusicPlayer";
import PieceChooser from "@/components/PieceChooserYoutube";
import PieceDetails from "@/components/PieceDetails";
export default {
  props: {
    playlistItems: Array,
    piece: Object
  },
  components: {
    MusicPlayer,
    PlaylistChooser,
    PieceChooser,
    PieceDetails
  },
  computed: {},
  methods: {
    clearPiece: function() {
      this.piece = null;
    },
    clearPlaylist: function() {
      this.playlistItems = null;
    },
    setPiece: function(event) {
      this.piece = event;
    }
  }
};
</script>
