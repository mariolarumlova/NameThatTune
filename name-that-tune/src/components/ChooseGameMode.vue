<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="space-around">
      <v-col align="center" justify="space-around">
        <div class="text-h4 pa-4">
          Hello, {{ clientName }}! Choose game mode
        </div>
        <v-btn class="ma-8" elevation="2" outlined large to="training"
          >Training</v-btn
        >
        <v-btn class="ma-8" elevation="2" outlined large to="tournament"
          >Tournament</v-btn
        >
      </v-col>

      <v-btn
        color="orange darken-2"
        class="ma-2 white--text"
        @click.prevent="execute()"
      >
        Execute
        <v-icon left color="orange darken-2">mdi-google</v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable no-undef */
export default {
  data() {
    return {
      clientName: this.$store.state.loginUser.google.wt.Ad,
    };
  },
  methods: {
    execute: function() {
      return gapi.client.youtube.playlists
        .list({
          part: ["snippet,contentDetails"],
          maxResults: 25,
          mine: true,
        })
        .then(
          function(response) {
            // Handle the results here (response.result has the parsed body).
            console.log("Response", response);
          },
          function(err) {
            console.error("Execute error", err);
          }
        );
    },
  }
};
</script>
