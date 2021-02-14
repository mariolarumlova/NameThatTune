<template>
  <div>
    <v-container v-if="playlistItems" fill-height fluid>
      <v-row align="center" justify="space-around">
        <v-col align="center" justify="space-around">
          <div class="text-h4 pa-4">
            Tournament mode
          </div>
          <div v-if="!tournamentComplete" class="text-body-1 pa-4">
            <MusicPlayer
              :key="index"
              customStyle="display: none"
              :videoDetails="currentPiece"
              :randomStartTime="settings.randomStart"
              :playTimeSec="
                settings.limitedAnswerTime ? settings.timeLimit : undefined
              "
            />
            <v-btn @click.prevent="checkPiece()">Check</v-btn>
            <br />
            Result: {{ result }} <br />
            Index: {{ index }} <br />
            Tournament complete: {{ tournamentComplete }} <br />

            <div class="halfwidth-wrapper">
              <v-select
                :items="pieces"
                label="Choose the piece"
                solo
                v-model="selected"
              ></v-select>
              <div v-if="selected.multipart">
                <v-select
                  :items="selected.parts"
                  label="Choose the part"
                  solo
                  v-model="selectedPart"
                ></v-select>
                Selected: {{ selectedPart }}
              </div>
            </div>
          </div>
          <div v-else class="text-body-1 pa-4">
            Tournament complete. Your score is {{ correctAnswersNo }} out of
            {{ playlistItems.length }}
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
import PlaylistChooser from "@/components/core/PlaylistChooserYoutube";
import MusicPlayer from "@/components/core/MusicPlayer";
import databaseFactory from "@/dataProvider/classes/Database";
import settingsFactory from "@/dataProvider/dto/Settings";
import tournamentFactory from "@/dataProvider/dto/Tournament";
import answerFactory from "@/dataProvider/dto/Answer";
import { shuffle } from "@/business/tournament";
import { v4 as generateGuid } from "uuid";
export default {
  props: {
    piece: Object
  },
  components: {
    MusicPlayer,
    PlaylistChooser
  },
  async created() {
    this.settings = (
      await settingsFactory(databaseFactory()).getById(this.$store.state.uid)
    ).data;
  },
  methods: {
    checkPiece: async function() {
      const givenPiece = this.selected.title;
      const correctPiece = this.currentPiece.title;
      this.result = this.selected.title === this.currentPiece.title;
      this.correctAnswersNo = this.result
        ? this.correctAnswersNo + 1
        : this.correctAnswersNo;
      this.index += 1;
      if (this.index < this.playlistItems.length) {
        this.currentPiece = this.playlistItems[this.index];
      } else {
        this.tournamentComplete = true;
      }
      const now = Date.now();
      await tournamentFactory(databaseFactory()).update(this.tournamentGuid, {
        complete: this.tournamentComplete,
        correctAnswersAmount: this.correctAnswersNo,
        totalAnswersAmount: this.index,
        lastModifiedAtTimestamp: now
      });
      const guid = generateGuid();
      await answerFactory(databaseFactory()).update(guid, {
        id: guid,
        tournamentId: this.tournamentGuid,
        givenPiece: givenPiece,
        correctPiece: correctPiece,
        createdAtTimestamp: now,
        lastModifiedAtTimestamp: now
      });
    },
    setPlaylist: async function(event) {
      this.pieces =
        event && event.items && event.items.length
          ? event.items.map(item => {
              return {
                text: item.title,
                value: item
              };
            })
          : [];
      this.playlistItems = shuffle(event.items);
      this.index = 0;
      this.currentPiece = this.playlistItems[this.index];
      this.tournamentComplete = false;
      this.correctAnswersNo = 0;
      this.tournamentGuid = generateGuid();
      const now = Date.now();
      await tournamentFactory(databaseFactory()).update(this.tournamentGuid, {
        id: this.tournamentGuid,
        userId: this.$store.state.uid,
        youtubeId: event.id,
        complete: false,
        customPlaylist: false,
        createdAtTimestamp: now,
        lastModifiedAtTimestamp: now
      });
    }
  },
  data() {
    return {
      pieces: [],
      playlistItems: null,
      selected: "",
      selectedPart: "",
      result: "",
      index: 0,
      currentPiece: {},
      tournamentComplete: false,
      correctAnswersNo: 0,
      settings: {}
    };
  }
};
</script>
