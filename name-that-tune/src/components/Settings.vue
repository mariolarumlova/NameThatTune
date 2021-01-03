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
            @change="newRandomStart = $event === true"
            color="orange darken-3"
            hide-details
          ></v-switch>
          <br />Correct answers
          <v-radio-group
            :value="correctAnswer"
            @change="newCorrectAnswer = $event"
            row
            mandatory
          >
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
          <v-radio-group
            :value="badPartScoring"
            @change="newBadPartScoring = $event"
            row
            mandatory
          >
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
            @change="newLimitedAnswerTime = $event === true"
            color="orange darken-3"
            hide-details
          ></v-switch>
          <div
            v-if="
              newLimitedAnswerTime !== undefined
                ? newLimitedAnswerTime
                : limitedAnswerTime
            "
            class="pa-4"
          >
            <v-text-field
              :value="timeLimit"
              @input="newTimeLimit = $event"
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
          <v-alert type="error" dismissible v-if="dbUpdateError"
            >Could not update settings: {{ dbUpdateError }}</v-alert
          >
          <v-alert type="success" dismissible v-if="dbUpdateSuccess"
            >Settings saved successfully</v-alert
          >
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
      newTimeLimit: undefined,
      dbUpdateError: undefined,
      dbUpdateSuccess: undefined
    };
  },
  methods: {
    saveSettingsToDb: function() {
      db.ref("settings/" + this.$store.state.uid).set(
        {
          randomStart:
            typeof this.newRandomStart === "boolean"
              ? this.newRandomStart
              : this.randomStart,
          correctAnswer: this.newCorrectAnswer || this.correctAnswer,
          badPartScoring: this.newBadPartScoring || this.badPartScoring,
          limitedAnswerTime:
            typeof this.newLimitedAnswerTime === "boolean"
              ? this.newLimitedAnswerTime
              : this.limitedAnswerTime,
          timeLimit: this.newTimeLimit || this.timeLimit
        },
        error => {
          if (error) {
            this.dbUpdateError = true;
          } else {
            this.dbUpdateSuccess = true;
          }
        }
      );
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
