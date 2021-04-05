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
import { authenticate } from "@/repositories/google";
import firebase from "firebase";
import { signIn } from "@/repositories/firebase";

export default {
  beforeCreate() {
      firebase.auth().onAuthStateChanged((user) => {
          this.$store.commit('SET_SESSION', user || false)
      });
  },
  methods: {
    signIn(idToken, accessToken) {
      return signIn(idToken, accessToken);
    },
    authenticate: async function(scope, clientName) {
      return await authenticate(gapi, scope, clientName);
    },

    goToMainPage: function() {
      router.push("/choosemode");
    },

    logInViaGoogle: async function() {
      const googleUser = await this.authenticate("https://www.googleapis.com/auth/youtube.readonly", "youtube/v3");
      console.log(googleUser);
      const [ idToken, accessToken ] = Object.keys(googleUser).reduce((acc, key) => {
        if (typeof googleUser[key] === "object"
        && Object.keys(googleUser[key]).includes("id_token")
        && Object.keys(googleUser[key]).includes("access_token")) {
          acc.push(googleUser[key].id_token);
          acc.push(googleUser[key].access_token);
        }
        return acc;
      }, []);
      const result = await this.signIn(idToken, accessToken);
      this.$store.commit("SET_SESSION", result);
      await this.goToMainPage();
    }
  },
  computed: {
    mySession() {
      return this.$store.getters.session;
    }
  }
};
</script>
