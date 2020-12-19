<template>
  <div>
    <v-btn
      color="orange darken-2"
      class="ma-2 white--text"
      @click.prevent="logInViaGoogle"
    >
      Sign in with Google
      <v-icon left color="orange darken-2">mdi-google</v-icon>
    </v-btn>
  </div>
</template>

<script>
/* eslint-disable*/

import router from "@/router/router";
import getGoogleAuthObject from "@/middleware/googleApiConnector";

export default {
  methods: {
    async logInViaGoogle() {
      try {
        const googleAuthObject = await getGoogleAuthObject();
        const userInfo = {
          loginType: "google",
          google: googleUser,
        };
        this.$store.commit("setLoginUser", userInfo);
        router.push("/choosemode");
      } catch(err) {
        console.error(err);
      }
    },
  },
};
</script>
