<template>
  <v-card class="mx-md-auto mx-lg-auto mb-10" tile>
    <v-progress-circular v-if="loading"></v-progress-circular>
    <v-list v-else rounded class="justify-center">
      <v-subheader>My youtube playlists:</v-subheader>
      <v-subheader v-if="!items || !items.length"
        >There are no playlists in your YouTube account. <br />
        Create some and try again.</v-subheader
      >
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
import { authenticate } from "@/repositories/google";
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
      await authenticate(
        gapi,
        "https://www.googleapis.com/auth/youtube.readonly",
        "youtube/v3"
      );
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
      return getPlaylistItems(gapi, playlistId);
    }
  }
};
</script>
