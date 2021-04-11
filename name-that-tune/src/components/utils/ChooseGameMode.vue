<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="space-around">
      <v-col align="center" justify="space-around">
        <div class="text-h4 pa-4">
          Hello, {{ clientName }}! <br />
          Choose game mode <br />
          <v-btn class="ma-8" elevation="2" outlined large to="training"
            >Training</v-btn
          >
          <v-btn class="ma-8" elevation="2" outlined large to="tournament"
            >Tournament</v-btn
          >
          <v-btn
            class="ma-8"
            elevation="2"
            outlined
            large
            href="https://github.com/mariolarumlova/NameThatTune/wiki"
            ><v-icon>mdi-help-circle</v-icon>Read the tutorial</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      clientName: this.$store.state.session.user.displayName,
      clientUid: this.$store.state.uid
    };
  },
  computed: {
    ...mapGetters(["session"])
  }
};
</script>
