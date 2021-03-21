<template>
  <v-card class="mx-auto" tile>
    <v-progress-circular v-if="loading"></v-progress-circular>
    <v-list v-else rounded>
      <v-subheader>My custom playlists:</v-subheader>
      <v-list-item-group v-model="selectedItem" color="orange darken-2">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          @click.prevent="
            gameMode === 'tournament' ? setPlaylistItems(item) : ''
          "
        >
          <v-list-item-avatar v-if="item.avatar">
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-action v-if="gameMode !== 'tournament'">
            <v-icon @click="setPlaylistItems(item)">
              mdi-pencil
            </v-icon>
          </v-list-item-action>
          <v-list-item-action v-if="gameMode !== 'tournament'">
            <v-icon @click="deletePlaylist(item)">
              mdi-delete
            </v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <DeleteConfirmator
      v-if="playlistToDelete"
      :key="refreshDeleteConfirmator"
      :itemToDelete="playlistToDelete"
      :deleteFunc="deleteFunc"
      @itemDeleted="onPlaylistDeleted()"
      confirmationMessage="Are you sure you want to delete this item with its musical pieces
          and all the notes and piece parts?"
    />
  </v-card>
</template>

<script>
/* eslint-disable no-undef */
import DeleteConfirmator from "@/components/utils/DeleteConfirmator";
import databaseFactory from "@/dataProvider/classes/Database";
import playlistFactory from "@/dataProvider/dto/Playlist";
import { getCustomPieces, deletePlaylist } from "@/business/training";
import { getPiecesWithParts } from "@/business/tournament";
export default {
  props: {
    gameMode: String,
    youtubeId: String
  },
  components: {
    DeleteConfirmator
  },
  data() {
    return {
      loading: false,
      selectedItem: { title: "", icon: "" },
      items: [],
      playlistToDelete: null,
      deleteFunc: deletePlaylist,
      refreshDeleteConfirmator: 0
    };
  },
  async created() {
    this.loading = true;
    this.items = await this.getPlaylists();
    this.loading = false;
  },
  methods: {
    deletePlaylist(selectedPlaylist) {
      this.playlistToDelete = selectedPlaylist;
      this.refreshDeleteConfirmator++;
    },
    onPlaylistDeleted() {
      const indexToDelete = this.items.indexOf(this.playlistToDelete);
      this.items.splice(indexToDelete, 1);
      this.playlistToDelete = null;
    },
    async setPlaylistItems(selectedPlaylist) {
      const playlistItems = await this.getPlaylistItems(selectedPlaylist.id);
      this.$emit("customPlaylistChosen", {
        id: selectedPlaylist.id,
        title: selectedPlaylist.title,
        avatar: selectedPlaylist.avatar,
        items: playlistItems,
        customPlaylist: true
      });
    },
    getPlaylists: async function() {
      let filters = [{ key: "ownerId", value: this.$store.state.uid }];
      if (this.youtubeId) {
        filters = [...filters, { key: "youtubeId", value: this.youtubeId }];
      }
      const result = await playlistFactory(databaseFactory()).query(filters);
      return result.data;
    },
    getPlaylistItems: function(playlistId) {
      return this.gameMode === "tournament"
        ? getPiecesWithParts(playlistId, true)
        : getCustomPieces(playlistId);
    }
  }
};
</script>
