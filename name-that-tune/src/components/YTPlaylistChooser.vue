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
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { parse, toSeconds } = require("iso8601-duration");
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
      return new Promise((resolve, reject) => {
        gapi.client.youtube.playlists
          .list({
            part: ["snippet,contentDetails"],
            mine: true
          })
          .then(
            function(response) {
              console.log("Response - user playlists", response);
              const items = response.result.items.map(playlist => {
                return {
                  id: playlist.id,
                  title: playlist.snippet.title,
                  avatar: playlist.snippet.thumbnails.default
                };
              });
              // if (this.gameMode === "tournament") {
              //   items = await this.getVideosWithDurations(items);
              // }
              resolve(items);
            },
            function(err) {
              console.error("Execute error", err);
              resolve([]);
            }
          );
      });
    },
    getPlaylistItems: function(playlistId) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        gapi.client.youtube.playlistItems
          .list({
            part: ["id,status,snippet,contentDetails"],
            playlistId: playlistId
          })
          .then(
            function(response) {
              console.log("Response - playlist items", response);
              const items = response.result.items.map(piece => {
                return {
                  id: piece.contentDetails.videoId,
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
    },
    getVideosWithDurations: function(videos) {
      const videoIds = videos.map(video => video.id).join(",");
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        gapi.client.youtube.playlistItems
          .list({
            part: ["contentDetails,snippet"],
            id: videoIds
          })
          .then(
            function(response) {
              console.log("Response - videos", response);
              const items = response.result.items.map(piece => {
                return {
                  id: piece.id,
                  title: piece.snippet.title,
                  avatar: piece.snippet.thumbnails.default,
                  duration: piece.contentDetails.duration
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
