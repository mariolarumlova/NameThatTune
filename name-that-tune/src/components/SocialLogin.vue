<template>
  <div>
    <v-btn
      color="orange darken-2"
      class="ma-2 white--text"
      @click.prevent="authenticate()"
    >
      Sign in with Google
      <v-icon left color="orange darken-2">mdi-google</v-icon>
    </v-btn>
    <v-btn
      color="orange darken-2"
      class="ma-2 white--text"
      @click.prevent="execute()"
    >
      Execute
      <v-icon left color="orange darken-2">mdi-google</v-icon>
    </v-btn>
  </div>
</template>

<script>
/* eslint-disable*/

import router from "@/router/router";
// import getGoogleAuthObject from "@/middleware/googleApiConnector";

export default {
  methods: {
    async authenticate() {
      await gapi.load("client:auth2");
      await gapi.auth2.init({ client_id: process.env.VUE_APP_CLIENT_ID });
      const googleUser = await gapi.auth2
        .getAuthInstance()
        .signIn({
          scope: "https://www.googleapis.com/auth/youtube.readonly",
        });
      console.log("Sign-in successful");
      console.log(googleUser);
      this.loadClient();
      const userInfo = {
          loginType: "google",
          google: googleUser,
        };
      this.$store.commit("setLoginUser", userInfo);
      router.push("/choosemode");
    },
    loadClient() {
      gapi.client.setApiKey(process.env.VUE_APP_YOUTUBE_API_KEY);
      return gapi.client
        .load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(
          function() {
            console.log("GAPI client loaded for API");
          },
          function(err) {
            console.error("Error loading GAPI client for API", err);
          }
        );
    },
    // Make sure the client is loaded and sign-in is complete before calling this method.
    execute() {
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

    // async logInViaGoogle() {
    //   try {
    //     // const googleAuthObject = await getGoogleAuthObject();
    //     const userInfo = {
    //       loginType: "google",
    //       google: googleUser,
    //     };
    //     this.$store.commit("setLoginUser", userInfo);
    //     router.push("/choosemode");
    //   } catch (err) {
    //     console.error(err);
    //   }
    // },
  },
};
</script>
