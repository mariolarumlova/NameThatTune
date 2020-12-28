<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="space-around">
      <v-col align="center" justify="space-around">
        <div class="text-h4 pa-4">
          Choose playlist
        </div>
      </v-col>
    </v-row>
    <v-card class="mx-auto" tile>
      <v-progress-circular v-if="loading"></v-progress-circular>
      <v-list v-else rounded>
        <v-subheader>My playlists:</v-subheader>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            @click.prevent="setPlaylistItems(item)"
          >
            <v-list-item-avatar>
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
import { getPlaylists, getPlaylistItems } from "@/repositories/youtube";
export default {
  props: {
    gameMode: String
  },
  data() {
    return {
      loading: false,
      selectedItem: { title: "", icon: "" },
      items: []
    };
  },
  async created() {
    this.loading = true;
    this.items = await this.getPlaylists();
    this.loading = false;
  },
  methods: {
    async setPlaylistItems(selectedPlaylist) {
      const playlistItems = await this.getPlaylistItems(selectedPlaylist.id);
      this.$emit("playlistChosen", playlistItems);
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
