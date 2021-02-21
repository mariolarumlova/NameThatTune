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
        <PieceParts
          v-if="pieceWithParts.multipart"
          :piecePartsInput="pieceWithParts.parts"
        />
      </div>
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
  // computed: {
  //   message() {
  //     return this.pieceWithParts ? this.pieceWithParts.notes : "";
  //   },
  //   includeInTournament() {
  //     return this.pieceWithParts ? this.pieceWithParts.includeInTournament : false;
  //   },
  //   multipart() {
  //     return this.pieceWithParts ? this.pieceWithParts.multipart : false;
  //   },
  //   partsInThisVideoAllowed() {
  //     return this.pieceWithParts ? this.pieceWithParts.partsInThisVideoAllowed : false;
  //   },
  //   partsInAnotherVideosAllowed() {
  //     return this.pieceWithParts ? this.pieceWithParts.partsInAnotherVideosAllowed : false;
  //   },
  //   parts() {
  //     return this.pieceWithParts ? this.pieceWithParts.parts : [];
  //   }
  // },
  methods: {},
  created: async function() {
    const piecePartsTable = piecePartsFactory(databaseFactory());
    const pieceParts = await piecePartsTable.query([
      { key: "musicalPieceId", value: this.piece.id }
    ]);
    console.log("===PIECE PARTS===");
    console.log(pieceParts);
    this.selectedPart = pieceParts.isSuccessful ? pieceParts.data[0] : null;
    this.pieceWithParts = {
      ...this.piece,
      parts: pieceParts.data
    };
    console.log("===PIECE===");
    console.log(this.pieceWithParts);
  }
};
</script>
