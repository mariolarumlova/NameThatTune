<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="space-around">
      <v-col align="center" justify="space-around">
        <div class="text-h4 pa-4">
          Choose playlist
        </div>
        <div class="text-body-1 pa-4">
          <v-btn @click.prevent="setPlaylist()">Click me</v-btn>
        </div>
      </v-col>
    </v-row>
    <v-card class="mx-auto" max-width="300" tile>
      <v-progress-circular v-if="loading"></v-progress-circular>
      <v-list v-else rounded>
        <v-subheader>My playlists:</v-subheader>
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
    console.log(this.items);
    this.loading = false;
  },
  methods: {
    setPlaylist() {
      this.$emit("playlistChosen", selectedItem);
    },
    getPlaylists: function() {
      return new Promise((resolve, reject) => {
        gapi.client.youtube.playlists
          .list({
            part: ["snippet,contentDetails"],
            maxResults: 25,
            mine: true
          })
          .then(
            function(response) {
              console.log("Response", response);
              const items = response.result.items.map(playlist => {
                return {
                  title: playlist.snippet.title,
                  avatar: playlist.snippet.thumbnails.default
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
