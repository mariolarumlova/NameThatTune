<template>
  <v-data-table
    :key="refreshIndex"
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
            <v-form v-model="isFormValid">
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.index"
                      label="Index"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.title"
                      label="Title"
                      clearable
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.youtubeId"
                      label="Youtube ID"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="editedItem.startMin"
                      label="Start time"
                      type="number"
                      suffix="min"
                      :rules="[rules.required, rules.positiveNumber]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="editedItem.startSec"
                      type="number"
                      suffix="sec"
                      :rules="[
                        rules.required,
                        rules.positiveNumber,
                        rules.seconds
                      ]"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="editedItem.endMin"
                      label="End time"
                      type="number"
                      suffix="min"
                      :rules="[rules.required, rules.positiveNumber]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="editedItem.endSec"
                      type="number"
                      suffix="sec"
                      :rules="[
                        rules.required,
                        rules.positiveNumber,
                        rules.seconds
                      ]"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="orange darken-3" text @click="close">
              Cancel
            </v-btn>
            <v-btn
              color="orange darken-3"
              :disabled="!isFormValid"
              text
              @click="save"
            >
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
      <v-icon small class="mr-2" @click="deleteItem(item)">
        mdi-delete
      </v-icon>
      <v-icon small @click="viewItem(item)">
        mdi-eye
      </v-icon>
    </template>
    <template v-slot:no-data>
      There are no parts assigned to this piece. Create a new one or cancel.
    </template>
  </v-data-table>
</template>

<script>
import { parseDuration, minutesToSeconds } from "@/business/training";
export default {
  props: {
    piecePartsInput: Array
  },
  created() {
    this.initialize();
  },
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      isFormValid: false,
      refreshIndex: 0,
      rules: {
        required: value => !!value || value === 0 || "Required",
        positiveNumber: v =>
          (!isNaN(parseFloat(v)) && v >= 0) || "The number must be positive",
        seconds: v => v < 60 || "Max value for seconds is 59"
      },
      headers: [
        { text: "Index", value: "index" },
        { text: "Title", value: "title" },
        { text: "Youtube ID", value: "youtubeId" },
        { text: "Start time", value: "startTimeDisplay" },
        { text: "End time", value: "endTimeDisplay" },
        { text: "Actions", value: "actions", sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        index: 0,
        title: "",
        youtubeId: "",
        startTimeSec: 0,
        endTimeSec: 0,
        startMin: 0,
        startSec: 0,
        endMin: 0,
        endSec: 0
      },
      defaultItem: {
        title: "",
        youtubeId: "",
        startMin: 0,
        startSec: 0,
        endMin: 0,
        endSec: 0
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
      this.pieceParts = this.piecePartsInput.map(el => {
        const parsedStart = parseDuration(el.startTimeSec);
        el.startMin = parsedStart.minutes;
        el.startSec = parsedStart.seconds;
        el.startTimeDisplay = parsedStart.display;
        const parsedEnd = parseDuration(el.endTimeSec);
        el.endMin = parsedEnd.minutes;
        el.endSec = parsedEnd.seconds;
        el.endTimeDisplay = parsedEnd.display;
        return el;
      });
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
      this.refreshIndex++;
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
      this.editedItem.startTimeSec = minutesToSeconds(
        this.editedItem.startMin,
        this.editedItem.startSec
      );
      this.editedItem.startTimeDisplay = parseDuration(
        this.editedItem.startTimeSec
      ).display;
      this.editedItem.endTimeSec = minutesToSeconds(
        this.editedItem.endMin,
        this.editedItem.endSec
      );
      this.editedItem.endTimeDisplay = parseDuration(
        this.editedItem.endTimeSec
      ).display;
      if (this.editedIndex > -1) {
        Object.assign(this.pieceParts[this.editedIndex], this.editedItem);
      } else {
        this.pieceParts.push(this.editedItem);
      }
      this.refreshIndex++;
      this.close();
      this.$emit("piecePartsChanged", this.pieceParts);
    },
    viewItem(item) {
      this.editedIndex = this.pieceParts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.$emit("previewChanged", this.editedItem);
    }
  }
};
</script>
