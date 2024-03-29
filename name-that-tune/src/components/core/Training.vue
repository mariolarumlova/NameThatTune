<template>
  <div>
    <v-container v-if="playlistItems" fill-height fluid>
      <v-row align="center" justify="space-around">
        <v-col align="center" justify="space-around">
          <div class="text-h4 pa-4">
            Training mode
          </div>
          <div v-if="piece" class="text-body-1 pa-4">
            <PieceDetails
              :piece="piece"
              @save="savePiece($event)"
              @cancel="clearPiece()"
            />
          </div>
          <div v-else>
            <PieceChooser
              :playlistItemsParam="playlistItems"
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
    <v-snackbar v-model="snackbar" timeout="2000">
      {{
        success
          ? "Piece saved successfully"
          : "Cannot save a piece. Check whether you have at least one piece part and all the youtube ids are correct."
      }}

      <template v-slot:action="{ attrs }">
        <v-btn
          :color="success ? 'green' : 'red'"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import PlaylistChooser from "@/components/core/PlaylistChooser";
import PieceChooser from "@/components/core/PieceChooser";
import PieceDetails from "@/components/core/PieceDetails";
import { updateMusicalPiece, isMusicalPieceValid } from "@/business/training";
export default {
  props: {
    playlistItems: Array,
    piece: Object
  },
  components: {
    PlaylistChooser,
    PieceChooser,
    PieceDetails
  },
  data() {
    return {
      snackbar: false,
      success: false
    };
  },
  methods: {
    clearPiece: function() {
      this.piece = null;
    },
    clearPlaylist: function() {
      this.playlistItems = null;
    },
    setPiece: function(event) {
      this.piece = event;
    },
    savePiece: async function(event) {
      if (isMusicalPieceValid(event)) {
        const result = await updateMusicalPiece(event);
        this.success = result;
      } else {
        this.success = false;
      }
      this.snackbar = true;
      if (this.success) {
        this.clearPiece();
      }
    }
  }
};
</script>
