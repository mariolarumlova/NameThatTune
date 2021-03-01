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
          <v-list-item
            v-for="(item, i) in playlistItemsComputed"
            :key="i"
            @click.prevent="setPiece(item)"
          >
            <v-list-item-avatar v-if="item.avatar">
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
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
    </v-card>
  </v-container>
</template>

<script>
/* eslint-disable no-undef */
export default {
  props: {
    playlistItems: Array,
    multiple: Boolean
  },
  created() {
    this.selectedItems = this.multiple ? [] : {};
  },
  data() {
    return {
      loading: false,
      selectedItems: { title: "", icon: "" }
    };
  },
  methods: {
    setPiece(selectedItem) {
      if (!this.multiple) {
        this.$emit("pieceChosen", selectedItem);
      }
    },
    setPieces() {
      const selectedItems = this.selectedItems.map(
        el => this.playlistItems[el]
      );
      this.$emit("piecesChosen", selectedItems);
    }
  },
  computed: {
    playlistItemsComputed() {
      return this.playlistItems;
    }
  }
};
</script>
