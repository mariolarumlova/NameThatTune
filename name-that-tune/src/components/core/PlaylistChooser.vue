<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="space-around">
      <v-col align="center" justify="space-around">
        <div class="text-h4 pa-4">
          Choose playlist
        </div>
      </v-col>
    </v-row>
    <v-row align="center" justify="space-around">
      <v-col align="center" justify="space-around">
        <v-container fill-height fluid v-if="!selectedItem">
          <YoutubePlaylists
            @youtubePlaylistChosen="youtubePlaylistChosen($event)"
          />
          <br />
          <CustomPlaylists
            :gameMode="gameMode"
            @customPlaylistChosen="customPlaylistChosen($event)"
          />
        </v-container>
        <v-container
          class="halfwidth-wrapper"
          fill-height
          fluid
          v-if="
            selectedItem && !selectedItem.customPlaylist && !creationPageVisible
          "
        >
          <v-btn
            color="orange darken-2"
            class="ma-2 ml-lg-16 ml-md-16 white--text"
            @click.prevent="createCustomPlaylist()"
          >
            Create a new custom playlist
          </v-btn>
          <CustomPlaylists
            :key="refreshIndex"
            :youtubeId="selectedItem.id"
            :gameMode="gameMode"
            @customPlaylistChosen="customPlaylistChosen($event)"
          />
        </v-container>
        <v-container
          class="halfwidth-wrapper"
          fill-height
          fluid
          v-if="creationPageVisible"
        >
          <div>
            Choose a name for your custom playlist
            <br />
            <v-text-field
              label="Title"
              :placeholder="selectedItem.title"
              outlined
              v-model="selectedItem.customTitle"
            ></v-text-field>
            <br />
            Choose pieces which you want to use
          </div>
          <PieceChooser
            :playlistItemsParam="selectedItem.items"
            :multiple="true"
            @piecesChosen="saveCustomPlaylistToDb($event)"
          />
        </v-container>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" timeout="2000">
      {{ snackbarMessage }}

      <template v-slot:action="{ attrs }">
        <v-btn :color="'red'" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
/* eslint-disable no-undef */
import YoutubePlaylists from "@/components/core/PlaylistChooserYoutube";
import CustomPlaylists from "@/components/core/PlaylistChooserCustom";
import PieceChooser from "@/components/core/PieceChooser";

import {
  addPlaylistToDatabase,
  addPlaylistItemsToDatabase
} from "@/business/training";

export default {
  props: {
    gameMode: String
  },
  components: {
    YoutubePlaylists,
    CustomPlaylists,
    PieceChooser
  },
  data() {
    return {
      loading: false,
      selectedItem: null,
      refreshIndex: 0,
      creationPageVisible: false,
      customTitle: null,
      snackbar: false,
      snackbarMessage: ""
    };
  },
  methods: {
    createCustomPlaylist() {
      this.creationPageVisible = true;
    },
    customPlaylistChosen(event) {
      this.selectedItem = event; //TODO Do we need it?
      this.$emit("playlistChosen", event);
    },
    async saveCustomPlaylistToDb(event) {
      if (event && event.length) {
        const customPlaylist = await addPlaylistToDatabase(
          this.$store.state.uid,
          this.selectedItem
        );
        const items = await addPlaylistItemsToDatabase(
          customPlaylist.id,
          event
        );
        this.$emit("playlistChosen", {
          ...customPlaylist,
          items: items
        });
      } else {
        this.snackbarMessage = "Cannot save an empty custom playlist";
        this.snackbar = true;
      }
    },
    youtubePlaylistChosen(event) {
      this.selectedItem = event;
      if (this.gameMode === "tournament") {
        this.$emit("playlistChosen", event);
      } else {
        this.refreshIndex++;
      }
    }
  }
};
</script>
