<template>
  <div class="halfwidth-wrapper">
    <v-switch
      :value="includeInTournament"
      color="orange darken-3"
      hide-details
      hint="Include in tournaments"
    ></v-switch>
    {{ includeInTournament }}
    <br />
    Notes:
    <br />
    <v-textarea
      clearable
      solo
      v-model="message"
      placeholder="Add multiple lines"
    ></v-textarea>
  </div>
</template>

<script>
export default {
  props: {
    piece: Object
  },
  computed: {
    message() {
      return this.piece ? this.piece.message : false;
    },
    includeInTournament() {
      return this.piece.includeInTournament || true;
    },
    multipart() {
      return this.piece ? this.piece.multipart : false;
    },
    partsInThisVideoAllowed() {
      return this.piece ? this.piece.partsInThisVideoAllowed : false;
    },
    partsInAnotherVideosAllowed() {
      return this.piece ? this.piece.partsInAnotherVideosAllowed : false;
    },
    partsInThisVideo() {
      return this.piece ? this.piece.partsInThisVideo : []; //here should be at least one piece
    },
    partsInAnotherVideo() {
      return this.piece ? this.piece.partsInAnotherVideo : [];
    }
  },
  methods: {}
};
</script>
