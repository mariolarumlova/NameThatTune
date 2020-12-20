<template>
  <v-container fill-height fluid>
    <v-card class="mx-auto" max-width="300" tile>
      <v-progress-circular v-if="loading"></v-progress-circular>
      <v-list v-else rounded>
        <v-subheader>Choose piece:</v-subheader>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item v-for="(item, i) in items" :key="i">
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
export default {
  props: {
    playlistId: String
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
    this.items = await this.getPlaylistItems(this.playlistId);
    this.loading = false;
  },
  methods: {
    getPlaylistItems: function(playlistId) {
      return new Promise((resolve, reject) => {
        gapi.client.youtube.playlistItems
          .list({
            part: ["id,status,snippet,contentDetails"],
            playlistId: playlistId
          })
          .then(
            function(response) {
              console.log("Response", response);
              const items = response.result.items.map(piece => {
                return {
                  title: piece.snippet.title,
                  avatar: piece.snippet.thumbnails.default
                };
              });
              resolve(items);
            },
            function(err) {
              console.error("Execute error", err);
              resolve([]);
            }
          );
      });
    }
  }
};
</script>
