<template>
  <v-data-table
    :headers="headers"
    :items="pieceParts"
    :hide-default-footer="true"
    sort-by="index"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="orange darken-3"
            dark
            class="mb-2"
            v-bind="attrs"
            v-on="on"
          >
            Add a new part
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedItem.index"
                    label="Index"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedItem.title"
                    label="Title"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedItem.youtubeId"
                    label="Youtube ID"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedItem.startTimeSec"
                    label="Start time [sec]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedItem.endTimeSec"
                    label="End time [sec]"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="orange darken-3" text @click="close">
              Cancel
            </v-btn>
            <v-btn color="orange darken-3" text @click="save">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="headline"
            >Are you sure you want to delete this item?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="orange darken-3" text @click="closeDelete"
              >Cancel</v-btn
            >
            <v-btn color="orange darken-3" text @click="deleteItemConfirm"
              >OK</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      There are no parts assigned to this piece. Create a new one or cancel.
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    piecePartsInput: Array,
    defaultYoutubeId: String
  },
  created() {
    this.initialize();
  },
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: "Index", value: "index" },
        { text: "Title", value: "title" },
        { text: "Youtube ID", value: "youtubeId" },
        { text: "Start time [sec]", value: "startTimeSec" },
        { text: "End time [sec]", value: "endTimeSec" },
        { text: "Actions", value: "actions", sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        index: 0,
        title: "",
        youtubeId: "",
        startTimeSec: 0,
        endTimeSec: 0
      },
      defaultItem: {
        index: 0,
        title: "",
        youtubeId: "",
        startTimeSec: 0,
        endTimeSec: 0
      }
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Part" : "Edit Part";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },
  methods: {
    initialize() {
      this.pieceParts = this.piecePartsInput;
    },
    editItem(item) {
      this.editedIndex = this.pieceParts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.pieceParts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.pieceParts.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.$emit("piecePartsChanged", this.pieceParts);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.pieceParts[this.editedIndex], this.editedItem);
      } else {
        this.pieceParts.push(this.editedItem);
      }
      this.close();
      this.$emit("piecePartsChanged", this.pieceParts);
    }
  }
};
</script>
