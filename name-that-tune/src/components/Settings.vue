<template>
  <v-container fill-height fluid>
    <v-row align="center" justify-content="center">
      <v-col align="center" justify-content="center">
        <div class="text-h4 pa-4">{{ clientName }} - account settings</div>
        <v-avatar size="120" tile>
          <img :src="clientImageUrl" />
        </v-avatar>
        <div class="halfwidth-wrapper text-body-1 pa-4">
          <br />Random start of a piece
          <v-switch
            v-model="pickedRandomStart"
            color="orange darken-3"
            hide-details
          ></v-switch>
          <br />Correct answers
          <v-radio-group v-model="pickedAnswer" row mandatory>
            <v-radio
              label="After each piece"
              value="After each piece"
              color="orange darken-3"
            ></v-radio>
            <v-radio
              label="At the end of the tournament"
              value="At the end of the tournament"
              color="orange darken-3"
            ></v-radio>
          </v-radio-group>

          <br />Correct piece, incorrect part score
          <v-radio-group v-model="pickedScoring" row mandatory>
            <v-radio
              label="0.5 p."
              value="0.5"
              color="orange darken-3"
            ></v-radio>
            <v-radio label="0 p." value="0" color="orange darken-3"></v-radio>
          </v-radio-group>

          <br />Limited answer time
          <v-switch
            v-model="checked"
            color="orange darken-3"
            hide-details
          ></v-switch>
          <div v-if="checked" class="pa-4">
            <v-text-field
              v-model="timeLimit"
              label="Time (in sec)"
              placeholder="30"
              outlined
            ></v-text-field>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      clientImageUrl:
        this.$store.state.loginUser.google.photoURL ||
        this.$store.state.loginUser.google.wt.SJ,
      clientName:
        this.$store.state.loginUser.google.displayName ||
        this.$store.state.loginUser.google.wt.Ad,
      pickedRandomStart: false,
      pickedAnswer: "After each piece",
      pickedScoring: "0.5 p.",
      checked: false,
      timeLimit: ""
    };
  }
};
</script>
