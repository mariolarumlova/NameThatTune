<template>
  <div>
    <v-btn
      color="orange darken-2"
      class="ma-2 white--text"
      @click.prevent="logInViaGoogle()"
    >
      Sign in with Google
      <v-icon left color="orange darken-2">mdi-google</v-icon>
    </v-btn>
  </div>
</template>

<script>
/* eslint-disable*/

import router from "@/router/router";
export default {
  methods: {
    authenticate: function() {
      return new Promise(async (resolve, reject) => {
        gapi.load("client:auth2", function() {
          gapi.auth2.init({ client_id: process.env.VUE_APP_CLIENT_ID });

          gapi.auth2
            .getAuthInstance()
            .signIn({
              scope: "https://www.googleapis.com/auth/youtube.readonly",
            })
            .then((data) => {
              console.log("Sign-in successful");
              resolve(data);
            })
            .catch((err) => {
              console.error("Error signing in", err);
              reject(err);
            });
        });
      });
    },
    loadClient: function(apiName, apiVersion) {
      return new Promise(async (resolve, reject) => {
        gapi.client.setApiKey(process.env.VUE_APP_YOUTUBE_API_KEY);
        return gapi.client
          .load(`https://www.googleapis.com/discovery/v1/apis/${apiName}/${apiVersion}/rest`)
          .then(
            function() {
              console.log("GAPI client loaded for API");
              resolve();
            },
            function(err) {
              console.error("Error loading GAPI client for API", err);
              reject(err);
            }
          );
      });
    },

    goToMainPage: function() {
      router.push("/choosemode");
    },

    logInViaGoogle: async function() {
      const googleUser = await this.authenticate();
      await this.storeClientInfo(googleUser);
      await this.loadClient("youtube", "v3");
      await this.goToMainPage();
    },
    
    storeClientInfo: function(googleUser) {
      const userInfo = {
          loginType: "google",
          google: googleUser,
        };
      this.$store.commit("setLoginUser", userInfo);
    }
  },
};
</script>
