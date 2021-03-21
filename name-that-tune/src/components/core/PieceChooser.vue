<template>
  <v-container fill-height fluid>
    <v-progress-circular v-if="loading"></v-progress-circular>
    <v-card v-else class="mx-auto" tile>
      <v-list rounded>
        <v-subheader>Choose piece:</v-subheader>
        <v-list-item-group
          v-model="selectedItems"
          color="orange darken-2"
          :multiple="multiple"
        >
          <v-list-item v-for="(item, i) in playlistItems" :key="i">
            <v-list-item-avatar v-if="item.avatar">
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-action v-if="!multiple">
              <v-icon @click="setPiece(item)">
                mdi-pencil
              </v-icon>
            </v-list-item-action>
            <v-list-item-action v-if="!multiple">
              <v-icon
                :disabled="playlistItems.length <= 1"
                @click="deletePiece(item)"
              >
                mdi-delete
              </v-icon>
            </v-list-item-action>
            <v-list-item-action v-if="!multiple">
              <v-icon v-if="item.includedInTournament" color="green darken-2">
                mdi-check
              </v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-btn
        v-if="multiple"
        color="orange darken-2"
        class="ma-2 white--text"
        @click.prevent="setPieces()"
      >
        Accept
      </v-btn>
      <DeleteConfirmator
        v-if="pieceToDelete"
        :key="refreshDeleteConfirmator"
        :itemToDelete="pieceToDelete"
        :deleteFunc="deleteFunc"
        @itemDeleted="onPieceDeleted()"
        confirmationMessage="Are you sure you want to delete this item with all the notes and piece parts?"
      />
    </v-card>
  </v-container>
</template>

<script>
/* eslint-disable no-undef */
import DeleteConfirmator from "@/components/utils/DeleteConfirmator";
import { deletePiece } from "@/business/training";
export default {
  props: {
    playlistItemsParam: Array,
    multiple: Boolean
  },
  components: {
    DeleteConfirmator
  },
  created() {
    this.selectedItems = this.multiple ? [] : {};
  },
  data() {
    return {
      loading: false,
      selectedItems: { title: "", icon: "" },
      playlistItems: this.playlistItemsParam,
      pieceToDelete: null,
      deleteFunc: deletePiece,
      refreshDeleteConfirmator: 0
    };
  },
  methods: {
    setPiece(selectedItem) {
      this.$emit("pieceChosen", selectedItem);
    },
    setPieces() {
      const selectedItems = this.selectedItems.map(
        el => this.playlistItems[el]
      );
      this.$emit("piecesChosen", selectedItems);
    },
    deletePiece(selectedPiece) {
      this.pieceToDelete = selectedPiece;
      this.refreshDeleteConfirmator++;
    },
    onPieceDeleted() {
      const indexToDelete = this.playlistItems.indexOf(this.pieceToDelete);
      this.playlistItems.splice(indexToDelete, 1);
      this.pieceToDelete = null;
    }
  }
};
</script>
