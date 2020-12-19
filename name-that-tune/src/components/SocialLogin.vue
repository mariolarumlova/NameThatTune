<template>
  <div>
    <v-btn
      color="orange darken-2"
      class="ma-2 white--text"
      @click="loader = 'loading3'"
    >
      Sign in with Google
      <v-icon left color="orange darken-2">mdi-google</v-icon>
    </v-btn>
  </div>
</template>

<script>
/* eslint-disable*/

import router from "@/router/router";
import runSample from "@/middleware/listPlaylist";

export default {
  data() {
    return {
      /**
       * The Auth2 parameters, as seen on
       * https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams.
       * As the very least, a valid client_id must present.
       * @type {Object}
       */
      googleSignInParams: {
        client_id: process.env.VUE_APP_CLIENT_ID,
      },
    };
  },
  methods: {
    onSignInSuccess(googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      console.log(JSON.stringify(googleUser));
      listPlaylist({accessToken: googleUser.xc.access_token, apiKey: process.env.VUE_APP_YOUTUBE_API_KEY, store: this.$store});

      // Example 1: Use method-specific function
      // var request = gapi.client.youtube.channels.list({'part': 'snippet', 'mine': 'true'});
      // request.execute(function(response) {
      //   console.log(response);
      // });

      const userInfo = {
        loginType: "google",
        google: googleUser,
      };
      this.$store.commit("setLoginUser", userInfo);
      router.push("/choosemode");
    },
    onSignInError(error) {
      console.log("OH NOES", error);
    },
    runSample() {
      runSample();
    }
  },
};
</script>
