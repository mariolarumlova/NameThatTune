<template>
  <v-container fill-height fluid>
    <v-progress-circular v-if="loading"></v-progress-circular>
    <v-card v-else class="mx-auto" tile>
      <v-list rounded>
        <v-subheader>Choose piece:</v-subheader>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item
            v-for="(item, i) in playlistItemsComputed"
            :key="i"
            @click.prevent="setPiece(item)"
          >
            <v-list-item-avatar v-if="item.avatar">
              <v-img :src="item.avatar.url"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
/* eslint-disable no-undef */
export default {
  props: {
    playlistItems: Array
  },
  data() {
    return {
      loading: false,
      selectedItem: { title: "", icon: "" }
    };
  },
  methods: {
    setPiece(selectedItem) {
      this.$emit("pieceChosen", selectedItem);
    }
  },
  computed: {
    playlistItemsComputed() {
      return this.playlistItems;
    }
  }
};
</script>
