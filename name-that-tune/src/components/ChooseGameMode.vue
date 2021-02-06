<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="space-around">
      <v-col align="center" justify="space-around">
        <div class="text-h4 pa-4">
          Hello, {{ clientName }}! Choose game mode <br />
          {{ users }}

          {{ clientUid }}
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
</template>

<script>
import { mapGetters } from "vuex";
import databaseFactory from "@/dataProvider/classes/Database";
import userFactory from "@/dataProvider/dto/User";

export default {
  data() {
    return {
      clientName: this.$store.state.session.user.displayName,
      clientUid: this.$store.state.uid,
      users: ""
    };
  },
  computed: {
    ...mapGetters(["session"])
  },
  created: async function() {
    const db = databaseFactory();
    const factory = userFactory(db);
    this.users = JSON.stringify(await factory.getAll());
  }
};
</script>
