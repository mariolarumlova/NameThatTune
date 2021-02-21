<template>
  <div>
    <div v-if="pieceWithParts" :key="selectedPart.index">
      <MusicPlayer :videoDetails="selectedPart" />
      <div class="halfwidth-wrapper">
        <v-switch
          v-model="pieceWithParts.includeInTournament"
          label="Include in tournaments"
          color="orange darken-3"
          hide-details
        ></v-switch>
        <br />
        Notes:
        <br />
        <v-textarea
          clearable
          solo
          v-model="pieceWithParts.notes"
          placeholder="Add multiple lines"
        ></v-textarea>
        <v-switch
          v-model="pieceWithParts.multipart"
          label="Multipart"
          color="orange darken-3"
          hide-details
        ></v-switch>
      </div>
      <PieceParts
        v-if="pieceWithParts.multipart"
        :piecePartsInput="pieceWithParts.parts"
        :defaultYoutubeId="pieceWithParts.youtubeId"
      />
      <v-btn class="ma-8" @click.prevent="$emit('save', pieceWithParts)"
        >Save</v-btn
      >
      <v-btn class="ma-8" @click.prevent="$emit('cancel')">Cancel</v-btn>
    </div>
    <v-progress-circular v-else></v-progress-circular>
  </div>
</template>

<script>
import MusicPlayer from "@/components/core/MusicPlayer";
import PieceParts from "@/components/core/PieceParts";
import databaseFactory from "@/dataProvider/classes/Database";
import piecePartsFactory from "@/dataProvider/dto/PiecePart";
export default {
  props: {
    piece: Object
  },
  components: {
    MusicPlayer,
    PieceParts
  },
  data() {
    return {
      pieceWithParts: null,
      selectedPart: null
    };
  },
  methods: {},
  created: async function() {
    const piecePartsTable = piecePartsFactory(databaseFactory());
    const pieceParts = await piecePartsTable.query([
      { key: "musicalPieceId", value: this.piece.id }
    ]);
    this.selectedPart = pieceParts.isSuccessful ? pieceParts.data[0] : null;
    this.pieceWithParts = {
      ...this.piece,
      parts: pieceParts.data
    };
  }
};
</script>
