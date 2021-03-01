<template>
  <div>
    <div v-if="pieceWithParts" :key="selectedPart.index">
      <MusicPlayer :videoDetails="selectedPart" />
      <div class="halfwidth-wrapper">
        <v-switch
          v-model="pieceWithParts.includedInTournament"
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
          placeholder="What do you think when you listen to this piece?"
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
        :defaultYoutubeId="pieceWithParts.parts[0].youtubeId"
        @piecePartsChanged="pieceWithParts.parts = $event"
        @previewChanged="selectedPart = $event"
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
    const piecePartsSorted = pieceParts.data.sort((a, b) => a.index - b.index);
    [this.selectedPart] = piecePartsSorted;
    this.pieceWithParts = {
      ...this.piece,
      parts: piecePartsSorted
    };
  }
};
</script>
