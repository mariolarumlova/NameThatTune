<template>
  <v-card class="mx-auto" tile>
    <v-progress-circular v-if="loading"></v-progress-circular>
    <v-list v-else rounded>
      <v-subheader>My youtube playlists:</v-subheader>
      <v-list-item-group v-model="selectedItem" color="orange darken-2">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          @click.prevent="setPlaylistItems(item)"
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
  </v-card>
</template>

<script>
/* eslint-disable no-undef */
import { getPlaylists, getPlaylistItems } from "@/repositories/youtube";
import { authenticate, loadClient } from "@/repositories/google";
export default {
  props: {
    gameMode: String
  },
  data() {
    return {
      loading: false,
      selectedItem: { title: "", icon: "" }, //TODO Do we need it?
      items: []
    };
  },
  async created() {
    this.loading = true;
    if (!gapi.client) {
      await authenticate(gapi, [
        "https://www.googleapis.com/auth/youtube.readonly"
      ]);
      await loadClient(gapi, "youtube", "v3");
    }
    this.items = await this.getPlaylists();
    this.loading = false;
  },
  methods: {
    async setPlaylistItems(selectedPlaylist) {
      const playlistItems = await this.getPlaylistItems(selectedPlaylist.id);
      this.$emit("youtubePlaylistChosen", {
        id: selectedPlaylist.id,
        title: selectedPlaylist.title,
        avatar: selectedPlaylist.avatar,
        items: playlistItems,
        customPlaylist: false
      });
    },
    getPlaylists: function() {
      return getPlaylists(gapi);
    },
    getPlaylistItems: function(playlistId) {
      return getPlaylistItems(gapi, playlistId, this.gameMode);
    }
  }
};
</script>
