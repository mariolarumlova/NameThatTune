<template>
  <div>
    <v-container v-if="playlistItems" fill-height fluid>
      <v-row align="center" justify="space-around">
        <v-col align="center" justify="space-around">
          <div class="text-h4 pa-4">
            Tournament mode
          </div>
          <div class="text-body-1 pa-4">
            Hello! You are in a tournament mode. This page is not fully
            implemented yet.
            <br />
            <MusicPlayer
              style="display: none"
              :videoDetails="playlistItems[0]"
            />

            <div class="halfwidth-wrapper">
              <v-select
                :items="pieces"
                label="Choose the piece"
                solo
                v-model="selected"
              ></v-select>
              Selected: {{ selected }}
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
        </v-col>
      </v-row>
    </v-container>
    <PlaylistChooser v-else @playlistChosen="playlistItems = $event" />
  </div>
</template>

<script>
import PlaylistChooser from "@/components/YTPlaylistChooser";
import MusicPlayer from "@/components/MusicPlayer";
export default {
  props: {
    playlistItems: Array,
    piece: Object
  },
  components: {
    MusicPlayer,
    PlaylistChooser
  },
  data() {
    return {
      pieces: [
        { text: "Fryderyk Chopin - Waltz b-minor", value: { id: 1 } },
        {
          text: "Ludwig van Beethoven - The 5th Symphony",
          value: {
            id: "2",
            multipart: true,
            parts: ["I", "II", "III"]
          }
        },
        {
          text: "Modest Musorgski - Pictures from the Exhibition",
          value: {
            id: "3",
            multipart: true,
            parts: ["Bydlo", "The old castle", "Promenade"]
          }
        },
        {
          text: "Pedro Iturralde - Pequena Czarda",
          value: {
            id: "4"
          }
        }
      ],
      selected: "",
      selectedPart: ""
    };
  }
};
</script>
