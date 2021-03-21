<template>
  <div>
    <v-container v-if="playlistItems" fill-height fluid>
      <v-row align="center" justify="space-around">
        <v-col align="center" justify="space-around">
          <div class="text-h4 pa-4">
            Tournament mode
          </div>
          <div v-if="!tournament.complete" class="text-body-1 pa-4">
            <MusicPlayer
              :key="tournament.totalAnswersAmount"
              customStyle="display: none"
              :videoDetails="currentPiece"
              :randomStartTime="settings.randomStart == true"
              :playTimeSec="
                settings.limitedAnswerTime == true
                  ? settings.timeLimit
                  : undefined
              "
            />
            <v-btn
              :disabled="
                !selected.id || (selected.multipart && !selectedPart.id)
              "
              @click.prevent="checkPiece()"
              >Check</v-btn
            >
            <br />
            <div
              v-if="
                settings.correctAnswerEachPiece == true &&
                  tournament.totalAnswersAmount > 0
              "
            >
              Result: {{ result }} <br />
            </div>
            <!-- Below is the prototype of progress bar -->
            Answered: {{ tournament.totalAnswersAmount }} /
            {{ playlistItems.length }} <br />
            <div class="halfwidth-wrapper">
              <v-select
                :items="pieces"
                label="Choose the piece"
                solo
                v-model="selected"
              ></v-select>
              <div v-if="selected.multipart">
                <v-select
                  :items="parseForListview(selected.parts)"
                  label="Choose the part"
                  solo
                  v-model="selectedPart"
                ></v-select>
              </div>
            </div>
          </div>
          <div v-else class="text-body-1 pa-4">
            Tournament complete. Your score is
            {{ tournament.correctAnswersAmount }} out of
            {{ playlistItems.length }}. <br />

            Detail results:
            <SimpleTable :headers="finalResultsHeaders" :items="answers" />
          </div>
        </v-col>
      </v-row>
    </v-container>
    <PlaylistChooser
      v-else
      @playlistChosen="setPlaylist($event)"
      gameMode="tournament"
    />
  </div>
</template>

<script>
import PlaylistChooser from "@/components/core/PlaylistChooser";
import MusicPlayer from "@/components/core/MusicPlayer";
import SimpleTable from "@/components/utils/SimpleTable";
import databaseFactory from "@/dataProvider/classes/Database";
import settingsFactory from "@/dataProvider/dto/Settings";
import {
  addTournamentToDatabase,
  addAnswerToDatabase,
  getHumanReadableResult,
  updateTournament
} from "@/business/tournament";
import { getRandomIntInclusive, shuffle } from "@/business/mathUtils";
export default {
  props: {
    piece: Object
  },
  components: {
    MusicPlayer,
    PlaylistChooser,
    SimpleTable
  },
  async created() {
    this.settings = (
      await settingsFactory(databaseFactory()).getById(this.$store.state.uid)
    ).data; //TODO Co jak ktos nie ma?
  },
  methods: {
    checkPiece: async function() {
      const answer = await addAnswerToDatabase(
        this.tournament.id,
        this.currentPiece,
        this.selected,
        this.selectedPart,
        this.settings.badPartScoring
      );
      this.answers = [...this.answers, answer];
      this.result = getHumanReadableResult(answer);
      this.tournament.correctAnswersAmount += answer.score;
      this.tournament.totalAnswersAmount += 1;
      if (this.tournament.totalAnswersAmount < this.playlistItems.length) {
        this.currentPiece = this.playlistItems[
          this.tournament.totalAnswersAmount
        ];
      } else {
        this.tournament.complete = true;
      }
      await updateTournament(this.tournament);
    },
    parseForListview: function(parts) {
      return parts
        .map(item => {
          return {
            text: item.title || item.index,
            value: item
          };
        })
        .sort((a, b) => {
          return a.value.index - b.value.index;
        });
    },
    setPlaylist: async function(event) {
      this.pieces =
        event && event.items && event.items.length
          ? this.parseForListview(event.items)
          : [];
      this.playlistItems = shuffle(event.items);
      if (event.customPlaylist) {
        this.playlistItems = this.playlistItems.map(el => {
          return {
            ...el,
            currentPart: el.parts[getRandomIntInclusive(0, el.parts.length - 1)]
          };
        });
      }
      this.currentPiece = this.playlistItems[0];
      this.tournament = await addTournamentToDatabase(
        this.$store.state.uid,
        event
      );
    }
  },
  data() {
    return {
      pieces: [],
      playlistItems: null,
      selected: {},
      selectedPart: {},
      result: 0,
      tournament: {},
      currentPiece: {},
      settings: {},
      answers: [],
      finalResultsHeaders: [
        { name: "Given piece", apiName: "givenPiece" },
        { name: "Correct piece", apiName: "correctPiece" },
        { name: "Score", apiName: "score" }
      ]
    };
  }
};
</script>
