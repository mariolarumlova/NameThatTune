<template>
  <div>
    <v-btn
      color="orange darken-2"
      class="ma-2 white--text"
      @click.prevent="logInViaGoogle()"
    >
      <v-icon left color="white">mdi-google</v-icon>
      Sign in with Google
    </v-btn>
  </div>
</template>

<script>
/* eslint-disable*/

import router from "@/router/router";
import { authenticate, loadClient } from "@/repositories/google";
import firebase from "firebase";
import { signIn } from "@/repositories/firebase";

export default {
  beforeCreate() {
      firebase.auth().onAuthStateChanged((user) => {
          this.$store.commit('SET_SESSION', user || false)
      });
  },
  methods: {
    signIn() {
      return signIn();
    },
    authenticate: async function(scopes) {
      return await authenticate(gapi, scopes);
    },
    loadClient: async function(apiName, apiVersion) {
      return await loadClient(gapi, apiName, apiVersion);
    },

    goToMainPage: function() {
      router.push("/choosemode");
    },

    logInViaGoogle: async function() {
      const result = await this.signIn();
      const googleUser = await this.authenticate(["https://www.googleapis.com/auth/youtube.readonly"]);
      await this.storeClientInfo(result.user);
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
  computed: {
    mySession() {
      return this.$store.getters.session;
    }
  }
};
</script>
