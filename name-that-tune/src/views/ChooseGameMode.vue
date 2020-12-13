<template>
  <v-main app>
    <HomeMenu />
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
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import HomeMenu from "@/components/Menu";

export default {
  data() {
    return {
      clientName: this.$store.state.loginUser.google.wt.Ad
    };
  },
  name: "choosemode",
  components: {
    HomeMenu
  }
};
</script>
