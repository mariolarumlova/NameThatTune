<template>
  <div>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="headline">{{ confirmationMessage }}</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="orange darken-3" text @click="closeDelete"
            >Cancel</v-btn
          >
          <v-btn
            color="orange darken-3"
            text
            @click="deleteItemConfirm(itemToDelete)"
            >OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" timeout="2000">
      {{
        success
          ? "Successfully updated the record"
          : "Could not update the record"
      }}

      <template v-slot:action="{ attrs }">
        <v-btn
          :color="success ? 'green' : 'red'"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    itemToDelete: Object,
    deleteFunc: Function,
    confirmationMessage: String
  },
  data() {
    return {
      dialogDelete: true,
      success: false,
      snackbar: false
    };
  },
  methods: {
    closeDelete() {
      this.dialogDelete = false;
    },
    async deleteItemConfirm(itemToDelete) {
      this.success = await this.deleteFunc(itemToDelete.id);
      this.snackbar = true;
      this.dialogDelete = false;
      this.$emit("itemDeleted");
    }
  }
};
</script>
