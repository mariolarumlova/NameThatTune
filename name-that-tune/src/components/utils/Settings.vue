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
            :value="correctAnswerEachPiece"
            @change="newCorrectAnswerEachPiece = $event"
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
          <v-alert
            :type="dbError ? 'error' : 'success'"
            v-model="showAlert"
            dismissible
            >{{ dbMessage }}</v-alert
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import databaseFactory from "@/dataProvider/classes/Database";
import settingsFactory from "@/dataProvider/dto/Settings";

export default {
  data() {
    return {
      clientImageUrl: this.$store.state.session.user.photoURL,
      clientName: this.$store.state.session.user.displayName,
      newRandomStart: undefined,
      newCorrectAnswerEachPiece: undefined,
      newBadPartScoring: undefined,
      newLimitedAnswerTime: undefined,
      newTimeLimit: undefined,
      dbMessage: undefined,
      dbError: undefined,
      showAlert: false,
      settings: {}
    };
  },
  methods: {
    saveSettingsToDb: async function() {
      const result = await this.settingsTable.update(this.$store.state.uid, {
        id: this.$store.state.uid,
        randomStart:
          typeof this.newRandomStart === "boolean"
            ? this.newRandomStart
            : this.randomStart,
        correctAnswerEachPiece:
          typeof this.newCorrectAnswerEachPiece === "boolean"
            ? this.newCorrectAnswerEachPiece
            : this.correctAnswerEachPiece,
        badPartScoring: this.newBadPartScoring || this.badPartScoring,
        limitedAnswerTime:
          typeof this.newLimitedAnswerTime === "boolean"
            ? this.newLimitedAnswerTime
            : this.limitedAnswerTime,
        timeLimit: this.newTimeLimit || this.timeLimit
      });
      this.dbError = !result.isSuccessful;
      this.dbMessage = result.stdout || result.stderr;
      this.showAlert = true;
    }
  },
  computed: {
    randomStart() {
      return this.settings ? this.settings.randomStart : false;
    },
    correctAnswerEachPiece() {
      return this.settings ? this.settings.correctAnswerEachPiece : true;
    },
    badPartScoring() {
      return this.settings ? this.settings.badPartScoring : "0.5";
    },
    limitedAnswerTime() {
      return this.settings ? this.settings.limitedAnswerTime : true;
    },
    timeLimit() {
      return this.settings ? this.settings.timeLimit : "";
    }
  },
  created: async function() {
    this.settingsTable = settingsFactory(databaseFactory());
    this.settings = (
      await this.settingsTable.getById(this.$store.state.uid)
    ).data;
  }
};
</script>
