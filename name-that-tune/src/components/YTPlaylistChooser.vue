<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="space-around">
      <v-col align="center" justify="space-around">
        <div class="text-h4 pa-4">
          Choose playlist
        </div>
        <div class="text-body-1 pa-4">
          <v-btn @click.prevent="setPlaylist()">Click me</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    setPlaylist() {
      this.$emit("playlistChosen", "my super duper playlist");
    }
  }
};
</script>
