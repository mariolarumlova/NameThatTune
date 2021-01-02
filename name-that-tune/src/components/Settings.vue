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
            :value="randomStart"
            @input="newRandomStart = $event.target.value"
            color="orange darken-3"
            hide-details
          ></v-switch>
          <br />Correct answers
          <v-radio-group :value="correctAnswer" @input="newCorrectAnswer = $event.target.value" row mandatory>
            <v-radio
              label="After each piece"
              value="eachPiece"
              color="orange darken-3"
            ></v-radio>
            <v-radio
              label="At the end of the tournament"
              value="tournamentSummary"
              color="orange darken-3"
            ></v-radio>
          </v-radio-group>

          <br />Correct piece, incorrect part score
          <v-radio-group :value="badPartScoring" @input="newBadPartScoring = $event.target.value" row mandatory>
            <v-radio
              label="0.5 p."
              value="0.5"
              color="orange darken-3"
            ></v-radio>
            <v-radio label="0 p." value="0" color="orange darken-3"></v-radio>
          </v-radio-group>

          <br />Limited answer time
          <v-switch
            :value="limitedAnswerTime"
            @input="newLimitedAnswerTime = $event.target.value"
            color="orange darken-3"
            hide-details
          ></v-switch>
          <div v-if="limitedAnswerTime" class="pa-4">
            <v-text-field
              :value="timeLimit"
              @input="newTimeLimit = $event.target.value"
              label="Time (in sec)"
              placeholder="30"
              outlined
            ></v-text-field>
          </div>
          <v-btn
            color="orange darken-2"
            class="ma-2 white--text"
            @click.prevent="saveSettingsToDb()"
          >
            Save
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db } from "@/repositories/firebase";
export default {
  data() {
    return {
      clientImageUrl: this.$store.state.session.user.photoURL,
      clientName: this.$store.state.session.user.displayName,
      newRandomStart: undefined,
      newCorrectAnswer: undefined,
      newBadPartScoring: undefined,
      newLimitedAnswerTime: undefined,
      newTimeLimit: undefined
    };
  },
  methods: {
    saveSettingsToDb: function() {
      db.ref("settings/" + this.$store.state.session.user.uid).set({
        randomStart: this.newRandomStart || this.randomStart,
        correctAnswer: this.newCorrectAnswer || this.correctAnswer,
        badPartScoring: this.newBadPartScoring || this.badPartScoring,
        limitedAnswerTime: this.newLimitedAnswerTime || this.limitedAnswerTime,
        timeLimit: this.newTimeLimit || this.timeLimit
      });
    }
  },
  computed: {
    randomStart() {
      const settings = this.$store.state.settings.customSettings;
      return settings ? settings.randomStart : false;
    },
    correctAnswer() {
      const settings = this.$store.state.settings.customSettings;
      return settings ? settings.correctAnswer : "eachPiece";
    },
    badPartScoring() {
      const settings = this.$store.state.settings.customSettings;
      return settings ? settings.badPartScoring : "0.5";
    },
    limitedAnswerTime() {
      const settings = this.$store.state.settings.customSettings;
      return settings ? settings.limitedAnswerTime : true;
    },
    timeLimit() {
      const settings = this.$store.state.settings.customSettings;
      return settings ? settings.timeLimit : "";
    }
  },
  created: function() {
    this.$store.dispatch("loadSettings");
  }
};
</script>
