<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="space-around">
      <v-col align="center" justify="space-around">
        <div class="text-h4 pa-4">
          Training mode
        </div>
        <div class="text-body-1 pa-4">
          Hello! You are in a training mode. This page is not fully implemented
          yet.
          <br />
          Notes:
          <br />
          {{ message }}
          <div class="halfwidth-wrapper">
            <v-textarea
              clearable
              solo
              v-model="message"
              placeholder="Add multiple lines"
            ></v-textarea>
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
      message: ""
    };
  }
};
</script>
